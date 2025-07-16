/*
  # Sync existing document with business
  
  1. Changes
    - Add policy for employees to insert existing documents
    - Add policy for customers to view their documents
    - Insert document record for Kay's Creations
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow employee document creation" ON documents;
DROP POLICY IF EXISTS "Allow document access" ON storage.objects;

-- Create policy for document creation
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

-- Create policy for document access
CREATE POLICY "Allow document access"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'employee-uploads' AND
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

-- Insert document record for Kay's Creations
INSERT INTO documents (
  business_id,
  name,
  type,
  url,
  status,
  uploaded_at,
  bucket_id
)
SELECT 
  b.id,
  'Formation Documents',
  'articles',
  'https://ltovrukgaxnoccgypney.supabase.co/storage/v1/object/public/employee-uploads/Formation%20documents/Fresno%20waterpsorts%20LL.pdf',
  'completed',
  NOW(),
  'employee-uploads'
FROM businesses b
WHERE b.business_name = 'Kays Creations';