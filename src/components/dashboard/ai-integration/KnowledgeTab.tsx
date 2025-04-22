import React from "react";
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
import { Database, BookOpen, FileText, Plus, RefreshCw } from "lucide-react";
import { KnowledgeBase, ContextRule, AIConfig } from "./types";

interface KnowledgeTabProps {
    knowledgeBases: KnowledgeBase[];
    contextRules: ContextRule[];
    currentConfig: AIConfig;
    onToggleKnowledgeBase: (id: string) => void;
    onToggleContextRule: (id: string) => void;
}

const KnowledgeTab: React.FC<KnowledgeTabProps> = ({
    knowledgeBases,
    contextRules,
    currentConfig,
    onToggleKnowledgeBase,
    onToggleContextRule,
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Knowledge Bases - 6 cols */}
                <Card className="md:col-span-6 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <Database className="mr-2 h-5 w-5 text-primary" />
                            Knowledge Bases
                        </CardTitle>
                        <CardDescription>
                            Data sources that the AI can reference
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {knowledgeBases.map((kb) => (
                                <div
                                    key={kb.id}
                                    className={`p-4 rounded-lg border-2 transition-all ${currentConfig.selectedKnowledgeBaseIds.includes(kb.id)
                                        ? "border-primary bg-primary/5"
                                        : "border-border"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            id={`kb-${kb.id}`}
                                            checked={currentConfig.selectedKnowledgeBaseIds.includes(kb.id)}
                                            onCheckedChange={() => onToggleKnowledgeBase(kb.id)}
                                        />
                                        <div className="flex-1">
                                            <Label
                                                htmlFor={`kb-${kb.id}`}
                                                className="text-base font-medium block"
                                            >
                                                {kb.name}
                                            </Label>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {kb.description}
                                            </p>
                                            <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                                                <span className="flex items-center">
                                                    <FileText className="h-3 w-3 mr-1" /> {kb.documentCount} documents
                                                </span>
                                                <span className="flex items-center">
                                                    <BookOpen className="h-3 w-3 mr-1" /> {kb.size}
                                                </span>
                                                <span className="flex items-center">
                                                    <RefreshCw className="h-3 w-3 mr-1" /> Updated {kb.lastUpdated}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end">
                                <Button variant="outline" size="sm">
                                    <Plus className="h-4 w-4 mr-1" /> Add Knowledge Base
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Context Rules - 6 cols */}
                <Card className="md:col-span-6 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <BookOpen className="mr-2 h-5 w-5 text-primary" />
                            Context Rules
                        </CardTitle>
                        <CardDescription>
                            Additional context for the AI to consider
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {contextRules.map((rule) => (
                                <div
                                    key={rule.id}
                                    className={`p-4 rounded-lg border-2 transition-all ${currentConfig.selectedContextRuleIds.includes(rule.id)
                                        ? "border-primary bg-primary/5"
                                        : "border-border"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            id={`rule-${rule.id}`}
                                            checked={currentConfig.selectedContextRuleIds.includes(rule.id)}
                                            onCheckedChange={() => onToggleContextRule(rule.id)}
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <Label
                                                    htmlFor={`rule-${rule.id}`}
                                                    className="text-base font-medium"
                                                >
                                                    {rule.name}
                                                </Label>
                                                <Badge variant={rule.isActive ? "default" : "outline"}>
                                                    {rule.isActive ? "Active" : "Inactive"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {rule.description}
                                            </p>
                                            <div className="mt-2 p-2 bg-muted/30 rounded-md text-xs">
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-medium">
                                                        {rule.type === "document" ? "Document" :
                                                            rule.type === "website" ? "Website" : "Custom Text"}:
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        Priority: {rule.priority}
                                                    </span>
                                                </div>
                                                <div className="truncate">
                                                    {rule.content}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end">
                                <Button variant="outline" size="sm">
                                    <Plus className="h-4 w-4 mr-1" /> Add Context Rule
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Advanced Knowledge Settings - 12 cols */}
                <Card className="md:col-span-12 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <Database className="mr-2 h-5 w-5 text-primary" />
                            Advanced Knowledge Settings
                        </CardTitle>
                        <CardDescription>
                            Configure how knowledge sources are processed and combined
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-base font-medium">Knowledge Refresh</Label>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Button variant="outline" className="w-full">
                                        <RefreshCw className="mr-2 h-4 w-4" /> Refresh Knowledge Now
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Last refreshed: Today at 10:45 AM
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-base font-medium">Knowledge Processing</Label>
                                <div className="flex flex-col gap-2 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="enable-chunking" defaultChecked />
                                        <Label htmlFor="enable-chunking">Document chunking</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="enable-summaries" defaultChecked />
                                        <Label htmlFor="enable-summaries">Generate summaries</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="extract-keywords" defaultChecked />
                                        <Label htmlFor="extract-keywords">Extract keywords</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-base font-medium">Conflict Resolution</Label>
                                <div className="flex flex-col gap-2 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="use-priority" defaultChecked />
                                        <Label htmlFor="use-priority">Use source priority</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="use-recency" defaultChecked />
                                        <Label htmlFor="use-recency">Prefer recent data</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="disclose-conflicts" />
                                        <Label htmlFor="disclose-conflicts">Disclose conflicts to user</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default KnowledgeTab;
