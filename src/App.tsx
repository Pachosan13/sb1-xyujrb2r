import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AppRoutes } from './routes';
import { verifyIndexes } from './services/firebase/indexes';

export default function App() {
  useEffect(() => {
    verifyIndexes().catch(console.error);
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