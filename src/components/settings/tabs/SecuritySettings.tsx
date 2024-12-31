import { useState } from 'react';
import { FormInput } from '../../forms/FormInput';
import { Alert } from '../../Alert';

export default function SecuritySettings() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // TODO: Implement password change logic
      setSuccess('Contraseña actualizada correctamente');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError('Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Cambiar Contraseña</h3>
        <p className="mt-1 text-sm text-gray-500">
          Asegúrate de usar una contraseña segura y única
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <FormInput
          label="Contraseña Actual"
          type="password"
          value={formData.currentPassword}
          onChange={(value) => setFormData({ ...formData, currentPassword: value })}
          required
        />

        <FormInput
          label="Nueva Contraseña"
          type="password"
          value={formData.newPassword}
          onChange={(value) => setFormData({ ...formData, newPassword: value })}
          required
        />

        <FormInput
          label="Confirmar Nueva Contraseña"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
          required
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
          </button>
        </div>
      </form>
    </div>
  );
}