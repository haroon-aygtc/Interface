import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmed Al Mansouri",
    position: "CEO",
    company: "Emirates Ventures",
    content: "Al Yalayis has transformed how we handle government transactions. Their efficiency and expertise have saved us countless hours and resources.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
  },
  {
    id: "2",
    name: "Fatima Al Hashimi",
    position: "Director",
    company: "Dubai Properties Group",
    content: "The property services team at Al Yalayis provided exceptional guidance throughout our complex real estate transactions. Truly a premium service.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80"
  },
  {
    id: "3",
    name: "Omar Al Farsi",
    position: "Operations Manager",
    company: "Gulf Enterprises",
    content: "Super Wheel's luxury transport services have consistently exceeded our expectations. Their professionalism and attention to detail are unmatched.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80"
  }
];

export function LuxuryTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'dark' ? 'from-[#020817] via-[#09090B] to-[#020817]' : 'from-white via-[#f8f8f8] to-white'} z-0`}></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#D8A23B]/5 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#D8A23B]/5 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <Quote className="h-10 w-10 text-[#D8A23B] mx-auto" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What Our <span className="text-[#D8A23B]">Clients</span> Say
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'} max-w-3xl mx-auto`}>
            Hear from our satisfied clients about their experience with Al Yalayis Hub's premium services.
          </p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : activeIndex > index ? -100 : 100
                }}
                transition={{ duration: 0.5 }}
                className={`${activeIndex === index ? 'block' : 'hidden'}`}
              >
                <div className={`${theme === 'dark' ? 'bg-[#09090B]/70' : 'bg-white/70'} backdrop-blur-sm rounded-xl p-8 md:p-12 border border-[#D8A23B]/20`}>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D8A23B]">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-[#D8A23B] text-[#09090B] rounded-full p-1">
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-[#D8A23B] fill-current" />
                        ))}
                      </div>

                      <blockquote className={`text-xl md:text-2xl italic ${theme === 'dark' ? 'text-white/90' : 'text-[#09090B]/90'} mb-6`}>
                        "{testimonial.content}"
                      </blockquote>

                      <div>
                        <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>{testimonial.name}</h4>
                        <p className="text-[#D8A23B]">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[#D8A23B] w-8"
                    : theme === 'dark' ? "bg-white/30 hover:bg-white/50" : "bg-[#09090B]/30 hover:bg-[#09090B]/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
