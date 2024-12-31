import { useState, useEffect } from 'react';
import { ChatService } from '../services/chat.service';
import type { Message } from '../types/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const chatService = ChatService.getInstance();
      const history = await chatService.getMessages();
      setMessages(history);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Error al cargar los mensajes');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    try {
      setError(null);
      const chatService = ChatService.getInstance();
      const newMessage = await chatService.sendMessage(content);
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error al enviar el mensaje');
      throw err;
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage
  };
}