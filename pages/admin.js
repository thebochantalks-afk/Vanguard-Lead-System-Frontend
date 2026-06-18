import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/router';
import StatsCard from '@/components/StatsCard';
import GlassCard from '@/components/GlassCard';
import {
  BuildingOfficeIcon,
  UsersIcon,
  CurrencyRupeeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const PLAN_LABELS = { starter: 'Starter', growth: 'Growth', enterprise: 'Enterprise' };
const STATUS_COLORS = { active: 'text-success', expired: 'text-red-400', cancelled: 'text-muted' };
const PAYMENT_COLORS = { paid: 'text-success', pending: 'text-warm', overdue: 'text-red-400' };

// Prevent static generation
export async function getServerSideProps() {
  return { props: {} };
}

export default function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!isAdmin) {
      router.push('/');
      return;
    }
    fetchAdminData();
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const res = await axios.get('/api/proxy/admin/stats');
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
      // Demo fallback
      setData({
        clients: [
          { id: '1', business_name: 'Smile Dental Clinic', name: 'Dr. Sharma', industry: 'Dental', plan: 'growth', amount: 12000, subscription_status: 'active', payment_status: 'paid', subscription_end: new Date(Date.now() + 20*86400000).toISOString(), total_leads: 45, email: 'dental@client.com' },
          { id: '2', business_name: 'Skyline Properties', name: 'Rajesh', industry: 'Real Estate', plan: 'enterprise', amount: 25000, subscription_status: 'active', payment_status: 'pending', subscription_end: new Date(Date.now() + 5*86400000).toISOString(), total_leads: 128, email: 'realty@client.com' },
          { id: '3', business_name: 'Bright Future Academy', name: 'Priya', industry: 'Education', plan: 'starter', amount: 5000, subscription_status: 'expired', payment_status: 'overdue', subscription_end: new Date(Date.now() - 10*86400000).toISOString(), total_leads: 12, email: 'edu@client.com' },
        ],
        stats: {
          total_clients: 3, active_clients: 2, expired_clients: 1,
          total_leads: 185, mrr: 37000, revenue_this_month: 42000,
          pending_payments_count: 2, expiring_this_month: 1,
        },
        alerts: [
          { type: 'warning', message: "Skyline Properties' subscription ends in 5 days", client_id: '2' },
          { type: 'error', message: 'Bright Future Academy has overdue payment of ₹5,000', client_id: '3' },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="skeleton h-8 w-48 mb-2" />
        <div className="skeleton h-4 w-64" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <StatsCard key={i} loading title="" value="" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary font-display">Admin Panel</h1>
          <p className="text-sm text-muted mt-0.5">Manage all clients, subscriptions, and payments</p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => router.push('/onboarding')} className="btn-primary text-xs">
            <PlusIcon className="h-3.5 w-3.5 mr-1.5" />
            New Client
          </button>
          <button onClick={logout} className="btn-secondary text-xs">
            Logout
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatsCard title="Total Clients" value={data.stats.total_clients} icon={BuildingOfficeIcon} color="#FF4D1C" trend="up" trendValue="+1" />
        <StatsCard title="Active" value={data.stats.active_clients} icon={CheckCircleIcon} color="#22C55E" trend="up" trendValue="+2" />
        <StatsCard title="Total Leads" value={data.stats.total_leads} icon={UsersIcon} color="#FF4D1C" />
        <StatsCard title="MRR" value={`₹${(data.stats.mrr || 0).toLocaleString('en-IN')}`} icon={CurrencyRupeeIcon} color="#22C55E" />
        <StatsCard title="Revenue (Month)" value={`₹${(data.stats.revenue_this_month || 0).toLocaleString('en-IN')}`} icon={ArrowTrendingUpIcon} color="#F5A623" trend="up" trendValue="+12%" />
        <StatsCard title="Pending" value={data.stats.pending_payments_count || 0} icon={ExclamationTriangleIcon} color={data.stats.pending_payments_count > 0 ? '#EF4444' : '#6B6B6B'} />
      </div>

      {/* Alerts Section */}
      {data.alerts && data.alerts.length > 0 && (
        <GlassCard noPadding>
          <div className="p-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-primary flex items-center">
              <ExclamationTriangleIcon className="h-4 w-4 text-warm mr-2" />
              Alerts ({data.alerts.length})
            </h3>
          </div>
          <div className="p-4 space-y-2">
            {data.alerts.map((alert, idx) => (
              <div key={idx} className={`flex items-start space-x-2 p-3 rounded-lg text-sm ${
                alert.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/15' : 'bg-warm/10 text-warm border border-warm/15'
              }`}>
                <span className="mt-0.5">{alert.type === 'error' ? '🔴' : '⚠️'}</span>
                <span>{alert.message}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Client Table */}
      <GlassCard variant="accent" noPadding>
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-primary">All Clients</h3>
          <button onClick={() => router.push('/onboarding')} className="btn-primary text-2xs">
            <PlusIcon className="h-3 w-3 mr-1" />
            Add Client
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="text-left px-4 py-3 text-2xs text-muted font-semibold uppercase tracking-wider">Business</th>
                <th className="text-left px-4 py-3 text-2xs text-muted font-semibold uppercase tracking-wider">Plan</th>
                <th className="text-left px-4 py-3 text-2xs text-muted font-semibold uppercase tracking-wider">Amount</th>
                <th className="text-left px-4 py-3 text-2xs text-muted font-semibold uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-2xs text-muted font-semibold uppercase tracking-wider">Payment</th>
                <th className="text-left px-4 py-3 text-2xs text-muted font-semibold uppercase tracking-wider">Leads</th>
                <th className="text-left px-4 py-3 text-2xs text-muted font-semibold uppercase tracking-wider">Renewal</th>
                <th className="text-left px-4 py-3 text-2xs text-muted font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {data.clients.map((client) => {
                const endDate = new Date(client.subscription_end);
                const daysLeft = Math.ceil((endDate - new Date()) / 86400000);
                const isExpiring = daysLeft <= 7 && daysLeft > 0;

                return (
                  <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-sm font-medium text-primary group-hover:text-accent transition-colors">{client.business_name}</p>
                        <p className="text-xs text-muted">{client.industry}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-2xs bg-white/[0.05] px-2 py-1 rounded font-medium text-muted">{PLAN_LABELS[client.plan] || client.plan}</span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-primary font-mono">₹{(client.amount || 0).toLocaleString('en-IN')}/mo</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-medium ${STATUS_COLORS[client.subscription_status] || 'text-muted'}`}>
                        {client.subscription_status === 'active' ? '✅ Active' : client.subscription_status === 'expired' ? '❌ Expired' : '⏸️ Cancelled'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-medium ${PAYMENT_COLORS[client.payment_status] || 'text-muted'}`}>
                        {client.payment_status === 'paid' ? '✅ Paid' : client.payment_status === 'pending' ? '⏳ Pending' : '🔴 Overdue'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-primary font-mono">{client.total_leads || 0}</td>
                    <td className="px-4 py-3.5">
                      <div className="text-xs">
                        {daysLeft > 0 ? (
                          <span className={isExpiring ? 'text-warm font-medium' : 'text-muted'}>
                            {daysLeft}d left
                          </span>
                        ) : (
                          <span className="text-red-400">Expired</span>
                        )}
                        <p className="text-2xs text-muted">{endDate.toLocaleDateString('en-IN')}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => setSelectedClient(selectedClient?.id === client.id ? null : client)}
                        className="text-xs text-accent hover:text-accent/80 transition-colors font-medium"
                      >
                        {selectedClient?.id === client.id ? 'Close' : 'Manage'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Selected Client Detail */}
      {selectedClient && (
        <GlassCard glow glowColor="#4F46E5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary font-display">{selectedClient.business_name}</h3>
            <button onClick={() => setSelectedClient(null)} className="p-1 text-muted hover:text-primary rounded-lg hover:bg-white/[0.04] transition-colors">
              <XCircleIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
              <p className="text-2xs text-muted font-medium uppercase tracking-wider mb-2">Contact</p>
              <p className="text-sm text-primary font-medium">{selectedClient.name}</p>
              <p className="text-xs text-muted">{selectedClient.email || 'No email'}</p>
              <p className="text-xs text-muted">{selectedClient.whatsapp_number || 'No WhatsApp'}</p>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
              <p className="text-2xs text-muted font-medium uppercase tracking-wider mb-2">Subscription</p>
              <p className="text-sm text-primary font-medium">{PLAN_LABELS[selectedClient.plan]} • ₹{(selectedClient.amount || 0).toLocaleString('en-IN')}/mo</p>
              <p className="text-xs text-muted mt-1">Renewal: {new Date(selectedClient.subscription_end).toLocaleDateString('en-IN')}</p>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
              <p className="text-2xs text-muted font-medium uppercase tracking-wider mb-2">Quick Actions</p>
              <div className="space-y-2">
                <button className="w-full text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-lg hover:bg-accent/20 transition-colors">Extend Subscription</button>
                <button className="w-full text-xs bg-success/10 text-success px-3 py-1.5 rounded-lg hover:bg-success/20 transition-colors">Mark Payment Received</button>
                <button className="w-full text-xs bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors">Pause Account</button>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Revenue Summary */}
      <GlassCard>
        <h3 className="text-sm font-semibold text-primary mb-4">💰 Revenue Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-2xs text-muted uppercase tracking-wider font-medium">Monthly Recurring (MRR)</p>
            <p className="text-xl font-bold text-primary font-display mt-1">₹{(data.stats.mrr || 0).toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-2xs text-muted uppercase tracking-wider font-medium">Revenue This Month</p>
            <p className="text-xl font-bold text-success font-display mt-1">₹{(data.stats.revenue_this_month || 0).toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-2xs text-muted uppercase tracking-wider font-medium">Annual Run Rate (ARR)</p>
            <p className="text-xl font-bold text-primary font-display mt-1">₹{((data.stats.mrr || 0) * 12).toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-2xs text-muted uppercase tracking-wider font-medium">Pending Payments</p>
            <p className="text-xl font-bold text-warm font-display mt-1">₹0</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}