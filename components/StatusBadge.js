import { clsx } from 'clsx';

export default function StatusBadge({ status }) {
  const currentStatus = status || 'new';
  const label = currentStatus.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const styles = {
    new: 'bg-white/[0.05] text-muted border border-white/[0.08]',
    contacted: 'bg-blue-500/10 text-blue-400 border border-blue-500/15',
    qualified: 'bg-success/10 text-success border border-success/15',
    appointment_booked: 'bg-warm/10 text-warm border border-warm/15',
    closed: 'bg-purple-500/10 text-purple-400 border border-purple-500/15',
    dead: 'bg-red-500/10 text-red-400 border border-red-500/15',
  };

  const style = styles[currentStatus] || styles.new;

  return (
    <span className={clsx(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-2xs font-semibold',
      style
    )}>
      {label}
    </span>
  );
}