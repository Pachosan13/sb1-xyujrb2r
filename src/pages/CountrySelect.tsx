import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LATAM_COUNTRIES } from '../types/currency';
import { useCurrency } from '../contexts/CurrencyContext';
import { Alert } from '../components/Alert';

export default function CountrySelect() {
  const navigate = useNavigate();
  const { setCountry, country, loading } = useCurrency();
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  useEffect(() => {
    // Si el usuario ya tiene un país seleccionado, redirigir a home
    if (!loading && country) {
      navigate('/home');
    }
  }, [country, loading, navigate]);

  const handleCountrySelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = LATAM_COUNTRIES.find(c => c.code === event.target.value);
    if (!selectedCountry) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await setCountry(selectedCountry);
      navigate('/home');
    } catch (err) {
      setError('No se pudo guardar tu preferencia. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Selecciona tu país
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Esto nos ayudará a mostrar la moneda correcta para tus transacciones
        </p>
        
        {error && <Alert type="error" message={error} />}
        
        <div className="relative">
          <select
            onChange={handleCountrySelect}
            defaultValue=""
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white disabled:opacity-50"
            disabled={isSubmitting}
          >
            <option value="" disabled>Selecciona un país</option>
            {LATAM_COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.currency.code} {country.currency.symbol})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Podrás cambiar tu país más adelante en la configuración</p>
        </div>
      </div>
    </div>
  );
}