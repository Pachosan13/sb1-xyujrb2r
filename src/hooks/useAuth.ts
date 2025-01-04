import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { ProfileFormData } from '@/lib/cashai.types';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<ProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUserProfile = async (data: ProfileFormData) => {
    setUserData(data);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setCurrentUser(session?.user || null);
        if (session?.user) {
          const data = session.user;
          const profileData: ProfileFormData = {
            name: data.user_metadata.name || '',
            email: data.email || '',
            phone: data.user_metadata.phone || '',
          };
          setUserData(profileData as ProfileFormData);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { currentUser, userData, loading, updateUserProfile };
}