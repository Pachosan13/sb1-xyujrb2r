import { useNavigate } from 'react-router-dom';

export default function SupportHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900">
          Consultas y Soporte
        </h1>
        <p className="mt-2 text-gray-600">
          Resuelve tus dudas con nuestro asistente en vivo.
        </p>
        <div className="mt-4">
          <button
            onClick={() => navigate('/chat')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Iniciar Nueva Consulta
          </button>
        </div>
      </div>
    </div>
  );
}