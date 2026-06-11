import { clsx } from 'clsx';

export default function StatusBadge({ status }) {
  const styles = {
    new: 'bg-gray-500/20 text-gray-400',
    contacted: 'bg-blue-500/20 text-blue-400',
    qualified: 'bg-success/20 text-success',
    appointment_booked: 'bg-orange-500/20 text-orange-400',
    closed: 'bg-purple-500/20 text-purple-400',
    dead: 'bg-red-500/20 text-red-400',
  };

  const currentStatus = status || 'new';
  const style = styles[currentStatus] || styles.new;
  const label = currentStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <span className={clsx(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
      style
    )}>
      {label}
    </span>
  );
}
