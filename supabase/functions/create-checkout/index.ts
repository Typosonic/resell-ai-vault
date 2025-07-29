import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log(`[CREATE-CHECKOUT] Method: ${req.method}, URL: ${req.url}`);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[CREATE-CHECKOUT] Function started");

    // Check if Stripe key is available
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("[CREATE-CHECKOUT] STRIPE_SECRET_KEY not found");
      return new Response(JSON.stringify({ error: "Stripe configuration missing" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    console.log(`[CREATE-CHECKOUT] Stripe key found (length: ${stripeKey.length})`);

    // Parse request body
    let requestData;
    try {
      const body = await req.text();
      console.log(`[CREATE-CHECKOUT] Raw body: ${body}`);
      requestData = JSON.parse(body);
      console.log(`[CREATE-CHECKOUT] Parsed data:`, requestData);
    } catch (parseError) {
      console.error(`[CREATE-CHECKOUT] Parse error:`, parseError);
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { plan, userEmail } = requestData;
    console.log(`[CREATE-CHECKOUT] Plan: ${plan}, Email: ${userEmail}`);

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { 
      apiVersion: "2023-10-16" 
    });
    console.log("[CREATE-CHECKOUT] Stripe initialized");

    // Define price ID based on plan
    let priceId = "price_1RopG3CtaXu4fZnITLJyh3bU"; // $30 starter plan
    if (plan === "pro") {
      priceId = "price_1RopHYCtaXu4fZnIXXwuvMBw"; // $50 pro plan
    }
    console.log(`[CREATE-CHECKOUT] Using price ID: ${priceId}`);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      customer_creation: "always",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      metadata: {
        plan: plan,
      }
    });

    console.log(`[CREATE-CHECKOUT] Session created: ${session.id}`);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("[CREATE-CHECKOUT] Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});