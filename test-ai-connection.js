// Test script to verify AI integration
console.log('Testing AI Business Plan Generation...');

// This would be called from the frontend
const testAIGeneration = async () => {
  try {
    const response = await fetch('YOUR_SUPABASE_URL/functions/v1/generate-business-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN',
      },
      body: JSON.stringify({
        section: 'executiveSummary',
        businessData: {
          business_name: 'Test Company',
          entity_type: 'LLC',
          state: 'CA',
          business_purpose: 'Technology consulting services'
        },
        existingContent: ''
      }),
    });

    const result = await response.json();
    console.log('AI Generated Content:', result.content);
  } catch (error) {
    console.error('Error:', error);
  }
};