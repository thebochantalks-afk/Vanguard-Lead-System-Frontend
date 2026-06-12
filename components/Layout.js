import { useState } from 'react';
import Sidebar from './Sidebar';
import ClientSwitcher from './ClientSwitcher';
import { useClient } from './ClientContext';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedClient } = useClient();

  return (
    <div className="flex h-screen bg-background text-primary overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto focus:outline-none min-w-0">
        {/* Mobile header with hamburger */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
            {/* Left: hamburger + logo */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 text-muted hover:text-primary rounded-md hover:bg-surface lg:hidden"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="text-base sm:text-lg font-bold text-accent hidden sm:block">Vanguard Growth</span>
            </div>

            {/* Center/Right: Client switcher */}
            <div className="flex-1 max-w-xs mx-2 sm:mx-4">
              <ClientSwitcher />
            </div>

            {/* Spacer for alignment */}
            <div className="w-8 sm:w-10" />
          </div>
        </div>

        <div className="py-4 sm:py-6">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 md:px-8">
            {/* Show which client is selected */}
            {selectedClient && (
              <div className="mb-4 sm:mb-6">
                {selectedClient === 'admin' ? (
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-primary">Admin Dashboard</h1>
                    <p className="text-xs sm:text-sm text-muted">Viewing all clients — aggregate stats across your business.</p>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-primary">{selectedClient.business_name || selectedClient.name}</h1>
                    <p className="text-xs sm:text-sm text-muted">{selectedClient.industry || 'Client'} — manage leads and settings</p>
                  </div>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}