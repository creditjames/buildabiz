/*
  # Add documents table and status tracking

  1. New Tables
    - `documents`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references businesses)
      - `name` (text)
      - `type` (text)
      - `url` (text)
      - `status` (text)
      - `uploaded_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `documents` table
    - Add policy for authenticated users to read their own documents
*/

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  url text,
  status text NOT NULL DEFAULT 'pending',
  uploaded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses 
      WHERE user_id = auth.uid()
    )
  );

-- Add progress tracking columns to businesses table
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS progress jsonb DEFAULT '{
  "documents_uploaded": 0,
  "total_documents": 5,
  "current_step": "submitted",
  "estimated_completion": null
}'::jsonb;