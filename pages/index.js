import { useState, useEffect } from 'react';
import axios from 'axios';
import StatsCard from '@/components/StatsCard';
import LeadTable from '@/components/LeadTable';
import LineChart from '@/components/LineChart';
import { useClient } from '@/components/ClientContext';
import { 
  ChartBarIcon, 
  FireIcon, 
  CalendarIcon, 
  ArrowTrendingUpIcon,
  PhoneIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const todayAppointments = [
  { time: '10:00 AM', name: 'Rahul Sharma', detail: '3BHK • ₹80L budget', status: 'confirmed' },
  { time: '12:30 PM', name: 'Priya Mehta', detail: '2BHK • ₹55L budget', status: 'confirmed' },
  { time: '3:00 PM', name: 'Amit Verma', detail: 'Villa • ₹1.2Cr budget', status: 'pending' },
];

const hotLeadsUrgent = [
  { name: 'Deepak Nair', phone: '98765 43210', interest: '3BHK Sector 62', tag: 'HOT' },
  { name: 'Sneha Patel', phone: '87654 32109', interest: '2BHK Noida Ext', tag: 'HOT' },
  { name: 'Vikram Singh', phone: '76543 21098', interest: 'Office Space Dwarka', tag: 'WARM' },
];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { selectedClient, isAdmin } = useClient();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = '/api/proxy/dashboard/admin';
        if (selectedClient && !isAdmin) {
          url = `/api/proxy/dashboard/${selectedClient.id}`;
        }
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
        // Demo fallback
        setData({
          stats: {
            totalLeads: 124,
            hotLeads: 12,
            appointments: 8,
            conversionRate: '6.4%'
          },
          chartData: [
            { date: 'Oct 01', leads: 4 },
            { date: 'Oct 02', leads: 7 },
            { date: 'Oct 03', leads: 5 },
            { date: 'Oct 04', leads: 10 },
            { date: 'Oct 05', leads: 12 },
            { date: 'Oct 06', leads: 8 },
            { date: 'Oct 07', leads: 15 },
          ],
          recentLeads: [
            { id: 1, name: 'Rahul Sharma', phone: '+91 98765 43210', ai_tag: 'HOT', status: 'qualified', source: 'Meta Ads', last_message_at: '2023-10-07T10:00:00Z', follow_up_count: 3 },
            { id: 2, name: 'Priya Patel', phone: '+91 87654 32109', ai_tag: 'WARM', status: 'contacted', source: 'Meta Ads', last_message_at: '2023-10-06T15:30:00Z', follow_up_count: 1 },
            { id: 3, name: 'Amit Kumar', phone: '+91 76543 21098', ai_tag: 'COLD', status: 'new', source: 'Meta Ads', last_message_at: null, follow_up_count: 0 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedClient, isAdmin]);

  if (!selectedClient) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <BuildingOfficeIcon className="h-16 w-16 text-muted mb-4" />
        <h2 className="text-xl font-semibold text-primary mb-2">Welcome to Vanguard Growth</h2>
        <p className="text-muted mb-6 max-w-md">Select a client from the dropdown above or create a new one.</p>
        <button 
          onClick={() => router.push('/onboarding')}
          className="bg-accent text-white px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          ➕ Onboard New Client
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="flex items-center justify-center h-[60vh] text-muted">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <StatsCard title="Total Leads" value={data?.stats?.totalLeads || data?.total_leads || 0} icon={ChartBarIcon} color="#FF4D1C" />
        <StatsCard title="Hot Leads" value={data?.stats?.hotLeads || data?.hot_leads || 0} icon={FireIcon} color="#FF4D1C" />
        <StatsCard title="Appointments" value={data?.stats?.appointments || data?.appointments_this_week || 0} icon={CalendarIcon} color="#22C55E" />
        <StatsCard title="Conv. Rate" value={data?.stats?.conversionRate || (data?.conversion_rate ? data.conversion_rate + '%' : '0%')} icon={ArrowTrendingUpIcon} color="#F5A623" />
      </div>

      {/* Two column: Chart + Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-sm sm:text-lg font-semibold text-primary mb-3 sm:mb-4">Lead Trends (Last 30 Days)</h2>
          <LineChart data={data?.chartData || data?.daily_leads || []} xKey="date" yKey={data?.chartData ? "leads" : "count"} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-sm sm:text-lg font-semibold text-primary">Today's Schedule</h2>
            <span className="text-xs text-muted flex items-center">
              <CalendarIcon className="h-3.5 w-3.5 mr-1" />
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
          </div>
          <div className="bg-surface border border-border rounded-xl divide-y divide-border">
            {todayAppointments.map((apt, idx) => (
              <div key={idx} className="p-3 sm:p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-16 sm:w-20">
                    <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-md inline-block">{apt.time}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-primary truncate">{apt.name}</p>
                    <p className="text-xs text-muted truncate">{apt.detail}</p>
                  </div>
                  <span className={`flex-shrink-0 h-2 w-2 rounded-full mt-2 ${apt.status === 'confirmed' ? 'bg-success' : 'bg-warm'}`} />
                </div>
              </div>
            ))}
            <div className="p-3 sm:p-4 text-center">
              <button className="text-xs text-accent hover:underline">View all appointments →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Hot Leads + Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="text-sm sm:text-lg font-semibold text-primary mb-3 sm:mb-4 flex items-center">
            <FireIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent mr-2" />
            Hot Leads — Needs Your Call
          </h2>
          <div className="bg-surface border border-border rounded-xl divide-y divide-border">
            {hotLeadsUrgent.map((lead, idx) => (
              <div key={idx} className="p-3 sm:p-4 hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-primary truncate">{lead.name}</p>
                  {lead.ai_tag === 'HOT' || lead.tag === 'HOT' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent">HOT</span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-warm/20 text-warm">WARM</span>
                  )}
                </div>
                <p className="text-xs text-muted mb-1">{lead.interest}</p>
                <div className="flex items-center text-[11px] text-muted">
                  <PhoneIcon className="h-3 w-3 mr-1" />
                  {lead.phone}
                </div>
              </div>
            ))}
            <div className="p-3 sm:p-4 text-center">
              <button onClick={() => router.push('/leads')} className="text-xs text-accent hover:underline">
                View all hot leads →
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-sm sm:text-lg font-semibold text-primary">Recent Leads</h2>
            <button onClick={() => router.push('/leads')} className="text-xs sm:text-sm font-medium text-accent hover:underline">
              View all
            </button>
          </div>
          <LeadTable 
            leads={data?.recentLeads || data?.recent_leads || []} 
            onLeadClick={(lead) => router.push(`/leads/${lead.id}`)} 
          />
        </div>
      </div>
    </div>
  );
}
