import { useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/router';
import { ChartBarIcon, ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/outline';

LoginPage.noAuth = true;

// Prevent static generation - this page needs browser APIs
export async function getServerSideProps() {
  return { props: {} };
}

const features = [
  { icon: BoltIcon, text: 'AI-powered lead qualification via WhatsApp' },
  { icon: ChartBarIcon, text: 'Real-time dashboard & performance analytics' },
  { icon: ShieldCheckIcon, text: 'Enterprise-grade security & compliance' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      // Redirect based on role
      if (email === 'admin@vanguard.com' || result.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      setError(result.error || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">
      {/* Left: Brand / Hero area */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-brand-deep flex-col justify-center px-16">
        {/* Background glow effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo/10 rounded-full blur-[100px]" />
        
        {/* Brand content */}
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-premium flex items-center justify-center shadow-lg shadow-accent/25">
              <span className="text-white font-bold text-xl">VG</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary font-display">Vanguard Growth</h1>
              <p className="text-sm text-muted">AI Lead Management System</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-primary font-display leading-tight mb-4">
            Convert More Leads.<br />
            <span className="text-gradient-accent">Close Faster.</span>
          </h2>
          <p className="text-lg text-muted max-w-md mb-12">
            Transform raw Meta Ads leads into qualified opportunities with AI-powered WhatsApp conversations.
          </p>

          {/* Feature highlights */}
          <div className="space-y-4">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                  <feat.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm text-primary">{feat.text}</span>
              </div>
            ))}
          </div>

          {/* Trust indicator */}
          <div className="mt-12 pt-8 border-t border-white/[0.08]">
            <p className="text-xs text-muted">Trusted by performance marketing agencies and service businesses</p>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-premium flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/25">
              <span className="text-white font-bold text-xl">VG</span>
            </div>
            <h1 className="text-2xl font-bold text-primary font-display">Vanguard Growth</h1>
            <p className="text-sm text-muted">AI Lead Management System</p>
          </div>

          {/* Login Card */}
          <div className="relative overflow-hidden rounded-xl backdrop-blur-md border border-white/[0.08] bg-white/[0.04] shadow-lg shadow-black/30 p-8">
            {/* Gradient accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-warm to-accent" />

            <div className="relative z-10">
              <h2 className="text-xl font-bold text-primary font-display mb-1">Welcome Back</h2>
              <p className="text-sm text-muted mb-6">Sign in to your dashboard</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@vanguard.com"
                    className="input-premium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input-premium"
                  />
                </div>

                {error && (
                  <div className="relative overflow-hidden rounded-lg px-4 py-2.5 bg-red-500/10 border border-red-500/15">
                    <p className="text-xs text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <p className="text-2xs text-muted text-center">
                  Powered by <span className="text-primary">Vanguard Growth</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}