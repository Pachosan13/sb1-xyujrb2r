import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AppRoutes } from './routes';
import { supabase } from './lib/supabase';

export default function App() {
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        console.log('App mounted: getting session');
        if (error) {
          console.error('Error getting session:', error);
        } else {
          console.log('User session:', data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        console.log('App mounted');
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthProvider>
      <CurrencyProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CurrencyProvider>
    </AuthProvider>
  );
}