import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseAIProvider } from '../../base/BaseAIProvider';
import { AI_CONFIG } from '../../config';
import { RECEIPT_PROMPTS } from '../../prompts/receipt';
import { CHAT_PROMPTS } from '../../prompts/chat';

export class GeminiProvider extends BaseAIProvider {
  private static instance: GeminiProvider;
  protected providerName = 'Gemini';
  
  private genAI: GoogleGenerativeAI;
  private model: any;

  private constructor() {
    super();
    this.genAI = new GoogleGenerativeAI(AI_CONFIG.GEMINI.API_KEY);
    this.model = this.genAI.getGenerativeModel({ 
      model: AI_CONFIG.GEMINI.MODEL,
      generationConfig: {
        maxOutputTokens: 50
      }
    });
  }

  public static getInstance(): GeminiProvider {
    if (!GeminiProvider.instance) {
      GeminiProvider.instance = new GeminiProvider();
    }
    return GeminiProvider.instance;
  }

  protected async processReceiptText(text: string): Promise<any> {
    const prompt = `${RECEIPT_PROMPTS.analyze}\n${text}`;
    console.log('Prompt:', prompt);
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    console.log('Response:', response);
    const content = response.candidates[0].content.parts[0].text;

    console.log('Content:', content);
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    console.log('JSON Match:', jsonMatch);
    if (!jsonMatch) {
      throw new Error('No se pudo extraer información del documento');
    }

    return JSON.parse(jsonMatch[0]);
  }

  protected async processChatPrompt(prompt: string, context?: string): Promise<string> {
    const fullPrompt = context 
      ? CHAT_PROMPTS.withContext(context, prompt)
      : prompt;

    const result = await this.model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  }
}