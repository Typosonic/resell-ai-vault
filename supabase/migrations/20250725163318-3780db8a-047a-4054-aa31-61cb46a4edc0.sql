-- Allow public read access to automations
DROP POLICY IF EXISTS "Authenticated users can view automations" ON public.automations;

CREATE POLICY "Public can view automations" 
ON public.automations 
FOR SELECT 
USING (true);

-- Restrict uploads to admin only (you'll need to set yourself as admin)
DROP POLICY IF EXISTS "Users can create their own automations" ON public.automations;

CREATE POLICY "Only admins can create automations" 
ON public.automations 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND subscription_status = 'admin'
  )
);

DROP POLICY IF EXISTS "Users can update their own automations" ON public.automations;

CREATE POLICY "Only admins can update automations" 
ON public.automations 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND subscription_status = 'admin'
  )
);