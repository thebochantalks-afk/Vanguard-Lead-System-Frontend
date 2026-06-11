import { clsx } from 'clsx';

export default function TagBadge({ tag }) {
  const styles = {
    HOT: 'bg-accent/20 text-accent',
    WARM: 'bg-warm/20 text-warm',
    COLD: 'bg-cold/20 text-cold',
    UNQUALIFIED: 'bg-gray-500/20 text-gray-400',
  };

  const currentTag = tag?.toUpperCase() || 'UNQUALIFIED';
  const style = styles[currentTag] || styles.UNQUALIFIED;

  return (
    <span className={clsx(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
      style
    )}>
      {currentTag}
    </span>
  );
}
