'use client'

import { Card } from '@/components/ui/card'

import { RefreshCw, Users, Repeat, TrendingUp } from 'lucide-react'

interface Props {
  rows: any[]
}

export default function ReEntryAnalytics({ rows }: Props) {
  const reEntries = rows.filter((row) => row.scanCount > 1)

  const highest = Math.max(...rows.map((r) => r.scanCount || 0)) || 0

  const total = rows.length || 1

  const reEntryRate = Math.round((reEntries.length / total) * 100)

  return (
    <Card className="overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-sky-600" />

          <h2 className="font-bold text-slate-900">Re-Entry Analytics</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Visitor return & repeat scan insights
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Visitors */}
          <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <Users className="h-5 w-5 text-sky-700" />
            </div>

            <p className="text-sm text-slate-600">Total Visitors</p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {rows.length}
            </p>
          </div>

          {/* Re Entries */}
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <Repeat className="h-5 w-5 text-emerald-700" />

              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                {reEntryRate}%
              </span>
            </div>

            <p className="text-sm text-slate-600">Re-Entries</p>

            <p className="mt-1 text-3xl font-bold text-emerald-700">
              {reEntries.length}
            </p>
          </div>

          {/* Highest Scan */}
          <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>

            <p className="text-sm text-slate-600">Highest Scan Count</p>

            <p className="mt-1 text-3xl font-bold text-amber-600">{highest}</p>
          </div>
        </div>

        {/* Insight Bar */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-slate-600">Re-entry Rate</span>

            <span className="font-semibold text-slate-900">{reEntryRate}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-sky-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-700 transition-all"
              style={{
                width: `${reEntryRate}%`,
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
