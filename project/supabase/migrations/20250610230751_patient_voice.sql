/*
  # Fix employee document upload permissions
  
  1. Changes
    - Update document table policies for employee uploads
    - Ensure bucket exists with proper configuration
    - Focus on database-level permissions only
  
  2. Security
    - Allow employees to insert documents
    - Maintain existing access controls
    - Storage policies will need to be configured in Supabase dashboard
*/

-- Ensure the employee-uploads bucket exists and has proper configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'employee-uploads',
  'employee-uploads',
  true,
  10485760,
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/jpg']
) ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Drop existing document policies
DROP POLICY IF EXISTS "emp_doc_insert_2025" ON documents;
DROP POLICY IF EXISTS "emp_doc_select_2025" ON documents;
DROP POLICY IF EXISTS "emp_doc_update_2025" ON documents;

-- Create document policy for employee inserts (more permissive)
CREATE POLICY "emp_doc_insert_2025"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (
      (auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.com'::text OR 
      (auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.us'::text OR 
      (auth.jwt() ->> 'email'::text) ~~ '%@wealthyallianceclub.com'::text
    ) AND 
    (EXISTS (
      SELECT 1
      FROM businesses
      WHERE businesses.id = documents.business_id
    )) AND
    (employee_id = auth.uid())
  );

-- Create document policy for employee selects
CREATE POLICY "emp_doc_select_2025"
  ON documents
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.com'::text OR 
    (auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.us'::text OR 
    (auth.jwt() ->> 'email'::text) ~~ '%@wealthyallianceclub.com'::text
  );

-- Create document policy for employee updates
CREATE POLICY "emp_doc_update_2025"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.com'::text OR 
    (auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.us'::text OR 
    (auth.jwt() ->> 'email'::text) ~~ '%@wealthyallianceclub.com'::text
  )
  WITH CHECK (
    (auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.com'::text OR 
    (auth.jwt() ->> 'email'::text) ~~ '%@buildabiz.us'::text OR 
    (auth.jwt() ->> 'email'::text) ~~ '%@wealthyallianceclub.com'::text
  );

-- Note: Storage policies for the employee-uploads bucket need to be configured
-- in the Supabase dashboard under Storage > Policies due to permission restrictions
-- The required policies are:
-- 1. INSERT policy allowing employees to upload files
-- 2. SELECT policy allowing employees to read files  
-- 3. UPDATE policy allowing employees to modify files
-- All policies should check for employee email domains: @buildabiz.com, @buildabiz.us, @wealthyallianceclub.com