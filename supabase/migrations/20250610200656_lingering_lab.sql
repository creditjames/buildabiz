/*
  # Fix business_applications foreign key reference
  
  1. Changes
    - Update business_applications table to reference auth.users instead of profiles
    - This ensures the foreign key constraint works properly
*/

-- Drop the existing foreign key constraint
ALTER TABLE business_applications 
DROP CONSTRAINT IF EXISTS business_applications_user_id_fkey;

-- Add the correct foreign key constraint
ALTER TABLE business_applications 
ADD CONSTRAINT business_applications_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update businesses table to also reference auth.users for consistency
ALTER TABLE businesses 
DROP CONSTRAINT IF EXISTS businesses_user_id_fkey;

ALTER TABLE businesses 
ADD CONSTRAINT businesses_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;