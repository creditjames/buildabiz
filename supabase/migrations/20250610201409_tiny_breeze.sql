/*
  # Fix admin dashboard and profiles table
  
  1. New Tables
    - `profiles` table for user profile information
    - Links to auth.users with proper foreign key
    
  2. Functions
    - `handle_new_user()` function to create profiles automatically
    - Updated `is_employee()` function for admin detection
    
  3. Security
    - Enable RLS on profiles table
    - Add policies for user and admin access
    - Update business policies for admin access
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name text,
  last_name text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Employees can view all profiles" ON profiles;

-- Create policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create or replace function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update the is_employee function to be more robust
CREATE OR REPLACE FUNCTION is_employee()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'email' LIKE '%@buildabiz.com' OR 
    auth.jwt() ->> 'email' LIKE '%@buildabiz.us' OR 
    auth.jwt() ->> 'email' LIKE '%@wealthyallianceclub.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add admin policies for profiles
CREATE POLICY "Employees can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (is_employee());

-- Ensure businesses table has proper admin access
DROP POLICY IF EXISTS "Employees can view all businesses" ON businesses;
CREATE POLICY "Employees can view all businesses"
  ON businesses
  FOR SELECT
  TO authenticated
  USING (is_employee());

DROP POLICY IF EXISTS "Employees can update any business" ON businesses;
CREATE POLICY "Employees can update any business"
  ON businesses
  FOR UPDATE
  TO authenticated
  USING (is_employee())
  WITH CHECK (is_employee());

-- Insert profile for existing users if they don't have one
INSERT INTO profiles (id, email, first_name, last_name)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'first_name', ''),
  COALESCE(u.raw_user_meta_data->>'last_name', '')
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM profiles p WHERE p.id = u.id
);