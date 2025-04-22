import React from "react";
import { motion } from "framer-motion";
import { LuxuryThemeToggle } from "@/components/landing-page/LuxuryThemeToggle";
import { LuxuryLogo } from "@/components/landing-page/LuxuryLogo";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen grid lg:grid-cols-2 ${theme === 'dark' ? 'bg-[#020817] text-white' : 'bg-white text-[#09090B]'}`}>
            {/* Left side - Form */}
            <div className="flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md space-y-10">
                    <div className="flex justify-between items-center mb-2">
                        <Link to="/" className="inline-block">
                            <LuxuryLogo className="h-12 w-auto" />
                        </Link>
                        <LuxuryThemeToggle />
                    </div>

                    <div className="space-y-4">
                        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>{title}</h1>
                        <p className={`text-lg ${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>{description}</p>
                    </div>

                    {children}
                </div>
            </div>

            {/* Right side - Decorative */}
            <div className={`hidden lg:block relative overflow-hidden ${theme === 'dark' ? 'bg-[#09090B]/30' : 'bg-[#f8f8f8]'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#D8A23B]/20 via-[#D8A23B]/5 to-transparent"></div>

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "linear-gradient(to right, #D8A23B 1px, transparent 1px), linear-gradient(to bottom, #D8A23B 1px, transparent 1px)",
                        backgroundSize: "80px 80px"
                    }}
                />

                {/* Animated decoration */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D8A23B]/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#D8A23B]/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <div className="absolute inset-0 flex items-center justify-center p-8">
                    {/* Feature highlights */}
                    <div className={`backdrop-blur-sm ${theme === 'dark' ? 'bg-[#09090B]/70' : 'bg-white/70'} border border-[#D8A23B]/20 p-10 rounded-xl shadow-lg max-w-md space-y-8`}>
                        <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Al Yalayis Business Group</h2>
                        <p className={`text-lg ${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>
                            Access premium services across government transactions, property management, VIP transportation, and workforce solutions.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-[#D8A23B]/20 rounded-full p-3 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D8A23B]">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Streamlined Services</h3>
                                    <p className={`text-base ${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>Quick and efficient processing of all your requirements</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-[#D8A23B]/20 rounded-full p-3 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D8A23B]">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Professional Assistance</h3>
                                    <p className={`text-base ${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>Expert guidance throughout your journey</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-[#D8A23B]/20 rounded-full p-3 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D8A23B]">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Secure Platform</h3>
                                    <p className={`text-base ${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>Your data is protected with state-of-the-art security</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
