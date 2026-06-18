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

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/proxy/leads', { params: filters });
        setLeads(res.data);
      } catch (err) {
        console.error('Failed to fetch leads', err);
        // Fallback for demo
        setLeads([
          { id: 1, name: 'Rahul Sharma', phone: '+91 98765 43210', tag: 'HOT', status: 'qualified', source: 'Meta Ads', last_contact: '2023-10-07T10:00:00Z', followup_count: 3 },
          { id: 2, name: 'Priya Patel', phone: '+91 87654 32109', tag: 'WARM', status: 'contacted', source: 'Meta Ads', last_contact: '2023-10-06T15:30:00Z', followup_count: 1 },
          { id: 3, name: 'Amit Kumar', phone: '+91 76543 21098', tag: 'COLD', status: 'new', source: 'Meta Ads', last_contact: null, followup_count: 0 },
          { id: 4, name: 'Sneha Gupta', phone: '+91 65432 10987', tag: 'HOT', status: 'appointment_booked', source: 'Meta Ads', last_contact: '2023-10-07T11:00:00Z', followup_count: 5 },
          { id: 5, name: 'Vikram Singh', phone: '+91 54321 09876', tag: 'COLD', status: 'dead', source: 'Direct', last_contact: '2023-10-01T09:00:00Z', followup_count: 2 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [filters]);

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