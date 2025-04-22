import React from "react";
import { LuxuryLogo } from "./LuxuryLogo";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ChevronRight, ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function LuxuryFooter() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className={`relative ${theme === 'dark' ? 'bg-[#09090B]' : 'bg-white'} border-t border-[#D8A23B]/20`}>
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8A23B]/50 to-transparent"></div>

      <div className="container mx-auto px-6 py-16">
        {/* Newsletter section */}
        <div className={`mb-16 ${theme === 'dark' ? 'bg-[#020817]/50' : 'bg-[#f8f8f8]/50'} rounded-xl p-8 border border-[#D8A23B]/10`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-2">
                Stay <span className="text-[#D8A23B]">Updated</span>
              </h3>
              <p className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>
                Subscribe to our newsletter to receive the latest updates and exclusive offers.
              </p>
            </div>
            <div>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`flex-grow px-4 py-3 ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-[#09090B]/5 text-[#09090B]'} border border-[#D8A23B]/30 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#D8A23B]/50`}
                />
                <button className="bg-[#D8A23B] text-[#09090B] px-4 rounded-r-md hover:bg-[#D8A23B]/90 transition-colors flex items-center" title="Subscribe">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <LuxuryLogo className="h-10 w-auto" />
            <p className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'} max-w-xs`}>
              Al Yalayis Hub provides comprehensive premium services across government transactions, property, transportation, and workforce management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`${theme === 'dark' ? 'text-white/60' : 'text-[#09090B]/60'} hover:text-[#D8A23B] transition-colors`}>
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className={`${theme === 'dark' ? 'text-white/60' : 'text-[#09090B]/60'} hover:text-[#D8A23B] transition-colors`}>
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className={`${theme === 'dark' ? 'text-white/60' : 'text-[#09090B]/60'} hover:text-[#D8A23B] transition-colors`}>
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className={`${theme === 'dark' ? 'text-white/60' : 'text-[#09090B]/60'} hover:text-[#D8A23B] transition-colors`}>
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "About Us", "Services", "Contact", "Careers", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'} hover:text-[#D8A23B] transition-colors flex items-center group`}>
                    <ChevronRight className="h-4 w-4 mr-2 text-[#D8A23B] transition-transform group-hover:translate-x-1" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className={`text-lg font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Our Services</h4>
            <ul className="space-y-4">
              {[
                "Government Transactions",
                "Property Services",
                "VIP Transport",
                "Workforce Solutions",
                "Business Setup",
                "Document Attestation"
              ].map((service) => (
                <li key={service}>
                  <a href="#" className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'} hover:text-[#D8A23B] transition-colors flex items-center group`}>
                    <ChevronRight className="h-4 w-4 mr-2 text-[#D8A23B] transition-transform group-hover:translate-x-1" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-lg font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-[#D8A23B] mt-1 flex-shrink-0" />
                <span className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>
                  Al Yalayis Hub, Sheikh Zayed Road, Dubai, United Arab Emirates
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#D8A23B] flex-shrink-0" />
                <span className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>+971 4 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#D8A23B] flex-shrink-0" />
                <span className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>info@alyalayishub.ae</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-[#D8A23B]/10 text-center">
          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-[#09090B]/60'} text-sm`}>
            © {currentYear} Al Yalayis Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
