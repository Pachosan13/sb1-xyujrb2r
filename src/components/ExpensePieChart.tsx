import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useCurrency } from '../contexts/CurrencyContext';
import { formatCurrency } from '../utils/formatCurrency';
import { BUSINESS_CATEGORIES } from '../data/businessCategories';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensePieChartProps {
  data: {
    categoryId: string;
    monto: number;
  }[];
}

export default function ExpensePieChart({ data }: ExpensePieChartProps) {
  const { country } = useCurrency();

  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        No hay gastos registrados en este período
      </div>
    );
  }

  const chartData = {
    labels: data.map(item => {
      const category = BUSINESS_CATEGORIES.find(cat => cat.id === item.categoryId);
      return category ? `${category.icon} ${category.name}` : 'Otros';
    }),
    datasets: [
      {
        data: data.map(item => item.monto),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const total = data.reduce((acc, curr) => acc + curr.monto, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${formatCurrency(value, country)} (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="h-[300px]">
      <Pie data={chartData} options={options} />
    </div>
  );
}