import { loadStripe } from '@stripe/stripe-js';

export class PaymentService {
  private static instance: PaymentService;
  private stripe: any;

  private constructor() {
    this.initializeStripe();
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  private async initializeStripe() {
    this.stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  }

  async createSubscription(priceId: string, customerId: string) {
    try {
      // Create subscription logic here
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
      });
      return subscription;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('No se pudo procesar el pago');
    }
  }

  async createPaymentIntent(amount: number, currency: string = 'USD') {
    try {
      // Create one-time payment logic here
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('No se pudo procesar el pago');
    }
  }
}