import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Code, Copy, ExternalLink, Check, X, MessageSquare, User, Bot, AlertTriangle, Wifi, WifiOff, Clock, Send, Image, Paperclip, Smile, Settings, HelpCircle, Info, Plus, Trash2, Edit, Save, Maximize } from "lucide-react";
import EmbeddedWidgetPreview from "./EmbeddedWidgetPreview";
import { LanguageSelectorWithProps } from "./LanguageSelector";
import { useTheme } from "@/contexts/ThemeContext";

import { useLocation } from "react-router-dom";


interface IntegrationPanelProps { // Define the props interface
  defaultTab?: string;
}

const IntegrationPanel: React.FC<IntegrationPanelProps> = ({ defaultTab = "widget" }) => {
  const { theme } = useTheme();
  const [widgetColor, setWidgetColor] = useState("#7c3aed");
  const [widgetSize, setWidgetSize] = useState([60]);
  const [widgetPosition, setWidgetPosition] = useState("bottom-right");
  const [autoOpen, setAutoOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [quickResponses, setQuickResponses] = useState<string[]>([
    "How does this work?",
    "What can you help with?",
    "Can I speak to a human?"
  ]);
  const [newQuickResponse, setNewQuickResponse] = useState("");
  const [language, setLanguage] = useState("en");
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [copied, setCopied] = useState<{
    iframe: boolean;
    webComponent: boolean;
  }>({ iframe: false, webComponent: false });

  // Persona settings
  const [botName, setBotName] = useState("AI Assistant");
  const [botAvatar, setBotAvatar] = useState("default"); // default, robot, custom
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [botPersonality, setBotPersonality] = useState("friendly"); // friendly, professional, casual, technical

  // Message customization
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! How can I help you today?");
  const [offlineMessage, setOfflineMessage] = useState("Sorry, I'm currently offline. Please leave a message and we'll get back to you soon.");
  const [errorMessage, setErrorMessage] = useState("I'm having trouble connecting to my knowledge base. Please try again in a moment.");
  const [busyMessage, setBusyMessage] = useState("I'm currently helping other customers. I'll be with you shortly.");
  const [endConversationMessage, setEndConversationMessage] = useState("Thank you for chatting with me today. Is there anything else I can help you with?");

  // Advanced features
  const [typingIndicator, setTypingIndicator] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [fileUploads, setFileUploads] = useState(true);
  const [messageHistory, setMessageHistory] = useState(true);
  const [feedbackButtons, setFeedbackButtons] = useState(true);
  const [suggestedResponses, setSuggestedResponses] = useState(true);

  // Predefined templates for quick setup
  const widgetTemplates = [
    {
      name: "Default Purple",
      color: "#7c3aed",
      darkMode: false,
      language: "en",
      personality: "friendly",
      avatar: "default",
      botName: "AI Assistant",
      welcomeMsg: "Hello! How can I help you today?"
    },
    {
      name: "Corporate Blue",
      color: "#2563eb",
      darkMode: false,
      language: "en",
      personality: "professional",
      avatar: "default",
      botName: "Business Assistant",
      welcomeMsg: "Welcome! I'm here to assist with your business inquiries."
    },
    {
      name: "Dark Mode",
      color: "#8b5cf6",
      darkMode: true,
      language: "en",
      personality: "casual",
      avatar: "robot",
      botName: "AI Helper",
      welcomeMsg: "Hey there! Need any help today?"
    },
    {
      name: "Spanish",
      color: "#f59e0b",
      darkMode: false,
      language: "es",
      personality: "friendly",
      avatar: "default",
      botName: "Asistente AI",
      welcomeMsg: "¡Hola! ¿Cómo puedo ayudarte hoy?"
    },
    {
      name: "French",
      color: "#3b82f6",
      darkMode: false,
      language: "fr",
      personality: "professional",
      avatar: "default",
      botName: "Assistant IA",
      welcomeMsg: "Bonjour! Comment puis-je vous aider aujourd'hui?"
    },
    {
      name: "Technical Support",
      color: "#10b981",
      darkMode: true,
      language: "en",
      personality: "technical",
      avatar: "robot",
      botName: "Tech Support Bot",
      welcomeMsg: "Welcome to technical support. What issue are you experiencing today?"
    },
  ];

  const iframeCode = `<iframe
  src="https://your-domain.com/chat-widget"
  width="0"
  height="0"
  style="border:none;position:absolute"
  allow="microphone"
  title="AI Chat Widget"
></iframe>`;

  const webComponentCode = `<script src="https://your-domain.com/chat-widget.js"></script>
<ai-chat-widget
  position="${widgetPosition}"
  color="${widgetColor}"
  size="${widgetSize[0]}"
  auto-open="${autoOpen}"
  dark-mode="${darkMode}"
  quick-responses="${quickResponses.join(',')}"
  language="${language}"
  show-ai-insights="${showAIInsights}"

  <!-- Persona Settings -->
  bot-name="${botName}"
  bot-avatar="${botAvatar}"
  bot-personality="${botPersonality}"
  ${customAvatarUrl ? `custom-avatar-url="${customAvatarUrl}"` : ''}

  <!-- Message Customization -->
  welcome-message="${welcomeMessage}"
  offline-message="${offlineMessage}"
  error-message="${errorMessage}"
  busy-message="${busyMessage}"
  end-conversation-message="${endConversationMessage}"

  <!-- Advanced Features -->
  typing-indicator="${typingIndicator}"
  read-receipts="${readReceipts}"
  file-uploads="${fileUploads}"
  message-history="${messageHistory}"
  feedback-buttons="${feedbackButtons}"
  suggested-responses="${suggestedResponses}"
></ai-chat-widget>`;

  const handleCopyCode = (type: "iframe" | "webComponent") => {
    const codeToCopy = type === "iframe" ? iframeCode : webComponentCode;
    navigator.clipboard.writeText(codeToCopy);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  const handleResetDefaults = () => {
    // Widget appearance
    setWidgetColor("#7c3aed");
    setWidgetSize([60]);
    setWidgetPosition("bottom-right");
    setAutoOpen(true);
    setDarkMode(false);
    setQuickResponses(["How does this work?", "What can you help with?", "Can I speak to a human?"]);
    setLanguage("en");
    setShowAIInsights(true);

    // Persona settings
    setBotName("AI Assistant");
    setBotAvatar("default");
    setCustomAvatarUrl("");
    setBotPersonality("friendly");

    // Message customization
    setWelcomeMessage("Hello! How can I help you today?");
    setOfflineMessage("Sorry, I'm currently offline. Please leave a message and we'll get back to you soon.");
    setErrorMessage("I'm having trouble connecting to my knowledge base. Please try again in a moment.");
    setBusyMessage("I'm currently helping other customers. I'll be with you shortly.");
    setEndConversationMessage("Thank you for chatting with me today. Is there anything else I can help you with?");

    // Advanced features
    setTypingIndicator(true);
    setReadReceipts(true);
    setFileUploads(true);
    setMessageHistory(true);
    setFeedbackButtons(true);
    setSuggestedResponses(true);
  };

  const handleAddQuickResponse = () => {
    if (newQuickResponse.trim() !== "") {
      setQuickResponses([...quickResponses, newQuickResponse.trim()]);
      setNewQuickResponse("");
    }
  };

  const handleRemoveQuickResponse = (index: number) => {
    const updatedResponses = [...quickResponses];
    updatedResponses.splice(index, 1);
    setQuickResponses(updatedResponses);
  };

  // Expanded templates with persona and message settings
  const applyTemplate = (template: {
    name: string;
    color: string;
    darkMode: boolean;
    language?: string;
    personality?: string;
    avatar?: string;
    botName?: string;
    welcomeMsg?: string;
  }) => {
    // Widget appearance
    setWidgetColor(template.color);
    setDarkMode(template.darkMode);
    if (template.language) {
      setLanguage(template.language);
    }

    // Persona settings if provided
    if (template.personality) {
      setBotPersonality(template.personality);
    }
    if (template.avatar) {
      setBotAvatar(template.avatar);
    }
    if (template.botName) {
      setBotName(template.botName);
    }
    if (template.welcomeMsg) {
      setWelcomeMessage(template.welcomeMsg);
    }
  };

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="widget">Widget Configuration</TabsTrigger>
        <TabsTrigger value="persona">Persona & Messages</TabsTrigger>
        <TabsTrigger value="code">Integration Code</TabsTrigger>
        <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
      </TabsList>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TabsContent value="widget" className="space-y-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Quick Setup Templates</CardTitle>
                <CardDescription>
                  Choose a predefined template to quickly set up your widget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {widgetTemplates.map((template, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => applyTemplate(template)}
                      className="p-3 border rounded-md hover:bg-gray-50 transition-colors text-left"
                    >
                      <div
                        className="w-full h-6 rounded mb-2"
                        style={{ backgroundColor: template.color }}
                        aria-label={`Color: ${template.color}`}
                      ></div>
                      <div className="text-sm font-medium">{template.name}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Widget Appearance</CardTitle>
                <CardDescription>
                  Customize how your chat widget looks on your website.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="widget-color">Widget Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="widget-color"
                      type="color"
                      value={widgetColor}
                      onChange={(e) => setWidgetColor(e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={widgetColor}
                      onChange={(e) => setWidgetColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Widget Size</Label>
                  <Slider
                    value={widgetSize}
                    min={40}
                    max={80}
                    step={1}
                    onValueChange={setWidgetSize}
                  />
                  <div className="text-sm text-muted-foreground">
                    {widgetSize[0]}px
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Widget Position</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={
                        widgetPosition === "top-left" ? "default" : "outline"
                      }
                      onClick={() => setWidgetPosition("top-left")}
                      className="justify-start"
                    >
                      Top Left
                    </Button>
                    <Button
                      variant={
                        widgetPosition === "top-right" ? "default" : "outline"
                      }
                      onClick={() => setWidgetPosition("top-right")}
                      className="justify-end"
                    >
                      Top Right
                    </Button>
                    <Button
                      variant={
                        widgetPosition === "bottom-left"
                          ? "default"
                          : "outline"
                      }
                      onClick={() => setWidgetPosition("bottom-left")}
                      className="justify-start"
                    >
                      Bottom Left
                    </Button>
                    <Button
                      variant={
                        widgetPosition === "bottom-right"
                          ? "default"
                          : "outline"
                      }
                      onClick={() => setWidgetPosition("bottom-right")}
                      className="justify-end"
                    >
                      Bottom Right
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-open">Auto-open on page load</Label>
                  <Switch
                    id="auto-open"
                    checked={autoOpen}
                    onCheckedChange={setAutoOpen}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <LanguageSelectorWithProps
                  selectedLanguage={language}
                  onChange={setLanguage}
                  showDescription={false}
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-ai-insights">Show AI Insights</Label>
                    <Switch
                      id="show-ai-insights"
                      checked={showAIInsights}
                      onCheckedChange={setShowAIInsights}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Display AI performance metrics and knowledge source information
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Textarea
                    id="welcome-message"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    placeholder="Enter a welcome message for your visitors"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Quick Response Options</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Add suggested responses that users can click instead of typing
                  </p>

                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newQuickResponse}
                      onChange={(e) => setNewQuickResponse(e.target.value)}
                      placeholder="Add a quick response option"
                      className="flex-1"
                    />
                    <Button onClick={handleAddQuickResponse} type="button">
                      Add
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-md bg-background custom-scrollbar">
                    {quickResponses.map((response, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                        <span className="text-sm truncate">{response}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveQuickResponse(index)}
                          className="h-6 w-6 p-0"
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {quickResponses.length === 0 && (
                      <div className="text-sm text-muted-foreground text-center py-2">
                        No quick responses added
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleResetDefaults}>
                  Reset to Defaults
                </Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="persona" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bot Persona</CardTitle>
                <CardDescription>
                  Customize your AI assistant's identity and personality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bot-name">Bot Name</Label>
                  <Input
                    id="bot-name"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    placeholder="Enter a name for your bot"
                  />
                  <p className="text-sm text-muted-foreground">
                    This name will be displayed to users in the chat interface
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Bot Avatar</Label>
                  <RadioGroup value={botAvatar} onValueChange={setBotAvatar} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="avatar-default" />
                      <Label htmlFor="avatar-default" className="flex items-center cursor-pointer">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <span>Default</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="robot" id="avatar-robot" />
                      <Label htmlFor="avatar-robot" className="flex items-center cursor-pointer">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                          <Bot className="h-5 w-5" />
                        </div>
                        <span>Robot</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="avatar-custom" />
                      <Label htmlFor="avatar-custom" className="flex items-center cursor-pointer">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-2">
                          <Image className="h-5 w-5" />
                        </div>
                        <span>Custom</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {botAvatar === "custom" && (
                    <div className="mt-2">
                      <Input
                        placeholder="Enter image URL"
                        value={customAvatarUrl}
                        onChange={(e) => setCustomAvatarUrl(e.target.value)}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended size: 200x200 pixels
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Bot Personality</Label>
                  <Select value={botPersonality} onValueChange={setBotPersonality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a personality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly & Helpful</SelectItem>
                      <SelectItem value="professional">Professional & Formal</SelectItem>
                      <SelectItem value="casual">Casual & Conversational</SelectItem>
                      <SelectItem value="technical">Technical & Precise</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    This sets the tone and style of the bot's responses
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Message Customization</CardTitle>
                <CardDescription>
                  Customize messages for different scenarios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="welcome-message" className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                      Welcome Message
                    </Label>
                  </div>
                  <Textarea
                    id="welcome-message"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    placeholder="Enter a welcome message for your visitors"
                    className="min-h-[80px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    First message shown when a user opens the chat
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="offline-message" className="flex items-center">
                      <WifiOff className="h-4 w-4 mr-2 text-orange-500" />
                      Offline Message
                    </Label>
                  </div>
                  <Textarea
                    id="offline-message"
                    value={offlineMessage}
                    onChange={(e) => setOfflineMessage(e.target.value)}
                    placeholder="Enter a message for when the bot is offline"
                    className="min-h-[80px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    Shown when the chat is offline or unavailable
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="error-message" className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                      Error Message
                    </Label>
                  </div>
                  <Textarea
                    id="error-message"
                    value={errorMessage}
                    onChange={(e) => setErrorMessage(e.target.value)}
                    placeholder="Enter a message for when an error occurs"
                    className="min-h-[80px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    Displayed when there's an error connecting to the AI service
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="busy-message" className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      Busy Message
                    </Label>
                  </div>
                  <Textarea
                    id="busy-message"
                    value={busyMessage}
                    onChange={(e) => setBusyMessage(e.target.value)}
                    placeholder="Enter a message for when the bot is busy"
                    className="min-h-[80px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    Shown when the bot is experiencing high traffic
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="end-conversation-message" className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      End Conversation Message
                    </Label>
                  </div>
                  <Textarea
                    id="end-conversation-message"
                    value={endConversationMessage}
                    onChange={(e) => setEndConversationMessage(e.target.value)}
                    placeholder="Enter a message for when the conversation ends"
                    className="min-h-[80px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    Displayed when a conversation is completed or timed out
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>iFrame Embed</CardTitle>
                <CardDescription>
                  Add this code to your website to embed the chat widget.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
                    {iframeCode}
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopyCode("iframe")}
                  >
                    {copied.iframe ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Web Component</CardTitle>
                <CardDescription>
                  Use this code for a more customizable integration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
                    {webComponentCode}
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopyCode("webComponent")}
                  >
                    {copied.webComponent ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Test on Demo Page
                </Button>
                <Button size="sm">
                  <Code className="mr-2 h-4 w-4" />
                  Advanced Configuration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Features</CardTitle>
                <CardDescription>
                  Enable or disable advanced chat features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="typing-indicator" className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      Typing Indicators
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Show typing animation when AI is responding
                    </p>
                  </div>
                  <Switch
                    id="typing-indicator"
                    checked={typingIndicator}
                    onCheckedChange={setTypingIndicator}
                  />
                </div>

                <Separator className="my-2" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="read-receipts" className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Read Receipts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Show when messages have been read
                    </p>
                  </div>
                  <Switch
                    id="read-receipts"
                    checked={readReceipts}
                    onCheckedChange={setReadReceipts}
                  />
                </div>

                <Separator className="my-2" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="file-uploads" className="flex items-center">
                      <Paperclip className="h-4 w-4 mr-2 text-blue-500" />
                      File Uploads
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to upload files in chat
                    </p>
                  </div>
                  <Switch
                    id="file-uploads"
                    checked={fileUploads}
                    onCheckedChange={setFileUploads}
                  />
                </div>

                <Separator className="my-2" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="message-history" className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                      Persistent Chat History
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Save chat history between sessions
                    </p>
                  </div>
                  <Switch
                    id="message-history"
                    checked={messageHistory}
                    onCheckedChange={setMessageHistory}
                  />
                </div>

                <Separator className="my-2" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="feedback-buttons" className="flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2 text-orange-500" />
                      Feedback Buttons
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Add thumbs up/down buttons for response feedback
                    </p>
                  </div>
                  <Switch
                    id="feedback-buttons"
                    checked={feedbackButtons}
                    onCheckedChange={setFeedbackButtons}
                  />
                </div>

                <Separator className="my-2" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="suggested-responses" className="flex items-center">
                      <Smile className="h-4 w-4 mr-2 text-yellow-500" />
                      Suggested Responses
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Show suggested response buttons to users
                    </p>
                  </div>
                  <Switch
                    id="suggested-responses"
                    checked={suggestedResponses}
                    onCheckedChange={setSuggestedResponses}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Settings</CardTitle>
                <CardDescription>
                  Fine-tune widget behavior and performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Animation Speed</Label>
                  <Slider
                    defaultValue={[300]}
                    min={100}
                    max={500}
                    step={10}
                  />
                  <div className="text-sm text-muted-foreground">
                    300ms (Default)
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Z-Index</Label>
                  <Input type="number" defaultValue="9999" />
                  <div className="text-sm text-muted-foreground">
                    Controls the stacking order of the widget
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mobile Optimization</Label>
                    <p className="text-sm text-muted-foreground">
                      Adjust widget size and position on mobile devices
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom CSS</CardTitle>
                <CardDescription>
                  Add custom CSS to further style your widget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="font-mono text-sm min-h-[200px]"
                  placeholder="/* Add your custom CSS here */
.ai-chat-widget {
  /* Custom styles */
}"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  See how your chat widget will appear on websites
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  const previewElement = document.querySelector('.embedded-widget-preview');
                  if (previewElement) {
                    const fullscreenButton = previewElement.querySelector('.fullscreen-button');
                    if (fullscreenButton) {
                      (fullscreenButton as HTMLButtonElement).click();
                    }
                  }
                }}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 h-[600px] overflow-hidden bg-background">
              <EmbeddedWidgetPreview
                widgetColor={widgetColor}
                widgetSize={widgetSize[0]}
                widgetPosition={widgetPosition}
                autoOpen={autoOpen}
                welcomeMessage={welcomeMessage}
                darkMode={darkMode}
                quickResponses={quickResponses}
                language={language}
                showAIInsights={showAIInsights}
                botName={botName}
                botAvatar={botAvatar}
                customAvatarUrl={customAvatarUrl}
                botPersonality={botPersonality}
                offlineMessage={offlineMessage}
                errorMessage={errorMessage}
                busyMessage={busyMessage}
                endConversationMessage={endConversationMessage}
                typingIndicator={typingIndicator}
                readReceipts={readReceipts}
                fileUploads={fileUploads}
                messageHistory={messageHistory}
                feedbackButtons={feedbackButtons}
                suggestedResponses={suggestedResponses}
              />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tips & Best Practices</CardTitle>
              <CardDescription>
                Get the most out of your chat widget
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-2">
                <h3 className="font-medium">Placement</h3>
                <p className="text-sm text-muted-foreground">
                  Position your widget in the bottom-right corner for best visibility without interfering with content.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Welcome Message</h3>
                <p className="text-sm text-muted-foreground">
                  Keep your welcome message brief and clear about how the chat can help visitors.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Quick Responses</h3>
                <p className="text-sm text-muted-foreground">
                  Offer 3-5 quick response options that address common questions to improve engagement.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Color Scheme</h3>
                <p className="text-sm text-muted-foreground">
                  Match your widget color with your brand for consistency across your website.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Tabs>
  );
};

export default IntegrationPanel;
