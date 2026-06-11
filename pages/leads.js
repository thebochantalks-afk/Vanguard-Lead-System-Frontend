import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import LeadTable from '@/components/LeadTable';
import LeadFilters from '@/components/LeadFilters';

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
