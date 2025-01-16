import { Alert } from './Alert';
import { useTransactionForm } from '../hooks/useTransactionForm';
import type { TransactionFormData } from '../types/transaction';
import { useState } from 'react';

interface ConfirmationModalProps {
  data: any;
  imageUrl: string;
  onClose: () => void;
}

export default function ConfirmationModal({ data, onClose }: ConfirmationModalProps) {
  const [transactionType, setTransactionType] = useState<'ingreso' | 'gasto'>('gasto');
  const [error, setError] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>(data.nombres[0]);
  const [monto, setMonto] = useState<number>(data.monto);
  const [descripcion, setDescripcion] = useState<string>(data.descripcion);

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
      amount: monto,
      description: descripcion,
      category: data.categoria,
      subcategory: data.subcategoria ?? 'sub',
      date: data.fecha || new Date().toISOString().split('T')[0],
      businessName: selectedName
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
          <div className="flex items-center mb-3">
            <label className="w-1/4"><strong>Nombre:</strong></label>
            {data.nombres.length > 1 ? (
              <select
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                className="ml-2 border rounded p-1 flex-grow"
              >
                {data.nombres.map((name: string, index: number) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            ) : data.nombres.length === 1 ? (
              <p className="ml-2 flex-grow">{data.nombres[0]}</p>
            ) : (
              <input
                type="text"
                value={selectedName || ''}
                onChange={(e) => setSelectedName(e.target.value)}
                className="ml-2 border rounded p-1 flex-grow"
                placeholder="Ingrese nombre"
              />
            )}
          </div>
          <div className="flex items-center mb-3">
            <label className="w-1/4"><strong>Monto:</strong></label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
              className="ml-2 border rounded p-1 flex-grow"
            />
          </div>
          <div className="flex items-center mb-3">
            <label className="w-1/4"><strong>Descripción:</strong></label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="ml-2 border rounded p-1 flex-grow"
              rows={2}
            />
          </div>
          <div className="flex items-center mb-3">
            <p className="w-1/4"><strong>Categoría:</strong></p>
            <p className="ml-2 flex-grow">{data.categoria}</p>
          </div>
          <div className="flex items-center mb-3">
            <p className="w-1/4"><strong>Fecha:</strong></p>
            <p className="ml-2 flex-grow">{new Date(data.fecha).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center mb-3">
            <label className="w-1/4"><strong>Tipo:</strong></label>
            <div className="ml-2 flex-grow flex">
              <label className="mr-4">
                <input
                  className="mr-2"
                  type="radio"
                  value="gasto"
                  checked={transactionType === 'gasto'}
                  onChange={() => setTransactionType('gasto')}
                />
                Gasto
              </label>
              <label>
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
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 