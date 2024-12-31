import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ExpensePieChart from '../ExpensePieChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  monthlyData: {
    labels: string[];
    ingresos: number[];
    gastos: number[];
  };
  categoryData: {
    categoryId: string;
    monto: number;
  }[];
}

export default function Charts({ monthlyData, categoryData }: ChartsProps) {
  const lineChartData = {
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
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Ingresos vs Gastos
        </h3>
        <div className="h-[300px]">
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index' as const,
                intersect: false,
              },
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Gastos por Categoría
        </h3>
        <ExpensePieChart data={categoryData} />
      </div>
    </div>
  );
}