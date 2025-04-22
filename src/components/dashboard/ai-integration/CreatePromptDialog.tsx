import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Check, Loader2 } from "lucide-react";

interface CreatePromptDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreatePrompt: (promptData: {
        name: string;
        category: string;
        description: string;
        content: string;
    }) => void;
}

const CreatePromptDialog: React.FC<CreatePromptDialogProps> = ({
    open,
    onOpenChange,
    onCreatePrompt,
}) => {
    const [promptName, setPromptName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [creating, setCreating] = useState(false);

    const handleCreate = () => {
        if (!promptName.trim() || !category || !content.trim()) return;

        setCreating(true);

        // Simulate creation delay
        setTimeout(() => {
            onCreatePrompt({
                name: promptName,
                category,
                description,
                content,
            });

            setCreating(false);
            resetForm();
            onOpenChange(false);
        }, 1000);
    };

    const resetForm = () => {
        setPromptName("");
        setCategory("");
        setDescription("");
        setContent("");
    };

    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            if (!newOpen) resetForm();
            onOpenChange(newOpen);
        }}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create New Prompt Template</DialogTitle>
                    <DialogDescription>
                        Create a custom prompt template for your AI assistant
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prompt-name" className="col-span-4">
                            Prompt Name
                        </Label>
                        <Input
                            id="prompt-name"
                            placeholder="Enter a name for this prompt template"
                            className="col-span-4"
                            value={promptName}
                            onChange={(e) => setPromptName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="col-span-4">
                            Category
                        </Label>
                        <Select
                            value={category}
                            onValueChange={setCategory}
                        >
                            <SelectTrigger className="col-span-4">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="customer-service">Customer Service</SelectItem>
                                <SelectItem value="sales">Sales</SelectItem>
                                <SelectItem value="technical-support">Technical Support</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="col-span-4">
                            Description (Optional)
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Enter a brief description of this prompt template"
                            className="col-span-4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="content" className="col-span-4">
                            Prompt Content
                        </Label>
                        <Textarea
                            id="content"
                            placeholder="Enter the content of your prompt template"
                            className="col-span-4 min-h-[150px]"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreate}
                        disabled={!promptName.trim() || !category || !content.trim() || creating}
                    >
                        {creating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Create Prompt
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePromptDialog;
