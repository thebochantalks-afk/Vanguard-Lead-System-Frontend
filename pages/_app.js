import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { ClientProvider } from '@/components/ClientContext';

export default function App({ Component, pageProps }) {
  return (
    <ClientProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClientProvider>
  );
}