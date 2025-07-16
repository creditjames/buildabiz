/*
  # Fix admin access for @buildabiz.us domain
  
  1. Changes
    - Ensure is_employee() function includes @buildabiz.us domain
    - Update all RLS policies to use the is_employee() function consistently
    - Add debugging to verify email domain matching
  
  2. Security
    - Maintain existing security while adding new domain
    - Ensure all admin functions work for @buildabiz.us users
*/

-- Recreate the is_employee function to ensure it includes all domains
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

-- Drop and recreate all business policies to ensure they use the updated function
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

-- Drop and recreate all document policies
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

-- Drop and recreate storage policies
DROP POLICY IF EXISTS "Employee upload policy" ON storage.objects;
DROP POLICY IF EXISTS "Employee update policy" ON storage.objects;
DROP POLICY IF EXISTS "Document access policy" ON storage.objects;

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

-- Add a test function to verify employee status (for debugging)
CREATE OR REPLACE FUNCTION test_employee_status()
RETURNS TABLE(email text, is_emp boolean) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    auth.email() as email,
    is_employee() as is_emp;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;