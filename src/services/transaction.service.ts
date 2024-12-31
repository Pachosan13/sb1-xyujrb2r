import { db } from './firebase.config';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  Timestamp, 
  orderBy
} from 'firebase/firestore';
import { auth } from './firebase.config';

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

export class TransactionService {
  private static instance: TransactionService;

  private constructor() {}

  public static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  async addTransaction(transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt'>): Promise<string> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuario no autenticado');

      const docRef = await addDoc(collection(db, 'transactions'), {
        ...transaction,
        userId: user.uid,
        createdAt: Timestamp.now()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error al agregar transacción:', error);
      throw new Error('No se pudo guardar la transacción');
    }
  }

  async getTransactions(month?: string): Promise<Transaction[]> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuario no autenticado');

      let q;
      const transactionsRef = collection(db, 'transactions');

      if (month) {
        const startDate = `${month}-01`;
        const endDate = `${month}-31`;
        q = query(
          transactionsRef,
          where('userId', '==', user.uid),
          where('date', '>=', startDate),
          where('date', '<=', endDate),
          orderBy('date', 'desc')
        );
      } else {
        q = query(
          transactionsRef,
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Transaction));
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
      throw new Error('No se pudieron obtener las transacciones');
    }
  }

  async getMonthlyStats(month: string): Promise<{
    ingresos: number;
    gastos: number;
    categorias: { categoryId: string; monto: number; }[];
  }> {
    try {
      const transactions = await this.getTransactions(month);
      
      const stats = transactions.reduce((acc, curr) => {
        if (curr.type === 'ingreso') {
          acc.ingresos += Math.abs(curr.amount);
        } else {
          acc.gastos += Math.abs(curr.amount);
          
          // Agrupar por categoría
          const catIndex = acc.categorias.findIndex(c => c.categoryId === curr.category);
          if (catIndex >= 0) {
            acc.categorias[catIndex].monto += Math.abs(curr.amount);
          } else {
            acc.categorias.push({ 
              categoryId: curr.category, 
              monto: Math.abs(curr.amount) 
            });
          }
        }
        return acc;
      }, {
        ingresos: 0,
        gastos: 0,
        categorias: [] as { categoryId: string; monto: number; }[]
      });

      return {
        ...stats,
        categorias: stats.categorias.sort((a, b) => b.monto - a.monto)
      };
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw new Error('No se pudieron obtener las estadísticas');
    }
  }
}