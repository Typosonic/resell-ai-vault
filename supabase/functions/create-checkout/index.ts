import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  logStep("Request received", { method: req.method, url: req.url });
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Check if Stripe key is available
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: STRIPE_SECRET_KEY not found");
      return new Response(JSON.stringify({ error: "Stripe configuration missing" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    logStep("Stripe key found", { keyLength: stripeKey.length });

    // Parse request body with better error handling
    let requestData;
    const contentType = req.headers.get("content-type");
    logStep("Content type", { contentType });

    if (req.method === "POST") {
      try {
        const rawBody = await req.text();
        logStep("Raw body received", { body: rawBody, length: rawBody.length });
        
        if (!rawBody || rawBody.trim() === "") {
          throw new Error("Empty request body");
        }
        
        requestData = JSON.parse(rawBody);
        logStep("Request data parsed successfully", requestData);
      } catch (parseError) {
        logStep("ERROR: Failed to parse request body", { 
          error: parseError.message,
          contentType: req.headers.get("content-type")
        });
        return new Response(JSON.stringify({ error: "Invalid or empty request body" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
    } else {
      logStep("ERROR: Invalid HTTP method", { method: req.method });
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 405,
      });
    }

    const { plan, userEmail } = requestData;
    logStep("Request data received", { plan, userEmail });

    let user = null;
    let customerEmail = userEmail;

    // Try to get authenticated user if token exists
    const authHeader = req.headers.get("Authorization");
    if (authHeader && userEmail) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data } = await supabaseClient.auth.getUser(token);
        user = data.user;
        if (user?.email) {
          customerEmail = user.email;
          logStep("User authenticated", { userId: user.id, email: user.email });
        }
      } catch (error) {
        logStep("Auth check failed, proceeding as guest", { error: error.message });
      }
    } else {
      logStep("No auth header or userEmail, proceeding as guest checkout");
      // For guest checkout, we'll collect email in Stripe
      customerEmail = null;
    }

    logStep("Initializing Stripe client");
    const stripe = new Stripe(stripeKey, { 
      apiVersion: "2023-10-16" 
    });

    let customerId;
    if (customerEmail) {
      logStep("Looking for existing customer", { customerEmail });
      try {
        const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
          logStep("Found existing customer", { customerId });
        } else {
          logStep("No existing customer found");
        }
      } catch (error) {
        logStep("Error checking customer", { error: error.message });
        // Continue without customer ID - Stripe will create new customer
      }
    }

    // Define price ID based on plan
    let priceId = "price_1RopG3CtaXu4fZnITLJyh3bU"; // $30 starter plan
    let planName = "Starter";
    
    if (plan === "pro") {
      priceId = "price_1RopHYCtaXu4fZnIXXwuvMBw"; // $50 pro plan
      planName = "Pro";
    }

    logStep("Creating checkout session", { 
      planName, 
      priceId, 
      customerId: customerId || "new customer",
      customerEmail: customerEmail || "collect in stripe"
    });

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      customer_creation: customerId ? undefined : "always",
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
        userId: user?.id || "guest",
      }
    });

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    logStep("ERROR", { message: errorMessage, stack: errorStack });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});