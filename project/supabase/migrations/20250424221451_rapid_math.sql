/*
  # Create businesses table

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `entity_type` (text)
      - `state` (text)
      - `business_name` (text)
      - `business_address` (jsonb)
      - `registered_agent` (jsonb)
      - `members` (jsonb)
      - `business_purpose` (text)
      - `selected_package` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `businesses` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to insert their own data
*/

CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  entity_type text NOT NULL,
  state text NOT NULL,
  business_name text NOT NULL,
  business_address jsonb NOT NULL,
  registered_agent jsonb NOT NULL,
  members jsonb NOT NULL,
  business_purpose text NOT NULL,
  selected_package text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own businesses"
  ON businesses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own businesses"
  ON businesses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);