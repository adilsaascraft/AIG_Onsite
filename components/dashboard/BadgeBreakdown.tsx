'use client'

import { Card } from '@/components/ui/card'

import { Layers3 } from 'lucide-react'

interface Props {
  badges: any[]
}

export default function BadgeBreakdown({ badges }: Props) {
  const badgeMap: Record<string, number> = {}

  badges.forEach((badge) => {
    const key = badge.badgeProfileName || 'Unknown'

    badgeMap[key] = (badgeMap[key] || 0) + 1
  })

  const data = Object.entries(badgeMap)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count)

  const total = data.reduce((sum, item) => sum + item.count, 0)

  const max = Math.max(...data.map((x) => x.count), 1)

  return (
    <Card className="overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <Layers3 className="h-5 w-5 text-sky-600" />

          <h2 className="font-bold text-slate-900">Badge Categories</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Distribution of badge profiles
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Total KPI */}
        <div className="mb-5 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 text-center">
          <p className="text-sm text-slate-500">Total Badges</p>

          <p className="mt-2 text-4xl font-bold text-slate-900">{total}</p>
        </div>

        {/* Breakdown */}
        <div className="space-y-4">
          {data.map((item, index) => {
            const percentage = Math.round((item.count / total) * 100)

            return (
              <div
                key={item.name}
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
                {/* Top row */}
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
                      {item.name}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-slate-900">{item.count}</div>

                    <div className="text-xs text-slate-500">{percentage}%</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 overflow-hidden rounded-full bg-sky-100">
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
                      width: `${(item.count / max) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
