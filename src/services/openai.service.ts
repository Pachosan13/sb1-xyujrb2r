import OpenAI from 'openai';
import { validateAnalysis } from './ai/utils/validation';

export class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;

  private constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key no configurada');
    }

    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public async analyzeReceipt(text: string): Promise<any> {
    if (!text.trim()) {
      throw new Error('El texto del documento está vacío');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Eres un asistente especializado en analizar documentos financieros.
            Extrae la siguiente información del texto proporcionado y devuélvela en formato JSON:
            
            {
              "fecha": "YYYY-MM-DD",
              "monto": number,
              "impuestos": number,
              "categoria": string,
              "nombres": string[],
              "descripcion": string
            }`
          },
          {
            role: "user",
            content: `Analiza este documento:\n\n${text}`
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      });

      if (!response.choices[0].message.content) {
        throw new Error('No se pudo analizar el documento');
      }

      const analysis = JSON.parse(response.choices[0].message.content);
      return validateAnalysis(analysis);
    } catch (error) {
      console.error('Error en OpenAI:', error);
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Error de autenticación con OpenAI');
        }
        throw new Error(error.message);
      }
      throw new Error('Error al procesar el documento');
    }
  }
}