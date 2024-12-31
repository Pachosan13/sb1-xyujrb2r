import React, { createContext, useContext, useState, useEffect } from 'react';
import { Country, LATAM_COUNTRIES } from '../types/currency';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface CurrencyContextType {
  country: Country | null;
  setCountry: (country: Country) => Promise<void>;
  loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadUserPreferences = async () => {
      if (!currentUser) {
        setCountryState(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('country_code')
          .eq('id', currentUser.id)
          .single();

        if (error) throw error;

        if (data?.country_code) {
          const savedCountry = LATAM_COUNTRIES.find(c => c.code === data.country_code);
          if (savedCountry) {
            setCountryState(savedCountry);
          }
        }
      } catch (error) {
        console.error('Error loading user preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserPreferences();
  }, [currentUser]);

  const setCountry = async (newCountry: Country) => {
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          country_code: newCountry.code,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.id);

      if (error) throw error;
      setCountryState(newCountry);
    } catch (error) {
      console.error('Error saving user preferences:', error);
      throw new Error('No se pudo guardar la preferencia de país');
    }
  };

  return (
    <CurrencyContext.Provider value={{ country, setCountry, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
}