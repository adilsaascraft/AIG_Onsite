'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

export default function ScanTypeChart({
  data,
}: {
  data: {
    name: string
    value: number
  }[]
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const colors = [
    '#0ea5e9', // sky-500
    '#0284c7', // sky-600
    '#0369a1', // sky-700
    '#075985', // sky-800
    '#0c4a6e', // sky-900
    '#38bdf8', // sky-400
    '#7dd3fc', // sky-300
  ]

  return (
    <div className="space-y-4">
      <div className="h-[340px]">
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
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Content */}
        <div className="pointer-events-none -mt-[195px] flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-slate-900">{total}</span>

          <span className="text-sm text-slate-500">Total Scans</span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid gap-2 sm:grid-cols-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="
              flex items-center justify-between
              rounded-xl
              border border-sky-100
              bg-sky-50/50
              px-3 py-2
            "
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: colors[index % colors.length],
                }}
              />

              <span className="text-sm text-slate-700">{item.name}</span>
            </div>

            <span className="font-semibold text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
