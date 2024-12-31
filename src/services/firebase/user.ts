import { doc, getDoc } from 'firebase/firestore';
import { db } from './config';

export async function getUserData(userId: string) {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.exists() ? userDoc.data() as { name: string } : null;
}