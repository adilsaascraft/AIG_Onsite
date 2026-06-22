
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Users } from 'lucide-react'

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

export default function ProfileBreakdownCard({ items }: Props) {
  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      <CardHeader className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white">
        <CardTitle className="p-3 font-bold flex items-center gap-2 text-slate-900">
          <Users className="h-5 w-5 text-sky-600" />
          Badge Profiles
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        {items.map((item) => (
          <div
            key={item.name}
            className="
              group
              rounded-xl
              border
              border-sky-100
              bg-gradient-to-br
              from-white
              via-sky-50/30
              to-sky-100/40
              p-4
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-sky-300
              hover:shadow-md
            "
          >
            {/* Header */}
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="truncate font-semibold text-slate-900">
                {item.name}
              </span>

              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                {item.printed}/{item.total}
              </span>
            </div>

            {/* Progress */}
            <Progress value={item.percentage} className="h-2" />

            {/* Footer stats */}
            <div className="mt-2 flex justify-between text-xs">
              <span className="text-slate-500">
                Printed{' '}
                <span className="font-semibold text-green-600">
                  {item.printed}
                </span>
              </span>

              <span className="text-slate-500">
                Pending{' '}
                <span className="font-semibold text-red-600">
                  {item.pending}
                </span>
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
