"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillPillProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart"
  > {
  name: string;
  level?: number; // 1-5 for skill level
  icon?: React.ReactNode;
}

export function SkillPill({
  name,
  level = 3,
  icon,
  className,
  ...props
}: SkillPillProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-gradient-to-br from-purple-900/60 to-purple-800/40",
        "border border-purple-700/30 shadow-md shadow-purple-900/30",
        "relative overflow-hidden",
        className
      )}
      whileHover={{
        scale: 1.05,
        y: -2,
        boxShadow: "0 15px 20px -5px rgba(76, 29, 149, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      {...props}
    >
      {/* Inner highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none" />

      {/* Icon */}
      {icon && <div className="relative z-10 text-purple-300">{icon}</div>}

      {/* Skill name */}
      <span className="relative z-10 text-sm font-medium text-purple-100">
        {name}
      </span>

      {/* Skill level dots */}
      <div className="relative z-10 flex items-center gap-0.5 ml-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1 h-1 rounded-full",
              i < level ? "bg-purple-300" : "bg-purple-700/50"
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}
