import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { FormInput } from '../../forms/FormInput';
import { Alert } from '../../Alert';

export default function ProfileSettings() {
  const { userData, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateUserProfile(formData);
      setSuccess('Perfil actualizado correctamente');
    } catch (err) {
      setError('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <FormInput
        label="Teléfono"
        type="text"
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </form>
  );
}