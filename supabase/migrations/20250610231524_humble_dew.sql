/*
  # Fix employee uploads RLS policy
  
  1. Changes
    - Set employee-uploads bucket to private (public = false)
    - Drop and recreate all storage policies for employee-uploads bucket
    - Ensure proper RLS configuration for document uploads
  
  2. Security
    - Make bucket private to ensure all access is governed by RLS
    - Allow only employees to upload, view, update, and delete files
    - Maintain existing document table policies
*/

-- Update the employee-uploads bucket to be private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'employee-uploads';

-- Drop ALL existing storage policies for employee-uploads to avoid conflicts
DROP POLICY IF EXISTS "Employees can insert files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can select files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can update files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can delete files" ON storage.objects;
DROP POLICY IF EXISTS "emp_storage_insert_2025" ON storage.objects;
DROP POLICY IF EXISTS "emp_storage_update_2025" ON storage.objects;
DROP POLICY IF EXISTS "storage_access_2025" ON storage.objects;

-- Create new storage policies for the private employee-uploads bucket
CREATE POLICY "employee_uploads_insert"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
);

CREATE POLICY "employee_uploads_select"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (
    -- Employees can access all files
    (
      (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR
      (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR
      (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
    )
    OR
    -- Customers can access their own business documents
    EXISTS (
      SELECT 1 FROM documents d
      JOIN businesses b ON d.business_id = b.id
      WHERE 
        d.url LIKE '%' || storage.objects.name AND 
        b.user_id = auth.uid()
    )
  )
);

CREATE POLICY "employee_uploads_update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
)
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
);

CREATE POLICY "employee_uploads_delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
);

-- Ensure the document table has the correct INSERT policy
DROP POLICY IF EXISTS "employees_can_insert_documents" ON documents;

CREATE POLICY "employees_can_insert_documents" 
ON documents 
FOR INSERT 
TO authenticated 
WITH CHECK (
  -- Check if user has employee email domain
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR 
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR 
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
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