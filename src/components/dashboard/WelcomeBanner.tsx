import { useAuth } from '../../contexts/AuthContext';

interface WelcomeBannerProps {
  onScanClick: () => void;
}

export default function WelcomeBanner({ onScanClick }: WelcomeBannerProps) {
  const { userData } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            ¡Bienvenido, {userData?.name}!
          </h1>
          <p className="mt-1 text-gray-500">
            Aquí está un resumen de tus finanzas.
          </p>
        </div>
        <button
          onClick={onScanClick}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Escanear Documento
        </button>
      </div>
    </div>
  );
}