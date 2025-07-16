/*
  # Add business plan column to businesses table

  1. Changes
    - Add business_plan column to store business plan data as JSONB
    - This will store the complete business plan sections

  2. Security
    - Maintains existing RLS policies
    - No additional security changes needed
*/

-- Add business_plan column to businesses table
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS business_plan jsonb DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN businesses.business_plan IS 'Stores business plan data including all sections like executive summary, market analysis, etc.';