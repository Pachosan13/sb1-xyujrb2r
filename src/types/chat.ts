import { Timestamp } from 'firebase/firestore';

export interface Message {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp;
}