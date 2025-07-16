/*
  # Fix document policies for employee uploads
  
  1. Changes
    - Add employee_id column to documents table
    - Update RLS policies to allow employee uploads
    - Add policy for employee document management
  
  2. Security
    - Ensure proper access control for employees
    - Maintain existing user access policies
*/

-- Add employee_id column if not exists
ALTER TABLE documents 
ADD COLUMN IF NOT EXISTS employee_id uuid REFERENCES auth.users(id);

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Employee document creation" ON documents;
DROP POLICY IF EXISTS "Employee document management" ON documents;

-- Create new employee policies
CREATE POLICY "Employee document creation"
ON documents
FOR INSERT
TO authenticated
WITH CHECK (
  (
    (auth.jwt() ->> 'email'::text) LIKE '%@buildabiz.com'
    OR 
    (auth.jwt() ->> 'email'::text) LIKE '%@wealthyallianceclub.com'
  )
  AND EXISTS (
    SELECT 1 FROM businesses 
    WHERE businesses.id = documents.business_id
  )
  AND employee_id = auth.uid()
);

CREATE POLICY "Employee document management"
ON documents
FOR UPDATE
TO authenticated
USING (
  (auth.jwt() ->> 'email'::text) LIKE '%@buildabiz.com'
  OR 
  (auth.jwt() ->> 'email'::text) LIKE '%@wealthyallianceclub.com'
)
WITH CHECK (
  (auth.jwt() ->> 'email'::text) LIKE '%@buildabiz.com'
  OR 
  (auth.jwt() ->> 'email'::text) LIKE '%@wealthyallianceclub.com'
);

-- Create storage bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('formation-documents', 'formation-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects if not already enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop and recreate storage policy
DROP POLICY IF EXISTS "Employees can upload documents" ON storage.objects;
CREATE POLICY "Employees can upload documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'formation-documents'
  AND (
    (auth.jwt() ->> 'email'::text) LIKE '%@buildabiz.com'
    OR 
    (auth.jwt() ->> 'email'::text) LIKE '%@wealthyallianceclub.com'
  )
);