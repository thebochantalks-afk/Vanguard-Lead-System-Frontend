import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  // 'admin' means show all clients (agency owner view)
  // null means no client selected yet
  // { id, name, business_name, ... } means a specific client

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get('/api/proxy/clients');
      setClients(res.data || []);
    } catch (err) {
      console.error('Failed to fetch clients', err);
      // Demo fallback
      setClients([
        { id: 'demo-1', name: 'Smile Dental Clinic', business_name: 'Smile Dental Clinic', industry: 'Dental' },
        { id: 'demo-2', name: 'Skyline Properties', business_name: 'Skyline Properties', industry: 'Real Estate' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const selectClient = (client) => {
    setSelectedClient(client);
  };

  return (
    <ClientContext.Provider value={{
      clients,
      selectedClient,
      selectClient,
      loading,
      isAdmin: selectedClient === 'admin',
      refreshClients: fetchClients,
    }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
}