"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  bgColor?: string;
  icon?: string;
  image?: string;
  tags: string[];
  link: string;
}

interface ProfileProjectsProps {
  projects: Project[];
  activeSection: boolean;
}

export default function ProfileProjects({
  projects,
  activeSection,
}: ProfileProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold inline-block">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Featured Projects
          </span>
        </h2>
        <p className="mt-3 text-white/60 max-w-2xl">
          A selection of my most impactful work, showcasing my approach to
          design and development challenges.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 gap-8"
      >
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            className="group relative block"
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/[0.01] border border-white/10 transition-all duration-500 group-hover:border-purple-500/30">
              {/* Background gradient that changes on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col lg:flex-row">
                {/* Project image or icon area */}
                <div className="relative w-full lg:w-64 h-60 overflow-hidden">
                  {project.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
                      />
                      {/* Overlay to ensure text readability */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20">
                      {project.icon}
                    </div>
                  )}

                  {/* Project title - mobile only */}
                  <div className="absolute inset-0 flex items-center justify-center lg:hidden bg-black/30 p-6">
                    <h3 className="text-2xl font-bold text-center text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Project content */}
                <div className="flex-1 p-6 lg:p-8">
                  {/* Project title - desktop */}
                  <h3 className="text-2xl font-bold hidden lg:block mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-white/70 mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center text-sm text-purple-300 font-medium">
                    <span>View Project</span>
                    <motion.div
                      animate={{
                        x: hoveredProject === index ? 5 : 0,
                        opacity: hoveredProject === index ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover light effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  <div className="absolute -inset-px rounded-2xl border border-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-purple-500/20 blur-[80px] group-hover:bg-purple-500/30 transition-colors duration-500" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}
