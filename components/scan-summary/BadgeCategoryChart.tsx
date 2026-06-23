'use client'

import { Card } from '@/components/ui/card'

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

import { Layers3 } from 'lucide-react'

const COLORS = [
  '#0ea5e9', // sky-500
  '#0284c7', // sky-600
  '#0369a1', // sky-700
  '#075985', // sky-800
  '#0c4a6e', // sky-900
  '#38bdf8', // sky-400
  '#7dd3fc', // sky-300
]

interface Props {
  rows: any[]
}

export default function BadgeCategoryChart({ rows }: Props) {
  const map: Record<string, number> = {}

  rows.forEach((row) => {
    const key = row.badgeId?.badgeProfileName || 'Other'

    map[key] = (map[key] || 0) + 1
  })

  const data = Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }))

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <Layers3 className="h-5 w-5 text-sky-600" />

          <h2 className="text-lg font-bold text-slate-900">Badge Categories</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Scan distribution by badge profile
        </p>
      </div>

      {/* Chart */}
      <div className="p-4">
        <div className="relative h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={3}
                cornerRadius={8}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #bae6fd',
                  boxShadow: '0 10px 25px rgba(14,165,233,0.15)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center KPI */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-slate-900">{total}</span>

            <span className="text-sm text-slate-500">Total Scans</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-sky-100
                bg-sky-50/50
                px-3
                py-2
              "
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />

                <span className="truncate text-sm text-slate-700">
                  {item.name}
                </span>
              </div>

              <span className="font-semibold text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
