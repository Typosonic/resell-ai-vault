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
    const { workflowJson } = await req.json();

    if (!workflowJson) {
      return new Response(
        JSON.stringify({ error: 'Workflow JSON is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('Analyzing workflow...');

    // Extract workflow information
    const workflowName = workflowJson.name || 'Untitled Workflow';
    const nodes = workflowJson.nodes || [];
    const nodeTypes = nodes.map((node: any) => node.type || 'unknown');
    const nodeNames = nodes.map((node: any) => node.name || 'Unnamed');
    
    // Build context for Claude
    const workflowContext = `
Workflow Name: ${workflowName}
Number of Nodes: ${nodes.length}
Node Types: ${nodeTypes.join(', ')}
Node Names: ${nodeNames.join(', ')}
Full Workflow: ${JSON.stringify(workflowJson, null, 2)}
`;

    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');
    if (!claudeApiKey) {
      throw new Error('Claude API key not configured');
    }

    const prompt = `Analyze this n8n workflow and generate:
1. A concise, professional title (max 60 characters)
2. A clear description (max 200 characters) 
3. The most appropriate category from: Customer Service, Marketing, Sales, Analytics, Operations, E-commerce, Content Creation, Data Processing, Communication, Finance, HR
4. Difficulty level: beginner, intermediate, advanced
5. Up to 5 relevant tags

Workflow to analyze:
${workflowContext}

Respond in this exact JSON format:
{
  "title": "Generated title here",
  "description": "Generated description here", 
  "category": "Most appropriate category",
  "difficulty": "beginner|intermediate|advanced",
  "tags": ["tag1", "tag2", "tag3"]
}`;

    console.log('Making request to Claude API...');
    
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    console.log('Claude API response status:', claudeResponse.status);

    if (!claudeResponse.ok) {
      const errorData = await claudeResponse.text();
      console.error('Claude API error:', errorData);
      throw new Error(`Claude API error: ${claudeResponse.status}`);
    }

    const claudeData = await claudeResponse.json();
    console.log('Claude API response received successfully');

    const content = claudeData.content[0]?.text;
    if (!content) {
      throw new Error('No content received from Claude API');
    }

    // Parse the JSON response from Claude
    let analysisResult;
    try {
      // Extract JSON from the response (in case Claude adds extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in Claude response');
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response:', content);
      // Fallback analysis
      analysisResult = {
        title: workflowName.length > 60 ? workflowName.substring(0, 57) + '...' : workflowName,
        description: `Automated workflow with ${nodes.length} nodes for business process automation`,
        category: 'Operations',
        difficulty: 'intermediate',
        tags: ['automation', 'n8n', 'workflow']
      };
    }

    return new Response(
      JSON.stringify({ analysis: analysisResult }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-workflow function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to analyze workflow', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});