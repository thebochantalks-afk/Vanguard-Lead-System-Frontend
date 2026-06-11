import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  ChartBarIcon, 
  UsersIcon, 
  Cog6ToothIcon, 
  UserPlusIcon 
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/', icon: ChartBarIcon },
  { name: 'Leads', href: '/leads', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Onboarding', href: '/onboarding', icon: UserPlusIcon },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="flex h-full w-64 flex-col bg-surface border-r border-border">
      <div className="flex h-16 shrink-0 items-center px-6">
        <span className="text-xl font-bold text-accent">Vanguard Growth</span>
      </div>
      <nav className="flex flex-1 flex-col px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:bg-white/5 hover:text-primary'
              )}
            >
              <item.icon
                className={clsx(
                  'mr-3 h-5 w-5 shrink-0',
                  isActive ? 'text-accent' : 'text-muted group-hover:text-primary'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-primary">Admin User</p>
            <p className="text-xs text-muted">vanguard-growth.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
