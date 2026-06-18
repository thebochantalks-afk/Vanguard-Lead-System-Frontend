import { clsx } from 'clsx';

/**
 * Premium GlassCard component with glassmorphism styling.
 * 
 * Variants:
 * - default: Standard glass card with subtle blur
 * - accent: With accent gradient bar at top
 * - hover: Enhanced hover effects
 * 
 * @param {Object} props
 * @param {'default'|'accent'|'hover'} props.variant - Card variant
 * @param {boolean} props.noPadding - Remove default padding
 * @param {boolean} props.glow - Add inner glow effect
 * @param {string} props.glowColor - CSS color for glow effect
 * @param {React.ReactNode} props.children
 * @param {string} props.className - Additional classes
 * @param {...any} props.rest - Additional props
 */
export default function GlassCard({
  variant = 'default',
  noPadding = false,
  glow = false,
  glowColor = '#FF4D1C',
  children,
  className,
  ...rest
}) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-xl',
        'backdrop-blur-md',
        'border transition-all duration-300',
        // Base glass styling
        'bg-white/[0.04] border-white/[0.08]',
        'shadow-lg shadow-black/30',
        'hover:border-white/[0.12]',
        // Hover variant
        variant === 'hover' && 'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40',
        // Inner glow
        glow && 'shadow-glow-accent',
        // Padding
        !noPadding && 'p-5 sm:p-6',
        className,
      )}
      {...rest}
    >
      {/* Accent gradient bar at top */}
      {variant === 'accent' && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-warm to-accent z-10" />
      )}

      {/* Inner glow effect */}
      {glow && (
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ backgroundColor: glowColor }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}