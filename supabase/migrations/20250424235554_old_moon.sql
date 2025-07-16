/*
  # Fix employee upload policies
  
  1. Changes
    - Drop existing policies before recreating
    - Add RLS policies for employee uploads to storage
    - Add RLS policies for employee document creation
    - Add RLS policies for employee document updates
  
  2. Security
    - Allow employees to upload files
    - Allow employees to create document records
    - Maintain existing user access policies
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop storage policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Employees can upload files'
  ) THEN
    DROP POLICY "Employees can upload files" ON storage.objects;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Employees can update files'
  ) THEN
    DROP POLICY "Employees can update files" ON storage.objects;
  END IF;

  -- Drop document policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'documents' 
    AND policyname = 'Employees can insert documents'
  ) THEN
    DROP POLICY "Employees can insert documents" ON documents;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'documents' 
    AND policyname = 'Employees can update documents'
  ) THEN
    DROP POLICY "Employees can update documents" ON documents;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'documents' 
    AND policyname = 'Employees can view all documents'
  ) THEN
    DROP POLICY "Employees can view all documents" ON documents;
  END IF;
END $$;

-- Add storage policies for employee uploads
CREATE POLICY "Employees can upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
);

CREATE POLICY "Employees can update files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
)
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
);

-- Add document policies for employees
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

-- Add policy for employees to view all documents
CREATE POLICY "Employees can view all documents"
ON documents
FOR SELECT
TO authenticated
USING (
  auth.email() LIKE '%@buildabiz.com' OR 
  auth.email() LIKE '%@wealthyallianceclub.com'
);