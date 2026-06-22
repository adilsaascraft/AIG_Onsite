export interface ScanSummaryRecord {
  _id: string

  regNum: string

  scanCount: number

  createdAt: string

  badgeId: {
    name: string
    prefix: string
    badgeProfileName: string
    registrationType: string
    sponsorName?: string
    state?: string
  }

  scanTypeId: {
    scanType: string
    scanMode: string
  }
}
