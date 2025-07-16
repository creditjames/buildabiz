/*
  # Add progress sync triggers and functions

  1. Changes
    - Add trigger to update progress tracking
    - Add trigger to update timestamps
    - Ensure proper notification of changes
    
  2. Security
    - Maintain existing RLS policies
    - Only allow authorized updates
*/

-- Create function to update progress
CREATE OR REPLACE FUNCTION update_business_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the progress tracking
  NEW.progress = jsonb_set(
    COALESCE(OLD.progress, '{}'::jsonb),
    '{current_step}',
    to_jsonb(NEW.status)
  );
  
  -- Update the timestamp
  NEW.updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS update_business_progress_trigger ON businesses;
CREATE TRIGGER update_business_progress_trigger
  BEFORE UPDATE OF status
  ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_business_progress();