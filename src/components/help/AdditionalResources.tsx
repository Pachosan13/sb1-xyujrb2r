import { Link } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

export default function AdditionalResources() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        ¿Necesitas más ayuda?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/contact"
          className="flex items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-500" />
          <span className="ml-3 font-medium text-gray-900">
            Contacta a nuestro soporte técnico
          </span>
        </Link>
        
        <Link
          to="/terms"
          className="flex items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <DocumentTextIcon className="h-8 w-8 text-blue-500" />
          <span className="ml-3 font-medium text-gray-900">
            Términos y Condiciones
          </span>
        </Link>
        
        <Link
          to="/privacy"
          className="flex items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <ShieldCheckIcon className="h-8 w-8 text-blue-500" />
          <span className="ml-3 font-medium text-gray-900">
            Política de Privacidad
          </span>
        </Link>
      </div>
    </section>
  );
}