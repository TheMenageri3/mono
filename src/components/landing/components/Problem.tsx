"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BarChart3, HeadphonesIcon, MessageSquare } from "lucide-react";

export default function Problem() {
  return (
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
              <Badge className="bg-gradient-to-r from-red-600/30 to-rose-600/20 text-red-300 border-red-500/30 mb-4 px-4 py-1.5">
                The Problem
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-white via-red-100 to-rose-100 bg-clip-text text-transparent">
                  Fragmented Web3 Customer Experience
                </span>
              </h2>

              <div className="space-y-6 text-lg text-white/70">
                <p className="text-xl">
                  Web3 companies are using 10+ separate tools to manage
                  different aspects of their customer relationship.
                </p>

                <div className="space-y-5 mt-8">
                  {[
                    {
                      title: "Scattered Communications",
                      description:
                        "Teams lose context when switching between Discord, Telegram, and email support channels",
                    },
                    {
                      title: "Siloed Customer Data",
                      description:
                        "Wallet addresses, transaction history, and support tickets exist in separate systems",
                    },
                    {
                      title: "Integration Complexity",
                      description:
                        "Engineering resources wasted trying to connect incompatible platforms",
                    },
                    {
                      title: "Poor Customer Experience",
                      description:
                        "Slow response times and inconsistent service across touchpoints",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex gap-5"
                    >
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/30 flex items-center justify-center shrink-0 mt-1">
                        <span className="text-lg font-semibold text-red-300">
                          {index + 1}
                        </span>
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
                {/* Title */}
                <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                  <span className="h-8 w-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  </span>
                  Current Status: Fragmented Systems
                </h3>

                {/* Visualizing the disconnected systems */}
                <div className="space-y-4">
                  {[
                    {
                      platform: "Discord Support",
                      status: "Disconnected",
                      color: "bg-red-500",
                      icon: MessageSquare,
                      details: "No customer context",
                    },
                    {
                      platform: "Customer Ticketing",
                      status: "Isolated",
                      color: "bg-red-500",
                      icon: HeadphonesIcon,
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
                      <span className="text-red-400 bg-red-500/10 px-3 py-1 rounded-full text-xs font-medium">
                        {item.status}
                      </span>
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
  );
}
