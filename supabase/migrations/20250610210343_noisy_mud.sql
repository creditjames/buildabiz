/*
  # Fix document upload policies for employees
  
  1. Changes
    - Drop existing conflicting policies
    - Create new policies for employee document uploads
    - Avoid operations requiring table ownership
  
  2. Security
    - Allow employees to upload and manage documents
    - Maintain proper access control
*/

-- Drop ALL existing document policies to avoid conflicts
DROP POLICY IF EXISTS "Employee document creation" ON documents;
DROP POLICY IF EXISTS "Employee document management" ON documents;
DROP POLICY IF EXISTS "Allow employee document creation" ON documents;
DROP POLICY IF EXISTS "Employees can insert documents" ON documents;
DROP POLICY IF EXISTS "Employees can update documents" ON documents;
DROP POLICY IF EXISTS "Employees can view all documents" ON documents;

-- Drop ALL existing storage policies to avoid conflicts
DROP POLICY IF EXISTS "Employee upload policy" ON storage.objects;
DROP POLICY IF EXISTS "Employee update policy" ON storage.objects;
DROP POLICY IF EXISTS "Document access policy" ON storage.objects;
DROP POLICY IF EXISTS "Employees can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Employees can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can update files" ON storage.objects;
DROP POLICY IF EXISTS "Allow document access" ON storage.objects;
DROP POLICY IF EXISTS "User upload policy" ON storage.objects;
DROP POLICY IF EXISTS "User update policy" ON storage.objects;
DROP POLICY IF EXISTS "public_read_policy" ON storage.objects;

-- Ensure storage bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('formation-documents', 'formation-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Create new document policies with unique names
CREATE POLICY "emp_doc_insert_2025" ON documents
FOR INSERT TO authenticated
WITH CHECK (
  -- Check if user is an employee using email domain
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR 
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR 
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
  AND
  -- Verify the business exists
  EXISTS (
    SELECT 1 FROM businesses WHERE id = business_id
  )
);

CREATE POLICY "emp_doc_update_2025" ON documents
FOR UPDATE TO authenticated
USING (
  (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR 
  (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR 
  (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
)
WITH CHECK (
  (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR 
  (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR 
  (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
);

CREATE POLICY "emp_doc_select_2025" ON documents
FOR SELECT TO authenticated
USING (
  (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR 
  (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR 
  (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
);

-- Create new storage policies with unique names
CREATE POLICY "emp_storage_insert_2025" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'formation-documents' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR 
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR 
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
);

CREATE POLICY "emp_storage_update_2025" ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id = 'formation-documents' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR 
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR 
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
)
WITH CHECK (
  bucket_id = 'formation-documents' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR 
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR 
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
);

CREATE POLICY "storage_access_2025" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'formation-documents' AND
  (
    -- Employees can access all documents
    (
      (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR 
      (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR 
      (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
    )
    OR
    -- Customers can access their own documents
    EXISTS (
      SELECT 1 FROM documents d
      JOIN businesses b ON d.business_id = b.id
      WHERE 
        d.url LIKE '%' || storage.objects.name AND 
        b.user_id = auth.uid()
    )
  )
);

-- Recreate user upload policies for profile images and business logos
CREATE POLICY "user_uploads_2025" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id IN ('business-logos', 'profile-images')
);

CREATE POLICY "user_updates_2025" ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id IN ('business-logos', 'profile-images') AND
  auth.uid() = owner
)
WITH CHECK (
  bucket_id IN ('business-logos', 'profile-images') AND
  auth.uid() = owner
);

CREATE POLICY "public_read_2025" ON storage.objects
FOR SELECT TO public
USING (
  bucket_id IN ('business-logos', 'profile-images', 'formation-documents')
);