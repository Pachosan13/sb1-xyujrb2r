import { supabase } from '../../../lib/supabase';
import { validateTransaction } from './validation';
import type { Transaction, TransactionFormData } from '../../../types/transaction';

export async function getTransactions(options?: { 
  month?: string;
  type?: string;
  limit?: number;
}): Promise<Transaction[]> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  try {
    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id);

    if (options?.month) {
      const startDate = `${options.month}-01`;
      const endDate = `${options.month}-31`;
      query = query.gte('date', startDate).lte('date', endDate);
    }

    if (options?.type) {
      query = query.eq('type', options.type);
    }

    // Add date ordering
    query = query.order('date', { ascending: false });

    // Add limit if specified
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data as Transaction[];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error instanceof Error ? error : new Error('Error al obtener las transacciones');
  }
}

export async function addTransaction(data: TransactionFormData): Promise<string> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) {
    throw new Error('Usuario no autenticado');
  }

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
      created_at: new Date().toISOString(),
      businessname: data.businessName,
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
    throw error instanceof Error ? error : new Error('No se pudo guardar la transacción');
  }
}