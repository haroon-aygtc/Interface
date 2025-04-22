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
  {
    id: "p4",
    name: "Al Yalayis Government Assistant",
    content:
      "You are a specialized assistant for Al Yalayis Government Transaction Center. Help users navigate available UAE government services, document requirements, and procedures. Provide accurate information about visa services, business licensing, and other government transactions.",
    description: "Specialized assistant for UAE government services",
    category: "Government",
  },
  {
    id: "p5",
    name: "Al Yalayis Property Consultant",
    content:
      "You are a property consultant for Al Yalayis Property. Assist clients with information about real estate options across UAE, including buying, selling, and renting. Provide market insights, property valuations, and guidance on documentation.",
    description: "Real estate and property transaction specialist",
    category: "Property",
  },
  {
    id: "p6",
    name: "Super Wheel Transport Concierge",
    content:
      "You are a luxury transport concierge for Super Wheel VIP transport services. Help clients book premium transportation, suggest suitable vehicle options, and provide information about special services like airport transfers and chauffeur services across UAE.",
    description: "Luxury transport booking assistant",
    category: "Transport",
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
    name: "UAE Government Services",
    description: "Comprehensive guide to all UAE government services",
    documentCount: 156,
    lastUpdated: "2023-07-20",
    size: "32.8 MB",
  },
  {
    id: "kb5",
    name: "UAE Property Market",
    description: "Data on UAE real estate market, transactions, and regulations",
    documentCount: 89,
    lastUpdated: "2023-07-15",
    size: "18.3 MB",
  },
  {
    id: "kb6",
    name: "Business Knowledge Base",
    description: "Information on business setup, licensing, and operations in UAE",
    documentCount: 65,
    lastUpdated: "2023-06-28",
    size: "12.1 MB",
  },
];

// Mock context rules data
export const mockContextRules: ContextRule[] = [
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
  {
    id: "cr4",
    name: "UAE Visa Regulations",
    description: "Latest UAE visa regulations and requirements",
    type: "document",
    content: "uae_visa_regulations_2023.pdf",
    priority: 1,
    isActive: true,
  },
  {
    id: "cr5",
    name: "Property Transaction Procedures",
    description: "Step-by-step guide to property transactions in UAE",
    type: "document",
    content: "property_transaction_guide.pdf",
    priority: 2,
    isActive: true,
  },
  {
    id: "cr6",
    name: "Transport Service Terms",
    description: "Terms and conditions for luxury transport services",
    type: "custom",
    content: "Super Wheel provides luxury transport services across UAE with premium vehicles and professional chauffeurs...",
    priority: 3,
    isActive: true,
  },
];

// Mock follow-up questions data
export const mockFollowUpQuestions: FollowUpQuestion[] = [
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
  {
    id: "fq4",
    question: "Would you like to schedule an appointment?",
    context: "service_booking",
    isDefault: true,
  },
  {
    id: "fq5",
    question: "Do you need information about required documents?",
    context: "documentation",
    isDefault: true,
  },
  {
    id: "fq6",
    question: "Would you like to speak with a human agent?",
    context: "human_support",
    isDefault: false,
  },
  {
    id: "fq7",
    question: "Do you want to see our latest offerings?",
    context: "promotions",
    isDefault: false,
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
    name: "Al Yalayis Service Format",
    description: "Formal response format for Al Yalayis business services",
    template:
      "# {{service_name}}\n\n**Description:** {{description}}\n\n## Requirements\n{{requirements}}\n\n## Process\n{{process}}\n\n## Timeframe & Fees\n{{timeframe_fees}}\n\n## Need Assistance?\n{{assistance_options}}",
    isDefault: false,
  },
  {
    id: "rf5",
    name: "FAQ Style Response",
    description: "Question and answer format for quick information",
    template:
      "## {{question}}\n\n{{answer}}\n\n### Related Information\n{{related_info}}",
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
