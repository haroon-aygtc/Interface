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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Check,
  Search,
  MessageSquare,
  FileText,
  ShoppingBag,
  BookOpen,
  BarChart,
} from "lucide-react";
import { PromptTemplateTabProps, Prompt } from "./types";

const PromptTemplateTab: React.FC<PromptTemplateTabProps> = ({
  prompts,
  setPrompts,
  currentConfig,
  onConfigChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showNewPromptDialog, setShowNewPromptDialog] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [newPrompt, setNewPrompt] = useState<{
    name: string;
    description: string;
    category: string;
    content: string;
  }>({
    name: "",
    description: "",
    category: "Support",
    content: "",
  });

  // Filter prompts based on search query and category
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || prompt.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from prompts
  const categories = Array.from(new Set(prompts.map((prompt) => prompt.category)));

  // Handle creating a new prompt
  const handleCreatePrompt = () => {
    const newPromptObj: Prompt = {
      id: `p${prompts.length + 1}`,
      name: newPrompt.name,
      description: newPrompt.description,
      category: newPrompt.category,
      content: newPrompt.content,
      isDefault: false,
    };

    setPrompts([...prompts, newPromptObj]);
    setShowNewPromptDialog(false);
    setNewPrompt({
      name: "",
      description: "",
      category: "Support",
      content: "",
    });
  };

  // Handle updating an existing prompt
  const handleUpdatePrompt = () => {
    if (!editingPrompt) return;

    const updatedPrompts = prompts.map((prompt) =>
      prompt.id === editingPrompt.id ? editingPrompt : prompt
    );

    setPrompts(updatedPrompts);
    setEditingPrompt(null);
  };

  // Handle deleting a prompt
  const handleDeletePrompt = (id: string) => {
    // Don't delete if it's the currently selected prompt
    if (id === currentConfig.selectedPromptId) {
      alert("Cannot delete a prompt that is currently in use. Please select another prompt first.");
      return;
    }

    const updatedPrompts = prompts.filter((prompt) => prompt.id !== id);
    setPrompts(updatedPrompts);
  };

  // Get category badge
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Support":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
            <MessageSquare className="h-3 w-3 mr-1" />
            Support
          </Badge>
        );
      case "Technical":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">
            <FileText className="h-3 w-3 mr-1" />
            Technical
          </Badge>
        );
      case "Sales":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
            <ShoppingBag className="h-3 w-3 mr-1" />
            Sales
          </Badge>
        );
      case "Onboarding":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
            <BookOpen className="h-3 w-3 mr-1" />
            Onboarding
          </Badge>
        );
      case "Analytics":
        return (
          <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800">
            <BarChart className="h-3 w-3 mr-1" />
            Analytics
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {category}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <CardHeader className="bg-muted/30 pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center text-lg">
                <span className="mr-2 h-5 w-5 text-[#D8A23B]">💬</span>
                Prompt Templates
              </CardTitle>
              <CardDescription>
                Create and manage reusable prompt templates
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowNewPromptDialog(true)}
              className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
            >
              <Plus className="h-4 w-4 mr-2" /> New Template
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center mb-4 gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrompts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      No prompt templates found. Create a new one to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPrompts.map((prompt) => (
                    <TableRow key={prompt.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{prompt.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {prompt.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(prompt.category)}</TableCell>
                      <TableCell>
                        {prompt.id === currentConfig.selectedPromptId ? (
                          <Badge className="bg-[#D8A23B]/20 text-[#D8A23B] hover:bg-[#D8A23B]/30">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => onConfigChange("selectedPromptId", prompt.id)}>
                            Set Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingPrompt(prompt);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeletePrompt(prompt.id)}
                            disabled={prompt.id === currentConfig.selectedPromptId}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <CardHeader className="bg-muted/30 pb-2">
          <CardTitle className="flex items-center text-lg">
            <span className="mr-2 h-5 w-5 text-[#D8A23B]">📋</span>
            Active Prompt Template
          </CardTitle>
          <CardDescription>
            Currently selected prompt template for AI responses
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {prompts.find((p) => p.id === currentConfig.selectedPromptId) ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {prompts.find((p) => p.id === currentConfig.selectedPromptId)?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {prompts.find((p) => p.id === currentConfig.selectedPromptId)?.description}
                  </p>
                </div>
                {getCategoryBadge(
                  prompts.find((p) => p.id === currentConfig.selectedPromptId)?.category || ""
                )}
              </div>
              <div className="p-4 bg-muted/30 rounded-md border">
                <pre className="whitespace-pre-wrap text-sm">
                  {prompts.find((p) => p.id === currentConfig.selectedPromptId)?.content}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No prompt template selected. Please select a template from the list above.
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Prompt Dialog */}
      <Dialog open={showNewPromptDialog} onOpenChange={setShowNewPromptDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Prompt Template</DialogTitle>
            <DialogDescription>
              Create a new prompt template for your AI assistant.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prompt-name" className="text-right">
                Name
              </Label>
              <Input
                id="prompt-name"
                value={newPrompt.name}
                onChange={(e) =>
                  setNewPrompt({ ...newPrompt, name: e.target.value })
                }
                placeholder="e.g., Customer Support Agent"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prompt-description" className="text-right">
                Description
              </Label>
              <Input
                id="prompt-description"
                value={newPrompt.description}
                onChange={(e) =>
                  setNewPrompt({ ...newPrompt, description: e.target.value })
                }
                placeholder="e.g., Friendly support agent for general inquiries"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prompt-category" className="text-right">
                Category
              </Label>
              <Select
                value={newPrompt.category}
                onValueChange={(value) =>
                  setNewPrompt({ ...newPrompt, category: value })
                }
              >
                <SelectTrigger id="prompt-category" className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Onboarding">Onboarding</SelectItem>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="prompt-content" className="text-right pt-2">
                Content
              </Label>
              <Textarea
                id="prompt-content"
                value={newPrompt.content}
                onChange={(e) =>
                  setNewPrompt({ ...newPrompt, content: e.target.value })
                }
                placeholder="Enter the prompt template content..."
                className="col-span-3 min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowNewPromptDialog(false);
                setNewPrompt({
                  name: "",
                  description: "",
                  category: "Support",
                  content: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleCreatePrompt}
              disabled={!newPrompt.name || !newPrompt.content}
              className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
            >
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Prompt Dialog */}
      <Dialog
        open={!!editingPrompt}
        onOpenChange={(open) => {
          if (!open) setEditingPrompt(null);
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Prompt Template</DialogTitle>
            <DialogDescription>
              Update the prompt template details.
            </DialogDescription>
          </DialogHeader>
          {editingPrompt && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-prompt-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-prompt-name"
                  value={editingPrompt.name}
                  onChange={(e) =>
                    setEditingPrompt({
                      ...editingPrompt,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-prompt-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-prompt-description"
                  value={editingPrompt.description}
                  onChange={(e) =>
                    setEditingPrompt({
                      ...editingPrompt,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-prompt-category" className="text-right">
                  Category
                </Label>
                <Select
                  value={editingPrompt.category}
                  onValueChange={(value) =>
                    setEditingPrompt({
                      ...editingPrompt,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger id="edit-prompt-category" className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-prompt-content" className="text-right pt-2">
                  Content
                </Label>
                <Textarea
                  id="edit-prompt-content"
                  value={editingPrompt.content}
                  onChange={(e) =>
                    setEditingPrompt({
                      ...editingPrompt,
                      content: e.target.value,
                    })
                  }
                  className="col-span-3 min-h-[200px]"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingPrompt(null)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleUpdatePrompt}
              disabled={!editingPrompt?.name || !editingPrompt?.content}
              className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
            >
              Update Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromptTemplateTab;
