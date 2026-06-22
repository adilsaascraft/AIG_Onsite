
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { PieChart, Pie, Cell } from 'recharts'

interface Props {
  data: {
    name: string
    value: number
  }[]
}

const COLORS = [
  '#38bdf8', // sky
  '#16a34a', // green
  '#dc2626', // red
  '#ca8a04', // yellow
  '#9333ea', // purple
  '#0891b2', // cyan
  '#ea580c', // orange
]

export default function BadgeProfilePieChart({ data }: Props) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      <CardHeader className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white">
        <CardTitle className="p-3 font-bold text-slate-900">
          Badge Profile Distribution
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5">
        <ChartContainer config={{}} className="h-[360px] w-full">
          <PieChart>
            {/* Donut */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <ChartTooltip content={<ChartTooltipContent />} />

            {/* Center Label */}
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-900 text-lg font-bold"
            >
              {total}
            </text>

            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-500 text-xs"
            >
              Total Profiles
            </text>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="
                flex items-center justify-between
                rounded-lg
                border border-sky-100
                bg-sky-50/40
                px-3 py-2
                text-xs
              "
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span className="truncate text-slate-700">
                  {item.name}
                </span>
              </div>

              <span className="font-semibold text-slate-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
