/*
  # Fix Document RLS Policies

  1. Changes
    - Drop existing restrictive INSERT policy
    - Add new INSERT policy for employees that properly checks email domains
    - Ensure policy allows document creation with employee_id

  2. Security
    - Maintains existing SELECT and UPDATE policies
    - Adds proper INSERT policy for employees
    - Ensures employees can only upload documents for existing businesses
*/

-- Drop the existing overly restrictive INSERT policy
DROP POLICY IF EXISTS "Allow employee document creation" ON documents;

-- Create new INSERT policy for employees
CREATE POLICY "Allow employee document creation" ON documents
FOR INSERT TO authenticated
WITH CHECK (
  -- Check if user is an employee (based on email domain)
  (
    auth.jwt()->>'email' LIKE '%@buildabiz.com' OR 
    auth.jwt()->>'email' LIKE '%@wealthyallianceclub.com'
  )
  AND
  -- Verify the business exists
  EXISTS (
    SELECT 1 FROM businesses WHERE businesses.id = business_id
  )
  AND
  -- Ensure employee_id matches the authenticated user
  employee_id = auth.uid()
);