import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Zap, FileText, BarChart2, ChevronDown, ChevronUp } from "lucide-react";

interface AIInsightsPanelProps {
  messageId?: string;
  compact?: boolean;
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ 
  messageId, 
  compact = false 
}) => {
  const [expanded, setExpanded] = useState(!compact);
  
  // Sample data - in a real implementation, this would come from the AI system
  const insightData = {
    confidence: 92,
    sources: [
      { name: "Product Documentation", relevance: 0.95 },
      { name: "Technical Guides", relevance: 0.76 }
    ],
    processingTime: 0.8,
    tokens: { input: 124, output: 356 }
  };

  return (
    <Card className="overflow-hidden border-t-4" style={{ borderTopColor: "#7c3aed" }}>
      <CardContent className="p-0">
        <div 
          className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center">
            <Brain className="h-4 w-4 text-primary mr-2" />
            <span className="font-medium text-sm">AI Insights</span>
            <Badge variant="outline" className="ml-2 text-xs">
              {insightData.confidence}% Confidence
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        
        {expanded && (
          <div className="p-3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center">
                  <Zap className="h-3 w-3 text-amber-500 mr-1" />
                  <span className="text-xs font-medium">Response Quality</span>
                </div>
                <Progress value={insightData.confidence} className="h-1.5" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center">
                  <BarChart2 className="h-3 w-3 text-blue-500 mr-1" />
                  <span className="text-xs font-medium">Processing Stats</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {insightData.processingTime}s · {insightData.tokens.input + insightData.tokens.output} tokens
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <FileText className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs font-medium">Knowledge Sources</span>
              </div>
              <div className="space-y-1.5">
                {insightData.sources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs">{source.name}</span>
                    <Badge variant="outline" className="text-xs h-5">
                      {Math.round(source.relevance * 100)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-muted-foreground">
                View Full Analysis
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
