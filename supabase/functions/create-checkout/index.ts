import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';
import Stripe from 'npm:stripe@14.14.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessId, packageType, state } = await req.json();

    // Get business details from Supabase
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', businessId)
      .single();

    if (businessError) throw businessError;

    // Calculate price based on package and state
    const getPackagePrice = (pkg: string) => {
      switch (pkg) {
        case 'basic': return 0;
        case 'standard': return 19900; // $199.00
        case 'premium': return 29900; // $299.00
        default: return 0;
      }
    };

    const getStateFee = (state: string) => {
      const fees: { [key: string]: number } = {
        'CA': 7000, // $70.00
        'NY': 20000, // $200.00
        'TX': 30000, // $300.00
        'FL': 12500, // $125.00
        'IL': 15000, // $150.00
      };
      return fees[state] || 0;
    };

    const packagePrice = getPackagePrice(packageType);
    const stateFee = getStateFee(state);
    const totalAmount = packagePrice + stateFee;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package - ${state} Formation`,
              description: `Business formation package including state filing fees for ${state}`,
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/formation`,
      metadata: {
        businessId,
        packageType,
        state,
      },
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});