import { Link } from "react-router-dom";
import { Bot, Twitter, Linkedin, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="p-2 rounded-lg gradient-primary">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">AutomationVault.ai</span>
              </Link>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Launch your AI agency overnight with 100+ ready-to-deploy automations 
                you can resell as your own.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/automationvault" 
                  className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/automationvault" 
                  className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://youtube.com/@automationvault" 
                  className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:hello@automationvault.ai" 
                  className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-6">Product</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  <Link to="/library" className="hover:text-primary transition-colors">
                    Automation Library
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/updates" className="hover:text-primary transition-colors">
                    Latest Updates
                  </Link>
                </li>
                <li>
                  <Link to="/roadmap" className="hover:text-primary transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-6">Company</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-6">Support</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  <Link to="/help" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="hover:text-primary transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials" className="hover:text-primary transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/status" className="hover:text-primary transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2024 AutomationVault.ai. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}