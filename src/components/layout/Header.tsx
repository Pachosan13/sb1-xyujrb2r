import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu } from '@headlessui/react';
import { UserCircleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { logout, userData } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center">
            <span className="text-2xl font-bold text-emerald-600">CASH AI</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/home" className="text-gray-700 hover:text-emerald-600">
              Dashboard
            </Link>
            <Link to="/reports" className="text-gray-700 hover:text-emerald-600">
              Reportes
            </Link>
            <Link to="/chat" className="text-gray-700 hover:text-emerald-600 flex items-center">
              <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
              Chat
            </Link>
            <Link to="/support" className="text-gray-700 hover:text-emerald-600">
              Soporte
            </Link>
          </nav>

          <div className="flex items-center">
            <Menu as="div" className="relative ml-3">
              <Menu.Button className="flex items-center">
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-sm text-gray-700">{userData?.name}</span>
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/settings"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      Configuración
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                    >
                      Cerrar Sesión
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}