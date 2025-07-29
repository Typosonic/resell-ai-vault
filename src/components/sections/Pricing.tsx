import { Pricing as PremiumPricing } from "@/components/ui/pricing";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Starter",
    price: "30",
    yearlyPrice: "24",
    period: "month",
    features: [
      "Access to 25+ AI automations",
      "Commercial resell license",
      "Agent Builder access",
      "Basic support",
      "Monthly updates",
      "Standard templates"
    ],
    description: "Perfect for getting started with AI automation",
    buttonText: "Get Started",
    href: "/auth",
    isPopular: false,
    planId: "starter",
  },
  {
    name: "Pro",
    price: "50",
    yearlyPrice: "40",
    period: "month",
    features: [
      "Access to ALL 100+ automations",
      "Commercial resell license",
      "Agent Builder access",
      "Priority support",
      "Weekly updates",
      "Premium templates",
      "Marketing materials included",
      "Early access to new releases"
    ],
    description: "Most popular choice for serious entrepreneurs",
    buttonText: "Start Free Trial",
    href: "/auth",
    isPopular: true,
    planId: "pro",
  },
  {
    name: "Agency+",
    price: "199",
    yearlyPrice: "159",
    period: "month",
    features: [
      "Everything in Pro",
      "White-label dashboard",
      "Multi-user access (5 seats)",
      "Custom branding options",
      "Dedicated account manager",
      "1-on-1 strategy calls",
      "Revenue share opportunities"
    ],
    description: "For agencies and teams scaling fast",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
    planId: "agency",
  }
];

export function Pricing() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePlanClick = async (plan: any) => {
    if (plan.planId === "agency") {
      // For agency plan, just redirect to contact
      window.location.href = "/contact";
      return;
    }

    // For all users (authenticated and unauthenticated), create Stripe checkout
    try {
      console.log('Calling create-checkout with:', { plan: plan.planId, userEmail: user?.email || null });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          plan: plan.planId,
          userEmail: user?.email || null
        }
      });

      console.log('Response from create-checkout:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Unknown error occurred');
      }

      if (data?.url) {
        console.log('Opening checkout URL:', data.url);
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <PremiumPricing 
      plans={plans}
      title="Choose your growth plan"
      description="Start your AI automation business today. All plans include commercial licensing and the right to resell as your own."
      onPlanClick={handlePlanClick}
    />
  );
}