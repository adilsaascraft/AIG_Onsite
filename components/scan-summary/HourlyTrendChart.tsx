'use client'

import { Card } from '@/components/ui/card'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import { TrendingUp } from 'lucide-react'

interface Props {
  rows: any[]
}

export default function HourlyTrendChart({ rows }: Props) {
  const map: Record<string, number> = {}

  rows.forEach((row) => {
    const hour = new Date(row.createdAt).toLocaleString('en-IN', {
      hour: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    })

    map[hour] = (map[hour] || 0) + 1
  })

  const data = Object.entries(map).map(([hour, scans]) => ({
    hour,
    scans,
  }))

  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-sky-600" />

          <h2 className="text-lg font-bold text-slate-900">
            Hourly Scan Trend
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Scan activity distribution throughout the day
        </p>
      </div>

      {/* Chart */}
      <div className="p-4">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.5} />

                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e0f2fe"
              />

              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: '#64748b',
                  fontSize: 12,
                }}
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: '#64748b',
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #bae6fd',
                  boxShadow: '0 10px 25px rgba(14,165,233,0.15)',
                }}
              />

              <Area
                type="monotone"
                dataKey="scans"
                stroke="#0284c7"
                strokeWidth={3}
                fill="url(#skyGradient)"
                dot={{
                  r: 4,
                  fill: '#0284c7',
                  strokeWidth: 2,
                  stroke: '#fff',
                }}
                activeDot={{
                  r: 7,
                  fill: '#0369a1',
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
