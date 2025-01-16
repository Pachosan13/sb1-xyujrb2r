import { addTransaction, getTransactionById, getTransactions, updateTransaction } from '../firebase/transactions';
import type { Transaction, TransactionFormData } from '../../types/transaction';

export class TransactionService {
  private static instance: TransactionService;

  private constructor() {}

  public static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  async addTransaction(data: TransactionFormData): Promise<string> {
    return addTransaction(data);
  }

  async getTransactionsWithOptions(options?: { month?: string; limit?: number }): Promise<Transaction[]> {
    return getTransactions(options);
  }

  async getMonthlyStats(month: string) {
    const transactions = await this.getTransactionsWithOptions({ month });
    
    return this.getTransactions(transactions);
  }

  private async getTransactions(transactions: Transaction[]) {
    return transactions.reduce((acc, curr) => {
      const amount = Math.abs(curr.amount);
      
      if (curr.type === 'ingreso') {
        acc.ingresos += amount;
      } else {
        acc.gastos += amount;
        
        // Group by category
        const catIndex = acc.categorias.findIndex(c => c.categoryId === curr.category);
        if (catIndex >= 0) {
          acc.categorias[catIndex].monto += amount;
        } else {
          acc.categorias.push({ categoryId: curr.category, monto: amount });
        }
      }
      return acc;
    }, {
      ingresos: 0,
      gastos: 0,
      categorias: [] as { categoryId: string; monto: number; }[]
    });
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    return getTransactionById(id);
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction | null> {
    return updateTransaction(id, updates);
  }
}
