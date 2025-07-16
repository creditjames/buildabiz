import { loadStripe } from '@stripe/stripe-js';

if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing Stripe publishable key');
}

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const products = {
  'propreneur': {
    priceId: 'price_1RMAf1PPLOAT0Jwpj6dyfdgn',
    name: "Pro'Preneur",
    description: 'Complete formation with advanced features and expedited filing',
    mode: 'subscription'
  }
} as const;

export type ProductId = keyof typeof products;

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription') {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      price_id: priceId,
      success_url: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}/payment/failed`,
      mode,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create checkout session');
  }

  const { sessionId, url, error } = await response.json();

  if (error) throw new Error(error);

  if (url) {
    window.location.href = url;
    return;
  }

  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to load');

  const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
  if (stripeError) throw stripeError;
}