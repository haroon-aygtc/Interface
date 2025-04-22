import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Palette, Accessibility, Type } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => {
  const id = label.toLowerCase().replace(/\s/g, '-');
  const textId = `${id}-text`;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full border"
          style={{ backgroundColor: value }}
          aria-hidden="true"
        />
        <Label htmlFor={id}>{label}</Label>
      </div>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded-md cursor-pointer"
          aria-label={`Choose ${label}`}
          title={`Choose ${label}`}
        />
        <input
          id={textId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 px-2 py-1 text-xs rounded-md border"
          aria-label={`${label} hex value`}
          title={`${label} hex value`}
        />
      </div>
    </div>
  );
};

export function ThemeCustomizer() {
  const {
    theme,
    preset,
    colors,
    highContrast,
    reducedMotion,
    fontSize,
    setTheme,
    setPreset,
    setColors,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize,
  } = useTheme();

  const presets = [
    { id: 'default', name: 'Default' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'business', name: 'Business' },
    { id: 'creative', name: 'Creative' },
    { id: 'technical', name: 'Technical' },
    { id: 'accessibility', name: 'Accessibility' },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Open theme customizer</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Customize Theme</h4>

          <Tabs defaultValue="theme">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="theme">
                <Palette className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:inline-block">Theme</span>
              </TabsTrigger>
              <TabsTrigger value="colors">
                <Palette className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:inline-block">Colors</span>
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:inline-block">Text</span>
              </TabsTrigger>
              <TabsTrigger value="accessibility">
                <Accessibility className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:inline-block">A11y</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="space-y-4">
              <div className="mb-4">
                <Label className="mb-2 block">Base Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                  >
                    Dark
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('system')}
                  >
                    System
                  </Button>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Theme Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map((p) => (
                    <Button
                      key={p.id}
                      variant={preset === p.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreset(p.id as any)}
                      className={cn(
                        p.id === 'luxury' && 'bg-[#c6a869] text-[#0f172a] hover:bg-[#a88a48] hover:text-[#0f172a]',
                        preset === p.id && p.id === 'luxury' && 'bg-[#a88a48] text-[#0f172a]'
                      )}
                    >
                      {p.name}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              {/* Color preview */}
              <div className="p-4 rounded-md border mb-4">
                <h4 className="text-sm font-medium mb-2">Preview</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div className="h-8 flex-1 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs">Primary</div>
                    <div className="h-8 flex-1 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center text-xs">Secondary</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 flex-1 rounded-md bg-accent text-accent-foreground flex items-center justify-center text-xs">Accent</div>
                    <div className="h-8 flex-1 rounded-md border bg-background text-foreground flex items-center justify-center text-xs">Background</div>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <Button size="sm" className="flex-1 h-8">Primary Button</Button>
                    <Button size="sm" variant="secondary" className="flex-1 h-8">Secondary</Button>
                  </div>
                </div>
              </div>

              <ColorPicker
                label="Primary Color"
                value={colors.primary}
                onChange={(value) => setColors({ primary: value })}
              />
              <ColorPicker
                label="Secondary Color"
                value={colors.secondary}
                onChange={(value) => setColors({ secondary: value })}
              />
              <ColorPicker
                label="Accent Color"
                value={colors.accent}
                onChange={(value) => setColors({ accent: value })}
              />
              <ColorPicker
                label="Background Color"
                value={colors.background}
                onChange={(value) => setColors({ background: value })}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreset(preset)}
                className="w-full"
              >
                Reset to Preset Defaults
              </Button>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <Label className="mb-2 block">Font Size</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={fontSize === 'normal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize('normal')}
                >
                  Normal
                </Button>
                <Button
                  variant={fontSize === 'large' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize('large')}
                >
                  Large
                </Button>
                <Button
                  variant={fontSize === 'x-large' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize('x-large')}
                >
                  X-Large
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast</Label>
                  <div className="text-xs text-muted-foreground">
                    Increase contrast for better readability
                  </div>
                </div>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={toggleHighContrast}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Reduced Motion</Label>
                  <div className="text-xs text-muted-foreground">
                    Minimize animations and transitions
                  </div>
                </div>
                <Switch
                  id="reduced-motion"
                  checked={reducedMotion}
                  onCheckedChange={toggleReducedMotion}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  );
}
