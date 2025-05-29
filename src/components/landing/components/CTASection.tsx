"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Play } from "lucide-react";

export default function CTASection({
  setIsVideoPlaying,
}: {
  setIsVideoPlaying: (playing: boolean) => void;
}) {
  return (
    <section className="relative z-10 py-32 px-4">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          {/* Simple translucent background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-indigo-900/20 rounded-3xl backdrop-blur-md border border-white/10" />

          {/* Content Container */}
          <div className="relative z-10 px-8 py-20 rounded-3xl">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm font-medium text-white/90">
                    Start free, no credit card required
                  </span>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                  Transform Your Web3 Business Today
                </span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-white/70 mb-10 max-w-2xl mx-auto"
              >
                Join thousands of Web3 companies already streamlining their
                operations and customer relationships on one unified platform.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
              >
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-10 py-6 rounded-xl"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>{" "}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium px-10 py-6 rounded-xl"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Simple trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-x-6 gap-y-2"
              >
                <div className="text-white/60 text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> 30-day free trial
                </div>
                <div className="text-white/60 text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> No credit card required
                </div>
                <div className="text-white/60 text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Cancel anytime
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
