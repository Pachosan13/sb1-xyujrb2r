import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data.user;
}

export async function signUp(email: string, password: string, name: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password
  });
  
  if (authError) throw authError;

  // Create user profile
  const { error: profileError } = await supabase
    .from('users')
    .insert([{ 
      id: authData.user!.id,
      email,
      name
    }]);

  if (profileError) throw profileError;
  return authData.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getActivityLog(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function getDevices(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function signOutAllDevices(userId: string) {
  const { error } = await supabase
    .from('devices')
    .delete()
    .eq('user_id', userId);
  if (error) throw error;
}