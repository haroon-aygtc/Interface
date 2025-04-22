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
import { SaveConfigDialogProps } from "./types";

const SaveConfigDialog: React.FC<SaveConfigDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  currentName,
}) => {
  const [configName, setConfigName] = useState(currentName);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!configName.trim()) {
      setError("Configuration name cannot be empty");
      return;
    }

    onSave(configName);
    setConfigName("");
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Configuration</DialogTitle>
          <DialogDescription>
            Save your current AI configuration for future use.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="config-name" className="text-right">
              Name
            </Label>
            <Input
              id="config-name"
              value={configName}
              onChange={(e) => {
                setConfigName(e.target.value);
                setError("");
              }}
              placeholder="Enter configuration name"
              className="col-span-3"
              autoFocus
            />
          </div>
          {error && (
            <div className="text-sm text-red-500 text-right">{error}</div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setConfigName(currentName);
              setError("");
            }}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSave}
            className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
          >
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveConfigDialog;
