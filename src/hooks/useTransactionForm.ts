import { useState } from 'react';
import { TransactionService } from '../services/transactions/service';
import type { TransactionFormData } from '../types/transaction';
import { validateAmount, validateRequired, validateDate } from '../utils/validation';

interface UseTransactionFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useTransactionForm({ onSuccess, onError }: UseTransactionFormProps = {}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: TransactionFormData): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateAmount(data.amount.toString())) {
      newErrors.amount = 'El monto debe ser un número válido mayor a 0';
    }
    if (!validateRequired(data.description)) {
      newErrors.description = 'La descripción es requerida';
    }
    if (!validateRequired(data.category)) {
      newErrors.category = 'La categoría es requerida';
    }
    if (!validateDate(data.date)) {
      newErrors.date = 'La fecha es requerida';
    }
    if (!validateRequired(data.businessName)) {
      newErrors.businessName = 'El nombre del negocio es requerido';
    }
    
    /* if (!validateRequired(data.subcategory)) {
      newErrors.subcategory = 'La subcategoría es requerida';
    } */

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitTransaction = async (data: TransactionFormData) => {
    if (!validateForm(data)) {
      return;
    }

    try {
      setLoading(true);
      const transactionService = TransactionService.getInstance();
      const id = await transactionService.addTransaction(data);
      console.log('Transaction submitted:', id, data);
      onSuccess?.();
    } catch (error) {
      console.error('Transaction error:', error);
      const message = error instanceof Error ? error.message : 'Error al guardar la transacción';
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    submitTransaction,
    loading,
    errors
  };
}