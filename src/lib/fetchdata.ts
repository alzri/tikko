import { supabase } from './supabase';

export interface ITicketDataProps {
  ticket_id: number;
  name: string;
  email: string;
  username: string;
  avatar: string;
  created_at?: string;
}

export async function getITicketDataProps(): Promise<ITicketDataProps> {
  const { data, error } = await supabase
    .from('ticket_db')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
