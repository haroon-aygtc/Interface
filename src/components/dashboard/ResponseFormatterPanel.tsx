import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Settings, Wand2 } from "lucide-react";
import { mockResponseFormats } from "./ai-model-config/mockData";
import { ResponseFormat, ResponseSection } from "./ai-model-config/types";
import ResponseFormatterTab from "./ai-model-config/ResponseFormatterTab";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ResponseFormatterPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [responseFormats, setResponseFormats] = useState<ResponseFormat[]>(mockResponseFormats);
  const [currentConfig, setCurrentConfig] = useState({
    selectedResponseFormatId: mockResponseFormats[0].id,
  });

  const handleConfigChange = (key: string, value: any) => {
    setCurrentConfig({
      ...currentConfig,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header - Matches Follow-Up Builder style */}
      <div className="bg-card border-b border-border w-full py-4 px-6">
        <h1 className="text-2xl font-semibold">Response Formatter</h1>
        <p className="text-sm text-muted-foreground">
          Create and manage response formats for AI-generated content
        </p>
      </div>

      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Format Templates
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Format Settings
            </TabsTrigger>
            <TabsTrigger value="test" className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              Test Formatter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <ResponseFormatterTab
              responseFormats={responseFormats}
              setResponseFormats={setResponseFormats}
              currentConfig={currentConfig}
              onConfigChange={handleConfigChange}
            />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 p-4 border-b">
                <h2 className="text-xl font-semibold">Format Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Configure global settings for response formatting
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Default Formatting</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="default-format">Default Response Format</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger id="default-format">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard Response</SelectItem>
                            <SelectItem value="technical">Technical Documentation</SelectItem>
                            <SelectItem value="step">Step-by-Step Guide</SelectItem>
                            <SelectItem value="faq">FAQ Style</SelectItem>
                            <SelectItem value="comparison">Product Comparison</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="markdown-enabled">Markdown Support</Label>
                        <div className="flex items-center space-x-2">
                          <Switch id="markdown-enabled" defaultChecked />
                          <Label htmlFor="markdown-enabled">Enable Markdown formatting</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Response Structure</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="max-sections">Maximum Sections</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            defaultValue={[5]}
                            max={10}
                            step={1}
                            id="max-sections"
                          />
                          <span className="w-12 text-center">5</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label>Section Types</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="heading-enabled" defaultChecked />
                            <Label htmlFor="heading-enabled">Headings</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="paragraph-enabled" defaultChecked />
                            <Label htmlFor="paragraph-enabled">Paragraphs</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="list-enabled" defaultChecked />
                            <Label htmlFor="list-enabled">Lists</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="code-enabled" defaultChecked />
                            <Label htmlFor="code-enabled">Code Blocks</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="callout-enabled" defaultChecked />
                            <Label htmlFor="callout-enabled">Callouts</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="divider-enabled" defaultChecked />
                            <Label htmlFor="divider-enabled">Dividers</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="custom-css">Custom CSS (for embedded responses)</Label>
                      <Textarea
                        id="custom-css"
                        placeholder=".response-container { font-family: 'Arial', sans-serif; }"
                        className="font-mono text-sm h-24"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="auto-format" defaultChecked />
                      <Label htmlFor="auto-format">Auto-format responses</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Settings</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="test" className="space-y-6">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 p-4 border-b">
                <h2 className="text-xl font-semibold">Test Formatter</h2>
                <p className="text-sm text-muted-foreground">
                  Test your response formats with sample AI responses
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Input</h3>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="test-format">Select Format to Test</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger id="test-format">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            {responseFormats.map(format => (
                              <SelectItem key={format.id} value={format.id}>
                                {format.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="sample-query">Sample User Query</Label>
                        <Textarea
                          id="sample-query"
                          placeholder="Enter a sample user query to test with..."
                          className="min-h-[80px]"
                          defaultValue="Tell me about your product pricing plans."
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="sample-response">Sample AI Response (Raw)</Label>
                        <Textarea
                          id="sample-response"
                          placeholder="Enter a sample AI response or generate one..."
                          className="min-h-[150px]"
                          defaultValue="We offer three pricing tiers: Basic ($10/month), Pro ($25/month), and Enterprise (custom pricing). Each tier includes different feature sets and usage limits. The Basic plan includes core features with limited usage. The Pro plan adds advanced analytics and higher usage limits. The Enterprise plan includes all features, priority support, and custom integrations."
                        />
                      </div>

                      <Button className="w-full">
                        Format Response
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Formatted Output</h3>

                    <div className="border rounded-lg p-4 bg-muted/10 min-h-[400px] overflow-auto">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <h1>Pricing Plans</h1>

                        <p>
                          We offer three pricing tiers to meet different needs and budgets:
                        </p>

                        <ul>
                          <li><strong>Basic Plan</strong> - $10/month</li>
                          <li><strong>Pro Plan</strong> - $25/month</li>
                          <li><strong>Enterprise Plan</strong> - Custom pricing</li>
                        </ul>

                        <h2>Plan Features</h2>

                        <p>Each tier includes different feature sets and usage limits:</p>

                        <ul>
                          <li>The <strong>Basic plan</strong> includes core features with limited usage</li>
                          <li>The <strong>Pro plan</strong> adds advanced analytics and higher usage limits</li>
                          <li>The <strong>Enterprise plan</strong> includes all features, priority support, and custom integrations</li>
                        </ul>

                        <hr />

                        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-200 dark:border-amber-800 flex items-start gap-2">
                          <span className="text-amber-600 dark:text-amber-400">💡</span>
                          <p className="text-amber-800 dark:text-amber-300 m-0">
                            Need help choosing the right plan? Contact our sales team for a personalized recommendation.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Copy Markdown
                        </Button>
                        <Button variant="outline" size="sm">
                          <Wand2 className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                      <Button size="sm">
                        Save as Template
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResponseFormatterPanel;
