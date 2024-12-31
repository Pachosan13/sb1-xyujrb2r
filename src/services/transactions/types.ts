import { Timestamp } from 'firebase/firestore';

export interface Transaction {
  id?: string;
  userId: string;
  type: 'ingreso' | 'gasto';
  amount: number;
  description: string;
  category: string;
  subcategory: string;
  date: string;
  createdAt: Timestamp;
}

export interface MonthlyStats {
  ingresos: number;
  gastos: number;
  categorias: CategoryAmount[];
}

export interface CategoryAmount {
  categoryId: string;
  monto: number;
}