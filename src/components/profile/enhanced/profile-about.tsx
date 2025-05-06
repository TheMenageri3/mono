"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProfileAboutProps {
  profile: any;
  activeSection: boolean;
}

export default function ProfileAbout({
  profile,
  activeSection,
}: ProfileAboutProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Staggered animation for container children
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

  // Generate avatar initials as fallback
  const initials = profile.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="relative"
    >
      {/* Glass card container */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-3xl backdrop-blur-md bg-white/[0.01] border border-white/10 shadow-[0_8px_32px_0_rgba(91,38,135,0.1)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Avatar with glow effect */}
            <motion.div variants={item} className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500" />
              <Avatar className="h-28 w-28 border-2 border-white/10 relative">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-fuchsia-600 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            {/* Profile info */}
            <div className="flex-1">
              <motion.div variants={item} className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  {profile.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-white/70">@{profile.handle}</p>
                  <p className="text-white/70 hidden sm:block">•</p>
                  <p className="text-white/90 hidden sm:block">
                    {profile.role}
                  </p>
                  <Badge className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border-purple-500/30 font-normal">
                    {profile.status}
                  </Badge>
                </div>
                <p className="text-white/90 block sm:hidden">{profile.role}</p>
              </motion.div>

              <motion.div variants={item} className="mt-4">
                <p className="text-lg text-white/80 leading-relaxed">
                  {profile.bio}
                </p>
              </motion.div>

              <div className="mt-6 flex items-center gap-4">
                {/* Personal website link */}
                <div className="flex items-center text-white/70">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <a
                    href={`https://${profile.links.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    {profile.links.website}
                  </a>
                </div>
              </div>

              <motion.div
                variants={item}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                {/* Social links */}
                {[
                  {
                    icon: <Github className="h-5 w-5" />,
                    label: "GitHub",
                    href: `https://${profile.links.github}`,
                    color: "from-neutral-300 to-neutral-100",
                  },
                  {
                    icon: <Twitter className="h-5 w-5" />,
                    label: "Twitter",
                    href: `https://${profile.links.twitter}`,
                    color: "from-sky-400 to-sky-300",
                  },
                  {
                    icon: <Linkedin className="h-5 w-5" />,
                    label: "LinkedIn",
                    href: `https://${profile.links.linkedin}`,
                    color: "from-blue-400 to-blue-300",
                  },
                  {
                    icon: <Mail className="h-5 w-5" />,
                    label: "Email",
                    href: `mailto:${profile.links.email}`,
                    color: "from-purple-400 to-fuchsia-300",
                  },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="sr-only">{link.label}</span>
                    <div className="relative flex items-center gap-2 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <span
                        className={`
                        rounded-full p-2
                        ${
                          hoveredLink === link.label
                            ? "text-white"
                            : "text-white/70"
                        }
                        transition-all duration-300
                      `}
                      >
                        {link.icon}
                      </span>

                      <span
                        className={`
                        text-sm text-white/80
                        absolute left-9 whitespace-nowrap opacity-0 scale-95 origin-left
                        ${
                          hoveredLink === link.label
                            ? "opacity-100 scale-100"
                            : ""
                        }
                        transition-all duration-300
                      `}
                      >
                        {link.label}
                      </span>
                    </div>
                  </a>
                ))}

                <Button
                  variant="outline"
                  asChild
                  className="ml-auto bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                >
                  <a
                    href={profile.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Location badge with floating animation - positioned half in and half out */}
      <motion.div
        variants={item}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute -bottom-5 left-12"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-white/80">{profile.location}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
