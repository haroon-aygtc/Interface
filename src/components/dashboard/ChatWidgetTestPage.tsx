import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LanguageSelectorWithProps } from "./LanguageSelector";
import { EmbeddedWidgetPreview } from "./EmbeddedWidgetPreview";

const ChatWidgetTestPage: React.FC = () => {
  const { theme } = useTheme();
  const [widgetColor, setWidgetColor] = useState("#7c3aed");
  const [widgetSize, setWidgetSize] = useState(60);
  const [widgetPosition, setWidgetPosition] = useState("bottom-right");
  const [autoOpen, setAutoOpen] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! How can I help you today?");
  const [darkMode, setDarkMode] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [quickResponses, setQuickResponses] = useState<string[]>([
    "How does this work?",
    "What can you help with?",
    "Can I speak to a human?"
  ]);
  const [newQuickResponse, setNewQuickResponse] = useState("");
  const [activeTab, setActiveTab] = useState("preview");
  const [language, setLanguage] = useState("en");

  const handleAddQuickResponse = () => {
    if (newQuickResponse.trim() !== "") {
      setQuickResponses([...quickResponses, newQuickResponse.trim()]);
      setNewQuickResponse("");
    }
  };

  const handleRemoveQuickResponse = (index: number) => {
    const updatedResponses = [...quickResponses];
    updatedResponses.splice(index, 1);
    setQuickResponses(updatedResponses);
  };

  return (
    <div className="w-full h-full bg-background">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setActiveTab("preview")}>
            Preview
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("settings")}>
            Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeTab === "preview" ? (
            <>
              <Card className="col-span-1 lg:col-span-2 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="pb-3 border-b">
                  <CardTitle>Widget Preview</CardTitle>
                  <CardDescription>
                    Test the chat widget with all the new features
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 h-[600px] overflow-hidden bg-background">
                  <EmbeddedWidgetPreview
                    widgetColor={widgetColor}
                    widgetSize={widgetSize}
                    widgetPosition={widgetPosition}
                    autoOpen={autoOpen}
                    welcomeMessage={welcomeMessage}
                    darkMode={darkMode}
                    quickResponses={quickResponses}
                    language={language}
                    showAIInsights={showAIInsights}
                  />
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="pb-3 border-b">
                  <CardTitle>Widget Appearance</CardTitle>
                  <CardDescription>
                    Customize how your chat widget looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="widget-color">Widget Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="widget-color"
                        type="color"
                        value={widgetColor}
                        onChange={(e) => setWidgetColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={widgetColor}
                        onChange={(e) => setWidgetColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Widget Size: {widgetSize}px</Label>
                    <Input
                      type="range"
                      min="40"
                      max="80"
                      value={widgetSize}
                      onChange={(e) => setWidgetSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Widget Position</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={widgetPosition === "top-left" ? "default" : "outline"}
                        onClick={() => setWidgetPosition("top-left")}
                        className="justify-start"
                        type="button"
                      >
                        Top Left
                      </Button>
                      <Button
                        variant={widgetPosition === "top-right" ? "default" : "outline"}
                        onClick={() => setWidgetPosition("top-right")}
                        className="justify-end"
                        type="button"
                      >
                        Top Right
                      </Button>
                      <Button
                        variant={widgetPosition === "bottom-left" ? "default" : "outline"}
                        onClick={() => setWidgetPosition("bottom-left")}
                        className="justify-start"
                        type="button"
                      >
                        Bottom Left
                      </Button>
                      <Button
                        variant={widgetPosition === "bottom-right" ? "default" : "outline"}
                        onClick={() => setWidgetPosition("bottom-right")}
                        className="justify-end"
                        type="button"
                      >
                        Bottom Right
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-open">Auto-open on page load</Label>
                    <Switch
                      id="auto-open"
                      checked={autoOpen}
                      onCheckedChange={setAutoOpen}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-ai-insights">Show AI Insights</Label>
                    <Switch
                      id="show-ai-insights"
                      checked={showAIInsights}
                      onCheckedChange={setShowAIInsights}
                    />
                  </div>

                  <LanguageSelectorWithProps
                    selectedLanguage={language}
                    onChange={setLanguage}
                    showDescription={false}
                  />
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardHeader className="pb-3 border-b">
                  <CardTitle>Widget Content</CardTitle>
                  <CardDescription>
                    Configure messages and quick responses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="welcome-message">Welcome Message</Label>
                    <Input
                      id="welcome-message"
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      placeholder="Enter a welcome message for your visitors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Quick Response Options</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Add suggested responses that users can click instead of typing
                    </p>

                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newQuickResponse}
                        onChange={(e) => setNewQuickResponse(e.target.value)}
                        placeholder="Add a quick response option"
                        className="flex-1"
                      />
                      <Button onClick={handleAddQuickResponse} type="button">
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-md bg-background">
                      {quickResponses.map((response, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded border border-border">
                          <span className="text-sm truncate">{response}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveQuickResponse(index)}
                            className="h-6 w-6 p-0"
                            type="button"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </Button>
                        </div>
                      ))}
                      {quickResponses.length === 0 && (
                        <div className="text-sm text-muted-foreground text-center py-2">
                          No quick responses added
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWidgetTestPage;
