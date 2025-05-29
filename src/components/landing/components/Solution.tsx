"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  HeadphonesIcon,
  BarChart3,
  Zap,
  ArrowRight,
  MessageSquare,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Solution() {
  return (
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
  );
}
