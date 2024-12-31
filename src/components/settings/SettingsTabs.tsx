import { useState } from 'react';
import { Tab } from '@headlessui/react';
import ProfileSettings from './tabs/ProfileSettings';
import SecuritySettings from './tabs/SecuritySettings';
import NotificationSettings from './tabs/NotificationSettings';
import PreferencesSettings from './tabs/PreferencesSettings';

const tabs = [
  { name: 'Perfil', component: ProfileSettings },
  { name: 'Seguridad', component: SecuritySettings },
  { name: 'Notificaciones', component: NotificationSettings },
  { name: 'Preferencias', component: PreferencesSettings }
];

export default function SettingsTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected
                ? 'bg-white text-emerald-600 shadow'
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              }`
            }
          >
            {tab.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-6">
        {tabs.map((tab, idx) => (
          <Tab.Panel
            key={idx}
            className="rounded-xl bg-white p-6 shadow-sm"
          >
            <tab.component />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}