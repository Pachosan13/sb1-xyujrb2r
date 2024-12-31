import { useState } from 'react';
import { FormInput } from '../forms/FormInput';
import { FormSelect } from '../forms/FormSelect';
import { useTransactionForm } from '../../hooks/useTransactionForm';
import { BUSINESS_CATEGORIES, INCOME_CATEGORIES } from '../../data/businessCategories';
import type { TransactionFormData } from '../../types/transaction';

interface TransactionFormProps {
  type: 'ingreso' | 'gasto';
  onSuccess: () => void;
  onError: (error: string) => void;
  initialData?: Partial<TransactionFormData>;
}

export function TransactionForm({ type, onSuccess, onError, initialData }: TransactionFormProps) {
  const [formData, setFormData] = useState<Partial<TransactionFormData>>({
    type,
    amount: initialData?.amount || 0,
    description: initialData?.description || '',
    category: initialData?.category || '',
    subcategory: initialData?.subcategory || '',
    date: initialData?.date || new Date().toISOString().split('T')[0]
  });

  const { submitTransaction, loading, errors } = useTransactionForm({
    onSuccess,
    onError
  });

  const categories = type === 'gasto' ? BUSINESS_CATEGORIES : INCOME_CATEGORIES;
  const selectedCategory = categories.find(cat => cat.id === formData.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTransaction(formData as TransactionFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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