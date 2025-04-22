// Mock data store for the application
// This file contains all the mock data used throughout the application
// to simulate backend responses

// User data
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Test User",
    email: "user@example.com",
    role: "user",
  },
];

// AI Models
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: string[];
  isAvailable: boolean;
}

export const mockAIModels: AIModel[] = [
  {
    id: "model1",
    name: "GPT-4",
    provider: "OpenAI",
    description: "Advanced language model with strong reasoning capabilities",
    capabilities: ["Text Generation", "Code Generation", "Reasoning", "Creative Writing"],
    isAvailable: true,
  },
  {
    id: "model2",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "State-of-the-art language model with excellent instruction following",
    capabilities: ["Text Generation", "Reasoning", "Document Analysis", "Creative Writing"],
    isAvailable: true,
  },
  {
    id: "model3",
    name: "Gemini Pro",
    provider: "Google",
    description: "Multimodal model with strong reasoning capabilities",
    capabilities: ["Text Generation", "Image Understanding", "Reasoning"],
    isAvailable: true,
  },
  {
    id: "model4",
    name: "Llama 3",
    provider: "Meta",
    description: "Open-source language model with good performance",
    capabilities: ["Text Generation", "Reasoning", "Creative Writing"],
    isAvailable: false,
  },
];

// Knowledge Bases
export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  lastUpdated: string;
  size: string;
}

export const mockKnowledgeBases: KnowledgeBase[] = [
  {
    id: "kb1",
    name: "Product Documentation",
    description: "Official product documentation and guides",
    documentCount: 128,
    lastUpdated: "2023-04-15",
    size: "24.5 MB",
  },
  {
    id: "kb2",
    name: "Support Articles",
    description: "Customer support articles and troubleshooting guides",
    documentCount: 256,
    lastUpdated: "2023-04-10",
    size: "42.8 MB",
  },
  {
    id: "kb3",
    name: "API Documentation",
    description: "API reference and integration guides",
    documentCount: 64,
    lastUpdated: "2023-04-05",
    size: "12.3 MB",
  },
];

// Context Rules
export interface ContextRule {
  id: string;
  name: string;
  description: string;
  type: "keyword" | "regex" | "semantic" | "custom";
  pattern: string;
  action: "include" | "exclude" | "prioritize" | "transform";
  priority: number;
  isActive: boolean;
}

export const mockContextRules: ContextRule[] = [
  {
    id: "cr1",
    name: "Product Information",
    description: "Include product specifications and pricing details",
    type: "keyword",
    pattern: "product, pricing, specifications, features",
    action: "include",
    priority: 10,
    isActive: true,
  },
  {
    id: "cr2",
    name: "Personal Information Filter",
    description: "Exclude personal identifiable information",
    type: "regex",
    pattern: "\\b\\d{3}-\\d{2}-\\d{4}\\b|\\b\\d{16}\\b",
    action: "exclude",
    priority: 20,
    isActive: true,
  },
  {
    id: "cr3",
    name: "Technical Content Boost",
    description: "Prioritize technical documentation",
    type: "semantic",
    pattern: "technical, documentation, guide, tutorial",
    action: "prioritize",
    priority: 15,
    isActive: true,
  },
];

// Prompt Templates
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  isDefault?: boolean;
}

export const mockPromptTemplates: PromptTemplate[] = [
  {
    id: "p1",
    name: "Customer Support",
    description: "General customer support prompt template",
    content: "You are a helpful customer support assistant for our product. Answer the user's question based on our documentation. Be friendly and concise.",
    category: "Support",
    isDefault: true,
  },
  {
    id: "p2",
    name: "Technical Documentation",
    description: "Technical documentation and API help",
    content: "You are a technical documentation assistant. Provide detailed, accurate information about our APIs, features, and technical specifications. Use markdown formatting for code examples.",
    category: "Technical",
  },
  {
    id: "p3",
    name: "Sales Assistant",
    description: "Help with product selection and pricing",
    content: "You are a sales assistant helping customers choose the right product and plan. Explain features, pricing, and benefits clearly. Don't make up information about pricing or features.",
    category: "Sales",
  },
  {
    id: "p4",
    name: "Onboarding Guide",
    description: "Help new users get started",
    content: "You are an onboarding assistant helping new users get started with our platform. Provide step-by-step guidance, explain core features, and help troubleshoot common issues.",
    category: "Onboarding",
  },
];

// Response Formats
export interface ResponseFormat {
  id: string;
  name: string;
  description: string;
  format: string;
}

export const mockResponseFormats: ResponseFormat[] = [
  {
    id: "rf1",
    name: "Conversational",
    description: "Natural, conversational responses",
    format: "conversational",
  },
  {
    id: "rf2",
    name: "Markdown",
    description: "Structured responses with markdown formatting",
    format: "markdown",
  },
  {
    id: "rf3",
    name: "Bullet Points",
    description: "Concise responses with bullet points",
    format: "bullet-points",
  },
  {
    id: "rf4",
    name: "Step-by-Step",
    description: "Detailed step-by-step instructions",
    format: "step-by-step",
  },
];

// Follow-up Questions
export interface FollowUpQuestion {
  id: string;
  question: string;
  category: string;
}

export const mockFollowUpQuestions: FollowUpQuestion[] = [
  {
    id: "fq1",
    question: "Can you tell me more about this feature?",
    category: "General",
  },
  {
    id: "fq2",
    question: "How do I set this up?",
    category: "Technical",
  },
  {
    id: "fq3",
    question: "What pricing plans include this?",
    category: "Sales",
  },
  {
    id: "fq4",
    question: "Are there any alternatives to this approach?",
    category: "Support",
  },
];

// Analytics Data
export interface AnalyticsData {
  date: string;
  conversations: number;
  users: number;
  avgResponseTime: number;
  satisfactionRate: number;
}

export const mockAnalyticsData: AnalyticsData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));

  return {
    date: date.toISOString().split('T')[0],
    conversations: Math.floor(Math.random() * 100) + 50,
    users: Math.floor(Math.random() * 50) + 20,
    avgResponseTime: Math.random() * 2 + 0.5,
    satisfactionRate: Math.random() * 20 + 75,
  };
});

// Web Scraping Data
export interface ScrapedData {
  id: string;
  url: string;
  title: string;
  content: string;
  scrapedAt: string;
  status: "success" | "partial" | "failed";
}

export const mockScrapedData: ScrapedData[] = [
  {
    id: "sd1",
    url: "https://example.com/product",
    title: "Product Features | Example Company",
    content: "Our product offers state-of-the-art features including AI-powered recommendations, real-time analytics, and seamless integrations with your existing tools. With our intuitive interface, you can get started in minutes without extensive training.",
    scrapedAt: "2023-04-15T10:30:00Z",
    status: "success",
  },
  {
    id: "sd2",
    url: "https://example.com/pricing",
    title: "Pricing Plans | Example Company",
    content: "We offer flexible pricing plans to suit businesses of all sizes. Our Starter plan begins at $29/month and includes basic features. The Pro plan at $99/month adds advanced analytics and priority support. Enterprise plans with custom features are available upon request.",
    scrapedAt: "2023-04-14T14:45:00Z",
    status: "success",
  },
  {
    id: "sd3",
    url: "https://example.com/support",
    title: "Support Center | Example Company",
    content: "Our support team is available 24/7 to help you with any issues. You can reach us via chat, email, or phone. For common questions, please check our knowledge base first.",
    scrapedAt: "2023-04-13T09:15:00Z",
    status: "partial",
  },
];

// System Configuration
export interface SystemConfig {
  id: string;
  name: string;
  value: string | number | boolean;
  category: string;
  description: string;
}

export const mockSystemConfig: SystemConfig[] = [
  {
    id: "config1",
    name: "defaultAIModel",
    value: "model1",
    category: "AI",
    description: "Default AI model to use for new configurations",
  },
  {
    id: "config2",
    name: "maxTokens",
    value: 1024,
    category: "AI",
    description: "Maximum tokens to generate in responses",
  },
  {
    id: "config3",
    name: "defaultTemperature",
    value: 0.7,
    category: "AI",
    description: "Default temperature setting for AI responses",
  },
  {
    id: "config4",
    name: "enableLogging",
    value: true,
    category: "System",
    description: "Enable detailed logging of AI interactions",
  },
];

// Notifications
export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "New AI Model Available",
    description: "Gemini Ultra is now available for integration.",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Web Scraping Job Completed",
    description: "Your scheduled scraping job has completed successfully.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "System Update",
    description: "The system will undergo maintenance tonight at 2 AM UTC.",
    time: "3 hours ago",
    read: true,
  },
];

// Usage Data for Charts
export interface UsageData {
  name: string;
  daily: number;
  weekly: number;
  monthly: number;
}

export const mockUsageData: UsageData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  return {
    name: `${month}/${day}`,
    daily: Math.floor(Math.random() * 60) + 30,
    weekly: Math.floor(Math.random() * 100) + 100,
    monthly: Math.floor(Math.random() * 200) + 400,
  };
});

// Model Performance Data
export interface ModelPerformance {
  name: string;
  score: number;
  color: string;
}

export const mockModelPerformanceData: ModelPerformance[] = [
  { name: 'GPT-4', score: 92, color: '#10b981' },      // emerald-500
  { name: 'Claude 3', score: 88, color: '#22c55e' },   // green-500
  { name: 'Llama 3', score: 82, color: '#14b8a6' },    // teal-500
  { name: 'Custom Model', score: 76, color: '#06b6d4' }, // cyan-500
];

// Query Categories Data
export interface QueryCategory {
  name: string;
  value: number;
  color: string;
}

export const mockQueryCategories: QueryCategory[] = [
  { name: 'Product', value: 40, color: '#9333ea' },  // purple-600
  { name: 'Support', value: 35, color: '#ec4899' },   // pink-500
  { name: 'General', value: 25, color: '#6366f1' },   // indigo-500
];

// Recent Activities
export interface Activity {
  time: string;
  event: string;
  description: string;
  status: "success" | "warning" | "info" | "error";
  iconType?: "database" | "sparkles" | "messageSquare" | "activity";
}

export const mockActivities: Activity[] = [
  {
    time: "10 minutes ago",
    event: "New user registered",
    description: "John Doe (john@example.com) created an account",
    status: "success",
    iconType: "database",
  },
  {
    time: "30 minutes ago",
    event: "New scraping job completed",
    description: "Web content from 3 sources processed successfully",
    status: "success",
    iconType: "database",
  },
  {
    time: "1 hour ago",
    event: "AI model configuration updated",
    description: "Temperature and max tokens parameters modified",
    status: "info",
    iconType: "sparkles",
  },
  {
    time: "3 hours ago",
    event: "New prompt template created",
    description: "'Product Support Assistant' template added",
    status: "info",
    iconType: "messageSquare",
  },
  {
    time: "1 day ago",
    event: "System maintenance performed",
    description: "Database optimization and cache clearing",
    status: "warning",
    iconType: "activity",
  },
];

// Knowledge Items
export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  source: string;
  sourceType: "manual" | "scraping" | "upload" | "api";
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "archived" | "draft";
  priority: number;
}

export const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: "ki1",
    title: "Getting Started Guide",
    content: "This guide helps new users get started with our platform...",
    source: "Internal Documentation",
    sourceType: "manual",
    category: "cat1",
    tags: ["onboarding", "beginner"],
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-04-10"),
    status: "active",
    priority: 10,
  },
  {
    id: "ki2",
    title: "API Reference",
    content: "Complete API reference documentation for developers...",
    source: "https://example.com/api-docs",
    sourceType: "scraping",
    category: "cat2",
    tags: ["api", "development", "technical"],
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-04-05"),
    status: "active",
    priority: 8,
  },
  {
    id: "ki3",
    title: "Troubleshooting Common Issues",
    content: "Solutions for the most common problems users encounter...",
    source: "Support Team",
    sourceType: "manual",
    category: "cat3",
    tags: ["support", "troubleshooting"],
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-28"),
    status: "active",
    priority: 9,
  },
];

// Knowledge Categories
export interface KnowledgeCategory {
  id: string;
  name: string;
  description: string;
  itemCount: number;
}

export const mockKnowledgeCategories: KnowledgeCategory[] = [
  {
    id: "cat1",
    name: "Getting Started",
    description: "Onboarding and introductory materials",
    itemCount: 12,
  },
  {
    id: "cat2",
    name: "Technical Documentation",
    description: "Technical guides and API documentation",
    itemCount: 28,
  },
  {
    id: "cat3",
    name: "Support Articles",
    description: "Troubleshooting and support materials",
    itemCount: 35,
  },
  {
    id: "cat4",
    name: "Best Practices",
    description: "Recommended approaches and best practices",
    itemCount: 15,
  },
];

// Selector Groups for Web Scraping
export interface SelectorGroup {
  id: string;
  name: string;
  description: string;
  selectors: Selector[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Selector {
  id: string;
  name: string;
  cssPath: string;
  description: string;
}

export const mockSelectorGroups: SelectorGroup[] = [
  {
    id: "sg1",
    name: "Blog Articles",
    description: "Selectors for extracting blog article content",
    selectors: [
      {
        id: "s1",
        name: "Article Title",
        cssPath: "article h1.title",
        description: "The main title of the blog article",
      },
      {
        id: "s2",
        name: "Article Content",
        cssPath: "article .content",
        description: "The main content of the blog article",
      },
      {
        id: "s3",
        name: "Author",
        cssPath: "article .author-info .name",
        description: "The author's name",
      },
    ],
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-04-05"),
  },
  {
    id: "sg2",
    name: "Product Pages",
    description: "Selectors for extracting product information",
    selectors: [
      {
        id: "s4",
        name: "Product Name",
        cssPath: ".product-details h1",
        description: "The product name",
      },
      {
        id: "s5",
        name: "Product Description",
        cssPath: ".product-details .description",
        description: "The product description",
      },
      {
        id: "s6",
        name: "Price",
        cssPath: ".product-details .price",
        description: "The product price",
      },
    ],
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-03-20"),
  },
];

// Mock API responses
export const mockResponses = {
  testAIModel: {
    success: "Quantum computing uses quantum bits or qubits which can exist in multiple states simultaneously, unlike classical bits that are either 0 or 1. This property, called superposition, allows quantum computers to process vast amounts of information more efficiently for certain types of problems.",
    error: "Error: Invalid API key or connection failed. Please check your credentials and try again.",
  },
  testPrompt: {
    customerSupport: "Thank you for your question! Based on our product documentation, the feature you're asking about is available in the Pro and Enterprise plans. The setup process is straightforward - you can access it from your account settings under 'Advanced Features'. If you need any help with the setup, our support team is available 24/7 through the chat widget on our website.",
    technicalDoc: "# Setting Up API Integration\n\n## Prerequisites\n- Valid API key (generate from your dashboard)\n- Account with Developer access or higher\n\n## Implementation Steps\n1. Install our SDK using npm: `npm install @example/sdk`\n2. Initialize the client with your API key\n3. Make your first API call using the provided examples\n\n**Note:** Rate limits apply based on your subscription tier.",
    onboarding: "Welcome to our platform! Here's how to get started in 3 easy steps:\n\n1. Complete your profile setup by adding your company information\n2. Connect your first data source using our integration wizard\n3. Create your first project by clicking the '+ New Project' button\n\nIf you need any help along the way, our support team is available via chat or email.",
  },
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  REMEMBERED_EMAIL: "rememberedEmail",
  THEME: "theme",
  USER_PREFERENCES: "userPreferences",
};
