import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ExpensePieChart from '../ExpensePieChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FinancialChartsProps {
  monthlyData: {
    labels: string[];
    ingresos: number[];
    gastos: number[];
  };
  categoryData: {
    categoryId: string;
    monto: number;
  }[];
  monthlyComparison: {
    labels: string[];
    data: number[];
  };
}

export default function FinancialCharts({ monthlyData, categoryData, monthlyComparison }: FinancialChartsProps) {
  return (
    <div className="space-y-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Tendencia de Ingresos y Gastos
          </h3>
          <div className="h-[300px]">
            <Line
              data={{
                labels: monthlyData.labels,
                datasets: [
                  {
                    label: 'Ingresos',
                    data: monthlyData.ingresos,
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.5)',
                  },
                  {
                    label: 'Gastos',
                    data: monthlyData.gastos,
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgba(239, 68, 68, 0.5)',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Distribución por Categorías
          </h3>
          <ExpensePieChart data={categoryData} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Comparativa Mes a Mes
        </h3>
        <div className="h-[300px]">
          <Bar
            data={{
              labels: monthlyComparison.labels,
              datasets: [
                {
                  label: 'Variación',
                  data: monthlyComparison.data,
                  backgroundColor: monthlyComparison.data.map(value => 
                    value >= 0 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'
                  ),
                  borderColor: monthlyComparison.data.map(value =>
                    value >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'
                  ),
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}