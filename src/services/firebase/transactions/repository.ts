import { collection, addDoc, getDocs, Timestamp, query, where, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../config';
import { validateTransaction } from './validation';
import type { Transaction, TransactionFormData } from '../../../types/transaction';

export async function getTransactions(options?: { 
  month?: string;
  type?: string;
  limit?: number;
}): Promise<Transaction[]> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  try {
    const transactionsRef = collection(db, 'transactions');
    let q = query(transactionsRef, where('userId', '==', user.uid));

    if (options?.month) {
      const startDate = `${options.month}-01`;
      const endDate = `${options.month}-31`;
      q = query(q, where('date', '>=', startDate), where('date', '<=', endDate));
    }

    if (options?.type) {
      q = query(q, where('type', '==', options.type));
    }

    // Add date ordering
    q = query(q, orderBy('date', 'desc'));

    // Add limit if specified
    if (options?.limit) {
      q = query(q, limit(options.limit));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Transaction));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error instanceof Error ? error : new Error('Error al obtener las transacciones');
  }
}

export async function addTransaction(data: TransactionFormData): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  try {
    validateTransaction(data);

    const transactionData = {
      ...data,
      userId: user.uid,
      createdAt: Timestamp.now(),
      amount: data.type === 'gasto' ? -Math.abs(data.amount) : Math.abs(data.amount),
      date: new Date(data.date).toISOString().split('T')[0]
    };

    const docRef = await addDoc(collection(db, 'transactions'), transactionData);
    console.log('Transaction saved:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error instanceof Error ? error : new Error('No se pudo guardar la transacción');
  }
}