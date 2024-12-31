import React from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

interface ReportHeaderProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
  onExport: (format: 'pdf' | 'excel') => void;
  startDate: string;
  endDate: string;
}

export default function ReportHeader({ onDateRangeChange, onExport, startDate, endDate }: ReportHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes Financieros</h1>
          <p className="mt-1 text-sm text-gray-500">
            Analiza tus finanzas en detalle
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="flex space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onDateRangeChange(e.target.value, endDate)}
              className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => onDateRangeChange(startDate, e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="relative">
            <button
              className="w-full sm:w-auto inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              onClick={() => onExport('pdf')}
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2 text-gray-500" />
              Exportar Reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}