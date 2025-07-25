import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WorkflowUpload from "@/components/WorkflowUpload";
import { 
  Search, 
  Filter, 
  Lock, 
  Download, 
  Star, 
  Eye,
  Bot,
  MessageSquare,
  BarChart3,
  Zap,
  Plus
} from "lucide-react";

// Mock automation data
const automations = [
  {
    id: 1,
    title: "AI Customer Support Bot",
    description: "Automated customer support with GPT-4 integration and sentiment analysis",
    category: "Customer Service",
    difficulty: "Beginner",
    rating: 4.9,
    downloads: 1250,
    icon: MessageSquare,
    tags: ["GPT-4", "Support", "Chat"],
    isLocked: true
  },
  {
    id: 2,
    title: "Social Media Scheduler",
    description: "AI-powered content creation and multi-platform scheduling system",
    category: "Marketing",
    difficulty: "Intermediate",
    rating: 4.8,
    downloads: 980,
    icon: BarChart3,
    tags: ["Social Media", "Content", "Scheduling"],
    isLocked: true
  },
  {
    id: 3,
    title: "Lead Generation System",
    description: "Automated lead capture, scoring, and nurturing with CRM integration",
    category: "Sales",
    difficulty: "Advanced",
    rating: 4.9,
    downloads: 756,
    icon: Zap,
    tags: ["Lead Gen", "CRM", "Sales"],
    isLocked: true
  },
  {
    id: 4,
    title: "Email Marketing Automation",
    description: "Personalized email campaigns with AI-driven content optimization",
    category: "Marketing",
    difficulty: "Intermediate",
    rating: 4.7,
    downloads: 1120,
    icon: Bot,
    tags: ["Email", "Personalization", "AI"],
    isLocked: true
  },
  {
    id: 5,
    title: "Data Analytics Dashboard",
    description: "Real-time business intelligence with automated reporting and insights",
    category: "Analytics",
    difficulty: "Advanced",
    rating: 4.8,
    downloads: 645,
    icon: BarChart3,
    tags: ["Analytics", "Reporting", "BI"],
    isLocked: true
  },
  {
    id: 6,
    title: "Inventory Management Bot",
    description: "Smart inventory tracking with predictive restocking alerts",
    category: "Operations",
    difficulty: "Intermediate",
    rating: 4.6,
    downloads: 432,
    icon: Bot,
    tags: ["Inventory", "Tracking", "Alerts"],
    isLocked: true
  }
];

const categories = ["All", "Customer Service", "Marketing", "Sales", "Analytics", "Operations"];

export default function Library() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Automation <span className="text-gradient">Library</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse our collection of 100+ AI automations. Each one is ready to deploy 
              and comes with full commercial licensing.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Search automations..." 
                  className="pl-10 py-3"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={category === "All" ? "gradient-primary text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Automations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upload Workflow Section */}
          <div className="mb-12 flex justify-center">
            <WorkflowUpload onUploadComplete={() => window.location.reload()} />
          </div>

          {/* Access Notice */}
          <div className="mb-12 p-6 rounded-2xl bg-card border border-border text-center">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unlock Full Access</h3>
            <p className="text-muted-foreground mb-4">
              Sign up for a subscription to download and resell these automations
            </p>
            <Button className="gradient-gold text-gold-foreground hover:opacity-90">
              Start Free Trial
            </Button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automations.map((automation) => (
              <div 
                key={automation.id}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
              >
                {/* Lock overlay */}
                {automation.isLocked && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium text-muted-foreground">
                        Subscribe to unlock
                      </p>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <automation.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {automation.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {automation.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {automation.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-secondary rounded-md text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{automation.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      <span>{automation.downloads}</span>
                    </div>
                  </div>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">
                    {automation.difficulty}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    disabled={automation.isLocked}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Automations
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Showing 6 of 100+ automations
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}