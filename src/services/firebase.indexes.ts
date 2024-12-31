import { db } from './firebase.config';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export async function createRequiredIndexes() {
  try {
    // Test queries that require indexes
    const testQueries = [
      // Basic transaction listing with date sorting
      query(
        collection(db, 'transactions'),
        where('userId', '==', 'test'),
        orderBy('date', 'desc')
      ),
      // Monthly transactions query
      query(
        collection(db, 'transactions'),
        where('userId', '==', 'test'),
        where('date', '>=', '2024-01'),
        where('date', '<=', '2024-12'),
        orderBy('date', 'desc')
      ),
      // Type-specific transactions query
      query(
        collection(db, 'transactions'),
        where('userId', '==', 'test'),
        where('type', '==', 'gasto'),
        orderBy('date', 'desc')
      )
    ];

    // Execute test queries to verify indexes
    await Promise.all(testQueries.map(q => getDocs(q)));
    console.log('Firebase indexes verified successfully');
    return true;
  } catch (error: any) {
    if (error?.code === 'failed-precondition') {
      const indexUrl = error.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/)?.[0];
      if (indexUrl) {
        console.error('Missing required indexes. Create them here:', indexUrl);
      } else {
        console.error('Missing required indexes. Please create them in the Firebase Console.');
      }
    }
    return false;
  }
}