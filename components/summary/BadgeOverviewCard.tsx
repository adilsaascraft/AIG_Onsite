
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

import {
  CalendarClock,
  CheckCircle2,
  Ticket,
  XCircle,
} from 'lucide-react'

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
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      <CardHeader className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white">
        <CardTitle className="p-3 font-bold flex items-center gap-2 text-slate-900">
          <Ticket className="h-5 w-5 text-sky-600" />
          Badge Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4">
            <p className="text-xs font-medium text-slate-500">
              Total Badges
            </p>

            <p className="mt-1 text-3xl font-bold text-sky-700">
              {totalBadges}
            </p>
          </div>

          <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-4">
            <p className="text-xs font-medium text-slate-500">
              Printed
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {printed}
            </p>
          </div>

          <div className="rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-4">
            <p className="text-xs font-medium text-slate-500">
              Pending
            </p>

            <p className="mt-1 text-3xl font-bold text-red-600">
              {pending}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium text-slate-700">
              Printing Progress
            </span>

            <Badge className="bg-sky-600 hover:bg-sky-600">
              {progressPercentage}%
            </Badge>
          </div>

          <Progress
            value={progressPercentage}
            className="h-3"
          />

          <div className="mt-3 flex justify-between text-xs text-slate-500">
            <span>{printed} Printed</span>

            <span>{pending} Pending</span>
          </div>
        </div>

        {/* Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />

            <div>
              <p className="text-xs text-slate-500">
                Completed
              </p>

              <p className="font-semibold text-green-700">
                {printed}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3">
            <XCircle className="h-5 w-5 text-red-600" />

            <div>
              <p className="text-xs text-slate-500">
                Remaining
              </p>

              <p className="font-semibold text-red-700">
                {pending}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 border-t border-sky-100 pt-4 text-xs text-slate-500">
          <CalendarClock className="h-4 w-4 text-sky-600" />

          <span>
            Last Updated:{' '}
            {new Date(lastUpdated).toLocaleString(
              'en-IN',
              {
                dateStyle: 'medium',
                timeStyle: 'short',
              },
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
