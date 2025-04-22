import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Home, Car, Users, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

export interface LuxuryDivision {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const divisions: LuxuryDivision[] = [
  {
    id: "government",
    title: "Al Yalayis Government Transaction Center",
    description: "A to Z UAE government services under one roof.",
    icon: <Building2 className="h-8 w-8" />,
    href: "/government-services"
  },
  {
    id: "property",
    title: "Al Yalayis Property",
    description: "Expert real estate & land transaction services across the UAE.",
    icon: <Home className="h-8 w-8" />,
    href: "/property-services"
  },
  {
    id: "transport",
    title: "Super Wheel",
    description: "VIP luxury transport for elite individuals and businesses.",
    icon: <Car className="h-8 w-8" />,
    href: "/transport-services"
  },
  {
    id: "labor",
    title: "Al Yalayis Labor Supplier",
    description: "Scalable, trusted workforce solutions for all sectors.",
    icon: <Users className="h-8 w-8" />,
    href: "/labor-services"
  }
];

export function LuxuryDivisions() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(divisions[0].id);

  // Get active division data
  const activeDivision = divisions.find(d => d.id === activeTab) || divisions[0];

  return (
    <section id="divisions" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'dark' ? 'from-[#09090B] via-[#020817] to-[#09090B]' : 'from-white via-[#f8f8f8] to-white'} z-0`}></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8A23B]/50 to-transparent"></div>
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#D8A23B]/5 blur-[100px] z-0"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-[#D8A23B]/3 blur-[120px] z-0"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D8A23B]/10 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#D8A23B] flex items-center justify-center text-[#09090B] font-bold text-xl">4</div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-[#D8A23B]">Al Yalayis</span> Divisions
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'} max-w-2xl mx-auto`}>
              Four specialized divisions, each dedicated to excellence in their respective fields,
              working together to provide comprehensive solutions.
            </p>
          </motion.div>
        </div>

        {/* Modern Tabs Layout */}
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {divisions.map((division, index) => (
              <motion.button
                key={division.id}
                onClick={() => setActiveTab(division.id)}
                className={`
                  relative px-6 py-3 rounded-full
                  transition-all duration-300 overflow-hidden
                  ${activeTab === division.id
                    ? 'bg-[#D8A23B] text-[#09090B]'
                    : `${theme === 'dark' ? 'bg-[#0A0A0F]/70' : 'bg-white/70'} text-[#D8A23B]`}
                  ${activeTab === division.id ? 'shadow-lg' : ''}
                  border border-[#D8A23B]/30
                  backdrop-blur-sm
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
              >
                {/* Animated background */}
                {activeTab === division.id && (
                  <motion.div
                    className="absolute inset-0 bg-[#D8A23B]/20"
                    layoutId="tabBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}

                {/* Tab content */}
                <div className="flex items-center gap-3 relative z-10">
                  <div className={`
                    ${activeTab === division.id ? 'text-[#09090B]' : 'text-[#D8A23B]'}
                  `}>
                    {division.icon}
                  </div>
                  <span className="font-medium">{division.title.split(' ').pop()}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <div className="relative min-h-[300px] md:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`
                  rounded-2xl overflow-hidden
                  ${theme === 'dark' ? 'bg-[#0A0A0F]/50' : 'bg-white/50'}
                  backdrop-blur-sm border border-[#D8A23B]/10
                  p-6 md:p-10
                `}
              >
                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left side - Content */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="
                        w-16 h-16 rounded-full
                        bg-gradient-to-br from-[#D8A23B] to-[#9F7425]
                        flex items-center justify-center
                        text-[#09090B]
                      ">
                        {activeDivision.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold">{activeDivision.title}</h3>
                    </div>

                    <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'}`}>
                      {activeDivision.description}
                      {/* Extended description based on division */}
                      {activeDivision.id === 'government' && " Our government transaction center streamlines all your paperwork needs with expert guidance and support."}
                      {activeDivision.id === 'property' && " We handle all aspects of real estate transactions, from property search to legal documentation and handover."}
                      {activeDivision.id === 'transport' && " Our luxury fleet and professional chauffeurs ensure premium transportation experiences for discerning clients."}
                      {activeDivision.id === 'labor' && " We provide comprehensive workforce solutions tailored to your business needs with reliability and excellence."}
                    </p>

                    <motion.button
                      onClick={() => navigate(activeDivision.href)}
                      className="
                        flex items-center gap-2 px-6 py-3
                        bg-[#D8A23B] text-[#09090B] rounded-full
                        font-medium
                      "
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* Right side - Visual */}
                  <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-64 h-64 rounded-full bg-[#D8A23B]/5"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />
                    </div>

                    {/* Division-specific illustration or image placeholder */}
                    <div className="
                      relative z-10 h-64 md:h-80
                      rounded-xl overflow-hidden
                      border border-[#D8A23B]/20
                    ">
                      <div className="
                        absolute inset-0
                        bg-gradient-to-br from-[#D8A23B]/10 to-transparent
                      "></div>
                      <div className={`
                        h-full w-full
                        flex items-center justify-center
                        ${theme === 'dark' ? 'bg-[#0A0A0F]/80' : 'bg-white/80'}
                      `}>
                        <div className="
                          w-24 h-24
                          flex items-center justify-center
                          text-[#D8A23B] opacity-70
                        ">
                          {activeDivision.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* View All Link */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/about')}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-[#D8A23B] font-medium">View All Divisions</span>
              <ChevronRight className="h-5 w-5 text-[#D8A23B]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
