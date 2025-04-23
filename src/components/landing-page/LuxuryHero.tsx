import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function LuxuryHero() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("divisions");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-gradient-to-b ${theme === "dark" ? "from-background via-transparent to-background" : "from-background via-transparent to-background"} z-10`}
        ></div>
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2000&auto=format&fit=crop')",
            opacity: theme === "dark" ? 0.5 : 0.3,
          }}
        ></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8A23B] to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8A23B] to-transparent opacity-70"></div>

      {/* Animated background shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#D8A23B]/5 blur-[100px] z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#D8A23B]/5 blur-[120px] z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Badge
              variant="outline"
              className="px-6 py-2 rounded-full border border-[#D8A23B] bg-background/50 backdrop-blur-sm text-[#D8A23B] text-sm uppercase tracking-widest font-medium"
            >
              UAE's Premier Service Hub
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
          >
            <span className="block">The UAE's Most</span>
            <span className="text-[#D8A23B] inline-block relative">
              Trusted Name
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-[#D8A23B]/30"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              />
            </span>
            <span className="block">in Premium Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          >
            Government services, real estate, workforce, and transport solutions
            — all under one prestigious roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 px-8 py-6 text-lg rounded-md group shadow-lg shadow-[#D8A23B]/20"
              onClick={() => navigate("/contact")}
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#D8A23B] text-[#D8A23B] hover:bg-[#D8A23B]/10 px-8 py-6 text-lg rounded-md"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20"
        >
          {[
            {
              title: "Government Services",
              description:
                "Streamlined processing of all government transactions",
            },
            {
              title: "Premium Transport",
              description: "Luxury transportation for executives and VIPs",
            },
            {
              title: "Property Solutions",
              description: "Expert real estate services across the UAE",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border border-[#D8A23B]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#D8A23B]/40">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#D8A23B]/10 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 text-[#D8A23B]">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToNextSection}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-[#D8A23B]/10 p-3 rounded-full backdrop-blur-sm border border-[#D8A23B]/20 hover:bg-[#D8A23B]/20 transition-colors"
        >
          <ChevronDown className="h-6 w-6 text-[#D8A23B]" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
