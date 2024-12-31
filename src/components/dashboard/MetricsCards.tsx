import { useCurrency } from '../../contexts/CurrencyContext';
import { formatCurrency } from '../../utils/formatCurrency';

interface MetricsCardsProps {
  ingresos: number;
  gastos: number;
  facturasPendientes?: number;
}

export default function MetricsCards({ ingresos, gastos, facturasPendientes = 0 }: MetricsCardsProps) {
  const { country } = useCurrency();
  const saldoNeto = ingresos - gastos;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Ingresos Totales</h3>
        <p className="mt-2 text-3xl font-bold text-emerald-600">
          {formatCurrency(ingresos, country)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Gastos Totales</h3>
        <p className="mt-2 text-3xl font-bold text-red-600">
          {formatCurrency(gastos, country)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Saldo Neto</h3>
        <p className={`mt-2 text-3xl font-bold ${saldoNeto >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          {formatCurrency(saldoNeto, country)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Facturas Pendientes</h3>
        <p className="mt-2 text-3xl font-bold text-orange-600">
          {facturasPendientes}
        </p>
      </div>
    </div>
  );
}