import { clsx } from 'clsx';

export default function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-surface border border-border p-5">
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: color }} />
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-muted" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="truncate text-sm font-medium text-muted">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-primary">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
