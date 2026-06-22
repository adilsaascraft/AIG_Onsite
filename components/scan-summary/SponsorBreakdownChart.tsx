'use client'

import { Card } from '@/components/ui/card'

import { Building2, Users } from 'lucide-react'

interface Props {
  rows: any[]
}

export default function SponsorBreakdownChart({ rows }: Props) {
  const sponsors = rows.filter((row) => row.badgeId?.sponsorName).length

  const nonSponsors = rows.length - sponsors

  const total = rows.length || 1

  const sponsorPercentage = Math.round((sponsors / total) * 100)

  const nonSponsorPercentage = 100 - sponsorPercentage

  return (
    <Card className="overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      {/* Header */}
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
        <h2 className="font-bold text-slate-900">Sponsor Breakdown</h2>

        <p className="mt-1 text-sm text-slate-500">
          Sponsor vs non-sponsor visitors
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Total */}
        <div className="mb-5 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 text-center">
          <p className="text-sm text-slate-500">Total Visitors</p>

          <p className="mt-2 text-4xl font-bold text-slate-900">
            {rows.length}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className="
              rounded-2xl
              border
              border-sky-200
              bg-gradient-to-br
              from-sky-50
              to-sky-100/70
              p-4
            "
          >
            <div className="mb-3 flex items-center justify-between">
              <Building2 className="h-5 w-5 text-sky-700" />

              <span className="rounded-full bg-sky-200 px-2 py-1 text-xs font-semibold text-sky-800">
                {sponsorPercentage}%
              </span>
            </div>

            <p className="text-sm text-slate-600">Sponsors</p>

            <p className="mt-1 text-3xl font-bold text-sky-900">{sponsors}</p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-gradient-to-br
              from-slate-50
              to-slate-100
              p-4
            "
          >
            <div className="mb-3 flex items-center justify-between">
              <Users className="h-5 w-5 text-slate-700" />

              <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700">
                {nonSponsorPercentage}%
              </span>
            </div>

            <p className="text-sm text-slate-600">Non Sponsors</p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {nonSponsors}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-600">Sponsor Share</span>

            <span className="font-semibold text-slate-900">
              {sponsorPercentage}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-sky-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-700 transition-all"
              style={{
                width: `${sponsorPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
