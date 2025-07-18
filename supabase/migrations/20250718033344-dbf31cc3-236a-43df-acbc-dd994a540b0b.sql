
-- Create users profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'basic', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create automations table
CREATE TABLE public.automations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  thumbnail_url TEXT,
  demo_video_url TEXT,
  file_url TEXT,
  tags TEXT[] DEFAULT '{}',
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  rating DECIMAL(2,1) DEFAULT 0.0,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create downloads table
CREATE TABLE public.downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  automation_id UUID NOT NULL REFERENCES public.automations(id) ON DELETE CASCADE,
  download_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, automation_id)
);

-- Create chats table for AI conversation logging
CREATE TABLE public.chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  automation_id UUID REFERENCES public.automations(id) ON DELETE SET NULL,
  chat_history JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for automations (public read for authenticated users)
CREATE POLICY "Authenticated users can view automations" ON public.automations
  FOR SELECT TO authenticated USING (true);

-- RLS Policies for downloads
CREATE POLICY "Users can view their own downloads" ON public.downloads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own downloads" ON public.downloads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chats
CREATE POLICY "Users can view their own chats" ON public.chats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chats" ON public.chats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chats" ON public.chats
  FOR UPDATE USING (auth.uid() = user_id);

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', 'User'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample automations
INSERT INTO public.automations (title, description, category, tags, difficulty, rating, downloads) VALUES
('AI Customer Support Bot', 'Automated customer support with GPT-4 integration and sentiment analysis', 'Customer Service', ARRAY['GPT-4', 'Support', 'Chat'], 'beginner', 4.9, 1250),
('Social Media Scheduler', 'AI-powered content creation and multi-platform scheduling system', 'Marketing', ARRAY['Social Media', 'Content', 'Scheduling'], 'intermediate', 4.8, 980),
('Lead Generation System', 'Automated lead capture, scoring, and nurturing with CRM integration', 'Sales', ARRAY['Lead Gen', 'CRM', 'Sales'], 'advanced', 4.9, 756),
('Email Marketing Automation', 'Personalized email campaigns with AI-driven content optimization', 'Marketing', ARRAY['Email', 'Personalization', 'AI'], 'intermediate', 4.7, 1120),
('Data Analytics Dashboard', 'Real-time business intelligence with automated reporting and insights', 'Analytics', ARRAY['Analytics', 'Reporting', 'BI'], 'advanced', 4.8, 645),
('Inventory Management Bot', 'Smart inventory tracking with predictive restocking alerts', 'Operations', ARRAY['Inventory', 'Tracking', 'Alerts'], 'intermediate', 4.6, 432);
