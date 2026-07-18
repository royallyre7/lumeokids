export default function ChildDetailLoading() {
  return (
    <div className="max-w-2xl mx-auto animate-pulse-soft">
      {/* Back link skeleton */}
      <div className="h-4 bg-stone-200 rounded w-32 mb-6" />

      {/* Header skeleton */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-stone-200 rounded-full" />
          <div>
            <div className="h-6 bg-stone-200 rounded w-32 mb-2" />
            <div className="h-4 bg-stone-200 rounded w-24" />
          </div>
        </div>
      </div>

      {/* Info cards skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-4">
            <div className="h-4 bg-stone-200 rounded w-20 mb-2" />
            <div className="h-6 bg-stone-200 rounded w-16" />
          </div>
        ))}
      </div>

      {/* Action buttons skeleton */}
      <div className="flex gap-3">
        <div className="h-10 bg-stone-200 rounded-full w-32" />
        <div className="h-10 bg-stone-200 rounded-full w-28" />
      </div>
    </div>
  );
}
