import { useState } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function TwoFactorSetup() {
  const [enabled, setEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Autenticación de Dos Factores (2FA)
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Añade una capa extra de seguridad a tu cuenta
          </p>
        </div>
        <div className="flex items-center">
          <ShieldCheckIcon className={`h-6 w-6 ${enabled ? 'text-green-500' : 'text-gray-400'}`} />
          <span className="ml-2 text-sm text-gray-500">
            {enabled ? 'Activado' : 'Desactivado'}
          </span>
        </div>
      </div>

      <button
        onClick={() => setShowSetup(!showSetup)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Configurar 2FA
      </button>

      {showSetup && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          {/* TODO: Implement 2FA setup flow */}
          <p className="text-sm text-gray-600">
            Funcionalidad en desarrollo. Próximamente disponible.
          </p>
        </div>
      )}
    </div>
  );
}