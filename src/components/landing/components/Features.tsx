"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  BarChart3,
  HeadphonesIcon,
  Wallet,
  Calendar,
  Building2,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import React from "react";

// Import the features data
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

export default function Features() {
  return (
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
  );
}
