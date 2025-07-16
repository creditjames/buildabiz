import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const BASE_URL = 'https://calico.sos.ca.gov/cbc/v1/api';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface BusinessSearchResult {
  entityNumber: string;
  entityName: string;
  entityStatus: string;
  entityType: string;
  jurisdiction: string;
  registrationDate: string;
}

interface BusinessSearchResponse {
  results: BusinessSearchResult[];
  totalResults: number;
}

// Circuit breaker state
const circuitBreaker = {
  failures: 0,
  lastFailure: 0,
  isOpen: false,
};

// Reset circuit breaker after 5 minutes
const CIRCUIT_BREAKER_TIMEOUT = 5 * 60 * 1000;
const MAX_FAILURES = 3;

async function fetchWithRetry(url: string, retries = 3, backoff = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      // Check circuit breaker
      if (circuitBreaker.isOpen) {
        const timeSinceLastFailure = Date.now() - circuitBreaker.lastFailure;
        if (timeSinceLastFailure < CIRCUIT_BREAKER_TIMEOUT) {
          throw new Error('Circuit breaker is open - API is temporarily unavailable');
        }
        // Reset circuit breaker after timeout
        circuitBreaker.isOpen = false;
        circuitBreaker.failures = 0;
      }

      const response = await fetch(url);
      
      if (response.ok) {
        // Reset circuit breaker on success
        circuitBreaker.failures = 0;
        circuitBreaker.isOpen = false;
        return response;
      }
      
      throw new Error(`API request failed: ${response.statusText}`);
    } catch (error) {
      // Update circuit breaker state
      circuitBreaker.failures++;
      circuitBreaker.lastFailure = Date.now();
      
      if (circuitBreaker.failures >= MAX_FAILURES) {
        circuitBreaker.isOpen = true;
        throw new Error('California Secretary of State API is temporarily unavailable. Please try again in a few minutes.');
      }

      if (i === retries - 1) throw error;
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, backoff * Math.pow(2, i)));
    }
  }
  
  throw new Error('Maximum retries reached');
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const searchTerm = url.searchParams.get('search-term');
    const entityNumber = url.searchParams.get('entity-number');

    if (!searchTerm && !entityNumber) {
      return new Response(
        JSON.stringify({ error: 'Either search-term or entity-number is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    let apiUrl: string;
    if (searchTerm) {
      apiUrl = `${BASE_URL}/BusinessEntityKeywordSearch?search-term=${encodeURIComponent(searchTerm)}`;
    } else {
      apiUrl = `${BASE_URL}/BusinessEntityDetails/${encodeURIComponent(entityNumber!)}`;
    }

    // Check API status with retry mechanism
    await fetchWithRetry(`${BASE_URL}/serverstatus`);

    // Make the actual API request with retry mechanism
    const response = await fetchWithRetry(apiUrl);
    const data = await response.json();

    // Transform the response to match our interface
    let transformedData: BusinessSearchResponse;
    if (searchTerm) {
      transformedData = {
        results: data.results.map((result: any) => ({
          entityNumber: result.entityNumber || '',
          entityName: result.entityName || '',
          entityStatus: result.entityStatus || '',
          entityType: result.entityType || '',
          jurisdiction: result.jurisdiction || '',
          registrationDate: result.registrationDate || '',
        })),
        totalResults: data.totalResults || 0,
      };
    } else {
      transformedData = {
        results: [{
          entityNumber: data.entityNumber || '',
          entityName: data.entityName || '',
          entityStatus: data.entityStatus || '',
          entityType: data.entityType || '',
          jurisdiction: data.jurisdiction || '',
          registrationDate: data.registrationDate || '',
        }],
        totalResults: 1,
      };
    }

    return new Response(
      JSON.stringify(transformedData),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Error in business search:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    const isTemporary = errorMessage.includes('temporarily unavailable');
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        status: 'error',
        isTemporary: isTemporary
      }),
      {
        status: isTemporary ? 503 : 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});