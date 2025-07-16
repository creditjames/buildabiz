/*
  # Document sync and access policies
  
  1. Changes
    - Add policies for document access and creation
    - Add policy for storage object access
    - Add trigger to update business progress on document changes
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow employee document creation" ON documents;
DROP POLICY IF EXISTS "Allow document access" ON storage.objects;
DROP POLICY IF EXISTS "Allow employee uploads" ON storage.objects;

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

-- Create policy for employee uploads
CREATE POLICY "Allow employee uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'employee-uploads' AND
  (auth.email() LIKE '%@buildabiz.com' OR auth.email() LIKE '%@wealthyallianceclub.com')
);

-- Create function to update business progress when documents change
CREATE OR REPLACE FUNCTION update_business_progress_on_document()
RETURNS TRIGGER AS $$
DECLARE
  total_docs INTEGER := 5;
  docs_uploaded INTEGER;
  progress_percent INTEGER;
BEGIN
  -- Get current uploaded documents count
  SELECT COUNT(*) INTO docs_uploaded
  FROM documents
  WHERE business_id = NEW.business_id AND status = 'completed';

  -- Calculate progress percentage
  progress_percent := LEAST((docs_uploaded * 20), 100); -- Each document is worth 20%

  -- Update the business progress
  UPDATE businesses
  SET progress = jsonb_set(
    COALESCE(progress, '{}'::jsonb),
    '{documents_uploaded}',
    to_jsonb(docs_uploaded)
  )
  WHERE id = NEW.business_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for document changes
DROP TRIGGER IF EXISTS update_business_progress_on_document_trigger ON documents;
CREATE TRIGGER update_business_progress_on_document_trigger
  AFTER INSERT OR UPDATE
  ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_business_progress_on_document();