import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Brain,
    LayoutTemplate,
    MessageCircle,
    FileText,
    Plus,
    Edit,
    Trash2,
} from "lucide-react";
import { FollowUpQuestion, ResponseFormat, AIConfig } from "./types";

interface FormattingTabProps {
    followUpQuestions: FollowUpQuestion[];
    responseFormats: ResponseFormat[];
    currentConfig: AIConfig;
    onConfigChange: (key: keyof AIConfig, value: any) => void;
}

const FormattingTab: React.FC<FormattingTabProps> = ({
    followUpQuestions,
    responseFormats,
    currentConfig,
    onConfigChange,
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Brand Voice - 6 cols */}
                <Card className="md:col-span-6 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <Brain className="mr-2 h-5 w-5 text-primary" />
                            Brand Voice
                        </CardTitle>
                        <CardDescription>
                            Define your brand's personality and tone
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="brand-name" className="text-base font-medium">Brand Name</Label>
                            <Input id="brand-name" placeholder="Your Company Name" defaultValue="Al Yalayis" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="brand-tone" className="text-base font-medium">Brand Tone</Label>
                            <Select defaultValue="professional">
                                <SelectTrigger id="brand-tone">
                                    <SelectValue placeholder="Select tone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                                    <SelectItem value="professional">Professional & Authoritative</SelectItem>
                                    <SelectItem value="casual">Casual & Conversational</SelectItem>
                                    <SelectItem value="technical">Technical & Precise</SelectItem>
                                    <SelectItem value="energetic">Energetic & Enthusiastic</SelectItem>
                                    <SelectItem value="luxury">Luxury & Exclusive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="brand-persona" className="text-base font-medium">Brand Persona</Label>
                            <Textarea
                                id="brand-persona"
                                placeholder="Describe your brand's persona and personality traits..."
                                defaultValue="Al Yalayis is a prestigious, knowledgeable business hub that provides premium services across government transactions, property, luxury transport, and workforce solutions in the UAE. Al Yalayis is professional, reliable, and focused on delivering exceptional service with Arabic hospitality values."
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="brand-values" className="text-base font-medium">Key Brand Values</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Badge>Excellence</Badge>
                                <Badge>Reliability</Badge>
                                <Badge>Luxury</Badge>
                                <Badge>Efficiency</Badge>
                                <Badge>Expertise</Badge>
                                <Badge variant="outline" className="flex items-center gap-1 cursor-pointer">
                                    <Plus className="h-3 w-3" /> Add Value
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Response Formatting - 6 cols */}
                <Card className="md:col-span-6 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <LayoutTemplate className="mr-2 h-5 w-5 text-primary" />
                            Response Format
                        </CardTitle>
                        <CardDescription>
                            Choose how AI responses should be structured
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="response-format" className="text-base font-medium">Format Template</Label>
                            <Select
                                value={currentConfig.selectedResponseFormatId}
                                onValueChange={(value) => onConfigChange("selectedResponseFormatId", value)}
                            >
                                <SelectTrigger id="response-format">
                                    <SelectValue placeholder="Select a response format" />
                                </SelectTrigger>
                                <SelectContent>
                                    {responseFormats.map((format) => (
                                        <SelectItem key={format.id} value={format.id}>
                                            {format.name}
                                            {format.isDefault && (
                                                <span className="ml-2 text-xs text-muted-foreground">
                                                    (Default)
                                                </span>
                                            )}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {responseFormats.find(
                            (f: ResponseFormat) => f.id === currentConfig.selectedResponseFormatId,
                        ) && (
                                <div className="space-y-4 bg-muted/20 p-4 rounded-lg border">
                                    <div>
                                        <Label className="text-base font-medium mb-1 block">About This Format</Label>
                                        <p className="text-sm text-muted-foreground">
                                            {
                                                responseFormats.find(
                                                    (f: ResponseFormat) =>
                                                        f.id === currentConfig.selectedResponseFormatId,
                                                )?.description
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-base font-medium mb-1 block">Template Structure</Label>
                                        <div className="bg-muted/50 p-3 rounded-md text-sm font-mono">
                                            <pre className="whitespace-pre-wrap">
                                                {
                                                    responseFormats.find(
                                                        (f: ResponseFormat) =>
                                                            f.id === currentConfig.selectedResponseFormatId,
                                                    )?.template
                                                }
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            )}

                        <div className="flex justify-end">
                            <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-1" /> Create New Format
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Structure Elements - 6 cols */}
                <Card className="md:col-span-6 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <FileText className="mr-2 h-5 w-5 text-primary" />
                            Response Elements
                        </CardTitle>
                        <CardDescription>
                            Choose which elements to include in responses
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center space-x-2 p-2 border rounded-md">
                                    <Checkbox id="titles" defaultChecked />
                                    <div>
                                        <Label htmlFor="titles" className="font-medium block">Titles & Headings</Label>
                                        <p className="text-xs text-muted-foreground">Section headers for organization</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 p-2 border rounded-md">
                                    <Checkbox id="bullets" defaultChecked />
                                    <div>
                                        <Label htmlFor="bullets" className="font-medium block">Bullet Points</Label>
                                        <p className="text-xs text-muted-foreground">Lists for easy scanning</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 p-2 border rounded-md">
                                    <Checkbox id="links" defaultChecked />
                                    <div>
                                        <Label htmlFor="links" className="font-medium block">Clickable Links</Label>
                                        <p className="text-xs text-muted-foreground">References to related content</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 p-2 border rounded-md">
                                    <Checkbox id="highlights" defaultChecked />
                                    <div>
                                        <Label htmlFor="highlights" className="font-medium block">Highlights</Label>
                                        <p className="text-xs text-muted-foreground">Key points emphasized</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 p-2 border rounded-md">
                                    <Checkbox id="step-by-step" defaultChecked />
                                    <div>
                                        <Label htmlFor="step-by-step" className="font-medium block">Step-by-Step</Label>
                                        <p className="text-xs text-muted-foreground">Numbered instructions</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 p-2 border rounded-md">
                                    <Checkbox id="examples" defaultChecked />
                                    <div>
                                        <Label htmlFor="examples" className="font-medium block">Examples</Label>
                                        <p className="text-xs text-muted-foreground">Illustrative samples</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <Label htmlFor="response-length" className="text-base font-medium">Preferred Response Length</Label>
                                <Select defaultValue="medium">
                                    <SelectTrigger id="response-length">
                                        <SelectValue placeholder="Select length" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="concise">Concise (1-2 paragraphs)</SelectItem>
                                        <SelectItem value="medium">Medium (2-3 paragraphs)</SelectItem>
                                        <SelectItem value="detailed">Detailed (4+ paragraphs)</SelectItem>
                                        <SelectItem value="adaptive">Adaptive to query complexity</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Follow-up Questions - 6 cols */}
                <Card className="md:col-span-6 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                            Follow-up Suggestions
                        </CardTitle>
                        <CardDescription>
                            Buttons shown to users after AI responses
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="enable-followup"
                                        checked={currentConfig.enableFollowUpQuestions}
                                        onCheckedChange={(checked) =>
                                            onConfigChange("enableFollowUpQuestions", checked)
                                        }
                                    />
                                    <Label htmlFor="enable-followup" className="font-medium">Show follow-up suggestions</Label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="followup-position" className="text-base font-medium">Position</Label>
                                <Select defaultValue="end">
                                    <SelectTrigger id="followup-position">
                                        <SelectValue placeholder="Select position" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="start">At the start of response</SelectItem>
                                        <SelectItem value="end">At the end of response</SelectItem>
                                        <SelectItem value="inline">Inline within response</SelectItem>
                                        <SelectItem value="adaptive">Context-adaptive positioning</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label className="text-base font-medium">Questions</Label>
                                    <Button variant="outline" size="sm" disabled={!currentConfig.enableFollowUpQuestions}>
                                        <Plus className="h-4 w-4 mr-1" /> Add Question
                                    </Button>
                                </div>

                                <div className={`space-y-3 ${!currentConfig.enableFollowUpQuestions && "opacity-50"}`}>
                                    {followUpQuestions.map((question) => (
                                        <div
                                            key={question.id}
                                            className="p-3 rounded-lg border"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium">{question.question}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Context: {question.context}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FormattingTab;
