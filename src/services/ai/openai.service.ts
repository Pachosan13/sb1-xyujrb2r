import OpenAI from 'openai';
import type { AIProvider, AIAnalysis } from './types';
import { AI_CONFIG } from './config';
import { RECEIPT_PROMPTS } from './prompts/receipt';
import { CHAT_PROMPTS } from './prompts/chat';
import { validateAnalysis, validateText } from './utils/validation';
import { handleAIError } from './utils/error';

export class OpenAIService implements AIProvider {
  private static instance: OpenAIService;
  private openai: OpenAI;

  private constructor() {
    this.openai = new OpenAI({
      apiKey: AI_CONFIG.OPENAI.API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public async analyzeReceipt(text: string): Promise<AIAnalysis> {
    try {
      validateText(text);

      const response = await this.openai.chat.completions.create({
        model: AI_CONFIG.OPENAI.MODEL,
        messages: [
          { role: "system", content: RECEIPT_PROMPTS.systemRole },
          { role: "user", content: `Analiza este documento:\n\n${text}` }
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
      throw handleAIError(error, 'OpenAI');
    }
  }

  public async chat(prompt: string, context?: string): Promise<string> {
    try {
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
        temperature: 0.7
      });

      return response.choices[0].message.content || 'Lo siento, no pude procesar tu consulta.';
    } catch (error) {
      throw handleAIError(error, 'OpenAI');
    }
  }
}