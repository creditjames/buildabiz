/*
  # Add RLS policies for employee access
  
  1. Changes
    - Add policy for employees to view all businesses
    - Add policy for employees to view all documents
    - Employees are identified by their email domain (@buildabiz.com or @wealthyallianceclub.com)
  
  2. Security
    - Only employees can access all records
    - Regular users can still only see their own data
*/

-- Add policy for employees to view all businesses
CREATE POLICY "Employees can view all businesses"
ON businesses FOR SELECT
TO authenticated
USING (
  auth.email() LIKE '%@buildabiz.com' OR
  auth.email() LIKE '%@wealthyallianceclub.com'
);

-- Add policy for employees to view all documents
CREATE POLICY "Employees can view all documents"
ON documents FOR SELECT
TO authenticated
USING (
  auth.email() LIKE '%@buildabiz.com' OR
  auth.email() LIKE '%@wealthyallianceclub.com'
);