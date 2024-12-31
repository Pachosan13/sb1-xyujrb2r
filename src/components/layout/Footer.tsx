import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CASH AI. Todos los derechos reservados.
          </p>
          <div className="space-x-4">
            <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">
              Términos y Condiciones
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}