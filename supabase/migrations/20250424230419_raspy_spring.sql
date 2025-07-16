/*
  # Update employee access policies

  1. Changes
    - Update storage upload policy for employees
    - Update storage update policy for employees
    - Update documents insert policy for employees
    - Update documents update policy for employees

  2. Security
    - Allow access for both @buildabiz.com and @wealthyallianceclub.com emails
    - Maintain RLS security
*/

DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Employees can upload documents" ON storage.objects;
  DROP POLICY IF EXISTS "Employees can update documents" ON storage.objects;
  DROP POLICY IF EXISTS "Employees can insert documents" ON documents;
  DROP POLICY IF EXISTS "Employees can update documents" ON documents;

  -- Create new policies
  CREATE POLICY "Employees can upload documents"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'employee-uploads' AND
      (auth.uid() IN (
        SELECT id FROM auth.users 
        WHERE email LIKE '%@buildabiz.com' 
        OR email LIKE '%@wealthyallianceclub.com'
      ))
    );

  CREATE POLICY "Employees can update documents"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'employee-uploads' AND
      (auth.uid() IN (
        SELECT id FROM auth.users 
        WHERE email LIKE '%@buildabiz.com'
        OR email LIKE '%@wealthyallianceclub.com'
      ))
    )
    WITH CHECK (
      bucket_id = 'employee-uploads' AND
      (auth.uid() IN (
        SELECT id FROM auth.users 
        WHERE email LIKE '%@buildabiz.com'
        OR email LIKE '%@wealthyallianceclub.com'
      ))
    );

  CREATE POLICY "Employees can insert documents"
    ON documents FOR INSERT
    TO authenticated
    WITH CHECK (
      auth.uid() IN (
        SELECT id FROM auth.users 
        WHERE email LIKE '%@buildabiz.com'
        OR email LIKE '%@wealthyallianceclub.com'
      )
    );

  CREATE POLICY "Employees can update documents"
    ON documents FOR UPDATE
    TO authenticated
    USING (
      auth.uid() IN (
        SELECT id FROM auth.users 
        WHERE email LIKE '%@buildabiz.com'
        OR email LIKE '%@wealthyallianceclub.com'
      )
    )
    WITH CHECK (
      auth.uid() IN (
        SELECT id FROM auth.users 
        WHERE email LIKE '%@buildabiz.com'
        OR email LIKE '%@wealthyallianceclub.com'
      )
    );
END $$;