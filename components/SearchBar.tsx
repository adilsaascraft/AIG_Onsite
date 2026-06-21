'use client'

import { Search } from 'lucide-react'

interface Props {
  search: string
  loading: boolean
  onSearch: () => void
  onChange: (value: string) => void
}

export function SearchBar({ search, loading, onSearch, onChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        value={search}
        onChange={(e) => onChange(e.target.value.toLowerCase())}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder="Search by Reg No, Mobile, Email, Name"
        className="flex-1 rounded-md border px-4 py-2"
      />

      <button
        onClick={onSearch}
        className="h-10 px-5 rounded-md bg-sky-800 hover:bg-sky-900 text-primary-foreground flex items-center gap-2"
      >
        <Search size={16} />
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  )
}
