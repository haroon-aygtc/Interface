import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Eye, Save, X, Copy, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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

interface SelectorGroupManagerProps {
  selectorGroups: SelectorGroup[];
  onCreateGroup: (group: Omit<SelectorGroup, "id" | "selectors">) => void;
  onUpdateGroup: (group: SelectorGroup) => void;
  onDeleteGroup: (groupId: string) => void;
  onCreateSelector: (selector: Omit<Selector, "id">, groupId: string) => void;
  onUpdateSelector: (selector: Selector, groupId: string) => void;
  onDeleteSelector: (selectorId: string, groupId: string) => void;
}

const SelectorGroupManager: React.FC<SelectorGroupManagerProps> = ({
  selectorGroups,
  onCreateGroup,
  onUpdateGroup,
  onDeleteGroup,
  onCreateSelector,
  onUpdateSelector,
  onDeleteSelector,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<SelectorGroup | null>(
    null,
  );
  const [editingSelector, setEditingSelector] = useState<Selector | null>(null);
  const [newGroupOpen, setNewGroupOpen] = useState(false);
  const [newSelectorOpen, setNewSelectorOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form states
  const [groupName, setGroupName] = useState("");
  const [groupDomain, setGroupDomain] = useState("");
  const [groupPageType, setGroupPageType] = useState("");
  const [selectorName, setSelectorName] = useState("");
  const [selectorCssPath, setSelectorCssPath] = useState("");
  const [selectorXPath, setSelectorXPath] = useState("");
  const [selectorDescription, setSelectorDescription] = useState("");

  const handleViewGroup = (group: SelectorGroup) => {
    setSelectedGroup(group);
  };

  const handleEditSelector = (selector: Selector) => {
    setEditingSelector(selector);
    setSelectorName(selector.name);
    setSelectorCssPath(selector.cssPath);
    setSelectorXPath(selector.xPath || "");
    setSelectorDescription(selector.description || "");
    setNewSelectorOpen(true);
  };

  const handleAddNewSelector = () => {
    setEditingSelector(null);
    setSelectorName("");
    setSelectorCssPath("");
    setSelectorXPath("");
    setSelectorDescription("");
    setNewSelectorOpen(true);
  };

  const handleCreateNewGroup = () => {
    setGroupName("");
    setGroupDomain("");
    setGroupPageType("");
    setNewGroupOpen(true);
  };

  const handleSaveGroup = () => {
    if (groupName && groupDomain) {
      onCreateGroup({
        name: groupName,
        domain: groupDomain,
        pageType: groupPageType,
      });
      setNewGroupOpen(false);
    }
  };

  const handleSaveSelector = () => {
    if (selectorName && selectorCssPath && selectedGroup) {
      if (editingSelector) {
        onUpdateSelector(
          {
            id: editingSelector.id,
            name: selectorName,
            cssPath: selectorCssPath,
            xPath: selectorXPath || undefined,
            description: selectorDescription || undefined,
          },
          selectedGroup.id,
        );
      } else {
        onCreateSelector(
          {
            name: selectorName,
            cssPath: selectorCssPath,
            xPath: selectorXPath || undefined,
            description: selectorDescription || undefined,
          },
          selectedGroup.id,
        );
      }
      setNewSelectorOpen(false);
    }
  };

  const handleCopySelector = (cssPath: string) => {
    navigator.clipboard.writeText(cssPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Input placeholder="Search groups..." className="max-w-sm" />
        <Button onClick={handleCreateNewGroup}>
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
          {selectorGroups.map((group) => (
            <TableRow key={group.id}>
              <TableCell className="font-medium">{group.name}</TableCell>
              <TableCell>{group.domain}</TableCell>
              <TableCell>{group.pageType}</TableCell>
              <TableCell>{group.selectors.length}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewGroup(group)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDeleteGroup(group.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedGroup && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Group: {selectedGroup.name}</CardTitle>
                <CardDescription>
                  Domain: {selectedGroup.domain} | Page Type:{" "}
                  {selectedGroup.pageType}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedGroup(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Selectors</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddNewSelector}
                >
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
                  {selectedGroup.selectors.map((selector) => (
                    <TableRow key={selector.id}>
                      <TableCell>{selector.name}</TableCell>
                      <TableCell className="font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[200px]">
                            {selector.cssPath}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopySelector(selector.cssPath)}
                          >
                            {copied ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{selector.description}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSelector(selector)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() =>
                              onDeleteSelector(selector.id, selectedGroup.id)
                            }
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
          </CardContent>
        </Card>
      )}

      {/* New Group Dialog */}
      <Dialog open={newGroupOpen} onOpenChange={setNewGroupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Selector Group</DialogTitle>
            <DialogDescription>
              Create a group to organize selectors for a specific domain or page
              type
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                placeholder="e.g., Blog Posts"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-domain">Domain</Label>
              <Input
                id="group-domain"
                placeholder="e.g., example.com"
                value={groupDomain}
                onChange={(e) => setGroupDomain(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-page-type">Page Type</Label>
              <Input
                id="group-page-type"
                placeholder="e.g., blog, product, documentation"
                value={groupPageType}
                onChange={(e) => setGroupPageType(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewGroupOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveGroup}
              disabled={!groupName || !groupDomain}
            >
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New/Edit Selector Dialog */}
      <Dialog open={newSelectorOpen} onOpenChange={setNewSelectorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSelector ? "Edit Selector" : "Add New Selector"}
            </DialogTitle>
            <DialogDescription>
              {editingSelector
                ? "Update the selector properties"
                : "Define a new selector for this group"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
              <Label htmlFor="selector-css">CSS Selector</Label>
              <Input
                id="selector-css"
                placeholder="e.g., .article-title, #main-content"
                value={selectorCssPath}
                onChange={(e) => setSelectorCssPath(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="selector-xpath">XPath (optional)</Label>
              <Input
                id="selector-xpath"
                placeholder="e.g., //h1[@class='title']"
                value={selectorXPath}
                onChange={(e) => setSelectorXPath(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="selector-description">
                Description (optional)
              </Label>
              <Textarea
                id="selector-description"
                placeholder="What kind of content does this selector target?"
                value={selectorDescription}
                onChange={(e) => setSelectorDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewSelectorOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveSelector}
              disabled={!selectorName || !selectorCssPath}
            >
              {editingSelector ? "Update Selector" : "Add Selector"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectorGroupManager;
