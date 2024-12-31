import { useState } from 'react';
import { PagueloFacilService } from '../../services/payment/paguelo-facil.service';

interface PaymentButtonProps {
  amount: number;
  description: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function PaymentButton({ amount, description, onSuccess, onError }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      const paymentService = PagueloFacilService.getInstance({
        cclw: import.meta.env.VITE_PAGUELO_FACIL_CCLW
      });

      const paymentUrl = await paymentService.createPaymentLink(amount, description);
      
      // Abrir ventana de pago
      window.open(paymentUrl, '_blank');
      
      onSuccess?.();
    } catch (error) {
      console.error('Error al procesar pago:', error);
      onError?.(error instanceof Error ? error.message : 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
    >
      {loading ? 'Procesando...' : 'Pagar Ahora'}
    </button>
  );
}