"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Play,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Hero({
  setIsVideoPlaying,
}: {
  setIsVideoPlaying: (playing: boolean) => void;
}) {
  return (
    <section className="relative z-10 pt-32 pb-24 px-4">
      <div className="container max-w-8xl mx-auto">
        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto mb-24">
          {/* Hero badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500/20 to-indigo-500/10 backdrop-blur-xl px-6 py-3 rounded-2xl text-sm mb-12 border border-violet-400/20 shadow-2xl"
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(109, 40, 217, 0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <div className="relative">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <div className="absolute inset-0 animate-pulse">
                <Sparkles className="h-5 w-5 text-violet-300/50" />
              </div>
            </div>
            <span className="font-semibold text-white tracking-wide">
              The Future of Web3 Business Management
            </span>
            <Badge className="bg-gradient-to-r from-violet-600/40 to-fuchsia-600/40 text-white border-violet-400/30 font-medium">
              New
            </Badge>
          </motion.div>{" "}
          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, type: "spring" }}
            className="mb-6"
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-none">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-3 drop-shadow-sm">
                One Platform for
              </span>
              <span className="block bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
                Web3 Business Success
              </span>
            </h1>
          </motion.div>{" "}
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm md:text-base text-indigo-100/90 mb-12 leading-relaxed max-w-3xl mx-auto font-light tracking-wide"
          >
            End business fragmentation in Web3. Streamline customer relations,
            information sharing, and operations—all in one unified platform.
          </motion.p>
          {/* CTA buttons - Enhanced design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white px-10 py-7 text-lg md:text-xl font-bold rounded-2xl border border-white/20 min-w-[220px] transition-all duration-500 overflow-hidden shadow-[0_20px_60px_-12px_rgba(131,88,255,0.5)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start Free Trial
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group relative border-2 border-white/10 hover:border-white/30 bg-gradient-to-r from-white/5 to-purple-500/5 backdrop-blur-xl hover:bg-white/10 text-white px-10 py-7 text-lg md:text-xl font-semibold rounded-2xl min-w-[220px] transition-all duration-500 overflow-hidden shadow-[0_8px_25px_-5px_rgba(255,255,255,0.1)]"
              onClick={() => setIsVideoPlaying(true)}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <motion.span
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-violet-400"
                >
                  <Play className="h-6 w-6" />
                </motion.span>
                Watch Demo
              </span>
              <span className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
              <motion.span
                initial={{ opacity: 0.1, scale: 0 }}
                whileHover={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600/10 via-transparent to-transparent rounded-2xl"
              />
            </Button>
          </motion.div>
          {/* Enhanced Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-12 text-white/60"
          >
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="font-semibold text-lg">4.9/5 rating</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <CheckCircle className="h-6 w-6 text-emerald-400" />
              <span className="font-semibold text-lg">99.9% uptime</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="font-semibold text-lg">SOC 2 compliant</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Modern Visual Elements */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.2, type: "spring" }}
          className="relative max-w-7xl mx-auto"
        >
          {/* Clean Central Visualization */}
          <div className="relative flex items-center justify-center min-h-[500px] overflow-hidden">
            {/* Enhanced Fidgety Central Hub */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                rotate: [0, 2, -2, 0],
                y: [0, -5, 5, 0],
              }}
              transition={{
                delay: 1.2,
                duration: 1.5,
                type: "spring",
                bounce: 0.3,
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative z-20"
            >
              <motion.div
                animate={{
                  x: [0, 1, -1, 1, 0],
                  y: [0, -1, 1, 1, 0],
                  rotate: [0, 0.5, -0.5, 0.2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-40 h-40 rounded-3xl bg-gradient-to-br from-purple-500 via-violet-600 to-blue-600 flex items-center justify-center shadow-2xl shadow-purple-500/30 border-2 border-white/20 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <img
                    src="/mntdaopfp.png"
                    alt="Logo"
                    className="w-20 h-20 object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
