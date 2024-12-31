import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AppRoutes } from './routes';
import { supabase } from './lib/supabase';

export default function App() {
  useEffect(() => {
    const session = supabase.auth.getSession();
    session.then((session) => {
      console.log('User session:', session);
    });
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