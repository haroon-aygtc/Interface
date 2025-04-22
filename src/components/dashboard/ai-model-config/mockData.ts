import { Prompt, KnowledgeBase, ContextRule, FollowUpQuestion, ResponseFormat, AIConfig } from './types';

// Mock prompts data
export const mockPrompts: Prompt[] = [
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
      "You are a technical documentation assistant. Provide detailed, accurate information about our APIs, features, and technical specifications. Use markdown formatting for code examples and structured responses.",
    description: "Technical assistant for developers and advanced users",
    category: "Technical",
    isDefault: false,
  },
  {
    id: "p3",
    name: "Product Recommendation Expert",
    content:
      "You are a product recommendation expert. Based on the customer's needs and preferences, recommend the most suitable products from our catalog. Explain the key features and benefits of each recommendation.",
    description: "Helps customers find the right products",
    category: "Sales",
    isDefault: false,
  },
  {
    id: "p4",
    name: "Onboarding Guide",
    content:
      "You are an onboarding guide for new users. Explain how to get started with our platform in a clear, step-by-step manner. Focus on the most important features for beginners and provide helpful tips.",
    description: "Guides new users through the platform",
    category: "Onboarding",
    isDefault: false,
  },
  {
    id: "p5",
    name: "Data Analysis Assistant",
    content:
      "You are a data analysis assistant. Help users understand their data, provide insights, and suggest visualizations. Explain complex concepts in simple terms and offer actionable recommendations.",
    description: "Helps users analyze and understand their data",
    category: "Analytics",
    isDefault: false,
  },
];

// Mock knowledge bases data
export const mockKnowledgeBases: KnowledgeBase[] = [
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
  {
    id: "kb4",
    name: "API Reference",
    description: "Comprehensive API documentation and examples",
    documentCount: 56,
    lastUpdated: "2023-06-12",
    size: "12.3 MB",
  },
  {
    id: "kb5",
    name: "Customer Support Articles",
    description: "Articles and guides for customer support agents",
    documentCount: 93,
    lastUpdated: "2023-06-08",
    size: "18.9 MB",
  },
];

// Mock context rules data
export const mockContextRules: ContextRule[] = [
  {
    id: "cr1",
    name: "Company Information",
    description: "Basic information about our company and values",
    type: "custom",
    content: "Our company was founded in 2010 and specializes in AI-powered solutions for businesses. We prioritize customer satisfaction, innovation, and ethical AI use.",
    priority: 10,
    isActive: true,
  },
  {
    id: "cr2",
    name: "Product Limitations",
    description: "Known limitations and edge cases of our products",
    type: "document",
    content: "Our products currently have the following limitations: 1) Maximum file size of 100MB, 2) Support for English language only, 3) Requires modern browsers (Chrome, Firefox, Safari, Edge).",
    priority: 8,
    isActive: true,
  },
  {
    id: "cr3",
    name: "Pricing Information",
    description: "Current pricing plans and features",
    type: "website",
    content: "We offer three pricing tiers: Basic ($10/month), Pro ($25/month), and Enterprise (custom pricing). Each tier includes different feature sets and usage limits.",
    priority: 7,
    isActive: true,
  },
  {
    id: "cr4",
    name: "Compliance Guidelines",
    description: "Regulatory and compliance information",
    type: "custom",
    content: "Our platform is GDPR compliant and follows industry best practices for data security. We do not store personal data unless explicitly authorized by users.",
    priority: 9,
    isActive: true,
  },
  {
    id: "cr5",
    name: "Support Protocols",
    description: "Guidelines for support interactions",
    type: "document",
    content: "When providing support, always verify the user's identity, be empathetic, and follow up within 24 hours. Escalate critical issues to the support manager.",
    priority: 6,
    isActive: true,
  },
];

// Mock follow-up questions data
export const mockFollowUpQuestions: FollowUpQuestion[] = [
  {
    id: "fq1",
    question: "Would you like to learn more about our pricing plans?",
    context: "pricing, plans, subscription, cost",
    isDefault: true,
  },
  {
    id: "fq2",
    question: "Do you need help setting up your account?",
    context: "setup, account, configuration, getting started",
    isDefault: true,
  },
  {
    id: "fq3",
    question: "Would you like to see a demo of this feature?",
    context: "demo, feature, how to, tutorial",
    isDefault: false,
  },
  {
    id: "fq4",
    question: "Are you experiencing any technical issues?",
    context: "issue, problem, error, bug, technical",
    isDefault: false,
  },
  {
    id: "fq5",
    question: "Would you like to upgrade your plan for more features?",
    context: "upgrade, plan, features, premium",
    isDefault: false,
  },
  {
    id: "fq6",
    question: "Do you have any other questions about our products?",
    context: "product, question, information",
    isDefault: true,
  },
];

// Mock response formats data
export const mockResponseFormats: ResponseFormat[] = [
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
  {
    id: "rf4",
    name: "FAQ Style",
    description: "Question and answer format for FAQs",
    template:
      "## {{question}}\n\n{{answer}}\n\n---\n\n**Related Information:**\n\n{{related_info}}",
    isDefault: false,
  },
  {
    id: "rf5",
    name: "Product Comparison",
    description: "Side-by-side comparison of products or features",
    template:
      "# {{title}}\n\n## Feature Comparison\n\n| Feature | {{product1}} | {{product2}} |\n|---------|------------|------------|\n| {{feature1}} | {{p1f1}} | {{p2f1}} |\n| {{feature2}} | {{p1f2}} | {{p2f2}} |\n| {{feature3}} | {{p1f3}} | {{p2f3}} |\n\n{{recommendation}}",
    isDefault: false,
  },
];

// Default AI config
export const defaultAIConfig: AIConfig = {
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
};
