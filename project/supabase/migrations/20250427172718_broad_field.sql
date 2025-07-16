/*
  # Fix document upload RLS policies
  
  1. Changes
    - Update storage bucket policies
    - Fix document table RLS policies
    - Ensure proper employee access
  
  2. Security
    - Allow employees to upload files
    - Maintain existing access controls
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Employee document creation" ON documents;
DROP POLICY IF EXISTS "Employee document management" ON documents;
DROP POLICY IF EXISTS "Employee upload policy" ON storage.objects;

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('formation-documents', 'formation-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy for employee uploads
CREATE POLICY "Employee upload policy"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'formation-documents' AND
  (
    auth.jwt() ->> 'email' LIKE '%@buildabiz.com' OR 
    auth.jwt() ->> 'email' LIKE '%@wealthyallianceclub.com'
  )
);

-- Create policy for document creation
CREATE POLICY "Employee document creation"
ON documents
FOR INSERT
TO authenticated
WITH CHECK (
  (
    auth.jwt() ->> 'email' LIKE '%@buildabiz.com' OR 
    auth.jwt() ->> 'email' LIKE '%@wealthyallianceclub.com'
  )
  AND EXISTS (
    SELECT 1 FROM businesses 
    WHERE businesses.id = business_id
  )
);

-- Create policy for document management
CREATE POLICY "Employee document management"
ON documents
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' LIKE '%@buildabiz.com' OR 
  auth.jwt() ->> 'email' LIKE '%@wealthyallianceclub.com'
)
WITH CHECK (
  auth.jwt() ->> 'email' LIKE '%@buildabiz.com' OR 
  auth.jwt() ->> 'email' LIKE '%@wealthyallianceclub.com'
);