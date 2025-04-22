import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/routes";
import DashboardPage from "@/components/layouts/DashboardPage";
import QuickActions from "@/components/dashboard/QuickActions";
import {
  Activity,
  Users,
  MessageSquare,
  Database,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Download,
  Settings,
  Sparkles,
} from "lucide-react";

// Import mock data
import {
  mockUsageData as usageData,
  mockQueryCategories as pieData,
  mockModelPerformanceData as modelPerformanceData,
  mockActivities,
} from "@/lib/mockData";

// Import dashboard styles
import "@/styles/dashboard.css";

// Import Recharts components
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Force chart re-render on theme change
  const [chartKey, setChartKey] = useState(0);

  // Update chart key when theme changes to force re-render
  useEffect(() => {
    setChartKey(prev => prev + 1);
  }, [theme]);



  // Determine if we're on the main dashboard page
  const isOverview = location.pathname === ROUTES.DASHBOARD;

  const renderContent = () => {
    // Only render dashboard content on the main dashboard page
    if (isOverview) {
      return (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Conversations Card */}
            <Card className="bg-card overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 h-[150px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Conversations
                  </CardTitle>
                  <div className="text-2xl font-bold tracking-tight">1,234</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#D8A23B]/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-[#D8A23B]" />
                </div>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center">
                    <ArrowUp className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-500">12%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">vs. last month</div>
                </div>
                <div className="mt-3 h-1.5 w-full bg-muted overflow-hidden rounded-full">
                  <div className="bg-[#D8A23B]" style={{ width: '65%', height: '100%', borderRadius: '9999px' }}></div>
                </div>
              </CardContent>
            </Card>

            {/* Active Users Card */}
            <Card className="bg-card overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 h-[150px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Users
                  </CardTitle>
                  <div className="text-2xl font-bold tracking-tight">342</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#D8A23B]/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#D8A23B]" />
                </div>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center">
                    <ArrowUp className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-500">5.2%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">vs. last month</div>
                </div>
                <div className="mt-3 h-1.5 w-full bg-muted overflow-hidden rounded-full">
                  <div className="bg-[#D8A23B]" style={{ width: '42%', height: '100%', borderRadius: '9999px' }}></div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Card */}
            <Card className="bg-card overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 h-[150px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Response Time
                  </CardTitle>
                  <div className="text-2xl font-bold tracking-tight">1.2s</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#D8A23B]/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-[#D8A23B]" />
                </div>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center">
                    <ArrowDown className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-500">0.1s</span>
                  </div>
                  <div className="text-xs text-muted-foreground">vs. last month</div>
                </div>
                <div className="mt-3 h-1.5 w-full bg-muted overflow-hidden rounded-full">
                  <div className="bg-[#D8A23B]" style={{ width: '88%', height: '100%', borderRadius: '9999px' }}></div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sources Card */}
            <Card className="bg-card overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 h-[150px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Data Sources
                  </CardTitle>
                  <div className="text-2xl font-bold tracking-tight">12</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#D8A23B]/10 flex items-center justify-center">
                  <Database className="h-5 w-5 text-[#D8A23B]" />
                </div>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center">
                    <ArrowUp className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-500">2</span>
                  </div>
                  <div className="text-xs text-muted-foreground">vs. last month</div>
                </div>
                <div className="mt-3 h-1.5 w-full bg-muted overflow-hidden rounded-full">
                  <div className="bg-[#D8A23B]" style={{ width: '25%', height: '100%', borderRadius: '9999px' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold">Usage Overview</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Chat interactions over the past 30 days
                    </CardDescription>
                  </div>
                  <div className="flex bg-muted/50 p-0.5 rounded-lg border border-[#D8A23B]/20">
                    <button
                      type="button"
                      className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${timeRange === 'daily' ? `${theme === 'dark' ? 'bg-[#09090B] text-[#D8A23B]' : 'bg-white text-[#D8A23B]'} shadow-sm` : 'text-muted-foreground hover:bg-muted'}`}
                      onClick={() => setTimeRange('daily')}
                    >
                      Daily
                    </button>
                    <button
                      type="button"
                      className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${timeRange === 'weekly' ? `${theme === 'dark' ? 'bg-[#09090B] text-[#D8A23B]' : 'bg-white text-[#D8A23B]'} shadow-sm` : 'text-muted-foreground hover:bg-muted'}`}
                      onClick={() => setTimeRange('weekly')}
                    >
                      Weekly
                    </button>
                    <button
                      type="button"
                      className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${timeRange === 'monthly' ? `${theme === 'dark' ? 'bg-[#09090B] text-[#D8A23B]' : 'bg-white text-[#D8A23B]'} shadow-sm` : 'text-muted-foreground hover:bg-muted'}`}
                      onClick={() => setTimeRange('monthly')}
                    >
                      Monthly
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%" key={`usage-chart-${chartKey}`}>
                    <AreaChart
                      data={usageData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorWeekly" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12, fill: theme === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)' }}
                        tickLine={false}
                        axisLine={{ stroke: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }}
                        interval={timeRange === 'daily' ? 6 : 0}
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: theme === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                          borderRadius: '0.375rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          padding: '0.75rem'
                        }}
                        itemStyle={{ color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)', fontSize: '0.875rem' }}
                        labelStyle={{ color: theme === 'dark' ? '#ffffff' : '#000000', fontWeight: 600, marginBottom: '0.5rem' }}
                        formatter={(value) => [value.toLocaleString(), 'Conversations']}
                      />
                      {timeRange === 'daily' && (
                        <Area
                          type="monotone"
                          dataKey="daily"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          fillOpacity={0.2}
                          fill="url(#colorDaily)"
                          activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                        />
                      )}
                      {timeRange === 'weekly' && (
                        <Area
                          type="monotone"
                          dataKey="weekly"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          fillOpacity={0.2}
                          fill="url(#colorWeekly)"
                          activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6' }}
                        />
                      )}
                      {timeRange === 'monthly' && (
                        <Area
                          type="monotone"
                          dataKey="monthly"
                          stroke="#10b981"
                          strokeWidth={2}
                          fillOpacity={0.2}
                          fill="url(#colorMonthly)"
                          activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
                        />
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 flex items-center justify-between border-t pt-4 border-border">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className={`chart-indicator ${timeRange === 'daily' ? 'chart-indicator-daily' : timeRange === 'weekly' ? 'chart-indicator-weekly' : 'chart-indicator-monthly'}`}></div>
                      <span className="text-sm text-muted-foreground">{timeRange === 'daily' ? 'Daily' : timeRange === 'weekly' ? 'Weekly' : 'Monthly'}</span>
                    </div>
                    <div className="h-4 w-px bg-border"></div>
                    <div className="text-sm font-medium">Total: {timeRange === 'daily' ? '2,346' : timeRange === 'weekly' ? '4,680' : '18,720'}</div>
                  </div>
                  <button type="button" className="text-xs text-[#D8A23B] hover:underline font-medium flex items-center">
                    View detailed report
                    <svg className="h-3.5 w-3.5 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold">Model Performance</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Response quality by model
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#D8A23B]/10 text-[#D8A23B] text-xs font-medium border border-[#D8A23B]/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8A23B] mr-1 animate-pulse"></span>
                    Live Data
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%" key={`model-chart-${chartKey}`}>
                    <RechartsBarChart
                      data={modelPerformanceData}
                      layout="vertical"
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      barSize={16}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        tick={{ fontSize: 12, fill: theme === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)' }}
                        tickLine={false}
                        axisLine={{ stroke: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }}
                        padding={{ left: 0, right: 10 }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 12, fill: theme === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)' }}
                        tickLine={false}
                        axisLine={false}
                        width={100}
                      />
                      <Tooltip
                        cursor={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                        contentStyle={{
                          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                          borderRadius: '0.375rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          padding: '0.75rem'
                        }}
                        formatter={(value) => [`${value}%`, 'Score']}
                      />
                      <Bar
                        dataKey="score"
                        radius={[0, 4, 4, 0]}
                        animationDuration={1000}
                      >
                        {modelPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {modelPerformanceData.map((model, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                      <div className="model-indicator" style={{ backgroundColor: model.color }}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{model.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {model.score > 85 ? "Excellent" : model.score > 80 ? "Good" : "Average"}
                        </div>
                      </div>
                      <div className="text-sm font-semibold">{model.score}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                  <div>Based on 5,234 responses</div>
                  <button type="button" className="text-xs text-[#D8A23B] hover:underline font-medium flex items-center">
                    View detailed analysis
                    <svg className="h-3.5 w-3.5 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            <QuickActions />
            <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold">Query Categories</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Distribution of user queries
                    </CardDescription>
                  </div>
                  <button type="button" className="p-1 rounded-md hover:bg-muted transition-colors" aria-label="More options">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%" key={`pie-chart-${chartKey}`}>
                    <RechartsPieChart>
                      <defs>
                        {pieData.map((entry, index) => (
                          <filter key={`shadow-${index}`} id={`shadow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={entry.color} floodOpacity="0.3" />
                          </filter>
                        ))}
                      </defs>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        stroke={theme === 'dark' ? '#1f2937' : '#ffffff'}
                        strokeWidth={2}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            filter={`url(#shadow-${index})`}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                          borderRadius: '0.375rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          padding: '0.75rem'
                        }}
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                      {/* Center content */}
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold" fill={theme === 'dark' ? '#ffffff' : '#000000'}>
                        <tspan x="50%" dy="-5">5,234</tspan>
                        <tspan x="50%" dy="20" fontSize="12" fill={theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'}>Total Queries</tspan>
                      </text>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 space-y-2 border-t pt-4 border-border">
                  {pieData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center">
                        <div className="query-indicator" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold">{item.value}%</span>
                        <div className="w-16 h-1.5 ml-3 bg-muted rounded-full overflow-hidden">
                          <div className="query-progress-bar" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
                    <CardDescription className="text-muted-foreground">Latest system events</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#D8A23B]/10 text-[#D8A23B] text-xs font-medium border border-[#D8A23B]/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8A23B] mr-1 animate-pulse"></span>
                    Live Feed
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="divide-y divide-border">
                  {mockActivities.map((activity, i) => (
                    <div
                      key={i}
                      className="py-4 first:pt-0 last:pb-0 hover:bg-muted/20 px-2 -mx-2 rounded-md transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${activity.status === "success"
                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : activity.status === "warning"
                              ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                        >
                          {activity.iconType === "database" ? <Database className="h-5 w-5" /> :
                           activity.iconType === "sparkles" ? <Sparkles className="h-5 w-5" /> :
                           activity.iconType === "messageSquare" ? <MessageSquare className="h-5 w-5" /> :
                           <Activity className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">
                              {activity.event}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {activity.description}
                          </p>
                          <div className="mt-2">
                            <button type="button" className="text-xs text-[#D8A23B] hover:underline font-medium flex items-center">
                              View Details
                              <svg className="h-3 w-3 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-center">
                  <button type="button" className="text-xs text-[#D8A23B] hover:underline font-medium flex items-center">
                    View all activities
                    <svg className="h-3.5 w-3.5 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  };

  const dashboardActions = (
    <div className="flex items-center space-x-2">
      <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 px-4 py-2 bg-[#D8A23B] text-[#09090B] shadow hover:bg-[#D8A23B]/90">
        <Download className="mr-2 h-4 w-4" />
        Export Data
      </button>
      <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 px-4 py-2 border border-[#D8A23B]/30 bg-background shadow-sm hover:bg-[#D8A23B]/10 hover:text-[#D8A23B]">
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </button>
    </div>
  );

  return (
    <DashboardPage
      title="Dashboard Overview"
      description="Monitor your AI system performance and usage metrics."
      actions={dashboardActions}
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD }
      ]}
    >
      {renderContent()}
    </DashboardPage>
  );
};

export default Dashboard;
