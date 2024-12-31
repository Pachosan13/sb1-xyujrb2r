const steps = [
  {
    number: '1',
    title: 'Regístrate y crea tu cuenta',
    description: 'Proceso simple y rápido, sin complicaciones.'
  },
  {
    number: '2',
    title: 'Escanea tus recibos',
    description: 'Usa la cámara de tu dispositivo o sube tus documentos.'
  },
  {
    number: '3',
    title: 'Obtén insights financieros',
    description: 'Analiza tus finanzas con reportes detallados.'
  }
];

export default function GetStartedSection() {
  return (
    <section className="container mx-auto px-6 py-24">
      <h2 className="text-3xl font-bold text-white text-center mb-16">
        ¿Cómo empezar?
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-white/10 backdrop-blur-lg p-8 rounded-xl text-white"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-2xl font-bold">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold mb-3 mt-4">{step.title}</h3>
            <p className="text-emerald-50">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}