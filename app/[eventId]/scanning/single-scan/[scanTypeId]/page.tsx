'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import ScanScanner from '@/components/scanner/ScanScanner'
import { getScanTypeById } from '@/services/scan.service'
import type { ScanType } from '@/components/scanner/types'

export default function SingleScanScannerPage() {
  const { scanTypeId } = useParams()

  const [scanType, setScanType] = useState<ScanType | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScanType = async () => {
      try {
        const data = await getScanTypeById(scanTypeId as string)

        setScanType(data)
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
      <div className="flex min-h-[300px] items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!scanType) {
    return <div className="text-center">Scan Type Not Found</div>
  }

  return (
    <div className="p-4 md:p-6">
      <ScanScanner scanTypeId={scanType._id} scanTypeName={scanType.scanType} />
    </div>
  )
}
