import { useNavigate } from 'react-router-dom';

export default function CallToAction() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login', { state: { mode: 'register' } });
  };

  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <h2 className="text-3xl font-bold text-white mb-8">
        Empieza a organizar tus finanzas hoy mismo
      </h2>
      <button
        onClick={handleGetStarted}
        className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors text-lg"
      >
        Crea tu Cuenta Gratis
      </button>
    </section>
  );
}