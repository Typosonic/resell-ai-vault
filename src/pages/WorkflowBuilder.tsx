
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bot, 
  Download, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Zap,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function WorkflowBuilder() {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkflow, setGeneratedWorkflow] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateWorkflow = async () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe the business problem you want to solve.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-workflow', {
        body: { 
          problemDescription: description,
          businessType: 'General',
          complexity: 'Medium',
          isChat: false
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate workflow');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setGeneratedWorkflow(data.workflow);
      
      toast({
        title: "Workflow Generated!",
        description: "Your n8n workflow has been created successfully.",
      });
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate workflow. Please try again.';
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Workflow generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadWorkflow = () => {
    if (!generatedWorkflow) return;

    const blob = new Blob([JSON.stringify(generatedWorkflow, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'n8n-workflow.json';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Workflow Downloaded",
      description: "Your n8n workflow file has been saved.",
    });
  };

  const exampleProblems = [
    "Automatically send welcome emails to new customers and add them to a CRM",
    "Monitor social media mentions and alert the team via Slack",
    "Process invoice payments and update accounting software",
    "Backup important files to cloud storage daily",
    "Send reminder emails for upcoming appointments"
  ];

  return (
    <div className="member-portal min-h-screen bg-white">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Bot className="mr-3 h-8 w-8 text-blue-600" />
            AI Workflow Builder
          </h1>
          <p className="text-gray-600 mt-2">
            Describe your business problem and get a custom n8n workflow instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Describe Your Business Problem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Example: I need to automatically send welcome emails to new customers who sign up on my website, add them to my CRM, and notify my sales team on Slack..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] border-gray-300"
                />
                
                <Button 
                  onClick={generateWorkflow}
                  disabled={isGenerating || !description.trim()}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Workflow...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Generate n8n Workflow
                    </>
                  )}
                </Button>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Example Problems */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Need Inspiration?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Try these example problems:</p>
                <div className="space-y-2">
                  {exampleProblems.map((problem, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100"
                      onClick={() => setDescription(problem)}
                    >
                      <p className="text-sm text-gray-700">{problem}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {generatedWorkflow ? (
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                    Generated Workflow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">{generatedWorkflow.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{generatedWorkflow.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {generatedWorkflow.nodes?.map((node: any, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          {node.type}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button onClick={downloadWorkflow} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Workflow JSON
                    </Button>
                  </div>

                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      <strong>How to use:</strong> Download the JSON file and import it into your n8n instance. 
                      Go to n8n → Workflows → Import from File and select the downloaded JSON.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Generated Workflow Will Appear Here</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">
                      Describe your business problem and click "Generate" to see your custom n8n workflow
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
