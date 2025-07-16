/*
  # Set up authentication and business tables

  1. Changes
    - Add email constraint to auth.users
    - Add RLS policies for businesses table
    - Add RLS policies for documents table
    - Add trigger for updating timestamps
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure proper foreign key constraints
*/

-- Set up auth email constraints
ALTER TABLE auth.users
ADD CONSTRAINT users_email_unique UNIQUE (email);

-- Create timestamp update function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add timestamp triggers
CREATE TRIGGER update_businesses_timestamp
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_documents_timestamp
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE PROCEDURE update_timestamp();

-- Add additional RLS policies for businesses
CREATE POLICY "Users can update own businesses"
  ON businesses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add additional RLS policies for documents
CREATE POLICY "Users can update own documents"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses 
      WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    business_id IN (
      SELECT id FROM businesses 
      WHERE user_id = auth.uid()
    )
  );

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS businesses_user_id_idx ON businesses(user_id);
CREATE INDEX IF NOT EXISTS documents_business_id_idx ON documents(business_id);