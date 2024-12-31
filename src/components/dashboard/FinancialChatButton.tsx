import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useMonthlyStats } from '../../hooks/useMonthlyStats';

export default function FinancialChatButton() {
  const navigate = useNavigate();
  const { stats } = useMonthlyStats();

  const handleClick = () => {
    // Store financial context in session storage for chat
    sessionStorage.setItem('financialContext', JSON.stringify({
      ingresos: stats.ingresos,
      gastos: stats.gastos,
      categorias: stats.categorias,
      timestamp: new Date().toISOString()
    }));
    
    navigate('/chat');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
    >
      <ChatBubbleLeftRightIcon className="h-6 w-6" />
      <span>Analizar Finanzas con IA</span>
    </button>
  );
}