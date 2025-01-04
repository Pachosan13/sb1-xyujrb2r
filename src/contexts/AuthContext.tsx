import { createContext, useContext, useState, useEffect } from 'react';
import { User, Session, WeakPassword } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { ProfileFormData } from '@/lib/cashai.types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{
    user: User;
    session: Session;
    weakPassword?: WeakPassword;
  }>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  userData: ProfileFormData | null;
  updateUserProfile: (data: ProfileFormData) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<ProfileFormData | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('event', event, session);
        setCurrentUser(session?.user ?? null);
        if (session?.user) {
          console.log('session.user', session.user);
          const profileData: ProfileFormData = {
            name: session.user?.user_metadata.name || '',
            email: session.user?.email || '',  
            phone: session.user?.user_metadata.phone || '',
          };
          setUserData(profileData);
        } else {
          setUserData(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function register(email: string, password: string, name: string) {
    const { error: signUpError, data } = await supabase.auth.signUp({ 
      email, 
      password 
    });
    console.log('User data:', data);
    if (signUpError) throw signUpError;

    const { error: profileError } = await supabase
      .from('users')
      .insert([{ id: data.user!.id, email, name, country_code: 'PA' }]);
    if (profileError) throw profileError;
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/login'
    });
    if (error) throw error;
  }

  async function updateUserProfile(data: ProfileFormData) {
    setUserData(data);
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    userData,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}