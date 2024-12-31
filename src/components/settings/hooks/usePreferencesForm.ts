import { useState } from 'react';
import { useCurrency } from '../../../contexts/CurrencyContext';
import { LATAM_COUNTRIES } from '../../../types/currency';

export function usePreferencesForm() {
  const { country, setCountry } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleCountryChange = async (countryCode: string) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const newCountry = LATAM_COUNTRIES.find(c => c.code === countryCode);
      if (newCountry) {
        await setCountry(newCountry);
        setSuccess('Preferencias actualizadas correctamente');
      }
    } catch (err) {
      setError('Error al actualizar las preferencias');
    } finally {
      setLoading(false);
    }
  };

  return {
    country,
    loading,
    success,
    error,
    handleCountryChange
  };
}