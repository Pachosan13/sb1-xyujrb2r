import { Alert } from './Alert';
import { useTransactionForm } from '../hooks/useTransactionForm';
import type { TransactionFormData } from '../types/transaction';
import { useEffect, useState } from 'react';

interface ConfirmationModalProps {
  data: any;
  imageUrl: string;
  onClose: () => void;
}

export default function ConfirmationModal({ data, onClose }: ConfirmationModalProps) {
  const [transactionType, setTransactionType] = useState<'ingreso' | 'gasto'>('gasto');
  const [error, setError] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>('');

  const { submitTransaction, loading } = useTransactionForm({
    onSuccess: onClose,
    onError: (err) => setError(err),
  });

  // TOOD inroducir una subcategoria nueva segun la categoria escogida
  // extraida de la factura
  // 1. revisar si la categoria extraida existe en la lista de categorias
  // 2. si no existe, buscar con AI a que categoria de la BD pertenece 
  //      y crear una nueva subcategoria con el nombre de la categoria extraida
  // 3. si existe, usar la categoria extraida

  

  const handleConfirm = async () => {
    const transaction: TransactionFormData = {
      type: transactionType,
      amount: data.monto,
      description: data.descripcion,
      category: data.categoria,
      subcategory: data.subcategoria ?? 'sub',
      date: data.fecha || new Date().toISOString().split('T')[0],
      businessName: selectedName
    };

    await submitTransaction(transaction);
  };

  useEffect(() => {
    console.log('confirmation data', data);
  }, [data]);

  useEffect(() => {
    console.log('selectedName', selectedName);
  }, [selectedName]);

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
          {data.nombres.length > 1 ? (
            <div>
              <label><strong>Nombre:</strong></label>
              <select
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                className="ml-2 border rounded p-1 pr-10"
              >
                {data.nombres.map((name: string, index: number) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          ) : data.nombres.length === 1 ? (
            <p><strong>Nombre:</strong> {data.nombres[0]}</p>
          ) : (
            <div>
              <label><strong>Nombre:</strong></label>
              <input
                type="text"
                value={selectedName || ''}
                onChange={(e) => setSelectedName(e.target.value)}
                className="ml-2 border rounded p-1"
                placeholder="Ingrese nombre"
              />
            </div>
          )}
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