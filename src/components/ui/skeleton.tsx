"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "card" | "avatar" | "input" | "button";
  animated?: boolean;
}

function Skeleton({
  className,
  variant = "default",
  animated = true,
  ...props
}: SkeletonProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const baseClass =
    "bg-muted/60 dark:bg-muted/30 rounded-md relative overflow-hidden";

  const variantClasses = {
    default: "",
    card: "w-full h-32",
    avatar: "rounded-full",
    input: "h-9",
    button: "h-9 w-20",
  };

  return (
    <div
      className={cn(baseClass, variantClasses[variant], className)}
      {...props}
    >
      {animated && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)"
              : "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.06), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["100% 0%", "-100% 0%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        />
      )}
    </div>
  );
}

export { Skeleton };
