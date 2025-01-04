import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ProfileFormData } from '@/lib/cashai.types';

export function useProfileForm() {
  const { userData, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<ProfileFormData>({
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

  return {
    formData,
    setFormData,
    loading,
    success,
    error,
    handleSubmit
  };
}