import { useState, useEffect } from 'react';
import axios from 'axios';
import StatsCard from '@/components/StatsCard';
import LeadTable from '@/components/LeadTable';
import LineChart from '@/components/LineChart';
import GlassCard from '@/components/GlassCard';
import { useClient } from '@/components/ClientContext';
import { 
  ChartBarIcon, 
  FireIcon, 
  CalendarIcon, 
  ArrowTrendingUpIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

// Demo data
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

  // Empty state — no client selected
  if (!selectedClient) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center">
            <BuildingOfficeIcon className="h-10 w-10 text-accent" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-primary font-display mb-2">Welcome to Vanguard Growth</h2>
        <p className="text-muted mb-6 max-w-md">
          Your AI-powered lead management system. Select a client or onboard a new one to get started.
        </p>
        <button 
          onClick={() => router.push('/onboarding')}
          className="btn-primary"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Onboard New Client
        </button>
      </div>
    );
  }

  // Loading state — premium skeleton
  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <StatsCard key={i} loading title="" value="" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="skeleton h-8 w-48 mb-4" />
            <div className="glass-card p-5 h-64" />
          </div>
          <div>
            <div className="skeleton h-8 w-32 mb-4" />
            <div className="glass-card p-5 h-64" />
          </div>
        </div>
      </div>
    );
  }

  const totalLeads = data?.stats?.totalLeads || data?.total_leads || 0;
  const hotLeads = data?.stats?.hotLeads || data?.hot_leads || 0;
  const appointments = data?.stats?.appointments || data?.appointments_this_week || 0;
  const convRate = data?.stats?.conversionRate || (data?.conversion_rate ? data.conversion_rate + '%' : '0%');

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page heading */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-primary font-display">
          Dashboard
        </h1>
        <p className="text-sm text-muted mt-0.5">
          Your lead performance at a glance
        </p>
      </div>

      {/* KPI Cards — Premium */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <StatsCard 
          title="Total Leads" 
          value={totalLeads} 
          icon={ChartBarIcon} 
          color="#FF4D1C"
          trend="up"
          trendValue="+8.2%"
          subtitle="This month"
        />
        <StatsCard 
          title="Hot Leads" 
          value={hotLeads} 
          icon={FireIcon} 
          color="#EF4444"
          trend="up"
          trendValue="+15%"
          subtitle="Need immediate attention"
        />
        <StatsCard 
          title="Appointments" 
          value={appointments} 
          icon={CalendarIcon} 
          color="#22C55E"
          trend="neutral"
          trendValue="0%"
          subtitle="This week"
        />
        <StatsCard 
          title="Conv. Rate" 
          value={convRate} 
          icon={ArrowTrendingUpIcon} 
          color="#F5A623"
          trend="up"
          trendValue="+2.1%"
          subtitle="Lead-to-appointment"
        />
      </div>

      {/* Two column: Chart + Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="section-heading mb-3 sm:mb-4">Lead Trends (Last 30 Days)</h2>
          <LineChart 
            data={data?.chartData || data?.daily_leads || []} 
            xKey="date" 
            yKey={data?.chartData ? "leads" : "count"} 
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="section-heading">Today's Schedule</h2>
            <span className="text-xs text-muted flex items-center">
              <CalendarIcon className="h-3.5 w-3.5 mr-1" />
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
          </div>
          <GlassCard>
            <div className="divide-y divide-white/[0.06] -mx-5 -mt-5">
              {todayAppointments.map((apt, idx) => (
                <div key={idx} className="p-4 hover:bg-white/[0.02] transition-colors first:pt-5 last:pb-5">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-16 sm:w-20">
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-md inline-block">
                        {apt.time}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-primary truncate">{apt.name}</p>
                      <p className="text-xs text-muted truncate">{apt.detail}</p>
                    </div>
                    <span 
                      className={`flex-shrink-0 h-2 w-2 rounded-full mt-2 ${
                        apt.status === 'confirmed' ? 'bg-success' : 'bg-warm'
                      }`} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <button className="text-xs font-medium text-accent hover:text-accent/80 transition-colors">
                View all appointments →
              </button>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Hot Leads + Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="section-heading mb-3 sm:mb-4 flex items-center">
            <FireIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent mr-2" />
            Hot Leads — Needs Your Call
          </h2>
          <GlassCard variant="hover">
            <div className="divide-y divide-white/[0.06] -mx-5 -mt-5">
              {hotLeadsUrgent.map((lead, idx) => (
                <div key={idx} className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer first:pt-5 last:pb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-medium text-primary truncate">{lead.name}</p>
                    {lead.tag === 'HOT' ? (
                      <span className="badge-hot">HOT</span>
                    ) : (
                      <span className="badge-warm">WARM</span>
                    )}
                  </div>
                  <p className="text-xs text-muted mb-1">{lead.interest}</p>
                  <div className="flex items-center text-xs text-muted">
                    <PhoneIcon className="h-3 w-3 mr-1" />
                    {lead.phone}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <button 
                onClick={() => router.push('/leads')} 
                className="text-xs font-medium text-accent hover:text-accent/80 transition-colors"
              >
                View all hot leads →
              </button>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="section-heading">Recent Leads</h2>
            <button 
              onClick={() => router.push('/leads')} 
              className="text-xs font-medium text-accent hover:text-accent/80 transition-colors"
            >
              View all
            </button>
          </div>
          <GlassCard variant="hover" noPadding>
            <LeadTable 
              leads={data?.recentLeads || data?.recent_leads || []} 
              onLeadClick={(lead) => router.push(`/leads/${lead.id}`)} 
            />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
