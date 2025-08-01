import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WorkflowUpload from "@/components/WorkflowUpload";
import { useOptimizedAutomations } from "@/hooks/useOptimizedAutomations";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
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
  Plus,
  FileText
} from "lucide-react";

const categories = ["All", "Customer Service", "Marketing", "Sales", "Analytics", "Operations"];

const getIconForCategory = (category: string) => {
  switch (category) {
    case 'Customer Service':
      return MessageSquare;
    case 'Marketing':
      return BarChart3;
    case 'Sales':
      return Zap;
    case 'Analytics':
      return BarChart3;
    case 'Operations':
      return Bot;
    default:
      return FileText;
  }
};

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const { automations, isLoading } = useOptimizedAutomations(
    searchQuery, 
    categoryFilter === "All" ? undefined : categoryFilter
  );
  const { profile } = useProfile();
  const { user } = useAuth();
  const { toast } = useToast();

  const isAdmin = profile?.subscription_status === 'admin';

  const handleDownload = async (automation: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to download automations.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Record the download
      const { error: downloadError } = await supabase
        .from('downloads')
        .insert({
          automation_id: automation.id,
          user_id: user.id
        });

      if (downloadError) throw downloadError;

      // Increment download count
      const { error: updateError } = await supabase
        .from('automations')
        .update({ downloads: (automation.downloads || 0) + 1 })
        .eq('id', automation.id);

      if (updateError) throw updateError;

      // Download the file
      if (automation.file_url) {
        window.open(automation.file_url, '_blank');
      } else if (automation.workflow_json) {
        // Create and download JSON file
        const blob = new Blob([JSON.stringify(automation.workflow_json, null, 2)], {
          type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${automation.title.replace(/\s+/g, '-').toLowerCase()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      toast({
        title: "Success!",
        description: "Automation downloaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to download automation.",
        variant: "destructive",
      });
    }
  };

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                  variant={categoryFilter === category ? "default" : "outline"}
                  size="sm"
                  className={categoryFilter === category ? "gradient-primary text-white" : ""}
                  onClick={() => setCategoryFilter(category)}
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
          {/* Upload Workflow Section - Only show for admins */}
          {isAdmin && (
            <div className="mb-12 flex justify-center">
              <WorkflowUpload onUploadComplete={() => window.location.reload()} />
            </div>
          )}

          {/* Access Notice - Only show for non-authenticated users */}
          {!user && (
            <div className="mb-12 p-6 rounded-2xl bg-card border border-border text-center">
              <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sign in to Download</h3>
              <p className="text-muted-foreground mb-4">
                Create an account to download these automations for free
              </p>
              <Button className="gradient-gold text-gold-foreground hover:opacity-90">
                Sign In
              </Button>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading automations...</p>
            </div>
          )}

          {/* No Results */}
          {!isLoading && automations.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No automations found</h3>
              <p className="text-muted-foreground">
                {searchQuery || categoryFilter !== "All" 
                  ? "Try adjusting your search or filter criteria." 
                  : "No automations have been uploaded yet."
                }
              </p>
            </div>
          )}

          {/* Grid */}
          {!isLoading && automations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {automations.map((automation) => {
                const IconComponent = getIconForCategory(automation.category);
                
                return (
                  <div 
                    key={automation.id}
                    className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {automation.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {automation.description}
                    </p>

                    {/* Tags */}
                    {automation.tags && automation.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {automation.tags.map((tag: string) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-secondary rounded-md text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>{automation.rating || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          <span>{automation.downloads || 0}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-secondary px-2 py-1 rounded">
                        {automation.difficulty || 'Beginner'}
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
                        onClick={() => handleDownload(automation)}
                        disabled={!user}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Stats */}
          {!isLoading && automations.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground">
                Showing {automations.length} automation{automations.length !== 1 ? 's' : ''}
                {searchQuery && ` matching "${searchQuery}"`}
                {categoryFilter !== "All" && ` in ${categoryFilter}`}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}