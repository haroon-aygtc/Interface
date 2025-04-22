import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";

interface LogoProps {
  className?: string;
}

export function LuxuryLogo({ className }: LogoProps) {
  const { theme } = useTheme();

  return (
    <Link to={ROUTES.LUXURY_HOME} className="flex items-center gap-3">
      <div className="relative">
        <div className="h-12 w-auto overflow-hidden">
          <img
            src="/logo.png"
            alt="Al Yalayis Hub Logo"
            className={cn("h-full w-auto object-contain", className)}
          />
        </div>
        <div className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
      <div className="font-bold text-xl tracking-wide">
        <span className="text-[#D8A23B]">Al Yalayis</span>
        <span className={`ml-1 ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Hub</span>
      </div>
    </Link>
  );
}
