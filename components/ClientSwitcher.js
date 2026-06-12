import { useState, useRef, useEffect } from 'react';
import { useClient } from './ClientContext';
import { ChevronDownIcon, BuildingOfficeIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function ClientSwitcher() {
  const { clients, selectedClient, selectClient, isAdmin } = useClient();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getLabel = () => {
    if (!selectedClient) return 'Select a client...';
    if (isAdmin) return '👁️ All Clients (Admin)';
    return `🏢 ${selectedClient.business_name || selectedClient.name}`;
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-primary hover:bg-white/5 transition-colors"
      >
        <span className="truncate flex-1 text-left">{getLabel()}</span>
        <ChevronDownIcon className={`h-4 w-4 ml-2 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-surface border border-border rounded-lg shadow-xl overflow-hidden">
          {/* Admin option */}
          <button
            onClick={() => { selectClient('admin'); setOpen(false); }}
            className={`flex items-center w-full px-3 py-2.5 text-sm text-left transition-colors ${
              isAdmin ? 'bg-accent/10 text-accent' : 'text-primary hover:bg-white/5'
            }`}
          >
            <EyeIcon className="h-4 w-4 mr-2 text-muted" />
            All Clients (Admin View)
          </button>

          <div className="border-t border-border" />

          {/* Client list */}
          {clients.length === 0 ? (
            <div className="px-3 py-4 text-center text-xs text-muted">
              {loading ? 'Loading...' : 'No clients yet. Add one in Onboarding!'}
            </div>
          ) : (
            clients.map((client) => (
              <button
                key={client.id}
                onClick={() => { selectClient(client); setOpen(false); }}
                className={`flex items-center w-full px-3 py-2.5 text-sm text-left transition-colors ${
                  selectedClient?.id === client.id && !isAdmin
                    ? 'bg-accent/10 text-accent'
                    : 'text-primary hover:bg-white/5'
                }`}
              >
                <BuildingOfficeIcon className="h-4 w-4 mr-2 text-muted shrink-0" />
                <div className="min-w-0">
                  <p className="truncate">{client.business_name || client.name}</p>
                  <p className="text-[10px] text-muted truncate">{client.industry || 'General'}</p>
                </div>
              </button>
            ))
          )}

          {/* Refresh button */}
          <div className="border-t border-border p-2">
            <button
              onClick={() => { fetchClients(); setOpen(false); }}
              className="w-full text-center text-[10px] text-muted hover:text-primary py-1"
            >
              Refresh client list
            </button>
          </div>
        </div>
      )}
    </div>
  );
}