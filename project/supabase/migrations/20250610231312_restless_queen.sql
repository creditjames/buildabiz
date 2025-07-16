/*
  # Fix document upload RLS policy
  
  1. Changes
    - Drop the existing restrictive INSERT policy
    - Create a new policy that allows employees to insert documents
    - Use correct auth.jwt() function instead of jwt()
  
  2. Security
    - Verify employee email domains
    - Ensure business exists
    - Match employee_id with authenticated user
*/

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "emp_doc_insert_2025" ON documents;

-- Create a new, more permissive INSERT policy for employees
CREATE POLICY "employees_can_insert_documents" 
  ON documents 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (
    -- Check if user has employee email domain
    (
      (auth.jwt() ->> 'email'::text) LIKE '%@buildabiz.com'::text OR 
      (auth.jwt() ->> 'email'::text) LIKE '%@buildabiz.us'::text OR 
      (auth.jwt() ->> 'email'::text) LIKE '%@wealthyallianceclub.com'::text
    ) 
    AND 
    -- Ensure the business exists
    EXISTS (
      SELECT 1 
      FROM businesses 
      WHERE businesses.id = documents.business_id
    )
    AND
    -- Ensure employee_id matches the authenticated user
    employee_id = auth.uid()
  );