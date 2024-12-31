import { useTransactions } from '../../hooks/useTransactions';
import { useCurrency } from '../../contexts/CurrencyContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/date';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

export function RecentTransactions() {
  const { transactions, loading, error } = useTransactions({ limit: 5 });
  const { country } = useCurrency();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!transactions.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay transacciones registradas
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Transacciones Recientes
        </h3>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(transaction.date)}
                </p>
              </div>
              <span className={transaction.type === 'ingreso' ? 'text-green-600' : 'text-red-600'}>
                {formatCurrency(Math.abs(transaction.amount), country)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}