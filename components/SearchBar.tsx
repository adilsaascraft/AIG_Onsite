'use client'

import { forwardRef } from 'react'
import { Search } from 'lucide-react'

interface Props {
  search: string
  loading: boolean
  onSearch: () => void
  onChange: (value: string) => void
}

export const SearchBar = forwardRef<HTMLInputElement, Props>(
  ({ search, loading, onSearch, onChange }, ref) => {
    return (
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          ref={ref}
          value={search}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          placeholder="Search by Reg No, Mobile, Email, Name"
          className="flex-1 rounded-md border px-4 py-2"
        />

        <button
          onClick={onSearch}
          className="flex h-10 items-center gap-2 rounded-md bg-sky-800 px-5 text-primary-foreground hover:bg-sky-900"
        >
          <Search size={16} />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    )
  },
)

SearchBar.displayName = 'SearchBar'
