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
import { Check, Loader2 } from "lucide-react";
import { AIConfig } from "./types";

interface SaveConfigDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentConfig: AIConfig;
    onSaveConfig: (configName: string, description: string) => void;
}

const SaveConfigDialog: React.FC<SaveConfigDialogProps> = ({
    open,
    onOpenChange,
    currentConfig,
    onSaveConfig,
}) => {
    const [configName, setConfigName] = useState("");
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        if (!configName.trim()) return;

        setSaving(true);

        // Simulate saving delay
        setTimeout(() => {
            onSaveConfig(configName, description);
            setSaving(false);
            setConfigName("");
            setDescription("");
            onOpenChange(false);
        }, 1000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Save Configuration</DialogTitle>
                    <DialogDescription>
                        Save your current AI configuration for future use
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="config-name" className="col-span-4">
                            Configuration Name
                        </Label>
                        <Input
                            id="config-name"
                            placeholder="Enter a name for this configuration"
                            className="col-span-4"
                            value={configName}
                            onChange={(e) => setConfigName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="col-span-4">
                            Description (Optional)
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Enter a description for this configuration"
                            className="col-span-4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!configName.trim() || saving}
                    >
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Save Configuration
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SaveConfigDialog;
