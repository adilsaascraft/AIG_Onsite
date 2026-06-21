'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Progress } from '@/components/ui/progress'

import { Layers3 } from 'lucide-react'

interface Item {
  name: string
  total: number
  printed: number
  pending: number
  percentage: number
}

interface Props {
  items: Item[]
}

export default function SourceBreakdownCard({ items }: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers3 className="h-5 w-5" />
          Source Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {items.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.name}</span>

              <span className="text-sm text-muted-foreground">
                {item.printed}/{item.total}
              </span>
            </div>

            <Progress value={item.percentage} />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Printed {item.printed}</span>

              <span>Pending {item.pending}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
