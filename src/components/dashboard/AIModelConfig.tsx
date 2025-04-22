import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { mockResponses } from "@/lib/mockData";

interface AIModelConfigProps {
  onSave?: (config: any) => void;
  defaultTab?: string;
}

const AIModelConfig: React.FC<AIModelConfigProps> = ({
  onSave = () => { },
  defaultTab = "general"
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [provider, setProvider] = useState("gemini");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [apiKey, setApiKey] = useState("");
  const [testStatus, setTestStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [testPrompt, setTestPrompt] = useState(
    "Explain quantum computing in simple terms",
  );
  const [testResponse, setTestResponse] = useState("");



  const handleTestConnection = () => {
    setTestStatus("loading");

    // Simulate API call with setTimeout
    setTimeout(() => {
      if (apiKey.length > 10) {
        setTestStatus("success");
        setTestResponse(mockResponses.testAIModel.success);
      } else {
        setTestStatus("error");
        setTestResponse(mockResponses.testAIModel.error);
      }
    }, 1500);
  };

  const handleSaveConfig = () => {
    const config = {
      provider,
      temperature: temperature[0],
      maxTokens,
      apiKey,
    };
    onSave(config);
  };

  return (
    <div className="w-full h-full bg-background">
      <div className="space-y-6 w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full max-w-md">
            <TabsTrigger value="general" className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm h-8 rounded-sm px-3 py-1.5">General</TabsTrigger>
            <TabsTrigger value="advanced" className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm h-8 rounded-sm px-3 py-1.5">Advanced</TabsTrigger>
            <TabsTrigger value="testing" className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm h-8 rounded-sm px-3 py-1.5">Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-6">
            <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold">Provider Selection</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Choose your AI model provider and configure basic settings
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="provider" className="text-sm font-medium">AI Provider</Label>
                    <Select value={provider} onValueChange={setProvider}>
                      <SelectTrigger id="provider" className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini">Google Gemini</SelectItem>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="huggingface">Hugging Face</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="cohere">Cohere</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Select the AI provider for your application
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key" className="text-sm font-medium">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Your API key will be encrypted and stored securely
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="temperature" className="text-sm font-medium">Temperature</Label>
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md">{temperature[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    id="temperature"
                    min={0}
                    max={1}
                    step={0.01}
                    value={temperature}
                    onValueChange={setTemperature}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>More Deterministic</span>
                    <span>More Creative</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Controls randomness: Lower values are more deterministic,
                    higher values more creative.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="max-tokens" className="text-sm font-medium">Max Tokens</Label>
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md">{maxTokens}</span>
                  </div>
                  <Input
                    id="max-tokens"
                    type="range"
                    min={1}
                    max={8192}
                    value={maxTokens}
                    onChange={(e) =>
                      setMaxTokens(parseInt(e.target.value) || 1024)
                    }
                    className="w-full h-2 bg-muted rounded-md appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Shorter responses</span>
                    <span>Longer responses</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Maximum number of tokens to generate in the response.
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg border border-border mt-4">
                  <h3 className="text-sm font-medium mb-2">Model Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Provider:</span>
                      <span className="font-medium">{provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature:</span>
                      <span className="font-medium">{temperature[0].toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Tokens:</span>
                      <span className="font-medium">{maxTokens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium text-emerald-500">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-6">
            <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold">Advanced Settings</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Fine-tune model behavior with advanced parameters
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="model-version" className="text-sm font-medium">Model Version</Label>
                  <Select defaultValue="latest">
                    <SelectTrigger id="model-version" className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="legacy">Legacy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="top-p" className="text-sm font-medium">Top P</Label>
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md">0.9</span>
                  </div>
                  <Slider
                    id="top-p"
                    defaultValue={[0.9]}
                    min={0}
                    max={1}
                    step={0.01}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Controls diversity via nucleus sampling.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="frequency-penalty" className="text-sm font-medium">Frequency Penalty</Label>
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md">0.0</span>
                  </div>
                  <Slider
                    id="frequency-penalty"
                    defaultValue={[0]}
                    min={-2}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Reduces repetition of token sequences.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="presence-penalty" className="text-sm font-medium">Presence Penalty</Label>
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md">0.0</span>
                  </div>
                  <Slider
                    id="presence-penalty"
                    defaultValue={[0]}
                    min={-2}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Reduces repetition of topics.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="bg-muted/30 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="stream-response" className="text-sm font-medium cursor-pointer">Stream Response</Label>
                      <Switch id="stream-response" />
                    </div>
                    <p className="text-xs text-muted-foreground">Enable streaming token-by-token responses</p>
                  </div>

                  <div className="bg-muted/30 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="log-requests" className="text-sm font-medium cursor-pointer">Log Requests</Label>
                      <Switch id="log-requests" />
                    </div>
                    <p className="text-xs text-muted-foreground">Save all requests for analysis</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-4 mt-6">
            <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold">Test Connection</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Verify your configuration by testing the AI model connection
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium border border-blue-200 dark:border-blue-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></span>
                    Test Environment
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="test-prompt" className="text-sm font-medium">Test Prompt</Label>
                  <Textarea
                    id="test-prompt"
                    placeholder="Enter a test prompt"
                    value={testPrompt}
                    onChange={(e) => setTestPrompt(e.target.value)}
                    className="min-h-[120px] p-3 rounded-md border border-input bg-background text-sm resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a prompt to test the AI model's response with your current configuration.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleTestConnection}
                    disabled={testStatus === "loading"}
                    className="flex-1 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10"
                  >
                    {testStatus === "loading" ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Testing Connection...
                      </>
                    ) : (
                      "Test Connection"
                    )}
                  </Button>
                  <Button
                    type="button"
                    className="px-4 h-10 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setTestPrompt("Explain quantum computing in simple terms")}
                  >
                    Reset
                  </Button>
                </div>

                {testStatus === "success" && (
                  <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4 mt-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Connection Successful</h4>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                          The model is responding correctly with your current configuration.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {testStatus === "error" && (
                  <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 mt-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-red-800 dark:text-red-300">Connection Failed</h4>
                        <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                          Please check your API key and settings. Make sure your provider is correctly configured.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {(testStatus === "success" || testStatus === "error") && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Model Response</Label>
                      <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md">{testStatus === "success" ? "Success" : "Error"}</span>
                    </div>
                    <div className="p-4 rounded-md bg-muted/50 whitespace-pre-wrap border border-border min-h-[120px] text-sm">
                      {testResponse}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Response time: {testStatus === "success" ? "1.2s" : "0.8s"}</span>
                      <span>Tokens used: {testStatus === "success" ? "142" : "0"}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIModelConfig;
