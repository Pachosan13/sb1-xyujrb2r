import { supabase } from '../../lib/supabase';
import type { Transaction, TransactionFormData } from '../../types/transaction';
import { validateTransaction } from '../firebase/transactions';

export async function getTransactions(options?: { 
  month?: string;
  limit?: number;
}): Promise<Transaction[]> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('Usuario no autenticado');

  try {
    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (options?.month) {
      const startDate = `${options.month}-01`;
      const endDate = `${options.month}-31`;
      query = query.gte('date', startDate).lte('date', endDate);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data as Transaction[];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

export async function addTransaction(data: TransactionFormData): Promise<string> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('Usuario no autenticado');

  try {
    validateTransaction(data);

    const transactionData = {
      user_id: user.id,
      type: data.type,
      amount: data.type === 'gasto' ? -Math.abs(data.amount) : Math.abs(data.amount),
      description: data.description,
      category: data.category,
      subcategory: data.subcategory,
      date: data.date,
      businessName: data.businessName,
    };

    const { data: result, error } = await supabase
      .from('transactions')
      .insert(transactionData)
      .select()
      .single();

    if (error) throw error;
    return result.id;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
}