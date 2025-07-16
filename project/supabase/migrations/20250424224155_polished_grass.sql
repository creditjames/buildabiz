/*
  # Create employee uploads bucket and update documents table
  
  1. New Storage Bucket
    - Creates a new bucket called 'employee-uploads'
    - Restricted access for authenticated users only
  
  2. Changes
    - Add bucket_id to documents table
    - Add employee_id to documents table
    - Update RLS policies for document access
  
  3. Security
    - Enable RLS on storage.objects
    - Add policies for employee uploads
    - Add policies for customer downloads
*/

-- Create the storage bucket for employee uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('employee-uploads', 'employee-uploads', false);

-- Add bucket_id and employee_id to documents table
ALTER TABLE documents 
ADD COLUMN bucket_id text DEFAULT 'employee-uploads',
ADD COLUMN employee_id uuid REFERENCES auth.users;

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy for employees to upload documents
CREATE POLICY "Employees can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE email LIKE '%@buildabiz.com'
  ))
);

-- Create policy for employees to update documents
CREATE POLICY "Employees can update documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE email LIKE '%@buildabiz.com'
  ))
)
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE email LIKE '%@buildabiz.com'
  ))
);

-- Create policy for customers to view their own documents
CREATE POLICY "Customers can view their own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (name LIKE auth.uid() || '/%' OR
   name IN (
    SELECT url FROM documents
    WHERE business_id IN (
      SELECT id FROM businesses
      WHERE user_id = auth.uid()
    )
  ))
);

-- Update documents table RLS policies
CREATE POLICY "Employees can insert documents"
ON documents FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE email LIKE '%@buildabiz.com'
  )
);

CREATE POLICY "Employees can update documents"
ON documents FOR UPDATE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE email LIKE '%@buildabiz.com'
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE email LIKE '%@buildabiz.com'
  )
);