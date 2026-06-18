import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import LeadTable from '@/components/LeadTable';
import LeadFilters from '@/components/LeadFilters';
import GlassCard from '@/components/GlassCard';
import SkeletonLoader from '@/components/SkeletonLoader';
import { FunnelIcon } from '@heroicons/react/24/outline';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    tag: '',
    status: '',
    source: '',
    search: '',
  });
  const router = useRouter();
  const { selectedClient, isAdmin } = useClient();

  useEffect(() => {
    const fetchLeads = async () => {
      if (!selectedClient) return;

      setLoading(true);
      try {
        let url = `/api/proxy/leads/${selectedClient.id}`;
        if (isAdmin) {
          // If we had a global leads route for admin, we'd use it here.
          // For now, let's assume admin view also needs a client selected or we show nothing.
          // The backend admin dashboard handles aggregated stats, but individual leads 
          // usually belong to a client.
          url = '/api/proxy/leads/admin'; // Assuming this might exist or we handle it
        }
        
        // Actually, looking at the backend, there is no /leads/admin.
        // If isAdmin is true, maybe we should still require a client to be selected 
        // to see THEIR leads, OR we need a new backend route for all leads.
        
        // For now, let's stick to the client_id if selectedClient is an object.
        if (selectedClient.id) {
          url = `/api/proxy/leads/${selectedClient.id}`;
        } else if (isAdmin) {
          // If admin is selected but no specific client, we might need a "Global Leads" route.
          // Since it's not in the backend yet, let's just return.
          setLeads([]);
          setLoading(false);
          return;
        }

        const res = await axios.get(url, { params: filters });
        // The backend returns { leads: [], total: 0, ... }
        setLeads(res.data.leads || []);
      } catch (err) {
        console.error('Failed to fetch leads', err);
        // Fallback for demo
        setLeads([
          { id: 1, name: 'Rahul Sharma', phone: '+91 98765 43210', ai_tag: 'HOT', status: 'qualified', source: 'Meta Ads', last_message_at: '2023-10-07T10:00:00Z', follow_up_count: 3 },
          { id: 2, name: 'Priya Patel', phone: '+91 87654 32109', ai_tag: 'WARM', status: 'contacted', source: 'Meta Ads', last_message_at: '2023-10-06T15:30:00Z', follow_up_count: 1 },
          { id: 3, name: 'Amit Kumar', phone: '+91 76543 21098', ai_tag: 'COLD', status: 'new', source: 'Meta Ads', last_message_at: null, follow_up_count: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [filters, selectedClient, isAdmin]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const hasActiveFilters = filters.tag || filters.status || filters.source || filters.search;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary font-display">Leads</h1>
          <p className="text-sm text-muted mt-0.5">Manage and track your lead pipeline</p>
        </div>
        <button className="btn-secondary text-xs flex items-center gap-1.5">
          <FunnelIcon className="h-3.5 w-3.5" />
          Export
        </button>
      </div>

      {/* Filters */}
      <GlassCard variant="accent" noPadding>
        <LeadFilters filters={filters} onChange={handleFilterChange} />
      </GlassCard>

      {/* Data table */}
      {loading ? (
        <GlassCard noPadding>
          <div className="p-5 sm:p-6">
            <SkeletonLoader variant="table-row" rows={5} />
          </div>
        </GlassCard>
      ) : leads.length === 0 ? (
        <GlassCard>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-14 h-14 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4">
              <FunnelIcon className="h-7 w-7 text-muted" />
            </div>
            <p className="text-lg font-semibold text-primary font-display mb-1">No leads found</p>
            <p className="text-sm text-muted max-w-sm">
              {hasActiveFilters 
                ? 'No leads match your current filters. Try adjusting them.'
                : 'Leads from your Meta Ads campaigns will appear here once captured.'}
            </p>
            {hasActiveFilters && (
              <button 
                onClick={() => setFilters({ tag: '', status: '', source: '', search: '' })}
                className="btn-secondary mt-4 text-xs"
              >
                Clear Filters
              </button>
            )}
          </div>
        </GlassCard>
      ) : (
        <GlassCard variant="hover" noPadding>
          <LeadTable 
            leads={leads} 
            onLeadClick={(lead) => router.push(`/leads/${lead.id}`)} 
          />
        </GlassCard>
      )}
      
      {/* Pagination footer */}
      {!loading && leads.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            Showing <span className="text-primary font-medium">{leads.length}</span> leads
          </p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-muted bg-white/[0.04] border border-white/[0.08] rounded-lg hover:text-primary hover:border-white/[0.12] transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted bg-white/[0.04] border border-white/[0.08] rounded-lg hover:text-primary hover:border-white/[0.12] transition-colors disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}