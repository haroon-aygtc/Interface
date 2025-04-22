import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onChange: (language: string) => void;
  label?: string;
  showDescription?: boolean;
}

export const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic" },
];

// Named export for the full featured component with props
export const LanguageSelectorWithProps: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onChange,
  label = "Language",
  showDescription = true,
}) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-3 gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={selectedLanguage === lang.code ? "default" : "outline"}
            onClick={() => onChange(lang.code)}
            className="justify-center"
            type="button"
          >
            {lang.name}
          </Button>
        ))}
      </div>
      {showDescription && (
        <p className="text-sm text-muted-foreground">
          Set the default language for the chat widget interface
        </p>
      )}
    </div>
  );
};

// Simple version with no props, to be used in the header
export const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useState("en");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="cursor-pointer"
            onClick={() => setLanguage(lang.code)}
          >
            <span className={language === lang.code ? "font-medium" : ""}>
              {lang.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Default export for backward compatibility
export default LanguageSelectorWithProps;
