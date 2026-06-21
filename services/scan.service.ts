import type {
  ScanResponse,
  ScanType,
  ScanTypeApiResponse,
  ScanTypesApiResponse,
} from '@/components/scanner/types'

const getAuthToken = () => {
  if (typeof window === 'undefined') return ''

  const authData = localStorage.getItem('onsite-auth')

  if (!authData) return ''

  try {
    const parsed = JSON.parse(authData)

    return parsed?.state?.token || ''
  } catch (error) {
    console.error('Failed to parse auth data', error)
    return ''
  }
}

const getHeaders = () => {
  const token = getAuthToken()

  return {
    'Content-Type': 'application/json',
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  }
}

export const getScanTypes = async (eventId: string): Promise<ScanType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}/scan-types`,
    {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store',
    },
  )

  const data: ScanTypesApiResponse = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to fetch scan types')
  }

  return data.data || []
}

export const getScanTypeById = async (
  scanTypeId: string,
): Promise<ScanType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/scan-types/${scanTypeId}`,
    {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store',
    },
  )

  const data: ScanTypeApiResponse = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to fetch scan type')
  }

  return data.data
}

export const scanBadge = async ({
  regNum,
  scanTypeId,
}: {
  regNum: string
  scanTypeId: string
}): Promise<ScanResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/onsite/scan`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        regNum,
        scanTypeId,
      }),
    },
  )

  const data: ScanResponse = await response.json()

  return data
}
