import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertCircle,
  Check,
  Globe,
  MessageSquare,
  PaintBucket,
  Settings,
  Share2,
  Database,
  Code,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DashboardHeader from "./DashboardHeader";

interface TenantConfigProps {
  tenantId?: string;
  tenantName?: string;
}

const TenantConfig = ({
  tenantId = "tenant-123",
  tenantName = "Acme Corporation",
}: TenantConfigProps) => {
  const [activeTab, setActiveTab] = useState("branding");
  const [logoUrl, setLogoUrl] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=acme",
  );
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#10b981");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [aiModel, setAiModel] = useState("gemini-pro");
  const [temperature, setTemperature] = useState("0.7");
  const [maxTokens, setMaxTokens] = useState("1024");
  const [enableKnowledgeBase, setEnableKnowledgeBase] = useState(true);
  const [enableWebScraping, setEnableWebScraping] = useState(true);

  const handleSave = () => {
    // Placeholder for save functionality
    console.log("Saving tenant configuration...");
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={logoUrl} alt={tenantName} />
            <AvatarFallback>
              {tenantName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{tenantName} Configuration</h1>
            <p className="text-sm text-muted-foreground">
              Tenant ID: {tenantId}
            </p>
          </div>
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          Configuration changes apply to all users of this tenant
        </AlertTitle>
        <AlertDescription>
          Changes made here will affect how the chat system appears and
          functions for all users associated with {tenantName}.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <PaintBucket className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="ai-models" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Knowledge Sources
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Integration
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visual Identity</CardTitle>
              <CardDescription>
                Configure the visual elements of your chat interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <div className="flex gap-4">
                    <Input
                      id="logo-url"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                    />
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={logoUrl} alt="Logo Preview" />
                      <AvatarFallback>
                        {tenantName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger id="font-family">
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-md border"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-md border"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    <Input
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      placeholder="#10b981"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chat Widget Appearance</CardTitle>
              <CardDescription>
                Configure how the chat widget appears on your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="widget-title">Widget Title</Label>
                  <Input
                    id="widget-title"
                    defaultValue="Chat with us"
                    placeholder="Chat with us"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Input
                    id="welcome-message"
                    defaultValue="How can I help you today?"
                    placeholder="How can I help you today?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="widget-position">Widget Position</Label>
                  <Select defaultValue="bottom-right">
                    <SelectTrigger id="widget-position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="widget-size">Widget Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="widget-size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="full">Full Screen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="show-avatar" defaultChecked />
                <Label htmlFor="show-avatar">Show Avatar in Chat</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Configuration</CardTitle>
              <CardDescription>
                Select and configure the AI models for this tenant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="primary-model">Primary AI Model</Label>
                  <Select value={aiModel} onValueChange={setAiModel}>
                    <SelectTrigger id="primary-model">
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="groke-pro">Groke Pro</SelectItem>
                      <SelectItem value="huggingface-mistral">
                        Hugging Face - Mistral
                      </SelectItem>
                      <SelectItem value="huggingface-llama">
                        Hugging Face - Llama
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="fallback-model">Fallback AI Model</Label>
                  <Select defaultValue="huggingface-mistral">
                    <SelectTrigger id="fallback-model">
                      <SelectValue placeholder="Select fallback model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="groke-pro">Groke Pro</SelectItem>
                      <SelectItem value="huggingface-mistral">
                        Hugging Face - Mistral
                      </SelectItem>
                      <SelectItem value="huggingface-llama">
                        Hugging Face - Llama
                      </SelectItem>
                      <SelectItem value="none">
                        None (Disable Fallback)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="temperature">Temperature</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="temperature"
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                    />
                    <span className="text-sm text-muted-foreground">
                      0 = Deterministic, 1 = Creative
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="max-tokens">Max Tokens</Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    min="256"
                    max="4096"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="system-prompt">System Prompt</Label>
                <textarea
                  id="system-prompt"
                  aria-label="System Prompt"
                  className="w-full min-h-[100px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  defaultValue={`You are an AI assistant for ${tenantName}. You are helpful, concise, and friendly. You provide accurate information about the company's products and services.`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Formatting</CardTitle>
              <CardDescription>
                Configure how AI responses are formatted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch id="enable-markdown" defaultChecked />
                <Label htmlFor="enable-markdown">
                  Enable Markdown Formatting
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enable-code-blocks" defaultChecked />
                <Label htmlFor="enable-code-blocks">Enable Code Blocks</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enable-bullet-points" defaultChecked />
                <Label htmlFor="enable-bullet-points">
                  Enable Bullet Points
                </Label>
              </div>

              <div className="space-y-4">
                <Label htmlFor="response-tone">Response Tone</Label>
                <Select defaultValue="friendly">
                  <SelectTrigger id="response-tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Sources</CardTitle>
              <CardDescription>
                Configure the knowledge sources for this tenant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="enable-knowledge-base"
                  checked={enableKnowledgeBase}
                  onCheckedChange={setEnableKnowledgeBase}
                />
                <Label htmlFor="enable-knowledge-base">
                  Enable Knowledge Base
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enable-web-scraping"
                  checked={enableWebScraping}
                  onCheckedChange={setEnableWebScraping}
                />
                <Label htmlFor="enable-web-scraping">Enable Web Scraping</Label>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label htmlFor="knowledge-base-sources">
                  Knowledge Base Sources
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="kb-source-docs"
                      defaultChecked
                      disabled={!enableKnowledgeBase}
                    />
                    <Label
                      htmlFor="kb-source-docs"
                      className={
                        !enableKnowledgeBase ? "text-muted-foreground" : ""
                      }
                    >
                      Documents
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="kb-source-faqs"
                      defaultChecked
                      disabled={!enableKnowledgeBase}
                    />
                    <Label
                      htmlFor="kb-source-faqs"
                      className={
                        !enableKnowledgeBase ? "text-muted-foreground" : ""
                      }
                    >
                      FAQs
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="kb-source-products"
                      defaultChecked
                      disabled={!enableKnowledgeBase}
                    />
                    <Label
                      htmlFor="kb-source-products"
                      className={
                        !enableKnowledgeBase ? "text-muted-foreground" : ""
                      }
                    >
                      Products
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="kb-source-support"
                      defaultChecked
                      disabled={!enableKnowledgeBase}
                    />
                    <Label
                      htmlFor="kb-source-support"
                      className={
                        !enableKnowledgeBase ? "text-muted-foreground" : ""
                      }
                    >
                      Support Articles
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="web-scraping-domains">
                  Web Scraping Domains
                </Label>
                <textarea
                  id="web-scraping-domains"
                  className="w-full min-h-[100px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Enter domains to scrape, one per line"
                  defaultValue="example.com\ndocs.example.com\nsupport.example.com"
                  disabled={!enableWebScraping}
                />
                <p className="text-sm text-muted-foreground">
                  Enter domains that should be scraped for knowledge, one per
                  line.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Knowledge Fusion Settings</CardTitle>
              <CardDescription>
                Configure how different knowledge sources are combined
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="knowledge-priority">
                  Knowledge Source Priority
                </Label>
                <Select defaultValue="kb-first">
                  <SelectTrigger id="knowledge-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kb-first">
                      Knowledge Base First
                    </SelectItem>
                    <SelectItem value="scraping-first">
                      Web Scraping First
                    </SelectItem>
                    <SelectItem value="balanced">
                      Balanced (Merge Sources)
                    </SelectItem>
                    <SelectItem value="ai-decide">Let AI Decide</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label htmlFor="knowledge-fallback">
                  Knowledge Fallback Strategy
                </Label>
                <Select defaultValue="ai-generate">
                  <SelectTrigger id="knowledge-fallback">
                    <SelectValue placeholder="Select fallback strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-generate">
                      Generate with AI
                    </SelectItem>
                    <SelectItem value="error-message">
                      Show Error Message
                    </SelectItem>
                    <SelectItem value="redirect">
                      Redirect to Support
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Integration</CardTitle>
              <CardDescription>
                Configure how the chat widget integrates with your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="integration-method">Integration Method</Label>
                <Select defaultValue="script">
                  <SelectTrigger id="integration-method">
                    <SelectValue placeholder="Select integration method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="script">JavaScript Script</SelectItem>
                    <SelectItem value="iframe">iFrame</SelectItem>
                    <SelectItem value="shadow-dom">Shadow DOM</SelectItem>
                    <SelectItem value="api">API Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label htmlFor="allowed-domains">Allowed Domains</Label>
                <textarea
                  id="allowed-domains"
                  className="w-full min-h-[100px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Enter allowed domains, one per line"
                  defaultValue="example.com\nwww.example.com\napp.example.com"
                />
                <p className="text-sm text-muted-foreground">
                  Enter domains where the chat widget is allowed to load, one
                  per line.
                </p>
              </div>

              <div className="space-y-4">
                <Label>Integration Code</Label>
                <div className="relative">
                  <pre className="p-4 rounded-md bg-muted overflow-x-auto text-sm">
                    {`<script src="https://chat.example.com/widget.js?tenant=${tenantId}" async></script>`}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add this code to your website to integrate the chat widget.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure API access for this tenant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>API Key</Label>
                <div className="relative">
                  <Input value="sk_live_tenant_123456789abcdef" readOnly />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-0 right-0 h-full"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use this API key to authenticate API requests for this tenant.
                </p>
              </div>

              <div className="space-y-4">
                <Label htmlFor="rate-limit">API Rate Limit</Label>
                <div className="flex items-center gap-3">
                  <Input id="rate-limit" type="number" defaultValue="100" />
                  <span className="text-sm text-muted-foreground">
                    requests per minute
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enable-webhooks" defaultChecked />
                <Label htmlFor="enable-webhooks">Enable Webhooks</Label>
              </div>

              <div className="space-y-4">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://example.com/webhook"
                  defaultValue="https://example.com/webhook"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced settings for this tenant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <div className="flex items-center gap-3">
                  <Input id="session-timeout" type="number" defaultValue="30" />
                  <span className="text-sm text-muted-foreground">minutes</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="chat-history-retention">
                  Chat History Retention
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="chat-history-retention"
                    type="number"
                    defaultValue="90"
                  />
                  <span className="text-sm text-muted-foreground">days</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enable-analytics" defaultChecked />
                <Label htmlFor="enable-analytics">Enable Analytics</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enable-feedback" defaultChecked />
                <Label htmlFor="enable-feedback">Enable User Feedback</Label>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label htmlFor="default-language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="default-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time (EST/EDT)</SelectItem>
                    <SelectItem value="cst">Central Time (CST/CDT)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MST/MDT)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PST/PDT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Destructive actions for this tenant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="destructive">
                  Reset Tenant Configuration
                </Button>
                <p className="text-sm text-muted-foreground">
                  Reset all configuration settings to default values.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <Button variant="destructive">Clear Chat History</Button>
                <p className="text-sm text-muted-foreground">
                  Delete all chat history for this tenant. This action cannot be
                  undone.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenantConfig;

// Placeholder component for color picker
const ColorPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 rounded-md border"
        style={{ backgroundColor: color }}
      />
      <Input
        value={color}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
      />
    </div>
  );
};
