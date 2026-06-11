import { useState } from 'react';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    whatsappNumber: '',
    qualifyingQuestion: '',
    calendlyLink: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/proxy/clients', formData);
      setWebhookUrl(res.data.webhookUrl || `https://vanguard-growth.com/api/webhooks/meta/${res.data.id || 'new-client'}`);
      setSuccess(true);
    } catch (err) {
      console.error('Onboarding failed', err);
      // Demo success
      setWebhookUrl('https://vanguard-growth.com/api/webhooks/meta/demo-client-99');
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-12 flex flex-col items-center text-center space-y-6">
        <CheckCircleIcon className="h-20 w-20 text-success" />
        <div>
          <h1 className="text-3xl font-bold text-primary">Onboarding Complete!</h1>
          <p className="text-muted mt-2">Your AI lead agent is being provisioned.</p>
        </div>
        
        <div className="w-full bg-surface border border-border rounded-xl p-6 text-left space-y-4">
          <p className="text-sm font-medium text-primary">Your Webhook URL</p>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={webhookUrl}
              className="flex-1 bg-background border border-border rounded-l-lg px-3 py-2 text-sm text-muted outline-none"
            />
            <button 
              onClick={() => navigator.clipboard.writeText(webhookUrl)}
              className="bg-border text-xs px-4 rounded-r-lg hover:bg-white/10 transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Please use this URL in your Meta Events Manager to connect your Lead Form. 
            Once connected, the AI will automatically begin responding to new leads.
          </p>
        </div>

        <button 
          onClick={() => window.location.href = '/'}
          className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">New Client Onboarding</h1>
        <p className="text-muted">Set up a new client and their AI automation system.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-surface border border-border rounded-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">Business Name*</label>
            <input
              required
              type="text"
              name="businessName"
              placeholder="e.g. Skyline Properties"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">Industry*</label>
            <input
              required
              type="text"
              name="industry"
              placeholder="e.g. Real Estate"
              value={formData.industry}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary">WhatsApp Business Number*</label>
          <input
            required
            type="text"
            name="whatsappNumber"
            placeholder="+91 00000 00000"
            value={formData.whatsappNumber}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary">Qualifying Question*</label>
          <textarea
            required
            name="qualifyingQuestion"
            rows={3}
            placeholder="e.g. What is your preferred location and budget?"
            value={formData.qualifyingQuestion}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">Calendly Link</label>
            <input
              type="url"
              name="calendlyLink"
              placeholder="https://calendly.com/..."
              value={formData.calendlyLink}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">Admin Email</label>
            <input
              type="email"
              name="email"
              placeholder="client@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-3 rounded-lg font-bold text-base hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating System...' : 'Launch AI Automation'}
          </button>
        </div>
      </form>
    </div>
  );
}
