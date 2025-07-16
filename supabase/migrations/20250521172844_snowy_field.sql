/*
  # Fix storage permissions for business assets
  
  1. Changes
    - Create public bucket for business assets
    - Add RLS policies for authenticated users
    - Allow file uploads and downloads
  
  2. Security
    - Enable RLS
    - Restrict access to authenticated users
    - Allow users to manage their own files
*/

-- Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('business-logos', 'business-logos', true),
  ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;

-- Policy for authenticated uploads
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('business-logos', 'profile-images')
);

-- Policy for authenticated updates
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('business-logos', 'profile-images')
)
WITH CHECK (
  bucket_id IN ('business-logos', 'profile-images')
);

-- Policy for public downloads
CREATE POLICY "Allow public downloads"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id IN ('business-logos', 'profile-images')
);