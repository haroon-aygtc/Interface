import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LuxuryThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full bg-background hover:bg-[#D8A23B]/10 text-[#D8A23B] border border-[#D8A23B]/30 shadow-sm transition-all duration-300"
            aria-label={
              theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
            }
          >
            <Sun
              className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 ${theme === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"}`}
            />
            <Moon
              className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 ${theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"}`}
            />
            <span className="sr-only">
              {theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-card border border-[#D8A23B]/20 text-foreground"
        >
          <p>
            {theme === "light"
              ? "Switch to dark theme"
              : "Switch to light theme"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
