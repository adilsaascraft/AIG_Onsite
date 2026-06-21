import ScanTypeGrid from '@/components/scanner/ScanTypeGrid'

interface MultiScanPageProps {
  params: Promise<{
    eventId: string
  }>
}

export default async function MultiScanPage({ params }: MultiScanPageProps) {
  const { eventId } = await params

  return (
    <div className="space-y-6 p-4 md:p-6">

      <ScanTypeGrid eventId={eventId} mode="multiple" />
    </div>
  )
}
