import { supabase } from '../../lib/supabase';

export async function verifyIndexes(): Promise<boolean> {
  try {
    // Test queries that would benefit from indexes
    const testUser = 'test-user-id';
    
    // Test basic transaction listing with date sorting
    const { error: error1 } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', testUser)
      .order('date', { ascending: false })
      .limit(1);

    // Test monthly transactions query
    const { error: error2 } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', testUser)
      .gte('date', '2024-01-01')
      .lte('date', '2024-01-31')
      .order('date', { ascending: false })
      .limit(1);

    // Test type-specific transactions query
    const { error: error3 } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', testUser)
      .eq('type', 'gasto')
      .order('date', { ascending: false })
      .limit(1);

    if (error1 || error2 || error3) {
      console.error('Database query verification failed:', { error1, error2, error3 });
      return false;
    }

    console.log('Database queries verified successfully');
    return true;
  } catch (error) {
    console.error('Error verifying database queries:', error);
    return false;
  }
}