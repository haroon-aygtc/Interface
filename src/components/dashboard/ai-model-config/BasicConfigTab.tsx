import React from "react";
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
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { BasicConfigTabProps } from "./types";

const BasicConfigTab: React.FC<BasicConfigTabProps> = ({
  currentConfig,
  onConfigChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Model Selection - 8 cols */}
      <Card className="md:col-span-8 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <CardHeader className="bg-muted/30 pb-2">
          <CardTitle className="flex items-center text-lg">
            <span className="mr-2 h-5 w-5 text-[#D8A23B]">🤖</span>
            AI Model Selection
          </CardTitle>
          <CardDescription>
            Choose the AI model and set its basic parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="model" className="text-base font-medium">
                AI Model
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Different models have different capabilities and pricing.
                      GPT-4 is more capable but more expensive, while GPT-3.5 is
                      faster and more cost-effective.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={currentConfig.model}
              onValueChange={(value) => onConfigChange("model", value)}
            >
              <SelectTrigger id="model">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                <SelectItem value="claude-2">Claude 2</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                <SelectItem value="llama-3">Llama 3</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Select the AI model that best suits your needs
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature" className="text-base font-medium">
                Temperature: {currentConfig.temperature.toFixed(1)}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Controls randomness: Lower values (0.1-0.5) make responses
                      more focused and deterministic. Higher values (0.7-1.0)
                      make output more random and creative.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={[currentConfig.temperature]}
              onValueChange={(value) => onConfigChange("temperature", value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>More Focused (0.0)</span>
              <span>More Creative (1.0)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxTokens" className="text-base font-medium">
                Max Tokens: {currentConfig.maxTokens}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Maximum number of tokens (words/characters) in the
                      response. Higher values allow for longer responses but may
                      cost more.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              id="maxTokens"
              min={256}
              max={4096}
              step={256}
              value={[currentConfig.maxTokens]}
              onValueChange={(value) => onConfigChange("maxTokens", value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Shorter (256)</span>
              <span>Longer (4096)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Parameters - 4 cols */}
      <Card className="md:col-span-4 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <CardHeader className="bg-muted/30 pb-2">
          <CardTitle className="flex items-center text-lg">
            <span className="mr-2 h-5 w-5 text-[#D8A23B]">⚙️</span>
            Advanced Parameters
          </CardTitle>
          <CardDescription>
            Fine-tune the AI model's behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="topP" className="text-base font-medium">
                Top P: {currentConfig.topP.toFixed(1)}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Controls diversity via nucleus sampling: 0.5 means half of
                      all likelihood-weighted options are considered.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              id="topP"
              min={0.1}
              max={1}
              step={0.1}
              value={[currentConfig.topP]}
              onValueChange={(value) => onConfigChange("topP", value[0])}
              className="py-4"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="frequencyPenalty"
                className="text-base font-medium"
              >
                Frequency Penalty: {currentConfig.frequencyPenalty.toFixed(1)}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Reduces repetition by penalizing tokens that have already
                      appeared in the text. Higher values (0.5-1.0) reduce
                      repetition more.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              id="frequencyPenalty"
              min={0}
              max={2}
              step={0.1}
              value={[currentConfig.frequencyPenalty]}
              onValueChange={(value) =>
                onConfigChange("frequencyPenalty", value[0])
              }
              className="py-4"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="presencePenalty"
                className="text-base font-medium"
              >
                Presence Penalty: {currentConfig.presencePenalty.toFixed(1)}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Encourages the model to talk about new topics by penalizing
                      tokens that have appeared at all. Higher values encourage
                      more topic diversity.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              id="presencePenalty"
              min={0}
              max={2}
              step={0.1}
              value={[currentConfig.presencePenalty]}
              onValueChange={(value) =>
                onConfigChange("presencePenalty", value[0])
              }
              className="py-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* Custom Instructions - 12 cols */}
      <Card className="md:col-span-12 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <CardHeader className="bg-muted/30 pb-2">
          <CardTitle className="flex items-center text-lg">
            <span className="mr-2 h-5 w-5 text-[#D8A23B]">📝</span>
            Custom Instructions
          </CardTitle>
          <CardDescription>
            Add custom instructions that will be included with every prompt
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="customInstructions" className="text-base font-medium">
              Additional Instructions
            </Label>
            <Textarea
              id="customInstructions"
              placeholder="Enter any additional instructions for the AI model..."
              className="min-h-[120px] resize-y"
              value={currentConfig.customInstructions}
              onChange={(e) =>
                onConfigChange("customInstructions", e.target.value)
              }
            />
            <p className="text-sm text-muted-foreground">
              These instructions will be appended to every prompt sent to the AI
              model. Use this for consistent behavior instructions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicConfigTab;
