import { cn } from "@/lib/utils";
import { 
  Bot, 
  Zap, 
  DollarSign, 
  Shield, 
  Download, 
  TrendingUp, 
  Users, 
  Sparkles 
} from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Pre-Built AI Automations",
      description:
        "Access 100+ ready-to-use AI automations across marketing, sales, customer service, and operations.",
      icon: <Bot className="h-6 w-6" />,
    },
    {
      title: "White-Label Ready",
      description:
        "Rebrand and resell as your own. Complete ownership and branding rights included.",
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      title: "Proven Revenue Models",
      description:
        "Make $10,000+/month with tested pricing strategies and sales frameworks included.",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      title: "Enterprise-Grade Security",
      description: "All automations are tested, secure, and ready for enterprise deployment.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Instant Download Access",
      description: "Get immediate access to all automation files, documentation, and setup guides.",
      icon: <Download className="h-6 w-6" />,
    },
    {
      title: "Scale Your Agency Fast",
      description:
        "Launch your AI automation agency in days, not months. Everything you need included.",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: "Exclusive Community",
      description:
        "Join 500+ successful automation resellers sharing strategies and success stories.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Weekly New Releases",
      description: "Fresh automations added weekly to keep your library cutting-edge and valuable.",
      icon: <Zap className="h-6 w-6" />,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Build Your
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> AI Empire</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop building from scratch. Access our vault of proven AI automations and start selling immediately.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-border",
        (index === 0 || index === 4) && "lg:border-l border-border",
        index < 4 && "lg:border-b border-border"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-muted/50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-primary">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-muted group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};