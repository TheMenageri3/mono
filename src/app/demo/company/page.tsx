"use client";

import React from "react";
import {
  Globe,
  MapPin,
  Users,
  Calendar,
  MessageSquare,
  Building,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { TabsContainer } from "./tabs/TabsContainer";

export default function CompanyPage() {
  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background gradient effect  */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[150px] animate-pulse-slower" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-medium" />
        <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      {/* Subtle grid overlay E */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Improved Glassmorphic Header Card - just fixing layout issues */}
      <div className="w-full max-w-6xl mx-auto mt-12 backdrop-blur-md bg-white/[0.01] border border-white/10 rounded-xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start justify-between p-8 gap-8 relative">
          {/* Left Section - improved layout but keeping all elements */}
          <div className="flex flex-col md:flex-row items-start gap-6 w-full">
            {/* Company Logo with Animation - FIXED */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="h-28 w-28 rounded-2xl relative overflow-hidden shadow-lg border border-white/10 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600">
                  <span className="text-white text-3xl font-bold">BD</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 mix-blend-overlay"></div>
              </div>
            </motion.div>

            {/* Company Info with Better Typography*/}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
              >
                BlockChain Dynamics
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-2"
              >
                {[
                  "Blockchain",
                  "Enterprise Software",
                  "FinTech",
                  "Web3",
                  "Security",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10 backdrop-blur-sm text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 gap-x-8 gap-y-3 mt-4 text-sm"
              >
                <div className="flex flex-col gap-3">
                  <a
                    href="https://blockchaindynamics.io"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-purple-300 transition-colors group"
                  >
                    <div className="p-1.5 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                      <Globe className="w-4 h-4 text-purple-300" />
                    </div>
                    <span>blockchaindynamics.io</span>
                  </a>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-blue-500/20">
                      <Calendar className="w-4 h-4 text-blue-300" />
                    </div>
                    <span>Founded 2019</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-blue-500/20">
                      <MapPin className="w-4 h-4 text-blue-300" />
                    </div>
                    <span>Austin, TX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-purple-500/20">
                      <Users className="w-4 h-4 text-purple-300" />
                    </div>
                    <span>Medium Company</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons with Better Styling - same buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-end space-y-3 mt-4 md:mt-0 md:ml-4"
          >
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 w-44 shadow-lg transition-all">
              <MessageSquare size={16} />
              Contact
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 w-44 shadow-md backdrop-blur-sm transition-all">
              <Building size={16} />
              Company Profile
            </button>
          </motion.div>
        </div>
      </div>
      <TabsContainer />
    </div>
  );
}
