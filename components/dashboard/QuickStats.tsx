'use client'

import { Users, ScanLine, BadgeCheck, RotateCcw } from 'lucide-react'

interface Props {
  totalBadges: number
  totalScans: number
  uniqueVisitors: number
  reEntries: number
}

export default function QuickStats({
  totalBadges,
  totalScans,
  uniqueVisitors,
  reEntries,
}: Props) {
  const cards = [
    {
      title: 'Total Badges',
      value: totalBadges,
      icon: BadgeCheck,
      gradient: 'from-sky-50 to-sky-100/60 border-sky-200',
      iconColor: 'text-sky-700',
      valueColor: 'text-sky-900',
    },
    {
      title: 'Total Scans',
      value: totalScans,
      icon: ScanLine,
      gradient: 'from-blue-50 to-sky-100/60 border-sky-200',
      iconColor: 'text-sky-700',
      valueColor: 'text-sky-900',
    },
    {
      title: 'Unique Visitors',
      value: uniqueVisitors,
      icon: Users,
      gradient: 'from-indigo-50 to-sky-100/60 border-sky-200',
      iconColor: 'text-indigo-600',
      valueColor: 'text-slate-900',
    },
    {
      title: 'Re Entries',
      value: reEntries,
      icon: RotateCcw,
      gradient: 'from-emerald-50 to-sky-100/60 border-emerald-200',
      iconColor: 'text-emerald-600',
      valueColor: 'text-emerald-700',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div
            key={card.title}
            className={`
              relative
              overflow-hidden
              rounded-2xl
              border
              bg-gradient-to-br
              ${card.gradient}
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            `}
          >
            {/* subtle glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/30 blur-2xl" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {card.title}
                </p>

                <h2 className={`mt-2 text-3xl font-bold ${card.valueColor}`}>
                  {card.value.toLocaleString()}
                </h2>
              </div>

              <div className="rounded-xl bg-white/60 p-3 shadow-sm backdrop-blur">
                <Icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
