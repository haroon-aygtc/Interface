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
import { Switch } from "@/components/ui/switch";
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
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Check,
  AlertCircle,
  Play,
} from "lucide-react";

interface ContextRule {
  id: string;
  name: string;
  description: string;
  type: "keyword" | "regex" | "semantic" | "custom";
  pattern: string;
  action: "include" | "exclude" | "prioritize" | "transform";
  priority: number;
  isActive: boolean;
}

interface ContextRulesPanelProps {
  defaultTab?: string;
}

const ContextRulesPanel: React.FC<ContextRulesPanelProps> = ({ defaultTab = "rules-list" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedRule, setSelectedRule] = useState<ContextRule | null>(null);
  const [testInput, setTestInput] = useState("");
  const [testResult, setTestResult] = useState<{
    matches: boolean;
    details: string;
  } | null>(null);

  // Mock data for context rules
  const [rules, setRules] = useState<ContextRule[]>([
    {
      id: "1",
      name: "Product Information",
      description: "Include product specifications and pricing details",
      type: "keyword",
      pattern: "product, pricing, specifications, features",
      action: "include",
      priority: 10,
      isActive: true,
    },
    {
      id: "2",
      name: "Personal Information Filter",
      description: "Exclude personal identifiable information",
      type: "regex",
      pattern: "\\b\\d{3}-\\d{2}-\\d{4}\\b|\\b\\d{16}\\b",
      action: "exclude",
      priority: 20,
      isActive: true,
    },
    {
      id: "3",
      name: "Technical Support Queries",
      description: "Prioritize technical support related content",
      type: "semantic",
      pattern: "error, issue, problem, help, support, troubleshoot",
      action: "prioritize",
      priority: 5,
      isActive: false,
    },
    {
      id: "4",
      name: "Format Code Snippets",
      description: "Transform code snippets for better readability",
      type: "custom",
      pattern: "```.*?```",
      action: "transform",
      priority: 15,
      isActive: true,
    },
  ]);

  const handleEditRule = (rule: ContextRule) => {
    setSelectedRule(rule);
    setActiveTab("create-edit");
  };

  const handleCreateNewRule = () => {
    setSelectedRule(null);
    setActiveTab("create-edit");
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId));
  };

  const handleToggleActive = (ruleId: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule,
      ),
    );
  };

  const handleTestRule = () => {
    if (!selectedRule || !testInput) return;

    let matches = false;
    let details = "";

    switch (selectedRule.type) {
      case "keyword":
        const keywords = selectedRule.pattern
          .split(",")
          .map((k) => k.trim().toLowerCase());
        const inputLower = testInput.toLowerCase();
        const matchedKeywords = keywords.filter((keyword) =>
          inputLower.includes(keyword),
        );
        matches = matchedKeywords.length > 0;
        details = matches
          ? `Matched keywords: ${matchedKeywords.join(", ")}`
          : "No keywords matched";
        break;

      case "regex":
        try {
          const regex = new RegExp(selectedRule.pattern, "i");
          matches = regex.test(testInput);
          details = matches
            ? `Matched pattern: ${selectedRule.pattern}`
            : "No regex match found";
        } catch (error) {
          details = `Error in regex pattern: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
        break;

      case "semantic":
        // Simplified semantic matching for demo purposes
        const semanticTerms = selectedRule.pattern
          .split(",")
          .map((t) => t.trim().toLowerCase());
        const words = testInput.toLowerCase().split(/\s+/);
        const matchedTerms = semanticTerms.filter((term) =>
          words.includes(term),
        );
        matches = matchedTerms.length > 0;
        details = matches
          ? `Semantic match found with terms: ${matchedTerms.join(", ")}`
          : "No semantic match found";
        break;

      case "custom":
        // Simplified custom matching for demo purposes
        try {
          const customRegex = new RegExp(selectedRule.pattern, "is");
          matches = customRegex.test(testInput);
          details = matches
            ? `Custom pattern matched: ${selectedRule.pattern}`
            : "No custom pattern match found";
        } catch (error) {
          details = `Error in custom pattern: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
        break;
    }

    setTestResult({ matches, details });
  };

  const getActionBadge = (action: ContextRule["action"]) => {
    switch (action) {
      case "include":
        return <Badge className="bg-green-500">Include</Badge>;
      case "exclude":
        return <Badge className="bg-red-500">Exclude</Badge>;
      case "prioritize":
        return <Badge className="bg-blue-500">Prioritize</Badge>;
      case "transform":
        return <Badge className="bg-purple-500">Transform</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: ContextRule["type"]) => {
    switch (type) {
      case "keyword":
        return <Badge variant="outline">Keyword</Badge>;
      case "regex":
        return <Badge variant="outline">Regex</Badge>;
      case "semantic":
        return <Badge variant="outline">Semantic</Badge>;
      case "custom":
        return <Badge variant="outline">Custom</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Context Rules Management</h1>
        <Button onClick={handleCreateNewRule}>
          <Plus className="mr-2 h-4 w-4" /> Create New Rule
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="rules-list">Rules List</TabsTrigger>
          <TabsTrigger value="create-edit">
            {selectedRule ? "Edit Rule" : "Create Rule"}
          </TabsTrigger>
          <TabsTrigger value="test-rules">Test Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="rules-list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Context Rules</CardTitle>
              <CardDescription>
                Manage rules that determine how content is processed for your AI
                chat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Input
                  placeholder="Search rules..."
                  className="max-w-sm mr-2"
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="keyword">Keyword</SelectItem>
                    <SelectItem value="regex">Regex</SelectItem>
                    <SelectItem value="semantic">Semantic</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{rule.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {rule.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(rule.type)}</TableCell>
                      <TableCell>{getActionBadge(rule.action)}</TableCell>
                      <TableCell>{rule.priority}</TableCell>
                      <TableCell>
                        <Switch
                          checked={rule.isActive}
                          onCheckedChange={() => handleToggleActive(rule.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditRule(rule)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteRule(rule.id)}
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
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedRule ? "Edit Context Rule" : "Create New Context Rule"}
              </CardTitle>
              <CardDescription>
                {selectedRule
                  ? "Modify the configuration for this context rule"
                  : "Configure a new rule to control how content is processed"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <Input
                    id="rule-name"
                    placeholder="e.g., Product Information Filter"
                    defaultValue={selectedRule?.name || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule-type">Rule Type</Label>
                  <Select defaultValue={selectedRule?.type || "keyword"}>
                    <SelectTrigger id="rule-type">
                      <SelectValue placeholder="Select rule type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keyword">Keyword Matching</SelectItem>
                      <SelectItem value="regex">Regular Expression</SelectItem>
                      <SelectItem value="semantic">
                        Semantic Matching
                      </SelectItem>
                      <SelectItem value="custom">Custom Logic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rule-description">Description</Label>
                <Textarea
                  id="rule-description"
                  placeholder="Describe what this rule does"
                  defaultValue={selectedRule?.description || ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rule-pattern">Pattern</Label>
                <Textarea
                  id="rule-pattern"
                  placeholder="Enter keywords, regex pattern, or custom logic"
                  defaultValue={selectedRule?.pattern || ""}
                />
                <p className="text-sm text-muted-foreground">
                  For keyword type, separate multiple keywords with commas. For
                  regex, use standard regular expression syntax.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rule-action">Action</Label>
                  <Select defaultValue={selectedRule?.action || "include"}>
                    <SelectTrigger id="rule-action">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="include">Include Content</SelectItem>
                      <SelectItem value="exclude">Exclude Content</SelectItem>
                      <SelectItem value="prioritize">
                        Prioritize Content
                      </SelectItem>
                      <SelectItem value="transform">
                        Transform Content
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule-priority">Priority</Label>
                  <Input
                    id="rule-priority"
                    type="number"
                    min="1"
                    max="100"
                    defaultValue={selectedRule?.priority.toString() || "10"}
                  />
                  <p className="text-sm text-muted-foreground">
                    Higher numbers indicate higher priority
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="rule-active"
                  defaultChecked={selectedRule?.isActive ?? true}
                />
                <Label htmlFor="rule-active">Rule is active</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("rules-list")}
              >
                Cancel
              </Button>
              <Button>{selectedRule ? "Update Rule" : "Create Rule"}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="test-rules">
          <Card>
            <CardHeader>
              <CardTitle>Test Context Rules</CardTitle>
              <CardDescription>
                Test how your rules process different types of content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="space-y-2">
                    <Label htmlFor="test-input">Test Input</Label>
                    <Textarea
                      id="test-input"
                      placeholder="Enter text to test against your rules"
                      className="min-h-[200px]"
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="space-y-2">
                    <Label>Select Rule to Test</Label>
                    <div className="border rounded-md divide-y">
                      {rules.map((rule) => (
                        <div
                          key={rule.id}
                          className={`p-3 cursor-pointer hover:bg-muted ${selectedRule?.id === rule.id ? "bg-muted" : ""}`}
                          onClick={() => setSelectedRule(rule)}
                        >
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            {getTypeBadge(rule.type)}
                            {getActionBadge(rule.action)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleTestRule}
                disabled={!selectedRule || !testInput}
                className="w-full"
              >
                <Play className="mr-2 h-4 w-4" />
                Test Selected Rule
              </Button>

              {testResult && (
                <div
                  className={`p-4 rounded-md ${testResult.matches ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {testResult.matches ? (
                      <>
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-600">
                          Rule matched!
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-600">
                          No match found
                        </span>
                      </>
                    )}
                  </div>
                  <p
                    className={
                      testResult.matches ? "text-green-700" : "text-red-700"
                    }
                  >
                    {testResult.details}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContextRulesPanel;
