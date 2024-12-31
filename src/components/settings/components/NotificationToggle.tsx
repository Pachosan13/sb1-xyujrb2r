import { Switch } from '@headlessui/react';
import type { NotificationSetting } from '../hooks/useNotificationSettings';

interface NotificationToggleProps {
  setting: NotificationSetting;
  onToggle: (id: string) => void;
}

export function NotificationToggle({ setting, onToggle }: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-gray-900">{setting.title}</h4>
        <p className="text-sm text-gray-500">{setting.description}</p>
      </div>
      <Switch
        checked={setting.enabled}
        onChange={() => onToggle(setting.id)}
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
  );
}