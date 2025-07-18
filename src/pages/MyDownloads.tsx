
import { useDownloads } from '@/hooks/useAutomations';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  Calendar,
  Eye,
  Star,
  FileDown
} from 'lucide-react';

export default function MyDownloads() {
  const { downloads, isLoading } = useDownloads();

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
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Downloads
        </h1>
        <p className="text-gray-600">
          Access all your downloaded automations
        </p>
      </div>

      {downloads && downloads.length > 0 ? (
        <div className="space-y-4">
          {downloads.map((download) => (
            <Card key={download.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {download.automations?.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 ml-4">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {download.automations?.rating}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {download.automations?.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge variant="secondary">
                        {download.automations?.category}
                      </Badge>
                      
                      <Badge className={getDifficultyColor(download.automations?.difficulty || 'beginner')}>
                        {download.automations?.difficulty}
                      </Badge>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Downloaded on {new Date(download.download_date).toLocaleDateString()}
                      </div>
                    </div>

                    {download.automations?.tags && download.automations.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {download.automations.tags.slice(0, 4).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {download.automations.tags.length > 4 && (
                          <span className="text-xs text-gray-500">
                            +{download.automations.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <Link to={`/automation/${download.automation_id}`}>
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        // Handle file download - placeholder for now
                        console.log('Download file:', download.automations?.file_url);
                      }}
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      Download File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Download className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No downloads yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start exploring our automation library to download your first automation.
          </p>
          <Link to="/library">
            <Button>
              Browse Library
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
