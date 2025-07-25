-- Add workflow_json column to store the n8n workflow data
ALTER TABLE public.automations 
ADD COLUMN workflow_json JSONB;

-- Create RLS policy to allow authenticated users to insert their own automations
CREATE POLICY "Users can create their own automations" 
ON public.automations 
FOR INSERT 
WITH CHECK (true);

-- Create RLS policy to allow users to update their own automations  
CREATE POLICY "Users can update their own automations"
ON public.automations
FOR UPDATE
USING (true);