/*
  # Fix document upload functionality
  
  1. Changes
    - Create formation-documents bucket
    - Update RLS policies for storage and documents
    - Ensure proper access for employees and customers
  
  2. Security
    - Maintain security by checking employee email domains
    - Allow customers to view their own documents
    - Ensure proper business_id validation
*/

-- Create formation-documents bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('formation-documents', 'formation-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Employees can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can update files" ON storage.objects;
DROP POLICY IF EXISTS "Customers can view own files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can insert documents" ON documents;

-- Create storage policies for employee uploads
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

-- Allow customers to view their own files
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
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
  AND
  EXISTS (
    SELECT 1 
    FROM businesses 
    WHERE businesses.id = business_id
  )
);