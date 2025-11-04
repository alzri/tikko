import { supabase } from './supabase';

export interface TicketData {
  ticket_id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  created_at?: string;
}

export async function getTicketData(): Promise<TicketData> {
  const { data, error } = await supabase
    .from('ticket_db')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
