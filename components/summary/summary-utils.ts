import { Badge, BadgeSummary, BreakdownItem, TrendItem } from './types'

function calculateBreakdown(
  data: Badge[],
  getKey: (badge: Badge) => string,
): BreakdownItem[] {
  const map = new Map<
    string,
    {
      total: number
      printed: number
    }
  >()

  data.forEach((badge) => {
    const key = getKey(badge)

    if (!map.has(key)) {
      map.set(key, {
        total: 0,
        printed: 0,
      })
    }

    const current = map.get(key)!

    current.total += 1

    if (badge.badgePrinted) {
      current.printed += 1
    }
  })

  return Array.from(map.entries())
    .map(([name, stats]) => ({
      name,
      total: stats.total,
      printed: stats.printed,
      pending: stats.total - stats.printed,
      percentage:
        stats.total === 0
          ? 0
          : Number(((stats.printed / stats.total) * 100).toFixed(0)),
    }))
    .sort((a, b) => b.total - a.total)
}

export function buildBadgeSummary(badges: Badge[]): BadgeSummary {
  const totalBadges = badges.length

  const printed = badges.filter((badge) => badge.badgePrinted).length

  const pending = totalBadges - printed

  const overview = {
    totalBadges,
    printed,
    pending,
    progressPercentage:
      totalBadges === 0
        ? 0
        : Number(((printed / totalBadges) * 100).toFixed(0)),
    lastUpdated: new Date().toISOString(),
  }

  const sourceBreakdown = calculateBreakdown(badges, (badge) => {
    switch (badge.sourceType) {
      case 'registration':
        return 'Registrations'

      case 'accompany':
        return 'Accompanies'

      case 'manual':
        return 'Manual'

      case 'sponsor_csv':
        return 'External / Sponsor CSV'

      default:
        return 'Other'
    }
  })

  const profileBreakdown = calculateBreakdown(
    badges,
    (badge) => badge.badgeProfileName || 'Other',
  )

  const recentPrints = badges
    .filter((badge) => badge.lastPrintedAt)
    .sort(
      (a, b) =>
        new Date(b.lastPrintedAt!).getTime() -
        new Date(a.lastPrintedAt!).getTime(),
    )
    .slice(0, 4)
    .map((badge) => ({
      id: badge._id,
      name: badge.name,
      regNum: badge.regNum,
      email: badge.email || 'N/A',
      mobile: badge.mobile || 'N/A',
      badgeProfileName: badge.badgeProfileName || 'Other',
      printedAt: badge.lastPrintedAt!,
      printCount: badge.printCount,
    }))

    const trendMap = new Map<
      string,
      {
        prints: number
        timestamp: number
      }
    >()

    badges.forEach((badge) => {
      badge.printLogs?.forEach((log) => {
        const printDate = new Date(log.printedAt)

        const dateTime = printDate.toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          day: '2-digit',
          month: 'short',
          hour: 'numeric',
          hour12: true,
        })

        const timestamp = new Date(
          printDate.getFullYear(),
          printDate.getMonth(),
          printDate.getDate(),
          printDate.getHours(),
        ).getTime()

        if (!trendMap.has(dateTime)) {
          trendMap.set(dateTime, {
            prints: 0,
            timestamp,
          })
        }

        const current = trendMap.get(dateTime)!

        current.prints += 1
      })
    })

    const trend: TrendItem[] = Array.from(trendMap.entries())
      .map(([dateTime, value]) => ({
        dateTime,
        prints: value.prints,
        timestamp: value.timestamp,
      }))
      .sort((a, b) => a.timestamp - b.timestamp)

  const topReprints = badges
    .filter((badge) => badge.printCount > 1)
    .sort((a, b) => b.printCount - a.printCount)
    .slice(0, 10)
    .map((badge) => ({
      id: badge._id,
      name: badge.name,
      regNum: badge.regNum,
      badgeProfileName: badge.badgeProfileName || 'Other',
      printCount: badge.printCount,
    }))

  const profileChartData = profileBreakdown.map((item) => ({
    name: item.name,
    value: item.total,
  }))

  return {
    overview,

    sourceBreakdown,

    profileBreakdown,

    recentPrints,

    trend,

    topReprints,

    printedVsPending: {
      printed,
      pending,
    },

    profileChartData,
  }
}
