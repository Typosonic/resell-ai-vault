import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "AI Consultant",
    company: "TechFlow Solutions",
    content: "AutomationVault.ai transformed my business overnight. I went from zero to $10k MRR in just 3 months by reselling their automations. The quality is incredible and clients love the results.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Marcus Rodriguez",
    role: "Digital Agency Owner",
    company: "Growth Lab",
    content: "The weekly updates keep us ahead of the competition. We've built our entire AI automation service around AutomationVault's library. Best investment we've made.",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Emily Watson",
    role: "Entrepreneur",
    company: "Watson Automation",
    content: "As someone with no coding background, I was skeptical. But the plug-and-play nature of these automations made it so easy. Now I'm running a six-figure automation business.",
    rating: 5,
    avatar: "EW"
  },
  {
    name: "David Kim",
    role: "Business Consultant",
    company: "AI Solutions Pro",
    content: "The commercial licensing gives me complete confidence when reselling to clients. The support team is fantastic and the community is incredibly helpful.",
    rating: 5,
    avatar: "DK"
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "Growth Hackers Inc",
    content: "We've implemented over 20 automations from the vault for our clients. The ROI is phenomenal and it's positioned us as the go-to AI automation experts in our market.",
    rating: 5,
    avatar: "LT"
  },
  {
    name: "Alex Chen",
    role: "Freelancer",
    company: "Independent",
    content: "Started as a side hustle, now it's my main income. The automations are so well-documented and professional that clients think I built them from scratch.",
    rating: 5,
    avatar: "AC"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Trusted by <span className="text-gradient">successful</span> entrepreneurs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of entrepreneurs who have built profitable AI automation businesses 
            using our comprehensive library.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 text-yellow-400 fill-current" 
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gradient mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient mb-2">1,000+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient mb-2">$50M+</div>
            <div className="text-sm text-muted-foreground">Revenue Generated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}