const benefits = [
  {
    icon: '📱',
    title: 'Escaneo de recibos con tecnología OCR',
    description: 'Digitaliza tus documentos al instante con reconocimiento inteligente de texto.'
  },
  {
    icon: '📊',
    title: 'Reportes financieros claros',
    description: 'Visualiza tus finanzas con gráficos intuitivos y reportes detallados.'
  },
  {
    icon: '🤖',
    title: 'Asistencia en vivo 24/7 con IA',
    description: 'Obtén respuestas instantáneas a tus dudas con nuestro asistente virtual.'
  },
  {
    icon: '🔒',
    title: 'Seguridad avanzada',
    description: 'Tus datos están protegidos con los más altos estándares de seguridad.'
  }
];

export default function BenefitsSection() {
  return (
    <section className="container mx-auto px-6 py-24">
      <h2 className="text-3xl font-bold text-white text-center mb-16">
        ¿Por qué elegir CASH AI?
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-white hover:transform hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
            <p className="text-emerald-50">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}