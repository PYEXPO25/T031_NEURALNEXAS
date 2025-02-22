import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Device = Database['public']['Tables']['devices']['Row'];

export async function getDevices(): Promise<Device[]> {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .order('name');
    
  if (error) throw error;
  return data || [];
}

export async function createDevice(name: string, location: string): Promise<Device> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('devices')
    .insert([{ 
      name, 
      location,
      user_id: user.id 
    }])
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

export async function updateDevice(id: string, updates: { name?: string; location?: string }): Promise<Device> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('devices')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user owns the device
    .select()
    .single();
    
  if (error) throw error;
  return data;
}