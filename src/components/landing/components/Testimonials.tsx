"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from "lucide-react";
import { useState, useEffect } from "react";

// Import testimonials data
const testimonials = [
  {
    name: "Alex Chen",
    role: "CEO, DeFi Protocol",
    avatar: "/avatars/alex.jpg",
    content:
      "Menageri3 revolutionized how we manage our community and customer relationships across Web3.",
  },
  {
    name: "Sarah Williams",
    role: "Product Manager, NFT Marketplace",
    avatar: "/avatars/sarah.jpg",
    content:
      "The unified dashboard finally solved our fragmented communication across Discord, Twitter, and Telegram.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Operations, DAO",
    avatar: "/avatars/marcus.jpg",
    content:
      "Best Web3 CRM solution we've used. The analytics and wallet insights are game-changing.",
  },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Enhanced Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="bg-gradient-to-r from-yellow-600/20 to-amber-600/20 text-amber-300 border-amber-500/30 mb-4 px-4 py-1.5">
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-amber-200 bg-clip-text text-transparent">
              Loved by Web3 Teams
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See how industry leaders have transformed their operations with our
            platform
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Testimonial Cards Carousel */}
          <div className="relative px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-5">
                  {/* Left side with testimonial content */}
                  <div className="p-8 md:p-10 md:col-span-3 flex flex-col justify-center">
                    <div className="flex justify-start mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div className="mb-6">
                        <span className="text-4xl text-white/20 font-serif">
                          &quot;
                        </span>
                        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                          {testimonials[currentTestimonial].content}
                        </p>
                        <span className="text-4xl text-white/20 font-serif">
                          &quot;
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white font-bold border-2 border-white/30"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {testimonials[currentTestimonial].name.charAt(0)}
                        </motion.div>
                        <div className="text-left">
                          <div className="text-white text-lg font-semibold">
                            {testimonials[currentTestimonial].name}
                          </div>
                          <div className="text-white/60 text-sm">
                            {testimonials[currentTestimonial].role}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right side with visual elements */}
                  <div className="hidden md:block md:col-span-2 relative bg-gradient-to-br from-amber-500/30 to-yellow-700/20">
                    <div className="absolute inset-0 bg-noise opacity-10"></div>
                    <div className="h-full w-full flex flex-col items-center justify-center p-6 relative z-10">
                      <motion.div
                        className="p-2 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/20 shadow-lg mb-4"
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="relative w-24 h-24 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                          {testimonials[currentTestimonial].name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </div>
                      </motion.div>

                      <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`h-2 rounded-full bg-gradient-to-r from-yellow-400/70 to-amber-500/70`}
                            style={{ width: `${120 - i * 30}px` }}
                            animate={{
                              opacity: [0.5, 0.8, 0.5],
                              width: [
                                `${120 - i * 30}px`,
                                `${130 - i * 30}px`,
                                `${120 - i * 30}px`,
                              ],
                            }}
                            transition={{
                              duration: 2 + i,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        ))}

                        {/* Abstract decoration elements */}
                        <motion.div
                          className="absolute bottom-6 right-6 w-20 h-20 rounded-full border border-white/20"
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 180, 0],
                          }}
                          transition={{ duration: 8, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute top-10 right-10 w-10 h-10 rounded-full border border-white/20"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [180, 0, 180],
                          }}
                          transition={{ duration: 5, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="flex justify-between items-center mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`relative h-2 rounded-full transition-all duration-300 ${
                      currentTestimonial === index
                        ? "bg-amber-500 w-10"
                        : "bg-white/30 w-4 hover:bg-white/50"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentTestimonial === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-amber-400/50"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10 border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  onClick={() =>
                    setCurrentTestimonial(
                      (prev) =>
                        (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10 border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  onClick={() =>
                    setCurrentTestimonial(
                      (prev) => (prev + 1) % testimonials.length
                    )
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Testimonial quote marks background effect */}
          <div className="absolute -top-14 -left-10 text-9xl text-white/3 font-serif z-0 pointer-events-none">
            &quot;
          </div>
          <div className="absolute -bottom-14 -right-10 text-9xl text-white/3 font-serif z-0 rotate-180 pointer-events-none">
            &quot;
          </div>

          {/* Company logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center text-white/40 text-sm mb-8">
              TRUSTED BY LEADING WEB3 COMPANIES
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
              {[
                "Company 1",
                "Company 2",
                "Company 3",
                "Company 4",
                "Company 5",
              ].map((company, i) => (
                <motion.div
                  key={i}
                  className="h-8 text-white/50 flex items-center"
                  whileHover={{ scale: 1.05, opacity: 0.8 }}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
