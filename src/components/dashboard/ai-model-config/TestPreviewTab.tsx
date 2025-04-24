import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Play, Loader2, Copy, Check } from "lucide-react";
import { AIConfig, Prompt, KnowledgeBase, FollowUpQuestion, ResponseFormat } from "./types";
import { useState } from "react";

interface TestPreviewTabProps {
  currentConfig: AIConfig;
  prompts: Prompt[];
  responseFormats: ResponseFormat[];
  knowledgeBases: KnowledgeBase[];
  followUpQuestions: FollowUpQuestion[];
  testQuery: string;
  setTestQuery: (query: string) => void;
  testResponse: string;
  isGenerating: boolean;
  onGenerateResponse: () => void;
}

const TestPreviewTab: React.FC<TestPreviewTabProps> = ({
  currentConfig,
  prompts,
  responseFormats,
  knowledgeBases,
  followUpQuestions,
  testQuery,
  setTestQuery,
  testResponse,
  isGenerating,
  onGenerateResponse,
}) => {
  const [copied, setCopied] = useState(false);

  const selectedPrompt = prompts.find(p => p.id === currentConfig.selectedPromptId);
  const selectedFormat = responseFormats.find(f => f.id === currentConfig.selectedResponseFormatId);
  const selectedKnowledgeBases = knowledgeBases.filter(kb => 
    currentConfig.selectedKnowledgeBaseIds.includes(kb.id)
  );
  const selectedFollowUps = followUpQuestions.filter(q => 
    currentConfig.selectedFollowUpQuestionIds.includes(q.id)
  );

  const handleCopyResponse = () => {
    if (testResponse) {
      navigator.clipboard.writeText(testResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configuration Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration Summary</CardTitle>
            <CardDescription>
              Current settings that will be used for testing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Model</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-[#D8A23B]/10 text-[#D8A23B] border-[#D8A23B]/30">
                  {currentConfig.model}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Temperature: {currentConfig.temperature}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">Prompt Template</h3>
              <p className="text-sm text-muted-foreground">
                {selectedPrompt ? selectedPrompt.name : "No prompt template selected"}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">Knowledge Sources</h3>
              {selectedKnowledgeBases.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedKnowledgeBases.map(kb => (
                    <Badge key={kb.id} variant="outline" className="bg-[#D8A23B]/5">
                      {kb.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No knowledge sources selected</p>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">Response Format</h3>
              <p className="text-sm text-muted-foreground">
                {selectedFormat ? selectedFormat.name : "Default formatting"}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">Follow-up Questions</h3>
              {currentConfig.enableFollowUpQuestions && selectedFollowUps.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Enabled ({selectedFollowUps.length})
                  </Badge>
                </div>
              ) : (
                <Badge variant="outline" className="bg-muted text-muted-foreground">
                  Disabled
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Area */}
        <Card>
          <CardHeader>
            <CardTitle>Test Your Configuration</CardTitle>
            <CardDescription>
              Enter a query to test how your AI would respond
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Enter your test query here..."
                className="min-h-[100px] resize-none"
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
              />
              <Button 
                onClick={onGenerateResponse} 
                disabled={!testQuery.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Generate Response
                  </>
                )}
              </Button>
            </div>

            {testResponse && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">AI Response</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopyResponse}
                    className="h-8 px-2"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
                  {testResponse}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Testing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Try different types of queries to see how your AI responds to various scenarios.</li>
            <li>Test edge cases and complex questions to ensure your AI handles them correctly.</li>
            <li>Adjust your configuration settings and test again to see the impact of your changes.</li>
            <li>The response generation here is a simulation. In production, responses will come from the actual AI model.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPreviewTab;
