'use client'

import { BadgeRecord } from '@/types/badgePrinting'
import { getCategoryColor } from '@/lib/categoryColors'

interface Props {
  rows: BadgeRecord[]

  printingId: string | null
  onPrint: (row: BadgeRecord) => void
  onSelect: (row: BadgeRecord) => void
}

export function SearchResults({ rows, printingId, onPrint, onSelect }: Props) {
  if (!rows.length) return null

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="divide-y">
        {rows.map((row) => (
          <div
            key={row._id}
            className="p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="font-semibold">{row.regNum}</div>

              <div>
                {row.prefix} {row.name}
              </div>

              <div className="text-sm text-muted-foreground">{row.email}</div>
              <div className="text-sm text-muted-foreground">{row.mobile}</div>

              <div className="mt-2">
                <span
                  className="rounded-md px-3 py-1 text-sm font-bold text-white"
                  style={{
                    backgroundColor: getCategoryColor(row.badgeProfileName),
                  }}
                >
                  {row.badgeProfileName}
                </span>
              </div>
            </div>

            <button
              disabled={printingId === row._id}
              onClick={() => {
                onSelect(row)
                onPrint(row)
              }}
              className={`rounded-md px-4 py-2 text-white ${
                row.badgePrinted ? 'bg-red-600' : 'bg-green-600'
              }`}
            >
              {printingId === row._id
                ? row.badgePrinted
                  ? 'Re-Printing...'
                  : 'Printing...'
                : row.badgePrinted
                  ? 'Re-Print Badge'
                  : 'Print Badge'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
