import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Palette, Type, Layout, Upload, Check, RefreshCw, EyeOff, Eye } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const BrandingManagerPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("visual");

  return (
    <div className="space-y-6">
      {/* Page Header - Matches Follow-Up Builder style */}
      <div className="bg-card border-b border-border w-full py-4 px-6">
        <h1 className="text-2xl font-semibold">Branding Manager</h1>
        <p className="text-sm text-muted-foreground">
          Customize the look and feel of your AI chat interface
        </p>
      </div>

      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Visual Identity
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Typography & Tone
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Layout & Positioning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-6">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 p-4 border-b">
                <h2 className="text-xl font-semibold">Visual Identity</h2>
                <p className="text-sm text-muted-foreground">
                  Customize colors, logos, and other visual elements
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Logo Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Logo</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="logo-upload">Upload Logo</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:border-muted-foreground/50 transition-colors">
                          <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Recommended size: 200x200px, PNG or SVG
                          </p>
                          <Button size="sm" variant="outline" className="mt-2">
                            Select File
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="show-logo" defaultChecked />
                        <Label htmlFor="show-logo">Display logo in chat interface</Label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label>Logo Preview</Label>
                        <div className="border rounded-lg p-4 bg-muted/10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center text-primary font-semibold">
                              AI
                            </div>
                            <div className="font-medium">Your AI Assistant</div>
                          </div>

                          <div className="bg-muted/20 p-3 rounded-lg text-sm">
                            This is how your logo will appear in the chat interface.
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reset to Default
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Check className="h-4 w-4 mr-2" />
                          Apply Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Scheme Section */}
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium">Color Scheme</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-md bg-[#D8A23B] border"></div>
                          <Input id="primary-color" defaultValue="#D8A23B" className="font-mono" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="secondary-color">Secondary Color</Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-md bg-[#2563EB] border"></div>
                          <Input id="secondary-color" defaultValue="#2563EB" className="font-mono" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="accent-color">Accent Color</Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-md bg-[#10B981] border"></div>
                          <Input id="accent-color" defaultValue="#10B981" className="font-mono" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label>Color Scheme Preview</Label>
                        <div className="border rounded-lg p-4 bg-muted/10 space-y-3">
                          <div className="flex gap-2">
                            <div className="h-8 flex-1 rounded-md bg-[#D8A23B] flex items-center justify-center text-white text-sm">
                              Primary
                            </div>
                            <div className="h-8 flex-1 rounded-md bg-[#2563EB] flex items-center justify-center text-white text-sm">
                              Secondary
                            </div>
                            <div className="h-8 flex-1 rounded-md bg-[#10B981] flex items-center justify-center text-white text-sm">
                              Accent
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1 bg-[#D8A23B] text-white hover:bg-[#D8A23B]/90">
                              Primary Button
                            </Button>
                            <Button variant="outline" className="flex-1 border-[#D8A23B] text-[#D8A23B] hover:bg-[#D8A23B]/10">
                              Outline Button
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="color-scheme">Predefined Color Schemes</Label>
                        <Select defaultValue="custom">
                          <SelectTrigger id="color-scheme">
                            <SelectValue placeholder="Select color scheme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">Custom</SelectItem>
                            <SelectItem value="classic">Classic Blue</SelectItem>
                            <SelectItem value="modern">Modern Green</SelectItem>
                            <SelectItem value="elegant">Elegant Purple</SelectItem>
                            <SelectItem value="vibrant">Vibrant Orange</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Section */}
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium">Background</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="bg-type">Background Type</Label>
                        <Select defaultValue="color">
                          <SelectTrigger id="bg-type">
                            <SelectValue placeholder="Select background type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="color">Solid Color</SelectItem>
                            <SelectItem value="gradient">Gradient</SelectItem>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="pattern">Pattern</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="bg-color">Background Color</Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-md bg-[#F8F9FA] border"></div>
                          <Input id="bg-color" defaultValue="#F8F9FA" className="font-mono" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="bg-opacity">Background Opacity</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            defaultValue={[100]}
                            max={100}
                            step={1}
                            id="bg-opacity"
                          />
                          <span className="w-12 text-center">100%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label>Background Preview</Label>
                        <div className="border rounded-lg p-4 bg-[#F8F9FA] h-[150px] flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <p>Background Preview</p>
                            <p className="text-xs">This is how your chat background will appear</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="blur-bg" />
                        <Label htmlFor="blur-bg">Apply subtle blur effect</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="dark-mode" />
                        <Label htmlFor="dark-mode">Force dark mode</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 flex justify-end gap-2">
                  <Button variant="outline">
                    <EyeOff className="h-4 w-4 mr-2" />
                    Preview Changes
                  </Button>
                  <Button>
                    <Check className="h-4 w-4 mr-2" />
                    Save Branding
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 p-4 border-b">
                <h2 className="text-xl font-semibold">Typography & Tone</h2>
                <p className="text-sm text-muted-foreground">
                  Customize fonts, text styles, and tone of voice
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Font Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Font Settings</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="heading-font">Heading Font</Label>
                        <Select defaultValue="inter">
                          <SelectTrigger id="heading-font">
                            <SelectValue placeholder="Select heading font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inter">Inter</SelectItem>
                            <SelectItem value="roboto">Roboto</SelectItem>
                            <SelectItem value="poppins">Poppins</SelectItem>
                            <SelectItem value="montserrat">Montserrat</SelectItem>
                            <SelectItem value="opensans">Open Sans</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="body-font">Body Font</Label>
                        <Select defaultValue="inter">
                          <SelectTrigger id="body-font">
                            <SelectValue placeholder="Select body font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inter">Inter</SelectItem>
                            <SelectItem value="roboto">Roboto</SelectItem>
                            <SelectItem value="poppins">Poppins</SelectItem>
                            <SelectItem value="montserrat">Montserrat</SelectItem>
                            <SelectItem value="opensans">Open Sans</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="font-size">Base Font Size</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            defaultValue={[16]}
                            min={12}
                            max={20}
                            step={1}
                            id="font-size"
                          />
                          <span className="w-12 text-center">16px</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label>Typography Preview</Label>
                        <div className="border rounded-lg p-4 bg-muted/10 space-y-3">
                          <h3 className="text-xl font-semibold" style={{ fontFamily: 'Inter' }}>Heading Text</h3>
                          <p className="text-sm" style={{ fontFamily: 'Inter' }}>
                            This is how your body text will appear in the chat interface. The font selection affects readability and overall user experience.
                          </p>
                          <div className="flex gap-2 text-sm">
                            <div className="font-bold">Bold</div>
                            <div className="italic">Italic</div>
                            <div className="underline">Underlined</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="custom-font" />
                        <Label htmlFor="custom-font">Use custom font (upload)</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="font-smoothing" defaultChecked />
                        <Label htmlFor="font-smoothing">Enable font smoothing</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Styling */}
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium">Text Styling</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="heading-weight">Heading Weight</Label>
                        <Select defaultValue="600">
                          <SelectTrigger id="heading-weight">
                            <SelectValue placeholder="Select heading weight" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="400">Regular (400)</SelectItem>
                            <SelectItem value="500">Medium (500)</SelectItem>
                            <SelectItem value="600">Semi-Bold (600)</SelectItem>
                            <SelectItem value="700">Bold (700)</SelectItem>
                            <SelectItem value="800">Extra Bold (800)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="line-height">Line Height</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            defaultValue={[1.5]}
                            min={1}
                            max={2}
                            step={0.1}
                            id="line-height"
                          />
                          <span className="w-12 text-center">1.5</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="letter-spacing">Letter Spacing</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            defaultValue={[0]}
                            min={-1}
                            max={2}
                            step={0.1}
                            id="letter-spacing"
                          />
                          <span className="w-12 text-center">0px</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="text-align">Text Alignment</Label>
                        <Select defaultValue="left">
                          <SelectTrigger id="text-align">
                            <SelectValue placeholder="Select text alignment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                            <SelectItem value="justify">Justify</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="text-transform">Text Transform</Label>
                        <Select defaultValue="none">
                          <SelectTrigger id="text-transform">
                            <SelectValue placeholder="Select text transform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="uppercase">UPPERCASE</SelectItem>
                            <SelectItem value="lowercase">lowercase</SelectItem>
                            <SelectItem value="capitalize">Capitalize</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="enable-markdown" defaultChecked />
                        <Label htmlFor="enable-markdown">Enable Markdown formatting</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Tone of Voice */}
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium">AI Tone of Voice</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="tone-style">Tone Style</Label>
                        <Select defaultValue="friendly">
                          <SelectTrigger id="tone-style">
                            <SelectValue placeholder="Select tone style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="friendly">Friendly & Conversational</SelectItem>
                            <SelectItem value="professional">Professional & Formal</SelectItem>
                            <SelectItem value="technical">Technical & Precise</SelectItem>
                            <SelectItem value="casual">Casual & Relaxed</SelectItem>
                            <SelectItem value="enthusiastic">Enthusiastic & Energetic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="formality-level">Formality Level</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            defaultValue={[3]}
                            min={1}
                            max={5}
                            step={1}
                            id="formality-level"
                          />
                          <span className="w-12 text-center">3/5</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="response-length">Preferred Response Length</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="response-length">
                            <SelectValue placeholder="Select response length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="concise">Concise</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="detailed">Detailed</SelectItem>
                            <SelectItem value="comprehensive">Comprehensive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label>Tone Preview</Label>
                        <div className="border rounded-lg p-4 bg-muted/10 space-y-3">
                          <p className="text-sm">
                            <strong>Friendly & Conversational:</strong> Hi there! I'd be happy to help you with that. Let me know if you need anything else!
                          </p>
                          <p className="text-sm">
                            <strong>Professional & Formal:</strong> Thank you for your inquiry. I would be pleased to assist you with this matter. Please don't hesitate to request further assistance.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="custom-greeting">Custom Greeting</Label>
                        <Input
                          id="custom-greeting"
                          placeholder="Hello! How can I help you today?"
                          defaultValue="Hello! How can I help you today?"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="custom-signature">Custom Signature</Label>
                        <Input
                          id="custom-signature"
                          placeholder="Your AI Assistant"
                          defaultValue="Your AI Assistant"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 flex justify-end gap-2">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button>
                    <Check className="h-4 w-4 mr-2" />
                    Save Typography
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 p-4 border-b">
                <h2 className="text-xl font-semibold">Layout & Positioning</h2>
                <p className="text-sm text-muted-foreground">
                  Customize the layout and positioning of chat elements
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Chat Layout */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Chat Layout</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="chat-width">Chat Width</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="chat-width">
                            <SelectValue placeholder="Select chat width" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="narrow">Narrow</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="wide">Wide</SelectItem>
                            <SelectItem value="full">Full Width</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="chat-height">Chat Height</Label>
                        <Select defaultValue="adaptive">
                          <SelectTrigger id="chat-height">
                            <SelectValue placeholder="Select chat height" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed-small">Fixed - Small</SelectItem>
                            <SelectItem value="fixed-medium">Fixed - Medium</SelectItem>
                            <SelectItem value="fixed-large">Fixed - Large</SelectItem>
                            <SelectItem value="adaptive">Adaptive</SelectItem>
                            <SelectItem value="full">Full Height</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="message-spacing">Message Spacing</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            defaultValue={[16]}
                            min={8}
                            max={32}
                            step={2}
                            id="message-spacing"
                          />
                          <span className="w-12 text-center">16px</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label>Layout Preview</Label>
                        <div className="border rounded-lg p-4 bg-muted/10 h-[200px] relative">
                          <div className="absolute inset-0 flex flex-col">
                            <div className="flex-1 overflow-auto p-3">
                              <div className="flex flex-col gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg self-start max-w-[80%]">
                                  <p className="text-xs">Hello! How can I help you today?</p>
                                </div>
                                <div className="bg-secondary/10 p-2 rounded-lg self-end max-w-[80%]">
                                  <p className="text-xs">I have a question about your services.</p>
                                </div>
                                <div className="bg-primary/10 p-2 rounded-lg self-start max-w-[80%]">
                                  <p className="text-xs">I'd be happy to help! What would you like to know?</p>
                                </div>
                              </div>
                            </div>
                            <div className="border-t p-2 flex gap-2">
                              <div className="flex-1 bg-muted/30 h-8 rounded-md"></div>
                              <div className="w-8 h-8 bg-primary/20 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="rounded-corners" defaultChecked />
                        <Label htmlFor="rounded-corners">Use rounded corners</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="show-timestamps" defaultChecked />
                        <Label htmlFor="show-timestamps">Show message timestamps</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Bubbles */}
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium">Message Bubbles</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="user-bubble-style">User Message Style</Label>
                        <Select defaultValue="filled">
                          <SelectTrigger id="user-bubble-style">
                            <SelectValue placeholder="Select user bubble style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="filled">Filled</SelectItem>
                            <SelectItem value="outlined">Outlined</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="elevated">Elevated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="ai-bubble-style">AI Message Style</Label>
                        <Select defaultValue="filled">
                          <SelectTrigger id="ai-bubble-style">
                            <SelectValue placeholder="Select AI bubble style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="filled">Filled</SelectItem>
                            <SelectItem value="outlined">Outlined</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="elevated">Elevated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="bubble-radius">Bubble Corner Radius</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            defaultValue={[12]}
                            min={0}
                            max={24}
                            step={2}
                            id="bubble-radius"
                          />
                          <span className="w-12 text-center">12px</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label>Bubble Preview</Label>
                        <div className="border rounded-lg p-4 bg-muted/10 space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium">
                              AI
                            </div>
                            <div className="bg-primary/10 p-2 rounded-lg max-w-[80%]">
                              <p className="text-xs">This is how AI messages will appear.</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2">
                            <div className="bg-secondary/10 p-2 rounded-lg max-w-[80%]">
                              <p className="text-xs">This is how user messages will appear.</p>
                            </div>
                            <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-xs font-medium">
                              U
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="show-avatars" defaultChecked />
                        <Label htmlFor="show-avatars">Show user avatars</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="message-shadows" />
                        <Label htmlFor="message-shadows">Add subtle shadows to messages</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium">Input Area</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="input-style">Input Style</Label>
                        <Select defaultValue="rounded">
                          <SelectTrigger id="input-style">
                            <SelectValue placeholder="Select input style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rounded">Rounded</SelectItem>
                            <SelectItem value="pill">Pill</SelectItem>
                            <SelectItem value="square">Square</SelectItem>
                            <SelectItem value="underlined">Underlined</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="input-position">Input Position</Label>
                        <Select defaultValue="bottom">
                          <SelectTrigger id="input-position">
                            <SelectValue placeholder="Select input position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bottom">Bottom</SelectItem>
                            <SelectItem value="floating">Floating</SelectItem>
                            <SelectItem value="sticky">Sticky</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="placeholder-text">Placeholder Text</Label>
                        <Input
                          id="placeholder-text"
                          placeholder="Type your message..."
                          defaultValue="Type your message..."
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label>Input Preview</Label>
                        <div className="border rounded-lg p-4 bg-muted/10">
                          <div className="border rounded-lg flex items-center p-2 gap-2">
                            <div className="flex-1 text-xs text-muted-foreground">Type your message...</div>
                            <div className="w-6 h-6 bg-primary/20 rounded-md"></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="show-send-button" defaultChecked />
                        <Label htmlFor="show-send-button">Show send button</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="show-suggestions" defaultChecked />
                        <Label htmlFor="show-suggestions">Show suggested prompts</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="multiline-input" defaultChecked />
                        <Label htmlFor="multiline-input">Enable multiline input</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 flex justify-end gap-2">
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Layout
                  </Button>
                  <Button>
                    <Check className="h-4 w-4 mr-2" />
                    Save Layout
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BrandingManagerPanel;
