
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'

export interface TrendItem {
  dateTime: string
  prints: number
  timestamp: number
}

interface Props {
  data: TrendItem[]
}

// ======================================================
// TREND COLOR DETECTION
// ======================================================
const getTrendColor = (data: TrendItem[]) => {
  if (!data || data.length < 2) return '#38bdf8'

  const mid = Math.floor(data.length / 2)

  const firstHalf =
    data.slice(0, mid).reduce((sum, d) => sum + d.prints, 0) /
    (mid || 1)

  const secondHalf =
    data.slice(mid).reduce((sum, d) => sum + d.prints, 0) /
    (data.length - mid || 1)

  if (secondHalf > firstHalf) return '#16a34a' // growing
  if (secondHalf < firstHalf) return '#ef4444' // declining

  return '#38bdf8' // stable
}

export default function PrintingTrendChart({
  data,
}: Props) {
  const trendColor = getTrendColor(data)

  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      <CardHeader className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white">
        <CardTitle className="p-3 font-bold text-slate-900">
          Badge Printing Trend
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5">
        <ChartContainer
          config={{
            prints: {
              label: 'Prints',
            },
          }}
          className="h-[450px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 80,
              }}
            >
              <defs>
                {/* Gradient Stroke (premium feel) */}
                <linearGradient
                  id="trendStroke"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor={trendColor} />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="dateTime"
                angle={-35}
                textAnchor="end"
                height={80}
                tickLine={false}
                axisLine={false}
                interval={0}
                fontSize={12}
                stroke="#94a3b8"
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                stroke="#94a3b8"
              />

              <ChartTooltip
                content={<ChartTooltipContent />}
              />

              <Line
                type="monotone"
                dataKey="prints"
                stroke="url(#trendStroke)"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: trendColor,
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 8,
                  fill: trendColor,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
