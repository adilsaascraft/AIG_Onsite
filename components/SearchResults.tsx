
'use client'

import { BadgeRecord } from '@/types/badgePrinting'
import { getCategoryColor } from '@/lib/categoryColors'

interface Props {
  rows: BadgeRecord[]
  printingId: string | null
  onPrint: (row: BadgeRecord) => void
  onSelect: (row: BadgeRecord) => void
}

export function SearchResults({
  rows,
  printingId,
  onPrint,
  onSelect,
}: Props) {
  if (!rows.length) return null

  return (
    
<div className="space-y-3">
  {rows.map((row) => (
    <div
      key={row._id}
      className="
        rounded-xl
        border border-sky-200
        bg-white
        p-4
        shadow-sm
        transition-all
        hover:border-sky-400
        hover:shadow-md
      "
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
              #{row.regNum}
            </span>

            <span
              className="rounded-md px-2.5 py-1 text-xs font-semibold text-white"
              style={{
                backgroundColor: getCategoryColor(
                  row.badgeProfileName
                ),
              }}
            >
              {row.badgeProfileName}
            </span>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            <div>
              <span className="text-xs font-medium text-slate-500">
                Name
              </span>
              <p className="font-semibold text-slate-900">
                {row.prefix} {row.name}
              </p>
            </div>

            <div className="min-w-0">
              <span className="text-xs font-medium text-slate-500">
                Email
              </span>
              <p className="truncate text-slate-700">
                {row.email}
              </p>
            </div>

            <div>
              <span className="text-xs font-medium text-slate-500">
                Mobile
              </span>
              <p className="text-slate-700">
                {row.mobile}
              </p>
            </div>
          </div>
        </div>

        <button
          disabled={printingId === row._id}
          onClick={() => {
            onSelect(row)
            onPrint(row)
          }}
          className={`
            shrink-0
            rounded-lg
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-colors
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${
              row.badgePrinted
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            }
          `}
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
    </div>
  ))}
</div>

  )
}
