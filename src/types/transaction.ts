export interface TransactionFormData {
  type: 'ingreso' | 'gasto';
  amount: number;
  description: string;
  category: string;
  subcategory: string;
  date: string;
}

export interface Transaction extends TransactionFormData {
  id: string;
  userId: string;
  createdAt: Date;
}