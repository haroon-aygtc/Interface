import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";
import {
  Globe,
  Copy,
  Check,
  Loader2,
  MousePointer,
  Crosshair,
  Save,
  Plus,
  X,
} from "lucide-react";

interface Selector {
  id: string;
  name: string;
  cssPath: string;
  xPath?: string;
  description?: string;
}

interface SelectorGroup {
  id: string;
  name: string;
  domain: string;
  pageType: string;
  selectors: Selector[];
}

interface LiveScrapingPreviewProps {
  selectorGroups: SelectorGroup[];
  onSaveSelector: (selector: Omit<Selector, "id">, groupId: string) => void;
  onCreateGroup: () => void;
}

const LiveScrapingPreview: React.FC<LiveScrapingPreviewProps> = ({
  selectorGroups,
  onSaveSelector,
  onCreateGroup,
}) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectorName, setSelectorName] = useState("");
  const [selectorDescription, setSelectorDescription] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    selectorGroups[0]?.id || "",
  );
  const [copied, setCopied] = useState(false);

  const handleLoadPreview = () => {
    if (!url) return;
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleStartSelecting = () => {
    setIsSelecting(true);
    // In a real implementation, this would inject a script into the iframe
    // to allow element selection
  };

  const handleCopySelector = () => {
    if (selectedElement) {
      navigator.clipboard.writeText(selectedElement);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveSelector = () => {
    if (selectedElement && selectorName && selectedGroupId) {
      onSaveSelector(
        {
          name: selectorName,
          cssPath: selectedElement,
          description: selectorDescription,
        },
        selectedGroupId,
      );
      // Reset form
      setSelectedElement(null);
      setSelectorName("");
      setSelectorDescription("");
    }
  };

  const handleCancelSelection = () => {
    setSelectedElement(null);
    setSelectorName("");
    setSelectorDescription("");
  };

  // Simulate element selection
  const simulateElementSelection = () => {
    if (isSelecting && url) {
      // In a real implementation, this would be triggered by clicking on an element in the iframe
      const mockSelectors = [
        "#main-content > div.article > h1",
        ".product-description",
        "div.content > p:nth-child(3)",
      ];
      const randomSelector =
        mockSelectors[Math.floor(Math.random() * mockSelectors.length)];
      setSelectedElement(randomSelector);
      setIsSelecting(false);
      // Suggest a name based on the selector
      const suggestedName = randomSelector.includes("h1")
        ? "Title"
        : randomSelector.includes("product")
          ? "Product Description"
          : "Content Paragraph";
      setSelectorName(suggestedName);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter URL to preview"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleLoadPreview} disabled={isLoading || !url}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
            </>
          ) : (
            <>
              <Globe className="mr-2 h-4 w-4" /> Load Preview
            </>
          )}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant={isSelecting ? "default" : "outline"}
          onClick={handleStartSelecting}
          disabled={isLoading || !url}
          className="flex-1"
        >
          <Crosshair className="mr-2 h-4 w-4" />
          {isSelecting ? "Selecting Element..." : "Select Element"}
        </Button>

        {/* This button simulates clicking on an element in the preview */}
        {isSelecting && (
          <Button onClick={simulateElementSelection} variant="secondary">
            <MousePointer className="mr-2 h-4 w-4" /> Simulate Selection
          </Button>
        )}
      </div>

      <div
        className="border rounded-md p-4 min-h-[400px] bg-muted/20 relative"
        style={{ cursor: isSelecting ? "crosshair" : "default" }}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              <p>Loading preview...</p>
              <p className="text-sm text-muted-foreground mt-2">{url}</p>
            </div>
          </div>
        ) : url ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&q=80"
                alt="Website preview"
                className="max-w-full max-h-full object-contain rounded-md opacity-80"
              />
              {isSelecting && (
                <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                  <div className="bg-white/90 p-4 rounded-md shadow-lg">
                    <p className="font-medium">
                      Click on any element to select it
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Elements will be highlighted as you hover over them
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p>Enter a URL above to preview the website</p>
              <p className="text-sm text-muted-foreground mt-2">
                You'll be able to click on elements to select them for scraping
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedElement && (
        <Card className="border-green-500">
          <CardHeader className="py-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Selected Element</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCancelSelection}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="selector-name">Name</Label>
                <Input
                  id="selector-name"
                  placeholder="e.g., Article Title"
                  value={selectorName}
                  onChange={(e) => setSelectorName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="selector-group">Add to Group</Label>
                <div className="flex gap-2">
                  <Select
                    value={selectedGroupId}
                    onValueChange={setSelectedGroupId}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectorGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={onCreateGroup}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label>CSS Selector</Label>
              <div className="flex gap-2">
                <Input
                  value={selectedElement}
                  readOnly
                  className="flex-1 font-mono text-xs"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopySelector}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="selector-description">
                Description (optional)
              </Label>
              <Input
                id="selector-description"
                placeholder="What kind of content does this selector target?"
                value={selectorDescription}
                onChange={(e) => setSelectorDescription(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancelSelection}>
              Cancel
            </Button>
            <Button onClick={handleSaveSelector} disabled={!selectorName}>
              <Save className="mr-2 h-4 w-4" /> Save Selector
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default LiveScrapingPreview;
