import ScanTypeGrid from '@/components/scanner/ScanTypeGrid'

interface SingleScanPageProps {
  params: Promise<{
    eventId: string
  }>
}

export default async function SingleScanPage({ params }: SingleScanPageProps) {
  const { eventId } = await params

  return (
    <div className="container mx-auto p-4 md:p-6">
      <ScanTypeGrid eventId={eventId} mode="single" />
    </div>
  )
}
