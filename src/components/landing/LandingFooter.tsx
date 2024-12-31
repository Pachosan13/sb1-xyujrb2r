export default function LandingFooter() {
  return (
    <footer className="container mx-auto px-6 py-8 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          © 2024 CASH AI. Todos los derechos reservados.
        </p>
        <div className="flex space-x-6">
          <a href="/terms" className="text-sm hover:text-emerald-200">
            Términos y Condiciones
          </a>
          <a href="/privacy" className="text-sm hover:text-emerald-200">
            Política de Privacidad
          </a>
          <a href="/contact" className="text-sm hover:text-emerald-200">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}