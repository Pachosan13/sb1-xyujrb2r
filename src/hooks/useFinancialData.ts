import { TransactionService } from '@/services/transactions/service';
import { useState, useEffect } from 'react';

interface FinancialData {
  ingresos: number;
  gastos: number;
  categorias: {
    categoryId: string;
    monto: number;
  }[];
}

const initialData: FinancialData = {
  ingresos: 0,
  gastos: 0,
  categorias: []
};

export function useFinancialData(selectedMonth: string) {
  const [data, setData] = useState<FinancialData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const transactionService = TransactionService.getInstance();
        const stats = await transactionService.getMonthlyStats(selectedMonth);
        setData(stats);
      } catch (err) {
        console.error('Error fetching financial data:', err);
        setError('Error al cargar los datos financieros');
        setData(initialData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return { data, loading, error };
}