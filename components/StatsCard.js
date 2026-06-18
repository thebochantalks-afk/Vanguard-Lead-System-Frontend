import { clsx } from 'clsx';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon } from '@heroicons/react/24/solid';

/**
 * Premium StatsCard with glassmorphism styling, trend indicator, and icon container.
 * 
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Main value to display
 * @param {React.ComponentType} props.icon - Heroicon component
 * @param {string} props.color - Icon/accent color (hex)
 * @param {'up'|'down'|'neutral'|null} props.trend - Trend direction
 * @param {string} props.trendValue - Trend text (e.g. "+12.5%")
 * @param {boolean} props.loading - Show skeleton state
 * @param {string} props.className - Additional classes
 * @param {string} props.subtitle - Optional subtitle below value
 */
export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color = '#FF4D1C',
  trend,
  trendValue,
  loading,
  subtitle,
  className,
}) {
  // Loading state
  if (loading) {
    return (
      <div className={clsx(
        'relative overflow-hidden rounded-xl',
        'bg-white/[0.04] border border-white/[0.08]',
        'p-5 sm:p-6',
        className,
      )}>
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1 min-w-0">
            <div className="relative overflow-hidden rounded h-3 w-16 bg-white/[0.04]">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 2s ease-in-out infinite' }} />
            </div>
            <div className="relative overflow-hidden rounded h-7 w-24 bg-white/[0.04]">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 2s ease-in-out infinite' }} />
            </div>
            <div className="relative overflow-hidden rounded h-3 w-12 bg-white/[0.04]">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 2s ease-in-out infinite' }} />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg w-10 h-10 bg-white/[0.04] shrink-0">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>
    );
  }

  // Trend icon
  const TrendIcon = trend === 'up' ? ArrowTrendingUpIcon :
    trend === 'down' ? ArrowTrendingDownIcon :
    trend === 'neutral' ? MinusIcon : null;

  const trendColor = trend === 'up' ? 'text-success' :
    trend === 'down' ? 'text-error' :
    'text-muted';

  return (
    <div className={clsx(
      'group relative overflow-hidden rounded-xl',
      'backdrop-blur-md',
      'border transition-all duration-300',
      'bg-white/[0.04] border-white/[0.08]',
      'shadow-lg shadow-black/30',
      'hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40',
      'p-5 sm:p-6',
      className,
    )}>
      {/* Inner glow */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />

      {/* Gradient accent bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
        style={{ 
          background: `linear-gradient(90deg, ${color} 0%, ${color}88 100%)`,
        }} 
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <p className="text-xs font-medium text-muted uppercase tracking-wider truncate">
              {title}
            </p>

            {/* Value */}
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl sm:text-3xl font-bold text-primary font-display tracking-tight truncate">
                {value}
              </span>

              {/* Trend badge */}
              {TrendIcon && trendValue && (
                <span className={clsx(
                  'inline-flex items-center gap-0.5 text-xs font-semibold',
                  trendColor,
                )}>
                  <TrendIcon className="h-3 w-3" />
                  {trendValue}
                </span>
              )}
            </div>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xs text-muted mt-1">{subtitle}</p>
            )}
          </div>

          {/* Icon container */}
          {Icon && (
            <div 
              className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ml-3"
              style={{ 
                backgroundColor: `${color}15`,
                color: color,
              }}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}