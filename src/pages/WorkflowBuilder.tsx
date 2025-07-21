
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Wand2,
  Download,
  Copy,
  Zap,
  Settings,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function WorkflowBuilder() {
  const [problemDescription, setProblemDescription] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [complexity, setComplexity] = useState('intermediate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkflow, setGeneratedWorkflow] = useState<any>(null);
  const [workflowJson, setWorkflowJson] = useState('');
  const { toast } = useToast();

  const businessTypes = [
    'E-commerce',
    'SaaS',
    'Marketing Agency',
    'Consulting',
    'Manufacturing',
    'Healthcare',
    'Finance',
    'Education',
    'Real Estate',
    'Other'
  ];

  const complexityLevels = [
    { value: 'simple', label: 'Simple (2-5 nodes)', description: 'Basic automation with minimal logic' },
    { value: 'intermediate', label: 'Intermediate (5-15 nodes)', description: 'Moderate complexity with conditions and transforms' },
    { value: 'advanced', label: 'Advanced (15+ nodes)', description: 'Complex workflow with multiple integrations' }
  ];

  const handleGenerateWorkflow = async () => {
    if (!problemDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please describe the business problem you want to solve.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-workflow', {
        body: {
          problemDescription,
          businessType,
          complexity,
        },
      });

      if (error) throw error;

      setGeneratedWorkflow(data.workflow);
      setWorkflowJson(data.rawJson);
      
      toast({
        title: "Workflow Generated!",
        description: "Your n8n workflow has been created successfully.",
      });
    } catch (error: any) {
      console.error('Error generating workflow:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate workflow. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadWorkflow = () => {
    if (!workflowJson) return;
    
    const blob = new Blob([workflowJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `n8n-workflow-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Workflow JSON file has been downloaded.",
    });
  };

  const copyToClipboard = () => {
    if (!workflowJson) return;
    
    navigator.clipboard.writeText(workflowJson);
    toast({
      title: "Copied!",
      description: "Workflow JSON copied to clipboard.",
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Wand2 className="mr-3 h-8 w-8 text-purple-600" />
          AI Workflow Builder
        </h1>
        <p className="text-gray-600">
          Describe your business problem and get a custom n8n workflow generated instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Workflow Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="problem">Business Problem Description</Label>
              <Textarea
                id="problem"
                placeholder="Describe the business problem you want to automate. Be specific about inputs, processes, and desired outcomes. For example: 'When a new customer signs up, send them a welcome email, add them to our CRM, and notify our sales team...'"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="min-h-[120px] mt-2"
              />
            </div>

            <div>
              <Label htmlFor="business-type">Business Type</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Complexity Level</Label>
              <div className="mt-2 space-y-3">
                {complexityLevels.map((level) => (
                  <div
                    key={level.value}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      complexity === level.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setComplexity(level.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-gray-600">{level.description}</div>
                      </div>
                      {complexity === level.value && (
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerateWorkflow}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Workflow...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Generate n8n Workflow
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Generated Workflow
              </span>
              {generatedWorkflow && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadWorkflow}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!generatedWorkflow && !isGenerating && (
              <div className="text-center py-12 text-gray-500">
                <Wand2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Configure your workflow requirements and click "Generate" to get started.</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-purple-600" />
                <p className="text-gray-600">AI is crafting your custom workflow...</p>
                <p className="text-sm text-gray-500 mt-2">This may take 30-60 seconds</p>
              </div>
            )}

            {generatedWorkflow && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">
                    {generatedWorkflow.nodes?.length || 0} Nodes
                  </Badge>
                  <Badge variant="secondary">
                    {generatedWorkflow.connections ? Object.keys(generatedWorkflow.connections).length : 0} Connections
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    Ready to Import
                  </Badge>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Workflow Overview
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {generatedWorkflow.name || 'Custom Business Automation Workflow'}
                  </p>
                  
                  <div className="text-xs bg-white rounded border p-3 max-h-40 overflow-y-auto font-mono">
                    {JSON.stringify(generatedWorkflow, null, 2)}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
                    How to Import
                  </h4>
                  <ol className="text-sm text-gray-700 space-y-1">
                    <li>1. Open your n8n instance</li>
                    <li>2. Click "Import from JSON" or use Ctrl+I</li>
                    <li>3. Paste the downloaded JSON or copy from above</li>
                    <li>4. Configure your credentials and API keys</li>
                    <li>5. Test and activate your workflow</li>
                  </ol>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
