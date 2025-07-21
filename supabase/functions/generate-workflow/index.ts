
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { problemDescription, businessType, complexity } = await req.json();
    
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');
    if (!claudeApiKey) {
      throw new Error('Claude API key not configured');
    }

    const prompt = `Generate a complete n8n workflow JSON that solves the following business problem:

Problem: ${problemDescription}
Business Type: ${businessType}
Complexity Level: ${complexity}

Requirements:
1. Create a practical, working n8n workflow that addresses this specific problem
2. Include all necessary nodes, connections, and configurations
3. Use realistic node types that exist in n8n (HTTP Request, Set, IF, Code, Email, etc.)
4. Include proper error handling and data validation
5. Add helpful descriptions and comments
6. Make it production-ready with proper credentials handling
7. Structure it as a complete n8n workflow JSON that can be imported directly

The workflow should be comprehensive and include:
- Trigger nodes (webhook, schedule, manual, etc.)
- Processing nodes (data transformation, conditionals, loops)
- Action nodes (API calls, database operations, notifications)
- Error handling and logging

Return ONLY the n8n workflow JSON, no additional text or explanations.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const workflowJson = data.content[0].text;

    // Try to parse the JSON to validate it
    let parsedWorkflow;
    try {
      parsedWorkflow = JSON.parse(workflowJson);
    } catch (e) {
      throw new Error('Generated workflow is not valid JSON');
    }

    return new Response(JSON.stringify({ 
      workflow: parsedWorkflow,
      rawJson: workflowJson 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating workflow:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
