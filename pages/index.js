import { useState, useEffect } from 'react';
import axios from 'axios';
import StatsCard from '@/components/StatsCard';
import LeadTable from '@/components/LeadTable';
import LineChart from '@/components/LineChart';
import { 
  ChartBarIcon, 
  FireIcon, 
  CalendarIcon, 
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/proxy/dashboard');
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
        // Fallback for demo if API is not ready
        setData({
          stats: {
            totalLeads: 124,
            hotLeads: 12,
            appointments: 8,
            conversionRate: '6.4%'
          },
          chartData: [
            { date: '2023-10-01', leads: 4 },
            { date: '2023-10-02', leads: 7 },
            { date: '2023-10-03', leads: 5 },
            { date: '2023-10-04', leads: 10 },
            { date: '2023-10-05', leads: 12 },
            { date: '2023-10-06', leads: 8 },
            { date: '2023-10-07', leads: 15 },
          ],
          recentLeads: [
            { id: 1, name: 'Rahul Sharma', phone: '+91 98765 43210', tag: 'HOT', status: 'qualified', source: 'Meta Ads', last_contact: '2023-10-07T10:00:00Z', followup_count: 3 },
            { id: 2, name: 'Priya Patel', phone: '+91 87654 32109', tag: 'WARM', status: 'contacted', source: 'Meta Ads', last_contact: '2023-10-06T15:30:00Z', followup_count: 1 },
            { id: 3, name: 'Amit Kumar', phone: '+91 76543 21098', tag: 'COLD', status: 'new', source: 'Meta Ads', last_contact: null, followup_count: 0 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-[60vh] text-muted">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
        <p className="text-muted">Welcome back, here is what's happening today.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <StatsCard 
          title="Total Leads" 
          value={data.stats.totalLeads} 
          icon={ChartBarIcon} 
          color="#FF4D1C" 
        />
        <StatsCard 
          title="Hot Leads" 
          value={data.stats.hotLeads} 
          icon={FireIcon} 
          color="#FF4D1C" 
        />
        <StatsCard 
          title="Appointments" 
          value={data.stats.appointments} 
          icon={CalendarIcon} 
          color="#22C55E" 
        />
        <StatsCard 
          title="Conv. Rate" 
          value={data.stats.conversionRate} 
          icon={ArrowTrendingUpIcon} 
          color="#F5A623" 
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-primary mb-4">Lead Trends (Last 30 Days)</h2>
        <LineChart data={data.chartData} xKey="date" yKey="leads" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Recent Leads</h2>
          <button 
            onClick={() => router.push('/leads')}
            className="text-sm font-medium text-accent hover:underline"
          >
            View all
          </button>
        </div>
        <LeadTable 
          leads={data.recentLeads} 
          onLeadClick={(lead) => router.push(`/leads/${lead.id}`)} 
        />
      </div>
    </div>
  );
}
