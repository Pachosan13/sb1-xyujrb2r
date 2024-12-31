import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

export function createMonthlyTransactionsQuery(userId: string, month: string) {
  const startDate = `${month}-01`;
  const endDate = `${month}-31`;
  
  return query(
    collection(db, 'transactions'),
    where('userId', '==', userId),
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date', 'desc'),
    limit(100)
  );
}

export function createRecentTransactionsQuery(userId: string) {
  return query(
    collection(db, 'transactions'),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(50)
  );
}