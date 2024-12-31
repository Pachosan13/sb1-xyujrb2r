const testimonials = [
  {
    name: 'Ana García',
    role: 'Emprendedora',
    image: '/avatars/ana.jpg',
    quote: 'CASH AI ha simplificado completamente la gestión de mis finanzas. ¡Es increíble!'
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Contador',
    image: '/avatars/carlos.jpg',
    quote: 'La precisión del OCR y los reportes automáticos me ahorran horas de trabajo.'
  },
  {
    name: 'María Torres',
    role: 'Dueña de Negocio',
    image: '/avatars/maria.jpg',
    quote: 'El asistente virtual es como tener un asesor financiero 24/7.'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="container mx-auto px-6 py-24">
      <h2 className="text-3xl font-bold text-white text-center mb-16">
        Lo que dicen nuestros usuarios
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-white"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500 mr-4"></div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-emerald-200 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-emerald-50 italic">"{testimonial.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}