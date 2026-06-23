'use client'

import { Card } from '@/components/ui/card'

import { Activity, Clock3 } from 'lucide-react'

export default function RecentActivity({ data }: { data: any[] }) {
  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-sky-600" />

          <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Latest visitor scan activity
        </p>
      </div>

      {/* Content */}
      <div className="p-4">
        {data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-sky-200 bg-sky-50/50 py-10 text-center">
            <Activity className="mx-auto mb-3 h-10 w-10 text-sky-300" />

            <p className="font-medium text-slate-700">No recent activity</p>

            <p className="mt-1 text-sm text-slate-500">
              Visitor scans will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.slice(0, 5).map((item) => (
              <div
                key={item._id}
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
                {/* Accent Line */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-500 to-sky-700" />

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {item.badgeId?.name || 'Other Visitor'}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Reg. No: {item.regNum}
                    </p>

                    <div className="mt-2 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                      {item.scanTypeId?.scanType}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg bg-sky-50 px-2 py-1 text-xs text-slate-500">
                    <Clock3 className="h-3.5 w-3.5 text-sky-600" />

                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '--'}
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
