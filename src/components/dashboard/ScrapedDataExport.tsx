import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  FileJson,
  FileText,
  FileSpreadsheet,
  FileCode,
  Check,
  Filter,
  Copy,
  Clipboard,
  Upload,
  Database,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ScrapedDataExportProps {
  dataCount: number;
  onExport: (format: string, filters: any) => void;
  onSaveToKnowledgeBase: () => void;
}

const ScrapedDataExport: React.FC<ScrapedDataExportProps> = ({
  dataCount,
  onExport,
  onSaveToKnowledgeBase,
}) => {
  const [activeTab, setActiveTab] = useState("export");
  const [exportFormat, setExportFormat] = useState("json");
  const [filters, setFilters] = useState({
    cleanText: true,
    includeMetadata: true,
    includeHtml: false,
    includeImages: false,
    excludeAds: true,
  });

  const handleExport = () => {
    onExport(exportFormat, filters);
  };

  const handleFilterChange = (key: string, value: boolean) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Scraped Data</CardTitle>
        <CardDescription>
          Export {dataCount} items with various format options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="export">Export Options</TabsTrigger>
            <TabsTrigger value="filters">Content Filters</TabsTrigger>
            <TabsTrigger value="save">Save to Knowledge Base</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div
                className={`border rounded-md p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors ${
                  exportFormat === "json" ? "border-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setExportFormat("json")}
              >
                <FileJson className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="font-medium">JSON</div>
                <div className="text-xs text-muted-foreground">
                  Structured data format
                </div>
              </div>

              <div
                className={`border rounded-md p-4 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors ${
                  exportFormat === "csv" ? "border-green-500 bg-green-50" : ""
                }`}
                onClick={() => setExportFormat("csv")}
              >
                <FileSpreadsheet className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="font-medium">CSV</div>
                <div className="text-xs text-muted-foreground">
                  Spreadsheet compatible
                </div>
              </div>

              <div
                className={`border rounded-md p-4 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors ${
                  exportFormat === "markdown"
                    ? "border-purple-500 bg-purple-50"
                    : ""
                }`}
                onClick={() => setExportFormat("markdown")}
              >
                <FileCode className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="font-medium">Markdown</div>
                <div className="text-xs text-muted-foreground">
                  Formatted text
                </div>
              </div>

              <div
                className={`border rounded-md p-4 text-center cursor-pointer hover:border-gray-500 hover:bg-gray-50 transition-colors ${
                  exportFormat === "txt" ? "border-gray-500 bg-gray-50" : ""
                }`}
                onClick={() => setExportFormat("txt")}
              >
                <FileText className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <div className="font-medium">TXT</div>
                <div className="text-xs text-muted-foreground">
                  Plain text format
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Label>Export Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-metadata">Include Metadata</Label>
                    <Switch
                      id="include-metadata"
                      checked={filters.includeMetadata}
                      onCheckedChange={(checked) =>
                        handleFilterChange("includeMetadata", checked)
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Include URL, timestamp, and other metadata
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-html">Include HTML</Label>
                    <Switch
                      id="include-html"
                      checked={filters.includeHtml}
                      onCheckedChange={(checked) =>
                        handleFilterChange("includeHtml", checked)
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Include original HTML content
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Label>File Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="filename">Filename</Label>
                  <Input
                    id="filename"
                    placeholder="scraped-data"
                    defaultValue="scraped-data"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compression">Compression</Label>
                  <Select defaultValue="none">
                    <SelectTrigger id="compression">
                      <SelectValue placeholder="Select compression" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="zip">ZIP</SelectItem>
                      <SelectItem value="gzip">GZIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="filters" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">
                  Content Filtering Options
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="clean-text">Clean Text</Label>
                    <Switch
                      id="clean-text"
                      checked={filters.cleanText}
                      onCheckedChange={(checked) =>
                        handleFilterChange("cleanText", checked)
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Remove extra whitespace and format text
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="exclude-ads">Exclude Ads</Label>
                    <Switch
                      id="exclude-ads"
                      checked={filters.excludeAds}
                      onCheckedChange={(checked) =>
                        handleFilterChange("excludeAds", checked)
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Remove advertisement content
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-images">Include Images</Label>
                    <Switch
                      id="include-images"
                      checked={filters.includeImages}
                      onCheckedChange={(checked) =>
                        handleFilterChange("includeImages", checked)
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Include image URLs or base64 data
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label>Advanced Filtering</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="include-elements">Include Elements</Label>
                    <Input
                      id="include-elements"
                      placeholder="e.g., p, h1, h2, article"
                      defaultValue="p, h1, h2, h3, article, section"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exclude-elements">Exclude Elements</Label>
                    <Input
                      id="exclude-elements"
                      placeholder="e.g., nav, footer, aside"
                      defaultValue="nav, footer, aside, .ads, #sidebar"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-regex">Custom Regex Filter</Label>
                <Input id="custom-regex" placeholder="e.g., /pattern/g" />
                <p className="text-xs text-muted-foreground">
                  Apply custom regex pattern to filter content
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="save" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Save to Knowledge Base</h3>
              </div>

              <p className="text-sm text-muted-foreground">
                Add the scraped data to your knowledge base for use with AI
                responses
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kb-category">Category</Label>
                  <Select defaultValue="documentation">
                    <SelectTrigger id="kb-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="documentation">
                        Documentation
                      </SelectItem>
                      <SelectItem value="product">
                        Product Information
                      </SelectItem>
                      <SelectItem value="faq">FAQ</SelectItem>
                      <SelectItem value="blog">Blog Content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kb-tags">Tags</Label>
                  <Input
                    id="kb-tags"
                    placeholder="Enter tags separated by commas"
                    defaultValue="scraped, documentation, web"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="process-with-ai">Process with AI</Label>
                  <Switch id="process-with-ai" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Use AI to clean, summarize, and enhance the content before
                  saving
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="create-embeddings">Create Embeddings</Label>
                  <Switch id="create-embeddings" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Generate vector embeddings for semantic search
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {dataCount} items selected for export
        </div>
        <div className="space-x-2">
          {activeTab === "save" ? (
            <Button onClick={onSaveToKnowledgeBase}>
              <Upload className="mr-2 h-4 w-4" /> Save to Knowledge Base
            </Button>
          ) : (
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ScrapedDataExport;
