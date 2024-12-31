import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAytgakJCUkHn5flUr1ldXBHKmID9ROhq0",
  authDomain: "cashai-613e7.firebaseapp.com",
  projectId: "cashai-613e7",
  storageBucket: "cashai-613e7.appspot.com",
  messagingSenderId: "59079081268",
  appId: "1:59079081268:web:ee606ef25d2656b7b7b961"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;