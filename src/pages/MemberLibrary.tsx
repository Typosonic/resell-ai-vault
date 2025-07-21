
import { useState } from 'react';
import { useAutomations } from '@/hooks/useAutomations';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter,
  Star,
  Download,
  Clock,
  Eye
} from 'lucide-react';

const categories = [
  'all',
  'Customer Service',
  'Marketing',
  'Sales',
  'Analytics',
  'Operations'
];

const difficulties = ['beginner', 'intermediate', 'advanced'];

export default function MemberLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const { automations, isLoading } = useAutomations(searchQuery, categoryFilter);

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
      <div className="member-portal">
        <div className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="member-portal">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Automation Library
          </h1>
          <p className="text-gray-600">
            Discover and download powerful automations for your business
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search automations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-300"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Category:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(category)}
                className="capitalize"
              >
                {category === 'all' ? 'All Categories' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Automations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations?.map((automation) => (
            <Card key={automation.id} className="hover:shadow-lg transition-shadow bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {automation.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {automation.rating}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {automation.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800">{automation.category}</Badge>
                    <Badge className={getDifficultyColor(automation.difficulty || 'beginner')}>
                      {automation.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {automation.downloads?.toLocaleString() || 0}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(automation.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  {automation.tags && automation.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {automation.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {automation.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{automation.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <Link to={`/automation/${automation.id}`}>
                  <Button className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {automations?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No automations found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
