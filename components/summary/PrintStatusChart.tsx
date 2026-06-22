
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import {
  RadialBarChart,
  RadialBar,
  PolarRadiusAxis,
} from 'recharts'

interface Props {
  printed: number
  pending: number
}

// ======================================================
// PROGRESS COLOR MAPPING (10% step-based)
// ======================================================
const getProgressColor = (percentage: number) => {
  if (percentage === 100) return '#16a34a' // full green

  if (percentage >= 80) return '#22c55e'
  if (percentage >= 60) return '#06b6d4'
  if (percentage >= 40) return '#3b82f6'
  if (percentage >= 30) return '#eab308'
  if (percentage >= 20) return '#f59e0b'
  if (percentage >= 10) return '#f97316'

  return '#ef4444'
}

export default function PrintStatusChart({
  printed,
  pending,
}: Props) {
  const total = printed + pending

  const percentage =
    total === 0 ? 0 : Math.round((printed / total) * 100)

  const chartData = [
    {
      name: 'Printed',
      value: percentage,
    },
  ]

  const progressColor = getProgressColor(percentage)

  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      <CardHeader className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white">
        <CardTitle className="p-3 font-bold text-slate-900">
          Printing Progress
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5">
        {/* RADIAL CHART WRAPPER */}
        <div className="relative flex items-center justify-center">
          <ChartContainer config={{}} className="h-[300px] w-full">
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={90 - percentage * 3.6}
              innerRadius={65}
              outerRadius={105}
            >
              <ChartTooltip content={<ChartTooltipContent />} />

              <PolarRadiusAxis tick={false} axisLine={false} />

              <RadialBar
                dataKey="value"
                cornerRadius={18}
                fill={progressColor}
                background={{ fill: '#e2e8f0' }}
              />
            </RadialBarChart>
          </ChartContainer>

          {/* CENTER KPI */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="text-3xl font-bold leading-none"
              style={{ color: progressColor }}
            >
              {percentage}%
            </div>

            <div className="mt-1 text-xs font-medium text-slate-500">
              Completed
            </div>
          </div>
        </div>

        {/* BREAKDOWN */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center">
            <div className="text-xs text-slate-500">
              Printed
            </div>

            <div className="text-lg font-bold text-green-700">
              {printed}
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center">
            <div className="text-xs text-slate-500">
              Pending
            </div>

            <div className="text-lg font-bold text-red-700">
              {pending}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
