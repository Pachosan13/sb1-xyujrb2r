import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function AuthHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  const handleRegisterClick = () => {
    navigate('/login', { state: { mode: 'register' } });
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-emerald-600">CASH AI</span>
          </Link>
          
          <nav className="flex space-x-4">
            {!isLoginPage && (
              <Link
                to="/login"
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Iniciar Sesión
              </Link>
            )}
            <button
              onClick={handleRegisterClick}
              className="bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Registrarse
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}