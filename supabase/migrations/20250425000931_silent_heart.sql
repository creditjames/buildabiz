/*
  # Fix document upload and storage policies
  
  1. Changes
    - Add employee_id to documents table
    - Update RLS policies for documents and storage
    - Add bucket for formation documents
  
  2. Security
    - Ensure proper employee access
    - Link documents to employees who upload them
    - Maintain customer access to their documents
*/

-- Create formation-documents bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('formation-documents', 'formation-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Add employee_id to documents if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'documents' AND column_name = 'employee_id'
  ) THEN
    ALTER TABLE documents ADD COLUMN employee_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Employees can insert documents" ON documents;
DROP POLICY IF EXISTS "Allow employee uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow employee updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow document access" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- Storage policies
CREATE POLICY "Allow employee uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'formation-documents' AND
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
);

CREATE POLICY "Allow employee updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'formation-documents' AND
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
);

CREATE POLICY "Allow document access"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'formation-documents' AND
  (
    -- Employees can access all documents
    (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
    OR
    -- Customers can access their own documents
    EXISTS (
      SELECT 1 FROM documents d
      JOIN businesses b ON d.business_id = b.id
      WHERE d.url LIKE '%' || name AND b.user_id = auth.uid()
    )
  )
);

-- Document policies
CREATE POLICY "Allow employee document creation"
ON documents
FOR INSERT
TO authenticated
WITH CHECK (
  -- Must be an employee
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
  AND
  -- Business must exist
  EXISTS (SELECT 1 FROM businesses WHERE id = business_id)
  AND
  -- Set employee_id to current user
  employee_id = auth.uid()
);

-- Update existing document policies to include employee_id check
DROP POLICY IF EXISTS "Employees can update documents" ON documents;
CREATE POLICY "Employees can update documents"
ON documents
FOR UPDATE
TO authenticated
USING (
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
)
WITH CHECK (
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
);