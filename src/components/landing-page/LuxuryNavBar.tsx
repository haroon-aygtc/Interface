import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LuxuryThemeToggle } from "./LuxuryThemeToggle";
import { LuxuryLogo } from "./LuxuryLogo";
import { ROUTES } from "@/routes";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationItem {
  title: string;
  href: string;
  children?: {
    title: string;
    href: string;
    description?: string;
  }[];
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#D8A23B]/10 hover:text-[#D8A23B] focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

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
          description:
            "VIP luxury transport for elite individuals and businesses",
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
          ? theme === "dark"
            ? "bg-background/90 backdrop-blur-md py-3 border-b border-border/40 shadow-sm"
            : "bg-background/90 backdrop-blur-md py-3 border-b border-border/40 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <LuxuryLogo className="h-10 w-auto" />

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => {
                if (!item.children) {
                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <RouterLink
                          to={item.href}
                          className="text-sm uppercase tracking-wider font-medium hover:text-[#D8A23B]"
                        >
                          {item.title}
                        </RouterLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="text-sm uppercase tracking-wider font-medium hover:text-[#D8A23B]">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.children.map((child) => (
                          <ListItem
                            key={child.title}
                            title={child.title}
                            href={child.href}
                          >
                            {child.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

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
            className={`${theme === "dark" ? "text-foreground" : "text-foreground"} hover:text-[#D8A23B]`}
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
            className={`md:hidden backdrop-blur-md border-t border-[#D8A23B]/20 ${theme === "dark" ? "bg-background/95" : "bg-background/95"}`}
          >
            <div className="container mx-auto px-6 py-4">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => {
                  if (!item.children) {
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        className="text-foreground/80 hover:text-[#D8A23B] py-2 transition-colors text-sm uppercase tracking-wider font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </a>
                    );
                  }

                  return (
                    <DropdownMenu key={item.title}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start p-2 text-sm uppercase tracking-wider font-medium hover:text-[#D8A23B] hover:bg-[#D8A23B]/5"
                        >
                          {item.title}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {item.children.map((child) => (
                          <DropdownMenuItem
                            key={child.title}
                            className="cursor-pointer hover:text-[#D8A23B] hover:bg-[#D8A23B]/5"
                            onClick={() => {
                              navigate(child.href);
                              setMobileMenuOpen(false);
                            }}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{child.title}</span>
                              {child.description && (
                                <span className="text-xs text-muted-foreground">
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                })}
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
