/*
  # Add storage policies for employee uploads

  1. Changes
    - Create new storage bucket for employee uploads
    - Add RLS policies for employee access
    - Enable proper upload permissions
*/

-- Create the employee uploads bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('employee-uploads', 'employee-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow employees to upload files
CREATE POLICY "Employees can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'employee-uploads'
  AND (
    auth.email() LIKE '%@buildabiz.com'
    OR auth.email() LIKE '%@wealthyallianceclub.com'
  )
);

-- Allow employees to read files
CREATE POLICY "Employees can read files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'employee-uploads'
  AND (
    auth.email() LIKE '%@buildabiz.com'
    OR auth.email() LIKE '%@wealthyallianceclub.com'
  )
);

-- Allow employees to update files
CREATE POLICY "Employees can update files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'employee-uploads'
  AND (
    auth.email() LIKE '%@buildabiz.com'
    OR auth.email() LIKE '%@wealthyallianceclub.com'
  )
)
WITH CHECK (
  bucket_id = 'employee-uploads'
  AND (
    auth.email() LIKE '%@buildabiz.com'
    OR auth.email() LIKE '%@wealthyallianceclub.com'
  )
);

-- Allow employees to delete files
CREATE POLICY "Employees can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'employee-uploads'
  AND (
    auth.email() LIKE '%@buildabiz.com'
    OR auth.email() LIKE '%@wealthyallianceclub.com'
  )
);