'use client'

interface Props {
  scans: any[]
}

export default function ScanBreakdown({ scans }: Props) {
  const map: Record<string, number> = {}

  scans.forEach((scan) => {
    const type = scan.scanTypeId?.scanType || 'Other'

    map[type] = (map[type] || 0) + (scan.scanCount || 0)
  })

  const data = Object.entries(map)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count)

  const max = Math.max(...data.map((x) => x.count), 1)

  if (!data.length) {
    return (
      <div className="rounded-2xl border border-sky-100 bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-slate-500">No scan data available</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">Scan Categories</h2>

        <p className="text-sm text-slate-500">Breakdown by scan type</p>
      </div>

      {/* Bars */}
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = (item.count / max) * 100

          return (
            <div key={item.name} className="group">
              {/* Label row */}
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700 group-hover:text-sky-700 transition">
                  {item.name}
                </span>

                <span className="font-semibold text-slate-900">
                  {item.count}
                </span>
              </div>

              {/* Track */}
              <div className="h-2 w-full rounded-full bg-sky-100 overflow-hidden">
                {/* Fill */}
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-700 transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
