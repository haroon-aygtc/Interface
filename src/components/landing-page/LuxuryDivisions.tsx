import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Home,
  Car,
  Users,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface LuxuryDivision {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  features?: string[];
}

const divisions: LuxuryDivision[] = [
  {
    id: "government",
    title: "Al Yalayis Government Transaction Center",
    description: "A to Z UAE government services under one roof.",
    icon: <Building2 className="h-8 w-8" />,
    href: "/government-services",
    features: [
      "Visa processing and renewals",
      "Business licensing and permits",
      "Document attestation",
      "Emirates ID services",
    ],
  },
  {
    id: "property",
    title: "Al Yalayis Property",
    description:
      "Expert real estate & land transaction services across the UAE.",
    icon: <Home className="h-8 w-8" />,
    href: "/property-services",
    features: [
      "Property sales and purchases",
      "Land transactions",
      "Property registration",
      "Investment advisory",
    ],
  },
  {
    id: "transport",
    title: "Super Wheel",
    description: "VIP luxury transport for elite individuals and businesses.",
    icon: <Car className="h-8 w-8" />,
    href: "/transport-services",
    features: [
      "Executive chauffeur services",
      "Airport transfers",
      "Corporate transportation",
      "Luxury vehicle rentals",
    ],
  },
  {
    id: "labor",
    title: "Al Yalayis Labor Supplier",
    description: "Scalable, trusted workforce solutions for all sectors.",
    icon: <Users className="h-8 w-8" />,
    href: "/labor-services",
    features: [
      "Skilled labor recruitment",
      "Temporary staffing",
      "Permanent placement",
      "Workforce management",
    ],
  },
];

export function LuxuryDivisions() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(divisions[0].id);

  // Get active division data
  const activeDivision =
    divisions.find((d) => d.id === activeTab) || divisions[0];

  return (
    <section id="divisions" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8A23B]/50 to-transparent"></div>
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#D8A23B]/5 blur-[100px] z-0"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-[#D8A23B]/3 blur-[120px] z-0"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="px-4 py-1.5 mb-6 rounded-full border border-[#D8A23B]/50 bg-[#D8A23B]/5 text-[#D8A23B] text-sm font-medium"
            >
              Our Divisions
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-[#D8A23B]">Al Yalayis</span> Divisions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four specialized divisions, each dedicated to excellence in their
              respective fields, working together to provide comprehensive
              solutions.
            </p>
          </motion.div>
        </div>

        {/* Modern Tabs Layout */}
        <div className="max-w-6xl mx-auto">
          <Tabs
            defaultValue={divisions[0].id}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 p-1 bg-card/50 backdrop-blur-sm border border-[#D8A23B]/20 rounded-xl">
                {divisions.map((division) => (
                  <TabsTrigger
                    key={division.id}
                    value={division.id}
                    className="data-[state=active]:bg-[#D8A23B] data-[state=active]:text-[#09090B] data-[state=active]:shadow-md px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
                  >
                    <span className="hidden md:inline-flex">
                      {division.icon}
                    </span>
                    <span>{division.title.split(" ").pop()}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {divisions.map((division) => (
              <TabsContent
                key={division.id}
                value={division.id}
                className="mt-0"
              >
                <Card className="bg-card/50 backdrop-blur-sm border border-[#D8A23B]/20 shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D8A23B] to-[#9F7425] flex items-center justify-center text-[#09090B]">
                          {division.icon}
                        </div>
                        <div>
                          <Badge
                            variant="outline"
                            className="mb-2 bg-[#D8A23B]/10 text-[#D8A23B] border-[#D8A23B]/30"
                          >
                            Division
                          </Badge>
                          <h3 className="text-2xl md:text-3xl font-bold">
                            {division.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-lg mb-8 text-muted-foreground">
                        {division.description}
                        {/* Extended description based on division */}
                        {division.id === "government" &&
                          " Our government transaction center streamlines all your paperwork needs with expert guidance and support."}
                        {division.id === "property" &&
                          " We handle all aspects of real estate transactions, from property search to legal documentation and handover."}
                        {division.id === "transport" &&
                          " Our luxury fleet and professional chauffeurs ensure premium transportation experiences for discerning clients."}
                        {division.id === "labor" &&
                          " We provide comprehensive workforce solutions tailored to your business needs with reliability and excellence."}
                      </p>

                      {division.features && (
                        <div className="mb-8">
                          <h4 className="text-lg font-semibold mb-4">
                            Key Services
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {division.features.map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <div className="h-5 w-5 rounded-full bg-[#D8A23B]/20 flex items-center justify-center text-[#D8A23B]">
                                  <ChevronRight className="h-3 w-3" />
                                </div>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Button
                        onClick={() => navigate(division.href)}
                        className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 group"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>

                    <div className="relative hidden md:block">
                      {/* Decorative elements */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-64 h-64 rounded-full bg-[#D8A23B]/5"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.7, 0.5],
                          }}
                          transition={{ duration: 8, repeat: Infinity }}
                        />
                      </div>

                      {/* Division-specific illustration or image placeholder */}
                      <div className="h-full w-full bg-gradient-to-br from-[#D8A23B]/5 to-transparent flex items-center justify-center p-8">
                        <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#D8A23B]/20 bg-card/30 backdrop-blur-sm flex items-center justify-center">
                          <div className="w-32 h-32 flex items-center justify-center text-[#D8A23B] opacity-70">
                            {division.icon}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-4 text-center">
                            <p className="text-sm font-medium text-white/90">
                              {division.title.split(" ").pop()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}

            {/* View All Link */}
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                variant="link"
                className="text-[#D8A23B] font-medium hover:text-[#D8A23B]/80 group"
                onClick={() => navigate("/about")}
              >
                View All Divisions
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
