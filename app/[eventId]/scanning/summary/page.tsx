'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'

import SummaryCards from '@/components/scan-summary/SummaryCards'
import ScanTypeChart from '@/components/scan-summary/ScanTypeChart'
import TopVisitorsTable from '@/components/scan-summary/TopVisitorsTable'
import RecentActivity from '@/components/scan-summary/RecentActivity'

import HourlyTrendChart from '@/components/scan-summary/HourlyTrendChart'
import BadgeCategoryChart from '@/components/scan-summary/BadgeCategoryChart'
import TopScanTypes from '@/components/scan-summary/TopScanTypes'
import RegistrationTypeChart from '@/components/scan-summary/RegistrationTypeChart'
import SponsorBreakdownChart from '@/components/scan-summary/SponsorBreakdownChart'
import ScanModeChart from '@/components/scan-summary/ScanModeChart'
import StateWiseTable from '@/components/scan-summary/StateWiseTable'
import ReEntryAnalytics from '@/components/scan-summary/ReEntryAnalytics'

import { getScanSummary } from '@/services/scanSummary.service'

export default function ScanSummaryPage() {
  const { eventId } = useParams()

  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventId) return

    const loadData = async () => {
      try {
        setLoading(true)

        const data = await getScanSummary(eventId as string)

        setRows(data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [eventId])

  const analytics = useMemo(() => {
    const totalScans = rows.reduce(
      (sum, item) => sum + (item.scanCount || 0),
      0,
    )

    const uniqueVisitors = new Set(rows.map((r) => r.regNum)).size

    const scanTypesMap: Record<string, number> = {}

    rows.forEach((row) => {
      const key = row?.scanTypeId?.scanType || 'Unknown'

      scanTypesMap[key] = (scanTypesMap[key] || 0) + (row.scanCount || 0)
    })

    return {
      totalScans,

      uniqueVisitors,

      scanTypesCount: Object.keys(scanTypesMap).length,

      avgScans:
        uniqueVisitors > 0 ? (totalScans / uniqueVisitors).toFixed(1) : '0',

      scanTypesData: Object.entries(scanTypesMap).map(([name, value]) => ({
        name,
        value,
      })),

      topVisitors: [...rows]
        .sort((a, b) => (b.scanCount || 0) - (a.scanCount || 0))
        .slice(0, 5),
    }
  }, [rows])

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-muted-foreground">Loading analytics...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Scan Analytics Dashboard</h1>

        <p className="text-muted-foreground">
          Complete event scanning insights
        </p>
      </div>

      {/* KPI Cards */}

      <SummaryCards
        totalScans={analytics.totalScans}
        uniqueVisitors={analytics.uniqueVisitors}
        scanTypes={analytics.scanTypesCount}
        avgScans={Number(analytics.avgScans)}
      />

      {/* Hourly Trend */}

      <HourlyTrendChart rows={rows} />

      {/* Scan Types + Visitors */}

      <div className="grid gap-6 xl:grid-cols-2">
        <ScanTypeChart data={analytics.scanTypesData} />

        <TopVisitorsTable data={analytics.topVisitors} />
      </div>

      {/* Category + Registration */}

      <div className="grid gap-6 xl:grid-cols-2">
        <BadgeCategoryChart rows={rows} />

        <RegistrationTypeChart rows={rows} />
      </div>

      {/* Sponsor + Scan Mode */}

      <div className="grid gap-6 xl:grid-cols-2">
        <SponsorBreakdownChart rows={rows} />

        <ScanModeChart rows={rows} />
      </div>

      {/* Re Entry + States */}

      <div className="grid gap-6 xl:grid-cols-2">
        <ReEntryAnalytics rows={rows} />

        <StateWiseTable rows={rows} />
      </div>

      {/* Top Categories */}

      <TopScanTypes rows={rows} />

      {/* Recent Activity */}

      <RecentActivity data={rows} />
    </div>
  )
}
