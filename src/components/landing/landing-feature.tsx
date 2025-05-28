"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  Wallet,
  Building2,
  GraduationCap,
  HeadphonesIcon,
  Zap,
  Globe,
  Shield,
  Star,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Play,
  Twitter,
  Github,
  Linkedin,
  MessageCircle,
  Send,
  Bot,
  Target,
  Database,
  Network,
  Layers,
  Lock,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "All-in-One CRM",
    description:
      "Unified customer relationship management with Web3 integration",
    color: "from-purple-500 to-violet-600",
    delay: 0.1,
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Learning Management",
    description: "Complete LMS for educational content and skill development",
    color: "from-blue-500 to-cyan-600",
    delay: 0.2,
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Sales Management",
    description: "Advanced sales pipeline with Web3 analytics and insights",
    color: "from-emerald-500 to-green-600",
    delay: 0.3,
  },
  {
    icon: <HeadphonesIcon className="h-6 w-6" />,
    title: "Support Service",
    description: "Multi-channel customer support with smart ticket routing",
    color: "from-orange-500 to-red-600",
    delay: 0.4,
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Wallet Analytics",
    description: "Smart contract analytics and wallet transaction insights",
    color: "from-pink-500 to-rose-600",
    delay: 0.5,
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Event Management",
    description: "Complete event planning, management, and attendance tracking",
    color: "from-indigo-500 to-purple-600",
    delay: 0.6,
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Company Management",
    description: "Multi-company dashboard with role-based access control",
    color: "from-amber-500 to-orange-600",
    delay: 0.7,
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Cross-Module Forum",
    description: "Unified communication hub connecting all platform modules",
    color: "from-teal-500 to-cyan-600",
    delay: 0.8,
  },
];

function getGlowColor(index: number) {
  const colors = [
    "rgba(124, 58, 237, 0.3)", // violet
    "rgba(59, 130, 246, 0.3)", // blue
    "rgba(14, 165, 233, 0.3)", // cyan
    "rgba(139, 92, 246, 0.3)", // purple
    "rgba(34, 197, 94, 0.3)", // green
    "rgba(79, 70, 229, 0.3)", // indigo
  ];
  return colors[index % colors.length];
}

const stats = [
  { number: "99.9%", label: "Uptime", icon: <Shield className="h-5 w-5" /> },
  {
    number: "250+",
    label: "Integrations",
    icon: <Network className="h-5 w-5" />,
  },
  {
    number: "50K+",
    label: "Active Users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    number: "1M+",
    label: "Transactions",
    icon: <TrendingUp className="h-5 w-5" />,
  },
];

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

const integrations = [
  {
    name: "Discord",
    icon: <MessageCircle className="h-5 w-5" />,
    color: "bg-indigo-500/20",
  },
  {
    name: "Twitter",
    icon: <Twitter className="h-5 w-5" />,
    color: "bg-blue-500/20",
  },
  {
    name: "Telegram",
    icon: <Send className="h-5 w-5" />,
    color: "bg-cyan-500/20",
  },
  {
    name: "Wallet Connect",
    icon: <Wallet className="h-5 w-5" />,
    color: "bg-purple-500/20",
  },
  {
    name: "Solana",
    icon: <Database className="h-5 w-5" />,
    color: "bg-emerald-500/20",
  },
  {
    name: "Ethereum",
    icon: <Layers className="h-5 w-5" />,
    color: "bg-blue-600/20",
  },
];

export default function LandingFeature() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced fidgety animated background gradients */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{
            x: [0, 20, -10, 15, 0],
            y: [0, -15, 10, 5, 0],
            rotate: [0, 1, -1, 0.5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -25, 18, 0],
            y: [0, 20, -12, 0],
            rotate: [0, -1.5, 1, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[150px]"
        />

        <motion.div
          animate={{
            x: [0, 12, -8, -20, 8, 0],
            y: [0, 8, -15, 5, -10, 0],
            rotate: [0, 0.8, -0.5, 1.2, -0.8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[130px]"
        />

        <motion.div
          animate={{
            x: [0, 15, -12, 0],
            y: [0, -20, 18, 0],
            rotate: [0, 1, -1.5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/8 rounded-full blur-[100px]"
        />

        <motion.div
          animate={{
            x: [0, -18, 22, -5, 0],
            y: [0, -8, 15, -25, 0],
            rotate: [0, -1, 1.5, -0.5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[60%] w-[300px] h-[300px] bg-pink-500/8 rounded-full blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, 8, -15, 0],
            y: [0, 20, -10, 0],
            rotate: [0, 0.5, -1, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[30%] left-[15%] w-[280px] h-[280px] bg-cyan-400/10 rounded-full blur-[90px]"
        />
      </div>
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-0" />{" "}
      {/* Hero Section */}
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
                      transition:
                        "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
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
                  description:
                    "Live analytics and insights across all platforms",
                  icon: BarChart3,
                  gradient: "from-blue-500/20 to-cyan-600/20",
                  border: "border-blue-400/30",
                },
                {
                  title: "Seamless Integration",
                  description:
                    "Connect Discord, Twitter, Telegram effortlessly",
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
      {/* Features Grid */}
      <section className="relative z-10 py-24 px-4">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-4">
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Before we dive into the solution, here&apos;s what we offer in our
              comprehensive platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-20 mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Problem Statement */}
      <section className="relative z-10 py-28 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Problem Statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Removed decorative circle element */}

                <Badge className="bg-gradient-to-r from-red-600/30 to-rose-600/20 text-red-300 border-red-500/30 mb-4 px-4 py-1.5">
                  The Problem
                </Badge>

                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-white via-red-100 to-rose-100 bg-clip-text text-transparent">
                    Business Fragmentation
                  </span>
                </h2>

                <div className="space-y-6 text-lg text-white/70">
                  <p className="text-xl">
                    Web3 businesses struggle with{" "}
                    <span className="font-semibold text-white">
                      scattered operations
                    </span>{" "}
                    across multiple disconnected platforms, creating
                    inefficiencies and lost opportunities.
                  </p>

                  <div className="space-y-6 mt-8">
                    {[
                      {
                        title: "Scattered Customer Data",
                        description:
                          "Critical user information dispersed across Discord, Twitter, Telegram, and wallet systems",
                        icon: Users,
                        color: "from-red-500/20 to-red-700/20",
                        border: "border-red-500/30",
                      },
                      {
                        title: "Support Chaos",
                        description:
                          "Tickets lost in communication channels, leading to poor customer experiences",
                        icon: HeadphonesIcon,
                        color: "from-red-600/20 to-rose-600/20",
                        border: "border-red-500/30",
                      },
                      {
                        title: "Fragmented Analytics",
                        description:
                          "Impossible to build a complete picture of business performance and customer behavior",
                        icon: BarChart3,
                        color: "from-red-500/20 to-red-700/20",
                        border: "border-red-500/30",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex gap-5"
                      >
                        <div
                          className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} ${item.border} flex items-center justify-center shrink-0 mt-1`}
                        >
                          <item.icon className="h-6 w-6 text-red-400" />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-white/70">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual Representation of the Problem */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-black/40 to-red-950/20 backdrop-blur-md rounded-2xl border border-red-900/20 p-8 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute right-20 top-20 w-20 h-20 bg-rose-500/10 rounded-full blur-xl" />

                <div className="relative z-10 space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 border-b border-red-500/20 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-300 font-semibold">
                        Current Web3 Business Status
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-red-400 border-red-500/30"
                    >
                      Critical Issues
                    </Badge>
                  </div>

                  {/* Platform Status Cards */}
                  <div className="space-y-4">
                    {[
                      {
                        platform: "Customer Data",
                        status: "Scattered",
                        color: "bg-red-500",
                        icon: Users,
                        details: "Across 5+ platforms",
                      },
                      {
                        platform: "Support Tickets",
                        status: "Untracked",
                        color: "bg-red-500",
                        icon: HeadphonesIcon,
                        details: "50% resolution failure",
                      },
                      {
                        platform: "Event Management",
                        status: "Disconnected",
                        color: "bg-yellow-500",
                        icon: Calendar,
                        details: "Manual synchronization",
                      },
                      {
                        platform: "Learning Progress",
                        status: "Fragmented",
                        color: "bg-red-500",
                        icon: GraduationCap,
                        details: "No unified tracking",
                      },
                      {
                        platform: "Business Analytics",
                        status: "Missing",
                        color: "bg-gray-500",
                        icon: BarChart3,
                        details: "Zero integrated insights",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/8 rounded-lg border border-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-lg bg-opacity-20 backdrop-blur-sm`}
                            style={{
                              backgroundColor: "rgba(244, 63, 94, 0.2)",
                            }}
                          >
                            <item.icon className="h-5 w-5 text-white/70" />
                          </div>
                          <div>
                            <span className="text-white font-medium block">
                              {item.platform}
                            </span>
                            <span className="text-white/50 text-xs">
                              {item.details}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-500/30">
                          <div
                            className={`w-2 h-2 rounded-full ${item.color}`}
                          />
                          <span
                            className={`text-sm ${
                              item.color === "bg-red-500"
                                ? "text-red-400"
                                : item.color === "bg-yellow-500"
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Overall status indicator */}
                  <div className="mt-6 flex items-center justify-between border-t border-red-500/20 pt-4">
                    <span className="text-white/70">System Efficiency:</span>
                    <div className="w-32 h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-red-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: "35%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <span className="text-red-400 font-semibold">35%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Solution */}
      <section className="relative z-10 py-28 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Representation of the Solution */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="bg-gradient-to-br from-black/40 to-green-950/20 backdrop-blur-md rounded-2xl border border-green-900/20 p-8 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
                <div className="absolute left-20 top-20 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl" />

                <div className="relative z-10 space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 border-b border-green-500/20 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-300 font-semibold">
                        Menageri3 Platform Status
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-green-400 border-green-500/30"
                    >
                      Fully Operational
                    </Badge>
                  </div>

                  {/* Platform Status Cards */}
                  <div className="space-y-4">
                    {[
                      {
                        platform: "Customer Relations",
                        status: "Unified CRM",
                        color: "bg-green-500",
                        icon: Users,
                        details: "Real-time 360° view",
                      },
                      {
                        platform: "Support System",
                        status: "Centralized",
                        color: "bg-green-500",
                        icon: HeadphonesIcon,
                        details: "95% resolution rate",
                      },
                      {
                        platform: "Event Management",
                        status: "Streamlined",
                        color: "bg-green-500",
                        icon: Calendar,
                        details: "Auto-synchronized",
                      },
                      {
                        platform: "Learning Hub",
                        status: "Integrated LMS",
                        color: "bg-green-500",
                        icon: GraduationCap,
                        details: "Progress tracking",
                      },
                      {
                        platform: "Business Intelligence",
                        status: "Real-time",
                        color: "bg-green-500",
                        icon: BarChart3,
                        details: "Actionable insights",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/8 rounded-lg border border-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-lg bg-opacity-20 backdrop-blur-sm`}
                            style={{
                              backgroundColor: "rgba(34, 197, 94, 0.2)",
                            }}
                          >
                            <item.icon className="h-5 w-5 text-white/70" />
                          </div>
                          <div>
                            <span className="text-white font-medium block">
                              {item.platform}
                            </span>
                            <span className="text-white/50 text-xs">
                              {item.details}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/30 border border-green-500/30">
                          <motion.div
                            className={`w-2 h-2 rounded-full ${item.color}`}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-sm text-green-400">
                            {item.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Overall status indicator */}
                  <div className="mt-6 flex items-center justify-between border-t border-green-500/20 pt-4">
                    <span className="text-white/70">System Efficiency:</span>
                    <div className="w-32 h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: "95%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <span className="text-green-400 font-semibold">95%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Solution Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                {/* Removed decorative circle element */}

                <Badge className="bg-gradient-to-r from-green-600/30 to-emerald-600/20 text-green-300 border-green-500/30 mb-4 px-4 py-1.5">
                  Our Solution
                </Badge>

                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent">
                    Unified Web3 CRM Platform
                  </span>
                </h2>

                <div className="space-y-6 text-lg text-white/70">
                  <p className="text-xl">
                    Menageri3 consolidates{" "}
                    <span className="font-semibold text-white">
                      all your business operations
                    </span>{" "}
                    into one comprehensive platform built specifically for Web3
                    companies.
                  </p>

                  <div className="space-y-6 mt-8">
                    {[
                      {
                        title: "Unified Customer Data",
                        description:
                          "Single source of truth for all customer interactions across Discord, Twitter, Telegram, and wallet activity",
                        icon: Users,
                        color: "from-green-500/20 to-emerald-600/20",
                        border: "border-green-500/30",
                      },
                      {
                        title: "Integrated Support",
                        description:
                          "Centralized ticketing system connecting all communication channels with automated workflows",
                        icon: HeadphonesIcon,
                        color: "from-emerald-500/20 to-green-600/20",
                        border: "border-green-500/30",
                      },
                      {
                        title: "Comprehensive Analytics",
                        description:
                          "Real-time dashboards and insights combining on-chain data with customer behavior metrics",
                        icon: BarChart3,
                        color: "from-green-500/20 to-emerald-600/20",
                        border: "border-green-500/30",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex gap-5"
                      >
                        <div
                          className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} ${item.border} flex items-center justify-center shrink-0 mt-1`}
                        >
                          <item.icon className="h-6 w-6 text-green-400" />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-white/70">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="pt-4"
                  >
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium px-6 py-3 rounded-lg">
                      Learn How It Works
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Results Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-10">
              Measurable Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  metric: "Customer Engagement",
                  before: "32%",
                  after: "87%",
                  increase: "+172%",
                  icon: Users,
                  color: "emerald",
                },
                {
                  metric: "Support Resolution Time",
                  before: "48 hours",
                  after: "6 hours",
                  increase: "-87%",
                  icon: HeadphonesIcon,
                  color: "green",
                },
                {
                  metric: "Operational Efficiency",
                  before: "35%",
                  after: "95%",
                  increase: "+171%",
                  icon: Zap,
                  color: "teal",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                    <div className={`bg-${item.color}-500/20 p-2 rounded-lg`}>
                      <item.icon className={`h-5 w-5 text-${item.color}-400`} />
                    </div>
                    <h4 className="text-lg font-medium text-white">
                      {item.metric}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-center">
                    <div className="flex-1">
                      <div className="text-white/60 text-sm mb-1">Before</div>
                      <div className="text-red-400 text-2xl font-bold">
                        {item.before}
                      </div>
                    </div>

                    <div className="w-12 h-12 flex items-center justify-center">
                      <ArrowRight className="h-6 w-6 text-white/40" />
                    </div>

                    <div className="flex-1">
                      <div className="text-white/60 text-sm mb-1">After</div>
                      <div className="text-green-400 text-2xl font-bold">
                        {item.after}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-${item.color}-500/20 text-${item.color}-300`}
                    >
                      {item.increase}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Integrations - Enhanced Modern Design */}
      <section className="relative z-10 py-24 px-4">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-gradient-to-r from-blue-600/30 to-violet-600/30 text-blue-300 border-blue-500/30 mb-4 px-4 py-1.5">
              Integrations
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent">
                Connect Everything
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Seamlessly integrate with all your existing Web3 tools and
              platforms
            </p>
          </motion.div>

          {/* Integration Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-20">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2, type: "spring", stiffness: 300 },
                }}
                className="group relative"
              >
                <div className="relative aspect-square bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col items-center justify-center hover:border-white/30 transition-all duration-300">
                  {/* Background glow effect */}
                  <motion.div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{
                      background: `radial-gradient(circle at center, ${getGlowColor(
                        index
                      )} 0%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />

                  {/* Icon wrapper */}
                  <motion.div
                    className={`relative ${integration.color} rounded-2xl w-16 h-16 flex items-center justify-center mb-5`}
                    whileHover={{ rotate: [0, -5, 5, -3, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 0.95, 1],
                        rotate: [0, 0.5, -0.5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      className="relative z-10"
                    >
                      {React.cloneElement(integration.icon, {
                        className: "h-8 w-8 text-white",
                      })}
                    </motion.div>

                    {/* Circle rings */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{ scale: [0.8, 1.2], opacity: [0.1, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  </motion.div>

                  {/* Label */}
                  <motion.span
                    className="relative z-10 text-white font-medium text-center block"
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    {integration.name}
                  </motion.span>

                  {/* Connection status */}
                  <motion.div
                    className="flex items-center gap-1 mt-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-emerald-400/80">
                      Connected
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Showcase - Moved up to replace the connection visual */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-4">
            {[
              {
                title: "One-click Integration",
                description:
                  "Connect your existing tools with a single click, no complex setup required",
                icon: <Zap className="h-5 w-5 text-blue-400" />,
              },
              {
                title: "Real-time Sync",
                description:
                  "All your data stays synchronized across platforms automatically",
                icon: <ArrowRight className="h-5 w-5 text-violet-400" />,
              },
              {
                title: "Extensible API",
                description:
                  "Build custom integrations with our developer-friendly API",
                icon: <Code className="h-5 w-5 text-indigo-400" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-blue-950/50">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Integration CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center" // This class already centers the content
          >
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-900/20 to-violet-900/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 hover:text-blue-200 px-8 py-6 rounded-xl mx-auto" // Added mx-auto to ensure centering
            >
              <span>View All Integrations</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Testimonials */}
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
              See how industry leaders have transformed their operations with
              our platform
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
      {/* CTA Section */}
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
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium px-10 py-6 rounded-xl"
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
      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-4xl mx-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Platform Demo
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVideoPlaying(false)}
                  className="text-white hover:bg-white/10"
                >
                  ×
                </Button>
              </div>
              <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
                <p className="text-white/70">Demo video would go here</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>{" "}
    </div>
  );
}
