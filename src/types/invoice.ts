import { Timestamp } from 'firebase/firestore';

export interface Invoice {
  id?: string;
  userId: string;
  date: Date;
  total: number;
  tax: number;
  merchant: string;
  category: string;
  imageUrl: string;
  createdAt: Timestamp;
  status: 'active' | 'deleted';
}