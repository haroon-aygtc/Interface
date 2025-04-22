import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Zap,
    MessageSquare,
    RefreshCw,
    Loader2,
    Play,
    Copy,
    Settings,
} from "lucide-react";
import { AIConfig } from "./types";
import { ResponseFormat, Prompt } from "./types";

interface TestTabProps {
    currentConfig: AIConfig;
    prompts: Prompt[];
    responseFormats: ResponseFormat[];
}

const TestTab: React.FC<TestTabProps> = ({
    currentConfig,
    prompts,
    responseFormats,
}) => {
    const [testQuery, setTestQuery] = useState("");
    const [testResponse, setTestResponse] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    // Function to handle generating a test response
    const handleGenerateResponse = () => {
        if (!testQuery.trim()) return;

        setIsGenerating(true);
        setTestResponse("");

        // Simulate API call with typing effect
        let response = "";
        if (currentConfig.selectedPromptId === "p1") {
            response =
                "Thank you for your question! Based on our product documentation, the feature you're asking about is available in the Pro and Enterprise plans. The setup process is straightforward - you can access it from your account settings under 'Advanced Features'. If you need any help with the setup, our support team is available 24/7 through the chat widget on our website.";
        } else if (currentConfig.selectedPromptId === "p2") {
            response =
                "# Setting Up API Integration\n\n## Prerequisites\n- Valid API key (generate from your dashboard)\n- Account with Developer access or higher\n\n## Implementation Steps\n1. Install our SDK using npm: `npm install @example/sdk`\n2. Initialize the client with your API key\n3. Make your first API call using the provided examples\n\n**Note:** Rate limits apply based on your subscription tier.";
        } else if (currentConfig.selectedPromptId === "p4") {
            response =
                "# UAE Residency Visa Services\n\n**Description:** Al Yalayis Government Transaction Center provides comprehensive residency visa services for individuals, families, and companies.\n\n## Requirements\n- Passport copy with minimum 6 months validity\n- Emirates ID application form\n- Passport-sized photographs with white background\n- Proof of residence (tenancy contract/utility bill)\n- Medical fitness certificate from approved center\n\n## Process\n1. Submit application with required documents\n2. Complete biometrics at immigration center\n3. Medical testing at approved health center\n4. Receive Emirates ID and Residence Visa\n\n## Timeframe & Fees\n- Processing Time: 5-7 working days\n- Standard Fee: AED 3,000 (individual)\n- Fast-track Option: Additional AED 1,000 (2-3 working days)\n\n## Need Assistance?\nVisit our service center in Al Yalayis or call our helpline at 800-VISAS (84727)";
        } else if (currentConfig.selectedPromptId === "p5") {
            response =
                "Based on your requirements for a 3-bedroom apartment in Downtown Dubai, I recommend exploring these premium options:\n\n1. **The Address Downtown** - Luxury 3BR apartments starting from AED 4.2M with full Burj Khalifa views\n2. **Burj Vista** - Spacious 3BR units from AED 3.8M with modern finishes and amenities\n3. **Boulevard Heights** - Contemporary 3BR residences from AED 3.5M with boulevard views\n\nAll properties feature premium facilities including pools, gyms, and 24/7 security. Would you like to schedule viewings for any of these properties this week?";
        } else if (currentConfig.selectedPromptId === "p6") {
            response =
                "# Super Wheel Luxury Transport\n\nBased on your requirements for airport transfer services for 5 executives, I recommend our **Mercedes V-Class Executive Van** option.\n\n## Features:\n- Spacious seating for up to 6 passengers\n- Premium leather interior\n- Wi-Fi and charging ports\n- Refreshment cooler\n- Privacy divider\n- Professional uniformed chauffeur\n\n## Service Details:\n- Door-to-door service from your hotel to Dubai International Airport\n- Complimentary 30 minutes waiting time\n- Flight tracking to adjust for any changes\n- Meet & greet service at arrival terminal\n\n## Rate:\nAED 750 for one-way transfer\n\nWould you like me to arrange this booking for your team's airport transfer?";
        } else {
            response =
                "Based on your requirements, I recommend our Enterprise Solution package. It includes all the features you mentioned, plus dedicated support and custom integration options. The pricing starts at $499/month with annual billing, which gives you a 20% discount compared to monthly billing. Would you like me to connect you with a sales representative to discuss custom pricing options?";
        }

        let i = 0;
        const interval = setInterval(() => {
            setTestResponse(response.substring(0, i));
            i++;
            if (i > response.length) {
                clearInterval(interval);
                setIsGenerating(false);
            }
        }, 15);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <Card className="md:col-span-12 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <Zap className="mr-2 h-5 w-5 text-primary" />
                            Test Your AI Assistant
                        </CardTitle>
                        <CardDescription>
                            Enter a sample question to see how your AI would respond
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="test-query" className="text-base font-medium">Sample Question</Label>
                                <div className="flex gap-2">
                                    <Textarea
                                        id="test-query"
                                        placeholder="Type a sample question here..."
                                        className="flex-1"
                                        value={testQuery}
                                        onChange={(e) => setTestQuery(e.target.value)}
                                    />
                                    <Button
                                        className="self-end"
                                        onClick={handleGenerateResponse}
                                        disabled={isGenerating || !testQuery.trim()}
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Play className="mr-2 h-4 w-4" /> Generate Response
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="response" className="text-base font-medium">AI Response</Label>
                                    {testResponse && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                navigator.clipboard.writeText(testResponse)
                                            }
                                        >
                                            <Copy className="h-4 w-4 mr-1" /> Copy
                                        </Button>
                                    )}
                                </div>
                                <div
                                    className={`p-4 rounded-lg border min-h-[300px] ${testResponse ? "bg-muted/50" : "bg-muted/20"}`}
                                >
                                    {isGenerating ? (
                                        <div className="flex items-center space-x-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Generating response...</span>
                                        </div>
                                    ) : testResponse ? (
                                        <div className="whitespace-pre-wrap">
                                            {testResponse}
                                        </div>
                                    ) : (
                                        <div className="text-muted-foreground flex flex-col items-center justify-center h-full">
                                            <MessageSquare className="h-8 w-8 mb-2 opacity-50" />
                                            <p>AI response will appear here</p>
                                            <p className="text-sm">
                                                Try generating a response with your current
                                                configuration
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/20 flex justify-between">
                        <div className="text-sm text-muted-foreground">
                            Using model:{" "}
                            <span className="font-medium">{currentConfig.model}</span>{" "}
                            with creativity level{" "}
                            <span className="font-medium">
                                {currentConfig.temperature}
                            </span>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setTestQuery("");
                                setTestResponse("");
                            }}
                            disabled={!testQuery && !testResponse}
                        >
                            <RefreshCw className="mr-2 h-4 w-4" /> Reset
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="md:col-span-12 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="flex items-center text-lg">
                            <Settings className="mr-2 h-5 w-5 text-primary" />
                            Configuration Summary
                        </CardTitle>
                        <CardDescription>
                            Overview of your current AI configuration
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h3 className="text-sm font-medium mb-2">
                                    AI Basics
                                </h3>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>
                                        <span className="font-medium">Personality:</span> {" "}
                                        {prompts.find(
                                            (p: Prompt) => p.id === currentConfig.selectedPromptId,
                                        )?.name || "None selected"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Model:</span> {currentConfig.model}
                                    </p>
                                    <p>
                                        <span className="font-medium">Creativity Level:</span> {currentConfig.temperature}
                                    </p>
                                    <p>
                                        <span className="font-medium">Response Length:</span> {currentConfig.maxTokens} tokens
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">Knowledge Sources</h3>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>
                                        <span className="font-medium">Knowledge Bases:</span> {" "}
                                        {currentConfig.selectedKnowledgeBaseIds.length || 0} selected
                                    </p>
                                    <p>
                                        <span className="font-medium">Context Rules:</span> {" "}
                                        {currentConfig.selectedContextRuleIds.length || 0} active
                                    </p>
                                    <p>
                                        <span className="font-medium">Data Refresh:</span> Daily
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">Formatting & Branding</h3>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>
                                        <span className="font-medium">Brand Voice:</span> Professional
                                    </p>
                                    <p>
                                        <span className="font-medium">Response Format:</span> {" "}
                                        {responseFormats.find(
                                            (f: ResponseFormat) => f.id === currentConfig.selectedResponseFormatId,
                                        )?.name || "None selected"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Follow-up Questions:</span> {" "}
                                        {currentConfig.enableFollowUpQuestions ?
                                            `${currentConfig.selectedFollowUpQuestionIds.length} enabled` :
                                            "Disabled"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TestTab;
