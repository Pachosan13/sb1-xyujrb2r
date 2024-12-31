import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login', { state: { mode: 'register' } });
  };

  return (
    <section className="container mx-auto px-6 py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white leading-tight mb-8">
          Organiza tus Finanzas Con AI de Forma Fácil y Segura
        </h1>
        <p className="text-xl text-emerald-50 mb-12">
          Escanea recibos, genera reportes y simplifica tu contabilidad en un solo lugar
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleGetStarted}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors text-lg"
          >
            Empieza Ahora Gratis
          </button>
          <button
            onClick={handleGetStarted}
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
          >
            Ver Demo
          </button>
        </div>
      </div>
    </section>
  );
}