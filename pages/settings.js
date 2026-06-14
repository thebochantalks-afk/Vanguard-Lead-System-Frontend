import { useState, useEffect } from 'react';
import axios from 'axios';
import { useClient } from '@/components/ClientContext';
import { useAuth } from '@/components/AuthContext';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const { selectedClient, isAdmin } = useClient();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    business_name: '',
    industry: '',
    qualifying_question: '',
    calendly_link: '',
    whatsapp_number: '',
    name: '',
  });
  const [clientId, setClientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Determine which client we're viewing settings for
  useEffect(() => {
    let id = null;
    if (isAdmin && selectedClient && selectedClient !== 'admin') {
      id = selectedClient.id;
    } else if (user?.role === 'client' && user?.clientId) {
      id = user.clientId;
    }
    setClientId(id);
    if (id) fetchSettings(id);
    else setLoading(false);
  }, [selectedClient, user]);

  const fetchSettings = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/proxy/clients/${id}`);
      const c = res.data;
      setSettings({
        business_name: c.business_name || '',
        name: c.name || '',
        industry: c.industry || '',
        qualifying_question: c.qualifying_question || '',
        calendly_link: c.calendly_link || '',
        whatsapp_number: c.whatsapp_number || '',
      });
    } catch (err) {
      console.error('Failed to fetch client settings', err);
      setMessage({ type: 'error', text: 'Failed to load settings. Make sure you have a client selected.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientId) return;
    setSaving(true);
    setMessage(null);
    try {
      await axios.put(`/api/proxy/clients/${clientId}`, settings);
      setMessage({ type: 'success', text: '✅ Settings saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Failed to save settings', err);
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (!clientId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Cog6ToothIcon className="h-12 w-12 text-muted mb-4" />
        <h2 className="text-lg font-semibold text-primary mb-2">No Client Selected</h2>
        <p className="text-sm text-muted max-w-md">
          {isAdmin 
            ? 'Select a client from the dropdown above to view and edit their settings.'
            : 'Contact your agency owner to set up your account settings.'}
        </p>
      </div>
    );
  }

  if (loading) return <div className="flex items-center justify-center py-20 text-muted">Loading settings...</div>;

  const webhookUrl = `${window.location.origin}/api/proxy/webhook/lead`;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Business Settings</h1>
        <p className="text-muted">Configure how your AI lead agent interacts with customers.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1 uppercase">Business Name</label>
              <input type="text" name="business_name" value={settings.business_name} onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1 uppercase">Industry</label>
              <input type="text" name="industry" value={settings.industry} onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1 uppercase">Qualifying Question</label>
            <textarea name="qualifying_question" value={settings.qualifying_question} onChange={handleChange} rows={3}
              placeholder="e.g. What is your budget range?"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent outline-none" />
            <p className="text-[10px] text-muted mt-1">The AI uses this to qualify leads — it changes per business automatically.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1 uppercase">WhatsApp Number</label>
              <input type="text" name="whatsapp_number" value={settings.whatsapp_number} onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1 uppercase">Calendly Link</label>
              <input type="url" name="calendly_link" value={settings.calendly_link} onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <label className="block text-xs font-medium text-muted mb-1 uppercase">Meta Webhook URL</label>
          <p className="text-[10px] text-muted mb-2">Paste this into Meta Ads Manager → Instant Forms → Webhook</p>
          <div className="flex">
            <input type="text" readOnly value={webhookUrl}
              className="flex-1 bg-background border border-border rounded-l-lg px-3 py-2 text-sm text-muted outline-none" />
            <button type="button" onClick={() => navigator.clipboard.writeText(webhookUrl)}
              className="bg-border text-xs px-4 rounded-r-lg hover:bg-white/10 transition-colors">Copy</button>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-success/10 text-success' : 'bg-red-500/10 text-red-400'}`}>
            {message.text}
          </div>
        )}

        <div className="flex justify-end">
          <button type="submit" disabled={saving}
            className="bg-accent text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}