// AI Integration types

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

export interface AIIntegrationPanelProps {
  defaultTab?: string;
}
