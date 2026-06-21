'use client'

import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  CheckCircle2,
  Repeat,
  ScanLine,
  ShieldCheck,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import type { ScanType } from '@/components/scanner/types'

interface ScanTypeCardProps {
  eventId: string
  scanType: ScanType
}

export default function ScanTypeCard({ eventId, scanType }: ScanTypeCardProps) {
  const router = useRouter()

  const handleStartScan = () => {
    const baseRoute =
      scanType.scanMode === 'single' ? 'single-scan' : 'multi-scan'

    router.push(`/${eventId}/scanning/${baseRoute}/${scanType._id}`)
  }

  return (
    <Card
      className="
        group
        relative
        overflow-hidden
        border-0
        bg-white/90
        backdrop-blur-sm
        shadow-md
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
        hover:shadow-sky-200/60
      "
    >
      {/* Top Accent */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-1
          bg-gradient-to-r
          from-sky-500
          via-cyan-500
          to-sky-700
        "
      />

      {/* Decorative Glow */}
      <div
        className="
          absolute
          -right-12
          -top-12
          h-32
          w-32
          rounded-full
          bg-sky-400/10
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-sky-400/20
        "
      />

      <CardContent className="relative p-6">
        {/* Header */}
        <div className="mb-5">
          {/* Row 1 */}
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-sky-100
                to-sky-200
                text-sky-700
                shadow-sm
              "
            >
              <ScanLine className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {scanType.scanType}
            </h3>
          </div>

          {/* Row 2 */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-slate-500">Scan Access Point</p>

            <span
              className={`
                inline-flex items-center gap-2
                rounded-full px-3 py-1
                text-xs font-semibold
                ${
                  scanType.scanMode === 'single'
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-emerald-100 text-emerald-700'
                }
              `}
            >
              <span
                className={`
                  h-2 w-2 rounded-full animate-pulse
                  ${
                    scanType.scanMode === 'single'
                      ? 'bg-sky-500'
                      : 'bg-emerald-500'
                  }
                `}
              />

              {scanType.scanMode === 'single' ? 'Single Scan' : 'Multiple Scan'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <p className="text-sm leading-6 text-slate-600">
            {scanType.description || 'No description available.'}
          </p>
        </div>

        {/* Rules Section */}
        <div className="space-y-3 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle2 className="h-4 w-4 text-sky-600" />

            <span className="font-medium text-slate-700">
              {scanType.scanMode === 'single'
                ? 'Allows one successful scan'
                : 'Allows repeated scans'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            {scanType.allowReEntry ? (
              <>
                <Repeat className="h-4 w-4 text-emerald-600" />

                <span className="font-medium text-emerald-700">
                  Re-entry allowed
                </span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4 text-orange-500" />

                <span className="font-medium text-orange-700">
                  No re-entry permitted
                </span>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={handleStartScan}
          className="
            mt-6
            h-11
            w-full
            bg-sky-800
            font-medium
            text-white
            transition-all
            duration-300
            hover:bg-sky-900
          "
        >
          Start Scan
          <ArrowRight
            className="
              ml-2
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Button>
      </CardContent>
    </Card>
  )
}
