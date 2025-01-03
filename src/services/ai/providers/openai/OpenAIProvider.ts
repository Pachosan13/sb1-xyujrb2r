import OpenAI from 'openai';
import { BaseAIProvider } from '../../base/BaseAIProvider';
import { AI_CONFIG } from '../../config';
import { RECEIPT_PROMPTS } from '../../prompts/receipt';
import { CHAT_PROMPTS } from '../../prompts/chat';

export class OpenAIProvider extends BaseAIProvider {
  private static instance: OpenAIProvider;
  public readonly providerName = 'openai';
  private openai: OpenAI;

  constructor() {
    super();
    this.openai = new OpenAI({
      apiKey: AI_CONFIG.OPENAI.API_KEY,
      dangerouslyAllowBrowser: true 
    });
  }

  public static getInstance(): OpenAIProvider {
    if (!OpenAIProvider.instance) {
      OpenAIProvider.instance = new OpenAIProvider();
    }
    return OpenAIProvider.instance;
  }

  // ... código anterior igual ...
  

  protected async processReceiptText(text: string): Promise<any> {
    const prompt = `${RECEIPT_PROMPTS.analyze}\n${text}`;
    const response = await this.openai.chat.completions.create({
      model: AI_CONFIG.OPENAI.MODEL,
      messages: [
        { role: 'system' as const, content: RECEIPT_PROMPTS.systemRole },
        { role: 'user' as const, content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 5000 // Limitar longitud de respuesta
    });

    const content = response.choices[0].message.content || 'Lo siento, no pude procesar tu consulta.';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No se pudo extraer información del documento');
    }

    return JSON.parse(jsonMatch[0]);
  }

  protected async processChatPrompt(prompt: string, context?: string): Promise<string> {
    const messages = [
      { role: 'system' as const, content: CHAT_PROMPTS.systemRole }
    ];

    if (context) {
      messages.push({
        role: 'system' as const,
        content: `Contexto: ${context}`
      });
    }

    messages.push({
      role: 'user' as const,
      content: prompt
    });

    const response = await this.openai.chat.completions.create({
      model: AI_CONFIG.OPENAI.MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 50 // Limitar longitud de respuesta
    });

    return response.choices[0].message.content || 'Lo siento, no pude procesar tu consulta.';
  }
}