import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Alert } from '../Alert';
import DeviceList from './DeviceList';
import ActivityLog from './ActivityLog';
import TwoFactorSetup from './TwoFactorSetup';

export default function SecuritySettings() {
  const { currentUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Seguridad
        </h2>
      </div>

      <div className="p-6 space-y-8">
        {error && <Alert type="error" message={error} />}

        <TwoFactorSetup />
        <DeviceList />
        <ActivityLog />

        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Tus datos están protegidos. Cumplimos con las normas de seguridad más estrictas.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="/help" className="text-sm text-blue-600 hover:text-blue-800">
              Ayuda y Soporte
            </a>
            <a href="/privacy" className="text-sm text-blue-600 hover:text-blue-800">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}