import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 49,
    description: "Perfect for getting started with AI automation",
    icon: Zap,
    popular: false,
    features: [
      "Access to 25+ AI automations",
      "Commercial resell license",
      "Basic support",
      "Monthly updates",
      "Standard templates"
    ]
  },
  {
    name: "Pro",
    price: 99,
    description: "Most popular choice for serious entrepreneurs",
    icon: Star,
    popular: true,
    features: [
      "Access to ALL 100+ automations",
      "Commercial resell license",
      "Priority support",
      "Weekly updates",
      "Premium templates",
      "Marketing materials included",
      "Early access to new releases"
    ]
  },
  {
    name: "Agency+",
    price: 199,
    description: "For agencies and teams scaling fast",
    icon: Crown,
    popular: false,
    features: [
      "Everything in Pro",
      "White-label dashboard",
      "Multi-user access (5 seats)",
      "Custom branding options",
      "Dedicated account manager",
      "1-on-1 strategy calls",
      "Revenue share opportunities"
    ]
  }
];

export function Pricing() {
  return (
    <section className="py-20 lg:py-32" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose your <span className="text-gradient">growth plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start your AI automation business today. All plans include commercial licensing 
            and the right to resell as your own.
          </p>
          
          {/* Money back guarantee badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20">
            <Check className="w-4 h-4 text-success mr-2" />
            <span className="text-sm font-medium text-success">30-day money-back guarantee</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary bg-card scale-105 shadow-2xl' 
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="gradient-gold px-4 py-2 rounded-full text-gold-foreground text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan icon and name */}
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg ${plan.popular ? 'gradient-primary' : 'bg-secondary'} mr-4`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-foreground'}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Billed monthly, cancel anytime
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link to="/signup" className="block">
                <Button 
                  className={`w-full py-3 ${
                    plan.popular 
                      ? 'gradient-gold text-gold-foreground hover:opacity-90 gold-glow' 
                      : 'border-primary/30 hover:bg-primary/10'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.popular ? 'Start Free Trial' : 'Get Started'}
                </Button>
              </Link>

              {plan.popular && (
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Start your 7-day free trial today
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">
            Need a custom solution for your enterprise? 
            <Link to="/contact" className="text-primary hover:underline ml-1">
              Contact our team
            </Link>
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span>SSL secured</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span>GDPR compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}