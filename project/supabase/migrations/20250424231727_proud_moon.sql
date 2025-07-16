/*
  # Fix storage bucket policies for employee uploads

  1. Changes
    - Drop existing policies to avoid conflicts
    - Create storage bucket if it doesn't exist
    - Enable RLS on the bucket
    - Add policies to allow:
      - Employees to upload and update files
      - Users to read their own business documents
      
  2. Security
    - Employees are identified by email domain (@buildabiz.com or @wealthyallianceclub.com)
    - Users can only read documents related to their businesses
*/

-- Drop existing policies to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Employees can upload files" ON storage.objects;
  DROP POLICY IF EXISTS "Employees can update files" ON storage.objects;
  DROP POLICY IF EXISTS "Users can read their own business documents" ON storage.objects;
END $$;

-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name)
SELECT 'employee-uploads', 'employee-uploads'
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'employee-uploads'
);

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy for employees to upload files
CREATE POLICY "Employees can upload files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  auth.email() LIKE '%@buildabiz.com' OR 
  auth.email() LIKE '%@wealthyallianceclub.com'
);

-- Policy for employees to update files
CREATE POLICY "Employees can update files"
ON storage.objects FOR UPDATE TO authenticated
USING (
  auth.email() LIKE '%@buildabiz.com' OR 
  auth.email() LIKE '%@wealthyallianceclub.com'
)
WITH CHECK (
  auth.email() LIKE '%@buildabiz.com' OR 
  auth.email() LIKE '%@wealthyallianceclub.com'
);

-- Policy for users to read their own business documents
CREATE POLICY "Users can read their own business documents"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (EXISTS (
    SELECT 1 FROM documents d
    JOIN businesses b ON d.business_id = b.id
    WHERE 
      d.url LIKE '%' || name AND
      b.user_id = auth.uid()
  ))
);