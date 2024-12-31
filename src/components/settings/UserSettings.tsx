import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCurrency } from '../../contexts/CurrencyContext';
import { LATAM_COUNTRIES } from '../../types/currency';
import { FormInput } from '../forms/FormInput';
import { FormSelect } from '../forms/FormSelect';
import { Alert } from '../Alert';

export default function UserSettings() {
  const { userData, updateUserProfile } = useAuth();
  const { country, setCountry } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    language: 'es',
    countryCode: country?.code || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await updateUserProfile({
        name: formData.name,
        email: formData.email
      });

      if (formData.countryCode && formData.countryCode !== country?.code) {
        const newCountry = LATAM_COUNTRIES.find(c => c.code === formData.countryCode);
        if (newCountry) {
          await setCountry(newCountry);
        }
      }

      setSuccess('Cambios guardados correctamente');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar los cambios');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Configuración del Usuario
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <FormInput
          label="Nombre"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          required
        />

        <FormInput
          label="Correo Electrónico"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          required
        />

        <FormSelect
          label="Idioma"
          value={formData.language}
          onChange={(value) => setFormData({ ...formData, language: value })}
          options={[
            { value: 'es', label: 'Español' },
            { value: 'en', label: 'English' }
          ]}
        />

        <FormSelect
          label="País"
          value={formData.countryCode}
          onChange={(value) => setFormData({ ...formData, countryCode: value })}
          options={LATAM_COUNTRIES.map(country => ({
            value: country.code,
            label: `${country.name} (${country.currency.code})`
          }))}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </section>
  );
}