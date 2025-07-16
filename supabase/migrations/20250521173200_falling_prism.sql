/*
  # Add storage buckets and policies for user uploads
  
  1. Changes
    - Create buckets for business logos and profile images
    - Set file size limits and allowed mime types
    - Drop and recreate storage policies
    
  2. Security
    - Enable RLS on storage.objects
    - Allow authenticated users to upload to specific buckets
    - Allow public read access for logos and profile images
*/

-- Drop all existing policies first
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
  DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
  DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
  DROP POLICY IF EXISTS "Allow user uploads" ON storage.objects;
  DROP POLICY IF EXISTS "Allow user updates" ON storage.objects;
  DROP POLICY IF EXISTS "Public read access" ON storage.objects;
END $$;

-- Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  (
    'business-logos',
    'business-logos',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  ),
  (
    'profile-images',
    'profile-images',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  )
ON CONFLICT (id) DO UPDATE
SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated uploads
CREATE POLICY "user_upload_policy"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('business-logos', 'profile-images')
);

-- Create policy for authenticated updates
CREATE POLICY "user_update_policy"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('business-logos', 'profile-images')
  AND auth.uid() = owner
)
WITH CHECK (
  bucket_id IN ('business-logos', 'profile-images')
  AND auth.uid() = owner
);

-- Create policy for public read access
CREATE POLICY "public_read_policy"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id IN ('business-logos', 'profile-images')
);