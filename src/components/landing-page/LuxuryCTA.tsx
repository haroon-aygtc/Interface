import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function LuxuryCTA() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <section className="py-24 relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-[#09090B] to-[#09090B]/80' : 'from-white to-white/80'} z-10`}
        ></div>
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop')",
            opacity: 0.3
          }}
        ></div>
      </div>

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8A23B]/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8A23B]/50 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Experience <span className="text-[#D8A23B]">Premium Service?</span>
            </h2>

            <p className={`text-xl ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'} mb-8`}>
              Contact us today to discover how Al Yalayis Hub can elevate your experience with our comprehensive range of premium services.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-[#D8A23B]/20 text-[#D8A23B] mr-4">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Call Us</h3>
                  <p className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>+971 4 123 4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-full bg-[#D8A23B]/20 text-[#D8A23B] mr-4">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Email Us</h3>
                  <p className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>info@alyalayishub.ae</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-full bg-[#D8A23B]/20 text-[#D8A23B] mr-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Visit Us</h3>
                  <p className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>Al Yalayis Hub, Sheikh Zayed Road, Dubai, UAE</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 px-8 py-6 text-lg rounded-md group"
              onClick={() => navigate("/contact")}
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`${theme === 'dark' ? 'bg-[#09090B]/80' : 'bg-white/80'} backdrop-blur-sm rounded-xl p-8 border border-[#D8A23B]/20`}>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Send Us a <span className="text-[#D8A23B]">Message</span>
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'} mb-2`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-[#09090B]/5 text-[#09090B]'} border border-[#D8A23B]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8A23B]/50`}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'} mb-2`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-[#09090B]/5 text-[#09090B]'} border border-[#D8A23B]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8A23B]/50`}
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'} mb-2`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-[#09090B]/5 text-[#09090B]'} border border-[#D8A23B]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8A23B]/50`}
                    placeholder="Subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'} mb-2`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-[#09090B]/5 text-[#09090B]'} border border-[#D8A23B]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8A23B]/50 resize-none`}
                    placeholder="Your message"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 py-3 rounded-md font-medium"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
