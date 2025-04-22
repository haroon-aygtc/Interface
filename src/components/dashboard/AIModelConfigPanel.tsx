import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Brain,
  MessageSquare,
  Database,
  LayoutTemplate,
  Play,
  Save,
  Settings,
  Sparkles,
  FileText,
  MessageCircle,
  Workflow,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import tabs
import BasicConfigTab from "./ai-model-config/BasicConfigTab";
import PromptTemplateTab from "./ai-model-config/PromptTemplateTab";
import KnowledgeSourceTab from "./ai-model-config/KnowledgeSourceTab";
import SimpleResponseFormatterTab from "./ai-model-config/SimpleResponseFormatterTab";
import FollowUpFlowTab from "./ai-model-config/FollowUpFlowTab";
import SaveConfigDialog from "./ai-model-config/SaveConfigDialog";

// Import types and mock data
import {
  AIConfig,
  Prompt,
  KnowledgeBase,
  ContextRule,
  FollowUpQuestion,
  ResponseFormat
} from "./ai-model-config/types";
import {
  mockPrompts,
  mockKnowledgeBases,
  mockContextRules,
  mockFollowUpQuestions,
  mockResponseFormats,
  defaultAIConfig
} from "./ai-model-config/mockData";

interface AIModelConfigPanelProps {
  defaultTab?: string;
}

const AIModelConfigPanel: React.FC<AIModelConfigPanelProps> = ({
  defaultTab = "basic",
}) => {
  const { toast } = useToast();

  // State for tabs
  const [activeTab, setActiveTab] = useState(defaultTab);

  // State for data
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>(mockKnowledgeBases);
  const [contextRules, setContextRules] = useState<ContextRule[]>(mockContextRules);
  const [followUpQuestions, setFollowUpQuestions] = useState<FollowUpQuestion[]>(mockFollowUpQuestions);
  const [responseFormats, setResponseFormats] = useState<ResponseFormat[]>(mockResponseFormats);

  // State for the current configuration
  const [currentConfig, setCurrentConfig] = useState<AIConfig>(defaultAIConfig);

  // State for saved configurations
  const [savedConfigs, setSavedConfigs] = useState<AIConfig[]>([]);

  // State for dialogs
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // State for test area
  const [testQuery, setTestQuery] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle configuration changes
  const handleConfigChange = (key: keyof AIConfig, value: any) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Toggle knowledge base selection
  const toggleKnowledgeBase = (id: string) => {
    setCurrentConfig((prev) => {
      const selectedIds = [...prev.selectedKnowledgeBaseIds];
      const index = selectedIds.indexOf(id);

      if (index === -1) {
        selectedIds.push(id);
      } else {
        selectedIds.splice(index, 1);
      }

      return {
        ...prev,
        selectedKnowledgeBaseIds: selectedIds,
      };
    });
  };

  // Toggle context rule selection
  const toggleContextRule = (id: string) => {
    setCurrentConfig((prev) => {
      const selectedIds = [...prev.selectedContextRuleIds];
      const index = selectedIds.indexOf(id);

      if (index === -1) {
        selectedIds.push(id);
      } else {
        selectedIds.splice(index, 1);
      }

      return {
        ...prev,
        selectedContextRuleIds: selectedIds,
      };
    });
  };

  // Toggle follow-up question selection
  const toggleFollowUpQuestion = (id: string) => {
    setCurrentConfig((prev) => {
      const selectedIds = [...prev.selectedFollowUpQuestionIds];
      const index = selectedIds.indexOf(id);

      if (index === -1) {
        selectedIds.push(id);
      } else {
        selectedIds.splice(index, 1);
      }

      return {
        ...prev,
        selectedFollowUpQuestionIds: selectedIds,
      };
    });
  };

  // Save current configuration
  const saveCurrentConfig = (name: string) => {
    const configToSave = {
      ...currentConfig,
      name,
    };

    setSavedConfigs((prev) => [...prev, configToSave]);
    setShowSaveDialog(false);

    toast({
      title: "Configuration Saved",
      description: `Configuration "${name}" has been saved successfully.`,
    });
  };

  // Load a saved configuration
  const handleLoadConfig = (config: AIConfig) => {
    setCurrentConfig(config);

    toast({
      title: "Configuration Loaded",
      description: `Configuration "${config.name}" has been loaded successfully.`,
    });
  };

  // Generate test response
  const handleGenerateResponse = () => {
    if (!testQuery.trim()) return;

    setIsGenerating(true);
    setTestResponse("");

    // Simulate API call with typing effect
    setTimeout(() => {
      const selectedPrompt = prompts.find(p => p.id === currentConfig.selectedPromptId);
      const selectedFormat = responseFormats.find(f => f.id === currentConfig.selectedResponseFormatId);

      let response = "";

      if (selectedPrompt?.category === "Support") {
        response = "Thank you for your question! Based on our product documentation, the feature you're asking about is available in the Pro and Enterprise plans. The setup process is straightforward - you can access it from your account settings under 'Advanced Features'. If you need any help with the setup, our support team is available 24/7 through the chat widget on our website.";
      } else if (selectedPrompt?.category === "Technical") {
        response = "# Technical Response\n\nTo implement this feature, you'll need to use our API. Here's a code example:\n\n```javascript\nconst client = new APIClient({\n  apiKey: 'your-api-key',\n  version: 'v2'\n});\n\nconst response = await client.createResource({\n  name: 'Example Resource',\n  type: 'custom',\n  properties: {\n    // Your properties here\n  }\n});\n```\n\nMake sure you have the correct permissions set in your account dashboard before making this API call.";
      } else {
        response = "I've analyzed your question and found the following information in our knowledge base. The product you're asking about was released in our latest update (v2.5.0) and includes all the features you mentioned. According to our documentation, you can customize these features through the settings panel. Would you like me to provide more specific information about any particular feature?";
      }

      // Apply response format if available
      if (selectedFormat && selectedFormat.template) {
        // Simple template replacement for demo
        response = selectedFormat.template
          .replace("{{greeting}}", "Hello! I'm your AI assistant.")
          .replace("{{answer}}", response)
          .replace("{{closing}}", "Is there anything else you'd like to know?");
      }

      // Add follow-up questions if enabled
      if (currentConfig.enableFollowUpQuestions && currentConfig.selectedFollowUpQuestionIds.length > 0) {
        response += "\n\n**Follow-up questions you might have:**\n";

        currentConfig.selectedFollowUpQuestionIds.forEach(id => {
          const question = followUpQuestions.find(q => q.id === id);
          if (question) {
            response += `\n- ${question.question}`;
          }
        });
      }

      setTestResponse(response);
      setIsGenerating(false);
    }, 1500);
  };

  // Action buttons for the panel
  const configActions = (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => setShowSaveDialog(true)}
        className="bg-[#D8A23B]/10 border-[#D8A23B]/30 text-[#D8A23B] hover:bg-[#D8A23B]/20 hover:text-[#D8A23B]"
      >
        <Save className="mr-2 h-4 w-4" /> Save Configuration
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-[#D8A23B]/30 hover:bg-[#D8A23B]/10 hover:text-[#D8A23B]"
          >
            Load Configuration
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Saved Configurations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {savedConfigs.length === 0 ? (
            <DropdownMenuItem disabled>
              No saved configurations
            </DropdownMenuItem>
          ) : (
            savedConfigs.map((config) => (
              <DropdownMenuItem
                key={config.name}
                onClick={() => handleLoadConfig(config)}
              >
                {config.name}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="w-full h-full bg-background">
      <div className="space-y-6 max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="basic">
              <Brain className="mr-2 h-4 w-4" /> Basic Configuration
            </TabsTrigger>
            <TabsTrigger value="prompts">
              <MessageSquare className="mr-2 h-4 w-4" /> Prompt Templates
            </TabsTrigger>
            <TabsTrigger value="knowledge">
              <Database className="mr-2 h-4 w-4" /> Knowledge Sources
            </TabsTrigger>
            <TabsTrigger value="formatting">
              <LayoutTemplate className="mr-2 h-4 w-4" /> Response Formatting
            </TabsTrigger>
            <TabsTrigger value="followup">
              <Workflow className="mr-2 h-4 w-4" /> Follow-Up Flow
            </TabsTrigger>
            <TabsTrigger value="test">
              <Play className="mr-2 h-4 w-4" /> Test & Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Basic Configuration</h2>
                <p className="text-muted-foreground">Configure the core settings for your AI model</p>
              </div>
              {configActions}
            </div>

            <BasicConfigTab
              currentConfig={currentConfig}
              onConfigChange={handleConfigChange}
            />
          </TabsContent>

          <TabsContent value="prompts" className="space-y-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Prompt Templates</h2>
                <p className="text-muted-foreground">Create and manage prompt templates for your AI</p>
              </div>
              {configActions}
            </div>

            <PromptTemplateTab
              prompts={prompts}
              setPrompts={setPrompts}
              currentConfig={currentConfig}
              onConfigChange={handleConfigChange}
            />
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Knowledge Sources</h2>
                <p className="text-muted-foreground">Select the knowledge sources for your AI to use</p>
              </div>
              {configActions}
            </div>

            <KnowledgeSourceTab
              knowledgeBases={knowledgeBases}
              contextRules={contextRules}
              currentConfig={currentConfig}
              onToggleKnowledgeBase={toggleKnowledgeBase}
              onToggleContextRule={toggleContextRule}
            />
          </TabsContent>

          <TabsContent value="formatting" className="space-y-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Response Formatting</h2>
                <p className="text-muted-foreground">Design how your AI responses should be formatted</p>
              </div>
              {configActions}
            </div>

            <SimpleResponseFormatterTab />
          </TabsContent>

          <TabsContent value="followup" className="space-y-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Follow-Up Question Flow</h2>
                <p className="text-muted-foreground">Configure automated follow-up questions for your AI</p>
              </div>
              {configActions}
            </div>

            <FollowUpFlowTab
              followUpQuestions={followUpQuestions}
              setFollowUpQuestions={setFollowUpQuestions}
              currentConfig={currentConfig}
              onConfigChange={handleConfigChange}
              onToggleFollowUpQuestion={toggleFollowUpQuestion}
            />
          </TabsContent>

          <TabsContent value="test" className="space-y-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Test & Preview</h2>
                <p className="text-muted-foreground">Test your AI configuration with sample queries</p>
              </div>
              {configActions}
            </div>

            <TestPreviewTab
              currentConfig={currentConfig}
              prompts={prompts}
              responseFormats={responseFormats}
              knowledgeBases={knowledgeBases}
              followUpQuestions={followUpQuestions}
              testQuery={testQuery}
              setTestQuery={setTestQuery}
              testResponse={testResponse}
              isGenerating={isGenerating}
              onGenerateResponse={handleGenerateResponse}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Save Configuration Dialog */}
      <SaveConfigDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        onSave={saveCurrentConfig}
        currentName={currentConfig.name}
      />
    </div>
  );
};

export default AIModelConfigPanel;
