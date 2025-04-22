import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  LineChart,
  PieChart,

  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  MessageSquare,
  Clock,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Search,
  Zap,
  BarChart,
  Activity,
  FileText,
  Badge,
  Cog,
} from "lucide-react";

interface AnalyticsPanelProps {
  defaultTab?: string;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ defaultTab = "overview" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [timeRange, setTimeRange] = useState("30d");

  const renderMetricCard = (
    title: string,
    value: string,
    change: number,
    icon: React.ReactNode,
  ) => (
    <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs">
          {change > 0 ? (
            <>
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">
                {change}% from previous period
              </span>
            </>
          ) : (
            <>
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500">
                {Math.abs(change)}% from previous period
              </span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderChartPlaceholder = (title: string, icon: React.ReactNode) => (
    <div className="h-[300px] w-full bg-muted/30 rounded-md flex flex-col items-center justify-center p-6">
      {icon}
      <p className="mt-2 text-muted-foreground">{title}</p>
    </div>
  );

  return (
    <div className="w-full h-full bg-background">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex justify-end items-center mb-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="content">Content Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {renderMetricCard(
                "Total Conversations",
                "1,248",
                12.5,
                <MessageSquare className="h-4 w-4 text-muted-foreground" />,
              )}
              {renderMetricCard(
                "Active Users",
                "342",
                5.2,
                <Users className="h-4 w-4 text-muted-foreground" />,
              )}
              {renderMetricCard(
                "Avg. Response Time",
                "1.2s",
                -8.3,
                <Clock className="h-4 w-4 text-muted-foreground" />,
              )}
              {renderMetricCard(
                "Satisfaction Rate",
                "87%",
                3.1,
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />,
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>Conversation Trends</CardTitle>
                  <CardDescription>
                    Daily conversation volume over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {renderChartPlaceholder(
                    "Conversation trend visualization",
                    <LineChart className="h-8 w-8 text-muted-foreground/50" />,
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>User Distribution</CardTitle>
                  <CardDescription>
                    Users by device and platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {renderChartPlaceholder(
                    "User distribution visualization",
                    <PieChart className="h-8 w-8 text-muted-foreground/50" />,
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="bg-muted/30 pb-2">
                <CardTitle>Top Query Categories</CardTitle>
                <CardDescription>
                  Most common types of user queries
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {renderChartPlaceholder(
                  "Query categories visualization",
                  <BarChart3 className="h-8 w-8 text-muted-foreground/50" />,
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {renderMetricCard(
                "Avg. Session Duration",
                "4m 12s",
                7.8,
                <Clock className="h-4 w-4 text-muted-foreground" />,
              )}
              {renderMetricCard(
                "Messages per Session",
                "6.3",
                2.1,
                <MessageSquare className="h-4 w-4 text-muted-foreground" />,
              )}
              {renderMetricCard(
                "Return Rate",
                "42%",
                -1.5,
                <Users className="h-4 w-4 text-muted-foreground" />,
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>User Engagement Over Time</CardTitle>
                  <CardDescription>
                    How users interact with the chat widget
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {renderChartPlaceholder(
                    "User engagement visualization",
                    <Activity className="h-8 w-8 text-muted-foreground/50" />,
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>Feedback Distribution</CardTitle>
                  <CardDescription>
                    User feedback on AI responses
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Positive Feedback</Label>
                      <span className="text-green-500 font-medium">68%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Neutral Feedback</Label>
                      <span className="text-blue-500 font-medium">22%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "22%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Negative Feedback</Label>
                      <span className="text-red-500 font-medium">10%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="bg-muted/30 pb-2">
                <CardTitle>User Journey Analysis</CardTitle>
                <CardDescription>
                  How users progress through conversations
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {renderChartPlaceholder(
                  "User journey visualization",
                  <Activity className="h-8 w-8 text-muted-foreground/50" />,
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {renderMetricCard(
                "Avg. Response Time",
                "1.2s",
                -8.3,
                <Zap className="h-4 w-4 text-muted-foreground" />,
              )}
              {renderMetricCard(
                "Query Success Rate",
                "94%",
                2.7,
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />,
              )}
              {renderMetricCard(
                "Fallback Rate",
                "6%",
                -1.5,
                <HelpCircle className="h-4 w-4 text-muted-foreground" />,
              )}
              {renderMetricCard(
                "API Calls",
                "15,432",
                18.2,
                <Activity className="h-4 w-4 text-muted-foreground" />,
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>Response Time Distribution</CardTitle>
                  <CardDescription>
                    Performance metrics across different query types
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {renderChartPlaceholder(
                    "Response time visualization",
                    <BarChart className="h-8 w-8 text-muted-foreground/50" />,
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>Model Performance Comparison</CardTitle>
                  <CardDescription>
                    Comparing different AI models and configurations
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {renderChartPlaceholder(
                    "Model comparison visualization",
                    <BarChart3 className="h-8 w-8 text-muted-foreground/50" />,
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="bg-muted/30 pb-2">
                <CardTitle>Performance Over Time</CardTitle>
                <CardDescription>
                  How system performance has changed over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {renderChartPlaceholder(
                  "Performance trend visualization",
                  <LineChart className="h-8 w-8 text-muted-foreground/50" />,
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {renderMetricCard(
                "Top Search Terms",
                "124",
                15.3,
                <Search className="h-4 w-4 text-muted-foreground" />,
              )}
              {renderMetricCard(
                "Unanswered Queries",
                "32",
                -12.5,
                <HelpCircle className="h-4 w-4 text-muted-foreground" />,
              )}
              {renderMetricCard(
                "Content Sources Used",
                "8",
                33.3,
                <FileText className="h-4 w-4 text-muted-foreground" />,
              )}
            </div>

            <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="bg-muted/30 pb-2">
                <CardTitle>Popular Topics</CardTitle>
                <CardDescription>
                  Most frequently discussed topics in conversations
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { name: "Product Features", count: 342 },
                    { name: "Pricing", count: 256 },
                    { name: "Technical Support", count: 187 },
                    { name: "Installation", count: 145 },
                    { name: "Account Issues", count: 112 },
                    { name: "Billing", count: 98 },
                    { name: "API Integration", count: 76 },
                    { name: "Mobile App", count: 65 },
                    { name: "Security", count: 54 },
                    { name: "Updates", count: 43 },
                  ].map((topic) => (
                    <div
                      key={topic.name}
                      className="px-3 py-1 bg-muted rounded-full text-sm flex items-center"
                    >
                      {topic.name}
                      <span className="ml-2 bg-background px-2 py-0.5 rounded-full text-xs">
                        {topic.count}
                      </span>
                    </div>
                  ))}
                </div>
                {renderChartPlaceholder(
                  "Topic distribution visualization",
                  <PieChart className="h-8 w-8 text-muted-foreground/50" />,
                )}
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>Content Effectiveness</CardTitle>
                  <CardDescription>
                    How well different content sources perform
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {renderChartPlaceholder(
                    "Content effectiveness visualization",
                    <BarChart3 className="h-8 w-8 text-muted-foreground/50" />,
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>Knowledge Gaps</CardTitle>
                  <CardDescription>
                    Areas where content is missing or insufficient
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      {
                        topic: "Advanced API Usage",
                        queries: 24,
                        priority: "High",
                      },
                      {
                        topic: "Enterprise Deployment",
                        queries: 18,
                        priority: "Medium",
                      },
                      {
                        topic: "Custom Integrations",
                        queries: 15,
                        priority: "Medium",
                      },
                      {
                        topic: "Compliance Requirements",
                        queries: 12,
                        priority: "High",
                      },
                      {
                        topic: "Offline Capabilities",
                        queries: 8,
                        priority: "Low",
                      },
                    ].map((gap) => (
                      <div
                        key={gap.topic}
                        className="flex items-center justify-between p-2 border-b last:border-0"
                      >
                        <div>
                          <div className="font-medium">{gap.topic}</div>
                          <div className="text-sm text-muted-foreground">
                            {gap.queries} unanswered queries
                          </div>
                        </div>
                        <Badge
                          className={`${gap.priority === "High" ? "bg-red-500" : gap.priority === "Medium" ? "bg-yellow-500" : "bg-blue-500"}`}
                        >
                          {gap.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
