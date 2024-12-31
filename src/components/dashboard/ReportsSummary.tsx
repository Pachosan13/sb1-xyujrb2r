import { Link } from 'react-router-dom';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { FinancialSummary } from './FinancialSummary';

export function ReportsSummary() {
  return (
    <div className="space-y-4">
      <FinancialSummary />
      
      <Link
        to="/reports"
        className="block bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ChartBarIcon className="h-6 w-6 text-emerald-600 mr-2" />
            <span className="font-medium text-gray-900">Ver Reportes Detallados</span>
          </div>
          <span className="text-emerald-600">→</span>
        </div>
      </Link>
    </div>
  );
}