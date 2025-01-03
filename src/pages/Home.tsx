import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TransactionForm from '../components/TransactionForm';
import ScanModal from '../components/ScanModal';
import { Alert } from '../components/Alert';
import FinancialChatButton from '../components/dashboard/FinancialChatButton';
import { ReportsSummary } from '../components/dashboard/ReportsSummary';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [formType, setFormType] = useState<'ingreso' | 'gasto'>('gasto');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [scannedImageUrl, setScannedImageUrl] = useState<string>(''); 

  const openForm = (type: 'ingreso' | 'gasto') => {
    setFormType(type);
    setShowForm(true);
  };

  const scanComplete = (data: any, imageUrl: string) => {
    console.log('data', data);
    setScannedData(data);
    setScannedImageUrl(imageUrl);
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700"
            onClick={() => openForm('ingreso')}
          >
            Agregar Ingreso
          </button>
          <button
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700"
            onClick={() => openForm('gasto')}
          >
            Agregar Gasto
          </button>
          <button
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700"
            onClick={() => setShowScan(true)}
          >
            Escanear Documento
          </button>
          <FinancialChatButton />
        </div>

        <div className="space-y-8">
          <ReportsSummary />
          <RecentTransactions />
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {formType === 'ingreso' ? 'Agregar Ingreso' : 'Agregar Gasto'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <TransactionForm
                type={formType}
                onSuccess={() => setShowForm(false)}
                onError={(error) => console.error(error)}
              />
            </div>
          </div>
        )}

        {showScan && (
          <ScanModal
            onClose={() => setShowScan(false)}
            onScanComplete={(data, imageUrl) => scanComplete(data, imageUrl)}
          />
        )}

        {showConfirmation && (
          <ConfirmationModal
            data={scannedData}
            imageUrl={scannedImageUrl}
            onClose={() => {
              setShowConfirmation(false);
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}