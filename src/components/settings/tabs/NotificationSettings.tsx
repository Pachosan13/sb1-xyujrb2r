import { useState } from 'react';
import { Switch } from '@headlessui/react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'email',
      title: 'Notificaciones por Email',
      description: 'Recibe actualizaciones importantes en tu correo',
      enabled: true
    },
    {
      id: 'push',
      title: 'Notificaciones Push',
      description: 'Recibe alertas en tiempo real en tu navegador',
      enabled: false
    },
    {
      id: 'reports',
      title: 'Reportes Semanales',
      description: 'Recibe un resumen semanal de tus finanzas',
      enabled: true
    }
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Notificaciones</h3>
        <p className="mt-1 text-sm text-gray-500">
          Personaliza cómo y cuándo quieres recibir notificaciones
        </p>
      </div>

      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">{setting.title}</h4>
              <p className="text-sm text-gray-500">{setting.description}</p>
            </div>
            <Switch
              checked={setting.enabled}
              onChange={() => toggleSetting(setting.id)}
              className={`${
                setting.enabled ? 'bg-emerald-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Activar {setting.title}</span>
              <span
                className={`${
                  setting.enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        ))}
      </div>
    </div>
  );
}