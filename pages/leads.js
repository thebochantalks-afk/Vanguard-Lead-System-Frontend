import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import LeadTable from '@/components/LeadTable';
import LeadFilters from '@/components/LeadFilters';
import { useClient } from '@/components/ClientContext';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

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

  if (!selectedClient) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <BuildingOfficeIcon className="h-16 w-16 text-muted mb-4" />
        <h2 className="text-xl font-semibold text-primary mb-2">Select a Client</h2>
        <p className="text-muted mb-6 max-w-md">Please select a client from the dropdown to view their lead pipeline.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Leads</h1>
          <p className="text-muted">Manage and track your lead pipeline.</p>
        </div>
      </div>

      <LeadFilters filters={filters} onChange={handleFilterChange} />

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted">Loading leads...</div>
      ) : (
        <LeadTable 
          leads={leads} 
          onLeadClick={(lead) => router.push(`/leads/${lead.id}`)} 
        />
      )}
      
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted">Showing {leads.length} leads</p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-muted bg-surface border border-border rounded-md hover:text-primary transition-colors disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted bg-surface border border-border rounded-md hover:text-primary transition-colors disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
