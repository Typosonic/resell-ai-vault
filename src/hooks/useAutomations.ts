
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useAutomations = (searchQuery?: string, categoryFilter?: string) => {
  const { data: automations, isLoading } = useQuery({
    queryKey: ['automations', searchQuery, categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from('automations')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      if (categoryFilter && categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return { automations, isLoading };
};

export const useAutomation = (id: string) => {
  const { data: automation, isLoading } = useQuery({
    queryKey: ['automation', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  return { automation, isLoading };
};

export const useDownloads = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: downloads, isLoading } = useQuery({
    queryKey: ['downloads', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('downloads')
        .select(`
          *,
          automations (*)
        `)
        .eq('user_id', user.id)
        .order('download_date', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const downloadAutomation = useMutation({
    mutationFn: async (automationId: string) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('downloads')
        .insert({
          user_id: user.id,
          automation_id: automationId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads'] });
      toast({
        title: "Success!",
        description: "Automation downloaded successfully.",
      });
    },
    onError: (error: any) => {
      if (error.message.includes('duplicate')) {
        toast({
          title: "Already downloaded",
          description: "You have already downloaded this automation.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });

  return {
    downloads,
    isLoading,
    downloadAutomation: downloadAutomation.mutate,
    isDownloading: downloadAutomation.isPending,
  };
};
