
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2,
  Circle,
  AlertTriangle,
  Shield,
  CreditCard,
  FileText,
  Users,
  Settings,
  Globe,
  Lock,
  Mail,
  Database,
  Cloud,
  Zap,
  Scale,
  Bell
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  completed: boolean;
  links?: string[];
  estimatedTime?: string;
}

export default function MVPChecklist() {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Legal & Compliance
    {
      id: 'privacy-policy',
      title: 'Privacy Policy',
      description: 'GDPR and CCPA compliant privacy policy covering data collection, processing, and user rights',
      category: 'Legal & Compliance',
      priority: 'critical',
      completed: false,
      links: ['https://termly.io/products/privacy-policy-generator/', 'https://www.privacypolicies.com/'],
      estimatedTime: '2-4 hours'
    },
    {
      id: 'terms-of-service',
      title: 'Terms of Service',
      description: 'Comprehensive terms covering liability, user responsibilities, and service limitations',
      category: 'Legal & Compliance',
      priority: 'critical',
      completed: false,
      links: ['https://termly.io/products/terms-and-conditions-generator/'],
      estimatedTime: '2-4 hours'
    },
    {
      id: 'cookie-policy',
      title: 'Cookie Policy',
      description: 'Detailed cookie usage policy and consent management',
      category: 'Legal & Compliance',
      priority: 'high',
      completed: false,
      estimatedTime: '1-2 hours'
    },
    {
      id: 'dmca-policy',
      title: 'DMCA Takedown Policy',
      description: 'Copyright infringement policy and takedown procedures',
      category: 'Legal & Compliance',
      priority: 'medium',
      completed: false,
      estimatedTime: '1 hour'
    },
    {
      id: 'business-registration',
      title: 'Business Registration',
      description: 'LLC/Corporation registration and EIN number',
      category: 'Legal & Compliance',
      priority: 'critical',
      completed: false,
      estimatedTime: '1-2 weeks'
    },

    // Authentication & Security
    {
      id: 'auth-system',
      title: 'Authentication System',
      description: 'Supabase auth with email verification, password reset, and secure sessions',
      category: 'Authentication & Security',
      priority: 'critical',
      completed: true,
      estimatedTime: 'Completed'
    },
    {
      id: 'password-requirements',
      title: 'Password Security',
      description: 'Strong password requirements and validation',
      category: 'Authentication & Security',
      priority: 'high',
      completed: false,
      estimatedTime: '2 hours'
    },
    {
      id: 'two-factor-auth',
      title: 'Two-Factor Authentication',
      description: 'Optional 2FA for enhanced account security',
      category: 'Authentication & Security',
      priority: 'medium',
      completed: false,
      estimatedTime: '4-6 hours'
    },
    {
      id: 'rate-limiting',
      title: 'Rate Limiting',
      description: 'API rate limiting to prevent abuse',
      category: 'Authentication & Security',
      priority: 'high',
      completed: false,
      estimatedTime: '2-3 hours'
    },
    {
      id: 'ssl-certificate',
      title: 'SSL Certificate',
      description: 'HTTPS encryption for all traffic',
      category: 'Authentication & Security',
      priority: 'critical',
      completed: false,
      estimatedTime: '30 minutes'
    },

    // Payment & Billing
    {
      id: 'stripe-integration',
      title: 'Stripe Payment Integration',
      description: 'Subscription billing, one-time payments, and customer portal',
      category: 'Payment & Billing',
      priority: 'critical',
      completed: false,
      estimatedTime: '6-8 hours'
    },
    {
      id: 'subscription-plans',
      title: 'Subscription Plans',
      description: 'Multiple tier pricing with feature restrictions',
      category: 'Payment & Billing',
      priority: 'critical',
      completed: false,
      estimatedTime: '4-6 hours'
    },
    {
      id: 'invoice-system',
      title: 'Invoice & Receipt System',
      description: 'Automated invoicing and receipt generation',
      category: 'Payment & Billing',
      priority: 'high',
      completed: false,
      estimatedTime: '3-4 hours'
    },
    {
      id: 'tax-compliance',
      title: 'Tax Compliance',
      description: 'Sales tax calculation and VAT compliance',
      category: 'Payment & Billing',
      priority: 'high',
      completed: false,
      estimatedTime: '2-3 hours'
    },

    // Claude API Integration
    {
      id: 'claude-api-setup',
      title: 'Claude API Integration',
      description: 'Anthropic Claude API for AI workflow generation',
      category: 'AI Integration',
      priority: 'critical',
      completed: false,
      estimatedTime: '4-6 hours'
    },
    {
      id: 'api-usage-tracking',
      title: 'API Usage Tracking',
      description: 'Monitor and limit Claude API usage per user/plan',
      category: 'AI Integration',
      priority: 'high',
      completed: false,
      estimatedTime: '3-4 hours'
    },
    {
      id: 'ai-content-moderation',
      title: 'AI Content Moderation',
      description: 'Filter inappropriate requests and responses',
      category: 'AI Integration',
      priority: 'high',
      completed: false,
      estimatedTime: '2-3 hours'
    },

    // User Management
    {
      id: 'user-profiles',
      title: 'User Profile Management',
      description: 'Complete user profile with settings and preferences',
      category: 'User Management',
      priority: 'high',
      completed: true,
      estimatedTime: 'Completed'
    },
    {
      id: 'user-dashboard',
      title: 'User Dashboard',
      description: 'Analytics and usage overview for users',
      category: 'User Management',
      priority: 'high',
      completed: true,
      estimatedTime: 'Completed'
    },
    {
      id: 'account-deletion',
      title: 'Account Deletion',
      description: 'GDPR compliant account deletion process',
      category: 'User Management',
      priority: 'high',
      completed: false,
      estimatedTime: '2-3 hours'
    },

    // Email & Communications
    {
      id: 'email-service',
      title: 'Transactional Email Service',
      description: 'Resend.com integration for reliable email delivery',
      category: 'Email & Communications',
      priority: 'critical',
      completed: false,
      estimatedTime: '3-4 hours'
    },
    {
      id: 'welcome-emails',
      title: 'Welcome Email Sequence',
      description: 'Onboarding email series for new users',
      category: 'Email & Communications',
      priority: 'high',
      completed: false,
      estimatedTime: '4-6 hours'
    },
    {
      id: 'notification-system',
      title: 'Notification System',
      description: 'In-app and email notifications for important events',
      category: 'Email & Communications',
      priority: 'medium',
      completed: false,
      estimatedTime: '4-6 hours'
    },

    // Analytics & Monitoring
    {
      id: 'analytics-tracking',
      title: 'Analytics Tracking',
      description: 'Google Analytics 4 or Mixpanel for user behavior tracking',
      category: 'Analytics & Monitoring',
      priority: 'high',
      completed: false,
      estimatedTime: '2-3 hours'
    },
    {
      id: 'error-monitoring',
      title: 'Error Monitoring',
      description: 'Sentry.io for error tracking and performance monitoring',
      category: 'Analytics & Monitoring',
      priority: 'high',
      completed: false,
      estimatedTime: '2-3 hours'
    },
    {
      id: 'uptime-monitoring',
      title: 'Uptime Monitoring',
      description: 'UptimeRobot or similar for service availability monitoring',
      category: 'Analytics & Monitoring',
      priority: 'medium',
      completed: false,
      estimatedTime: '1 hour'
    },

    // SEO & Marketing
    {
      id: 'seo-optimization',
      title: 'SEO Optimization',
      description: 'Meta tags, sitemap, robots.txt, and structured data',
      category: 'SEO & Marketing',
      priority: 'high',
      completed: false,
      estimatedTime: '4-6 hours'
    },
    {
      id: 'landing-page-optimization',
      title: 'Landing Page Optimization',
      description: 'A/B test ready landing page with clear CTAs',
      category: 'SEO & Marketing',
      priority: 'high',
      completed: false,
      estimatedTime: '6-8 hours'
    },
    {
      id: 'social-media-integration',
      title: 'Social Media Integration',
      description: 'Open Graph tags and social sharing functionality',
      category: 'SEO & Marketing',
      priority: 'medium',
      completed: false,
      estimatedTime: '2-3 hours'
    },

    // Support & Documentation
    {
      id: 'help-documentation',
      title: 'Help Documentation',
      description: 'Comprehensive user guides and FAQ',
      category: 'Support & Documentation',
      priority: 'high',
      completed: false,
      estimatedTime: '8-12 hours'
    },
    {
      id: 'contact-support',
      title: 'Contact & Support System',
      description: 'Support ticket system or live chat integration',
      category: 'Support & Documentation',
      priority: 'high',
      completed: false,
      estimatedTime: '4-6 hours'
    },
    {
      id: 'api-documentation',
      title: 'API Documentation',
      description: 'Comprehensive API docs if offering API access',
      category: 'Support & Documentation',
      priority: 'medium',
      completed: false,
      estimatedTime: '6-8 hours'
    },

    // Performance & Scalability
    {
      id: 'cdn-setup',
      title: 'CDN Configuration',
      description: 'CloudFlare or similar for global content delivery',
      category: 'Performance & Scalability',
      priority: 'medium',
      completed: false,
      estimatedTime: '2-3 hours'
    },
    {
      id: 'database-optimization',
      title: 'Database Optimization',
      description: 'Proper indexing and query optimization',
      category: 'Performance & Scalability',
      priority: 'medium',
      completed: false,
      estimatedTime: '3-4 hours'
    },
    {
      id: 'backup-strategy',
      title: 'Backup Strategy',
      description: 'Automated database and file backups',
      category: 'Performance & Scalability',
      priority: 'high',
      completed: false,
      estimatedTime: '2-3 hours'
    },

    // Testing & Quality Assurance
    {
      id: 'browser-testing',
      title: 'Cross-Browser Testing',
      description: 'Test on Chrome, Firefox, Safari, and Edge',
      category: 'Testing & QA',
      priority: 'high',
      completed: false,
      estimatedTime: '4-6 hours'
    },
    {
      id: 'mobile-responsiveness',
      title: 'Mobile Responsiveness',
      description: 'Fully responsive design for all devices',
      category: 'Testing & QA',
      priority: 'critical',
      completed: false,
      estimatedTime: '6-8 hours'
    },
    {
      id: 'security-testing',
      title: 'Security Testing',
      description: 'Penetration testing and vulnerability assessment',
      category: 'Testing & QA',
      priority: 'high',
      completed: false,
      estimatedTime: '4-8 hours'
    }
  ]);

  const toggleItem = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const categories = [...new Set(checklistItems.map(item => item.category))];
  const completedItems = checklistItems.filter(item => item.completed).length;
  const totalItems = checklistItems.length;
  const completionPercentage = (completedItems / totalItems) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Legal & Compliance': return FileText;
      case 'Authentication & Security': return Shield;
      case 'Payment & Billing': return CreditCard;
      case 'AI Integration': return Zap;
      case 'User Management': return Users;
      case 'Email & Communications': return Mail;
      case 'Analytics & Monitoring': return Database;
      case 'SEO & Marketing': return Globe;
      case 'Support & Documentation': return Bell;
      case 'Performance & Scalability': return Cloud;
      case 'Testing & QA': return Settings;
      default: return Circle;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Production-Ready MVP Checklist
        </h1>
        <p className="text-gray-600 mb-4">
          Complete this checklist to launch a legal, fully functional SaaS platform
        </p>
        
        {/* Progress Overview */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overall Progress</h3>
            <span className="text-sm text-gray-600">
              {completedItems} of {totalItems} completed
            </span>
          </div>
          <Progress value={completionPercentage} className="mb-2" />
          <p className="text-sm text-gray-600">
            {completionPercentage.toFixed(1)}% complete
          </p>
        </div>
      </div>

      {/* Checklist by Category */}
      <div className="space-y-8">
        {categories.map(category => {
          const categoryItems = checklistItems.filter(item => item.category === category);
          const categoryCompleted = categoryItems.filter(item => item.completed).length;
          const CategoryIcon = getCategoryIcon(category);

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CategoryIcon className="mr-3 h-6 w-6 text-blue-600" />
                  {category}
                  <Badge variant="outline" className="ml-auto">
                    {categoryCompleted}/{categoryItems.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryItems.map(item => (
                    <div
                      key={item.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border transition-all ${
                        item.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="mt-1 flex-shrink-0"
                      >
                        {item.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                            {item.estimatedTime && (
                              <span className="text-xs text-gray-500">
                                {item.estimatedTime}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className={`text-sm mb-2 ${item.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                        
                        {item.links && item.links.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.links.map((link, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(link, '_blank')}
                                className="h-7 text-xs"
                              >
                                Resource {index + 1}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Critical Items Alert */}
      <Card className="mt-8 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Critical Items Remaining
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 mb-4">
            These items are absolutely required before launching your SaaS:
          </p>
          <div className="space-y-2">
            {checklistItems
              .filter(item => item.priority === 'critical' && !item.completed)
              .map(item => (
                <div key={item.id} className="flex items-center text-red-700">
                  <Circle className="h-4 w-4 mr-2" />
                  {item.title}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Launch Readiness */}
      {completionPercentage === 100 && (
        <Card className="mt-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Ready for Launch! 🚀
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">
              Congratulations! You've completed all items on the MVP checklist. 
              Your SaaS is ready for production deployment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
