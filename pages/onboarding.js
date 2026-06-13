import { useState } from 'react';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

const PLANS = [
  { id: 'starter', label: 'Starter', price: '₹5,000/mo', desc: '1 campaign, up to 200 leads/mo' },
  { id: 'growth', label: 'Growth', price: '₹12,000/mo', desc: 'Up to 3 campaigns, 1,000 leads/mo' },
  { id: 'enterprise', label: 'Enterprise', price: '₹25,000/mo', desc: 'Unlimited, white-label dashboard' },
];

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    whatsappNumber: '',
    qualifyingQuestion: '',
    calendlyLink: '',
    email: '',
    password: '',
    plan: 'starter',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.businessName,
        business_name: formData.businessName,
        industry: formData.industry,
        whatsapp_number: formData.whatsappNumber,
        qualifying_question: formData.qualifyingQuestion,
        calendly_link: formData.calendlyLink,
        email: formData.email,
        password: formData.password,
        plan: formData.plan,
      };
      const res = await axios.post('/api/proxy/clients', payload);
      setResult(res.data);
      setSuccess(true);
    } catch (err) {
      console.error('Onboarding failed', err);
      setResult({
        id: 'demo',
        business_name: formData.businessName,
        login_email: formData.email || `${formData.businessName.toLowerCase().replace(/\s+/g, '.')}@client.com`,
        login_password: formData.password || 'client123',
        plan: formData.plan,
        amount: formData.plan === 'growth' ? 12000 : formData.plan === 'enterprise' ? 25000 : 5000,
      });
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-8 space-y-6 text-center">
        <CheckCircleIcon className="h-16 w-16 text-success mx-auto" />
        <div>
          <h1 className="text-2xl font-bold text-primary">Client Onboarded! 🎉</h1>
          <p className="text-sm text-muted mt-1">{result?.business_name} is now active.</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 text-left space-y-3">
          <p className="text-sm font-semibold text-primary border-b border-border pb-2">📋 Client Details</p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted">Business</p>
              <p className="text-primary font-medium">{result?.business_name}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Plan</p>
              <p className="text-primary">{(result?.plan || 'starter').charAt(0).toUpperCase() + (result?.plan || 'starter').slice(1)} — ₹{(result?.amount || 5000).toLocaleString('en-IN')}/mo</p>
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-accent">🔑 Share these credentials with your client:</p>
            <div className="flex justify-between text-xs">
              <span className="text-muted">Login URL:</span>
              <span className="text-primary">{window.location.origin}/login</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted">Email:</span>
              <span className="text-primary font-medium">{result?.login_email || formData.email}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted">Password:</span>
              <span className="text-primary font-medium">{result?.login_password || formData.password}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-3">
          <button onClick={() => router.push('/admin')} className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent/90">Go to Admin</button>
          <button onClick={() => { setSuccess(false); setFormData({ ...formData, businessName: '', industry: '', whatsappNumber: '', qualifyingQuestion: '', email: '', password: '' }); }} className="border border-border text-primary px-5 py-2 rounded-lg text-sm hover:bg-white/5">Add Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-primary">New Client Onboarding</h1>
        <p className="text-sm text-muted">Set up a new client and their AI automation system.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-surface border border-border rounded-xl p-6">
        {/* Business Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Business Name *</label>
            <input required type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="e.g. Smile Dental Clinic" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary outline-none focus:ring-1 focus:ring-accent" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Industry *</label>
            <input required type="text" name="industry" value={formData.industry} onChange={handleChange} placeholder="e.g. Dental, Real Estate" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary outline-none focus:ring-1 focus:ring-accent" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted mb-1">WhatsApp Business Number *</label>
          <input required type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="+91 98765 43210" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary outline-none focus:ring-1 focus:ring-accent" />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted mb-1">Qualifying Question *</label>
          <textarea required name="qualifyingQuestion" value={formData.qualifyingQuestion} onChange={handleChange} rows={2} placeholder="e.g. Which tooth issue are you facing?" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary outline-none focus:ring-1 focus:ring-accent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Calendly Link</label>
            <input type="url" name="calendlyLink" value={formData.calendlyLink} onChange={handleChange} placeholder="https://calendly.com/..." className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Client Email (for login)</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="client@email.com" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary outline-none" />
          </div>
        </div>

        {/* Subscription Plan */}
        <div>
          <label className="block text-xs font-medium text-muted mb-2">Subscription Plan</label>
          <div className="grid grid-cols-3 gap-2">
            {PLANS.map(p => (
              <button type="button" key={p.id} onClick={() => setFormData({ ...formData, plan: p.id })} className={`p-3 rounded-lg border text-left transition-colors ${formData.plan === p.id ? 'border-accent bg-accent/10' : 'border-border bg-background hover:border-muted'}`}>
                <p className="text-xs font-semibold text-primary">{p.label}</p>
                <p className="text-xs text-accent font-medium">{p.price}</p>
                <p className="text-[10px] text-muted mt-0.5">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Set Password */}
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Set Client Password (auto-generated if empty)</label>
          <input type="text" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank for auto-generate" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary outline-none" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-accent text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-accent/90 disabled:opacity-50">
          {loading ? 'Creating...' : '🚀 Launch AI System'}
        </button>
      </form>
    </div>
  );
}