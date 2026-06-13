import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { ClientProvider } from '@/components/ClientContext';
import { AuthProvider } from '@/components/AuthContext';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const publicPages = ['/login', '/admin'];

  useEffect(() => {
    if (!loading && !user && !publicPages.includes(router.pathname)) {
      router.push('/login');
    }
  }, [user, loading, router.pathname]);

  if (loading) return <div className="flex items-center justify-center h-screen bg-background text-muted">Loading...</div>;
  if (!user && !publicPages.includes(router.pathname)) return null;

  return children;
}

export default function App({ Component, pageProps }) {
  // Login page: wrap in AuthProvider only, no Layout
  if (Component.noAuth) {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <AuthGuard>
        <ClientProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ClientProvider>
      </AuthGuard>
    </AuthProvider>
  );
}