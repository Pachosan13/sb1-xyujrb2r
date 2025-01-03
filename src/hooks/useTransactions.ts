import { useState, useEffect } from 'react';
import { TransactionService } from '../services/transactions/service';
import type { Transaction } from '../types/transaction';

interface UseTransactionsProps {
  month?: string;
  limit?: number;
}

export function useTransactions({ month, limit }: UseTransactionsProps = {}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const transactionService = TransactionService.getInstance();
        const data = await transactionService.getTransactionsWithOptions({ month, limit });
        setTransactions(data);
      } catch (err) {
        console.error('Error loading transactions:', err);
        setError('Error al cargar las transacciones');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [month, limit]);

  return { transactions, loading, error };
}