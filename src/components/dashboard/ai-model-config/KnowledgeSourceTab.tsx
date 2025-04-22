import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Database,
  BookOpen,
  FileText,
  Plus,
  RefreshCw,
  Search,
  Globe,
  Code,
  Info,
  AlertCircle,
  Calendar,
  FileUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { KnowledgeSourceTabProps } from "./types";

const KnowledgeSourceTab: React.FC<KnowledgeSourceTabProps> = ({
  knowledgeBases,
  contextRules,
  currentConfig,
  onToggleKnowledgeBase,
  onToggleContextRule,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter knowledge bases based on search query
  const filteredKnowledgeBases = knowledgeBases.filter((kb) =>
    kb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kb.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter context rules based on search query
  const filteredContextRules = contextRules.filter((rule) =>
    rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get icon based on knowledge base name
  const getKnowledgeBaseIcon = (name: string) => {
    if (name.includes("Documentation")) return <FileText className="h-5 w-5 text-blue-500" />;
    if (name.includes("FAQ")) return <BookOpen className="h-5 w-5 text-purple-500" />;
    if (name.includes("Guide")) return <BookOpen className="h-5 w-5 text-green-500" />;
    if (name.includes("API")) return <Code className="h-5 w-5 text-red-500" />;
    if (name.includes("Support")) return <Info className="h-5 w-5 text-amber-500" />;
    return <Database className="h-5 w-5 text-indigo-500" />;
  };

  // Get icon based on context rule type
  const getContextRuleIcon = (type: string) => {
    if (type === "document") return <FileText className="h-5 w-5 text-blue-500" />;
    if (type === "website") return <Globe className="h-5 w-5 text-green-500" />;
    return <Code className="h-5 w-5 text-purple-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Knowledge Bases - 6 cols */}
        <Card className="md:col-span-6 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-lg">
                  <span className="mr-2 h-5 w-5 text-[#D8A23B]">📚</span>
                  Knowledge Bases
                </CardTitle>
                <CardDescription>
                  Data sources that the AI can reference
                </CardDescription>
              </div>
              <Button 
                variant="outline"
                className="border-[#D8A23B]/30 hover:bg-[#D8A23B]/10 hover:text-[#D8A23B]"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Source
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search knowledge bases..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {filteredKnowledgeBases.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No knowledge bases found matching your search.
                </div>
              ) : (
                filteredKnowledgeBases.map((kb) => (
                  <div
                    key={kb.id}
                    className={`p-4 rounded-lg border flex items-start gap-4 transition-colors ${
                      currentConfig.selectedKnowledgeBaseIds.includes(kb.id)
                        ? "bg-[#D8A23B]/10 border-[#D8A23B]/30"
                        : "bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Checkbox
                        id={`kb-${kb.id}`}
                        checked={currentConfig.selectedKnowledgeBaseIds.includes(kb.id)}
                        onCheckedChange={() => onToggleKnowledgeBase(kb.id)}
                        className={currentConfig.selectedKnowledgeBaseIds.includes(kb.id) 
                          ? "border-[#D8A23B] data-[state=checked]:bg-[#D8A23B] data-[state=checked]:text-[#09090B]" 
                          : ""}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`kb-${kb.id}`}
                          className="text-base font-medium cursor-pointer"
                        >
                          {kb.name}
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {kb.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          {kb.documentCount} documents
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Updated: {kb.lastUpdated}
                        </div>
                        <div className="flex items-center">
                          <FileUp className="h-3.5 w-3.5 mr-1" />
                          {kb.size}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Context Rules - 6 cols */}
        <Card className="md:col-span-6 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-lg">
                  <span className="mr-2 h-5 w-5 text-[#D8A23B]">📋</span>
                  Context Rules
                </CardTitle>
                <CardDescription>
                  Rules that guide how context is processed
                </CardDescription>
              </div>
              <Button 
                variant="outline"
                className="border-[#D8A23B]/30 hover:bg-[#D8A23B]/10 hover:text-[#D8A23B]"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Rule
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {filteredContextRules.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No context rules found matching your search.
                </div>
              ) : (
                filteredContextRules.map((rule) => (
                  <div
                    key={rule.id}
                    className={`p-4 rounded-lg border flex items-start gap-4 transition-colors ${
                      currentConfig.selectedContextRuleIds.includes(rule.id)
                        ? "bg-[#D8A23B]/10 border-[#D8A23B]/30"
                        : "bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Checkbox
                        id={`rule-${rule.id}`}
                        checked={currentConfig.selectedContextRuleIds.includes(rule.id)}
                        onCheckedChange={() => onToggleContextRule(rule.id)}
                        className={currentConfig.selectedContextRuleIds.includes(rule.id) 
                          ? "border-[#D8A23B] data-[state=checked]:bg-[#D8A23B] data-[state=checked]:text-[#09090B]" 
                          : ""}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor={`rule-${rule.id}`}
                            className="text-base font-medium cursor-pointer"
                          >
                            {rule.name}
                          </label>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              rule.type === "document"
                                ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                                : rule.type === "website"
                                ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                                : "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800"
                            }`}
                          >
                            {rule.type}
                          </Badge>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge className="bg-muted text-muted-foreground">
                                Priority: {rule.priority}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60">
                                Priority determines the order in which rules are applied.
                                Higher numbers mean higher priority.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {rule.description}
                      </p>
                      <div className="mt-2 p-2 bg-muted/30 rounded text-xs border border-border">
                        <p className="line-clamp-2">{rule.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Selected Sources Summary - 12 cols */}
        <Card className="md:col-span-12 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-2">
            <CardTitle className="flex items-center text-lg">
              <span className="mr-2 h-5 w-5 text-[#D8A23B]">📊</span>
              Selected Knowledge Sources
            </CardTitle>
            <CardDescription>
              Summary of selected knowledge sources and context rules
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-medium mb-2 flex items-center">
                  <Database className="h-4 w-4 mr-2 text-[#D8A23B]" />
                  Knowledge Bases ({currentConfig.selectedKnowledgeBaseIds.length})
                </h3>
                <div className="space-y-2">
                  {currentConfig.selectedKnowledgeBaseIds.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No knowledge bases selected. Select at least one knowledge base for the AI to use.
                    </p>
                  ) : (
                    currentConfig.selectedKnowledgeBaseIds.map((id) => {
                      const kb = knowledgeBases.find((kb) => kb.id === id);
                      return kb ? (
                        <div
                          key={kb.id}
                          className="flex items-center gap-2 p-2 rounded-md bg-muted/30 border"
                        >
                          {getKnowledgeBaseIcon(kb.name)}
                          <div>
                            <div className="text-sm font-medium">{kb.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {kb.documentCount} documents • {kb.size}
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2 flex items-center">
                  <Code className="h-4 w-4 mr-2 text-[#D8A23B]" />
                  Context Rules ({currentConfig.selectedContextRuleIds.length})
                </h3>
                <div className="space-y-2">
                  {currentConfig.selectedContextRuleIds.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No context rules selected. Context rules help guide how the AI processes information.
                    </p>
                  ) : (
                    currentConfig.selectedContextRuleIds.map((id) => {
                      const rule = contextRules.find((rule) => rule.id === id);
                      return rule ? (
                        <div
                          key={rule.id}
                          className="flex items-center gap-2 p-2 rounded-md bg-muted/30 border"
                        >
                          {getContextRuleIcon(rule.type)}
                          <div>
                            <div className="text-sm font-medium">{rule.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {rule.type} • Priority: {rule.priority}
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeSourceTab;
