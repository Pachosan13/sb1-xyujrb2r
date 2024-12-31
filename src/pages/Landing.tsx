import HeroSection from '../components/landing/HeroSection';
import BenefitsSection from '../components/landing/BenefitsSection';
import GetStartedSection from '../components/landing/GetStartedSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CallToAction from '../components/landing/CallToAction';
import LandingHeader from '../components/landing/LandingHeader';
import LandingFooter from '../components/landing/LandingFooter';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700">
      <LandingHeader />
      
      <main>
        <HeroSection />
        <BenefitsSection />
        <GetStartedSection />
        <TestimonialsSection />
        <CallToAction />
      </main>

      <LandingFooter />
    </div>
  );
}