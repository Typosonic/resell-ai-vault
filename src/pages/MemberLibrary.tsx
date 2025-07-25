
import { useState, useMemo } from 'react';
import { useOptimizedAutomations } from '@/hooks/useOptimizedAutomations';
import { useDownloads } from '@/hooks/useAutomations';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Clock, Filter } from 'lucide-react';

export default function MemberLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { automations, isLoading } = useOptimizedAutomations(searchQuery, categoryFilter);
  const { downloadAutomation, isDownloading } = useDownloads();

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(automations?.map(a => a.category) || [])];
    return uniqueCategories.filter(Boolean);
  }, [automations]);

  const handleDownload = (automationId: string) => {
    downloadAutomation(automationId);
  };

  if (isLoading) {
    return (
      <div className="member-portal min-h-screen bg-white">
        <div className="p-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-white border-gray-200">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="member-portal min-h-screen bg-white">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Automation Library</h1>
          <p className="text-gray-600 mt-2">
            Discover and download powerful automation workflows for your business.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search automations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-300"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Automations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations?.map((automation) => (
            <Card key={automation.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {automation.title}
                  </CardTitle>
                  {automation.category && (
                    <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-700">
                      {automation.category}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {automation.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(automation.created_at).toLocaleDateString()}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/automation/${automation.id}`}>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDownload(automation.id)}
                      disabled={isDownloading}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      {isDownloading ? 'Downloading...' : 'Download'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {automations?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No automations found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
