'use client'

import { Card } from '@/components/ui/card'
import { Printer, Clock3 } from 'lucide-react'

interface Props {
  totalBadges: number
  printedBadges: number
}

export default function OperationalStatus({
  totalBadges,
  printedBadges,
}: Props) {
  const pendingBadges = totalBadges - printedBadges

  const printRate =
    totalBadges > 0 ? Math.round((printedBadges / totalBadges) * 100) : 0

  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <Printer className="h-5 w-5 text-sky-600" />

          <h2 className="font-bold text-slate-900">Operational Status</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">Badge printing progress</p>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Total KPI */}
        <div className="mb-5 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 text-center">
          <p className="text-sm text-slate-500">Total Badges</p>

          <p className="mt-2 text-4xl font-bold text-slate-900">
            {totalBadges}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-5 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-100 bg-gradient-to-br from-white to-green-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Printer className="h-4 w-4 text-green-600" />

              <span className="text-sm text-slate-500">Printed</span>
            </div>

            <p className="text-2xl font-bold text-green-700">{printedBadges}</p>
          </div>

          <div className="rounded-xl border border-amber-100 bg-gradient-to-br from-white to-amber-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-amber-600" />

              <span className="text-sm text-slate-500">Pending</span>
            </div>

            <p className="text-2xl font-bold text-amber-700">{pendingBadges}</p>
          </div>
        </div>

        {/* Completion */}
        <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-white via-sky-50/20 to-sky-100/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium text-slate-700">Completion Rate</span>

            <span className="font-bold text-sky-700">{printRate}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-sky-100">
            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-sky-500
                to-sky-700
                transition-all
              "
              style={{
                width: `${printRate}%`,
              }}
            />
          </div>

          <p className="mt-3 text-xs text-slate-500">
            {printedBadges} of {totalBadges} badges printed
          </p>
        </div>
      </div>
    </Card>
  )
}
