import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LuxuryThemeToggle } from "./LuxuryThemeToggle";
import { LuxuryLogo } from "./LuxuryLogo";
import { ROUTES } from "@/routes";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface NavigationItem {
  title: string;
  href: string;
  children?: {
    title: string;
    href: string;
    description?: string;
  }[];
}

export function LuxuryNavBar() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navigationItems: NavigationItem[] = [
    {
      title: "Home",
      href: ROUTES.HOME,
    },
    {
      title: "Services",
      href: "#services",
      children: [
        {
          title: "Government Services",
          href: "/government-services",
          description: "A to Z UAE government services under one roof",
        },
        {
          title: "Property Services",
          href: "/property-services",
          description: "Expert real estate & land transaction services",
        },
        {
          title: "Transport Services",
          href: "/transport-services",
          description: "VIP luxury transport for elite individuals and businesses",
        },
        {
          title: "Labor Solutions",
          href: "/labor-services",
          description: "Scalable, trusted workforce solutions for all sectors",
        },
      ],
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? "bg-[#09090B]/80 backdrop-blur-md py-3 shadow-md"
            : "bg-white/80 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <LuxuryLogo className="h-10 w-auto" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={`${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'} hover:text-[#D8A23B] transition-colors text-sm uppercase tracking-wider font-medium`}
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Right side - buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <LuxuryThemeToggle />
          <Button
            variant="outline"
            onClick={() => navigate(ROUTES.LOGIN)}
            className="border-[#D8A23B] text-[#D8A23B] hover:bg-[#D8A23B] hover:text-[#09090B]"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate(ROUTES.REGISTER)}
            className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
          >
            Register
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-4">
          <LuxuryThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className={`${theme === 'dark' ? 'text-white' : 'text-[#09090B]'} hover:text-[#D8A23B]`}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden backdrop-blur-md border-t border-[#D8A23B]/20 ${theme === 'dark' ? 'bg-[#09090B]/95' : 'bg-white/95'}`}
          >
            <div className="container mx-auto px-6 py-4">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className={`${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'} hover:text-[#D8A23B] py-2 transition-colors text-sm uppercase tracking-wider font-medium`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </a>
                ))}
                <div className="pt-4 flex flex-col space-y-3 border-t border-[#D8A23B]/20">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(ROUTES.LOGIN);
                      setMobileMenuOpen(false);
                    }}
                    className="border-[#D8A23B] text-[#D8A23B] hover:bg-[#D8A23B] hover:text-[#09090B] w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(ROUTES.REGISTER);
                      setMobileMenuOpen(false);
                    }}
                    className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 w-full"
                  >
                    Register
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
