import React, { useState, useRef } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Sector,
  AreaChart,
  Area
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  BarChart2, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  TrendingUp,
  Filter,
  ZoomIn,
  ZoomOut,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

// Chart data types
export type ChartDataPoint = {
  name: string;
  [key: string]: string | number;
};

export type ChartSeries = {
  name: string;
  key: string;
  color?: string;
};

export type ChartFilter = {
  name: string;
  key: string;
  options: { label: string; value: string }[];
  value: string;
};

export type ChartType = 'bar' | 'line' | 'pie' | 'area';

export interface InteractiveChartProps {
  title: string;
  description?: string;
  data: ChartDataPoint[];
  series: ChartSeries[];
  filters?: ChartFilter[];
  onFilterChange?: (filters: ChartFilter[]) => void;
  defaultChartType?: ChartType;
  height?: number;
  className?: string;
  allowDownload?: boolean;
  allowZoom?: boolean;
  allowChartTypeChange?: boolean;
  drilldownEnabled?: boolean;
  onDrilldown?: (dataPoint: ChartDataPoint) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

export function InteractiveChart({
  title,
  description,
  data,
  series,
  filters = [],
  onFilterChange,
  defaultChartType = 'bar',
  height = 300,
  className,
  allowDownload = true,
  allowZoom = true,
  allowChartTypeChange = true,
  drilldownEnabled = false,
  onDrilldown
}: InteractiveChartProps) {
  const [chartType, setChartType] = useState<ChartType>(defaultChartType);
  const [activeFilters, setActiveFilters] = useState<ChartFilter[]>(filters);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useTheme();

  // Apply filters to data
  const filteredData = React.useMemo(() => {
    if (activeFilters.length === 0) return data;
    
    return data.filter(item => {
      return activeFilters.every(filter => {
        if (filter.value === 'all') return true;
        return item[filter.key] === filter.value;
      });
    });
  }, [data, activeFilters]);

  // Handle filter changes
  const handleFilterChange = (filterKey: string, value: string) => {
    const newFilters = activeFilters.map(filter => {
      if (filter.key === filterKey) {
        return { ...filter, value };
      }
      return filter;
    });
    
    setActiveFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Handle chart type change
  const handleChartTypeChange = (type: ChartType) => {
    setChartType(type);
  };

  // Handle zoom
  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && zoomLevel < 200) {
      setZoomLevel(prev => prev + 20);
    } else if (direction === 'out' && zoomLevel > 60) {
      setZoomLevel(prev => prev - 20);
    }
  };

  // Handle download
  const handleDownload = (format: 'png' | 'svg' | 'csv' | 'json') => {
    if (!chartRef.current) return;
    
    if (format === 'png' || format === 'svg') {
      // In a real implementation, this would use a library like html2canvas or dom-to-image
      console.log(`Downloading chart as ${format}`);
      alert(`In a real implementation, this would download the chart as ${format}`);
    } else if (format === 'csv') {
      // Convert data to CSV
      const headers = ['name', ...series.map(s => s.key)];
      const csvContent = [
        headers.join(','),
        ...filteredData.map(item => {
          return headers.map(header => item[header]).join(',');
        })
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '-')}.csv`);
      link.click();
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(filteredData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '-')}.json`);
      link.click();
    }
  };

  // Handle drilldown
  const handleDrilldown = (data: ChartDataPoint) => {
    if (drilldownEnabled && onDrilldown) {
      onDrilldown(data);
    }
  };

  // Pie chart active shape
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{label}</p>
          <div className="mt-2 space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`tooltip-${index}`} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Render chart based on type
  const renderChart = () => {
    const chartStyle = {
      transform: `scale(${zoomLevel / 100})`,
      transition: reducedMotion ? 'none' : 'transform 0.3s ease'
    };

    switch (chartType) {
      case 'bar':
        return (
          <div style={chartStyle}>
            <ResponsiveContainer width="100%" height={height}>
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                onClick={(data) => handleDrilldown(data.activePayload?.[0]?.payload)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {series.map((s, index) => (
                  <Bar
                    key={s.key}
                    dataKey={s.key}
                    name={s.name}
                    fill={s.color || COLORS[index % COLORS.length]}
                    className={drilldownEnabled ? 'cursor-pointer' : ''}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'line':
        return (
          <div style={chartStyle}>
            <ResponsiveContainer width="100%" height={height}>
              <LineChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                onClick={(data) => handleDrilldown(data.activePayload?.[0]?.payload)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {series.map((s, index) => (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.name}
                    stroke={s.color || COLORS[index % COLORS.length]}
                    activeDot={{ r: 8 }}
                    className={drilldownEnabled ? 'cursor-pointer' : ''}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'pie':
        return (
          <div style={chartStyle}>
            <ResponsiveContainer width="100%" height={height}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={filteredData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey={series[0].key}
                  nameKey="name"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onClick={(_, index) => handleDrilldown(filteredData[index])}
                  className={drilldownEnabled ? 'cursor-pointer' : ''}
                >
                  {filteredData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'area':
        return (
          <div style={chartStyle}>
            <ResponsiveContainer width="100%" height={height}>
              <AreaChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                onClick={(data) => handleDrilldown(data.activePayload?.[0]?.payload)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {series.map((s, index) => (
                  <Area
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.name}
                    fill={s.color || COLORS[index % COLORS.length]}
                    stroke={s.color || COLORS[index % COLORS.length]}
                    fillOpacity={0.3}
                    className={drilldownEnabled ? 'cursor-pointer' : ''}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className={cn("w-full", className)} ref={chartRef}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Chart type selector */}
            {allowChartTypeChange && (
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-none",
                    chartType === 'bar' && "bg-muted"
                  )}
                  onClick={() => handleChartTypeChange('bar')}
                  title="Bar Chart"
                >
                  <BarChart2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-none",
                    chartType === 'line' && "bg-muted"
                  )}
                  onClick={() => handleChartTypeChange('line')}
                  title="Line Chart"
                >
                  <LineChartIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-none",
                    chartType === 'area' && "bg-muted"
                  )}
                  onClick={() => handleChartTypeChange('area')}
                  title="Area Chart"
                >
                  <TrendingUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-none",
                    chartType === 'pie' && "bg-muted"
                  )}
                  onClick={() => handleChartTypeChange('pie')}
                  title="Pie Chart"
                >
                  <PieChartIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Zoom controls */}
            {allowZoom && (
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => handleZoom('out')}
                  disabled={zoomLevel <= 60}
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setZoomLevel(100)}
                  title="Reset Zoom"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => handleZoom('in')}
                  disabled={zoomLevel >= 200}
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Download button */}
            {allowDownload && (
              <Select onValueChange={(value) => handleDownload(value as any)}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="Download" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG Image</SelectItem>
                  <SelectItem value="svg">SVG Image</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        
        {/* Filters */}
        {filters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
            {activeFilters.map((filter) => (
              <Select
                key={filter.key}
                value={filter.value}
                onValueChange={(value) => handleFilterChange(filter.key, value)}
              >
                <SelectTrigger className="h-8 min-w-[120px]">
                  <SelectValue placeholder={filter.name} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.name}</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pt-0 overflow-hidden">
        {drilldownEnabled && (
          <Badge variant="outline" className="mb-2">
            Click on chart elements to drill down
          </Badge>
        )}
        {renderChart()}
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground">
        {zoomLevel !== 100 && `Zoom: ${zoomLevel}% • `}
        {filteredData.length} data points • Last updated: {new Date().toLocaleDateString()}
      </CardFooter>
    </Card>
  );
}
