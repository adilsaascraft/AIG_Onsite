'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'

import QuickStats from '@/components/dashboard/QuickStats'
import BadgeBreakdown from '@/components/dashboard/BadgeBreakdown'
import ScanBreakdown from '@/components/dashboard/ScanBreakdown'
import ActivityPanel from '@/components/dashboard/ActivityPanel'

import { getScanSummary } from '@/services/scanSummary.service'
import { apiClient } from '@/lib/apiClient'
import OperationalStatus from '@/components/dashboard/OperationalStatus'
import LiveInsights from '@/components/dashboard/LiveInsights'

export default function ScanSummaryPage() {
  const { eventId } = useParams()

  const [badges, setBadges] = useState<any[]>([])
  const [scans, setScans] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventId || Array.isArray(eventId)) return

    const loadData = async () => {
      try {
        setLoading(true)

        const [badgesResponse, scanResponse] = await Promise.all([
          apiClient(
            `${process.env.NEXT_PUBLIC_API_URL}/api/event-admin/events/${eventId}/onsite/badges`,
          ),

          getScanSummary(eventId),
        ])

        setBadges(badgesResponse?.data || [])

        setScans(scanResponse || [])
      } catch (error) {
        console.error('SUMMARY DASHBOARD ERROR:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [eventId])

  const analytics = useMemo(() => {
    const totalBadges = badges.length

    const totalScans = scans.reduce(
      (sum, item) => sum + (item.scanCount || 0),
      0,
    )

    const uniqueVisitors = new Set(scans.map((item) => item.regNum)).size

    const reEntries = scans.filter((item) => (item.scanCount || 0) > 1).length

    const printedBadges = badges.filter((badge) => badge.badgePrinted).length

    const pendingBadges = totalBadges - printedBadges

    return {
      totalBadges,
      totalScans,
      uniqueVisitors,
      reEntries,
      printedBadges,
      pendingBadges,
    }
  }, [badges, scans])

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-700" />

          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="rounded-2xl bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Event Quick Glance Dashboard</h1>

        <p className="mt-2 text-sky-100">
          Real-time badge printing and scanning overview
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="rounded-lg bg-white/10 px-4 py-2 text-sm">
            Total Badges: {analytics.totalBadges}
          </div>

          <div className="rounded-lg bg-white/10 px-4 py-2 text-sm">
            Printed: {analytics.printedBadges}
          </div>

          <div className="rounded-lg bg-white/10 px-4 py-2 text-sm">
            Pending: {analytics.pendingBadges}
          </div>

          <div className="rounded-lg bg-white/10 px-4 py-2 text-sm">
            Total Scans: {analytics.totalScans}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* QUICK STATS */}
      {/* ========================================= */}

      <QuickStats
        totalBadges={analytics.totalBadges}
        totalScans={analytics.totalScans}
        uniqueVisitors={analytics.uniqueVisitors}
        reEntries={analytics.reEntries}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <OperationalStatus
          totalBadges={analytics.totalBadges}
          printedBadges={analytics.printedBadges}
        />

        <LiveInsights scans={scans} />
      </div>

      {/* ========================================= */}
      {/* BREAKDOWNS */}
      {/* ========================================= */}

      <div className="grid gap-6 xl:grid-cols-2">
        <BadgeBreakdown badges={badges} />

        <ScanBreakdown scans={scans} />
      </div>

      {/* ========================================= */}
      {/* ACTIVITY */}
      {/* ========================================= */}

      <ActivityPanel scans={scans} />
    </div>
  )
}
