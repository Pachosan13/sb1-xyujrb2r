import { AIFactory, type AIProviderType } from './ai/factory';
import { createWorker } from 'tesseract.js';

export class ReceiptService {
  private static instance: ReceiptService;
  private aiProvider;

  private constructor(providerType: AIProviderType = 'gemini') {
    this.aiProvider = AIFactory.getProvider(providerType);
  }

  public static getInstance(providerType: AIProviderType = 'gemini'): ReceiptService {
    if (!ReceiptService.instance) {
      ReceiptService.instance = new ReceiptService(providerType);
    }
    return ReceiptService.instance;
  }

  public async processReceipt(imageData: string): Promise<any> {
    try {
      // Initialize Tesseract worker
      const worker = await createWorker('spa');

      // Perform OCR
      const { data: { text } } = await worker.recognize(imageData);
      
      // Terminate worker after use
      await worker.terminate();

      if (!text.trim()) {
        throw new Error('No se pudo extraer texto de la imagen');
      }

      // Analyze text with AI provider
      const analysis = await this.aiProvider.analyzeReceipt(text);

      return analysis;
    } catch (error) {
      console.error('Error al procesar el recibo:', error);
      
      if (error instanceof Error) {
        throw new Error(`Error: ${error.message}`);
      }
      throw new Error('Error al procesar el documento');
    }
  }
}