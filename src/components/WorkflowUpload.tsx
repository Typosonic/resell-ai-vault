import { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface WorkflowUploadProps {
  onUploadComplete?: () => void;
}

export default function WorkflowUpload({ onUploadComplete }: WorkflowUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const processWorkflowFile = async (file: File) => {
    try {
      const text = await file.text();
      const workflowJson = JSON.parse(text);
      
      // Validate it's an n8n workflow
      if (!workflowJson.nodes || !Array.isArray(workflowJson.nodes)) {
        throw new Error('Invalid n8n workflow format: missing nodes array');
      }

      return workflowJson;
    } catch (error) {
      throw new Error('Invalid workflow file. Please upload a valid n8n workflow JSON file.');
    }
  };

  const uploadWorkflow = async (workflowJson: any) => {
    setIsUploading(true);

    try {
      // Analyze workflow with Claude
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-workflow', {
        body: { workflowJson }
      });

      if (analysisError) {
        throw new Error(analysisError.message || 'Failed to analyze workflow');
      }

      if (!analysisData?.analysis) {
        throw new Error('No analysis data received');
      }

      const { analysis } = analysisData;

      // Insert into automations table
      const { error: insertError } = await supabase
        .from('automations')
        .insert({
          title: analysis.title,
          description: analysis.description,
          category: analysis.category,
          difficulty: analysis.difficulty,
          tags: analysis.tags,
          workflow_json: workflowJson,
          rating: 0.0,
          downloads: 0
        });

      if (insertError) {
        throw new Error(insertError.message || 'Failed to save workflow');
      }

      toast({
        title: "Workflow Uploaded!",
        description: `"${analysis.title}" has been added to the library.`,
      });

      onUploadComplete?.();

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message || 'Failed to upload workflow. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        try {
          const workflowJson = await processWorkflowFile(file);
          await uploadWorkflow(workflowJson);
        } catch (error: any) {
          toast({
            title: "Invalid File",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JSON file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const workflowJson = await processWorkflowFile(file);
        await uploadWorkflow(workflowJson);
      } catch (error: any) {
        toast({
          title: "Invalid File",
          description: error.message,
          variant: "destructive",
        });
      }
      
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="workflow-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            accept=".json"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          
          <div className="flex flex-col items-center space-y-4">
            {isUploading ? (
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            ) : (
              <div className="p-3 rounded-full bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="font-semibold">
                {isUploading ? 'Analyzing Workflow...' : 'Upload n8n Workflow'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isUploading 
                  ? 'AI is analyzing your workflow and generating metadata...'
                  : 'Drag and drop your n8n workflow JSON file here, or click to browse'
                }
              </p>
            </div>

            {!isUploading && (
              <Button variant="outline" size="sm" className="mt-2">
                <FileText className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>• Upload n8n workflow JSON files</p>
          <p>• AI will generate title, description, and category</p>
          <p>• Workflows will be added to the public library</p>
        </div>
      </CardContent>
    </Card>
  );
}