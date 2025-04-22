import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
    MessageSquare,
    Sparkles,
    MessageCircle,
    FileText,
    Plus,
} from "lucide-react";
import { Prompt, FollowUpQuestion, AIConfig } from "./types";

interface ConfigurationTabProps {
    prompts: Prompt[];
    followUpQuestions: FollowUpQuestion[];
    currentConfig: AIConfig;
    onConfigChange: (key: keyof AIConfig, value: any) => void;
    onToggleFollowUpQuestion: (id: string) => void;
    onOpenNewPromptDialog: () => void;
}

const ConfigurationTab: React.FC<ConfigurationTabProps> = ({
    prompts,
    followUpQuestions,
    currentConfig,
    onConfigChange,
    onToggleFollowUpQuestion,
    onOpenNewPromptDialog,
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Prompt Selection - 8 cols */}
                <Card className="md:col-span-8 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                            Prompt & Instructions
                        </CardTitle>
                        <CardDescription>
                            Define how your AI's tone, style and approach to conversations
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="prompt-template" className="text-base font-medium">Choose a Prompt Template</Label>
                            <div className="flex gap-3">
                                <Select
                                    value={currentConfig.selectedPromptId}
                                    onValueChange={(value) =>
                                        onConfigChange("selectedPromptId", value)
                                    }
                                >
                                    <SelectTrigger id="prompt-template" className="w-full">
                                        <SelectValue placeholder="Select a Prompt template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {prompts.map((prompt) => (
                                            <SelectItem key={prompt.id} value={prompt.id}>
                                                {prompt.name}
                                                {prompt.isDefault && (
                                                    <span className="ml-2 text-xs text-muted-foreground">
                                                        (Default)
                                                    </span>
                                                )}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant="outline"
                                    onClick={onOpenNewPromptDialog}
                                >
                                    <Plus className="h-4 w-4 mr-1" /> New
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                This defines your AI's tone, style and approach to conversations
                            </p>
                        </div>

                        {prompts.find(
                            (p: Prompt) => p.id === currentConfig.selectedPromptId,
                        ) && (
                                <div className="space-y-4 bg-muted/20 p-4 rounded-lg border">
                                    <div>
                                        <Label className="text-base font-medium mb-1 block">About This Prompt</Label>
                                        <p className="text-sm text-muted-foreground">
                                            {
                                                prompts.find(
                                                    (p: Prompt) => p.id === currentConfig.selectedPromptId,
                                                )?.description
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-base font-medium mb-1 block">
                                            Instructions for AI
                                        </Label>
                                        <div className="bg-muted/50 p-3 rounded-md text-sm">
                                            <pre className="whitespace-pre-wrap">
                                                {
                                                    prompts.find(
                                                        (p: Prompt) => p.id === currentConfig.selectedPromptId,
                                                    )?.content
                                                }
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </CardContent>
                </Card>

                {/* Model Settings - 4 cols */}
                <Card className="md:col-span-4 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <Sparkles className="mr-2 h-5 w-5 text-primary" />
                            AI Model
                        </CardTitle>
                        <CardDescription>
                            Select which AI model to use
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="model" className="text-base font-medium">AI Model</Label>
                                <Select
                                    value={currentConfig.model}
                                    onValueChange={(value) =>
                                        onConfigChange("model", value)
                                    }
                                >
                                    <SelectTrigger id="model">
                                        <SelectValue placeholder="Select model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gpt-3.5-turbo">
                                            GPT-3.5 Turbo
                                        </SelectItem>
                                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                                        <SelectItem value="claude-2">Claude 2</SelectItem>
                                        <SelectItem value="gemini">Gemini</SelectItem>
                                        <SelectItem value="huggingface">Hugging Face</SelectItem>
                                        <SelectItem value="llama-2">Llama 2</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Select the AI model that best suits your needs
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label htmlFor="temperature" className="text-base font-medium">
                                        Creativity: {currentConfig.temperature}
                                    </Label>
                                    <span className="text-sm text-muted-foreground">
                                        {currentConfig.temperature <= 0.3 ? "More precise" :
                                            currentConfig.temperature >= 0.7 ? "More creative" : "Balanced"}
                                    </span>
                                </div>
                                <Slider
                                    id="temperature"
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    value={[currentConfig.temperature]}
                                    onValueChange={(value) =>
                                        onConfigChange("temperature", value[0])
                                    }
                                />
                                <p className="text-sm text-muted-foreground">
                                    Lower = more consistent, higher = more creative
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="max-tokens" className="text-base font-medium">
                                    Response Length
                                </Label>
                                <Select
                                    value={currentConfig.maxTokens.toString()}
                                    onValueChange={(value) =>
                                        onConfigChange("maxTokens", parseInt(value))
                                    }
                                >
                                    <SelectTrigger id="max-tokens">
                                        <SelectValue placeholder="Select length" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="256">Short (256 tokens)</SelectItem>
                                        <SelectItem value="512">Medium (512 tokens)</SelectItem>
                                        <SelectItem value="1024">Standard (1024 tokens)</SelectItem>
                                        <SelectItem value="2048">Long (2048 tokens)</SelectItem>
                                        <SelectItem value="4000">Very Long (4000 tokens)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground">
                                    Maximum length of generated responses
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Follow-up Questions - 6 cols */}
                <Card className="md:col-span-6 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                            Follow-up Questions
                        </CardTitle>
                        <CardDescription>
                            Suggested questions to keep the conversation going
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="follow-up-questions"
                                    checked={currentConfig.enableFollowUpQuestions}
                                    onCheckedChange={(checked) =>
                                        onConfigChange("enableFollowUpQuestions", checked)
                                    }
                                />
                                <Label htmlFor="follow-up-questions" className="text-base font-medium">
                                    Show follow-up suggestions to users
                                </Label>
                            </div>
                        </div>

                        <div
                            className={`space-y-3 ${!currentConfig.enableFollowUpQuestions && "opacity-50"}`}
                        >
                            {followUpQuestions.map((question) => (
                                <div
                                    key={question.id}
                                    className={`p-3 rounded-lg border-2 transition-all ${currentConfig.selectedFollowUpQuestionIds.includes(
                                        question.id,
                                    ) && currentConfig.enableFollowUpQuestions
                                        ? "border-primary bg-primary/5"
                                        : "border-border"
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`question-${question.id}`}
                                                checked={currentConfig.selectedFollowUpQuestionIds.includes(
                                                    question.id,
                                                )}
                                                onCheckedChange={() =>
                                                    onToggleFollowUpQuestion(question.id)
                                                }
                                                disabled={!currentConfig.enableFollowUpQuestions}
                                            />
                                            <Label
                                                htmlFor={`question-${question.id}`}
                                                className="font-medium"
                                            >
                                                {question.question}
                                            </Label>
                                            {question.isDefault && (
                                                <Badge variant="outline" className="text-xs">
                                                    Default
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-6 mt-1 text-xs text-muted-foreground">
                                        Context: {question.context}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" disabled={!currentConfig.enableFollowUpQuestions}>
                                <Plus className="h-4 w-4 mr-1" /> Add Question
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Custom Instructions - 6 cols */}
                <Card className="md:col-span-6 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <FileText className="mr-2 h-5 w-5 text-primary" />
                            Additional Instructions
                        </CardTitle>
                        <CardDescription>
                            Extra guidance for your AI assistant
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="custom-instructions" className="text-base font-medium">Custom Instructions</Label>
                            <Textarea
                                id="custom-instructions"
                                placeholder="Enter any additional instructions for the AI..."
                                className="min-h-[150px]"
                                value={currentConfig.customInstructions}
                                onChange={(e) =>
                                    onConfigChange("customInstructions", e.target.value)
                                }
                            />
                            <p className="text-sm text-muted-foreground">
                                These instructions will be appended to the Prompt template
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ConfigurationTab;
