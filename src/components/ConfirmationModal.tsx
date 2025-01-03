import React, { useState } from 'react';
import { Alert } from './Alert';
import { useTransactionForm } from '../hooks/useTransactionForm';
import type { TransactionFormData } from '../types/transaction';

interface ConfirmationModalProps {
  data: any;
  imageUrl: string;
  onClose: () => void;
}

export default function ConfirmationModal({ data, imageUrl, onClose }: ConfirmationModalProps) {
  const [transactionType, setTransactionType] = useState<'ingreso' | 'gasto'>('gasto');
  const [error, setError] = useState<string | null>(null);

  const { submitTransaction, loading, errors } = useTransactionForm({
    onSuccess: onClose,
    onError: (err) => setError(err),
  });

  const handleConfirm = async () => {
    const transaction: TransactionFormData = {
      type: transactionType,
      amount: data.monto,
      description: data.descripcion,
      category: data.categoria,
      subcategory: data.subcategoria,
      date: data.fecha || new Date().toISOString().split('T')[0],
    };

    await submitTransaction(transaction);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Confirmar Información</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {error && <Alert type="error" message={error} />}

        <div className="mb-4">
          <p><strong>Monto:</strong> ${data.monto.toLocaleString()}</p>
          <p><strong>Descripción:</strong> {data.descripcion}</p>
          <p><strong>Categoría:</strong> {data.categoria}</p>
          <p><strong>Fecha:</strong> {new Date(data.fecha).toLocaleDateString()}</p>
        </div>

        <div className="mb-4">
          <label>
            <input
              className="mr-2"
              type="radio"
              value="gasto"
              checked={transactionType === 'gasto'}
              onChange={() => setTransactionType('gasto')}
            />
            Gasto
          </label>
          <label className="ml-4">
            <input
              className="mr-2"
              type="radio"
              value="ingreso"
              checked={transactionType === 'ingreso'}
              onChange={() => setTransactionType('ingreso')}
            />
            Ingreso
          </label>
        </div>

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : 'Confirmar'}
        </button>
      </div>
    </div>
  );
} 