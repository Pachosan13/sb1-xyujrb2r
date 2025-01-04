import { supabase } from '../lib/supabase';
import { AIFactory } from './ai/factory';
import type { Message } from '../types/chat';

export class ChatService {
  private static instance: ChatService;
  private aiProvider;

  private constructor() {
    this.aiProvider = AIFactory.getProvider('gemini');
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  private getFinancialContext(): string {
    const contextData = sessionStorage.getItem('financialContext');
    if (!contextData) return '';

    const context = JSON.parse(contextData);
    return `
      Contexto financiero actual del usuario:
      - Ingresos totales: ${context.ingresos}
      - Gastos totales: ${context.gastos}
      - Balance: ${context.ingresos - context.gastos}
      - Principales categorías de gastos: ${context.categorias.map((c: any) => 
        `${c.categoryId}: ${c.monto}`).join(', ')}
    `;
  }

  async getMessages(): Promise<Message[]> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Usuario no autenticado');

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return data as Message[];
  }

  async sendMessage(content: string): Promise<Message> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Usuario no autenticado');

    try {
      // Save user message
      const { error: userError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          role: 'user',
          content
        })
        .select()
        .single();

      if (userError) throw userError;

      // Get financial context
      const financialContext = this.getFinancialContext();

      // Get AI response
      const aiResponse = await this.aiProvider.chat(content, financialContext);

      // Save AI response
      const { data: aiMessage, error: aiError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          role: 'assistant',
          content: aiResponse
        })
        .select()
        .single();

      if (aiError) throw aiError;
      return aiMessage as Message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Error al enviar el mensaje');
    }
  }

  async subscribeToMessages(callback: (message: Message) => void) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Usuario no autenticado');

    return supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();
  }
}