export interface ScanType {
  _id: string
  eventId: string

  scanType: string
  scanCode: string
  description: string

  scanMode: 'single' | 'multiple'

  allowReEntry: boolean

  scanStartTime?: string
  scanEndTime?: string

  status: string
  isDeleted?: boolean

  createdAt?: string
  updatedAt?: string
}

export interface ScanResponse {
  success: boolean
  message: string

  badge?: {
    id: string
    regNum: string
    name: string
    badgeProfileName: string
  }

  scanType?: {
    id: string
    scanType: string
    scanCode: string
  }

  scanLog?: {
    eventId: string
    badgeId: string
    scanTypeId: string
    regNum: string
    scanCount: number
    createdAt: string
  }
}

export interface RecentScan {
  id: string

  regNum: string
  name: string

  badgeType: string
  scanType: string

  scannedAt: string
}

export interface ScanTypesApiResponse {
  success: boolean
  message: string
  total: number
  data: ScanType[]
}

export interface ScanTypeApiResponse {
  success: boolean
  message: string
  data: ScanType
}

export interface ScanPayload {
  regNum: string
  scanTypeId: string
}

export type ScanMode = 'single' | 'multiple'
