import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Copy,
  Play,
  RefreshCw,
  MessageSquare,
  FileText,
  Tag,
  Check,
  SearchIcon,
} from "lucide-react";

interface PromptVariable {
  name: string;
  description: string;
  defaultValue: string;
}

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: "general" | "customer-support" | "sales" | "technical" | "custom";
  template: string;
  variables: PromptVariable[];
  createdAt: Date;
  updatedAt: Date;
}

interface PromptTemplatesPanelProps {
  defaultTab?: string;
}

const PromptTemplatesPanel: React.FC<PromptTemplatesPanelProps> = ({ defaultTab = "templates-list" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedTemplate, setSelectedTemplate] =
    useState<PromptTemplate | null>(null);
  const [testVariables, setTestVariables] = useState<Record<string, string>>(
    {},
  );
  const [testResult, setTestResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Mock data for prompt templates
  const [templates, setTemplates] = useState<PromptTemplate[]>([
    {
      id: "1",
      name: "Product Information Response",
      description: "Template for responding to product information queries",
      category: "sales",
      template:
        "Here's information about {{product_name}}:\n\n{{product_description}}\n\nKey features:\n{{product_features}}\n\nPrice: {{product_price}}\n\nIs there anything specific about {{product_name}} you'd like to know?",
      variables: [
        {
          name: "product_name",
          description: "Name of the product",
          defaultValue: "AI Chat Widget Pro",
        },
        {
          name: "product_description",
          description: "Brief description of the product",
          defaultValue: "Our premium AI-powered chat widget for websites",
        },
        {
          name: "product_features",
          description: "Bullet points of product features",
          defaultValue:
            "- Customizable appearance\n- Multi-language support\n- Advanced analytics\n- Context-aware responses",
        },
        {
          name: "product_price",
          description: "Product pricing information",
          defaultValue: "$49/month",
        },
      ],
      createdAt: new Date(2023, 4, 15),
      updatedAt: new Date(2023, 5, 20),
    },
    {
      id: "2",
      name: "Technical Support Initial Response",
      description: "Template for initial response to technical support queries",
      category: "technical",
      template:
        "I understand you're experiencing an issue with {{issue_topic}}. I'm here to help.\n\nCould you please provide the following information to help me troubleshoot:\n\n1. What version of {{product_name}} are you using?\n2. When did you first notice this issue?\n3. Have you made any recent changes to your configuration?\n\n{{additional_questions}}",
      variables: [
        {
          name: "issue_topic",
          description: "The general topic of the technical issue",
          defaultValue: "widget installation",
        },
        {
          name: "product_name",
          description: "Name of the product",
          defaultValue: "AI Chat Widget",
        },
        {
          name: "additional_questions",
          description: "Any additional questions specific to the issue",
          defaultValue:
            "4. Which browser are you using?\n5. Is the issue happening on all pages or just specific ones?",
        },
      ],
      createdAt: new Date(2023, 3, 10),
      updatedAt: new Date(2023, 3, 10),
    },
    {
      id: "3",
      name: "Welcome Message",
      description: "Initial greeting when a user opens the chat widget",
      category: "general",
      template:
        "{{greeting}}, I'm {{bot_name}}, your AI assistant for {{company_name}}. {{welcome_message}} {{prompt_question}}",
      variables: [
        {
          name: "greeting",
          description: "Time-appropriate greeting",
          defaultValue: "Hello",
        },
        {
          name: "bot_name",
          description: "Name of the AI assistant",
          defaultValue: "ChatBot",
        },
        {
          name: "company_name",
          description: "Company name",
          defaultValue: "Acme Inc",
        },
        {
          name: "welcome_message",
          description: "Brief welcome message",
          defaultValue:
            "I'm here to help answer your questions about our products and services.",
        },
        {
          name: "prompt_question",
          description: "Question to prompt user engagement",
          defaultValue: "How can I assist you today?",
        },
      ],
      createdAt: new Date(2023, 2, 5),
      updatedAt: new Date(2023, 6, 12),
    },
  ]);

  const handleEditTemplate = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setActiveTab("create-edit");
    // Initialize test variables with default values
    const initialVariables: Record<string, string> = {};
    template.variables.forEach((variable) => {
      initialVariables[variable.name] = variable.defaultValue;
    });
    setTestVariables(initialVariables);
  };

  const handleCreateNewTemplate = () => {
    setSelectedTemplate(null);
    setActiveTab("create-edit");
    setTestVariables({});
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter((template) => template.id !== templateId));
  };

  const handleTestTemplate = () => {
    if (!selectedTemplate) return;

    let result = selectedTemplate.template;

    // Replace all variables in the template
    Object.entries(testVariables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
      result = result.replace(regex, value);
    });

    setTestResult(result);
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(
      testResult || selectedTemplate?.template || "",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVariableChange = (name: string, value: string) => {
    setTestVariables((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getCategoryBadge = (category: PromptTemplate["category"]) => {
    switch (category) {
      case "general":
        return <Badge className="bg-gray-500">General</Badge>;
      case "customer-support":
        return <Badge className="bg-blue-500">Customer Support</Badge>;
      case "sales":
        return <Badge className="bg-green-500">Sales</Badge>;
      case "technical":
        return <Badge className="bg-orange-500">Technical</Badge>;
      case "custom":
        return <Badge className="bg-purple-500">Custom</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex justify-end">
          <Button onClick={handleCreateNewTemplate}>
            <Plus className="mr-2 h-4 w-4" /> Create New Template
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="templates-list">Templates Library</TabsTrigger>
            <TabsTrigger value="create-edit">
              {selectedTemplate ? "Edit Template" : "Create Template"}
            </TabsTrigger>
            <TabsTrigger value="test-template" disabled={!selectedTemplate}>
              Test Template
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates-list" className="space-y-4">
            <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <CardTitle>Prompt Templates</CardTitle>
                <CardDescription>
                  Manage reusable prompt templates for consistent AI responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Input
                    placeholder="Search templates..."
                    className="max-w-sm mr-2"
                    prefix={<SearchIcon className="h-4 w-4 text-muted-foreground" />}
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="customer-support">
                        Customer Support
                      </SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Variables</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{template.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {template.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getCategoryBadge(template.category)}
                        </TableCell>
                        <TableCell>{template.variables.length}</TableCell>
                        <TableCell>
                          {template.updatedAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                handleEditTemplate(template);
                                setActiveTab("test-template");
                              }}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditTemplate(template)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteTemplate(template.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create-edit">
            <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <CardTitle>
                  {selectedTemplate
                    ? "Edit Prompt Template"
                    : "Create New Prompt Template"}
                </CardTitle>
                <CardDescription>
                  {selectedTemplate
                    ? "Modify this prompt template and its variables"
                    : "Design a new reusable prompt template with variables"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      placeholder="e.g., Product Information Response"
                      defaultValue={selectedTemplate?.name || ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template-category">Category</Label>
                    <Select
                      defaultValue={selectedTemplate?.category || "general"}
                    >
                      <SelectTrigger id="template-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="customer-support">
                          Customer Support
                        </SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-description">Description</Label>
                  <Textarea
                    id="template-description"
                    placeholder="Describe what this template is used for"
                    defaultValue={selectedTemplate?.description || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-content">Template Content</Label>
                  <Textarea
                    id="template-content"
                    placeholder="Enter your prompt template with {{variable}} placeholders"
                    className="min-h-[200px] font-mono"
                    defaultValue={selectedTemplate?.template || ""}
                  />
                  <p className="text-sm text-muted-foreground">
                    Use {"{{"} variable_name {"}}"}  syntax for variables that will be
                    replaced when the template is used.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Variables</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Variable
                    </Button>
                  </div>

                  <div className="border rounded-md">
                    {selectedTemplate?.variables &&
                      selectedTemplate.variables.length > 0 ? (
                      selectedTemplate.variables.map((variable, index) => (
                        <div key={index} className="p-4 border-b last:border-b-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium flex items-center">
                              <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                              {variable.name}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor={`var-desc-${index}`}
                                className="text-xs"
                              >
                                Description
                              </Label>
                              <Input
                                id={`var-desc-${index}`}
                                defaultValue={variable.description}
                                className="text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor={`var-default-${index}`}
                                className="text-xs"
                              >
                                Default Value
                              </Label>
                              <Input
                                id={`var-default-${index}`}
                                defaultValue={variable.defaultValue}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No variables defined yet</p>
                        <p className="text-sm">
                          Add variables to make your template dynamic
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("templates-list")}
                >
                  Cancel
                </Button>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("test-template")}
                    disabled={!selectedTemplate}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Test Template
                  </Button>
                  <Button>
                    {selectedTemplate ? "Update Template" : "Create Template"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="test-template">
            <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <CardTitle>Test Template: {selectedTemplate?.name}</CardTitle>
                <CardDescription>
                  Preview how your template will look with different variable
                  values
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Template Variables
                    </h3>
                    <div className="space-y-4">
                      {selectedTemplate?.variables.map((variable, index) => (
                        <div key={index} className="space-y-2">
                          <Label htmlFor={`test-var-${variable.name}`}>
                            {variable.name}
                            <span className="text-xs text-muted-foreground ml-2">
                              {variable.description}
                            </span>
                          </Label>
                          <Textarea
                            id={`test-var-${variable.name}`}
                            value={
                              testVariables[variable.name] ||
                              variable.defaultValue
                            }
                            onChange={(e) =>
                              handleVariableChange(variable.name, e.target.value)
                            }
                            className="min-h-[80px]"
                          />
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={handleTestTemplate}
                      className="w-full mt-4"
                      disabled={!selectedTemplate}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generate Preview
                    </Button>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Preview Result</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyTemplate}
                        disabled={!testResult}
                      >
                        {copied ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" /> Copy
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="border rounded-md p-4 min-h-[400px] bg-muted/50">
                      {testResult ? (
                        <div className="whitespace-pre-wrap">{testResult}</div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                          <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                          <p>Click "Generate Preview" to see the result</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("templates-list")}
                  className="ml-auto"
                >
                  Back to Templates
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PromptTemplatesPanel;
