import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge, badgeVariants } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  Heading1,
  List,
  Code,
  Minus,
  AlertCircle,
  GripVertical,
  Save,
  FileText,
  Pencil,
  Eye,
} from "lucide-react";
import { ResponseFormatterTabProps, ResponseFormat, ResponseSection } from "./types";
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from "react-beautiful-dnd";
import { useState } from "react";

const ResponseFormatterTab: React.FC<ResponseFormatterTabProps> = ({
  responseFormats,
  setResponseFormats,
  currentConfig,
  onConfigChange,
}) => {
  const [showNewFormatDialog, setShowNewFormatDialog] = useState(false);
  const [editingFormat, setEditingFormat] = useState<ResponseFormat | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [sections, setSections] = useState<ResponseSection[]>([
    {
      id: "s1",
      type: "heading",
      content: "Response Title",
      order: 0,
    },
    {
      id: "s2",
      type: "paragraph",
      content: "This is the main content of the response. It provides the primary information requested by the user.",
      order: 1,
    },
    {
      id: "s3",
      type: "list",
      content: "Key Point 1\nKey Point 2\nKey Point 3",
      order: 2,
    },
    {
      id: "s4",
      type: "code",
      content: "// Example code\nfunction example() {\n  // Log a message\n  return 'Example function';\n}",
      order: 3,
    },
    {
      id: "s5",
      type: "divider",
      content: "",
      order: 4,
    },
    {
      id: "s6",
      type: "callout",
      content: "Important note: This is a callout section for important information.",
      order: 5,
    },
  ]);
  const [newFormat, setNewFormat] = useState<{
    name: string;
    description: string;
    template: string;
  }>({
    name: "",
    description: "",
    template: "",
  });

  // Get the currently selected response format
  const selectedFormat = responseFormats.find(
    (format) => format.id === currentConfig.selectedResponseFormatId
  );

  // Handle creating a new format
  const handleCreateFormat = () => {
    // Generate template from sections
    const template = generateTemplateFromSections();

    const newFormatObj: ResponseFormat = {
      id: `rf${responseFormats.length + 1}`,
      name: newFormat.name,
      description: newFormat.description,
      template: template,
      isDefault: false,
    };

    setResponseFormats([...responseFormats, newFormatObj]);
    setShowNewFormatDialog(false);
    setNewFormat({
      name: "",
      description: "",
      template: "",
    });
  };

  // Handle updating an existing format
  const handleUpdateFormat = () => {
    if (!editingFormat) return;

    // Generate template from sections
    const template = generateTemplateFromSections();
    const updatedFormat = { ...editingFormat, template };

    const updatedFormats = responseFormats.map((format) =>
      format.id === editingFormat.id ? updatedFormat : format
    );

    setResponseFormats(updatedFormats);
    setEditingFormat(null);
  };

  // Generate template from sections
  const generateTemplateFromSections = () => {
    let template = "";

    sections.forEach((section) => {
      switch (section.type) {
        case "heading":
          template += `# ${section.content}\n\n`;
          break;
        case "paragraph":
          template += `${section.content}\n\n`;
          break;
        case "list":
          section.content.split("\n").forEach((item) => {
            template += `- ${item}\n`;
          });
          template += "\n";
          break;
        case "code":
          template += "```\n" + section.content + "\n```\n\n";
          break;
        case "divider":
          template += "---\n\n";
          break;
        case "callout":
          template += `> ${section.content}\n\n`;
          break;
        default:
          break;
      }
    });

    return template.trim();
  };

  // Handle adding a new section
  const handleAddSection = (type: string) => {
    const newSection: ResponseSection = {
      id: `s${sections.length + 1}`,
      type: type as any,
      content: type === "divider" ? "" : "New content",
      order: sections.length,
    };

    setSections([...sections, newSection]);
  };

  // Handle removing a section
  const handleRemoveSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  // Handle updating a section
  const handleUpdateSection = (id: string, content: string) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, content } : section
      )
    );
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setSections(updatedItems);
  };

  // Render section based on type
  const renderSection = (section: ResponseSection) => {
    switch (section.type) {
      case "heading":
        return (
          <div className="p-3 bg-muted/30 rounded-md border">
            <div className="text-lg font-bold">{section.content}</div>
          </div>
        );
      case "paragraph":
        return (
          <div className="p-3 bg-muted/30 rounded-md border">
            <p>{section.content}</p>
          </div>
        );
      case "list":
        return (
          <div className="p-3 bg-muted/30 rounded-md border">
            <ul className="list-disc pl-5 space-y-1">
              {section.content.split("\n").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case "code":
        return (
          <div className="p-3 bg-muted/30 rounded-md border">
            <pre className="bg-muted p-2 rounded text-sm font-mono overflow-x-auto">
              {section.content}
            </pre>
          </div>
        );
      case "divider":
        return (
          <div className="py-2">
            <hr className="border-t border-border" />
          </div>
        );
      case "callout":
        return (
          <div className="p-3 bg-[#D8A23B]/10 rounded-md border border-[#D8A23B]/30 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-[#D8A23B] flex-shrink-0 mt-0.5" />
            <div>{section.content}</div>
          </div>
        );
      default:
        return null;
    }
  };

  // Render editable section
  const renderEditableSection = (section: ResponseSection, index: number) => {
    return (
      <Draggable key={section.id} draggableId={section.id} index={index}>
        {(provided: DraggableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="mb-3 rounded-md border bg-card overflow-hidden"
          >
            <div className="flex items-center justify-between bg-muted/30 p-2 border-b">
              <div className="flex items-center">
                <div
                  {...provided.dragHandleProps}
                  className="p-1 mr-2 cursor-grab hover:bg-muted rounded"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
                <Badge
                  className={`${badgeVariants({ variant: "outline" })} ${section.type === "heading"
                      ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                      : section.type === "paragraph"
                        ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                        : section.type === "list"
                          ? "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800"
                          : section.type === "code"
                            ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                            : section.type === "divider"
                              ? "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800"
                              : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"}`}
                >
                  {section.type === "heading" && <Heading1 className="h-3 w-3 mr-1" />}
                  {section.type === "paragraph" && <FileText className="h-3 w-3 mr-1" />}
                  {section.type === "list" && <List className="h-3 w-3 mr-1" />}
                  {section.type === "code" && <Code className="h-3 w-3 mr-1" />}
                  {section.type === "divider" && <Minus className="h-3 w-3 mr-1" />}
                  {section.type === "callout" && <AlertCircle className="h-3 w-3 mr-1" />}
                  {section.type}
                </Badge>
              </div>
              <Button
                onClick={() => handleRemoveSection(section.id)}
                className={`${buttonVariants({ variant: "ghost", size: "icon" })} h-7 w-7`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3">
              {section.type !== "divider" && (
                <Textarea
                  value={section.content}
                  onChange={(e) => handleUpdateSection(section.id, e.target.value)}
                  className="min-h-[80px] resize-y"
                  placeholder={`Enter ${section.type} content...`} />
              )}
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Response Format Selection - 4 cols */}
        <Card className="md:col-span-4 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-lg">
                  <span className="mr-2 h-5 w-5 text-[#D8A23B]">📋</span>
                  Response Formats
                </CardTitle>
                <CardDescription>
                  Select or create response templates
                </CardDescription>
              </div>
              <Button
                onClick={() => setShowNewFormatDialog(true)}
                className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
              >
                <Plus className="h-4 w-4 mr-2" /> New Format
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {responseFormats.map((format) => (
                <div
                  key={format.id}
                  className={`p-4 rounded-lg border flex flex-col gap-2 transition-colors cursor-pointer ${
                    format.id === currentConfig.selectedResponseFormatId
                      ? "bg-[#D8A23B]/10 border-[#D8A23B]/30"
                      : "bg-card hover:bg-muted/50"
                  }`}
                  onClick={() => onConfigChange("selectedResponseFormatId", format.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{format.name}</h3>
                    {format.id === currentConfig.selectedResponseFormatId && (
                      <Badge className="bg-[#D8A23B]/20 text-[#D8A23B]">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {format.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      className={`${buttonVariants({ variant: "ghost", size: "sm" })} h-8 px-2 text-xs`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingFormat(format);
                        // For this demo, we'll just use the existing sections
                        // In a real app, you'd parse the template to create sections
                        setSections([...sections]);
                      }}
                    >
                      <Pencil className="h-3 w-3 mr-1" /> Edit
                    </Button>
                    <Button
                      className={`${buttonVariants({ variant: "ghost", size: "sm" })} h-8 px-2 text-xs`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Preview logic would go here
                        setPreviewMode(true);
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" /> Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Response Format Builder - 8 cols */}
        <Card className="md:col-span-8 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-lg">
                  <span className="mr-2 h-5 w-5 text-[#D8A23B]">🔧</span>
                  Response Format Builder
                </CardTitle>
                <CardDescription>
                  Design how your AI responses should be structured
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`${buttonVariants({ variant: "outline", size: "sm" })} border-[#D8A23B]/30 hover:bg-[#D8A23B]/10 hover:text-[#D8A23B]`}
                >
                  {previewMode ? (
                    <>
                      <Pencil className="h-4 w-4 mr-2" /> Edit Mode
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" /> Preview Mode
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleUpdateFormat}
                  disabled={!editingFormat}
                  className={`${buttonVariants({ size: "sm" })} bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90`}
                >
                  <Save className="h-4 w-4 mr-2" /> Save Format
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
              {previewMode ? (
                <div className="space-y-4 p-4 border rounded-md bg-muted/10">
                  <h3 className="text-lg font-medium mb-2">Preview</h3>
                  <div className="space-y-4">
                    {sections.map((section) => (
                      <div key={section.id}>{renderSection(section)}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Label className="text-sm font-medium">Add Section:</Label>
                    <Button
                      onClick={() => handleAddSection("heading")}
                      className={`${buttonVariants({ variant: "outline", size: "sm" })} h-8`}
                    >
                      <Heading1 className="h-4 w-4 mr-1" /> Heading
                    </Button>
                    <Button
                      onClick={() => handleAddSection("paragraph")}
                      className={`${buttonVariants({ variant: "outline", size: "sm" })} h-8`}
                    >
                      <FileText className="h-4 w-4 mr-1" /> Paragraph
                    </Button>
                    <Button
                      onClick={() => handleAddSection("list")}
                      className={`${buttonVariants({ variant: "outline", size: "sm" })} h-8`}
                    >
                      <List className="h-4 w-4 mr-1" /> List
                    </Button>
                    <Button
                      onClick={() => handleAddSection("code")}
                      className={`${buttonVariants({ variant: "outline", size: "sm" })} h-8`}
                    >
                      <Code className="h-4 w-4 mr-1" /> Code
                    </Button>
                    <Button
                      onClick={() => handleAddSection("divider")}
                      className={`${buttonVariants({ variant: "outline", size: "sm" })} h-8`}
                    >
                      <Minus className="h-4 w-4 mr-1" /> Divider
                    </Button>
                    <Button
                      onClick={() => handleAddSection("callout")}
                      className={`${buttonVariants({ variant: "outline", size: "sm" })} h-8`}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" /> Callout
                    </Button>
                  </div>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="sections">
                      {(provided: DroppableProvided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-2 max-h-[500px] overflow-y-auto pr-2"
                        >
                          {sections.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground border rounded-md">
                              No sections added yet. Add sections using the buttons above.
                            </div>
                          ) : (
                            sections
                              .sort((a, b) => a.order - b.order)
                              .map((section, index) => renderEditableSection(section, index))
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </>
              )}
          </CardContent>
        </Card>
          
        {/* Active Format Preview - 12 cols */}
        <Card className="md:col-span-12 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <><CardHeader className="bg-muted/30 pb-2">
            <CardTitle className="flex items-center text-lg">
              <span className="mr-2 h-5 w-5 text-[#D8A23B]">👁️</span>
              Active Response Format
            </CardTitle>
            <CardDescription>
              Currently selected response format for AI responses
            </CardDescription>
          </CardHeader><CardContent className="pt-6">
              {selectedFormat ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedFormat.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedFormat.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-md border">
                    <h4 className="text-sm font-medium mb-2">Template Structure:</h4>
                    <pre className="whitespace-pre-wrap text-sm bg-muted p-3 rounded border">
                      {selectedFormat.template}
                    </pre>
                  </div>
                  <div className="p-4 bg-muted/10 rounded-md border">
                    <h4 className="text-sm font-medium mb-2">Example Output:</h4>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <h1>Response Title</h1>
                      <p>
                        This is an example of how your response will look using this format.
                        The actual content will be generated by the AI based on the user's query
                        and the selected knowledge sources.
                      </p>
                      <ul>
                        <li>Key information point 1</li>
                        <li>Key information point 2</li>
                        <li>Key information point 3</li>
                      </ul>
                      <pre className="bg-muted p-2 rounded">
                        <code>
                          {`function example() {
  return "Example function";
}`}
                        </code>
                      </pre>
                      <hr />
                      <blockquote>
                        <p>
                          Important note: This is how callouts will appear in the response.
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No response format selected. Please select a format from the list.
                </div>
              )}
            </CardContent></>
        </Card>
      </div>

      {/* New Format Dialog */}
      <Dialog open={showNewFormatDialog} onOpenChange={setShowNewFormatDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Response Format</DialogTitle>
            <DialogDescription>
              Create a new template for formatting AI responses.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="format-name" className="text-right">
                Name
              </Label>
              <Input
                id="format-name"
                value={newFormat.name}
                onChange={(e) =>
                  setNewFormat({ ...newFormat, name: e.target.value })
                }
                placeholder="e.g., Technical Documentation"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="format-description" className="text-right">
                Description
              </Label>
              <Input
                id="format-description"
                value={newFormat.description}
                onChange={(e) =>
                  setNewFormat({ ...newFormat, description: e.target.value })
                }
                placeholder="e.g., Structured technical responses with code examples"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              className={buttonVariants({ variant: "outline" })}
              onClick={() => {
                setShowNewFormatDialog(false);
                setNewFormat({
                  name: "",
                  description: "",
                  template: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCreateFormat}
              disabled={!newFormat.name || !newFormat.description}
              className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
            >
              Create Format
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResponseFormatterTab;

