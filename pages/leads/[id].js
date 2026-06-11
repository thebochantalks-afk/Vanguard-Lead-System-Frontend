import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import TagBadge from '@/components/TagBadge';
import StatusBadge from '@/components/StatusBadge';
import ConversationThread from '@/components/ConversationThread';
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

  if (loading) return <div className="flex items-center justify-center py-20 text-muted">Loading lead details...</div>;
  if (!lead) return <div className="flex items-center justify-center py-20 text-muted">Lead not found.</div>;

  return (
    <div className="space-y-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-sm text-muted hover:text-primary transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to Leads
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info & Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-primary mb-1">{lead.name}</h2>
            <p className="text-sm text-muted mb-6">Captured {new Date(lead.created_at).toLocaleDateString()}</p>
            
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <PhoneIcon className="h-4 w-4 text-muted mr-3" />
                <span className="text-primary">{lead.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <EnvelopeIcon className="h-4 w-4 text-muted mr-3" />
                <span className="text-primary">{lead.email || 'No email provided'}</span>
              </div>
              <div className="flex items-center text-sm">
                <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-muted mr-3" />
                <span className="text-primary">Source: {lead.source}</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border space-y-6">
              <div>
                <label className="block text-xs font-medium text-muted mb-2 uppercase">Current Tag</label>
                <div className="flex items-center justify-between">
                  <TagBadge tag={lead.tag} />
                  <select 
                    value={lead.tag} 
                    onChange={(e) => handleUpdate({ tag: e.target.value })}
                    disabled={updating}
                    className="bg-background border border-border rounded px-2 py-1 text-xs text-primary outline-none"
                  >
                    <option value="HOT">HOT</option>
                    <option value="WARM">WARM</option>
                    <option value="COLD">COLD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-2 uppercase">Status</label>
                <div className="flex items-center justify-between">
                  <StatusBadge status={lead.status} />
                  <select 
                    value={lead.status} 
                    onChange={(e) => handleUpdate({ status: e.target.value })}
                    disabled={updating}
                    className="bg-background border border-border rounded px-2 py-1 text-xs text-primary outline-none"
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
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-primary mb-4">Internal Notes</h3>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a private note..."
              className="w-full bg-background border border-border rounded-lg p-3 text-sm text-primary h-24 focus:ring-1 focus:ring-accent outline-none"
            />
            <button className="mt-2 w-full bg-accent text-white rounded-lg py-2 text-sm font-medium hover:bg-accent/90 transition-colors">
              Save Note
            </button>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-primary mb-4">Set Appointment</h3>
            <div className="flex items-center bg-background border border-border rounded-lg p-3">
              <CalendarIcon className="h-5 w-5 text-muted mr-2" />
              <input 
                type="datetime-local" 
                className="bg-transparent text-sm text-primary outline-none w-full"
              />
            </div>
            <button className="mt-3 w-full border border-accent text-accent rounded-lg py-2 text-sm font-medium hover:bg-accent/10 transition-colors">
              Confirm Appointment
            </button>
          </div>
        </div>

        {/* Right Column: Conversation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl flex flex-col h-full">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="text-sm font-semibold text-primary">Conversation History</h3>
              <div className="flex space-x-2">
                <span className="flex items-center text-[10px] text-muted">
                  <span className="h-2 w-2 rounded-full bg-success mr-1"></span> AI Active
                </span>
              </div>
            </div>
            <ConversationThread messages={lead.messages} />
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-primary mb-4">Lead Timeline</h3>
            <div className="space-y-4">
              {lead.timeline.map((item, idx) => (
                <div key={idx} className="flex space-x-3">
                  <div className="relative">
                    <div className="h-2 w-2 rounded-full bg-accent mt-1.5"></div>
                    {idx !== lead.timeline.length - 1 && (
                      <div className="absolute top-4 left-[3px] w-[2px] h-full bg-border"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-primary">{item.event}</p>
                    <p className="text-[10px] text-muted">{new Date(item.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
