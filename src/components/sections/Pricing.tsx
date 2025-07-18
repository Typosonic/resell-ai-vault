import { Pricing as PremiumPricing } from "@/components/ui/pricing";

const plans = [
  {
    name: "Starter",
    price: "49",
    yearlyPrice: "39",
    period: "month",
    features: [
      "Access to 25+ AI automations",
      "Commercial resell license",
      "Basic support",
      "Monthly updates",
      "Standard templates"
    ],
    description: "Perfect for getting started with AI automation",
    buttonText: "Get Started",
    href: "/signup",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "99",
    yearlyPrice: "79",
    period: "month",
    features: [
      "Access to ALL 100+ automations",
      "Commercial resell license",
      "Priority support",
      "Weekly updates",
      "Premium templates",
      "Marketing materials included",
      "Early access to new releases"
    ],
    description: "Most popular choice for serious entrepreneurs",
    buttonText: "Start Free Trial",
    href: "/signup",
    isPopular: true,
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
  }
];

export function Pricing() {
  return (
    <PremiumPricing 
      plans={plans}
      title="Choose your growth plan"
      description="Start your AI automation business today. All plans include commercial licensing
and the right to resell as your own."
    />
  );
}