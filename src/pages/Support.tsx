import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SupportHeader from '../components/support/SupportHeader';
import ChatSection from '../components/support/ChatSection';
import QuickAnswers from '../components/support/QuickAnswers';
import SupportSidebar from '../components/support/SupportSidebar';

export default function Support() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SupportHeader />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChatSection />
          </div>
          
          <div className="space-y-8">
            <QuickAnswers />
            <SupportSidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}