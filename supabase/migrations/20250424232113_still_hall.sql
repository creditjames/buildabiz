/*
  # Update storage policies for employee uploads

  1. Storage Policies
    - Create storage bucket for employee uploads if it doesn't exist
    - Add policies to allow employees to:
      - Read files (SELECT)
      - Update files (UPDATE)
      - Delete files (DELETE)
    - Employees are identified by their email domain (@buildabiz.com or @wealthyallianceclub.com)

  2. Security
    - Only authenticated users can access the bucket
    - Only employees can modify files
    - Files are organized by business ID for better organization
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('employee-uploads', 'employee-uploads')
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Employees can read files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can update files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can delete files" ON storage.objects;

-- Policy to allow employees to read files
CREATE POLICY "Employees can read files"
ON storage.objects FOR SELECT TO authenticated
USING (
  -- Check if user's email ends with allowed domains
  (auth.email() LIKE '%@buildabiz.com' OR 
   auth.email() LIKE '%@wealthyallianceclub.com') AND
  -- Ensure files are from the employee-uploads bucket
  (bucket_id = 'employee-uploads')
);

-- Policy to allow employees to update files
CREATE POLICY "Employees can update files"
ON storage.objects FOR UPDATE TO authenticated
USING (
  -- Check if user's email ends with allowed domains
  (auth.email() LIKE '%@buildabiz.com' OR 
   auth.email() LIKE '%@wealthyallianceclub.com') AND
  -- Ensure files are in the employee-uploads bucket
  (bucket_id = 'employee-uploads')
)
WITH CHECK (
  -- Check if user's email ends with allowed domains
  (auth.email() LIKE '%@buildabiz.com' OR 
   auth.email() LIKE '%@wealthyallianceclub.com') AND
  -- Ensure files are in the employee-uploads bucket
  (bucket_id = 'employee-uploads')
);

-- Policy to allow employees to delete files
CREATE POLICY "Employees can delete files"
ON storage.objects FOR DELETE TO authenticated
USING (
  -- Check if user's email ends with allowed domains
  (auth.email() LIKE '%@buildabiz.com' OR 
   auth.email() LIKE '%@wealthyallianceclub.com') AND
  -- Ensure files are in the employee-uploads bucket
  (bucket_id = 'employee-uploads')
);