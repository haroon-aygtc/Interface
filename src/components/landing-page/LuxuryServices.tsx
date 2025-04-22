import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, FileText, Shield, Clock, Globe, Award, Headphones } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const services: Service[] = [
  {
    id: "government",
    title: "Government Services",
    description: "Streamlined processing of all government-related transactions with expert guidance and support.",
    icon: <FileText className="h-6 w-6" />,
    features: [
      "Visa processing and renewals",
      "Business licensing and permits",
      "Document attestation",
      "Emirates ID and PRO services",
      "Legal documentation assistance",
      "Government fee payments"
    ]
  },
  {
    id: "property",
    title: "Property Services",
    description: "Comprehensive real estate solutions for buyers, sellers, and investors across the UAE.",
    icon: <Shield className="h-6 w-6" />,
    features: [
      "Property sales and purchases",
      "Land transactions",
      "Property registration",
      "Title deed processing",
      "Real estate consultation",
      "Investment advisory"
    ]
  },
  {
    id: "transport",
    title: "Transport Services",
    description: "Premium transportation solutions for executives, VIPs, and businesses with unmatched comfort.",
    icon: <Clock className="h-6 w-6" />,
    features: [
      "Executive chauffeur services",
      "Airport transfers",
      "Corporate transportation",
      "Event transportation",
      "Luxury vehicle rentals",
      "24/7 availability"
    ]
  },
  {
    id: "workforce",
    title: "Workforce Solutions",
    description: "Tailored staffing solutions to meet the diverse needs of businesses across all sectors.",
    icon: <Globe className="h-6 w-6" />,
    features: [
      "Skilled labor recruitment",
      "Temporary staffing",
      "Permanent placement",
      "Workforce management",
      "HR consultation",
      "Training and development"
    ]
  }
];

export function LuxuryServices() {
  const [activeService, setActiveService] = useState(services[0].id);
  const { theme } = useTheme();

  const activeServiceData = services.find(service => service.id === activeService) || services[0];

  return (
    <section id="services" className="py-24 relative">
      {/* Background accent */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#020817]' : 'bg-[#f8f8f8]'} z-0`}></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Award className="text-[#D8A23B] h-8 w-8 mr-3" />
            <h2 className="text-3xl md:text-5xl font-bold">
              Premium <span className="text-[#D8A23B]">Services</span>
            </h2>
          </div>
          <p className={`text-xl ${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'} max-w-3xl mx-auto`}>
            Discover our comprehensive range of premium services designed to meet your needs with excellence and precision.
          </p>
        </motion.div>

        {/* Service tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          <div className="lg:col-span-1">
            <div className={`${theme === 'dark' ? 'bg-[#09090B]/50' : 'bg-white/50'} backdrop-blur-sm rounded-xl p-1`}>
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setActiveService(service.id)}
                    className={`w-full text-left p-4 rounded-lg mb-2 transition-all duration-300 flex items-center ${
                      activeService === service.id
                        ? "bg-[#D8A23B] text-[#09090B]"
                        : `bg-transparent ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'} hover:bg-[#D8A23B]/10`
                    }`}
                  >
                    <div className={`mr-4 p-2 rounded-full ${
                      activeService === service.id
                        ? "bg-[#09090B]"
                        : "bg-[#D8A23B]/20"
                    }`}>
                      {service.icon}
                    </div>
                    <span className="font-medium">{service.title}</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Service details */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${theme === 'dark' ? 'bg-[#09090B]/50' : 'bg-white/50'} backdrop-blur-sm rounded-xl p-8 border border-[#D8A23B]/20`}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-[#D8A23B]/20 text-[#D8A23B] mr-4">
                  {activeServiceData.icon}
                </div>
                <h3 className="text-2xl font-bold">{activeServiceData.title}</h3>
              </div>

              <p className={`${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'} mb-8 text-lg`}>
                {activeServiceData.description}
              </p>

              <h4 className="text-[#D8A23B] font-medium mb-4 flex items-center">
                <Headphones className="h-5 w-5 mr-2" />
                Key Features
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeServiceData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start"
                  >
                    <div className="mt-1 mr-3 p-1 rounded-full bg-[#D8A23B]/20 text-[#D8A23B]">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className={`${theme === 'dark' ? 'text-white/90' : 'text-[#09090B]/90'}`}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
