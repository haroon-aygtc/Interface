import React, { useEffect, useRef } from "react";
import { LuxuryNavBar } from "./LuxuryNavBar";
import { LuxuryHero } from "./LuxuryHero";
import { LuxuryServices } from "./LuxuryServices";
import { LuxuryTestimonials } from "./LuxuryTestimonials";
import { LuxuryCTA } from "./LuxuryCTA";
import { LuxuryFooter } from "./LuxuryFooter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { LuxuryDivisions } from "./LuxuryDivisions";

export default function LuxuryHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Set luxury theme on mount while preserving light/dark mode
  useEffect(() => {
    // Add luxury class to body
    document.documentElement.classList.add("luxury");

    // Clean up on unmount
    return () => {
      document.documentElement.classList.remove("luxury");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'bg-[#020817] text-white' : 'bg-[#FFFFFF] text-[#09090B]'}`}
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-[#D8A23B]/10 blur-[100px]" />
        <div className="absolute top-[40%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#D8A23B]/5 blur-[120px]" />
        <div className="absolute bottom-[15%] right-[15%] w-[350px] h-[350px] rounded-full bg-[#D8A23B]/10 blur-[100px]" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(to right, #D8A23B 1px, transparent 1px), linear-gradient(to bottom, #D8A23B 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <LuxuryNavBar />
        <main>
          <LuxuryHero />
          <LuxuryDivisions />
          <LuxuryServices />
          <LuxuryTestimonials />
          <LuxuryCTA />
        </main>
        <LuxuryFooter />
      </div>
    </div>
  );
}
