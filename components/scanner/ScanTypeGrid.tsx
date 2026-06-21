'use client'

import useSWR from 'swr'
import { Loader2 } from 'lucide-react'

import ScanTypeCard from '@/components/scanner/ScanTypeCard'
import { getScanTypes } from '@/services/scan.service'
import type { ScanMode, ScanType } from '@/components/scanner/types'

import { Card, CardContent } from '@/components/ui/card'

interface ScanTypeGridProps {
  eventId: string
  mode: ScanMode
}

export default function ScanTypeGrid({ eventId, mode }: ScanTypeGridProps) {
  const {
    data: scanTypes,
    error,
    isLoading,
  } = useSWR(
    eventId ? ['scan-types', eventId] : null,
    () => getScanTypes(eventId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    },
  )
  console.log('eventId =>', eventId)

  const filteredScans =
    scanTypes?.filter(
      (scan: ScanType) => scan.scanMode === mode && scan.status === 'Active',
    ) || []

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex min-h-[200px] items-center justify-center p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600">
              Failed to load scan types
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Please refresh the page and try again.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (filteredScans.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-[200px] items-center justify-center p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold">No Scan Types Found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              No active {mode} scan types available.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">
          {mode === 'single' ? 'Single Scan' : 'Multiple Scan'}
        </h2>

        <p className="text-sm text-muted-foreground">
          Available scan categories
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredScans.map((scanType) => (
          <ScanTypeCard
            key={scanType._id}
            eventId={eventId}
            scanType={scanType}
          />
        ))}
      </div>
    </div>
  )
}
