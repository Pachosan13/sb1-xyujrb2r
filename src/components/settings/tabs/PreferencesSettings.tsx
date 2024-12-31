import { useState } from 'react';
import { useCurrency } from '../../../contexts/CurrencyContext';
import { FormSelect } from '../../forms/FormSelect';
import { Alert } from '../../Alert';
import { LATAM_COUNTRIES } from '../../../types/currency';

export default function PreferencesSettings() {
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Preferencias</h3>
        <p className="mt-1 text-sm text-gray-500">
          Personaliza tu experiencia en la aplicación
        </p>
      </div>

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <div className="space-y-4">
        <FormSelect
          label="País"
          value={country?.code || ''}
          onChange={handleCountryChange}
          options={LATAM_COUNTRIES.map(country => ({
            value: country.code,
            label: `${country.name} (${country.currency.code})`
          }))}
        />

        <FormSelect
          label="Idioma"
          value="es"
          onChange={() => {}}
          options={[
            { value: 'es', label: 'Español' },
            { value: 'en', label: 'English' }
          ]}
        />
      </div>
    </div>
  );
}