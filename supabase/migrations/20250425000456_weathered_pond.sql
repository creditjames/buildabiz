/*
  # Fix document upload RLS policies

  1. Changes
    - Update the RLS policy for document uploads to properly handle employee permissions
    - Ensure employees can upload documents while maintaining security
  
  2. Security
    - Modify INSERT policy to allow employees to upload documents
    - Keep existing SELECT and UPDATE policies intact
    - Maintain security by checking employee email domains
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Employees can insert documents" ON documents;

-- Create new INSERT policy with proper checks
CREATE POLICY "Employees can insert documents" ON documents
FOR INSERT TO authenticated
WITH CHECK (
  -- Allow employees from both domains to insert documents
  (
    (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
    AND
    -- Ensure the business_id exists
    EXISTS (
      SELECT 1 
      FROM businesses 
      WHERE businesses.id = business_id
    )
  )
);