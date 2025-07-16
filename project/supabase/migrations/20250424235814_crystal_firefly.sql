/*
  # Update document storage and access policies
  
  1. Changes
    - Create storage bucket for formation documents
    - Add policies for employee uploads
    - Add policies for customer access
    - Update document table policies
  
  2. Security
    - Ensure documents are only accessible by authorized users
    - Allow employees to upload and manage documents
    - Allow customers to view their own documents
*/

-- Create formation documents bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('formation-documents', 'formation-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop storage policies
  DROP POLICY IF EXISTS "Employees can upload files" ON storage.objects;
  DROP POLICY IF EXISTS "Employees can update files" ON storage.objects;
  DROP POLICY IF EXISTS "Customers can view own files" ON storage.objects;
  
  -- Drop document policies
  DROP POLICY IF EXISTS "Employees can insert documents" ON documents;
  DROP POLICY IF EXISTS "Employees can update documents" ON documents;
  DROP POLICY IF EXISTS "Customers can view own documents" ON documents;
END $$;

-- Add storage policies for employee uploads
CREATE POLICY "Employees can upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'formation-documents' AND
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
);

CREATE POLICY "Employees can update files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'formation-documents' AND
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
)
WITH CHECK (
  bucket_id = 'formation-documents' AND
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
);

-- Add policy for customers to view their own files
CREATE POLICY "Customers can view own files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'formation-documents' AND
  EXISTS (
    SELECT 1 FROM documents d
    JOIN businesses b ON d.business_id = b.id
    WHERE 
      d.url LIKE '%' || name AND
      b.user_id = auth.uid()
  )
);

-- Update document table policies
CREATE POLICY "Employees can insert documents"
ON documents
FOR INSERT
TO authenticated
WITH CHECK (
  auth.email() LIKE '%@buildabiz.com' OR 
  auth.email() LIKE '%@wealthyallianceclub.com'
);

CREATE POLICY "Employees can update documents"
ON documents
FOR UPDATE
TO authenticated
USING (
  auth.email() LIKE '%@buildabiz.com' OR 
  auth.email() LIKE '%@wealthyallianceclub.com'
)
WITH CHECK (
  auth.email() LIKE '%@buildabiz.com' OR 
  auth.email() LIKE '%@wealthyallianceclub.com'
);

CREATE POLICY "Customers can view own documents"
ON documents
FOR SELECT
TO authenticated
USING (
  business_id IN (
    SELECT id FROM businesses 
    WHERE user_id = auth.uid()
  )
);