'use client'

import { useCallback, useEffect, useRef, useState, RefObject } from 'react'
import { toast } from 'sonner'
import { useReactToPrint } from 'react-to-print'
import { Info, Printer } from 'lucide-react'
import { apiClient } from '@/lib/apiClient'

import { SearchBar } from '@/components/SearchBar'
import { SearchResults } from '@/components/SearchResults'
import { useBadgePrintStore } from '@/store/badgePrintStore'
import { BadgePrintLayout } from '@/components/BadgePrintLayout'
import { BadgePreview } from '@/components/BadgePreview'

import type { BadgeRecord } from '@/types/badgePrinting'
import { getCategoryColor } from '@/lib/categoryColors'

export default function BadgePrintPage() {
  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(false)

  const [recentPrints, setRecentPrints] = useState<
    (BadgeRecord & { printedAt: string })[]
  >([])

  const [printingId, setPrintingId] = useState<string | null>(null)

  const [attendees, setAttendees] = useState<BadgeRecord[]>([])

  const [selectedAttendee, setSelectedAttendee] = useState<BadgeRecord | null>(
    null,
  )


// ======================================================
// LOAD RECENT PRINTS FROM LOCAL STORAGE
// ======================================================

useEffect(() => {
  try {
    const stored = localStorage.getItem('recentPrints')

    if (stored) {
      setRecentPrints(JSON.parse(stored))
    }
  } catch (error) {
    console.error('Failed to load recent prints', error)
  }
}, [])


  

  const {
    qrSize,
    qrX,
    qrY,

    nameFontSize,
    nameWeight,
    nameWidth,

    nameX,
    nameY,
  } = useBadgePrintStore()

  
  // ======================================================
  // REFS
  // ======================================================

  const scannerRef = useRef<HTMLInputElement>(null)

  const printRef = useRef<HTMLDivElement>(null)

  // ======================================================
  // PRINT
  // ======================================================

  const handlePrintView = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Badge',
  })

  // ======================================================
  // SEARCH
  // ======================================================

  const handleSearch = useCallback(async () => {
    if (!search.trim()) return

    try {
      setLoading(true)

      const data = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/onsite/badges/search?search=${encodeURIComponent(
          search.trim(),
        )}`,
      )

      if (!data.success || !data.data?.length) {
        setAttendees([])
        setSelectedAttendee(null)

        toast.error('No attendee found')

        return
      }

      setAttendees(data.data)
    } catch (error: any) {
      toast.error(error?.message || 'Search failed')
    } finally {
      setLoading(false)
    }
  }, [search])

  // ======================================================
  // DEBOUNCE SEARCH
  // ======================================================

  useEffect(() => {
    if (search.trim().length < 3) return

    const timer = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => clearTimeout(timer)
  }, [search, handleSearch])

  // ======================================================
  // CLEAR RESULTS
  // ======================================================

  useEffect(() => {
    if (!search.trim()) {
      setAttendees([])
      setSelectedAttendee(null)
    }
  }, [search])

  // ======================================================
  // AUTO FOCUS
  // ======================================================

  useEffect(() => {
    scannerRef.current?.focus()
  }, [])


// ======================================================
// SAVE RECENT PRINTS TO LOCAL STORAGE
// ======================================================

useEffect(() => {
  try {
    localStorage.setItem(
      'recentPrints',
      JSON.stringify(recentPrints),
    )
  } catch (error) {
    console.error('Failed to save recent prints', error)
  }
}, [recentPrints])


  

  // ======================================================
  // CTRL + P
  // ======================================================

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault()

        if (selectedAttendee) {
          handlePrint(selectedAttendee)
        }
      }
    }

    window.addEventListener('keydown', listener)

    return () => window.removeEventListener('keydown', listener)
  }, [selectedAttendee])

  // ======================================================
  // PRINT BADGE
  // ======================================================

  const handlePrint = async (attendee: BadgeRecord) => {
    try {
      setPrintingId(attendee._id)

      setSelectedAttendee(attendee)

      const data = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/onsite/badges/print/${attendee._id}`,
        {
          method: 'PUT',
        },
      )

      if (!data.success) {
        toast.error(data.message || 'Print failed')
        return
      }

      handlePrintView()

      setAttendees((prev) =>
        prev.map((row) =>
          row._id === attendee._id
            ? {
                ...row,
                badgePrinted: true,
                printCount: row.printCount + 1,
                lastPrintedAt: new Date().toISOString(),
              }
            : row,
        ),
      )

      setSelectedAttendee({
        ...attendee,
        badgePrinted: true,
        printCount: attendee.printCount + 1,
        lastPrintedAt: new Date().toISOString(),
      })

      toast.success('Badge printed successfully')

      setRecentPrints((prev) =>
        [
          {
            ...attendee,
            printedAt: new Date().toISOString(),
          },
          ...prev,
        ].slice(0, 3),
      )

      setSearch('')

      setAttendees([])

      setSelectedAttendee(null)

      setTimeout(() => {
      

        scannerRef.current?.focus()

        
      }, 1000)
    } catch (error: any) {
      toast.error(error?.message || 'Print failed')
    } finally {
      setPrintingId(null)
    }
  }

  return (
    <div className="container mx-auto max-w-7xl space-y-5 p-4 md:p-6">
      {/* ======================================================
          HEADER
      ====================================================== */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Badge Printing</h1>

        <p className="text-sm text-muted-foreground">
          Search by Reg No, Mobile, Email or Name
        </p>
      </div>
      {/* ======================================================
          SEARCH
      ====================================================== */}
      <SearchBar
        ref={scannerRef}
        search={search}
        loading={loading}
        onSearch={handleSearch}
        onChange={setSearch}
      />
      {/* ======================================================
          RESULTS
      ====================================================== */}
      <SearchResults
        rows={attendees}
        printingId={printingId}
        onSelect={setSelectedAttendee}
        onPrint={handlePrint}
      />
      {/* OPERATOR GUIDE */}
      {!selectedAttendee && (
        <div className="grid gap-5 lg:grid-cols-2">
          {/* OPERATOR GUIDE */}
          <div className="overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-sky-100 shadow-lg shadow-sky-100">
            <div className="border-b border-sky-200 bg-white/60 backdrop-blur-sm p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100">
                  <Info className="h-5 w-5 text-sky-700" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Badge Printing Guide
                  </h2>

                  <p className="text-sm text-slate-500">
                    Quick instructions for badge operators
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="space-y-3">
                {[
                  'Search using Registration Number, Mobile, Email or Name.',
                  'Scan attendee QR code for the fastest workflow.',
                  'If QR scanning fails, check whether the attendee is using Dark Mode.',
                  'Dark Mode may invert QR colours and affect scanner readability.',
                  'Ask the attendee to temporarily switch to Light Mode.',
                  'A Light Mode screenshot of the QR code may also work.',
                  'If QR is unavailable, search manually using attendee details.',
                  'Verify attendee information before printing.',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-sky-100 bg-white/70 p-3"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-sky-500" />

                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100">
                  <Printer className="h-5 w-5 text-sky-700" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">Ready to Print</p>

                  <p className="text-sm text-slate-600">
                    Search or scan an attendee to begin badge printing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT PRINTS */}
          <div className="overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-lg shadow-sky-100">
            <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
              <h3 className="font-bold text-slate-900">
                Recent Printing History
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Last 3 printed badges
              </p>
            </div>

            <div>
              {recentPrints.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500">
                  No badges printed yet
                </div>
              ) : (
                <div className="divide-y divide-sky-100">
                  
                  <div className="space-y-3 p-4">
                    {recentPrints.map((item) => (
                      <div
                        key={`${item._id}-${item.printedAt}`}
                        className="
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-sky-200
        bg-gradient-to-br
        from-white
        via-sky-50/30
        to-sky-100/40
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-sky-300
        hover:shadow-lg
      "
                      >
                        {/* Accent Bar */}
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-500 to-sky-700" />

                        {/* Header */}
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-semibold text-slate-900">
                              {item.prefix} {item.name}
                            </h4>

                            <p className="text-xs text-slate-500">
                              Recently Printed Badge
                            </p>
                          </div>

                          <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                            {new Date(item.printedAt).toLocaleTimeString(
                              'en-IN',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <span className="min-w-[95px] font-medium text-slate-500">
                              Reg. Num:
                            </span>

                            <span className="font-semibold text-slate-900">
                              {item.regNum}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <span className="min-w-[95px] font-medium text-slate-500">
                              Name:
                            </span>

                            <span className="text-slate-800">
                              {item.prefix} {item.name}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <span className="min-w-[95px] font-medium text-slate-500">
                              Profile:
                            </span>

                            <span
                              className="inline-flex rounded-md px-2 py-0.5 text-xs font-semibold text-white"
                              style={{
                                backgroundColor: getCategoryColor(
                                  item.badgeProfileName,
                                ),
                              }}
                            >
                              {item.badgeProfileName}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <span className="min-w-[95px] font-medium text-slate-500">
                              Email:
                            </span>

                            <span className="break-all text-slate-800">
                              {item.email}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <span className="min-w-[95px] font-medium text-slate-500">
                              Mobile:
                            </span>

                            <span className="text-slate-800">
                              {item.mobile}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          SETTINGS + PREVIEW
      ====================================================== */}
      {selectedAttendee && (
        <div className="flex justify-center">
          {selectedAttendee && (
            <div className="flex justify-center">
              <BadgePreview
                attendee={selectedAttendee}
                printRef={printRef as RefObject<HTMLDivElement>}
                qrSize={qrSize}
                qrX={qrX}
                qrY={qrY}
                nameSize={nameFontSize}
                nameWeight={nameWeight}
                nameWidth={nameWidth}
                nameX={nameX}
                nameY={nameY}
              />
            </div>
          )}
        </div>
      )}
      {selectedAttendee && (
        <div className="hidden">
          <BadgePrintLayout
            ref={printRef}
            attendee={selectedAttendee}
            qrSize={qrSize}
            qrX={qrX}
            qrY={qrY}
            nameSize={nameFontSize}
            nameWeight={nameWeight}
            nameWidth={nameWidth}
            nameX={nameX}
            nameY={nameY}
          />
        </div>
      )}
    </div>
  )
}
