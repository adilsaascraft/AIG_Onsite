'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CalendarClock, CheckCircle2, Ticket, XCircle } from 'lucide-react'

interface Props {
  totalBadges: number
  printed: number
  pending: number
  progressPercentage: number
  lastUpdated: string
}

export default function BadgeOverviewCard({
  totalBadges,
  printed,
  pending,
  progressPercentage,
  lastUpdated,
}: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Ticket className="h-5 w-5" />
          Badge Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{totalBadges}</p>
          </div>

          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Printed</p>
            <p className="text-2xl font-bold text-green-600">{printed}</p>
          </div>

          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-red-600">{pending}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Printing Progress</span>

            <Badge variant="secondary">{progressPercentage}%</Badge>
          </div>

          <Progress value={progressPercentage} />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>{printed} Printed</span>
          </div>

          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <span>{pending} Pending</span>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t pt-3 text-xs text-muted-foreground">
          <CalendarClock className="h-4 w-4" />

          <span>
            Updated{' '}
            {new Date(lastUpdated).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
