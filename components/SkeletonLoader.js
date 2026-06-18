import { clsx } from 'clsx';

/**
 * Premium SkeletonLoader component for loading states.
 * 
 * Variants:
 * - card: Full card skeleton (for StatsCard)
 * - table-row: Table row skeleton
 * - text: Single line text skeleton
 * - chart: Chart area skeleton
 * - custom: Custom dimensions via className
 * 
 * @param {Object} props
 * @param {'card'|'table-row'|'text'|'chart'|'custom'} props.variant
 * @param {number} props.rows - Number of rows for table-row variant (default: 3)
 * @param {number} props.width - Custom width in Tailwind classes
 * @param {number} props.height - Custom height in Tailwind classes
 * @param {string} props.className - Additional classes
 */
export default function SkeletonLoader({ variant = 'text', rows = 3, className }) {
  // Single skeleton item
  const SkeletonItem = ({ width = 'w-full', height = 'h-4', extraClass = '' }) => (
    <div
      className={clsx(
        'relative overflow-hidden rounded-lg',
        'bg-white/[0.04]',
        width,
        height,
        extraClass,
      )}
    >
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );

  // Card skeleton (perfect for StatsCard replacement)
  if (variant === 'card') {
    return (
      <div className={clsx(
        'relative overflow-hidden rounded-xl',
        'bg-white/[0.04] border border-white/[0.08]',
        'p-5 sm:p-6',
        className,
      )}>
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <SkeletonItem width="w-16" height="h-3" />
            <SkeletonItem width="w-24" height="h-7" />
            <SkeletonItem width="w-12" height="h-3" />
          </div>
          <SkeletonItem width="w-10 h-10 rounded-lg" height="" extraClass="shrink-0" />
        </div>
      </div>
    );
  }

  // Table row skeleton
  if (variant === 'table-row') {
    return (
      <div className={clsx('space-y-3', className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 py-3">
            <SkeletonItem width="w-4 h-4 rounded" height="" />
            <SkeletonItem width="w-32" height="h-4" />
            <SkeletonItem width="w-16" height="h-5" />
            <SkeletonItem width="w-20" height="h-5" />
            <SkeletonItem width="w-16" height="h-4" />
            <SkeletonItem width="w-20" height="h-4" />
            <SkeletonItem width="w-8" height="h-4" />
          </div>
        ))}
      </div>
    );
  }

  // Chart skeleton
  if (variant === 'chart') {
    return (
      <div className={clsx(
        'relative overflow-hidden rounded-xl',
        'bg-white/[0.04] border border-white/[0.08]',
        'p-5',
        className,
      )}>
        <div className="space-y-2 mb-4">
          <SkeletonItem width="w-32" height="h-4" />
        </div>
        <div className="flex items-end space-x-2 h-48">
          {[40, 60, 45, 75, 85, 55, 95].map((h, i) => (
            <div key={i} className="flex-1 relative">
              <SkeletonItem width="w-full" height="" extraClass={`h-[${h}%] rounded-t-lg`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Text skeleton (default)
  return (
    <div className={clsx('space-y-2', className)}>
      <SkeletonItem width="w-3/4" height="h-4" />
      <SkeletonItem width="w-1/2" height="h-4" />
    </div>
  );
}