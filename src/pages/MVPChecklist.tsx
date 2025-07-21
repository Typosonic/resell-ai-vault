import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  CreditCard, 
  Users, 
  Mail, 
  BarChart3, 
  Search, 
  MessageCircle, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  resources?: string[];
  completed: boolean;
}

interface ChecklistSection {
  id: string;
  title: string;
  icon: any;
  items: ChecklistItem[];
}

export default function MVPChecklist() {
  const checklistData: ChecklistSection[] = [
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: Shield,
      items: [
        {
          id: 'ssl',
          title: 'Implement SSL/TLS',
          description: 'Ensure all data transmitted is encrypted.',
          priority: 'high',
          estimatedTime: '2 days',
          resources: ['https://example.com/ssl-guide'],
          completed: false,
        },
        {
          id: 'privacyPolicy',
          title: 'Create Privacy Policy',
          description: 'Draft a comprehensive privacy policy.',
          priority: 'medium',
          estimatedTime: '3 days',
          resources: ['https://example.com/privacy-policy-template'],
          completed: false,
        },
      ],
    },
    {
      id: 'payment',
      title: 'Payment Processing',
      icon: CreditCard,
      items: [
        {
          id: 'paymentGateway',
          title: 'Integrate Payment Gateway',
          description: 'Set up a secure payment gateway.',
          priority: 'high',
          estimatedTime: '5 days',
          resources: ['https://example.com/payment-gateway-integration'],
          completed: false,
        },
        {
          id: 'subscriptionModel',
          title: 'Configure Subscription Model',
          description: 'Define and implement subscription plans.',
          priority: 'medium',
          estimatedTime: '4 days',
          completed: false,
        },
      ],
    },
    {
      id: 'userManagement',
      title: 'User Management',
      icon: Users,
      items: [
        {
          id: 'authentication',
          title: 'Implement User Authentication',
          description: 'Set up secure user login and registration.',
          priority: 'high',
          estimatedTime: '3 days',
          completed: false,
        },
        {
          id: 'rolesPermissions',
          title: 'Define Roles and Permissions',
          description: 'Establish user roles and access permissions.',
          priority: 'medium',
          estimatedTime: '2 days',
          completed: false,
        },
      ],
    },
    {
      id: 'communication',
      title: 'Communication Channels',
      icon: Mail,
      items: [
        {
          id: 'emailIntegration',
          title: 'Integrate Email Service',
          description: 'Set up transactional and marketing emails.',
          priority: 'medium',
          estimatedTime: '3 days',
          completed: false,
        },
        {
          id: 'customerSupport',
          title: 'Establish Customer Support Channel',
          description: 'Implement a help desk or chat system.',
          priority: 'low',
          estimatedTime: '2 days',
          completed: false,
        },
      ],
    },
    {
      id: 'analytics',
      title: 'Analytics & Tracking',
      icon: BarChart3,
      items: [
        {
          id: 'analyticsSetup',
          title: 'Set Up Analytics Tools',
          description: 'Integrate Google Analytics or similar tools.',
          priority: 'medium',
          estimatedTime: '2 days',
          completed: false,
        },
        {
          id: 'performanceMonitoring',
          title: 'Implement Performance Monitoring',
          description: 'Track key performance indicators (KPIs).',
          priority: 'low',
          estimatedTime: '1 day',
          completed: false,
        },
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing & SEO',
      icon: Search,
      items: [
        {
          id: 'seoOptimization',
          title: 'Optimize for SEO',
          description: 'Implement basic SEO practices.',
          priority: 'low',
          estimatedTime: '3 days',
          completed: false,
        },
        {
          id: 'contentMarketing',
          title: 'Plan Content Marketing Strategy',
          description: 'Create a content calendar and initial content.',
          priority: 'low',
          estimatedTime: '4 days',
          completed: false,
        },
      ],
    },
    {
      id: 'customerEngagement',
      title: 'Customer Engagement',
      icon: MessageCircle,
      items: [
        {
          id: 'onboardingProcess',
          title: 'Design Onboarding Process',
          description: 'Create a user-friendly onboarding experience.',
          priority: 'medium',
          estimatedTime: '3 days',
          completed: false,
        },
        {
          id: 'feedbackMechanism',
          title: 'Implement Feedback Mechanism',
          description: 'Set up a system for collecting user feedback.',
          priority: 'low',
          estimatedTime: '2 days',
          completed: false,
        },
      ],
    },
    {
      id: 'automation',
      title: 'Automation & Efficiency',
      icon: Zap,
      items: [
        {
          id: 'taskAutomation',
          title: 'Automate Repetitive Tasks',
          description: 'Identify and automate common tasks.',
          priority: 'medium',
          estimatedTime: '5 days',
          completed: false,
        },
        {
          id: 'workflowOptimization',
          title: 'Optimize Workflows',
          description: 'Streamline processes for efficiency.',
          priority: 'low',
          estimatedTime: '3 days',
          completed: false,
        },
      ],
    },
  ];

  const [checklist, setChecklist] = useState<ChecklistSection[]>(checklistData);

  const toggleItem = (sectionId: string, itemId: string) => {
    setChecklist(sections => 
      sections.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              items: section.items.map(item => 
                item.id === itemId ? { ...item, completed: !item.completed } : item
              )
            }
          : section
      )
    );
  };

  const totalItems = checklist.reduce((acc, section) => acc + section.items.length, 0);
  const completedItems = checklist.reduce((acc, section) => 
    acc + section.items.filter(item => item.completed).length, 0
  );
  const progressPercentage = (completedItems / totalItems) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="member-portal min-h-screen bg-white">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">MVP Production Checklist</h1>
          <p className="text-gray-600 mt-2">
            Complete these tasks to launch your SaaS platform successfully
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {completedItems} of {totalItems} tasks completed
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Checklist Sections */}
        <div className="space-y-8">
          {checklist.map((section) => {
            const sectionCompleted = section.items.filter(item => item.completed).length;
            const sectionTotal = section.items.length;
            const sectionProgress = (sectionCompleted / sectionTotal) * 100;
            const Icon = section.icon;

            return (
              <Card key={section.id} className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Icon className="mr-3 h-6 w-6 text-blue-600" />
                    {section.title}
                    <Badge variant="secondary" className="ml-auto bg-gray-100 text-gray-700">
                      {sectionCompleted}/{sectionTotal}
                    </Badge>
                  </CardTitle>
                  <Progress value={sectionProgress} className="h-1 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => toggleItem(section.id, item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {item.title}
                            </h4>
                            <Badge className={`text-white ${getPriorityColor(item.priority)}`}>
                              <span className="flex items-center space-x-1">
                                {getPriorityIcon(item.priority)}
                                <span className="capitalize">{item.priority}</span>
                              </span>
                            </Badge>
                            <Badge variant="outline" className="border-gray-300 text-gray-600">
                              {item.estimatedTime}
                            </Badge>
                          </div>
                          <p className={`text-sm ${item.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.description}
                          </p>
                          {item.resources && item.resources.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.resources.map((resource, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                                  asChild
                                >
                                  <a href={resource} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Resource {index + 1}
                                  </a>
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
      </div>
    </div>
  );
}
