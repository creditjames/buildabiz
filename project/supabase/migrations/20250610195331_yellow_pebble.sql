/*
  # Update employee domain access to include @buildabiz.us
  
  1. Changes
    - Update all RLS policies to include @buildabiz.us domain
    - Maintain existing @buildabiz.com and @wealthyallianceclub.com access
    - Update both storage and database policies
  
  2. Security
    - Ensure all three domains have proper employee access
    - Maintain existing security restrictions
*/

-- Function to check if user is an employee
CREATE OR REPLACE FUNCTION is_employee()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.email() LIKE '%@buildabiz.com' OR 
    auth.email() LIKE '%@buildabiz.us' OR 
    auth.email() LIKE '%@wealthyallianceclub.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update businesses table policies
DROP POLICY IF EXISTS "Employees can view all businesses" ON businesses;
DROP POLICY IF EXISTS "Employees can update any business" ON businesses;

CREATE POLICY "Employees can view all businesses"
ON businesses FOR SELECT
TO authenticated
USING (is_employee());

CREATE POLICY "Employees can update any business"
ON businesses FOR UPDATE
TO authenticated
USING (is_employee())
WITH CHECK (is_employee());

-- Update documents table policies
DROP POLICY IF EXISTS "Employees can view all documents" ON documents;
DROP POLICY IF EXISTS "Employee document management" ON documents;
DROP POLICY IF EXISTS "Employee document creation" ON documents;

CREATE POLICY "Employees can view all documents"
ON documents FOR SELECT
TO authenticated
USING (is_employee());

CREATE POLICY "Employee document management"
ON documents FOR UPDATE
TO authenticated
USING (is_employee())
WITH CHECK (is_employee());

CREATE POLICY "Employee document creation"
ON documents FOR INSERT
TO authenticated
WITH CHECK (
  is_employee()
  AND EXISTS (SELECT 1 FROM businesses WHERE id = business_id)
);

-- Update storage policies
DROP POLICY IF EXISTS "Employee upload policy" ON storage.objects;
DROP POLICY IF EXISTS "Employee update policy" ON storage.objects;
DROP POLICY IF EXISTS "Document access policy" ON storage.objects;
DROP POLICY IF EXISTS "Employees can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Employees can update files" ON storage.objects;
DROP POLICY IF EXISTS "user_upload_policy" ON storage.objects;
DROP POLICY IF EXISTS "user_update_policy" ON storage.objects;

-- Storage policies for employee uploads
CREATE POLICY "Employee upload policy"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('formation-documents', 'employee-uploads') AND
  is_employee()
);

CREATE POLICY "Employee update policy"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('formation-documents', 'employee-uploads') AND
  is_employee()
)
WITH CHECK (
  bucket_id IN ('formation-documents', 'employee-uploads') AND
  is_employee()
);

-- Storage policies for user uploads (profile images, business logos)
CREATE POLICY "User upload policy"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('business-logos', 'profile-images')
);

CREATE POLICY "User update policy"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('business-logos', 'profile-images') AND
  auth.uid() = owner
)
WITH CHECK (
  bucket_id IN ('business-logos', 'profile-images') AND
  auth.uid() = owner
);

-- Document access policy
CREATE POLICY "Document access policy"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  (
    bucket_id IN ('formation-documents', 'employee-uploads') AND
    (
      is_employee()
      OR
      EXISTS (
        SELECT 1 
        FROM documents d
        JOIN businesses b ON d.business_id = b.id
        WHERE 
          d.url LIKE '%' || storage.objects.name AND 
          b.user_id = auth.uid()
      )
    )
  )
  OR
  (
    bucket_id IN ('business-logos', 'profile-images')
  )
);