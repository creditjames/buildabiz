/*
  # Add admin management functionality
  
  1. New Tables
    - `admin_users` table to track admin accounts
    - Links to auth.users with admin-specific metadata
    
  2. Functions
    - Function to create new admin users
    - Function to revoke admin access
    
  3. Security
    - Enable RLS on admin_users table
    - Add policies for admin management
*/

-- Create admin_users table to track admin accounts
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users table
CREATE POLICY "Admins can view all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (is_employee());

CREATE POLICY "Admins can insert admin users"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (is_employee());

CREATE POLICY "Admins can update admin users"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (is_employee())
  WITH CHECK (is_employee());

CREATE POLICY "Admins can delete admin users"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (is_employee());

-- Add timestamp trigger
CREATE TRIGGER update_admin_users_timestamp
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- Function to create new admin user
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email text,
  admin_password text,
  created_by_id uuid DEFAULT auth.uid()
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
  result json;
BEGIN
  -- Check if current user is an admin
  IF NOT is_employee() THEN
    RAISE EXCEPTION 'Only admins can create admin users';
  END IF;

  -- Validate email domain
  IF NOT (
    admin_email LIKE '%@buildabiz.com' OR 
    admin_email LIKE '%@buildabiz.us' OR 
    admin_email LIKE '%@wealthyallianceclub.com'
  ) THEN
    RAISE EXCEPTION 'Admin email must be from an authorized domain';
  END IF;

  -- Check if user already exists
  SELECT id INTO new_user_id
  FROM auth.users
  WHERE email = admin_email;

  IF new_user_id IS NOT NULL THEN
    -- User exists, just add to admin_users if not already there
    INSERT INTO admin_users (user_id, email, created_by)
    VALUES (new_user_id, admin_email, created_by_id)
    ON CONFLICT (user_id) DO UPDATE SET
      is_active = true,
      updated_at = now();
    
    result := json_build_object(
      'success', true,
      'message', 'User added to admin list',
      'user_id', new_user_id
    );
  ELSE
    -- Return instructions for manual user creation
    result := json_build_object(
      'success', false,
      'message', 'User must be created manually in Supabase Auth. Please create the user first, then add them as admin.',
      'email', admin_email
    );
  END IF;

  RETURN result;
END;
$$;

-- Function to revoke admin access
CREATE OR REPLACE FUNCTION revoke_admin_access(target_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  -- Check if current user is an admin
  IF NOT is_employee() THEN
    RAISE EXCEPTION 'Only admins can revoke admin access';
  END IF;

  -- Prevent self-deletion
  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot revoke your own admin access';
  END IF;

  -- Deactivate admin user
  UPDATE admin_users
  SET is_active = false, updated_at = now()
  WHERE user_id = target_user_id;

  IF FOUND THEN
    result := json_build_object(
      'success', true,
      'message', 'Admin access revoked successfully'
    );
  ELSE
    result := json_build_object(
      'success', false,
      'message', 'Admin user not found'
    );
  END IF;

  RETURN result;
END;
$$;

-- Insert existing admin users based on email domains
INSERT INTO admin_users (user_id, email, created_by)
SELECT 
  u.id,
  u.email,
  u.id -- Self-created for existing users
FROM auth.users u
WHERE (
  u.email LIKE '%@buildabiz.com' OR 
  u.email LIKE '%@buildabiz.us' OR 
  u.email LIKE '%@wealthyallianceclub.com'
)
ON CONFLICT (user_id) DO NOTHING;