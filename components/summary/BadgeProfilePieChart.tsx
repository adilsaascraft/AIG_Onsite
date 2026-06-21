'use client'

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
  '#2563eb',
  '#16a34a',
  '#dc2626',
  '#ca8a04',
  '#9333ea',
  '#0891b2',
  '#ea580c',
]

export default function BadgeProfilePieChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Profile Distribution</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={{}} className="h-[350px] w-full">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
