/*
  # Add payment status trigger
  
  1. Changes
    - Add trigger to update business status on payment completion
    - Ensure proper status flow
    
  2. Security
    - Maintain existing RLS policies
*/

-- Create function to update business status on payment
CREATE OR REPLACE FUNCTION update_business_on_payment()
RETURNS TRIGGER AS $$
BEGIN
  -- Update business status when payment is completed
  IF NEW.status = 'completed' AND NEW.payment_status = 'paid' THEN
    UPDATE businesses
    SET status = 'processing'
    WHERE id = (
      SELECT b.id 
      FROM businesses b
      JOIN stripe_customers c ON b.user_id = c.user_id
      WHERE c.customer_id = NEW.customer_id
      AND b.status = 'pending'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS update_business_on_payment_trigger ON stripe_orders;
CREATE TRIGGER update_business_on_payment_trigger
  AFTER UPDATE OF status, payment_status
  ON stripe_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_business_on_payment();