import Layout from '../components/layout/Layout';
import HelpHeader from '../components/help/HelpHeader';
import FAQSection from '../components/help/FAQSection';
import VideoTutorials from '../components/help/VideoTutorials';
import AdditionalResources from '../components/help/AdditionalResources';

export default function Help() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HelpHeader />
        <div className="mt-8 space-y-12">
          <FAQSection />
          <VideoTutorials />
          <AdditionalResources />
        </div>
      </div>
    </Layout>
  );
}