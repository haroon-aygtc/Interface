import React, { useState } from 'react';
import { InteractiveChart, ChartDataPoint, ChartFilter } from '@/components/ui/interactive-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, DollarSign, Users, MessageSquare, Clock } from 'lucide-react';

// Mock data for charts
const generateMockData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const models = ['GPT-4', 'Claude', 'Gemini', 'Llama'];
  const categories = ['Support', 'Sales', 'Marketing', 'Product'];
  
  // Monthly usage data
  const monthlyData: ChartDataPoint[] = months.map(month => {
    const baseValue = Math.floor(Math.random() * 1000) + 500;
    return {
      name: month,
      queries: Math.floor(baseValue * (1 + Math.random() * 0.5)),
      tokens: Math.floor(baseValue * 10 * (1 + Math.random() * 0.7)),
      cost: parseFloat((baseValue * 0.002 * (1 + Math.random() * 0.3)).toFixed(2)),
      category: categories[Math.floor(Math.random() * categories.length)],
      model: models[Math.floor(Math.random() * models.length)]
    };
  });
  
  // Model comparison data
  const modelData: ChartDataPoint[] = models.map(model => {
    return {
      name: model,
      accuracy: Math.floor(Math.random() * 20) + 80,
      latency: Math.floor(Math.random() * 500) + 100,
      cost: parseFloat((Math.random() * 0.01 + 0.001).toFixed(4)),
      satisfaction: Math.floor(Math.random() * 20) + 80,
      category: 'All',
      model: model
    };
  });
  
  // Category data
  const categoryData: ChartDataPoint[] = categories.map(category => {
    return {
      name: category,
      queries: Math.floor(Math.random() * 5000) + 1000,
      tokens: Math.floor((Math.random() * 5000) + 1000) * 10,
      cost: parseFloat((Math.random() * 100 + 20).toFixed(2)),
      category: category,
      model: 'All'
    };
  });
  
  return {
    monthlyData,
    modelData,
    categoryData
  };
};

const { monthlyData, modelData, categoryData } = generateMockData();

// Chart filters
const filters: ChartFilter[] = [
  {
    name: 'Model',
    key: 'model',
    options: [
      { label: 'GPT-4', value: 'GPT-4' },
      { label: 'Claude', value: 'Claude' },
      { label: 'Gemini', value: 'Gemini' },
      { label: 'Llama', value: 'Llama' }
    ],
    value: 'all'
  },
  {
    name: 'Category',
    key: 'category',
    options: [
      { label: 'Support', value: 'Support' },
      { label: 'Sales', value: 'Sales' },
      { label: 'Marketing', value: 'Marketing' },
      { label: 'Product', value: 'Product' }
    ],
    value: 'all'
  }
];

// Stat card component
interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  trend: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, trend, icon }: StatCardProps) => {
  const isPositive = trend >= 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={`flex items-center mt-1 text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
          <span>{Math.abs(trend)}% from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('month');
  const [drilldownData, setDrilldownData] = useState<ChartDataPoint | null>(null);
  
  const handleDrilldown = (dataPoint: ChartDataPoint) => {
    setDrilldownData(dataPoint);
  };
  
  const handleResetDrilldown = () => {
    setDrilldownData(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Queries"
          value="24,532"
          description="Total AI queries processed"
          trend={12.5}
          icon={<MessageSquare className="h-4 w-4" />}
        />
        <StatCard
          title="Average Response Time"
          value="1.2s"
          description="Average AI response time"
          trend={-8.3}
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Active Users"
          value="1,429"
          description="Users who made at least one query"
          trend={5.7}
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Cost"
          value="$432.86"
          description="Total API cost for the period"
          trend={-3.2}
          icon={<DollarSign className="h-4 w-4" />}
        />
      </div>
      
      {/* Main charts */}
      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage Metrics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage" className="space-y-4">
          {drilldownData ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Detailed View: {drilldownData.name}
                </h3>
                <Button variant="outline" size="sm" onClick={handleResetDrilldown}>
                  Back to Overview
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <InteractiveChart
                  title={`${drilldownData.name} - Queries by Model`}
                  data={modelData.map(item => ({
                    ...item,
                    queries: Math.floor(Math.random() * 1000) + 100
                  }))}
                  series={[{ name: 'Queries', key: 'queries' }]}
                  defaultChartType="bar"
                  height={300}
                />
                
                <InteractiveChart
                  title={`${drilldownData.name} - Tokens by Model`}
                  data={modelData.map(item => ({
                    ...item,
                    tokens: Math.floor(Math.random() * 10000) + 1000
                  }))}
                  series={[{ name: 'Tokens', key: 'tokens' }]}
                  defaultChartType="bar"
                  height={300}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <InteractiveChart
                title="Monthly Queries"
                description="Number of AI queries per month"
                data={monthlyData}
                series={[{ name: 'Queries', key: 'queries' }]}
                filters={filters}
                defaultChartType="bar"
                height={300}
                drilldownEnabled
                onDrilldown={handleDrilldown}
              />
              
              <InteractiveChart
                title="Token Usage"
                description="Number of tokens processed per month"
                data={monthlyData}
                series={[{ name: 'Tokens', key: 'tokens' }]}
                filters={filters}
                defaultChartType="line"
                height={300}
                drilldownEnabled
                onDrilldown={handleDrilldown}
              />
              
              <InteractiveChart
                title="Usage by Category"
                description="Distribution of queries by business category"
                data={categoryData}
                series={[
                  { name: 'Queries', key: 'queries' },
                  { name: 'Tokens', key: 'tokens' }
                ]}
                defaultChartType="bar"
                height={300}
              />
              
              <InteractiveChart
                title="Model Distribution"
                description="Usage distribution across AI models"
                data={modelData}
                series={[{ name: 'Queries', key: 'accuracy' }]}
                defaultChartType="pie"
                height={300}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <InteractiveChart
              title="Model Accuracy"
              description="Accuracy percentage by model"
              data={modelData}
              series={[{ name: 'Accuracy (%)', key: 'accuracy' }]}
              defaultChartType="bar"
              height={300}
            />
            
            <InteractiveChart
              title="Response Latency"
              description="Average response time in milliseconds"
              data={modelData}
              series={[{ name: 'Latency (ms)', key: 'latency' }]}
              defaultChartType="bar"
              height={300}
            />
            
            <InteractiveChart
              title="User Satisfaction"
              description="User satisfaction ratings by model"
              data={modelData}
              series={[{ name: 'Satisfaction (%)', key: 'satisfaction' }]}
              defaultChartType="bar"
              height={300}
            />
            
            <InteractiveChart
              title="Performance Comparison"
              description="Multi-metric performance comparison"
              data={modelData}
              series={[
                { name: 'Accuracy (%)', key: 'accuracy' },
                { name: 'Satisfaction (%)', key: 'satisfaction' }
              ]}
              defaultChartType="radar"
              height={300}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="cost" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <InteractiveChart
              title="Monthly Cost"
              description="Total cost per month in USD"
              data={monthlyData}
              series={[{ name: 'Cost ($)', key: 'cost' }]}
              filters={filters}
              defaultChartType="area"
              height={300}
            />
            
            <InteractiveChart
              title="Cost per Model"
              description="Cost comparison across models"
              data={modelData}
              series={[{ name: 'Cost per 1K tokens ($)', key: 'cost' }]}
              defaultChartType="bar"
              height={300}
            />
            
            <InteractiveChart
              title="Cost by Category"
              description="Cost distribution across business categories"
              data={categoryData}
              series={[{ name: 'Cost ($)', key: 'cost' }]}
              defaultChartType="pie"
              height={300}
            />
            
            <InteractiveChart
              title="Cost vs. Usage"
              description="Correlation between cost and usage"
              data={categoryData}
              series={[
                { name: 'Queries', key: 'queries' },
                { name: 'Cost ($)', key: 'cost' }
              ]}
              defaultChartType="bar"
              height={300}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
