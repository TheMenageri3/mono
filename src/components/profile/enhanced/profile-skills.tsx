"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Skill {
  category: string;
  items: string[];
}

interface ProfileSkillsProps {
  skills: Skill[];
  activeSection: boolean;
}

export default function ProfileSkills({
  skills,
  activeSection,
}: ProfileSkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const skillVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  };

  // Get a random delay for more organic animations
  const getRandomDelay = () => (Math.random() * 0.3).toFixed(2);

  return (
    <motion.div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold inline-block">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Skills & Expertise
          </span>
        </h2>
        <p className="mt-3 text-white/60 max-w-3xl">
          My technical toolkit and areas of expertise, carefully cultivated
          through years of professional experience and continuous learning.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skills.map((skill, skillIndex) => (
          <motion.div
            key={skill.category}
            variants={item}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/[0.01] border border-white/10"
          >
            {/* Animated background patterns for each skill category */}
            <div className="absolute inset-0 opacity-10">
              {skillIndex === 0 && (
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              )}
              {skillIndex === 1 && (
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="dots"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle
                        cx="2"
                        cy="2"
                        r="1"
                        fill="rgba(255,255,255,0.3)"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              )}
              {skillIndex === 2 && (
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="diagonal"
                      width="10"
                      height="10"
                      patternUnits="userSpaceOnUse"
                      patternTransform="rotate(45)"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="10"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#diagonal)" />
                </svg>
              )}
            </div>

            {/* Subtle animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none" />

            {/* Create a light beam effect that moves on hover */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000"
              style={{
                width: "200%",
                transform:
                  skillIndex === 0
                    ? "translateX(-100%)"
                    : skillIndex === 1
                    ? "translateX(0%)"
                    : "translateX(100%)",
                opacity: 0.1,
              }}
            />

            <div className="relative z-10 p-6">
              <h3 className="text-xl font-medium mb-2 text-white/90">
                {skill.category}
              </h3>

              <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-4" />

              <motion.div variants={container} className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <motion.div
                    key={item}
                    variants={skillVariant}
                    transition={{
                      duration: 0.3,
                      delay: Number(getRandomDelay()),
                    }}
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => setHoveredSkill(item)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <Badge
                      className={`
                        py-1.5 px-3 transition-all duration-300 cursor-default
                        ${
                          hoveredSkill === item
                            ? "bg-gradient-to-r from-purple-500/50 to-fuchsia-500/50 text-white border-purple-400/30"
                            : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
                        }
                      `}
                    >
                      {item}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
