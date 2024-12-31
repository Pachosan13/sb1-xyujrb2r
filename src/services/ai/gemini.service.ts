import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIProvider, AIAnalysis } from './types';
import { AI_CONFIG } from './config';
import { RECEIPT_PROMPTS } from './prompts/receipt';
import { CHAT_PROMPTS } from './prompts/chat';
import { validateAnalysis, validateText } from './utils/validation';
import { handleAIError } from './utils/error';

export class GeminiService implements AIProvider {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI;
  private model: any;

  private constructor() {
    this.genAI = new GoogleGenerativeAI(AI_CONFIG.GEMINI.API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: AI_CONFIG.GEMINI.MODEL });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async analyzeReceipt(text: string): Promise<AIAnalysis> {
    try {
      validateText(text);

      const prompt = `${RECEIPT_PROMPTS.analyze}\n${text}`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No se pudo extraer información del documento');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      return validateAnalysis(analysis);
    } catch (error) {
      throw handleAIError(error, 'Gemini');
    }
  }

  public async chat(prompt: string, context?: string): Promise<string> {
    try {
      const fullPrompt = context 
        ? CHAT_PROMPTS.withContext(context, prompt)
        : prompt;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw handleAIError(error, 'Gemini');
    }
  }
}