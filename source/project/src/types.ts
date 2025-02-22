export interface EnergyReading {
  id: string;
  timestamp: string;
  power_consumption: number;
  voltage: number;
  current: number;
  power_factor: number;
  device_id: string;
}

export interface Device {
  id: string;
  name: string;
  location: string;
}