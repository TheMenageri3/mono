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
      {/* Background Blobs */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Blurry Box */}
      <div className="w-full max-w-4xl h-60 mx-auto mt-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
        <div className="flex items-start justify-between h-full">
          {/* Left Section */}
          <div className="flex items-start space-x-6">
            {/* Tried Motion Logo (but failed) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Avatar className="h-28 w-28 border border-white/10">
                <AvatarImage className="w-24 h-24 rounded-full bg-purple-500/40 border border-white/20 flex items-top justify-center text-white text-2xl font-bold" />
                <AvatarFallback className="w-30 h-30 bg-purple-500 hover:bg-purple-600 from-purple-500 to-fuchsia-500 text-white text-2xl font-bold">
                  BD
                </AvatarFallback>
              </Avatar>
            </motion.div>

            {/* Company Info */}
            <div>
              <h1 className="text-4xl font-bold">BlockChain Dynamics</h1>
              <div className="flex flex-wrap gap-3 mt-3">
                {[
                  "Blockchain",
                  "Enterprise Software",
                  "FinTech",
                  "Web3",
                  "Security",
                ].map((tag) => (
                  <span
                    key={tag}
                    className=" px-3 py-1 rounded-md text-sm outline outline-1 outline-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm text-white/80">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Globe color="#DF73FF" size={16} />
                    <a
                      href="https://blockchaindynamics.io"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      blockchaindynamics.io
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar color="#1e90ff" size={16} />
                    <span>Founded 2019</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin color="#1e90ff" size={16} />
                    <span>Austin, TX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users color="#DF73FF" size={16} />
                    <span>Medium Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-3">
            {" "}
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 w-44">
              {" "}
              <MessageSquare size={16} />
              Contact
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 w-44">
              {" "}
              <Building size={16} />
              Company Profile
            </button>
          </div>
        </div>
      </div>
      <TabsContainer />
    </div>
  );
}
