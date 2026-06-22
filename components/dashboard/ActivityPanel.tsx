'use client'

interface Props {
  scans: any[]
}

export default function ActivityPanel({ scans }: Props) {
  const topVisitors = [...scans]
    .sort((a, b) => (b.scanCount || 0) - (a.scanCount || 0))
    .slice(0, 5)

  const recentActivity = [...scans]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ================= TOP VISITORS ================= */}
      <div className="rounded-2xl border border-sky-100 bg-white shadow-sm">
        <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Top Visitors</h2>

          <p className="text-sm text-slate-500">Highest scanned attendees</p>
        </div>

        <div className="p-4 space-y-3">
          {topVisitors.map((item) => (
            <div
              key={item._id}
              className="group rounded-xl border border-sky-100 bg-sky-50/30 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-sky-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">
                    {item.badgeId?.name || item.regNum}
                  </p>

                  <p className="text-xs text-slate-500">{item.regNum}</p>
                </div>

                <div className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                  {item.scanCount} scans
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="rounded-2xl border border-sky-100 bg-white shadow-sm">
        <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>

          <p className="text-sm text-slate-500">Latest scan logs</p>
        </div>

        <div className="p-4 space-y-3">
          {recentActivity.map((item) => (
            <div
              key={item._id}
              className="group rounded-xl border border-sky-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-sky-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">
                    {item.badgeId?.name || item.regNum}
                  </p>

                  <p className="text-xs text-sky-700 font-medium">
                    {item.scanTypeId?.scanType || 'Unknown'}
                  </p>
                </div>

                <div className="text-right text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
