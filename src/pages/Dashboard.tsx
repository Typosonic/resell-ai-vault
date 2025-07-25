
import { useAuth } from '@/contexts/AuthContext';
import { useOptimizedProfile } from '@/hooks/useOptimizedProfile';
import { useDownloads } from '@/hooks/useAutomations';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Library, 
  MessageSquare, 
  Download, 
  TrendingUp,
  Calendar,
  Crown
} from 'lucide-react';
import { useMemo } from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const { profile } = useOptimizedProfile();
  const { downloads } = useDownloads();

  const stats = useMemo(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentMonthDownloads = downloads?.filter(download => {
      const downloadDate = new Date(download.download_date);
      const now = new Date();
      return downloadDate.getMonth() === now.getMonth() && 
             downloadDate.getFullYear() === now.getFullYear();
    }).length || 0;

    return [
      {
        title: 'Downloads This Month',
        value: currentMonthDownloads,
        icon: Download,
        color: 'text-blue-600',
      },
      {
        title: 'Total Downloads',
        value: downloads?.length || 0,
        icon: TrendingUp,
        color: 'text-green-600',
      },
      {
        title: 'Subscription',
        value: profile?.subscription_status || 'Free',
        icon: Crown,
        color: 'text-purple-600',
      },
    ];
  }, [downloads, profile]);

  const recentDownloads = useMemo(() => {
    return downloads?.slice(0, 5) || [];
  }, [downloads]);

  return (
    <div className="member-portal min-h-screen bg-white">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your automations today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 capitalize">
                        {stat.value}
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Library className="mr-2 h-5 w-5 text-purple-600" />
                Browse Automation Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Discover new automations to streamline your business processes.
              </p>
              <Link to="/library">
                <Button className="w-full">
                  Explore Library
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
                Learn with AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Get personalized help and learn how to implement automations.
              </p>
              <Link to="/chat">
                <Button variant="outline" className="w-full">
                  Start AI Chat
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Downloads */}
        {recentDownloads.length > 0 && (
          <Card className="mt-8 bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Calendar className="mr-2 h-5 w-5 text-green-600" />
                Recent Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDownloads.map((download) => (
                  <div key={download.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {download.automations?.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Downloaded on {new Date(download.download_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Link to={`/automation/${download.automation_id}`}>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              {downloads && downloads.length > 5 && (
                <div className="mt-4 text-center">
                  <Link to="/downloads">
                    <Button variant="outline">View All Downloads</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
