"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface Experience {
  position: string;
  company: string;
  period: string;
  description: string;
}

interface ProfileExperienceHorizontalProps {
  experience: Experience[];
  activeSection: boolean;
}

export default function ProfileExperienceHorizontal({
  experience,
  activeSection,
}: ProfileExperienceHorizontalProps) {
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 pointer-events-none" />

        <div className="relative z-10 p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 rounded-full bg-white/10 text-white">
              <Briefcase className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-white/90">Experience</h2>
          </div>

          {/* Horizontal layout with flex and equal sizing for experience items */}
          <div className="flex flex-wrap gap-6">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={item}
                className="relative flex-1 min-w-[280px] border-l border-purple-500/20 pl-4"
              >
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-purple-500/40"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">{exp.position}</h3>
                    <span className="text-xs text-white/60 bg-white/5 px-2 py-0.5 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm">{exp.company}</p>
                  <p className="text-white/60 text-sm">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
