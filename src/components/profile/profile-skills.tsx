"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "./animations";

interface Skill {
  name: string;
  proficiency: number;
  category: string;
}

interface ProfileSkillsProps {
  skills: Skill[];
}

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  // Filter skills based on selected category
  const filteredSkills = selectedCategory
    ? skills.filter((skill) => skill.category === selectedCategory)
    : skills;

  // Function to determine color based on proficiency
  const getColorClass = (proficiency: number) => {
    if (proficiency >= 90) return "from-purple-500 to-indigo-500";
    if (proficiency >= 75) return "from-blue-500 to-indigo-400";
    if (proficiency >= 60) return "from-indigo-400 to-purple-300";
    return "from-violet-400 to-purple-300";
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="relative rounded-2xl overflow-hidden"
    >
      {/* Background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-md border border-white/10 rounded-2xl z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 p-8 md:p-10">
        <motion.h2 variants={fadeIn} className="text-2xl font-bold mb-6">
          Skills & Technologies
        </motion.h2>

        {/* Category filter */}
        <motion.div variants={fadeIn} className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              selectedCategory === null
                ? "bg-purple-600 text-white"
                : "bg-white/10 hover:bg-white/20 text-gray-300"
            }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 hover:bg-white/20 text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={fadeIn}
              className="relative bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-purple-500/50 transition-colors"
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <span className="text-sm text-gray-300">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${getColorClass(
                      skill.proficiency
                    )}`}
                  />
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">
                    {skill.category}
                  </span>

                  {/* Experience level based on proficiency */}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                    {skill.proficiency >= 90
                      ? "Expert"
                      : skill.proficiency >= 75
                      ? "Advanced"
                      : skill.proficiency >= 60
                      ? "Intermediate"
                      : "Beginner"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
