export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-surface rounded w-1/4"></div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-surface rounded-xl border border-border"></div>
        ))}
      </div>
      <div className="h-64 bg-surface rounded-xl border border-border"></div>
      <div className="h-48 bg-surface rounded-xl border border-border"></div>
    </div>
  );
}
