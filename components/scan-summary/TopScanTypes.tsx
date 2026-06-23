'use client'

import { Card } from '@/components/ui/card'

import { ScanLine, Trophy } from 'lucide-react'

interface Props {
  rows: any[]
}

export default function TopScanTypes({ rows }: Props) {
  const map: Record<string, number> = {}

  rows.forEach((row) => {
    const type = row.scanTypeId?.scanType || 'Other'

    map[type] = (map[type] || 0) + row.scanCount
  })

  const data = Object.entries(map)
    .map(([name, scans]) => ({
      name,
      scans,
    }))
    .sort((a, b) => b.scans - a.scans)

  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />

          <h2 className="text-lg font-bold text-slate-900">
            Top Scan Categories
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Most frequently used scan types
        </p>
      </div>

      {/* Content */}
      <div className="p-4">
        {data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-sky-200 bg-sky-50/50 py-10 text-center">
            <ScanLine className="mx-auto mb-3 h-10 w-10 text-sky-300" />

            <p className="font-medium text-slate-700">No scan data available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((item, index) => (
              <div
                key={item.name}
                className="
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  border-sky-200
                  bg-gradient-to-br
                  from-white
                  via-sky-50/20
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
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-500 to-sky-700" />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        flex h-10 w-10 items-center justify-center rounded-xl font-bold
                        ${
                          index === 0
                            ? 'bg-amber-100 text-amber-700'
                            : index === 1
                              ? 'bg-slate-200 text-slate-700'
                              : index === 2
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-sky-100 text-sky-700'
                        }
                      `}
                    >
                      #{index + 1}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {item.name}
                      </h3>

                      <p className="text-sm text-slate-500">Scan Category</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-sky-100 px-3 py-2">
                    <ScanLine className="h-4 w-4 text-sky-700" />

                    <span className="font-bold text-sky-800">
                      {item.scans.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
