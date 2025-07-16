-- Create function to update progress based on status
CREATE OR REPLACE FUNCTION update_business_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_docs INTEGER := 5;
  docs_uploaded INTEGER;
  estimated_days INTEGER;
  completion_date TIMESTAMP WITH TIME ZONE;
  progress_percent INTEGER;
BEGIN
  -- Get current uploaded documents count
  SELECT COUNT(*) INTO docs_uploaded
  FROM documents
  WHERE business_id = NEW.id AND status = 'completed';

  -- Calculate progress percentage based on status
  progress_percent := CASE NEW.status
    WHEN 'pending' THEN 0
    WHEN 'processing' THEN 25
    WHEN 'review' THEN 50
    WHEN 'filed' THEN 75
    WHEN 'completed' THEN 100
    ELSE 0
  END;

  -- Set estimated days based on status
  estimated_days := CASE NEW.status
    WHEN 'pending' THEN 14
    WHEN 'processing' THEN 10
    WHEN 'review' THEN 5
    WHEN 'filed' THEN 3
    WHEN 'completed' THEN 0
    ELSE 14
  END;

  -- Calculate estimated completion date
  completion_date := CASE
    WHEN NEW.status = 'completed' THEN NOW()
    ELSE NOW() + (estimated_days || ' days')::INTERVAL
  END;

  -- Update the progress tracking with more detailed information
  NEW.progress = jsonb_build_object(
    'current_step', NEW.status,
    'total_documents', total_docs,
    'documents_uploaded', docs_uploaded,
    'estimated_completion', completion_date,
    'progress_percent', progress_percent,
    'last_updated', NOW(),
    'status_history', COALESCE(
      OLD.progress->'status_history',
      '[]'::jsonb
    ) || jsonb_build_object(
      'status', NEW.status,
      'timestamp', NOW(),
      'previous_status', OLD.status
    )
  );
  
  -- Ensure updated_at is always set
  NEW.updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_business_progress_trigger ON businesses;

-- Create new trigger that fires on status update
CREATE TRIGGER update_business_progress_trigger
  BEFORE UPDATE OF status
  ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_business_progress();

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_updated_at ON businesses(updated_at);