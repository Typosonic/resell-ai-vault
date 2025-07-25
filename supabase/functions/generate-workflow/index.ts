
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
    const { problemDescription, businessType, complexity, context, isChat } = await req.json();
    
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');
    if (!claudeApiKey) {
      throw new Error('Claude API key not configured');
    }

    let prompt;
    
    if (isChat) {
      // Chat mode - more conversational and helpful
      prompt = `You are an AI assistant specialized in helping users with automation workflows and business processes. You are knowledgeable about n8n, Zapier, Make.com, and other automation platforms.

${context}

User's question: ${problemDescription}

Please provide a helpful, conversational response that addresses their question. If they're asking about specific automations, provide practical guidance. If they need recommendations, ask clarifying questions. Keep your response concise but informative.

Focus on being helpful and educational rather than just generating workflow JSON. If they specifically ask for a workflow, you can offer to create one, but otherwise focus on answering their question conversationally.`;
    } else {
      // Original workflow generation mode
      prompt = `Generate a complete n8n workflow JSON that solves the following business problem:

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
    }

    console.log('Making request to Claude API...');
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      }),
    });

    console.log('Claude API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error response:', errorText);
      throw new Error(`Claude API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Claude API response received successfully');
    
    const responseText = data.content[0].text;

    if (isChat) {
      // Return conversational response
      return new Response(JSON.stringify({ 
        response: responseText
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      // Try to parse as JSON workflow
      let parsedWorkflow;
      try {
        parsedWorkflow = JSON.parse(responseText);
      } catch (e) {
        console.error('JSON parsing error:', e);
        throw new Error('Generated workflow is not valid JSON');
      }

      return new Response(JSON.stringify({ 
        workflow: parsedWorkflow,
        rawJson: responseText 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in generate-workflow function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
