'use client'

import { Card } from '@/components/ui/card'

import { Trophy, ScanLine } from 'lucide-react'

export default function TopVisitorsTable({ data }: { data: any[] }) {
  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />

          <h2 className="text-lg font-bold text-slate-900">Top Visitors</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">Most scanned attendees</p>
      </div>

      <div className="p-4">
        {data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-sky-200 bg-sky-50/50 py-10 text-center">
            <Trophy className="mx-auto mb-3 h-10 w-10 text-sky-300" />

            <p className="font-medium text-slate-700">
              No visitor data available
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((item, index) => (
              <div
                key={item.regNum}
                className="
                  group
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
                        flex h-10 w-10 items-center justify-center rounded-xl
                        font-bold
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
                        {item.badgeId?.name || 'Other Visitor'}
                      </h3>

                      <p className="text-sm text-slate-500">{item.regNum}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-sky-100 px-3 py-2">
                    <ScanLine className="h-4 w-4 text-sky-700" />

                    <span className="font-bold text-sky-800">
                      {item.scanCount}
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
