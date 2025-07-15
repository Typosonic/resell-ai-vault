import { 
  Download, 
  Shield, 
  RefreshCw, 
  DollarSign, 
  Users, 
  Zap,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: Download,
    title: "Instant Access",
    description: "Download ready-to-deploy automations in seconds. No waiting, no setup required."
  },
  {
    icon: Shield,
    title: "Commercial License",
    description: "Full resell rights included. White-label and brand as your own with complete legal protection."
  },
  {
    icon: RefreshCw,
    title: "Weekly Updates",
    description: "Fresh automations added every week. Stay ahead with the latest AI technology trends."
  },
  {
    icon: DollarSign,
    title: "Proven ROI",
    description: "Each automation is market-tested and proven to generate revenue for our members."
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Join our community of successful AI entrepreneurs with dedicated support channels."
  },
  {
    icon: Zap,
    title: "Zero Coding",
    description: "All automations are plug-and-play. No technical skills required to get started."
  }
];

const stats = [
  { number: "100+", label: "AI Automations" },
  { number: "1,000+", label: "Active Members" },
  { number: "52", label: "Updates Per Year" },
  { number: "24/7", label: "Support Available" }
];

export function Features() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything you need to <span className="text-gradient">succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've built the ultimate platform for AI entrepreneurs who want to scale fast 
            without the technical complexity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-8 rounded-2xl border border-border bg-card hover:bg-card/80 transition-all duration-300"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-success/10 border border-success/20 mb-6">
            <TrendingUp className="w-5 h-5 text-success mr-2" />
            <span className="text-success font-medium">Join 1,000+ successful AI entrepreneurs</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success mr-2" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success mr-2" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success mr-2" />
              <span>Lifetime updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}