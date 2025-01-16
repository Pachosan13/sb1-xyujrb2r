import { useState, useEffect } from 'react';
import { TransactionService } from '../services/transactions/service';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ReportHeader from '../components/reports/ReportHeader';
import FinancialSummary from '../components/reports/FinancialSummary';
import FinancialCharts from '../components/reports/FinancialCharts';
import TransactionList from '../components/reports/TransactionList';
import { Alert } from '../components/Alert';
import { generatePDFReport, generateExcelReport } from '../utils/reportGenerators';
import { Transaction } from '@/types/transaction';
import { CategoryType } from '@/lib/cashai.types';
import TransactionForm from '../components/TransactionForm';
import TransactionModalContainer from '@/components/transactions/TransctionModalContainer';

export default function Reports() {
  const transactionService = TransactionService.getInstance();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState({
    ingresos: 0,
    gastos: 0,
    facturasPendientes: 0,
    monthlyData: {
      labels: [''],
      ingresos: [0],
      gastos: [0],
    },
    categoryData: [] as CategoryType[],
    monthlyComparison: {
      labels: [''],
      data: [0],
    },
    transactions: [] as Transaction[],
  });
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadReportData();
  }, [startDate, endDate]);

  const loadReportData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get transactions for the selected period
      const transactions = await transactionService.getTransactionsWithOptions();
      
      // Get monthly stats
      const stats = await transactionService.getMonthlyStats(endDate.slice(0, 7));

      setData({
        ingresos: stats.ingresos,
        gastos: stats.gastos,
        facturasPendientes: 0,
        monthlyData: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          ingresos: [0, 0, 0, 0, 0, stats.ingresos],
          gastos: [0, 0, 0, 0, 0, stats.gastos],
        },
        categoryData: stats.categorias,
        monthlyComparison: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          data: [0, 0, 0, 0, 0, stats.ingresos - stats.gastos],
        },
        transactions,
      });
    } catch (err) {
      console.error('Error loading report data:', err);
      setError('Error al cargar los datos del reporte');
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleExport = async (format: 'pdf' | 'excel') => {
    try {
      if (format === 'pdf') {
        await generatePDFReport(data);
      } else {
        await generateExcelReport(data);
      }
    } catch (err) {
      console.error('Error exporting report:', err);
      setError('Error al exportar el reporte');
    }
  };

  const handleEditTransaction = async (id: string) => {
    try {
      const transaction = await transactionService.getTransactionById(id);
      if (!transaction) throw new Error('Transaction not found');
      setSelectedTransaction(transaction);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      setError('Error al obtener la transacción');
    }
  };

  const handleViewTransaction = async (id: string) => {
    try {
      const transaction = await transactionService.getTransactionById(id);
      if (!transaction) throw new Error('Transaction not found');
      setSelectedTransaction(transaction);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      setError('Error al obtener la transacción');
    }
  };

  const handleSaveTransaction = async (updatedTransaction: Partial<Transaction>) => {
    if (!selectedTransaction) return;
    try {
      await transactionService.updateTransaction(selectedTransaction.id, updatedTransaction);
      setIsModalOpen(false);
      // Optionally, refresh the transaction list or update the state
    } catch (error) {
      console.error('Error updating transaction:', error);
      setError('Error al actualizar la transacción');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <Alert type="error" message={error} />}

        <ReportHeader
          onDateRangeChange={handleDateRangeChange}
          onExport={handleExport}
          startDate={startDate}
          endDate={endDate}
        />
        
        <FinancialSummary
          ingresos={data.ingresos}
          gastos={data.gastos}
          facturasPendientes={data.facturasPendientes}
        />
        
        <FinancialCharts
          monthlyData={data.monthlyData}
          categoryData={data.categoryData}
          monthlyComparison={data.monthlyComparison}
        />
        
        <TransactionList
          transactions={data.transactions}
          onEdit={handleEditTransaction}
          onView={handleViewTransaction}
        />
      </main>

      <TransactionModalContainer
        type={selectedTransaction?.type || 'ingreso'}
        isEdit={true}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedTransaction && (
          <TransactionForm
            isEdit={true}
            initialData={selectedTransaction}
            type={selectedTransaction.type}
            onSuccess={() => setIsModalOpen(false)}
          />
        )}
      </TransactionModalContainer>

      <Footer />
    </div>
  );
}