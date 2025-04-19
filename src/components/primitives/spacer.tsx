"use client";

import { cn } from "@/lib/utils";

interface SpacerProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  axis?: "horizontal" | "vertical";
  className?: string;
}

export function Spacer({
  size = 4,
  axis = "vertical",
  className,
}: SpacerProps) {
  return (
    <div
      className={cn(
        axis === "horizontal" ? `w-${size}` : `h-${size}`,
        className
      )}
      aria-hidden="true"
    />
  );
}
