import { supabase } from '@/lib/supabase';

interface PagueloFacilConfig {
  cclw: string; // Clave de comercio
  expirationDays?: number;
  currency?: string;
}

export class PagueloFacilService {
  private static instance: PagueloFacilService;
  private readonly API_URL = 'https://sandbox.paguelofacil.com/LinkDebt'; // Cambiar a producción cuando sea necesario
  private config: PagueloFacilConfig;

  private constructor(config: PagueloFacilConfig) {
    this.config = {
      currency: 'USD',
      expirationDays: 1,
      ...config
    };
  }

  public static getInstance(config: PagueloFacilConfig): PagueloFacilService {
    if (!PagueloFacilService.instance) {
      PagueloFacilService.instance = new PagueloFacilService(config);
    }
    return PagueloFacilService.instance;
  }

  async createPaymentLink(amount: number, description: string): Promise<string> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error('Usuario no autenticado');
    }

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cclw: this.config.cclw,
          amount: amount.toFixed(2),
          currency: this.config.currency,
          description,
          expiration_days: this.config.expirationDays,
          email: user?.email,
          phone: user?.user_metadata.phone || '',
          name: user?.user_metadata.name || ''
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear el enlace de pago');
      }

      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error('Error en PagueloFácil:', error);
      throw new Error('No se pudo procesar el pago');
    }
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/status/${transactionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.cclw}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al verificar el pago');
      }

      const data = await response.json();
      return data.status === 'completed';
    } catch (error) {
      console.error('Error al verificar pago:', error);
      throw new Error('No se pudo verificar el estado del pago');
    }
  }
}