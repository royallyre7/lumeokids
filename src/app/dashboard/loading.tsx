export default function DashboardLoading() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse-soft">
      {/* Header skeleton */}
      <div className="h-8 bg-stone-200 rounded-full w-48 mb-6" />

      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card p-4">
            <div className="h-4 bg-stone-200 rounded w-20 mb-2" />
            <div className="h-8 bg-stone-200 rounded w-12" />
          </div>
        ))}
      </div>

      {/* Children cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-stone-200 rounded-full" />
              <div>
                <div className="h-4 bg-stone-200 rounded w-24 mb-1" />
                <div className="h-3 bg-stone-200 rounded w-16" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-stone-200 rounded-full w-16" />
              <div className="h-6 bg-stone-200 rounded-full w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
