/*
  # Fix Storage RLS Policies for Employee Uploads
  
  1. Changes
    - Drop existing storage policies to avoid conflicts
    - Create storage bucket for employee uploads if it doesn't exist
    - Add RLS policies for employee file operations
    
  2. Security
    - Allow employees from specified domains to upload, view, update, and delete files
    - Maintain proper access control for the employee-uploads bucket
*/

-- Ensure the employee-uploads bucket exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('employee-uploads', 'employee-uploads', true, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/jpg'])
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/jpg'];

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Employees can insert files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can select files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can update files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can delete files" ON storage.objects;

-- Create storage policies for employee-uploads bucket
CREATE POLICY "Employees can insert files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
);

CREATE POLICY "Employees can select files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
);

CREATE POLICY "Employees can update files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
)
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
);

CREATE POLICY "Employees can delete files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
  (
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.com' OR
    (auth.jwt() ->> 'email') LIKE '%@buildabiz.us' OR
    (auth.jwt() ->> 'email') LIKE '%@wealthyallianceclub.com'
  )
);