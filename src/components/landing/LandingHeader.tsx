import { useNavigate } from 'react-router-dom';

export default function LandingHeader() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/login', { state: { mode: 'register' } });
  };

  return (
    <header className="container mx-auto px-6 py-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white">CASH AI</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="text-white hover:text-emerald-100"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={handleRegister}
            className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            Regístrate Gratis
          </button>
        </div>
      </nav>
    </header>
  );
}