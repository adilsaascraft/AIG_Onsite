'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import ScanScanner from '@/components/scanner/ScanScanner'
import { getScanTypeById } from '@/services/scan.service'
import type { ScanType } from '@/components/scanner/types'

export default function MultiScanScannerPage() {
  const { scanTypeId } = useParams()

  const [scanType, setScanType] = useState<ScanType | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScanType = async () => {
      try {
        const data = await getScanTypeById(scanTypeId as string)

        setScanType(data)
      } catch (error) {
        console.error('Failed to fetch scan type', error)
      } finally {
        setLoading(false)
      }
    }

    if (scanTypeId) {
      fetchScanType()
    }
  }, [scanTypeId])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!scanType) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Scan Type Not Found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Unable to load scan configuration.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <ScanScanner scanTypeId={scanType._id} scanTypeName={scanType.scanType} />
    </div>
  )
}
