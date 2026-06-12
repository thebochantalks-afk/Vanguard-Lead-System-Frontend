import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  ChartBarIcon, 
  UsersIcon, 
  Cog6ToothIcon, 
  UserPlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: ChartBarIcon },
  { name: 'Leads', href: '/leads', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Onboarding', href: '/onboarding', icon: UserPlusIcon },
];

export default function Sidebar({ onClose }) {
  const router = useRouter();

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <div className="flex h-full w-64 flex-col bg-surface border-r border-border">
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between px-6">
        <span className="text-xl font-bold text-accent">Vanguard Growth</span>
        {/* Close button - only visible on mobile */}
        <button 
          onClick={onClose}
          className="p-1 text-muted hover:text-primary rounded lg:hidden"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`
                group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors
                ${active
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:bg-white/5 hover:text-primary'
                }
              `}
            >
              <item.icon
                className={`
                  mr-3 h-5 w-5 shrink-0
                  ${active ? 'text-accent' : 'text-muted group-hover:text-primary'}
                `}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
            VG
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-sm font-medium text-primary truncate">Vanguard Growth</p>
            <p className="text-xs text-muted truncate">AI Lead System</p>
          </div>
        </div>
      </div>
    </div>
  );
}