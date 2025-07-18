
import { useParams, Link } from 'react-router-dom';
import { useAutomation, useDownloads } from '@/hooks/useAutomations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Download,
  Star,
  Calendar,
  MessageSquare,
  Play,
  FileText,
  TrendingUp
} from 'lucide-react';

export default function AutomationDetails() {
  const { id } = useParams<{ id: string }>();
  const { automation, isLoading } = useAutomation(id!);
  const { downloadAutomation, isDownloading, downloads } = useDownloads();

  const isAlreadyDownloaded = downloads?.some(d => d.automation_id === id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!automation) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Automation not found
          </h2>
          <p className="text-gray-600 mb-4">
            The automation you're looking for doesn't exist.
          </p>
          <Link to="/library">
            <Button>Back to Library</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Back Button */}
      <Link to="/library" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Main Content */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {automation.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="font-medium">{automation.rating}</span>
              </div>
              
              <Badge variant="secondary">{automation.category}</Badge>
              
              <Badge className={getDifficultyColor(automation.difficulty || 'beginner')}>
                {automation.difficulty}
              </Badge>
              
              <div className="flex items-center text-gray-600">
                <Download className="h-4 w-4 mr-1" />
                {automation.downloads?.toLocaleString() || 0} downloads
              </div>
              
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(automation.created_at).toLocaleDateString()}
              </div>
            </div>

            {automation.tags && automation.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {automation.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Demo Video/Preview */}
          {automation.demo_video_url && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Demo Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Demo video will be loaded here</p>
                    <p className="text-sm text-gray-500 mt-1">{automation.demo_video_url}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {automation.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Download Card */}
          <Card>
            <CardHeader>
              <CardTitle>Get This Automation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => downloadAutomation(automation.id)}
                disabled={isDownloading}
                className="w-full"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading 
                  ? 'Downloading...' 
                  : isAlreadyDownloaded 
                  ? 'Download Again' 
                  : 'Download Now'
                }
              </Button>
              
              {isAlreadyDownloaded && (
                <p className="text-sm text-green-600 text-center">
                  ✓ Already in your downloads
                </p>
              )}
              
              <Link to={`/chat?automation=${automation.id}`}>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI About This
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Downloads</span>
                <span className="font-medium">{automation.downloads?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating</span>
                <span className="font-medium">{automation.rating}/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty</span>
                <span className="font-medium capitalize">{automation.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{automation.category}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
