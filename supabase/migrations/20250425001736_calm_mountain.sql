/*
  # Fix Upload and Document Policies

  1. Changes
    - Drop and recreate storage policies for employee-uploads bucket
    - Update document policies to properly handle employee uploads
    - Ensure proper access control for both storage and documents

  2. Security
    - Maintain proper RLS for both storage and documents
    - Allow employees to upload and manage documents
    - Ensure business documents are only accessible to proper users
*/

-- Drop existing storage policies
DROP POLICY IF EXISTS "Allow employee uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow employee updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow document access" ON storage.objects;

-- Create storage policies for employee-uploads bucket
CREATE POLICY "Employee upload policy"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (
    auth.jwt()->>'email' LIKE '%@buildabiz.com' OR 
    auth.jwt()->>'email' LIKE '%@wealthyallianceclub.com'
  )
);

CREATE POLICY "Employee update policy"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (
    auth.jwt()->>'email' LIKE '%@buildabiz.com' OR 
    auth.jwt()->>'email' LIKE '%@wealthyallianceclub.com'
  )
);

CREATE POLICY "Document access policy"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (
    -- Employees can access all documents
    (
      auth.jwt()->>'email' LIKE '%@buildabiz.com' OR 
      auth.jwt()->>'email' LIKE '%@wealthyallianceclub.com'
    )
    OR
    -- Users can access their own documents
    EXISTS (
      SELECT 1 
      FROM documents d
      JOIN businesses b ON d.business_id = b.id
      WHERE 
        d.url LIKE '%' || storage.objects.name AND 
        b.user_id = auth.uid()
    )
  )
);

-- Drop and recreate document policies
DROP POLICY IF EXISTS "Allow employee document creation" ON documents;
DROP POLICY IF EXISTS "Employees can update documents" ON documents;

CREATE POLICY "Employee document creation"
ON documents
FOR INSERT
TO authenticated
WITH CHECK (
  (
    auth.jwt()->>'email' LIKE '%@buildabiz.com' OR 
    auth.jwt()->>'email' LIKE '%@wealthyallianceclub.com'
  )
  AND
  EXISTS (SELECT 1 FROM businesses WHERE id = business_id)
  AND
  employee_id = auth.uid()
);

CREATE POLICY "Employee document management"
ON documents
FOR UPDATE
TO authenticated
USING (
  auth.jwt()->>'email' LIKE '%@buildabiz.com' OR 
  auth.jwt()->>'email' LIKE '%@wealthyallianceclub.com'
)
WITH CHECK (
  auth.jwt()->>'email' LIKE '%@buildabiz.com' OR 
  auth.jwt()->>'email' LIKE '%@wealthyallianceclub.com'
);