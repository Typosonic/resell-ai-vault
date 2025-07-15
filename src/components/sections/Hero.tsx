import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle, Lock } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      ></div>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 gradient-premium opacity-30"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl float-animation"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-accent/20 blur-3xl float-animation" style={{ animationDelay: "-3s" }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <CheckCircle className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">100+ Ready-to-Deploy AI Automations</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Launch your <span className="text-gradient">AI agency</span><br />
            <span className="text-gold-gradient">overnight</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Access 100+ AI automations you can resell as your own. No coding, no setup time. 
            Just download, rebrand, and start earning from day one.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/library">
              <Button 
                size="lg" 
                className="gradient-gold text-gold-foreground hover:opacity-90 px-8 py-4 text-lg font-semibold gold-glow"
              >
                Browse Library
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold border-primary/30 hover:bg-primary/10"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm text-muted-foreground">Trusted by 1,000+ AI entrepreneurs</p>
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Weekly Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Commercial License</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">White-Label Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Preview Card 1 */}
            <div className="relative group">
              <div className="absolute inset-0 gradient-primary rounded-xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">AI Customer Support Bot</h3>
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Automated customer support with GPT-4 integration
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">24/7 Support</span>
                  <span className="text-xs font-medium text-primary">Preview Only</span>
                </div>
              </div>
            </div>

            {/* Preview Card 2 */}
            <div className="relative group">
              <div className="absolute inset-0 gradient-primary rounded-xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Social Media Scheduler</h3>
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  AI-powered content creation and scheduling
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Multi-Platform</span>
                  <span className="text-xs font-medium text-primary">Preview Only</span>
                </div>
              </div>
            </div>

            {/* Preview Card 3 */}
            <div className="relative group">
              <div className="absolute inset-0 gradient-primary rounded-xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Lead Generation System</h3>
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Automated lead capture and nurturing workflows
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">CRM Integration</span>
                  <span className="text-xs font-medium text-primary">Preview Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}