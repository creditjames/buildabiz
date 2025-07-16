/*
  # Fix employee document upload RLS policies
  
  1. Changes
    - Fix JWT function reference to use auth.jwt()
    - Update employee insert policy for documents
    - Create helper function for employee verification
  
  2. Security
    - Ensure only employees can upload documents
    - Verify business exists before allowing upload
    - Allow employees to set their own employee_id
*/

-- Drop and recreate the employee insert policy with proper conditions
DROP POLICY IF EXISTS "emp_doc_insert_2025" ON documents;

CREATE POLICY "emp_doc_insert_2025"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (
      ((auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.com'::text) OR 
      ((auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.us'::text) OR 
      ((auth.jwt() ->> 'email'::text) ~~ '%@wealthyallianceclub.com'::text)
    ) AND 
    (EXISTS (
      SELECT 1
      FROM businesses
      WHERE businesses.id = documents.business_id
    )) AND
    (employee_id = auth.uid())
  );

-- Also ensure we have update and select policies for employees
DROP POLICY IF EXISTS "emp_doc_update_2025" ON documents;
CREATE POLICY "emp_doc_update_2025"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (
    ((auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.com'::text) OR 
    ((auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.us'::text) OR 
    ((auth.jwt() ->> 'email'::text) ~~ '%@wealthyallianceclub.com'::text)
  )
  WITH CHECK (
    ((auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.com'::text) OR 
    ((auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.us'::text) OR 
    ((auth.jwt() ->> 'email'::text) ~~ '%@wealthyallianceclub.com'::text)
  );

DROP POLICY IF EXISTS "emp_doc_select_2025" ON documents;
CREATE POLICY "emp_doc_select_2025"
  ON documents
  FOR SELECT
  TO authenticated
  USING (
    ((auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.com'::text) OR 
    ((auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.us'::text) OR 
    ((auth.jwt() ->> 'email'::text) ~~ '%@wealthyallianceclub.com'::text)
  );

-- Create helper function for employee verification
CREATE OR REPLACE FUNCTION is_employee()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT (
    ((auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.com'::text) OR 
    ((auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.us'::text) OR 
    ((auth.jwt() ->> 'email'::text) ~~ '%@wealthyallianceclub.com'::text)
  );
$$;