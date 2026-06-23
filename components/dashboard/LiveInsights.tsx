'use client'

import { Card } from '@/components/ui/card'

import { Activity, ScanLine, UserRound, Clock3 } from 'lucide-react'

interface Props {
  scans: any[]
}

export default function LiveInsights({ scans }: Props) {
  const scanTypeMap: Record<string, number> = {}

  scans.forEach((scan) => {
    const type = scan?.scanTypeId?.scanType || 'Other'

    scanTypeMap[type] = (scanTypeMap[type] || 0) + (scan.scanCount || 0)
  })

  const mostUsedScanPoint =
    Object.entries(scanTypeMap)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count)[0] || null

  const mostActiveVisitor =
    [...scans].sort((a, b) => (b.scanCount || 0) - (a.scanCount || 0))[0] ||
    null

  const latestScan =
    [...scans].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0] || null

  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-sky-600" />

          <h2 className="font-bold text-slate-900">Live Insights</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">Real-time event activity</p>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Most Used Scan Point */}
        <div
          className="
            rounded-xl
            border
            border-sky-100
            bg-gradient-to-br
            from-white
            via-sky-50/20
            to-sky-100/40
            p-4
          "
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-full bg-sky-100 p-2">
              <ScanLine className="h-4 w-4 text-sky-700" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wide text-sky-700">
              Most Used Scan Point
            </span>
          </div>

          <p className="text-lg font-bold text-slate-900">
            {mostUsedScanPoint?.name || '-'}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {mostUsedScanPoint?.count || 0} scans
          </p>
        </div>

        {/* Most Active Visitor */}
        <div
          className="
            rounded-xl
            border
            border-sky-100
            bg-gradient-to-br
            from-white
            via-sky-50/20
            to-sky-100/40
            p-4
          "
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-full bg-green-100 p-2">
              <UserRound className="h-4 w-4 text-green-700" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wide text-green-700">
              Most Active Visitor
            </span>
          </div>

          <p className="text-lg font-bold text-slate-900">
            {mostActiveVisitor?.regNum || '-'}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {mostActiveVisitor?.scanCount || 0} scans
          </p>
        </div>

        {/* Latest Scan */}
        <div
          className="
            rounded-xl
            border
            border-sky-100
            bg-gradient-to-br
            from-white
            via-sky-50/20
            to-sky-100/40
            p-4
          "
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-full bg-amber-100 p-2">
              <Clock3 className="h-4 w-4 text-amber-700" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              Latest Scan
            </span>
          </div>

          <p className="text-lg font-bold text-slate-900">
            {latestScan?.scanTypeId?.scanType || '-'}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {latestScan?.createdAt
              ? new Date(latestScan.createdAt).toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                })
              : '-'}
          </p>
        </div>
      </div>
    </Card>
  )
}
