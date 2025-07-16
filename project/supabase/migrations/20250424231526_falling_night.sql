/*
  # Fix document upload policies

  1. Changes
    - Drop existing storage policies
    - Create new comprehensive policies for document management
    - Add proper bucket configuration
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Employees can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can read files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can update files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can delete files" ON storage.objects;

-- Ensure bucket exists with proper configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'employee-uploads',
  'employee-uploads',
  false,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE
SET 
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];

-- Create unified policy for employee access
CREATE POLICY "Employee document access"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'employee-uploads'
  AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND (
      auth.users.email LIKE '%@buildabiz.com'
      OR auth.users.email LIKE '%@wealthyallianceclub.com'
    )
  )
)
WITH CHECK (
  bucket_id = 'employee-uploads'
  AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND (
      auth.users.email LIKE '%@buildabiz.com'
      OR auth.users.email LIKE '%@wealthyallianceclub.com'
    )
  )
);