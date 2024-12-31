import Layout from '../components/layout/Layout';
import SettingsTabs from '../components/settings/SettingsTabs';

export default function Settings() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Configuración
          </h1>
          <p className="mt-2 text-gray-600">
            Administra tu cuenta y preferencias
          </p>
        </div>
        <SettingsTabs />
      </div>
    </Layout>
  );
}