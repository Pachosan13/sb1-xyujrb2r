import { useState } from 'react';
import { FormInput } from './forms/FormInput';
import { FormSelect } from './forms/FormSelect';
import { useTransactionForm } from '../hooks/useTransactionForm';
import { BUSINESS_CATEGORIES, INCOME_CATEGORIES } from '../data/businessCategories';
import type { TransactionFormData } from '../types/transaction';
import { Alert } from './Alert';

interface TransactionFormProps {
  type: 'ingreso' | 'gasto';
  onSuccess?: () => void;
  onError?: (error: string) => void;
  initialData?: Partial<TransactionFormData>;
}

export default function TransactionForm({ type, onSuccess, onError, initialData }: TransactionFormProps) {
  const [formData, setFormData] = useState<Partial<TransactionFormData>>({
    type,
    amount: initialData?.amount || 0,
    description: initialData?.description || '',
    category: initialData?.category || '',
    subcategory: initialData?.subcategory || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    businessName: initialData?.businessName || '',
  });

  const [error, setError] = useState<string | null>(null);

  const { submitTransaction, loading, errors } = useTransactionForm({
    onSuccess,
    onError: (err) => {
      setError(err);
      onError?.(err);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Ensure all required fields are present
    const transaction: TransactionFormData = {
      type,
      amount: formData.amount || 0,
      description: formData.description || '',
      category: formData.category || '',
      subcategory: formData.subcategory || '',
      date: formData.date || new Date().toISOString().split('T')[0],
      businessName: formData.businessName || '',
    };

    await submitTransaction(transaction);
  };

  const categories = type === 'gasto' ? BUSINESS_CATEGORIES : INCOME_CATEGORIES;
  const selectedCategory = categories.find(cat => cat.id === formData.category);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} />}

      <FormInput
        label="Nombre del negocio"
        value={formData.businessName || ''}
        onChange={(value) => setFormData({ ...formData, businessName: value })}
        required
        error={errors.businessName}
      />

      <FormInput
        label="Monto"
        type="number"
        value={formData.amount?.toString() || ''}
        onChange={(value) => setFormData({ ...formData, amount: parseFloat(value) })}
        required
        error={errors.amount}
      />

      <FormInput
        label="Descripción"
        value={formData.description || ''}
        onChange={(value) => setFormData({ ...formData, description: value })}
        required
        error={errors.description}
      />

      <FormSelect
        label="Categoría"
        value={formData.category || ''}
        onChange={(value) => setFormData({ ...formData, category: value, subcategory: '' })}
        options={categories.map(cat => ({
          value: cat.id,
          label: `${cat.icon} ${cat.name}`
        }))}
        required
        error={errors.category}
      />

      {selectedCategory && (
        <FormSelect
          label="Subcategoría"
          value={formData.subcategory || ''}
          onChange={(value) => setFormData({ ...formData, subcategory: value })}
          options={selectedCategory.subcategories.map(sub => ({
            value: sub.id,
            label: sub.name
          }))}
          required
          error={errors.subcategory}
        />
      )}

      <FormInput
        label="Fecha"
        type="date"
        value={formData.date || ''}
        onChange={(value) => setFormData({ ...formData, date: value })}
        required
        error={errors.date}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${type === 'ingreso' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? 'Guardando...' : `Agregar ${type === 'ingreso' ? 'Ingreso' : 'Gasto'}`}
      </button>
    </form>
  );
}