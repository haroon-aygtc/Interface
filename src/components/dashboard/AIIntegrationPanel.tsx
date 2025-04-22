import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Brain,
  MessageSquare,
  Database,
  Settings,
  Sparkles,
  Zap,
  BookOpen,
  FileText,
  MessageCircle,
  LayoutTemplate,
  Play,
  Save,
  Plus,
  Trash2,
  Edit,
  Copy,
  Check,
  RefreshCw,
  Loader2,
  Cog,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreatePromptDialog from "./ai-integration/CreatePromptDialog";
import SaveConfigDialog from "./ai-integration/SaveConfigDialog";
import ConfigurationTab from "./ai-integration/ConfigurationTab";
import FormattingTab from "./ai-integration/FormattingTab";
import KnowledgeTab from "./ai-integration/KnowledgeTab";
import TestTab from "./ai-integration/TestTab";

interface Prompt {
  id: string;
  name: string;
  content: string;
  description: string;
  category: string;
  isDefault?: boolean;
}

interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  lastUpdated: string;
  size: string;
}

interface ContextRule {
  id: string;
  name: string;
  description: string;
  type: "document" | "website" | "custom";
  content: string;
  priority: number;
  isActive: boolean;
}

interface FollowUpQuestion {
  id: string;
  question: string;
  context: string;
  isDefault?: boolean;
}

interface ResponseFormat {
  id: string;
  name: string;
  description: string;
  template: string;
  isDefault?: boolean;
}

interface AIConfig {
  name: string;
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  selectedPromptId: string;
  selectedKnowledgeBaseIds: string[];
  selectedContextRuleIds: string[];
  enableFollowUpQuestions: boolean;
  selectedFollowUpQuestionIds: string[];
  selectedResponseFormatId: string;
  customInstructions: string;
}

interface AIIntegrationPanelProps {
  defaultTab?: string;
}

const AIIntegrationPanel: React.FC<AIIntegrationPanelProps> = ({ defaultTab = "configuration" }) => {
  // Mock data
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: "p1",
      name: "Customer Support Agent",
      content:
        "You are a helpful customer support agent for our company. Answer customer questions accurately based on the provided knowledge base. If you don't know the answer, politely say so and offer to connect them with a human agent.",
      description: "Friendly customer support agent for general inquiries",
      category: "Support",
      isDefault: true,
    },
    {
      id: "p2",
      name: "Technical Documentation Assistant",
      content:
        "You are a technical documentation assistant. Provide clear, concise explanations of technical concepts and guide users through implementation steps based on our documentation.",
      description:
        "Technical assistant focused on documentation and implementation",
      category: "Documentation",
    },
    {
      id: "p3",
      name: "Product Recommendation Agent",
      content:
        "You are a product recommendation specialist. Based on the customer's needs and preferences, recommend the most suitable products from our catalog.",
      description: "Helps customers find the right products",
      category: "Sales",
    },
  ]);

  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
    {
      id: "kb1",
      name: "Product Documentation",
      description: "Official documentation for all our products and services",
      documentCount: 128,
      lastUpdated: "2023-06-15",
      size: "24.5 MB",
    },
    {
      id: "kb2",
      name: "FAQ Database",
      description: "Frequently asked questions and their answers",
      documentCount: 75,
      lastUpdated: "2023-06-10",
      size: "8.2 MB",
    },
    {
      id: "kb3",
      name: "Technical Guides",
      description: "Step-by-step technical guides and tutorials",
      documentCount: 42,
      lastUpdated: "2023-06-05",
      size: "15.7 MB",
    },
  ]);

  const [contextRules, setContextRules] = useState<ContextRule[]>([
    {
      id: "cr1",
      name: "Product Specifications",
      description: "Technical specifications for all products",
      type: "document",
      content: "product_specs.pdf",
      priority: 1,
      isActive: true,
    },
    {
      id: "cr2",
      name: "Pricing Information",
      description: "Current pricing and discount policies",
      type: "website",
      content: "https://example.com/pricing",
      priority: 2,
      isActive: true,
    },
    {
      id: "cr3",
      name: "Company Policies",
      description: "Return, refund, and shipping policies",
      type: "custom",
      content: "Our company has a 30-day return policy for all products...",
      priority: 3,
      isActive: false,
    },
  ]);

  const [followUpQuestions, setFollowUpQuestions] = useState<
    FollowUpQuestion[]
  >([
    {
      id: "fq1",
      question: "Would you like more details about this product?",
      context: "product_inquiry",
      isDefault: true,
    },
    {
      id: "fq2",
      question: "Do you need help with installation?",
      context: "technical_support",
      isDefault: true,
    },
    {
      id: "fq3",
      question: "Would you like to know about our pricing options?",
      context: "pricing",
      isDefault: false,
    },
  ]);

  const [responseFormats, setResponseFormats] = useState<ResponseFormat[]>([
    {
      id: "rf1",
      name: "Standard Response",
      description: "Clear, concise responses with a friendly tone",
      template: "{{greeting}}\n\n{{answer}}\n\n{{closing}}",
      isDefault: true,
    },
    {
      id: "rf2",
      name: "Technical Documentation",
      description: "Structured technical responses with code examples",
      template:
        "## {{title}}\n\n{{explanation}}\n\n```\n{{code_example}}\n```\n\n**Note:** {{note}}",
      isDefault: false,
    },
    {
      id: "rf3",
      name: "Step-by-Step Guide",
      description: "Numbered steps for processes and tutorials",
      template:
        "# {{title}}\n\n{{introduction}}\n\n1. {{step1}}\n2. {{step2}}\n3. {{step3}}\n\n{{conclusion}}",
      isDefault: false,
    },
  ]);

  // State for the current configuration
  const [currentConfig, setCurrentConfig] = useState<AIConfig>({
    name: "Default Configuration",
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1024,
    topP: 0.9,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    selectedPromptId: "p1",
    selectedKnowledgeBaseIds: ["kb1"],
    selectedContextRuleIds: ["cr1", "cr2"],
    enableFollowUpQuestions: true,
    selectedFollowUpQuestionIds: ["fq1", "fq2"],
    selectedResponseFormatId: "rf1",
    customInstructions: "",
  });

  // State for the test area
  const [testQuery, setTestQuery] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [configName, setConfigName] = useState("Default Configuration");
  const [isSaving, setIsSaving] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState<AIConfig[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newPromptDialog, setNewPromptDialog] = useState(false);
  const [newPrompt, setNewPrompt] = useState<{
    name: string;
    description: string;
    category: string;
    content: string;
  }>({
    name: "",
    description: "",
    category: "General",
    content: "",
  });

  // Function to handle saving a configuration
  const handleSaveConfig = () => {
    setIsSaving(true);
    // Simulate saving
    setTimeout(() => {
      const configToSave = { ...currentConfig, name: configName };
      setSavedConfigs([...savedConfigs, configToSave]);
      setIsSaving(false);
      setShowSaveDialog(false);
      setConfigName("Default Configuration");
    }, 1000);
  };

  // Function to handle loading a configuration
  const handleLoadConfig = (config: AIConfig) => {
    setCurrentConfig(config);
  };

  // Function to handle creating a new prompt
  const handleCreatePrompt = () => {
    const newPromptObj: Prompt = {
      id: `p${prompts.length + 1}`,
      ...newPrompt,
    };
    setPrompts([...prompts, newPromptObj]);
    setCurrentConfig({
      ...currentConfig,
      selectedPromptId: newPromptObj.id,
    });
    setNewPrompt({
      name: "",
      description: "",
      category: "General",
      content: "",
    });
    setNewPromptDialog(false);
  };

  // Function to handle generating a test response
  const handleGenerateResponse = () => {
    if (!testQuery.trim()) return;

    setIsGenerating(true);
    setTestResponse("");

    // Simulate API call with typing effect
    let response = "";
    if (currentConfig.selectedPromptId === "p1") {
      response =
        "Thank you for your question! Based on our product documentation, the feature you're asking about is available in the Pro and Enterprise plans. The setup process is straightforward - you can access it from your account settings under 'Advanced Features'. If you need any help with the setup, our support team is available 24/7 through the chat widget on our website.";
    } else if (currentConfig.selectedPromptId === "p2") {
      response =
        "# Setting Up API Integration\n\n## Prerequisites\n- Valid API key (generate from your dashboard)\n- Account with Developer access or higher\n\n## Implementation Steps\n1. Install our SDK using npm: `npm install @example/sdk`\n2. Initialize the client with your API key\n3. Make your first API call using the provided examples\n\n**Note:** Rate limits apply based on your subscription tier.";
    } else {
      response =
        "Based on your requirements, I recommend our Enterprise Solution package. It includes all the features you mentioned, plus dedicated support and custom integration options. The pricing starts at $499/month with annual billing, which gives you a 20% discount compared to monthly billing. Would you like me to connect you with a sales representative to discuss custom pricing options?";
    }

    let i = 0;
    const interval = setInterval(() => {
      setTestResponse(response.substring(0, i));
      i++;
      if (i > response.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 15);
  };

  // Function to handle changes to the current configuration
  const handleConfigChange = (key: keyof AIConfig, value: any) => {
    setCurrentConfig({
      ...currentConfig,
      [key]: value,
    });
  };

  // Function to toggle a knowledge base selection
  const toggleKnowledgeBase = (id: string) => {
    const currentSelection = [...currentConfig.selectedKnowledgeBaseIds];
    const index = currentSelection.indexOf(id);
    if (index === -1) {
      currentSelection.push(id);
    } else {
      currentSelection.splice(index, 1);
    }
    handleConfigChange("selectedKnowledgeBaseIds", currentSelection);
  };

  // Function to toggle a context rule selection
  const toggleContextRule = (id: string) => {
    const currentSelection = [...currentConfig.selectedContextRuleIds];
    const index = currentSelection.indexOf(id);
    if (index === -1) {
      currentSelection.push(id);
    } else {
      currentSelection.splice(index, 1);
    }
    handleConfigChange("selectedContextRuleIds", currentSelection);
  };

  // Function to toggle a follow-up question selection
  const toggleFollowUpQuestion = (id: string) => {
    const currentSelection = [...currentConfig.selectedFollowUpQuestionIds];
    const index = currentSelection.indexOf(id);
    if (index === -1) {
      currentSelection.push(id);
    } else {
      currentSelection.splice(index, 1);
    }
    handleConfigChange("selectedFollowUpQuestionIds", currentSelection);
  };

  const aiIntegrationActions = (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => setShowSaveDialog(true)}>
        <Save className="mr-2 h-4 w-4" /> Save Configuration
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Load Configuration</Button>
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
      <div className="space-y-6 max-w-5xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="configuration">
              <MessageSquare className="mr-2 h-4 w-4" /> AI Basics
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <LayoutTemplate className="mr-2 h-4 w-4" /> Formatting & Branding
            </TabsTrigger>
            <TabsTrigger value="knowledge">
              <Database className="mr-2 h-4 w-4" /> Knowledge Sources
            </TabsTrigger>
            <TabsTrigger value="test">
              <Play className="mr-2 h-4 w-4" /> Test & Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configuration" className="space-y-6 mt-6">

            <ConfigurationTab
              prompts={prompts}
              followUpQuestions={followUpQuestions}
              currentConfig={currentConfig}
              onConfigChange={handleConfigChange}
              onToggleFollowUpQuestion={toggleFollowUpQuestion}
              onOpenNewPromptDialog={() => setNewPromptDialog(true)}
            />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Formatting & Branding</h2>
                <p className="text-muted-foreground">Customize how responses look, sound, and represent your brand</p>
              </div>
              {aiIntegrationActions}
            </div>

            <FormattingTab
              followUpQuestions={followUpQuestions}
              responseFormats={responseFormats}
              currentConfig={currentConfig}
              onConfigChange={handleConfigChange}
            />
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Knowledge Sources</h2>
                <p className="text-muted-foreground">Connect your data sources to ground AI responses with accurate information</p>
              </div>
              {aiIntegrationActions}
            </div>

            <KnowledgeTab
              knowledgeBases={knowledgeBases}
              contextRules={contextRules}
              currentConfig={currentConfig}
              onToggleKnowledgeBase={toggleKnowledgeBase}
              onToggleContextRule={toggleContextRule}
            />
          </TabsContent>

          <TabsContent value="test" className="space-y-6 mt-6">

            <TestTab
              currentConfig={currentConfig}
              prompts={prompts}
              responseFormats={responseFormats}
            />
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <SaveConfigDialog
          open={showSaveDialog}
          onOpenChange={setShowSaveDialog}
          currentConfig={currentConfig}
          onSaveConfig={handleSaveConfig}
        />

        <CreatePromptDialog
          open={newPromptDialog}
          onOpenChange={setNewPromptDialog}
          onCreatePrompt={handleCreatePrompt}
        />
      </div>
    </div>
  );
};

export default AIIntegrationPanel;
