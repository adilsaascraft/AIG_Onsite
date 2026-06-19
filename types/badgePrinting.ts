export interface BadgeRecord {
  _id: string
  regNum: string
  name: string
  prefix?: string
  email: string
  mobile: string
  badgeProfileName: string
  badgePrinted: boolean
  printCount: number
  lastPrintedAt?: string | null
}
