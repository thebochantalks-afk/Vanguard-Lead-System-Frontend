import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';
import { 
  ChartBarIcon, 
  UsersIcon, 
  Cog6ToothIcon, 
  UserPlusIcon,
  ShieldCheckIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

export default function Sidebar({ onClose }) {
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();

  const adminNav = [
    { name: 'Dashboard', href: '/', icon: ChartBarIcon },
    { name: 'Leads', href: '/leads', icon: UsersIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    { name: 'Onboarding', href: '/onboarding', icon: UserPlusIcon },
    { name: 'Admin Panel', href: '/admin', icon: ShieldCheckIcon },
  ];

  const clientNav = [
    { name: 'Dashboard', href: '/', icon: ChartBarIcon },
    { name: 'Leads', href: '/leads', icon: UsersIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  const navigation = isAdmin ? adminNav : clientNav;

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <div className="flex h-full w-64 flex-col bg-brand-deep border-r border-white/[0.06] shadow-2xl shadow-black/40">
      {/* Header with logo */}
      <div className="flex h-16 shrink-0 items-center justify-between px-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-premium flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/30 transition-shadow">
            <span className="text-white font-bold text-sm">VG</span>
          </div>
          <div>
            <span className="text-sm font-bold text-primary font-display block leading-tight">Vanguard</span>
            <span className="text-xs font-medium text-accent font-display leading-tight block">Growth</span>
          </div>
        </Link>
        <button onClick={onClose} className="p-1.5 text-muted hover:text-primary rounded-lg hover:bg-white/[0.05] lg:hidden transition-colors">
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Role badge */}
      <div className="px-5 py-3">
        <span className={clsx(
          'text-2xs font-semibold px-2 py-1 rounded-md inline-flex items-center gap-1.5',
          isAdmin 
            ? 'bg-accent/10 text-accent border border-accent/20' 
            : 'bg-success/10 text-success border border-success/20'
        )}>
          <span className={clsx('h-1.5 w-1.5 rounded-full', isAdmin ? 'bg-accent' : 'bg-success')} />
          {isAdmin ? 'Agency Owner' : 'Client'}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-3 py-2 space-y-0.5">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={clsx(
                'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative',
                active
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:bg-white/[0.04] hover:text-primary',
              )}
            >
              {/* Active indicator bar */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-full shadow-glow-accent" />
              )}
              <item.icon className={clsx(
                'mr-3 h-5 w-5 shrink-0 transition-colors',
                active ? 'text-accent' : 'text-muted group-hover:text-primary'
              )} aria-hidden="true" />
              {item.name}
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent opacity-50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Info + Logout */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center min-w-0">
            <div className="h-9 w-9 rounded-lg bg-gradient-premium flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
              {isAdmin ? 'VG' : (user?.businessName || 'C').charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-sm font-medium text-primary truncate">{isAdmin ? 'Agency Owner' : (user?.businessName || 'Client')}</p>
              <p className="text-xs text-muted truncate">{user?.email || ''}</p>
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full inline-flex items-center justify-center text-xs text-muted hover:text-primary py-2 rounded-lg border border-white/[0.08] hover:bg-white/[0.04] transition-all space-x-1.5"
        >
          <ArrowRightOnRectangleIcon className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}