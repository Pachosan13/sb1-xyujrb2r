import { collection, query, where, orderBy, limit, QueryConstraint } from 'firebase/firestore';
import { db } from '../config';

export function createTransactionQuery(userId: string, options?: { 
  month?: string;
  type?: string;
  limit?: number;
  orderDirection?: 'asc' | 'desc';
}) {
  const constraints: QueryConstraint[] = [
    where('userId', '==', userId)
  ];

  if (options?.month) {
    const startDate = `${options.month}-01`;
    const endDate = `${options.month}-31`;
    constraints.push(
      where('date', '>=', startDate),
      where('date', '<=', endDate)
    );
  }

  if (options?.type) {
    constraints.push(where('type', '==', options.type));
  }

  // Always add date ordering
  constraints.push(orderBy('date', options?.orderDirection || 'desc'));

  if (options?.limit) {
    constraints.push(limit(options.limit));
  }

  return query(collection(db, 'transactions'), ...constraints);
}