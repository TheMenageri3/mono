"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface ProfileEducationProps {
  education: Education;
  activeSection: boolean;
}

export default function ProfileEducation({
  education,
  activeSection,
}: ProfileEducationProps) {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="relative"
    >
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/[0.01] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.1)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5 pointer-events-none" />

        <div className="relative z-10 p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 rounded-full bg-white/10 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-white/90">Education</h2>
          </div>

          <motion.div variants={item} className="space-y-1">
            <h3 className="font-medium text-white">{education.degree}</h3>
            <p className="text-white/80 text-sm">{education.institution}</p>
            <p className="text-white/60 text-sm">Class of {education.year}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
