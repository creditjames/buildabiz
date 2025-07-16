/*
  # Add storage bucket policies for employee uploads
  
  1. Changes
    - Create storage bucket policies to allow employees to upload files
    - Policies match the existing document table RLS policies
    - Employees (users with @buildabiz.com or @wealthyallianceclub.com emails) can upload files
  
  2. Security
    - Policies ensure only authorized employees can upload files
    - Maintains consistency with document table permissions
*/

-- Create the employee-uploads bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('employee-uploads', 'employee-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Employees can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can update files" ON storage.objects;
DROP POLICY IF EXISTS "Users can read their own business documents" ON storage.objects;

-- Create policy to allow employees to upload files
CREATE POLICY "Employees can upload files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (
    auth.email() LIKE '%@buildabiz.com' OR 
    auth.email() LIKE '%@wealthyallianceclub.com'
  )
);

-- Create policy to allow employees to update files
CREATE POLICY "Employees can update files"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (
    auth.email() LIKE '%@buildabiz.com' OR 
    auth.email() LIKE '%@wealthyallianceclub.com'
  )
)
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (
    auth.email() LIKE '%@buildabiz.com' OR 
    auth.email() LIKE '%@wealthyallianceclub.com'
  )
);

-- Create policy to allow users to read their own business documents
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