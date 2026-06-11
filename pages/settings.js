import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    businessName: '',
    industry: '',
    qualifyingQuestion: '',
    calendlyLink: '',
    whatsappNumber: '',
    webhookUrl: 'https://vanguard-growth.com/api/webhooks/meta/12345',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/proxy/settings');
        setSettings({ ...settings, ...res.data });
      } catch (err) {
        console.error('Failed to fetch settings', err);
        // Fallback demo data
        setSettings({
          businessName: 'Vanguard Realty',
          industry: 'Real Estate',
          qualifyingQuestion: 'Are you looking for a residential or commercial property?',
          calendlyLink: 'https://calendly.com/vanguard-realty/site-visit',
          whatsappNumber: '+91 99999 88888',
          webhookUrl: 'https://vanguard-growth.com/api/webhooks/meta/vanguard-realty-99',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await axios.put('/api/proxy/settings', settings);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (err) {
      console.error('Failed to save settings', err);
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20 text-muted">Loading settings...</div>;

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
              <input
                type="text"
                name="businessName"
                value={settings.businessName}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1 uppercase">Industry</label>
              <input
                type="text"
                name="industry"
                value={settings.industry}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1 uppercase">Qualifying Question</label>
            <textarea
              name="qualifyingQuestion"
              value={settings.qualifyingQuestion}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. What is your budget range?"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
            />
            <p className="text-[10px] text-muted mt-1">The AI will use this to qualify leads early in the conversation.</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1 uppercase">WhatsApp Business Number</label>
            <input
              type="text"
              name="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1 uppercase">Calendly Booking Link</label>
            <input
              type="url"
              name="calendlyLink"
              value={settings.calendlyLink}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
            />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <label className="block text-xs font-medium text-muted mb-1 uppercase">Meta Webhook URL</label>
          <div className="flex mt-1">
            <input
              type="text"
              readOnly
              value={settings.webhookUrl}
              className="flex-1 bg-background border border-border rounded-l-lg px-3 py-2 text-sm text-muted outline-none"
            />
            <button 
              type="button"
              onClick={() => navigator.clipboard.writeText(settings.webhookUrl)}
              className="bg-border text-xs px-4 rounded-r-lg hover:bg-white/10 transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="text-[10px] text-muted mt-2">Paste this URL into your Meta Events Manager to start receiving leads.</p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-success/10 text-success' : 'bg-red-500/10 text-red-400'}`}>
            {message.text}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-accent text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
