
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useMemo } from 'react';

export const useOptimizedAutomations = (searchQuery?: string, categoryFilter?: string) => {
  const { data: automations, isLoading } = useQuery({
    queryKey: ['automations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const filteredAutomations = useMemo(() => {
    if (!automations) return [];
    
    let filtered = automations;
    
    if (searchQuery) {
      filtered = filtered.filter(automation =>
        automation.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(automation =>
        automation.category === categoryFilter
      );
    }

    return filtered;
  }, [automations, searchQuery, categoryFilter]);

  return { 
    automations: filteredAutomations, 
    isLoading 
  };
};
