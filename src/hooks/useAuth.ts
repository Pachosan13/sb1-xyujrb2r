import { useState, useEffect } from 'react';
import { getUserData } from '../services/firebase/user';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setCurrentUser(session?.user || null);
        if (session?.user) {
          const data = await getUserData(session.user.id);
          setUserData(data);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { currentUser, userData, loading };
}