'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { RadialBarChart, RadialBar, PolarRadiusAxis, Label } from 'recharts'

interface Props {
  printed: number
  pending: number
}

export default function PrintStatusChart({ printed, pending }: Props) {
  const total = printed + pending

  const percentage = total === 0 ? 0 : Math.round((printed / total) * 100)

  const chartData = [
    {
      name: 'Printed',
      value: percentage,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Printing Progress</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={{}} className="h-[350px]">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={90 - percentage * 3.6}
            innerRadius={90}
            outerRadius={130}
          >
            <ChartTooltip content={<ChartTooltipContent />} />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                position="center"
                content={({ viewBox }) => {
                  const box = viewBox as {
                    cx?: number
                    cy?: number
                    x?: number
                    y?: number
                    width?: number
                    height?: number
                  }

                  const cx = box.cx ?? (box.x ?? 0) + (box.width ?? 0) / 2

                  const cy = box.cy ?? (box.y ?? 0) + (box.height ?? 0) / 2

                  return (
                    <text x={cx} y={cy} textAnchor="middle">
                      <tspan
                        x={cx}
                        y={cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {percentage}%
                      </tspan>

                      <tspan
                        x={cx}
                        y={cy + 24}
                        className="fill-muted-foreground text-sm"
                      >
                        Printed
                      </tspan>
                    </text>
                  )
                }}
              />
            </PolarRadiusAxis>

            <RadialBar dataKey="value" cornerRadius={12} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
