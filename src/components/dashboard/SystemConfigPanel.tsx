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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  RefreshCw,
  Shield,
  Database,
  Key,
  Clock,
  HardDrive,
  Cloud,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface SystemConfigPanelProps {
  defaultTab?: string;
}

const SystemConfigPanel: React.FC<SystemConfigPanelProps> = ({ defaultTab = "authentication" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");

  const handleSaveConfig = () => {
    setSaveStatus("saving");
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Configuration</h1>
        <Button
          onClick={handleSaveConfig}
          disabled={saveStatus === "saving"}
          className="min-w-[120px]"
        >
          {saveStatus === "idle" && (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </>
          )}
          {saveStatus === "saving" && (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          )}
          {saveStatus === "success" && (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Saved
            </>
          )}
          {saveStatus === "error" && (
            <>
              <AlertTriangle className="mr-2 h-4 w-4 text-red-500" /> Error
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
          <TabsTrigger value="authentication">
            <Shield className="mr-2 h-4 w-4" /> Authentication
          </TabsTrigger>
          <TabsTrigger value="api-connections">
            <Key className="mr-2 h-4 w-4" /> API Connections
          </TabsTrigger>
          <TabsTrigger value="sessions">
            <Clock className="mr-2 h-4 w-4" /> Sessions
          </TabsTrigger>
          <TabsTrigger value="storage">
            <Database className="mr-2 h-4 w-4" /> Storage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="authentication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
              <CardDescription>
                Configure how users authenticate with your AI chat system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Authentication Method</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose the primary authentication method for your users
                    </p>
                  </div>
                  <Select defaultValue="jwt">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jwt">JWT Tokens</SelectItem>
                      <SelectItem value="oauth">OAuth 2.0</SelectItem>
                      <SelectItem value="apikey">API Keys</SelectItem>
                      <SelectItem value="saml">SAML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base">JWT Configuration</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jwt-secret">JWT Secret Key</Label>
                      <Input
                        id="jwt-secret"
                        type="password"
                        value="••••••••••••••••••••••••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jwt-expiry">Token Expiry (seconds)</Label>
                      <Input
                        id="jwt-expiry"
                        type="number"
                        defaultValue="3600"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Single Sign-On (SSO)</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable SSO integration with your identity provider
                      </p>
                    </div>
                    <Switch id="sso-enabled" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sso-provider">SSO Provider</Label>
                      <Select defaultValue="none" disabled>
                        <SelectTrigger id="sso-provider">
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="okta">Okta</SelectItem>
                          <SelectItem value="auth0">Auth0</SelectItem>
                          <SelectItem value="azure">Azure AD</SelectItem>
                          <SelectItem value="google">
                            Google Workspace
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sso-domain">SSO Domain</Label>
                      <Input
                        id="sso-domain"
                        placeholder="your-company.okta.com"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for admin users
                      </p>
                    </div>
                    <Switch id="2fa-enabled" defaultChecked />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="2fa-method">2FA Method</Label>
                      <Select defaultValue="totp">
                        <SelectTrigger id="2fa-method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="totp">Time-based OTP</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-connections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model API Connections</CardTitle>
              <CardDescription>
                Configure connections to external AI model providers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base">OpenAI Configuration</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openai-api-key">API Key</Label>
                    <Input
                      id="openai-api-key"
                      type="password"
                      value="sk-••••••••••••••••••••••••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="openai-org-id">
                      Organization ID (optional)
                    </Label>
                    <Input
                      id="openai-org-id"
                      placeholder="org-xxxxxxxxxxxxxxxx"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">API Status</Label>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Connected</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base">Anthropic Configuration</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="anthropic-api-key">API Key</Label>
                    <Input
                      id="anthropic-api-key"
                      type="password"
                      placeholder="sk_ant_xxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">API Status</Label>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-300 mr-2"></div>
                    <span className="text-sm">Not Connected</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base">Custom Model Endpoint</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-endpoint-url">Endpoint URL</Label>
                    <Input
                      id="custom-endpoint-url"
                      placeholder="https://api.your-model-provider.com/v1/completions"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="custom-auth-type">
                        Authentication Type
                      </Label>
                      <Select defaultValue="bearer">
                        <SelectTrigger id="custom-auth-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bearer">Bearer Token</SelectItem>
                          <SelectItem value="apikey">API Key</SelectItem>
                          <SelectItem value="basic">Basic Auth</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-auth-token">
                        Authentication Token
                      </Label>
                      <Input
                        id="custom-auth-token"
                        type="password"
                        placeholder="Your authentication token"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>
                Configure how user sessions are handled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Session Storage</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose where session data is stored
                    </p>
                  </div>
                  <Select defaultValue="redis">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select storage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="memory">In-Memory</SelectItem>
                      <SelectItem value="redis">Redis</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-expiry">
                      Session Expiry (minutes)
                    </Label>
                    <Input
                      id="session-expiry"
                      type="number"
                      defaultValue="60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-refresh">
                      Refresh Threshold (minutes)
                    </Label>
                    <Input
                      id="session-refresh"
                      type="number"
                      defaultValue="30"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Persistent Sessions</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to stay logged in across browser restarts
                    </p>
                  </div>
                  <Switch id="persistent-sessions" defaultChecked />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base">Redis Configuration</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="redis-host">Redis Host</Label>
                      <Input id="redis-host" defaultValue="localhost" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="redis-port">Redis Port</Label>
                      <Input id="redis-port" defaultValue="6379" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="redis-password">Redis Password</Label>
                      <Input
                        id="redis-password"
                        type="password"
                        placeholder="Leave blank if no password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="redis-db">Redis Database</Label>
                      <Input id="redis-db" type="number" defaultValue="0" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground">
                        Limit the number of requests per user
                      </p>
                    </div>
                    <Switch id="rate-limiting" defaultChecked />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rate-limit-requests">Max Requests</Label>
                      <Input
                        id="rate-limit-requests"
                        type="number"
                        defaultValue="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rate-limit-window">
                        Time Window (seconds)
                      </Label>
                      <Input
                        id="rate-limit-window"
                        type="number"
                        defaultValue="60"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Configuration</CardTitle>
              <CardDescription>
                Configure where and how data is stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Storage Provider</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose where to store conversation data and files
                    </p>
                  </div>
                  <Select defaultValue="postgres">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgres">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base">Database Configuration</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-host">Host</Label>
                      <Input id="db-host" defaultValue="localhost" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-port">Port</Label>
                      <Input id="db-port" defaultValue="5432" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-name">Database Name</Label>
                      <Input id="db-name" defaultValue="ai_chat_db" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-schema">Schema</Label>
                      <Input id="db-schema" defaultValue="public" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-user">Username</Label>
                      <Input id="db-user" defaultValue="postgres" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-password">Password</Label>
                      <Input
                        id="db-password"
                        type="password"
                        value="••••••••••••"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Data Retention</Label>
                      <p className="text-sm text-muted-foreground">
                        Configure how long data is kept
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="retention-conversations">
                        Conversation History (days)
                      </Label>
                      <Input
                        id="retention-conversations"
                        type="number"
                        defaultValue="90"
                      />
                      <p className="text-xs text-muted-foreground">
                        0 = keep forever
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retention-files">
                        Uploaded Files (days)
                      </Label>
                      <Input
                        id="retention-files"
                        type="number"
                        defaultValue="30"
                      />
                      <p className="text-xs text-muted-foreground">
                        0 = keep forever
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Backup Configuration</Label>
                      <p className="text-sm text-muted-foreground">
                        Configure automated backups
                      </p>
                    </div>
                    <Switch id="backups-enabled" defaultChecked />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-time">Time (UTC)</Label>
                      <Input
                        id="backup-time"
                        type="time"
                        defaultValue="02:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-retention">Retention (days)</Label>
                      <Input
                        id="backup-retention"
                        type="number"
                        defaultValue="30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-location">Backup Location</Label>
                    <Select defaultValue="s3">
                      <SelectTrigger id="backup-location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Storage</SelectItem>
                        <SelectItem value="s3">Amazon S3</SelectItem>
                        <SelectItem value="gcs">
                          Google Cloud Storage
                        </SelectItem>
                        <SelectItem value="azure">
                          Azure Blob Storage
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="outline" className="mr-2">
              <RefreshCw className="mr-2 h-4 w-4" /> Test Connection
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Configuration
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemConfigPanel;
