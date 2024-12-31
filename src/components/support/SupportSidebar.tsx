import { Link } from 'react-router-dom';
import { DocumentTextIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export default function SupportSidebar() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Enlaces Útiles
      </h3>
      
      <div className="space-y-4">
        <Link
          to="/faq"
          className="flex items-center p-3 rounded-lg hover:bg-gray-50"
        >
          <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600 mr-3" />
          <div>
            <h4 className="font-medium text-gray-900">Preguntas Frecuentes</h4>
            <p className="text-sm text-gray-500">Encuentra respuestas rápidas</p>
          </div>
        </Link>

        <Link
          to="/docs"
          className="flex items-center p-3 rounded-lg hover:bg-gray-50"
        >
          <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-3" />
          <div>
            <h4 className="font-medium text-gray-900">Documentación</h4>
            <p className="text-sm text-gray-500">Guías y tutoriales</p>
          </div>
        </Link>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          Estamos aquí para ayudarte.<br />
          Respuesta inmediata las 24/7.
        </p>
      </div>
    </div>
  );
}