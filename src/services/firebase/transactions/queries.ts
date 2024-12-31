import { supabase } from '../../../lib/supabase'; // Import Supabase client

export function createTransactionQuery(userId: string, options?: { 
  month?: string;
  type?: string;
  limit?: number;
  orderDirection?: 'asc' | 'desc';
}) {
  let query = supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId);

  if (options?.month) {
    const startDate = `${options.month}-01`;
    const endDate = `${options.month}-31`;
    query = query.gte('date', startDate).lte('date', endDate);
  }

  if (options?.type) {
    query = query.eq('type', options.type);
  }

  // Add date ordering
  query = query.order('date', { ascending: options?.orderDirection === 'asc' });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  return query;
}