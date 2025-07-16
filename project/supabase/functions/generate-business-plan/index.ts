import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { section, businessData, prompt } = await req.json();
    
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify the user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Invalid user token');
    }

    // Get OpenAI API key from environment variable
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create a comprehensive business plan prompt
    const systemPrompt = `You are a professional business plan writer with expertise in creating comprehensive, investor-ready business plans. Write in a professional, clear, and compelling manner. Format the response with clear sections and headings using markdown formatting.

Create a detailed business plan that includes:
1. Executive Summary
2. Company Description
3. Market Analysis
4. Organization & Management
5. Service or Product Line
6. Marketing & Sales Strategy
7. Funding Request
8. Financial Projections
9. Implementation Timeline
10. Risk Analysis

Make each section detailed and specific to the company information provided. Use professional business language and include realistic projections and strategies.`;

    const userPrompt = `Create a comprehensive business plan for ${businessData.companyName || 'the business'}.

Company Details:
- Company Name: ${businessData.companyName || 'Not specified'}
- Industry: ${businessData.industry || 'Not specified'}
- Location: ${businessData.location || 'Not specified'}
- Target Market: ${businessData.targetMarket || 'Not specified'}
- Business Model: ${businessData.businessModel || 'Not specified'}
- Funding Goal: ${businessData.fundingGoal || 'Not specified'}
- Key Products/Services: ${businessData.keyProducts || 'Not specified'}
- Competitive Advantage: ${businessData.competitiveAdvantage || 'Not specified'}
- Founder Background: ${businessData.founderBackground || 'Not specified'}

Please create a detailed, professional business plan with all sections mentioned above. Make it comprehensive and investor-ready.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content || '';

    if (!generatedContent) {
      throw new Error('No content generated from OpenAI');
    }

    return new Response(
      JSON.stringify({ content: generatedContent }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error: any) {
    console.error('Error generating business plan content:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});