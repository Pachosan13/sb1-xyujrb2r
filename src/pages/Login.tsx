import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from '../components/Alert';
import AuthHeader from '../components/auth/AuthHeader';
import { signIn } from '@/services/auth.service';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.mode === 'register') {
      setIsLogin(false);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // const result = await signIn(email, password);
        const result = await login(email, password);
        console.log('Login result:', result);
      } else {
        if (!name.trim()) {
          throw new Error('Por favor ingrese su nombre');
        }
        await register(email, password, name);
      }
      navigate('/select-country');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AuthHeader />
      
      <main className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </h2>
          
          {error && <Alert type="error" message={error} className="mb-4" />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  required={!isLogin}
                  disabled={loading}
                  placeholder="Tu nombre completo"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                required
                disabled={loading}
                placeholder="correo@ejemplo.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                required
                disabled={loading}
                minLength={6}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-600 hover:text-emerald-800"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-emerald-600 hover:text-emerald-800"
              disabled={loading}
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}