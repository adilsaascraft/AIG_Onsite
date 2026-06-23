'use client'

import { Card } from '@/components/ui/card'

import { ScanLine, Layers3, Activity } from 'lucide-react'

interface Props {
  rows: any[]
}

export default function ScanModeChart({ rows }: Props) {
  const single = rows.filter((r) => r.scanTypeId?.scanMode === 'single').length

  const multiple = rows.filter(
    (r) => r.scanTypeId?.scanMode === 'multiple',
  ).length

  const total = single + multiple || 1

  const singlePercentage = Math.round((single / total) * 100)

  const multiplePercentage = 100 - singlePercentage

  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-sky-600" />

          <h2 className="font-bold text-slate-900">Scan Mode Analytics</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Single vs multiple scan activity
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Total */}
        <div className="mb-5 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 text-center">
          <p className="text-sm text-slate-500">Total Scan Records</p>

          <p className="mt-2 text-4xl font-bold text-slate-900">
            {single + multiple}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className="
              rounded-2xl
              border
              border-sky-200
              bg-gradient-to-br
              from-sky-50
              to-sky-100/70
              p-4
            "
          >
            <div className="mb-3 flex items-center justify-between">
              <ScanLine className="h-5 w-5 text-sky-700" />

              <span className="rounded-full bg-sky-200 px-2 py-1 text-xs font-semibold text-sky-800">
                {singlePercentage}%
              </span>
            </div>

            <p className="text-sm text-slate-600">Single Scan</p>

            <p className="mt-1 text-3xl font-bold text-sky-900">{single}</p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-indigo-200
              bg-gradient-to-br
              from-indigo-50
              to-indigo-100/70
              p-4
            "
          >
            <div className="mb-3 flex items-center justify-between">
              <Layers3 className="h-5 w-5 text-indigo-700" />

              <span className="rounded-full bg-indigo-200 px-2 py-1 text-xs font-semibold text-indigo-800">
                {multiplePercentage}%
              </span>
            </div>

            <p className="text-sm text-slate-600">Multiple Scan</p>

            <p className="mt-1 text-3xl font-bold text-indigo-900">
              {multiple}
            </p>
          </div>
        </div>

        {/* Distribution Bar */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-slate-600">Scan Distribution</span>

            <span className="font-semibold text-slate-900">
              {singlePercentage}% / {multiplePercentage}%
            </span>
          </div>

          <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="bg-gradient-to-r from-sky-500 to-sky-700 transition-all"
              style={{
                width: `${singlePercentage}%`,
              }}
            />

            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-700 transition-all"
              style={{
                width: `${multiplePercentage}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-500">
            <span>Single Scan</span>
            <span>Multiple Scan</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
