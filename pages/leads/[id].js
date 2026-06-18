import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import TagBadge from '@/components/TagBadge';
import StatusBadge from '@/components/StatusBadge';
import ConversationThread from '@/components/ConversationThread';
import GlassCard from '@/components/GlassCard';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  CalendarIcon, 
  ArrowLeftIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';

export default function LeadDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchLead = async () => {
      try {
        const res = await axios.get(`/api/proxy/leads/${id}`);
        setLead(res.data);
      } catch (err) {
        console.error('Failed to fetch lead details', err);
        // Fallback for demo
        setLead({
          id: id,
          name: 'Rahul Sharma',
          phone: '+91 98765 43210',
          email: 'rahul@example.com',
          source: 'Meta Ads',
          tag: 'HOT',
          status: 'qualified',
          created_at: '2023-10-05T08:30:00Z',
          messages: [
            { body: 'Hi, I saw your ad for the new property. Can I get more details?', direction: 'inbound', created_at: '2023-10-05T08:30:00Z' },
            { body: 'Hello Rahul! Thanks for reaching out. Yes, I can help with that. Are you looking for a 2BHK or 3BHK?', direction: 'outbound', created_at: '2023-10-05T08:31:00Z' },
            { body: 'Looking for a 3BHK in South Mumbai.', direction: 'inbound', created_at: '2023-10-05T08:35:00Z' },
            { body: 'Great choice. We have a few premium options there. Would you like to schedule a site visit this weekend?', direction: 'outbound', created_at: '2023-10-05T08:40:00Z' },
          ],
          timeline: [
            { event: 'Lead captured from Meta Ads', created_at: '2023-10-05T08:30:00Z' },
            { event: 'AI Response sent', created_at: '2023-10-05T08:31:00Z' },
            { event: 'Qualified as HOT', created_at: '2023-10-05T08:40:00Z' },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleUpdate = async (updates) => {
    setUpdating(true);
    try {
      await axios.put(`/api/proxy/leads/${id}`, updates);
      setLead({ ...lead, ...updates });
    } catch (err) {
      console.error('Failed to update lead', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="skeleton h-4 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6 space-y-4">
              <div className="skeleton h-6 w-40" />
              <div className="skeleton h-4 w-24" />
              <div className="space-y-3 pt-4">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-3/4" />
                <div className="skeleton h-4 w-5/6" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="glass-card h-[500px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-14 h-14 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4">
          <ChatBubbleLeftEllipsisIcon className="h-7 w-7 text-muted" />
        </div>
        <p className="text-lg font-semibold text-primary font-display mb-1">Lead not found</p>
        <p className="text-sm text-muted mb-6">This lead may have been removed or doesn't exist.</p>
        <button onClick={() => router.push('/leads')} className="btn-secondary text-xs">
          Back to Leads
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <button 
        onClick={() => router.back()}
        className="inline-flex items-center text-sm text-muted hover:text-primary transition-colors group"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
        Back to Leads
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info & Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <GlassCard variant="accent" glow glowColor="#FF4D1C">
            <h2 className="text-xl font-bold text-primary font-display mb-1">{lead.name}</h2>
            <p className="text-sm text-muted mb-6">Captured {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center mr-3 shrink-0">
                  <PhoneIcon className="h-4 w-4 text-muted" />
                </div>
                <span className="text-primary">{lead.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center mr-3 shrink-0">
                  <EnvelopeIcon className="h-4 w-4 text-muted" />
                </div>
                <span className="text-primary">{lead.email || <span className="text-muted/50">No email provided</span>}</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center mr-3 shrink-0">
                  <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-muted" />
                </div>
                <span className="text-primary">Source: {lead.source}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-6">
              <div>
                <label className="block text-2xs font-medium text-muted mb-2 uppercase tracking-wider">Current Tag</label>
                <div className="flex items-center justify-between">
                  <TagBadge tag={lead.tag} />
                  <select 
                    value={lead.tag} 
                    onChange={(e) => handleUpdate({ tag: e.target.value })}
                    disabled={updating}
                    className="select-premium w-28 text-xs"
                  >
                    <option value="HOT">HOT</option>
                    <option value="WARM">WARM</option>
                    <option value="COLD">COLD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-2xs font-medium text-muted mb-2 uppercase tracking-wider">Status</label>
                <div className="flex items-center justify-between">
                  <StatusBadge status={lead.status} />
                  <select 
                    value={lead.status} 
                    onChange={(e) => handleUpdate({ status: e.target.value })}
                    disabled={updating}
                    className="select-premium w-32 text-xs"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="appointment_booked">Appt. Booked</option>
                    <option value="closed">Closed</option>
                    <option value="dead">Dead</option>
                  </select>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Internal Notes */}
          <GlassCard>
            <h3 className="text-sm font-semibold text-primary mb-3">Internal Notes</h3>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a private note..."
              className="input-premium h-24 resize-none"
            />
            <button className="btn-primary w-full mt-3 text-xs">
              Save Note
            </button>
          </GlassCard>

          {/* Appointment Card */}
          <GlassCard variant="accent">
            <h3 className="text-sm font-semibold text-primary mb-4">Set Appointment</h3>
            <div className="flex items-center input-premium">
              <CalendarIcon className="h-4 w-4 text-muted mr-2 shrink-0" />
              <input 
                type="datetime-local" 
                className="bg-transparent text-sm text-primary outline-none w-full"
              />
            </div>
            <button className="btn-secondary w-full mt-3 text-xs">
              Confirm Appointment
            </button>
          </GlassCard>
        </div>

        {/* Right Column: Conversation + Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Conversation */}
          <GlassCard noPadding>
            <div className="p-4 border-b border-white/[0.06] flex justify-between items-center">
              <h3 className="text-sm font-semibold text-primary">Conversation History</h3>
              <span className="inline-flex items-center text-2xs text-muted gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
                AI Active
              </span>
            </div>
            <ConversationThread messages={lead.messages} />
          </GlassCard>

          {/* Timeline */}
          <GlassCard>
            <h3 className="text-sm font-semibold text-primary mb-4">Lead Timeline</h3>
            <div className="space-y-4">
              {lead.timeline.map((item, idx) => (
                <div key={idx} className="flex space-x-3">
                  <div className="relative flex flex-col items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-accent/20"></div>
                    {idx !== lead.timeline.length - 1 && (
                      <div className="absolute top-4 bottom-0 w-[2px] bg-white/[0.06]"></div>
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm text-primary">{item.event}</p>
                    <p className="text-2xs text-muted mt-0.5">
                      {new Date(item.created_at).toLocaleString('en-IN', { 
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}