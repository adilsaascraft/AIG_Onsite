'use client'

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

export default function PrintingTrendChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Printing Trend</CardTitle>
      </CardHeader>

      <CardContent>
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
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="dateTime"
                angle={-35}
                textAnchor="end"
                height={80}
                tickLine={false}
                axisLine={false}
                interval={0}
                fontSize={12}
              />

              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />

              <ChartTooltip content={<ChartTooltipContent />} />

              <Line
                type="monotone"
                dataKey="prints"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
