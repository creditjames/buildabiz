/*
  # Fix storage bucket policies for employee document uploads

  1. Changes
    - Add storage bucket policies for employee-uploads
    - Enable proper access control for document uploads
    - Align storage policies with database RLS

  2. Security
    - Ensure only authenticated employees can upload documents
    - Maintain existing RLS policies for document access
    - Add proper bucket policies for document storage
*/

-- Create storage bucket if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'employee-uploads'
  ) THEN
    INSERT INTO storage.buckets (id, name)
    VALUES ('employee-uploads', 'employee-uploads');
  END IF;
END $$;

-- Update storage bucket policies
DROP POLICY IF EXISTS "Allow employee uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow employee downloads" ON storage.objects;
DROP POLICY IF EXISTS "Allow customer downloads" ON storage.objects;

-- Policy for employee uploads
CREATE POLICY "Allow employee uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  -- Only allow uploads from employee email domains
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
  AND (bucket_id = 'employee-uploads')
);

-- Policy for employee downloads/access
CREATE POLICY "Allow employee downloads"
ON storage.objects FOR SELECT
TO authenticated
USING (
  -- Employees can access all documents
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
  AND (bucket_id = 'employee-uploads')
);

-- Policy for customer downloads
CREATE POLICY "Allow customer downloads"
ON storage.objects FOR SELECT
TO authenticated
USING (
  -- Customers can only access their own business documents
  bucket_id = 'employee-uploads'
  AND (
    SPLIT_PART(name, '/', 1) IN (
      SELECT id::text
      FROM businesses
      WHERE user_id = auth.uid()
    )
  )
);