import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type EnergyReading = Database['public']['Tables']['energy_readings']['Row'];

export async function getReadings(deviceId: string, limit = 24): Promise<EnergyReading[]> {
  const { data, error } = await supabase
    .from('energy_readings')
    .select('*')
    .eq('device_id', deviceId)
    .order('timestamp', { ascending: false })
    .limit(limit);
    
  if (error) throw error;
  return data || [];
}

export async function createReading(reading: {
  device_id: string;
  timestamp: string;
  power_consumption: number;
  voltage: number;
  current: number;
  power_factor: number;
}): Promise<EnergyReading> {
  const { data, error } = await supabase
    .from('energy_readings')
    .insert([reading])
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

export async function getLatestReading(deviceId: string): Promise<EnergyReading | null> {
  const { data, error } = await supabase
    .from('energy_readings')
    .select('*')
    .eq('device_id', deviceId)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();
    
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export function subscribeToReadings(
  deviceId: string,
  onNewReading: (reading: EnergyReading) => void
): () => void {
  const channel = supabase
    .channel(`readings-${deviceId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'energy_readings',
        filter: `device_id=eq.${deviceId}`,
      },
      (payload) => {
        onNewReading(payload.new as EnergyReading);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}