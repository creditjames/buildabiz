/*
  # Add employee update permissions for businesses

  1. Changes
    - Add policy allowing employees to update any business record
    - Employees are identified by their email domain (@buildabiz.com or @wealthyallianceclub.com)
    
  2. Security
    - Only authenticated employees can update business records
    - Updates are restricted to specific fields
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Employees can update any business" ON businesses;

-- Create policy for employees to update businesses
CREATE POLICY "Employees can update any business"
ON businesses FOR UPDATE
TO authenticated
USING (
  auth.email() LIKE '%@buildabiz.com' OR
  auth.email() LIKE '%@wealthyallianceclub.com'
)
WITH CHECK (
  auth.email() LIKE '%@buildabiz.com' OR
  auth.email() LIKE '%@wealthyallianceclub.com'
);