import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,  
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Download,
  Edit,
  Eye,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  X,
  Globe,
  Play,
  Pause,
  Filter,
  ArrowUpDown,
  Copy,
  Check,
  Crosshair,
  MousePointer,
  Save,
  Brain,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import LiveScrapingPreview from "./LiveScrapingPreview";
import ScrapedDataExport from "./ScrapedDataExport";

interface ScrapingJob {
  id: string;
  name: string;
  url: string;
  status: "completed" | "in-progress" | "failed" | "scheduled";
  lastRun: Date | null;
  nextRun: Date | null;
  dataCount: number;
  pageCount?: number;
  errorCount?: number;
  resultSize?: string;
  urlType?: "single" | "multiple" | "json";
  urls?: string[];
  outputType?: "text" | "html" | "metadata" | "json";
  selectors?: SelectorGroup[];
}

interface ScrapedData {
  id: string;
  title: string;
  content: string;
  url: string;
  timestamp: Date;
  jobId: string;
  format?: "text" | "html" | "metadata" | "json";
  size?: string;
}

interface SelectorGroup {
  id: string;
  name: string;
  domain: string;
  pageType: string;
  selectors: Selector[];
}

interface Selector {
  id: string;
  name: string;
  cssPath: string;
  xPath?: string;
  description?: string;
}

interface ScrapingResultFilter {
  excludeHeaders: boolean;
  excludeFooters: boolean;
  excludeAds: boolean;
  excludeMedia: boolean;
  excludePagination: boolean;
}

interface WebScrapingPanelProps {
  defaultTab?: string;
}

const WebScrapingPanel: React.FC<WebScrapingPanelProps> = ({ defaultTab = "jobs-list" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Listen for URL hash changes to handle external button clicks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#create-job') {
        setActiveTab('create-edit');
        // Clear the hash after handling
        window.location.hash = '';
      }
    };

    // Check hash on initial load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  const [selectedJob, setSelectedJob] = useState<ScrapingJob | null>(null);
  const [selectedData, setSelectedData] = useState<ScrapedData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [isRunningJob, setIsRunningJob] = useState(false);
  const [copied, setCopied] = useState(false);
  const [livePreviewUrl, setLivePreviewUrl] = useState("");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectorGroups, setSelectorGroups] = useState<SelectorGroup[]>([]);
  const [currentSelectorGroup, setCurrentSelectorGroup] =
    useState<SelectorGroup | null>(null);
  const [resultFilters, setResultFilters] = useState<ScrapingResultFilter>({
    excludeHeaders: false,
    excludeFooters: false,
    excludeAds: true,
    excludeMedia: false,
    excludePagination: true,
  });
  const [urlType, setUrlType] = useState<"single" | "multiple" | "json">(
    "single",
  );
  const [outputType, setOutputType] = useState<
    "text" | "html" | "metadata" | "json"
  >("text");
  const [exportFormat, setExportFormat] = useState<
    "csv" | "json" | "markdown" | "txt"
  >("json");
  const [selectorName, setSelectorName] = useState("");
  const [selectorDescription, setSelectorDescription] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  // Mock data for jobs
  const mockJobs: ScrapingJob[] = [
    {
      id: "1",
      name: "Product Documentation",
      url: "https://example.com/docs",
      status: "completed",
      lastRun: new Date(2023, 5, 15),
      nextRun: new Date(2023, 6, 15),
      dataCount: 128,
      pageCount: 42,
      errorCount: 0,
      resultSize: "2.4 MB",
      urlType: "single",
      outputType: "text",
    },
    {
      id: "2",
      name: "Blog Articles",
      url: "https://example.com/blog",
      status: "in-progress",
      lastRun: new Date(2023, 5, 10),
      nextRun: null,
      dataCount: 45,
      pageCount: 15,
      errorCount: 2,
      resultSize: "1.1 MB",
      urlType: "multiple",
      urls: [
        "https://example.com/blog/page1",
        "https://example.com/blog/page2",
      ],
      outputType: "html",
    },
    {
      id: "3",
      name: "FAQ Pages",
      url: "https://example.com/faq",
      status: "scheduled",
      lastRun: null,
      nextRun: new Date(2023, 6, 20),
      dataCount: 0,
      urlType: "single",
      outputType: "text",
    },
    {
      id: "4",
      name: "Knowledge Base",
      url: "https://example.com/kb",
      status: "failed",
      lastRun: new Date(2023, 5, 8),
      nextRun: null,
      dataCount: 0,
      pageCount: 0,
      errorCount: 3,
      resultSize: "0 KB",
      urlType: "json",
      outputType: "json",
    },
  ];

  // Mock data for selector groups
  const mockSelectorGroups: SelectorGroup[] = [
    {
      id: "sg1",
      name: "Documentation Pages",
      domain: "example.com",
      pageType: "documentation",
      selectors: [
        {
          id: "s1",
          name: "Main Content",
          cssPath: "#main-content",
          xPath: "//*[@id='main-content']",
          description: "Main content area of documentation pages",
        },
        {
          id: "s2",
          name: "Article Title",
          cssPath: ".article-title",
          xPath: "//h1[@class='article-title']",
          description: "Title of the documentation article",
        },
      ],
    },
    {
      id: "sg2",
      name: "Blog Posts",
      domain: "example.com",
      pageType: "blog",
      selectors: [
        {
          id: "s3",
          name: "Post Content",
          cssPath: ".post-content",
          xPath: "//div[@class='post-content']",
          description: "Main content of blog posts",
        },
        {
          id: "s4",
          name: "Post Title",
          cssPath: ".post-title",
          xPath: "//h1[@class='post-title']",
          description: "Title of the blog post",
        },
      ],
    },
  ];

  // Mock data for scraped content
  const mockScrapedData: ScrapedData[] = [
    {
      id: "1",
      title: "Getting Started Guide",
      content:
        "This guide will help you get started with our product. Follow these steps to set up your account and configure your first project.",
      url: "https://example.com/docs/getting-started",
      timestamp: new Date(2023, 5, 15),
      jobId: "1",
    },
    {
      id: "2",
      title: "API Documentation",
      content:
        "Our API allows you to integrate our services with your existing systems. This documentation covers all available endpoints and parameters.",
      url: "https://example.com/docs/api",
      timestamp: new Date(2023, 5, 15),
      jobId: "1",
    },
    {
      id: "3",
      title: "How to Optimize Performance",
      content:
        "Learn how to optimize the performance of your applications when using our services. This guide covers caching strategies and best practices.",
      url: "https://example.com/blog/optimize-performance",
      timestamp: new Date(2023, 5, 10),
      jobId: "2",
    },
  ];

  const handleEditJob = (job: ScrapingJob) => {
    setSelectedJob(job);
    setActiveTab("create-edit");
  };

  const handleViewData = (job: ScrapingJob) => {
    setSelectedJob(job);
    setActiveTab("data-review");
  };

  const handleViewDataDetails = (data: ScrapedData) => {
    setSelectedData(data);
  };

  const handleCreateNewJob = () => {
    setSelectedJob(null);
    setActiveTab("create-edit");
  };

  const handleRunJob = () => {
    setIsRunningJob(true);
    // Simulate job running
    setTimeout(() => {
      setIsRunningJob(false);
      // After job completes, show the data review tab
      setActiveTab("data-review");
    }, 2000);
  };

  const handleCopyContent = () => {
    if (selectedData) {
      navigator.clipboard.writeText(selectedData.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = (status: ScrapingJob["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      case "scheduled":
        return <Badge className="bg-yellow-500">Scheduled</Badge>;
      default:
        return null;
    }
  };

  // Handler for saving selectors from LiveScrapingPreview
  const handleSaveSelector = (
    selector: Omit<Selector, "id">,
    groupId: string,
  ) => {
    // Find the group
    const groupIndex = mockSelectorGroups.findIndex((g) => g.id === groupId);
    if (groupIndex === -1) return;

    // Create a new selector with an ID
    const newSelector: Selector = {
      id: `selector-${Date.now()}`,
      ...selector,
    };

    // Add the selector to the group
    const updatedGroups = [...mockSelectorGroups];
    updatedGroups[groupIndex].selectors.push(newSelector);
    setSelectorGroups(updatedGroups);
  };

  // Handler for creating a new selector group
  const handleCreateGroup = () => {
    // In a real implementation, this would open a modal to create a new group
    const newGroup: SelectorGroup = {
      id: `group-${Date.now()}`,
      name: "New Group",
      domain: "example.com",
      pageType: "custom",
      selectors: [],
    };

    setSelectorGroups([...mockSelectorGroups, newGroup]);
  };

  return (
    <div className="bg-background rounded-lg w-full h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="jobs-list">Jobs List</TabsTrigger>
          <TabsTrigger value="create-edit">
            {selectedJob ? "Edit Job" : "Create Job"}
          </TabsTrigger>
          <TabsTrigger value="live-preview">Live Preview</TabsTrigger>
          <TabsTrigger value="selector-groups">Selector Groups</TabsTrigger>
          <TabsTrigger value="data-review">Data Review</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs-list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scraping Jobs</CardTitle>
              <CardDescription>
                Manage your web scraping jobs and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="relative max-w-sm mr-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </span>
                  <Input
                    placeholder="Search jobs..."
                    className="pl-10" // add left padding for the icon
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Data Count</TableHead>
                    <TableHead>Page Count</TableHead>
                    <TableHead>Errors</TableHead>
                    <TableHead>Result Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.name}</TableCell>
                      <TableCell className="truncate max-w-xs">
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          {job.url}
                          <Globe className="h-3 w-3 ml-1" />
                        </a>
                      </TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell>
                        {job.lastRun
                          ? format(job.lastRun, "MMM dd, yyyy")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {job.nextRun
                          ? format(job.nextRun, "MMM dd, yyyy")
                          : "-"}
                      </TableCell>
                      <TableCell>{job.dataCount}</TableCell>
                      <TableCell>{job.pageCount || "-"}</TableCell>
                      <TableCell>
                        {job.errorCount !== undefined ? job.errorCount : "-"}
                      </TableCell>
                      <TableCell>{job.resultSize || "-"}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditJob(job)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewData(job)}
                            disabled={job.dataCount === 0}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-edit">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedJob ? "Edit Scraping Job" : "Create New Scraping Job"}
              </CardTitle>
              <CardDescription>
                {selectedJob
                  ? "Modify the configuration for this scraping job"
                  : "Configure a new web scraping job to extract data from websites"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job-name">Job Name</Label>
                  <Input
                    id="job-name"
                    placeholder="e.g., Product Documentation"
                    defaultValue={selectedJob?.name || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url-type">URL Type</Label>
                  <Select
                    value={urlType}
                    onValueChange={(value) =>
                      setUrlType(value as "single" | "multiple" | "json")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select URL type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single URL</SelectItem>
                      <SelectItem value="multiple">Multiple URLs</SelectItem>
                      <SelectItem value="json">JSON Bulk URLs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {urlType === "single" && (
                <div className="space-y-2">
                  <Label htmlFor="base-url">URL</Label>
                  <Input
                    id="base-url"
                    placeholder="https://example.com/docs"
                    defaultValue={selectedJob?.url || ""}
                  />
                </div>
              )}

              {urlType === "multiple" && (
                <div className="space-y-2">
                  <Label htmlFor="multiple-urls">URLs (one per line)</Label>
                  <Textarea
                    id="multiple-urls"
                    placeholder="https://example.com/docs/page1\nhttps://example.com/docs/page2"
                    className="min-h-[100px]"
                    defaultValue={selectedJob?.urls?.join("\n") || ""}
                  />
                </div>
              )}

              {urlType === "json" && (
                <div className="space-y-2">
                  <Label htmlFor="json-urls">JSON URLs</Label>
                  <Textarea
                    id="json-urls"
                    placeholder='[{"url": "https://example.com/docs/page1", "params": {"key": "value"}}, {"url": "https://example.com/docs/page2"}]'
                    className="min-h-[100px]"
                    defaultValue={
                      selectedJob?.urls
                        ? JSON.stringify(selectedJob.urls, null, 2)
                        : ""
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="url-patterns">
                  URL Patterns to Include (one per line)
                </Label>
                <Textarea
                  id="url-patterns"
                  placeholder="/docs/*\n/blog/*\n/faq/*"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exclude-patterns">
                  URL Patterns to Exclude (one per line)
                </Label>
                <Textarea
                  id="exclude-patterns"
                  placeholder="/docs/archived/*\n/blog/drafts/*"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Scraping Depth</Label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue placeholder="Select depth" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Base URLs only</SelectItem>
                      <SelectItem value="2">
                        2 - Follow one level of links
                      </SelectItem>
                      <SelectItem value="3">
                        3 - Follow two levels of links
                      </SelectItem>
                      <SelectItem value="4">
                        4 - Follow three levels of links
                      </SelectItem>
                      <SelectItem value="5">
                        5 - Deep crawl (use with caution)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Output Type</Label>
                  <Select
                    value={outputType}
                    onValueChange={(value) =>
                      setOutputType(
                        value as "text" | "html" | "metadata" | "json",
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select output type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="metadata">Metadata</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Selector Group</Label>
                <div className="flex gap-2">
                  <Select defaultValue={mockSelectorGroups[0].id}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a selector group" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSelectorGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name} ({group.domain})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("selector-groups")}
                  >
                    <Plus className="h-4 w-4 mr-1" /> New Group
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Schedule</Label>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Select defaultValue="manual">
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">
                          Manual (run on demand)
                        </SelectItem>
                        <SelectItem value="once">One time</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex-1">
                    <Select defaultValue="09:00">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="00:00">12:00 AM</SelectItem>
                        <SelectItem value="03:00">3:00 AM</SelectItem>
                        <SelectItem value="06:00">6:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Result Filters</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="exclude-headers">Exclude Headers</Label>
                      <Switch
                        id="exclude-headers"
                        checked={resultFilters.excludeHeaders}
                        onCheckedChange={(checked) =>
                          setResultFilters({
                            ...resultFilters,
                            excludeHeaders: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="exclude-footers">Exclude Footers</Label>
                      <Switch
                        id="exclude-footers"
                        checked={resultFilters.excludeFooters}
                        onCheckedChange={(checked) =>
                          setResultFilters({
                            ...resultFilters,
                            excludeFooters: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="exclude-ads">Exclude Ads</Label>
                      <Switch
                        id="exclude-ads"
                        checked={resultFilters.excludeAds}
                        onCheckedChange={(checked) =>
                          setResultFilters({
                            ...resultFilters,
                            excludeAds: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="exclude-media">Exclude Media</Label>
                      <Switch
                        id="exclude-media"
                        checked={resultFilters.excludeMedia}
                        onCheckedChange={(checked) =>
                          setResultFilters({
                            ...resultFilters,
                            excludeMedia: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="exclude-pagination">
                        Exclude Pagination
                      </Label>
                      <Switch
                        id="exclude-pagination"
                        checked={resultFilters.excludePagination}
                        onCheckedChange={(checked) =>
                          setResultFilters({
                            ...resultFilters,
                            excludePagination: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("jobs-list")}
              >
                Cancel
              </Button>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={handleRunJob}
                  disabled={isRunningJob}
                >
                  {isRunningJob ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Run Now
                    </>
                  )}
                </Button>
                <Button>{selectedJob ? "Update Job" : "Create Job"}</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="live-preview">
          <Card>
            <CardHeader>
              <CardTitle>Live Scraping Preview</CardTitle>
              <CardDescription>
                Preview a website and select elements to scrape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LiveScrapingPreview
                selectorGroups={mockSelectorGroups}
                onSaveSelector={handleSaveSelector}
                onCreateGroup={handleCreateGroup}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("create-edit")}
              >
                Back to Job Configuration
              </Button>
              <Button onClick={() => setActiveTab("selector-groups")}>
                Manage Selector Groups
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="selector-groups">
          <Card>
            <CardHeader>
              <CardTitle>Selector Groups</CardTitle>
              <CardDescription>
                Manage and organize your CSS selectors by domain and page type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Input placeholder="Search groups..." className="max-w-sm" />
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Group
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Page Type</TableHead>
                    <TableHead>Selectors</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSelectorGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">
                        {group.name}
                      </TableCell>
                      <TableCell>{group.domain}</TableCell>
                      <TableCell>{group.pageType}</TableCell>
                      <TableCell>{group.selectors.length}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {currentSelectorGroup && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>
                      Edit Group: {currentSelectorGroup.name}
                    </CardTitle>
                    <CardDescription>
                      Domain: {currentSelectorGroup.domain} | Page Type:{" "}
                      {currentSelectorGroup.pageType}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="group-name">Group Name</Label>
                          <Input
                            id="group-name"
                            value={currentSelectorGroup.name}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="group-domain">Domain</Label>
                          <Input
                            id="group-domain"
                            value={currentSelectorGroup.domain}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="group-page-type">Page Type</Label>
                          <Input
                            id="group-page-type"
                            value={currentSelectorGroup.pageType}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Selectors</Label>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-1" /> Add Selector
                          </Button>
                        </div>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>CSS Path</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {currentSelectorGroup.selectors.map((selector) => (
                              <TableRow key={selector.id}>
                                <TableCell>{selector.name}</TableCell>
                                <TableCell className="font-mono text-xs">
                                  {selector.cssPath}
                                </TableCell>
                                <TableCell>{selector.description}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentSelectorGroup(null)}
                    >
                      Cancel
                    </Button>
                    <Button>Save Group</Button>
                  </CardFooter>
                </Card>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("create-edit")}
              >
                Back to Job Configuration
              </Button>
              <Button onClick={() => setActiveTab("live-preview")}>
                Go to Live Preview
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="data-review">
          <Card>
            <CardHeader>
              <CardTitle>Scraped Data Review</CardTitle>
              <CardDescription>
                {selectedJob
                  ? `Reviewing data from "${selectedJob.name}" (${mockScrapedData.filter((d) => d.jobId === selectedJob.id).length} items)`
                  : "Review and export scraped data"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Search className="h-4 w-4" />
                    </span>
                    <Input
                      placeholder="Search in content..."
                      className="pl-10"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jobs</SelectItem>
                      {mockJobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Save as Context
                  </Button>
                  <Select
                    value={exportFormat}
                    onValueChange={(value) =>
                      setExportFormat(
                        value as "csv" | "json" | "markdown" | "txt",
                      )
                    }
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Export format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">Export as JSON</SelectItem>
                      <SelectItem value="csv">Export as CSV</SelectItem>
                      <SelectItem value="markdown">
                        Export as Markdown
                      </SelectItem>
                      <SelectItem value="txt">Export as Text</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              {selectedData ? (
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                      <CardTitle>{selectedData.title}</CardTitle>
                      <CardDescription>
                        <a
                          href={selectedData.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          {selectedData.url}
                          <Globe className="h-3 w-3 ml-1" />
                        </a>
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedData(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Job: </span>
                          {
                            mockJobs.find((j) => j.id === selectedData.jobId)
                              ?.name
                          }
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Scraped: </span>
                          {format(selectedData.timestamp, "PPP p")}
                        </div>
                      </div>

                      <div className="relative">
                        <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                          {selectedData.content}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={handleCopyContent}
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="mr-2 h-4 w-4" /> Process with AI
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" /> Add to Knowledge Base
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="border rounded-md">
                  {mockScrapedData
                    .filter(
                      (data) => !selectedJob || data.jobId === selectedJob.id,
                    )
                    .map((data) => (
                      <div
                        key={data.id}
                        className="border-b p-4 last:border-b-0"
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium text-lg">{data.title}</h3>
                          <div className="text-sm text-muted-foreground">
                            {format(data.timestamp, "MMM dd, yyyy")}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          {data.content}
                        </p>
                        <div className="flex justify-between items-center">
                          <a
                            href={data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                          >
                            {data.url}
                          </a>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDataDetails(data)}
                            >
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("jobs-list")}
              >
                Back to Jobs
              </Button>
              <div className="text-sm text-muted-foreground">
                Showing{" "}
                {selectedJob
                  ? mockScrapedData.filter((d) => d.jobId === selectedJob.id)
                    .length
                  : mockScrapedData.length}{" "}
                items
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Scraping Engine Settings</CardTitle>
              <CardDescription>
                Configure global settings for the web scraping engine
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="concurrent-jobs">Concurrent Jobs</Label>
                    <Input
                      id="concurrent-jobs"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      min="1"
                      max="60"
                      defaultValue="30"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Content Processing</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-clean">Auto-Clean Content</Label>
                    <Switch id="auto-clean" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically clean and format scraped content
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content-format">Default Content Format</Label>
                  <Select defaultValue="markdown">
                    <SelectTrigger id="content-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plain">Plain Text</SelectItem>
                      <SelectItem value="markdown">Markdown</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Storage & Retention</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">
                      Data Retention Period (days)
                    </Label>
                    <Input
                      id="retention-period"
                      type="number"
                      min="1"
                      max="365"
                      defaultValue="90"
                    />
                    <p className="text-sm text-muted-foreground">
                      0 = keep forever
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storage-limit">Storage Limit (MB)</Label>
                    <Input
                      id="storage-limit"
                      type="number"
                      min="100"
                      max="10000"
                      defaultValue="1000"
                    />
                    <p className="text-sm text-muted-foreground">
                      0 = no limit
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="export-data">
          <ScrapedDataExport
            dataCount={
              selectedJob
                ? mockScrapedData.filter((d) => d.jobId === selectedJob.id)
                  .length
                : mockScrapedData.length
            }
            onExport={(format, filters) =>
              console.log("Exporting data:", format, filters)
            }
            onSaveToKnowledgeBase={() =>
              console.log("Saving to knowledge base")
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebScrapingPanel;
