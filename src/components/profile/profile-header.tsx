"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Twitter,
  Linkedin,
  Dribbble,
  MapPin,
  Calendar,
  Clock,
  MessageSquare,
  UserPlus,
} from "lucide-react";
import { fadeIn, staggerContainer } from "./animations";

interface SocialLink {
  platform: string;
  url: string;
}

interface ProfileHeaderProps {
  name: string;
  handle: string;
  tagline: string;
  avatar: string;
  location: string;
  availabilityStatus: string;
  memberSince: string;
  socialLinks: SocialLink[];
}

export default function ProfileHeader({
  name,
  handle,
  tagline,
  avatar,
  location,
  availabilityStatus,
  memberSince,
  socialLinks,
}: ProfileHeaderProps) {
  // Function to render the appropriate social icon based on platform
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <Github className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "dribbble":
        return <Dribbble className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // Determine the status color
  const statusColor = availabilityStatus.toLowerCase().includes("available")
    ? "bg-green-500"
    : "bg-amber-500";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="relative rounded-2xl overflow-hidden"
    >
      {/* Background gradient header */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-md border border-white/10 rounded-2xl z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 p-8 md:p-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Avatar section */}
          <motion.div variants={fadeIn} className="flex-shrink-0">
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border-2 border-purple-500/50">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Status indicator */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${statusColor} animate-pulse`}
              />
              <span className="text-sm font-medium">{availabilityStatus}</span>
            </div>
          </motion.div>

          {/* Profile info section */}
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <motion.div variants={fadeIn}>
                <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  {name}
                </h1>
                <p className="text-lg text-purple-200/80">{handle}</p>
                <p className="text-xl mt-2 text-gray-300">{tagline}</p>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-500 text-purple-200 hover:bg-purple-950/50"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </motion.div>
            </div>

            {/* Additional profile details */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mt-4"
            >
              {/* Location and Member since */}
              <motion.div variants={fadeIn} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">{location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">
                    Member since {memberSince}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">Last active: Today</span>
                </div>
              </motion.div>

              {/* Stats and badges */}
              <motion.div variants={fadeIn} className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-indigo-900/50 hover:bg-indigo-800/50 text-indigo-200 backdrop-blur-sm">
                    Pro Member
                  </Badge>
                  <Badge className="bg-purple-900/50 hover:bg-purple-800/50 text-purple-200 backdrop-blur-sm">
                    Top Contributor
                  </Badge>
                  <Badge className="bg-violet-900/50 hover:bg-violet-800/50 text-violet-200 backdrop-blur-sm">
                    Design Expert
                  </Badge>
                </div>

                {/* Social links */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {renderSocialIcon(link.platform)}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
