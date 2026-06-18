import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ClientSwitcher from './ClientSwitcher';
import { useClient } from './ClientContext';
import { useAuth } from './AuthContext';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedClient, selectClient } = useClient();
  const { user, isAdmin, isClient } = useAuth();

  // When a client logs in, auto-select their data
  useEffect(() => {
    if (isClient && user?.clientId) {
      selectClient({ id: user.clientId, business_name: user.businessName, name: user.name });
    }
  }, [user, isClient]);

  return (
    <div className="flex h-screen bg-background text-primary overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-all duration-300 ease-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto focus:outline-none min-w-0">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 backdrop-blur-xl border-b border-white/[0.06] bg-background/80">
          <div className="flex items-center justify-between px-3 sm:px-6 py-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-muted hover:text-primary rounded-lg hover:bg-white/[0.04] lg:hidden transition-colors"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
              <span className="text-sm font-bold text-accent hidden sm:block font-display">
                Vanguard Growth
              </span>
            </div>

            {/* Client switcher — only for admin */}
            {isAdmin && (
              <div className="flex-1 max-w-xs mx-2 sm:mx-4">
                <ClientSwitcher />
              </div>
            )}

            {/* Spacer for right side */}
            <div className="w-8 sm:w-10" />
          </div>
        </div>

        {/* Page content */}
        <div className="py-5 sm:py-8">
          <div className="mx-auto max-w-5xl px-3 sm:px-6 md:px-8">
            {/* Client header — show for non-admin */}
            {isClient && selectedClient && selectedClient !== 'admin' && (
              <div className="mb-6 animate-fade-in">
                <h1 className="text-xl sm:text-2xl font-bold text-primary font-display">
                  {selectedClient.business_name || 'Dashboard'}
                </h1>
                <p className="text-sm text-muted mt-0.5">
                  {selectedClient.industry || 'Your business'} — AI-powered lead management
                </p>
              </div>
            )}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}