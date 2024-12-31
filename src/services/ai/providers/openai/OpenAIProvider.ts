import OpenAI from 'openai';
import { BaseAIProvider } from '../../base/BaseAIProvider';
import { AI_CONFIG } from '../../config';
import { RECEIPT_PROMPTS } from '../../prompts/receipt';
import { CHAT_PROMPTS } from '../../prompts/chat';

export class OpenAIProvider extends BaseAIProvider {
  // ... código anterior igual ...

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