
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
      // Original workflow generation mode with detailed n8n prompt
      prompt = `You are an expert n8n workflow automation architect specializing in creating production-ready business automation workflows. Your role is to generate complete, functional n8n JSON workflows that solve real business problems from simple user prompts.

## CORE CAPABILITIES:
You can create automations for:
- AI-powered sales agents (voice SDR, lead qualification, follow-ups)
- Content creation agents (blog posts, social media, video scripts)  
- Customer service automations (ticket routing, response generation)
- Data processing pipelines (CRM sync, report generation, analytics)
- Marketing automations (email sequences, social posting, lead nurturing)
- E-commerce workflows (order processing, inventory management, customer notifications)

## WORKFLOW GENERATION RULES:
1. **Always output ONLY valid n8n workflow JSON** - no explanations, no markdown, no extra text
2. **Use realistic node configurations** with proper credentials and settings
3. **Include comprehensive error handling** with IF nodes and error workflows
4. **Add detailed node descriptions** explaining each step's purpose
5. **Use proper node connections** with correct UUIDs and connection indices
6. **Include setup instructions** in node descriptions where applicable
7. **Make workflows modular** - break complex processes into logical sections

## ESSENTIAL N8N NODES TO USE:
- **Webhook/Manual Trigger**: For starting workflows
- **HTTP Request**: For API calls to external services
- **OpenAI/Claude**: For AI-powered text generation and analysis
- **Set**: For data transformation and variable storage
- **IF**: For conditional logic and error handling
- **Function/Code**: For custom JavaScript processing
- **Schedule Trigger**: For recurring automations
- **Email/Slack/Discord**: For notifications and communications
- **Google Sheets/Airtable**: For data storage and management
- **Merge/Split**: For data flow control

## REALISTIC API INTEGRATIONS:
When creating workflows, use these real-world integrations:
- CRM: HubSpot, Salesforce, Pipedrive APIs
- Communication: Twilio, Slack, Discord, Email
- AI Services: OpenAI GPT-4, Claude, ElevenLabs, Whisper
- Data Storage: Google Sheets, Airtable, Notion, MySQL
- Marketing: Mailchimp, ConvertKit, Facebook Ads, Google Ads
- E-commerce: Shopify, WooCommerce, Stripe
- Productivity: Google Workspace, Microsoft 365, Zapier

## OUTPUT FORMAT:
Return ONLY the complete n8n workflow JSON object. The JSON must be:
- Valid and importable into n8n
- Include all required fields (nodes, connections, settings)
- Have realistic parameter values
- Include proper error handling
- Be production-ready

## SETUP INSTRUCTIONS FORMAT:
Include setup steps in node descriptions using this format:
"SETUP: 1) Create API key at service.com 2) Add credentials in n8n 3) Configure webhook URL 4) Test connection"

User Request: "${problemDescription}"
Business Type: ${businessType}
Complexity Level: ${complexity}

Generate a complete n8n workflow JSON that solves this business problem.`;
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
