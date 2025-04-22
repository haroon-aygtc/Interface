// AI Model Configuration types

export interface Prompt {
  id: string;
  name: string;
  content: string;
  description: string;
  category: string;
  isDefault?: boolean;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  lastUpdated: string;
  size: string;
}

export interface ContextRule {
  id: string;
  name: string;
  description: string;
  type: "document" | "website" | "custom";
  content: string;
  priority: number;
  isActive: boolean;
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  context: string;
  isDefault?: boolean;
}

export interface ResponseFormat {
  id: string;
  name: string;
  description: string;
  template: string;
  isDefault?: boolean;
}

export interface ResponseSection {
  id: string;
  type: "heading" | "paragraph" | "list" | "code" | "divider" | "callout";
  content: string;
  order: number;
}

export interface AIConfig {
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

export interface AIModelConfigPanelProps {
  defaultTab?: string;
}

export interface BasicConfigTabProps {
  currentConfig: AIConfig;
  onConfigChange: (key: keyof AIConfig, value: any) => void;
}

export interface PromptTemplateTabProps {
  prompts: Prompt[];
  setPrompts: React.Dispatch<React.SetStateAction<Prompt[]>>;
  currentConfig: AIConfig;
  onConfigChange: (key: keyof AIConfig, value: any) => void;
}

export interface KnowledgeSourceTabProps {
  knowledgeBases: KnowledgeBase[];
  contextRules: ContextRule[];
  currentConfig: AIConfig;
  onToggleKnowledgeBase: (id: string) => void;
  onToggleContextRule: (id: string) => void;
}

export interface ResponseFormatterTabProps {
  responseFormats: ResponseFormat[];
  setResponseFormats: React.Dispatch<React.SetStateAction<ResponseFormat[]>>;
  currentConfig: AIConfig;
  onConfigChange: (key: keyof AIConfig, value: any) => void;
}

export interface FollowUpFlowTabProps {
  followUpQuestions: FollowUpQuestion[];
  setFollowUpQuestions: React.Dispatch<React.SetStateAction<FollowUpQuestion[]>>;
  currentConfig: AIConfig;
  onConfigChange: (key: keyof AIConfig, value: any) => void;
  onToggleFollowUpQuestion: (id: string) => void;
}

export interface TestPreviewTabProps {
  currentConfig: AIConfig;
  prompts: Prompt[];
  responseFormats: ResponseFormat[];
  knowledgeBases: KnowledgeBase[];
  followUpQuestions: FollowUpQuestion[];
  testQuery: string;
  setTestQuery: React.Dispatch<React.SetStateAction<string>>;
  testResponse: string;
  isGenerating: boolean;
  onGenerateResponse: () => void;
}

export interface SaveConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string) => void;
  currentName: string;
}
