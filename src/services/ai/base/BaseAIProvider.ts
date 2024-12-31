import type { AIProvider, AIAnalysis } from '../types';
import { validateAnalysis, validateText } from '../utils/validation';
import { handleAIError } from '../utils/error';

export abstract class BaseAIProvider implements AIProvider {
  protected abstract providerName: string;
  
  async analyzeReceipt(text: string): Promise<AIAnalysis> {
    try {
      validateText(text);
      const analysis = await this.processReceiptText(text);
      return validateAnalysis(analysis);
    } catch (error) {
      throw handleAIError(error, this.providerName);
    }
  }

  async chat(prompt: string, context?: string): Promise<string> {
    try {
      return await this.processChatPrompt(prompt, context);
    } catch (error) {
      throw handleAIError(error, this.providerName);
    }
  }

  protected abstract processReceiptText(text: string): Promise<any>;
  protected abstract processChatPrompt(prompt: string, context?: string): Promise<string>;
}