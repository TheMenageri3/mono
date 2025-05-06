"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NotepadSectionProps {
  title: string;
  children: ReactNode;
}

export function NotepadSection({ title, children }: NotepadSectionProps) {
  return (
    <div className="relative">
      {/* Lines overlay for notepad effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_31px,#e5e5e5_31px,#e5e5e5_32px)] dark:bg-[linear-gradient(to_bottom,transparent_31px,#333_31px,#333_32px)] bg-[size:100%_32px] opacity-20 pointer-events-none"></div>

      {/* Red margin line */}
      <div className="absolute left-[30px] top-0 bottom-0 w-px bg-red-400 opacity-40"></div>

      {/* Content container */}
      <div className="relative bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-8 shadow-sm">
        <motion.h2
          className="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-100 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h2>

        {/* Text with line height matching the notepad lines */}
        <div className="text-neutral-600 dark:text-neutral-300 leading-[32px] pl-10">
          {children}
        </div>

        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-[url('/textures/paper.png')] opacity-10 mix-blend-overlay pointer-events-none rounded-xl"></div>
      </div>
    </div>
  );
}
