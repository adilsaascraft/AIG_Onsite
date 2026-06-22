import { ScanSummaryRecord } from '@/components/scan-summary/types'

const getToken = () => {
  try {
    const auth = localStorage.getItem('onsite-auth')

    if (!auth) return ''

    return JSON.parse(auth)?.state?.token || ''
  } catch {
    return ''
  }
}

export async function getScanSummary(
  eventId: string,
): Promise<ScanSummaryRecord[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}/scan-summary-details`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      cache: 'no-store',
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data.data || []
}
