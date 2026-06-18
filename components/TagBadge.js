import { clsx } from 'clsx';

export default function TagBadge({ tag }) {
  const currentTag = tag?.toUpperCase() || 'UNQUALIFIED';

  const styles = {
    HOT: 'badge-hot',
    WARM: 'badge-warm',
    COLD: 'badge-cold',
  };

  const style = styles[currentTag];

  // Fallback for unknown tags
  if (!style) {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-2xs font-bold uppercase tracking-wider bg-white/[0.05] text-muted border border-white/[0.08]">
        {currentTag}
      </span>
    );
  }

  return <span className={style}>{currentTag}</span>;
}