import { useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/router';

LoginPage.noAuth = true;

// Prevent static generation - this page needs browser APIs
export async function getServerSideProps() {
  return { props: {} };
}

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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-accent mb-2">Vanguard Growth</div>
          <p className="text-sm text-muted">AI Lead Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-primary mb-1">Welcome Back</h2>
          <p className="text-xs text-muted mb-6">Sign in to your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vanguard.com"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-[10px] text-muted text-center">
              Agency Owner: admin@vanguard.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}