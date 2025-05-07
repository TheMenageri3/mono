"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  ExternalLink,
  Code,
  Activity,
  FileText,
  Award,
  ArrowRight,
  CheckCircle,
  Bookmark,
  Flame,
  Zap,
} from "lucide-react";
import { fadeIn, slideIn, staggerContainer } from "./animations";

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  timeline: string;
  image: string;
  link: string;
  results: string;
}

// Activity interface
interface ActivityItem {
  id: number;
  type: string;
  project?: string;
  title?: string;
  description: string;
  date: string;
  version?: string;
  event?: string;
  link?: string;
}

// Bounty interface
interface Bounty {
  id: number;
  title: string;
  status: "open" | "completed";
  reward: string;
  difficulty: string;
  description: string;
  dueDate?: string;
  completedDate?: string;
}

interface ProfileProjectsSectionProps {
  projects: Project[];
  activities: ActivityItem[];
  bounties: Bounty[];
}

export default function ProfileProjectsSection({
  projects,
  activities,
  bounties,
}: ProfileProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState("projects");

  // Function to get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-600/40 text-green-200";
      case "medium":
        return "bg-amber-600/40 text-amber-200";
      case "hard":
        return "bg-red-600/40 text-red-200";
      default:
        return "bg-blue-600/40 text-blue-200";
    }
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
          Portfolio & Activity
        </motion.h2>

        {/* Tab navigation */}
        <motion.div
          variants={fadeIn}
          className="flex space-x-1 bg-white/5 backdrop-blur-md p-1 rounded-xl mb-8 w-fit"
        >
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "projects"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            <Code className="w-4 h-4 mr-2" />
            Projects
          </button>

          <button
            onClick={() => setActiveTab("activity")}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "activity"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            <Activity className="w-4 h-4 mr-2" />
            Activity
          </button>

          <button
            onClick={() => setActiveTab("bounties")}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "bounties"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            <Award className="w-4 h-4 mr-2" />
            Bounties
          </button>
        </motion.div>

        {/* Tab content with animations */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={slideIn("right")}
                    className="relative bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>

                      <p className="text-gray-300 mb-4">
                        {project.description}
                      </p>

                      {/* Technologies used */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            className="bg-indigo-900/40 text-indigo-100"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        <span>{project.timeline}</span>
                      </div>

                      {/* Results section */}
                      <div className="bg-white/5 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-1.5 text-purple-300 font-medium mb-1">
                          <Zap className="h-4 w-4" />
                          <span>Results</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {project.results}
                        </p>
                      </div>

                      <Button
                        asChild
                        variant="ghost"
                        className="text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 p-0 h-auto flex items-center gap-1 text-sm"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project{" "}
                          <ExternalLink className="h-3.5 w-3.5 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="relative border-l-2 border-purple-500/30 pl-6 ml-2 space-y-8">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    variants={fadeIn}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[2.35rem] bg-purple-600 rounded-full p-1.5">
                      {activity.type === "contribution" && (
                        <Code className="h-4 w-4" />
                      )}
                      {activity.type === "article" && (
                        <FileText className="h-4 w-4" />
                      )}
                      {activity.type === "release" && (
                        <Bookmark className="h-4 w-4" />
                      )}
                      {activity.type === "speaking" && (
                        <Activity className="h-4 w-4" />
                      )}
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                      {/* Activity header */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                        <div>
                          {activity.type === "contribution" && (
                            <Badge className="bg-green-900/40 text-green-200 mb-2">
                              Contribution
                            </Badge>
                          )}
                          {activity.type === "article" && (
                            <Badge className="bg-blue-900/40 text-blue-200 mb-2">
                              Article
                            </Badge>
                          )}
                          {activity.type === "release" && (
                            <Badge className="bg-amber-900/40 text-amber-200 mb-2">
                              Release
                            </Badge>
                          )}
                          {activity.type === "speaking" && (
                            <Badge className="bg-purple-900/40 text-purple-200 mb-2">
                              Speaking
                            </Badge>
                          )}

                          <h3 className="font-bold text-lg">
                            {activity.title ||
                              activity.project ||
                              activity.event}
                            {activity.version && (
                              <span className="ml-2 text-gray-400">
                                {activity.version}
                              </span>
                            )}
                          </h3>
                        </div>

                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="h-4 w-4 mr-1.5" />
                          <span>{activity.date}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-3">
                        {activity.description}
                      </p>

                      {/* Optional link */}
                      {activity.link && (
                        <Button
                          asChild
                          variant="ghost"
                          className="text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 p-0 h-auto flex items-center gap-1 text-sm"
                        >
                          <a
                            href={activity.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Learn more{" "}
                            <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "bounties" && (
            <motion.div
              key="bounties"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Open bounties */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Flame className="text-orange-400 h-5 w-5" />
                  <span>Open Bounties</span>
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {bounties
                    .filter((bounty) => bounty.status === "open")
                    .map((bounty) => (
                      <motion.div
                        key={bounty.id}
                        variants={fadeIn}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-lg">
                            {bounty.title}
                          </h4>
                          <div className="flex flex-col items-end">
                            <Badge className="bg-green-600/40 text-green-100">
                              {bounty.reward}
                            </Badge>
                            <p className="text-xs text-gray-400 mt-1">
                              Due: {bounty.dueDate}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-4">
                          {bounty.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <Badge
                            className={`${getDifficultyColor(
                              bounty.difficulty
                            )}`}
                          >
                            {bounty.difficulty}
                          </Badge>

                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Accept Challenge
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Completed bounties */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <CheckCircle className="text-green-400 h-5 w-5" />
                  <span>Completed Bounties</span>
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {bounties
                    .filter((bounty) => bounty.status === "completed")
                    .map((bounty) => (
                      <motion.div
                        key={bounty.id}
                        variants={fadeIn}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 opacity-80"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-lg">
                            {bounty.title}
                          </h4>
                          <div className="flex flex-col items-end">
                            <Badge className="bg-gray-600/40 text-gray-100">
                              {bounty.reward}
                            </Badge>
                            <p className="text-xs text-gray-400 mt-1">
                              Completed: {bounty.completedDate}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm mb-4">
                          {bounty.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <Badge className={`bg-gray-700 text-gray-300`}>
                            {bounty.difficulty}
                          </Badge>

                          <Badge className="bg-green-800/30 text-green-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
