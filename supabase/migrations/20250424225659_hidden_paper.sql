/*
  # Update employee permissions to include wealthyallianceclub.com

  1. Changes
    - Update storage policies to allow wealthyallianceclub.com emails
    - Update document policies to allow wealthyallianceclub.com emails
    
  2. Security
    - Maintain RLS policies
    - Add new email domain to existing policies
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