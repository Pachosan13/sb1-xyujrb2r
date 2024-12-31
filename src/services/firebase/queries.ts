import { collection, query, where, orderBy, getDocs, QueryConstraint } from 'firebase/firestore';
import { db } from './config';

export const transactionQueries = {
  getTransactions: (userId: string) => {
    const constraints: QueryConstraint[] = [
      where('userId', '==', userId),
      orderBy('date', 'desc')
    ];

    return query(
      collection(db, 'transactions'),
      ...constraints
    );
  },

  getTransactionsByType: (userId: string, type: string) => {
    const constraints: QueryConstraint[] = [
      where('userId', '==', userId),
      where('type', '==', type),
      orderBy('date', 'desc')
    ];

    return query(
      collection(db, 'transactions'),
      ...constraints
    );
  },

  getTransactionsByMonth: (userId: string, month: string) => {
    const startDate = `${month}-01`;
    const endDate = `${month}-31`;
    
    const constraints: QueryConstraint[] = [
      where('userId', '==', userId),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'desc')
    ];

    return query(
      collection(db, 'transactions'),
      ...constraints
    );
  }
};