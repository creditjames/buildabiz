/*
  # Update documents table RLS policies

  1. Changes
    - Update the INSERT policy for employees to properly handle business validation
    - Remove employee_id requirement since it's optional
    - Ensure proper business existence check

  2. Security
    - Maintains RLS enabled
    - Updates policy to allow employees to insert documents for any valid business
    - Keeps existing SELECT and UPDATE policies intact
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Employees can insert documents" ON documents;

-- Create new INSERT policy for employees that properly validates business existence
CREATE POLICY "Employees can insert documents" ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Check if user is an employee
    (
      auth.email() LIKE '%@buildabiz.com' OR 
      auth.email() LIKE '%@wealthyallianceclub.com'
    )
    AND
    -- Verify the business exists
    EXISTS (
      SELECT 1 
      FROM businesses 
      WHERE businesses.id = business_id
    )
  );