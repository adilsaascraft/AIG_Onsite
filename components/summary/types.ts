export interface PrintLog {
  _id: string
  printedAt: string
  printedBy: string | null
  reason: string
}

export interface Badge {
  _id: string
  eventId: string

  sourceType: 'registration' | 'accompany' | 'manual' | 'sponsor_csv'

  sourceId: string

  prefix?: string
  name: string
  email?: string
  mobile?: string

  regNum: string

  badgeProfileId?: string | null
  badgeProfileName?: string | null

  registrationType?: string

  sponsorId?: string | null
  sponsorName?: string

  badgePrinted: boolean
  printCount: number
  lastPrintedAt: string | null

  printLogs: PrintLog[]

  city?: string
  state?: string
  country?: string

  isPaid: boolean
  isSuspended: boolean
  isDeleted: boolean

  createdAt: string
  updatedAt: string
}

export interface OverviewStats {
  totalBadges: number
  printed: number
  pending: number
  progressPercentage: number
  lastUpdated: string
}

export interface BreakdownItem {
  name: string
  total: number
  printed: number
  pending: number
  percentage: number
}

export interface RecentPrintItem {
  id: string
  name: string
  email: string
  mobile: string
  regNum: string
  badgeProfileName: string
  printedAt: string
  printCount: number
}

export interface TrendItem {
  dateTime: string
  prints: number
  timestamp: number
}

export interface TopReprintItem {
  id: string
  name: string
  regNum: string
  badgeProfileName: string
  printCount: number
}

export interface BadgeSummary {
  overview: OverviewStats

  sourceBreakdown: BreakdownItem[]

  profileBreakdown: BreakdownItem[]

  recentPrints: RecentPrintItem[]

  trend: TrendItem[]

  topReprints: TopReprintItem[]

  printedVsPending: {
    printed: number
    pending: number
  }

  profileChartData: {
    name: string
    value: number
  }[]
}
