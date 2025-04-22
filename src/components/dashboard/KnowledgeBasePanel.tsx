import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  FileText,
  FolderTree,
  Tag,
  Upload,
  Download,
  Eye,
  Copy,
  Check,
  Clock,
  Filter,
  ArrowUpDown,
  Sparkles,
  BookOpen,
  Layers,
  Link,
  MessageSquare,
  X,
  Globe,
} from "lucide-react";

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  source: string;
  sourceType: "manual" | "scraping" | "upload" | "api";
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "archived" | "draft";
  priority: number;
}

interface KnowledgeCategory {
  id: string;
  name: string;
  description: string;
  itemCount: number;
}

interface KnowledgeBasePanelProps {
  defaultTab?: string;
}

const KnowledgeBasePanel: React.FC<KnowledgeBasePanelProps> = ({ defaultTab = "items" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<KnowledgeCategory | null>(null);
  const [copied, setCopied] = useState(false);

  // Mock data for knowledge items
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    {
      id: "1",
      title: "Product Overview",
      content:
        "Our AI chat widget provides intelligent responses to customer queries using advanced natural language processing. It can be embedded on any website and customized to match your brand.",
      source: "https://example.com/product",
      sourceType: "manual",
      category: "product",
      tags: ["overview", "features"],
      createdAt: new Date(2023, 3, 15),
      updatedAt: new Date(2023, 5, 10),
      status: "active",
      priority: 10,
    },
    {
      id: "2",
      title: "Installation Guide",
      content:
        "To install the chat widget, copy the provided code snippet and paste it into your website's HTML. The widget will automatically initialize when the page loads.",
      source: "https://example.com/docs/installation",
      sourceType: "scraping",
      category: "technical",
      tags: ["installation", "setup", "code"],
      createdAt: new Date(2023, 4, 5),
      updatedAt: new Date(2023, 4, 5),
      status: "active",
      priority: 8,
    },
    {
      id: "3",
      title: "Pricing Information",
      content:
        "Our service is available in three tiers: Basic ($29/month), Professional ($79/month), and Enterprise (custom pricing). All plans include core features with varying usage limits and support options.",
      source: "pricing.pdf",
      sourceType: "upload",
      category: "sales",
      tags: ["pricing", "plans"],
      createdAt: new Date(2023, 2, 20),
      updatedAt: new Date(2023, 5, 15),
      status: "active",
      priority: 9,
    },
    {
      id: "4",
      title: "API Documentation",
      content:
        "The Chat Widget API allows you to programmatically control the widget, send and receive messages, and customize its behavior. Authentication is required using your API key.",
      source: "https://example.com/api/docs",
      sourceType: "scraping",
      category: "technical",
      tags: ["api", "development", "integration"],
      createdAt: new Date(2023, 1, 10),
      updatedAt: new Date(2023, 3, 25),
      status: "active",
      priority: 7,
    },
    {
      id: "5",
      title: "Upcoming Features",
      content:
        "We're working on adding voice input, multilingual support, and enhanced analytics in our next major release scheduled for Q3 2023.",
      source: "internal-roadmap.docx",
      sourceType: "upload",
      category: "product",
      tags: ["roadmap", "features"],
      createdAt: new Date(2023, 5, 1),
      updatedAt: new Date(2023, 5, 1),
      status: "draft",
      priority: 5,
    },
  ]);

  // Mock data for categories
  const [categories, setCategories] = useState<KnowledgeCategory[]>([
    {
      id: "product",
      name: "Product Information",
      description: "General information about our products and features",
      itemCount: 2,
    },
    {
      id: "technical",
      name: "Technical Documentation",
      description:
        "Technical guides, API documentation, and implementation details",
      itemCount: 2,
    },
    {
      id: "sales",
      name: "Sales & Pricing",
      description: "Pricing information, plans, and sales-related content",
      itemCount: 1,
    },
    {
      id: "support",
      name: "Customer Support",
      description: "Troubleshooting guides and support information",
      itemCount: 0,
    },
  ]);

  const handleEditItem = (item: KnowledgeItem) => {
    setSelectedItem(item);
    setActiveTab("create-edit");
  };

  const handleCreateNewItem = () => {
    setSelectedItem(null);
    setActiveTab("create-edit");
  };

  const handleDeleteItem = (itemId: string) => {
    setKnowledgeItems(knowledgeItems.filter((item) => item.id !== itemId));
  };

  const handleViewItemDetails = (item: KnowledgeItem) => {
    setSelectedItem(item);
  };

  const handleCopyContent = () => {
    if (selectedItem) {
      navigator.clipboard.writeText(selectedItem.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEditCategory = (category: KnowledgeCategory) => {
    setSelectedCategory(category);
    setActiveTab("categories");
  };

  const getStatusBadge = (status: KnowledgeItem["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "archived":
        return <Badge className="bg-gray-500">Archived</Badge>;
      case "draft":
        return <Badge className="bg-amber-500">Draft</Badge>;
      default:
        return null;
    }
  };

  const getSourceTypeBadge = (sourceType: KnowledgeItem["sourceType"]) => {
    switch (sourceType) {
      case "manual":
        return <Badge variant="outline">Manual</Badge>;
      case "scraping":
        return <Badge variant="outline">Web Scraping</Badge>;
      case "upload":
        return <Badge variant="outline">File Upload</Badge>;
      case "api":
        return <Badge variant="outline">API</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Knowledge Base Management</h1>
        <Button onClick={handleCreateNewItem}>
          <Plus className="mr-2 h-4 w-4" /> Add Knowledge Item
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="items">Knowledge Items</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="create-edit">
            {selectedItem ? "Edit Item" : "Create Item"}
          </TabsTrigger>
          <TabsTrigger value="import-export">Import/Export</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Items</CardTitle>
              <CardDescription>
                Manage your knowledge base content for AI responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Input
                    placeholder="Search knowledge base..."
                    className="max-w-sm mr-2"
                    prefix={
                      <Search className="h-4 w-4 text-muted-foreground" />
                    }
                  />
                  <Button variant="outline" size="icon" className="mr-2">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Select defaultValue="active">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedItem ? (
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                      <CardTitle>{selectedItem.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <span className="mr-2">{selectedItem.source}</span>
                        {getSourceTypeBadge(selectedItem.sourceType)}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedItem(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Category:</span>
                          <span className="text-sm">
                            {
                              categories.find(
                                (c) => c.id === selectedItem.category,
                              )?.name
                            }
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Status:</span>
                          {getStatusBadge(selectedItem.status)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {selectedItem.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Separator />

                      <div className="relative">
                        <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                          {selectedItem.content}
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

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div>
                          Created: {selectedItem.createdAt.toLocaleDateString()}
                        </div>
                        <div>
                          Updated: {selectedItem.updatedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditItem(selectedItem)}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Test in Chat
                      </Button>
                      <Button size="sm">
                        <Sparkles className="mr-2 h-4 w-4" /> Enhance with AI
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {knowledgeItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.title}
                        </TableCell>
                        <TableCell>
                          {categories.find((c) => c.id === item.category)?.name}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          <div className="flex items-center">
                            <span className="truncate mr-2">{item.source}</span>
                            {getSourceTypeBadge(item.sourceType)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {item.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{item.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          {item.updatedAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewItemDetails(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditItem(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Categories</CardTitle>
              <CardDescription>
                Organize your knowledge base with categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Input
                  placeholder="Search categories..."
                  className="max-w-sm"
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </div>

              {selectedCategory ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Edit Category</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category-name">Category Name</Label>
                      <Input
                        id="category-name"
                        defaultValue={selectedCategory.name}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category-description">Description</Label>
                      <Textarea
                        id="category-description"
                        defaultValue={selectedCategory.description}
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedCategory(null)}
                      >
                        Cancel
                      </Button>
                      <Button>Save Changes</Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Items in this Category
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {knowledgeItems
                          .filter(
                            (item) => item.category === selectedCategory.id,
                          )
                          .map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">
                                {item.title}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(item.status)}
                              </TableCell>
                              <TableCell>
                                {item.updatedAt.toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewItemDetails(item)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditItem(item)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <Card
                      key={category.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {category.name}
                        </CardTitle>
                        <CardDescription>
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">
                              {category.itemCount} items
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditCategory(category)}
                            >
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
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-edit">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedItem ? "Edit Knowledge Item" : "Add Knowledge Item"}
              </CardTitle>
              <CardDescription>
                {selectedItem
                  ? "Update this knowledge base item"
                  : "Add new information to your knowledge base"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-title">Title</Label>
                  <Input
                    id="item-title"
                    placeholder="e.g., Product Overview"
                    defaultValue={selectedItem?.title || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-category">Category</Label>
                  <Select
                    defaultValue={selectedItem?.category || categories[0].id}
                  >
                    <SelectTrigger id="item-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-content">Content</Label>
                <Textarea
                  id="item-content"
                  placeholder="Enter the knowledge base content..."
                  className="min-h-[200px]"
                  defaultValue={selectedItem?.content || ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-source">Source</Label>
                  <Input
                    id="item-source"
                    placeholder="e.g., https://example.com/docs or filename.pdf"
                    defaultValue={selectedItem?.source || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-source-type">Source Type</Label>
                  <Select defaultValue={selectedItem?.sourceType || "manual"}>
                    <SelectTrigger id="item-source-type">
                      <SelectValue placeholder="Select source type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual Entry</SelectItem>
                      <SelectItem value="scraping">Web Scraping</SelectItem>
                      <SelectItem value="upload">File Upload</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-tags">Tags</Label>
                <Input
                  id="item-tags"
                  placeholder="Enter tags separated by commas"
                  defaultValue={selectedItem?.tags.join(", ") || ""}
                />
                <p className="text-sm text-muted-foreground">
                  Tags help categorize and find knowledge items more easily
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-status">Status</Label>
                  <Select defaultValue={selectedItem?.status || "active"}>
                    <SelectTrigger id="item-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-priority">Priority</Label>
                  <Select
                    defaultValue={selectedItem?.priority.toString() || "5"}
                  >
                    <SelectTrigger id="item-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">High (10)</SelectItem>
                      <SelectItem value="5">Medium (5)</SelectItem>
                      <SelectItem value="1">Low (1)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Higher priority items are preferred in AI responses
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="item-ai-enhance">AI Enhancement</Label>
                  <Switch id="item-ai-enhance" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Use AI to improve content quality and expand information
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("items")}>
                Cancel
              </Button>
              <div className="space-x-2">
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" /> Preview in Chat
                </Button>
                <Button>{selectedItem ? "Update Item" : "Add Item"}</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="import-export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Knowledge Base Items</CardTitle>
              <CardDescription>
                Import content from various sources to your knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">File Import</h3>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">
                    Drag and drop files here
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Supports CSV, JSON, Markdown, and Text files
                  </p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Import from URL</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="https://example.com/knowledge-source"
                    className="flex-1"
                  />
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add URL
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="crawl-links">Crawl Internal Links</Label>
                  <Switch id="crawl-links" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Import from Integrations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                  >
                    <svg
                      className="h-8 w-8 mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.044 7.805L19.04 7.8L16.577 4.573C16.232 4.121 15.85 3.702 15.435 3.319C15.033 2.946 14.595 2.615 14.13 2.329C13.665 2.044 13.173 1.809 12.662 1.628C12.15 1.446 11.621 1.319 11.083 1.247C10.545 1.175 9.998 1.159 9.455 1.199C8.911 1.239 8.373 1.335 7.848 1.486C7.323 1.637 6.814 1.842 6.329 2.097C5.844 2.353 5.386 2.658 4.962 3.008C4.538 3.358 4.15 3.752 3.805 4.184C3.46 4.616 3.16 5.084 2.911 5.581C2.662 6.078 2.465 6.601 2.324 7.141C2.183 7.681 2.099 8.235 2.073 8.795C2.047 9.355 2.079 9.916 2.169 10.467C2.259 11.018 2.406 11.557 2.608 12.075C2.81 12.593 3.066 13.087 3.371 13.548C3.676 14.009 4.028 14.434 4.42 14.815L4.425 14.82L6.888 17.427C7.233 17.879 7.615 18.298 8.03 18.681C8.432 19.054 8.87 19.385 9.335 19.671C9.8 19.956 10.292 20.191 10.803 20.372C11.315 20.554 11.844 20.681 12.382 20.753C12.92 20.825 13.467 20.841 14.01 20.801C14.554 20.761 15.092 20.665 15.617 20.514C16.142 20.363 16.651 20.158 17.136 19.903C17.621 19.647 18.079 19.342 18.503 18.992C18.927 18.642 19.315 18.248 19.66 17.816C20.005 17.384 20.305 16.916 20.554 16.419C20.803 15.922 21 15.399 21.141 14.859C21.282 14.319 21.366 13.765 21.392 13.205C21.418 12.645 21.386 12.084 21.296 11.533C21.206 10.982 21.059 10.443 20.857 9.925C20.655 9.407 20.399 8.913 20.094 8.452C19.789 7.991 19.437 7.566 19.044 7.185V7.805Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V12L15 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-medium">Notion</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                  >
                    <svg
                      className="h-8 w-8 mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 14L14 21M21 14V18.5M21 14H16.5M3 10L10 3M3 10V5.5M3 10H7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-medium">Confluence</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                  >
                    <svg
                      className="h-8 w-8 mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 9H16M8 13H14M8 17H10M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-medium">Google Docs</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Start Import</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Knowledge Base</CardTitle>
              <CardDescription>
                Export your knowledge base for backup or migration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Export Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="export-format">Format</Label>
                    <Select defaultValue="json">
                      <SelectTrigger id="export-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="markdown">Markdown</SelectItem>
                        <SelectItem value="txt">Plain Text</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="export-scope">Scope</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="export-scope">
                        <SelectValue placeholder="Select scope" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Items</SelectItem>
                        <SelectItem value="active">
                          Active Items Only
                        </SelectItem>
                        <SelectItem value="selected">
                          Selected Categories
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-metadata">Include Metadata</Label>
                  <Switch id="include-metadata" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Include creation dates, source information, and other metadata
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-archived">
                    Include Archived Items
                  </Label>
                  <Switch id="include-archived" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Download className="mr-2 h-4 w-4" /> Export Knowledge Base
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBasePanel;
