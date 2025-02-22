export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      devices: {
        Row: {
          id: string
          name: string
          location: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          created_at?: string
          user_id?: string
        }
      }
      energy_readings: {
        Row: {
          id: string
          device_id: string
          timestamp: string
          power_consumption: number
          voltage: number
          current: number
          power_factor: number
          created_at: string
        }
        Insert: {
          id?: string
          device_id: string
          timestamp: string
          power_consumption: number
          voltage: number
          current: number
          power_factor: number
          created_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          timestamp?: string
          power_consumption?: number
          voltage?: number
          current?: number
          power_factor?: number
          created_at?: string
        }
      }
    }
  }
}