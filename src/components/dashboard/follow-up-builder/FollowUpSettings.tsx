import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Save, HelpCircle, Settings, MessageSquare, Workflow } from "lucide-react";

interface FollowUpSettings {
  enabled: boolean;
  maxQuestionsPerResponse: number;
  displayPosition: "inline" | "end" | "floating";
  autoSuggestThreshold: number;
  allowUserDismiss: boolean;
  trackInteractions: boolean;
  defaultCategory: string;
}

interface FollowUpSettingsProps {
  settings: FollowUpSettings;
  onUpdateSettings: (settings: FollowUpSettings) => void;
  onSaveSettings: () => void;
}

const FollowUpSettings: React.FC<FollowUpSettingsProps> = ({
  settings,
  onUpdateSettings,
  onSaveSettings,
}) => {
  const handleChange = (key: keyof FollowUpSettings, value: any) => {
    onUpdateSettings({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Follow-Up Settings</h2>
            <p className="text-muted-foreground">
              Configure global settings for follow-up questions
            </p>
          </div>
          <Button
            onClick={onSaveSettings}
            className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-md bg-muted/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#D8A23B]/20 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-[#D8A23B]" />
            </div>
            <div>
              <h3 className="text-base font-medium">Enable Follow-Up Questions</h3>
              <p className="text-sm text-muted-foreground">
                Turn on to show follow-up questions after AI responses
              </p>
            </div>
          </div>
          <Switch
            checked={settings.enabled}
            onCheckedChange={(checked) => handleChange("enabled", checked)}
            className="data-[state=checked]:bg-[#D8A23B]"
          />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="display-settings">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Display Settings</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display-position">Display Position</Label>
                  <Select
                    value={settings.displayPosition}
                    onValueChange={(value: "inline" | "end" | "floating") =>
                      handleChange("displayPosition", value)
                    }
                  >
                    <SelectTrigger id="display-position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inline">Inline with Response</SelectItem>
                      <SelectItem value="end">End of Response</SelectItem>
                      <SelectItem value="floating">Floating Buttons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-questions">
                    Max Questions Per Response
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="max-questions"
                      value={[settings.maxQuestionsPerResponse]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={(value) =>
                        handleChange("maxQuestionsPerResponse", value[0])
                      }
                      className="flex-1"
                    />
                    <span className="w-8 text-center font-medium">
                      {settings.maxQuestionsPerResponse}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-suggest-threshold">
                    Auto-Suggest Threshold
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {settings.autoSuggestThreshold}%
                  </span>
                </div>
                <Slider
                  id="auto-suggest-threshold"
                  value={[settings.autoSuggestThreshold]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) =>
                    handleChange("autoSuggestThreshold", value[0])
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Minimum confidence level required to auto-suggest follow-up questions
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="allow-dismiss"
                  checked={settings.allowUserDismiss}
                  onCheckedChange={(checked) =>
                    handleChange("allowUserDismiss", checked)
                  }
                  className="data-[state=checked]:bg-[#D8A23B]"
                />
                <Label htmlFor="allow-dismiss">
                  Allow users to dismiss follow-up questions
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="analytics-settings">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Workflow className="h-4 w-4" />
                <span>Analytics & Defaults</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="default-category">Default Category</Label>
                <Select
                  value={settings.defaultCategory}
                  onValueChange={(value) =>
                    handleChange("defaultCategory", value)
                  }
                >
                  <SelectTrigger id="default-category">
                    <SelectValue placeholder="Select default category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Pricing">Pricing</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Default category for new follow-up questions
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="track-interactions"
                  checked={settings.trackInteractions}
                  onCheckedChange={(checked) =>
                    handleChange("trackInteractions", checked)
                  }
                  className="data-[state=checked]:bg-[#D8A23B]"
                />
                <Label htmlFor="track-interactions">
                  Track follow-up question interactions
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Collect analytics on which follow-up questions users interact with
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800 flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-300">About Follow-Up Questions</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Follow-up questions help guide users through conversations with your AI assistant.
              They can increase engagement and help users discover features they might not know about.
              Use the settings above to customize how follow-up questions appear in your chat interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpSettings;
