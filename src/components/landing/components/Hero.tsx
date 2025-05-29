"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle,
  GraduationCap,
  HeadphonesIcon,
  MessageSquare,
  Network,
  Play,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
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
            {" "}
            <Button
              size="lg"
              className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white px-10 py-7 text-lg md:text-xl font-bold rounded-2xl border border-white/20 min-w-[220px] transition-all duration-500 overflow-hidden shadow-[0_20px_60px_-12px_rgba(131,88,255,0.5)]"
              onClick={() => (window.location.href = "/demo/onboarding")}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start Onboarding!
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
        </div>{" "}
        {/* Modern Visual Elements */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.2, type: "spring" }}
          className="relative max-w-7xl mx-auto"
        >
          {/* Clean Central Visualization */}
          <div className="relative flex items-center justify-center min-h-[500px] overflow-hidden">
            {" "}
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
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Building2 className="h-20 w-20 text-white relative z-10" />
                </motion.div>

                {/* Enhanced fidgety pulsing effects */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1.2],
                    opacity: [0.7, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-3xl border-2 border-purple-300/50"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.02],
                    opacity: [0.3, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute inset-[-12px] rounded-3xl border border-violet-300/30"
                />

                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-[-20px] rounded-3xl border border-blue-300/20"
                />
              </motion.div>
            </motion.div>
            {/* Streamlined Feature Orbits */}
            {[
              {
                icon: Users,
                label: "CRM",
                color: "from-purple-500 to-violet-600",
                angle: 0,
                radius: 220,
              },
              {
                icon: HeadphonesIcon,
                label: "Support",
                color: "from-blue-500 to-cyan-600",
                angle: 60,
                radius: 220,
              },
              {
                icon: Calendar,
                label: "Events",
                color: "from-emerald-500 to-green-600",
                angle: 120,
                radius: 220,
              },
              {
                icon: GraduationCap,
                label: "LMS",
                color: "from-orange-500 to-red-600",
                angle: 180,
                radius: 220,
              },
              {
                icon: BarChart3,
                label: "Analytics",
                color: "from-pink-500 to-rose-600",
                angle: 240,
                radius: 220,
              },
              {
                icon: MessageSquare,
                label: "Forum",
                color: "from-indigo-500 to-purple-600",
                angle: 300,
                radius: 220,
              },
            ].map((feature, i) => {
              const x =
                Math.cos((feature.angle * Math.PI) / 180) * feature.radius;
              const y =
                Math.sin((feature.angle * Math.PI) / 180) * feature.radius;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x,
                    rotate: [0, 5, -5, 0],
                    y: [y, y - 8, y + 8, y],
                  }}
                  transition={{
                    delay: 1.5 + i * 0.1,
                    duration: 0.8,
                    type: "spring",
                    bounce: 0.4,
                    rotate: {
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    y: {
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    default: { duration: 0.6, ease: "easeOut" },
                  }}
                  className="absolute z-30"
                  style={{
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  whileHover={{
                    rotate: 15,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                >
                  <div className="relative group cursor-pointer">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 2 + i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} backdrop-blur-xl border-2 border-white/30 shadow-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-white/50`}
                      style={{
                        boxShadow: `0 12px 40px -8px rgba(147, 51, 234, 0.3)`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent group-hover:from-white/30 transition-all duration-300"></div>
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3 + i * 0.1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <feature.icon className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                      </motion.div>

                      {/* Enhanced fidgety ring effects */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1],
                          opacity: [0, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                        className="absolute inset-0 rounded-2xl border border-white/40 opacity-0 group-hover:opacity-100"
                      />

                      {/* Hover label */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-semibold text-white/90 whitespace-nowrap bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg">
                          {feature.label}
                        </span>
                      </div>
                    </motion.div>{" "}
                  </div>
                </motion.div>
              );
            })}{" "}
            {/* Enhanced Fidgety Floating Metrics */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                x: [0, 3, -3, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                delay: 2.5,
                duration: 1,
                x: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute top-8 right-8 space-y-4"
            >
              {[
                {
                  label: "Active Users",
                  value: "50k+",
                  icon: Users,
                  color: "from-purple-500 to-violet-600",
                },
                {
                  label: "Efficiency Gain",
                  value: "85%",
                  icon: TrendingUp,
                  color: "from-emerald-500 to-green-600",
                },
                {
                  label: "Uptime",
                  value: "99.9%",
                  icon: Shield,
                  color: "from-blue-500 to-cyan-600",
                },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    y: [0, -2, 2, 0],
                    rotate: [0, 0.5, -0.5, 0],
                  }}
                  transition={{
                    delay: 2.7 + i * 0.15,
                    duration: 0.8,
                    y: {
                      duration: 3 + i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 4 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border-2 border-white/20 min-w-[140px] shadow-xl relative overflow-hidden group hover:border-white/40 transition-all duration-300"
                  style={{
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
                  }}
                >
                  <motion.div
                    animate={{
                      opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{
                      duration: 2 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/15 transition-all duration-300"
                  />
                  <div className="flex items-center gap-3 mb-2 relative z-10">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2.5 + i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 3 + i * 0.1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <metric.icon className="h-4 w-4 text-white" />
                      </motion.div>
                    </motion.div>
                    <span className="text-xs text-white/70 font-medium">
                      {metric.label}
                    </span>
                  </div>{" "}
                  <motion.p
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2 + i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent relative z-10"
                  >
                    {metric.value}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>{" "}
            {/* Enhanced Fidgety Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 border border-white/10 rounded-full backdrop-blur-sm"
                  animate={{
                    scale: [1, 1.2, 0.8, 1.1, 1],
                    opacity: [0.1, 0.3, 0.05, 0.2, 0.1],
                    rotate: [0, 180, 360],
                    x: [0, 20, -15, 10, 0],
                    y: [0, -10, 15, -5, 0],
                  }}
                  transition={{
                    duration: 12 + i * 2,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${15 + i * 10}%`,
                    background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
                  }}
                />
              ))}

              {/* Additional floating particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  animate={{
                    x: [0, 50, -30, 40, 0],
                    y: [0, -40, 30, -20, 0],
                    opacity: [0, 1, 0.3, 0.8, 0],
                    scale: [0, 1, 0.5, 1.2, 0],
                  }}
                  transition={{
                    duration: 8 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Refined Feature Showcase */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3.0, duration: 1 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Unified Operations",
                description:
                  "All your Web3 business tools seamlessly integrated",
                icon: Network,
                gradient: "from-purple-500/20 to-violet-600/20",
                border: "border-purple-400/30",
              },
              {
                title: "Real-time Intelligence",
                description: "Live analytics and insights across all platforms",
                icon: BarChart3,
                gradient: "from-blue-500/20 to-cyan-600/20",
                border: "border-blue-400/30",
              },
              {
                title: "Seamless Integration",
                description: "Connect Discord, Twitter, Telegram effortlessly",
                icon: Zap,
                gradient: "from-emerald-500/20 to-green-600/20",
                border: "border-emerald-400/30",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 3.2 + i * 0.2, duration: 0.8 }}
                className={`bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-2xl p-8 border-2 ${item.border} transition-all duration-500 group hover:border-opacity-60 hover:scale-105 relative overflow-hidden`}
                style={{
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 transition-all duration-300"></div>
                <item.icon className="h-12 w-12 text-white mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                  {item.title}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed relative z-10">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
