import type { AIProvider } from './types';
import { OpenAIProvider } from './providers/openai/OpenAIProvider';
import { GeminiProvider } from './providers/gemini/GeminiProvider';

export type AIProviderType = 'openai' | 'gemini';

export class AIFactory {
  static getProvider(type: AIProviderType): AIProvider {
    switch (type) {
      case 'openai':
        return OpenAIProvider.getInstance();
      case 'gemini':
        return GeminiProvider.getInstance();
      default:
        throw new Error('Proveedor de IA no soportado');
    }
  }
}