import { Device, EnergyReading } from './types';

export const mockDevices: Device[] = [
  { id: '1', name: 'Living Room Smart Meter', location: 'Living Room' },
  { id: '2', name: 'Kitchen Smart Meter', location: 'Kitchen' },
  { id: '3', name: 'Home Office Smart Meter', location: 'Office' }
];

function generateMockReadings(deviceId: string): EnergyReading[] {
  const readings: EnergyReading[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 3600000).toISOString();
    readings.push({
      id: `${deviceId}-${i}`,
      device_id: deviceId,
      timestamp,
      power_consumption: 2 + Math.random() * 3,
      voltage: 220 + Math.random() * 10,
      current: 8 + Math.random() * 4,
      power_factor: 0.85 + Math.random() * 0.1
    });
  }
  
  return readings;
}

export const mockReadings: Record<string, EnergyReading[]> = {
  '1': generateMockReadings('1'),
  '2': generateMockReadings('2'),
  '3': generateMockReadings('3')
};