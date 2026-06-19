'use client'

import { useCallback, useEffect, useRef, useState, RefObject } from 'react'
import { toast } from 'sonner'
import { useReactToPrint } from 'react-to-print'

import { apiClient } from '@/lib/apiClient'

import { SearchBar } from '@/components/SearchBar'
import { SearchResults } from '@/components/SearchResults'
import { useBadgePrintStore } from '@/store/badgePrintStore'
import { BadgePrintLayout } from '@/components/BadgePrintLayout'
import { BadgePreview } from '@/components/BadgePreview'

import type { BadgeRecord } from '@/types/badgePrinting'

export default function BadgePrintPage() {
  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(false)

  const [printingId, setPrintingId] = useState<string | null>(null)

  const [attendees, setAttendees] = useState<BadgeRecord[]>([])

  const [selectedAttendee, setSelectedAttendee] = useState<BadgeRecord | null>(
    null,
  )

  

  const {
    qrSize,
    qrX,
    qrY,

    nameFontSize,
    nameWeight,
    nameWidth,

    nameX,
    nameY,
  } = useBadgePrintStore()

  
  // ======================================================
  // REFS
  // ======================================================

  const scannerRef = useRef<HTMLInputElement>(null)

  const printRef = useRef<HTMLDivElement>(null)

  // ======================================================
  // PRINT
  // ======================================================

  const handlePrintView = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Badge',
  })

  // ======================================================
  // SEARCH
  // ======================================================

  const handleSearch = useCallback(async () => {
    if (!search.trim()) return

    try {
      setLoading(true)

      const data = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/onsite/badges/search?search=${encodeURIComponent(
          search.trim(),
        )}`,
      )

      if (!data.success || !data.data?.length) {
        setAttendees([])
        setSelectedAttendee(null)

        toast.error('No attendee found')

        return
      }

      setAttendees(data.data)
    } catch (error: any) {
      toast.error(error?.message || 'Search failed')
    } finally {
      setLoading(false)
    }
  }, [search])

  // ======================================================
  // DEBOUNCE SEARCH
  // ======================================================

  useEffect(() => {
    if (search.trim().length < 3) return

    const timer = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => clearTimeout(timer)
  }, [search, handleSearch])

  // ======================================================
  // CLEAR RESULTS
  // ======================================================

  useEffect(() => {
    if (!search.trim()) {
      setAttendees([])
      setSelectedAttendee(null)
    }
  }, [search])

  // ======================================================
  // AUTO FOCUS
  // ======================================================

  useEffect(() => {
    scannerRef.current?.focus()
  }, [])

  // ======================================================
  // CTRL + P
  // ======================================================

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault()

        if (selectedAttendee) {
          handlePrint(selectedAttendee)
        }
      }
    }

    window.addEventListener('keydown', listener)

    return () => window.removeEventListener('keydown', listener)
  }, [selectedAttendee])

  // ======================================================
  // PRINT BADGE
  // ======================================================

  const handlePrint = async (attendee: BadgeRecord) => {
    try {
      setPrintingId(attendee._id)

      setSelectedAttendee(attendee)

      const data = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/onsite/badges/print/${attendee._id}`,
        {
          method: 'PUT',
        },
      )

      if (!data.success) {
        toast.error(data.message || 'Print failed')
        return
      }

      handlePrintView()

      setAttendees((prev) =>
        prev.map((row) =>
          row._id === attendee._id
            ? {
                ...row,
                badgePrinted: true,
                printCount: row.printCount + 1,
                lastPrintedAt: new Date().toISOString(),
              }
            : row,
        ),
      )

      setSelectedAttendee({
        ...attendee,
        badgePrinted: true,
        printCount: attendee.printCount + 1,
        lastPrintedAt: new Date().toISOString(),
      })

      toast.success('Badge printed successfully')

      setTimeout(() => {
        scannerRef.current?.focus()
      }, 100)
    } catch (error: any) {
      toast.error(error?.message || 'Print failed')
    } finally {
      setPrintingId(null)
    }
  }

  return (
    <div className="container mx-auto max-w-7xl space-y-5 p-4 md:p-6">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Badge Printing</h1>

        <p className="text-sm text-muted-foreground">
          Search by Reg No, Mobile, Email or Name
        </p>
      </div>

      {/* ======================================================
          SEARCH
      ====================================================== */}

      <SearchBar
        search={search}
        loading={loading}
        onSearch={handleSearch}
        onChange={setSearch}
      />

      {/* ======================================================
          RESULTS
      ====================================================== */}

      <SearchResults
        rows={attendees}
        printingId={printingId}
        onSelect={setSelectedAttendee}
        onPrint={handlePrint}
      />

      {/* ======================================================
          SETTINGS + PREVIEW
      ====================================================== */}

      {selectedAttendee && (
        <div className="flex justify-center">
          {selectedAttendee && (
            <div className="flex justify-center">
              <BadgePreview
                attendee={selectedAttendee}
                printRef={printRef as RefObject<HTMLDivElement>}
                qrSize={qrSize}
                qrX={qrX}
                qrY={qrY}
                nameSize={nameFontSize}
                nameWeight={nameWeight}
                nameWidth={nameWidth}
                nameX={nameX}
                nameY={nameY}
              />
            </div>
          )}
        </div>
      )}

      {selectedAttendee && (
        <div className="hidden">
          <BadgePrintLayout
            ref={printRef}
            attendee={selectedAttendee}
            qrSize={qrSize}
            qrX={qrX}
            qrY={qrY}
            nameSize={nameFontSize}
            nameWeight={nameWeight}
            nameWidth={nameWidth}
            nameX={nameX}
            nameY={nameY}
          />
        </div>
      )}
    </div>
  )
}
