import React, { ReactNode } from 'react';

interface TransactionModalContainerProps {
  isOpen: boolean;
  isEdit?: boolean;
  onClose: () => void;
  children: ReactNode;
  type: 'ingreso' | 'gasto';
}

const TransactionModalContainer: React.FC<TransactionModalContainerProps> = ({ isOpen, isEdit, onClose, children, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
                {isEdit ? 'Editar Transacción' : 'Agregar Transacción'}
            </h2>
            <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            >
            x
            </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default TransactionModalContainer;