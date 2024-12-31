import { useState, useEffect } from 'react';
import { ComputerDesktopIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { getDevices, signOutAllDevices } from '../../services/auth.service';
import { formatDate } from '../../utils/date';

interface Device {
  id: string;
  name: string;
  type: 'desktop' | 'mobile';
  lastAccess: Date;
  location: string;
}

export default function DeviceList() {
  const { currentUser } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const data = await getDevices(currentUser.uid);
      setDevices(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOutAll = async () => {
    if (!currentUser) return;
    try {
      await signOutAllDevices(currentUser.uid);
      await loadDevices();
    } catch (error) {
      console.error('Error signing out devices:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Dispositivos Conectados
        </h3>
        <button
          onClick={handleSignOutAll}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Cerrar Sesión en Todos los Dispositivos
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {device.type === 'desktop' ? (
                  <ComputerDesktopIcon className="h-6 w-6 text-gray-400" />
                ) : (
                  <DevicePhoneMobileIcon className="h-6 w-6 text-gray-400" />
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{device.name}</p>
                  <p className="text-xs text-gray-500">
                    Último acceso: {formatDate(device.lastAccess)} desde {device.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}