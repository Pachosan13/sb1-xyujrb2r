import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';
import { useChat } from '../hooks/useChat';

export default function Chat() {
  const { messages, loading, error, sendMessage } = useChat();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              Asistente Financiero
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Consulta tus dudas sobre finanzas, impuestos y contabilidad
            </p>
          </div>

          <ChatMessages messages={messages} loading={loading} error={error} />
          
          <div className="border-t border-gray-200 p-4">
            <ChatInput onSend={sendMessage} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}