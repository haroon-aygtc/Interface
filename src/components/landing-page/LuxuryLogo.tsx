import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

export function LuxuryLogo({ className }: LogoProps) {
  const { theme } = useTheme();

  return (
    <Link to={ROUTES.LUXURY_HOME} className="flex items-center gap-3 group">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="h-12 w-auto overflow-hidden rounded-md">
          <img
            src="/logo.png"
            alt="Al Yalayis Hub Logo"
            className={cn("h-full w-auto object-contain", className)}
          />
        </div>
        <div className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <motion.div
          className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#D8A23B]/0 via-[#D8A23B]/30 to-[#D8A23B]/0 opacity-0 group-hover:opacity-100 z-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>
      <div className="font-bold text-xl tracking-wide">
        <motion.span
          className="text-[#D8A23B] inline-block"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Al Yalayis
        </motion.span>
        <motion.span
          className={`ml-1 text-foreground inline-block`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Hub
        </motion.span>
      </div>
    </Link>
  );
}
