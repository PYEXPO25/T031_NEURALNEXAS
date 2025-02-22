/*
  # Authentication and Security Setup

  1. Security Updates
    - Enable secure access to devices and readings for authenticated users
    - Add policies to ensure users can only access their own devices
    - Add policies for energy readings access
  
  2. Changes
    - Add user_id column to devices table
    - Update security policies for authenticated access
*/

-- Add user_id to devices table
ALTER TABLE devices ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- Update RLS policies for devices
DROP POLICY IF EXISTS "Allow read access to all authenticated users for devices" ON devices;
CREATE POLICY "Users can read own devices"
  ON devices
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own devices"
  ON devices
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own devices"
  ON devices
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Update RLS policies for energy readings
DROP POLICY IF EXISTS "Allow read access to all authenticated users for energy readings" ON energy_readings;
CREATE POLICY "Users can read own device readings"
  ON energy_readings
  FOR SELECT
  TO authenticated
  USING (
    device_id IN (
      SELECT id FROM devices 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert readings for own devices"
  ON energy_readings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    device_id IN (
      SELECT id FROM devices 
      WHERE user_id = auth.uid()
    )
  );