import React, { useState, useEffect } from 'react';
import { TransactionService } from '../services/transactions/service';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import MetricsCards from '../components/dashboard/MetricsCards';
import Charts from '../components/dashboard/Charts';
import RecentActivity from '../components/dashboard/RecentActivity';
import ScanModal from '../components/ScanModal';
import { Alert } from '../components/Alert';
import { CategoryType } from '@/lib/cashai.types';
import { Transaction } from '@/types/transaction';

export default function Dashboard() {
  const [showScanModal, setShowScanModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    transactions: [] as Transaction[],
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const transactionService = TransactionService.getInstance();
        
        // Get current month's stats
        const currentMonth = new Date().toISOString().slice(0, 7);
        const stats = await transactionService.getMonthlyStats(currentMonth);
        
        // Get recent transactions
        const transactions = await transactionService.getTransactionsWithOptions();

        setData({
          ingresos: stats.ingresos,
          gastos: stats.gastos,
          facturasPendientes: 0, // TODO: Implement pending invoices
          monthlyData: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            ingresos: [0, 0, 0, 0, 0, stats.ingresos],
            gastos: [0, 0, 0, 0, 0, stats.gastos],
          },
          categoryData: stats.categorias,
          transactions,
        });
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Error al cargar los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleScanComplete = async () => {
    setShowScanModal(false);
    // TODO: Handle scan completion
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

        <WelcomeBanner onScanClick={() => setShowScanModal(true)} />
        
        <MetricsCards
          ingresos={data.ingresos}
          gastos={data.gastos}
          facturasPendientes={data.facturasPendientes}
        />
        
        <Charts
          monthlyData={data.monthlyData}
          categoryData={data.categoryData}
        />
        
        <RecentActivity transactions={data.transactions} />
      </main>

      <Footer />

      {showScanModal && (
        <ScanModal
          onClose={() => setShowScanModal(false)}
          onScanComplete={handleScanComplete}
        />
      )}
    </div>
  );
}