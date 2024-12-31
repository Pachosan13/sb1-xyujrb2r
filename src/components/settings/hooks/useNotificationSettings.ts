import { useState } from 'react';

export interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const DEFAULT_SETTINGS: NotificationSetting[] = [
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
];

export function useNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>(DEFAULT_SETTINGS);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  return {
    settings,
    toggleSetting
  };
}