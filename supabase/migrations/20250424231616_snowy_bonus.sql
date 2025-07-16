/*
  # Fix document upload policies

  1. Changes
    - Create employee-uploads bucket with proper configuration
    - Set up comprehensive storage policies for employee access
    - Configure file size limits and allowed file types
*/

-- Create the employee-uploads bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'employee-uploads',
  'employee-uploads',
  false,
  10485760,
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE
SET 
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies for employee access
CREATE POLICY "Employees can upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'employee-uploads'
  AND (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email LIKE '%@buildabiz.com'
        OR auth.users.email LIKE '%@wealthyallianceclub.com'
      )
    )
  )
);

CREATE POLICY "Employees can read files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'employee-uploads'
  AND (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email LIKE '%@buildabiz.com'
        OR auth.users.email LIKE '%@wealthyallianceclub.com'
      )
    )
  )
);

CREATE POLICY "Employees can update files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'employee-uploads'
  AND (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email LIKE '%@buildabiz.com'
        OR auth.users.email LIKE '%@wealthyallianceclub.com'
      )
    )
  )
)
WITH CHECK (
  bucket_id = 'employee-uploads'
  AND (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email LIKE '%@buildabiz.com'
        OR auth.users.email LIKE '%@wealthyallianceclub.com'
      )
    )
  )
);

CREATE POLICY "Employees can delete files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'employee-uploads'
  AND (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email LIKE '%@buildabiz.com'
        OR auth.users.email LIKE '%@wealthyallianceclub.com'
      )
    )
  )
);