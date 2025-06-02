"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface AITooltipProps {
  message: string;
  position: "left" | "right";
  className?: string;
}

export default function AITooltip({
  message,
  position,
  className = "",
}: AITooltipProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className={`relative ${className}`}>
      {/* AI Circle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
        onClick={() => setIsVisible(!isVisible)}
        className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20 hover:border-white/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src="/uni.svg"
          alt="AI Assistant"
          width={24}
          height={24}
          className="text-white"
        />

        {/* Pulsing Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Notification Dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500 border-2 border-black"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              x: position === "left" ? 20 : -20,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: position === "left" ? 20 : -20,
              y: 10,
            }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${
              position === "left"
                ? "left-full ml-4 top-1/2 -translate-y-1/2"
                : "right-full mr-4 top-1/2 -translate-y-1/2"
            } w-80`}
          >
            {/* Tooltip Card */}
            <div className="relative bg-white/[0.08] backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="h-3 w-3 text-white/70" />
              </button>
              {/* AI Icon & Header */}{" "}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Image
                    src="/uni.svg"
                    alt="AI Assistant"
                    width={16}
                    height={16}
                    className="text-white"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    AI Assistant
                  </h4>
                  <p className="text-xs text-white/60">Learning Tip</p>
                </div>
              </div>
              {/* Message */}
              <p className="text-sm text-white/80 leading-relaxed">{message}</p>
              {/* Arrow Pointer */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white/[0.08] border-t border-l border-white/20 rotate-45 ${
                  position === "left" ? "-left-1.5" : "-right-1.5"
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
