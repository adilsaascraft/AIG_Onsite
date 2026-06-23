'use client'

import { Card, CardContent } from '@/components/ui/card'

import { ScanLine, Users, Layers3, Activity } from 'lucide-react'

interface Props {
  totalScans: number
  uniqueVisitors: number
  scanTypes: number
  avgScans: number
}

export default function SummaryCards({
  totalScans,
  uniqueVisitors,
  scanTypes,
  avgScans,
}: Props) {
  const cards = [
    {
      title: 'Total Scans',
      value: totalScans,
      icon: ScanLine,
      color: 'text-sky-700',
      bg: 'bg-sky-100',
    },
    {
      title: 'Unique Visitors',
      value: uniqueVisitors,
      icon: Users,
      color: 'text-emerald-700',
      bg: 'bg-emerald-100',
    },
    {
      title: 'Scan Categories',
      value: scanTypes,
      icon: Layers3,
      color: 'text-violet-700',
      bg: 'bg-violet-100',
    },
    {
      title: 'Avg Scan/User',
      value: avgScans,
      icon: Activity,
      color: 'text-amber-700',
      bg: 'bg-amber-100',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <Card
            key={card.title}
            className="
            p-0 
              overflow-hidden
              border-sky-200
              bg-gradient-to-br
              from-white
              via-sky-50/20
              to-sky-100/30
              shadow-lg
              shadow-sky-100
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-sky-300
              hover:shadow-xl
            "
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-slate-900">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`
                    flex h-12 w-12 items-center justify-center
                    rounded-xl
                    ${card.bg}
                  `}
                >
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>

              <div className="mt-4 h-1 w-full rounded-full bg-sky-100">
                <div
                  className="h-1 rounded-full bg-sky-500"
                  style={{ width: '100%' }}
                />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
