import { useState, useEffect } from 'react';
import { TransactionService } from '../services/transactions/service';
import { getCurrentMonth } from '../utils/date';

export function useMonthlyStats(month = getCurrentMonth()) {
  const [stats, setStats] = useState({
    ingresos: 0,
    gastos: 0,
    categorias: [] as { categoryId: string; monto: number; }[]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const transactionService = TransactionService.getInstance();
        const data = await transactionService.getMonthlyStats(month);
        setStats(data);
      } catch (err) {
        setError('Error al cargar las estadísticas');
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [month]);

  return { stats, loading, error };
}