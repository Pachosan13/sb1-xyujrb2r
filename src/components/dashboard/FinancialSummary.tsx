import { useMonthlyStats } from '../../hooks/useMonthlyStats';
import { useCurrency } from '../../contexts/CurrencyContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

export function FinancialSummary() {
  const { stats, loading, error } = useMonthlyStats();
  const { country } = useCurrency();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const saldoNeto = stats.ingresos - stats.gastos;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Ingresos</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">
          {formatCurrency(stats.ingresos, country)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Gastos</h3>
        <p className="mt-2 text-3xl font-bold text-red-600">
          {formatCurrency(stats.gastos, country)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Balance</h3>
        <p className={`mt-2 text-3xl font-bold ${saldoNeto >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(saldoNeto, country)}
        </p>
      </div>
    </div>
  );
}