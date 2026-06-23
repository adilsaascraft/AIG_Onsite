'use client'

import { Card } from '@/components/ui/card'

import { MapPin } from 'lucide-react'

interface Props {
  rows: any[]
}

export default function StateWiseTable({ rows }: Props) {
  const map: Record<string, number> = {}

  rows.forEach((row) => {
    const state = row.badgeId?.state || 'Other'

    map[state] = (map[state] || 0) + 1
  })

  const data = Object.entries(map)
    .map(([state, count]) => ({
      state,
      count,
    }))
    .sort((a, b) => b.count - a.count)

  const total = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-sky-600" />

          <h2 className="font-bold text-slate-900">State Wise Attendance</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Geographic distribution of attendees
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        {data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-sky-200 bg-sky-50/50 py-10 text-center">
            <MapPin className="mx-auto mb-3 h-10 w-10 text-sky-300" />

            <p className="font-medium text-slate-700">
              No state data available
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item, index) => {
              const percentage =
                total === 0 ? 0 : Math.round((item.count / total) * 100)

              return (
                <div
                  key={item.state}
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
                  {/* Top Row */}
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold
                          ${
                            index === 0
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-sky-100 text-sky-700'
                          }
                        `}
                      >
                        {index + 1}
                      </span>

                      <span className="font-semibold text-slate-800">
                        {item.state}
                      </span>
                    </div>

                    <span className="text-sm font-bold text-slate-900">
                      {item.count}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 overflow-hidden rounded-full bg-sky-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-700 transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  {/* Footer */}
                  <div className="mt-2 text-right text-xs text-slate-500">
                    {percentage}% of total
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
