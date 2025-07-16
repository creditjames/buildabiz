/*
  # Create public storage bucket
  
  1. New Storage Bucket
    - Creates a new public bucket called 'public'
    - Enables public access to files
  
  2. Security
    - Enables RLS on the storage.objects table
    - Adds policy for public read access
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true);

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'public');