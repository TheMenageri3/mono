"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Quote } from "lucide-react";
import { fadeIn, staggerContainer } from "./animations";

interface ProfileAboutProps {
  bio: string;
  interests: string[];
  careerHighlights: string[];
  personalStatement: string;
}

export default function ProfileAbout({
  bio,
  interests,
  careerHighlights,
  personalStatement,
}: ProfileAboutProps) {
  const [expanded, setExpanded] = useState(false);

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
        <motion.h2
          variants={fadeIn}
          className="text-2xl font-bold mb-6 flex items-center"
        >
          About
        </motion.h2>

        <div className="space-y-8">
          {/* Main bio */}
          <motion.div variants={fadeIn}>
            <p className="text-lg text-gray-200 leading-relaxed">{bio}</p>
          </motion.div>

          {/* Interests */}
          <motion.div variants={fadeIn} className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-200">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <Badge
                  key={index}
                  className="bg-purple-900/40 hover:bg-purple-800/40 text-purple-100 py-1 px-3 backdrop-blur-sm"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Career Highlights */}
          <motion.div variants={fadeIn} className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-200">
              Career Highlights
            </h3>
            <ul className="space-y-2 text-gray-200">
              {careerHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Personal Statement */}
          <motion.div variants={fadeIn} className="space-y-3">
            <div className="flex items-center gap-2">
              <Quote className="text-purple-400" />
              <h3 className="text-xl font-semibold text-purple-200">
                Personal Statement
              </h3>
            </div>
            <div className="pl-4 border-l-2 border-purple-500/50">
              <p className="italic text-gray-300">{personalStatement}</p>
            </div>
          </motion.div>

          {/* Expandable section */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 overflow-hidden"
              >
                {/* Additional information that shows when expanded */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-purple-200">
                    Education
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white">
                        M.S. Computer Science
                      </p>
                      <p className="text-gray-300">
                        Stanford University, 2016-2018
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        B.S. Software Engineering
                      </p>
                      <p className="text-gray-300">
                        University of California, 2012-2016
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-purple-200">
                    Languages
                  </h3>
                  <div className="flex gap-4">
                    <div>
                      <p className="font-medium text-white">English</p>
                      <p className="text-gray-300">Native</p>
                    </div>
                    <div>
                      <p className="font-medium text-white">Spanish</p>
                      <p className="text-gray-300">Fluent</p>
                    </div>
                    <div>
                      <p className="font-medium text-white">French</p>
                      <p className="text-gray-300">Basic</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <motion.button
            variants={fadeIn}
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm text-purple-300 hover:text-purple-200 transition-colors mt-2"
          >
            <span>{expanded ? "Show less" : "Show more"}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
