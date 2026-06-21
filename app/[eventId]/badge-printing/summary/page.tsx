'use client'

import useSWR from 'swr'
import { useParams } from 'next/navigation'

import { Card, CardContent } from '@/components/ui/card'

import BadgeOverviewCard from '@/components/summary/BadgeOverviewCard'
import SourceBreakdownCard from '@/components/summary/SourceBreakdownCard'
import ProfileBreakdownCard from '@/components/summary/ProfileBreakdownCard'

import RecentPrintActivity from '@/components/summary/RecentPrintActivity'

import BadgeProfilePieChart from '@/components/summary/BadgeProfilePieChart'
import PrintStatusChart from '@/components/summary/PrintStatusChart'
import PrintingTrendChart from '@/components/summary/PrintingTrendChart'

import TopReprintedBadges from '@/components/summary/TopReprintedBadges'

import { buildBadgeSummary } from '@/components/summary/summary-utils'
import { Badge } from '@/components/summary/types'
import { apiClient } from '@/lib/apiClient'

interface BadgesResponse {
  success: boolean
  total: number
  data: Badge[]
}

function SummarySkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Card key={item}>
            <CardContent className="h-[300px] animate-pulse" />
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="h-[220px] animate-pulse" />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="h-[400px] animate-pulse" />
        </Card>

        <Card>
          <CardContent className="h-[400px] animate-pulse" />
        </Card>
      </div>

      <Card>
        <CardContent className="h-[450px] animate-pulse" />
      </Card>

      <Card>
        <CardContent className="h-[300px] animate-pulse" />
      </Card>
    </div>
  )
}

export default function SummaryPage() {
  const { eventId } = useParams()

  if (!eventId || Array.isArray(eventId)) {
    return null
  }

  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/event-admin/events/${eventId}/onsite/badges`

 

  const { data, error, isLoading } = useSWR<BadgesResponse>(API, apiClient)

  if (isLoading) {
    return (
      <div className="p-6">
        <SummarySkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-lg font-semibold">Failed to load dashboard</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Unable to fetch badge summary data.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const badges: Badge[] = data?.data || []

  const summary = buildBadgeSummary(badges)

  return (
    <div className="space-y-6 p-6">
      {/* ====================================================== */}
      {/* Header */}
      {/* ====================================================== */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Badge Summary Dashboard
        </h1>

        <p className="mt-1 text-muted-foreground">
          Badge printing analytics and onsite registration insights
        </p>
      </div>

      {/* ====================================================== */}
      {/* Row 1 */}
      {/* ====================================================== */}

      <div className="grid gap-4 lg:grid-cols-3">
        <BadgeOverviewCard {...summary.overview} />

        <SourceBreakdownCard items={summary.sourceBreakdown} />

        <ProfileBreakdownCard items={summary.profileBreakdown} />
      </div>

      {/* ====================================================== */}
      {/* Row 2 */}
      {/* ====================================================== */}

      <RecentPrintActivity items={summary.recentPrints} />

      {/* ====================================================== */}
      {/* Row 3 */}
      {/* ====================================================== */}

      <div className="grid gap-4 lg:grid-cols-2">
        <BadgeProfilePieChart data={summary.profileChartData} />

        <PrintStatusChart
          printed={summary.printedVsPending.printed}
          pending={summary.printedVsPending.pending}
        />
      </div>

      {/* ====================================================== */}
      {/* Row 4 */}
      {/* ====================================================== */}

      <PrintingTrendChart data={summary.trend} />

      {/* ====================================================== */}
      {/* Row 5 */}
      {/* ====================================================== */}

      <TopReprintedBadges items={summary.topReprints} />
    </div>
  )
}
