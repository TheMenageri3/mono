"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Twitter,
  Send,
  Wallet,
  Database,
  Layers,
  ArrowRight,
  Code,
  Zap,
} from "lucide-react";

// Import integrations data
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

// Helper function for glow color
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

export default function Integrations() {
  return (
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
            Seamlessly integrate with all your existing Web3 tools and platforms
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
                    {integration.icon}
                  </motion.div>

                  {/* Pulsing border effect */}
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
                  <span className="text-xs text-emerald-400/80">Connected</span>
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
  );
}
