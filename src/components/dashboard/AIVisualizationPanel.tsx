import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, BarChart2, Zap, MessageSquare, Sparkles, FileText, Clock, ThumbsUp, ThumbsDown } from "lucide-react";

interface AIVisualizationPanelProps {
  conversationId?: string;
}

const AIVisualizationPanel: React.FC<AIVisualizationPanelProps> = ({ conversationId }) => {
  const [activeTab, setActiveTab] = useState("insights");
  const [confidenceScore, setConfidenceScore] = useState(87);
  const [sentimentScore, setSentimentScore] = useState(72);
  const [processingTime, setProcessingTime] = useState(0.8);
  const [tokenUsage, setTokenUsage] = useState({ input: 124, output: 356 });
  const [topEntities, setTopEntities] = useState([
    { name: "Product Features", count: 5, type: "feature" },
    { name: "Pricing", count: 3, type: "topic" },
    { name: "Technical Support", count: 2, type: "service" },
  ]);
  const [topIntents, setTopIntents] = useState([
    { name: "Information Request", confidence: 0.92 },
    { name: "Technical Help", confidence: 0.78 },
    { name: "Pricing Inquiry", confidence: 0.65 },
  ]);
  const [modelUsed, setModelUsed] = useState("GPT-4");
  const [knowledgeSourcesUsed, setKnowledgeSourcesUsed] = useState([
    { name: "Product Documentation", relevance: 0.95 },
    { name: "FAQ Database", relevance: 0.82 },
    { name: "Technical Guides", relevance: 0.76 },
  ]);
  
  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConfidenceScore(prev => Math.min(100, prev + Math.random() * 2 - 1));
      setSentimentScore(prev => Math.min(100, prev + Math.random() * 2 - 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Brain className="mr-2 h-6 w-6 text-primary" />
            AI Visualization
          </h1>
          <p className="text-muted-foreground">
            Real-time insights and analytics for your AI conversations
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Clock className="mr-2 h-4 w-4" />
          Live Data
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="insights">
            <Sparkles className="mr-2 h-4 w-4" /> AI Insights
          </TabsTrigger>
          <TabsTrigger value="performance">
            <BarChart2 className="mr-2 h-4 w-4" /> Performance
          </TabsTrigger>
          <TabsTrigger value="sources">
            <FileText className="mr-2 h-4 w-4" /> Knowledge Sources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Confidence Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{confidenceScore}%</div>
                <Progress value={confidenceScore} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  AI's confidence in its response accuracy
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{sentimentScore}%</div>
                <Progress value={sentimentScore} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Positive sentiment detected in conversation
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Processing Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">{processingTime}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Input Tokens</span>
                    <span className="text-sm font-medium">{tokenUsage.input}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Output Tokens</span>
                    <span className="text-sm font-medium">{tokenUsage.output}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Model Used</span>
                    <span className="text-sm font-medium">{modelUsed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Detected Entities
                </CardTitle>
                <CardDescription>
                  Key topics and entities identified in the conversation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEntities.map((entity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge 
                          variant="outline" 
                          className={
                            entity.type === "feature" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            entity.type === "topic" ? "bg-purple-50 text-purple-700 border-purple-200" :
                            "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {entity.type}
                        </Badge>
                        <span className="ml-2 font-medium">{entity.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Mentioned {entity.count} times
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Zap className="mr-2 h-4 w-4" />
                  Intent Recognition
                </CardTitle>
                <CardDescription>
                  User intents detected with confidence levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topIntents.map((intent, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{intent.name}</span>
                        <span className="text-sm">{Math.round(intent.confidence * 100)}%</span>
                      </div>
                      <Progress value={intent.confidence * 100} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-primary" />
                  Response Performance
                </CardTitle>
                <CardDescription>
                  Metrics on AI response quality and efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="rounded-full bg-primary/10 p-6 mx-auto w-fit">
                      <BarChart2 className="h-12 w-12 text-primary" />
                    </div>
                    <p className="mt-4">Performance visualization would appear here</p>
                    <p className="text-sm">Showing response times, accuracy trends, and token efficiency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ThumbsUp className="mr-2 h-5 w-5 text-primary" />
                  User Feedback Analysis
                </CardTitle>
                <CardDescription>
                  Feedback metrics and improvement opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-sm text-muted-foreground">Positive Feedback</div>
                    </div>
                    <div className="flex space-x-1">
                      <ThumbsUp className="h-5 w-5 text-green-500" />
                      <ThumbsUp className="h-5 w-5 text-green-500" />
                      <ThumbsUp className="h-5 w-5 text-green-500" />
                      <ThumbsUp className="h-5 w-5 text-green-500" />
                      <ThumbsUp className="h-5 w-5 text-muted" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Top Feedback Categories</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Accuracy</span>
                        <span className="text-sm font-medium">95%</span>
                      </div>
                      <Progress value={95} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Helpfulness</span>
                        <span className="text-sm font-medium">88%</span>
                      </div>
                      <Progress value={88} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Response Time</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Knowledge Sources Used
              </CardTitle>
              <CardDescription>
                Sources referenced by the AI to generate responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {knowledgeSourcesUsed.map((source, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{source.name}</div>
                      <Badge variant="outline">
                        {Math.round(source.relevance * 100)}% Relevance
                      </Badge>
                    </div>
                    <Progress value={source.relevance * 100} className="mb-2" />
                    <div className="text-sm text-muted-foreground">
                      This knowledge source was used to provide factual information and context for the response.
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIVisualizationPanel;
