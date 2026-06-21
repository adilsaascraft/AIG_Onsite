'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import type { ScanResponse, RecentScan } from '@/components/scanner/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScanLine, Sparkles } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ScanScannerProps {
  scanTypeId: string
  scanTypeName: string
}

type ScanMode = 'auto' | 'manual'

export default function ScanScanner({
  scanTypeId,
  scanTypeName,
}: ScanScannerProps) {
  const [regNum, setRegNum] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResponse | null>(null)
  const [scanMode, setScanMode] = useState<'auto' | 'manual'>('auto')

  const [flashType, setFlashType] = useState<'success' | 'error' | null>(null)

  const [scanHistory, setScanHistory] = useState<RecentScan[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isSubmittingRef = useRef(false)

  const lastScannedRef = useRef('')

  const successAudioRef = useRef<HTMLAudioElement | null>(null)

  const errorAudioRef = useRef<HTMLAudioElement | null>(null)

  const focusInput = useCallback(() => {
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 100)
  }, [])

  useEffect(() => {
    focusInput()
  }, [focusInput])

  useEffect(() => {
    successAudioRef.current = new Audio('/sounds/success.mp3')

    errorAudioRef.current = new Audio('/sounds/error.mp3')

    const savedHistory = sessionStorage.getItem('scan-history')

    if (savedHistory) {
      try {
        setScanHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

  useEffect(() => {
    if (!result) return

    const timer = setTimeout(() => {
      setResult(null)
    }, 5000)

    return () => clearTimeout(timer)
  }, [result])

  useEffect(() => {
    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current)
      }
    }
  }, [])

  const triggerSuccessEffects = () => {
    successAudioRef.current?.play().catch(() => {})

    setFlashType('success')

    setTimeout(() => {
      setFlashType(null)
    }, 400)
  }

  const triggerErrorEffects = () => {
    errorAudioRef.current?.play().catch(() => {})

    setFlashType('error')

    setTimeout(() => {
      setFlashType(null)
    }, 400)
  }

  const handleScan = async (incomingRegNum?: string) => {
    const cleanRegNum = (incomingRegNum ?? regNum).trim()

    if (!cleanRegNum) return

    if (loading) return

    if (isSubmittingRef.current) return

    if (lastScannedRef.current === cleanRegNum && loading) {
      return
    }

    lastScannedRef.current = cleanRegNum

    try {
      isSubmittingRef.current = true

      setLoading(true)

      const authData = localStorage.getItem('onsite-auth')

      let token = ''

      if (authData) {
        try {
          const parsed = JSON.parse(authData)

          token = parsed?.state?.token || ''
        } catch (error) {
          console.error(error)
        }
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/onsite/scan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
          body: JSON.stringify({
            regNum: cleanRegNum,
            scanTypeId,
          }),
        },
      )

      const data: ScanResponse = await response.json()

      setResult(data)

      if (data.success) {
        triggerSuccessEffects()

        toast.success(data.message)

        const historyItem: RecentScan = {
          id: crypto.randomUUID(),

          regNum: data.badge?.regNum ?? '',

          name: data.badge?.name ?? '',

          badgeType: data.badge?.badgeProfileName ?? '',

          scanType: data.scanType?.scanType ?? '',

          scannedAt: data.scanLog?.createdAt ?? new Date().toISOString(),
        }

        setScanHistory((prev) => {
          const updated = [historyItem, ...prev].slice(0, 10)

          sessionStorage.setItem('scan-history', JSON.stringify(updated))

          return updated
        })
      } else {
        triggerErrorEffects()

        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)

      triggerErrorEffects()

      const errorResponse: ScanResponse = {
        success: false,
        message: 'Unable to connect to server',
      }

      setResult(errorResponse)

      toast.error('Unable to connect to server')
    } finally {
      isSubmittingRef.current = false

      setLoading(false)

      setRegNum('')

      setTimeout(() => {
        lastScannedRef.current = ''
      }, 1000)

      focusInput()
    }
  }

  const triggerAutoScan = (value: string) => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current)
    }

    scanTimeoutRef.current = setTimeout(() => {
      if (value.trim() && !loading && !isSubmittingRef.current) {
        handleScan(value.trim())
      }
    }, 250)
  }

  return (
    <div className="mx-auto max-w-7xl">
      {flashType && (
        <div
          className={`fixed inset-0 z-[9999] pointer-events-none ${
            flashType === 'success' ? 'bg-green-500/30' : 'bg-red-500/30'
          }`}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        <div className="space-y-3">
          <Card className="border-sky-100 bg-gradient-to-br from-white to-sky-50 shadow-xl shadow-sky-100/50">
            <CardContent className="space-y-3 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 text-sky-700">
                  <ScanLine className="h-7 w-7" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {scanTypeName}
                  </h1>

                  <p className="mt-1 text-muted-foreground">
                    Scan attendee badges using QR codes or registration numbers.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Scan Mode
                </label>

                <Select
                  value={scanMode}
                  onValueChange={(value) =>
                    setScanMode(value as 'auto' | 'manual')
                  }
                >
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="auto">Auto Scan</SelectItem>

                    <SelectItem value="manual">Manual Scan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Registration Number
                  </label>

                  <Input
                    ref={inputRef}
                    value={regNum}
                    disabled={loading}
                    className="h-14 text-lg font-medium"
                    placeholder="Scan QR or Enter Registration Number"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      const value = e.target.value

                      setRegNum(value)

                      if (scanMode === 'auto') {
                        triggerAutoScan(value)
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()

                        if (scanTimeoutRef.current) {
                          clearTimeout(scanTimeoutRef.current)
                        }

                        handleScan()
                      }
                    }}
                  />
                </div>

                {scanMode === 'manual' && (
                  <Button
                    className="h-12 w-full bg-sky-800 hover:bg-sky-900"
                    disabled={loading || !regNum.trim()}
                    onClick={() => handleScan()}
                  >
                    {loading ? 'Scanning...' : 'Start Scan'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card
              className={
                result.success
                  ? 'border-green-200 bg-green-50/50 shadow-lg'
                  : 'border-red-200 bg-red-50/50 shadow-lg'
              }
            >
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-4">
                  {result.success ? (
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  ) : (
                    <XCircle className="h-12 w-12 text-red-600" />
                  )}

                  <div>
                    <h2 className="text-xl font-bold">{result.message}</h2>

                    <p className="text-sm text-muted-foreground">
                      {result.success
                        ? 'Attendee verified successfully'
                        : 'Unable to verify attendee'}
                    </p>
                  </div>
                </div>

                <h2 className="text-center text-2xl font-bold">
                  {result.message}
                </h2>

                {result.success && result.badge && (
                  <>
                    <Separator />

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>

                        <p className="font-semibold">{result.badge.name}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Registration Number
                        </p>

                        <p className="font-semibold">{result.badge.regNum}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Badge Type
                        </p>

                        <p className="font-semibold">
                          {result.badge.badgeProfileName}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Scan Type
                        </p>

                        <p className="font-semibold">
                          {result.scanType?.scanType}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Scan Count
                        </p>

                        <p className="font-semibold">
                          {result.scanLog?.scanCount ?? 0}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Scan Time
                        </p>

                        <p className="font-semibold">
                          {result.scanLog?.createdAt
                            ? new Date(result.scanLog.createdAt).toLocaleString(
                                'en-IN',
                                {
                                  timeZone: 'Asia/Kolkata',
                                },
                              )
                            : '-'}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="sticky top-6 h-fit border-sky-100 shadow-xl shadow-sky-100/50">
          <CardContent className="p-4">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold">Recent Scans</h3>

              <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                {scanHistory.length}
              </div>
            </div>

            <div className="space-y-3">
              {scanHistory.length === 0 && (
                <p className="text-sm text-muted-foreground">No scans yet</p>
              )}

              {scanHistory.map((scan) => (
                <div
                  key={scan.id}
                  className="
    rounded-xl
    border
    border-slate-200
    bg-slate-50/70
    p-4
    transition-all
    hover:border-sky-200
    hover:bg-sky-50
  "
                >
                  <p className="font-semibold">{scan.name}</p>

                  <p className="text-sm text-muted-foreground">{scan.regNum}</p>

                  <p className="text-xs text-muted-foreground">
                    {scan.badgeType}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {scan.scanType}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(scan.scannedAt).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
