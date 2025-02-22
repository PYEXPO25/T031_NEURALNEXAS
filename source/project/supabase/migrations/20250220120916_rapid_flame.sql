/*
  # Smart Energy Meter Schema

  1. New Tables
    - `devices`
      - `id` (uuid, primary key)
      - `name` (text)
      - `location` (text)
      - `created_at` (timestamp)
    
    - `energy_readings`
      - `id` (uuid, primary key)
      - `device_id` (uuid, foreign key)
      - `timestamp` (timestamp)
      - `power_consumption` (float)
      - `voltage` (float)
      - `current` (float)
      - `power_factor` (float)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read all data
*/

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create energy readings table
CREATE TABLE IF NOT EXISTS energy_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id uuid REFERENCES devices(id) ON DELETE CASCADE,
  timestamp timestamptz NOT NULL,
  power_consumption float NOT NULL,
  voltage float NOT NULL,
  current float NOT NULL,
  power_factor float NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_readings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to all authenticated users for devices"
  ON devices
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to all authenticated users for energy readings"
  ON energy_readings
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_energy_readings_device_id ON energy_readings(device_id);
CREATE INDEX IF NOT EXISTS idx_energy_readings_timestamp ON energy_readings(timestamp);