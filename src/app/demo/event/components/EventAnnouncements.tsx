"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Megaphone,
  Calendar,
  Pin,
  AlertCircle,
  AlertTriangle,
  Info,
  Bell,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock announcements data
const mockAnnouncements = [
  {
    id: "1",
    title: "House Rules and Guidelines",
    message:
      "Please review the house rules in your welcome packet. Quiet hours start at 11PM in the sleeping areas. Kitchen and common spaces are available 24/7 for late night hacking sessions.",
    priority: "high",
    date: "2025-01-14T15:30:00Z",
    author: "MTN DAO Team",
  },
  {
    id: "2",
    title: "Special Guest Announcement",
    message:
      "We're excited to announce that Anatoly Yakovenko will be joining us next week for a special fireside chat and Q&A session. Don't miss this opportunity to meet the co-founder of Solana!",
    priority: "high",
    date: "2025-01-21T09:00:00Z",
    author: "Barrett",
  },
  {
    id: "3",
    title: "Wi-Fi Access Information",
    message:
      "Connect to the network 'MTNDAO_2025' with password 'DefiBuilder2025' for high-speed internet access throughout the house.",
    priority: "medium",
    date: "2025-01-15T12:00:00Z",
    author: "Tech Support",
  },
  {
    id: "4",
    title: "Grocery Run Schedule",
    message:
      "We'll be making grocery runs every Tuesday and Friday. Please add your requests to the shared shopping list by 5PM the day before.",
    priority: "medium",
    date: "2025-01-16T10:00:00Z",
    author: "House Coordinator",
  },
  {
    id: "5",
    title: "Weekend Ski Trip Details",
    message:
      "This Saturday's ski trip to Park City Mountain Resort will depart at 8AM from the house. Equipment rentals have been arranged for those who requested it. Bring warm clothes and sunscreen!",
    priority: "low",
    date: "2025-01-18T14:30:00Z",
    author: "Activities Team",
  },
];

interface EventAnnouncementsProps {
  eventId: string;
}

export default function EventAnnouncements({
  eventId,
}: EventAnnouncementsProps) {
  // In a real app, you would fetch the announcements data based on the eventId
  const announcements = mockAnnouncements;

  // Function to format the date
  const formatAnnouncementDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }) +
      " at " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  // Function to get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/30 bg-red-500/10";
      case "medium":
        return "border-yellow-500/30 bg-yellow-500/10";
      default:
        return "border-white/10 bg-white/5";
    }
  };

  // Function to get priority icon
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Pin className="h-4 w-4 text-red-400" />;
      case "medium":
        return <Pin className="h-4 w-4 text-yellow-400" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-400" />;
    }
  };
  // Variant for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  // Custom priority icon with better visuals
  const getPriorityIconEnhanced = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <div className="p-2 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="h-4 w-4 text-red-400" />
          </div>
        );
      case "medium":
        return (
          <div className="p-2 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Info className="h-4 w-4 text-blue-400" />
          </div>
        );
    }
  };
  // Get time distance from now
  const getTimeDistance = (dateString: string) => {
    const announcementDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - announcementDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffDays > 0) {
      return diffDays === 1 ? "yesterday" : `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    } else {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return diffMinutes < 5 ? "just now" : `${diffMinutes} minutes ago`;
    }
  };
  return (
    <Card className="border-white/10 bg-white/[0.005] backdrop-blur-xl overflow-hidden rounded-xl shadow-lg shadow-black/5 relative">
      <div className="absolute inset-0 bg-white/[0.003] pointer-events-none" />
      <div className="h-[1px] bg-white/10"></div>
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-white/10 p-2 rounded-lg mr-3 border border-white/10">
              <Megaphone className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Announcements</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-white/10 hover:border-white/20 bg-white/[0.005] hover:bg-white/[0.01] backdrop-blur-sm"
          >
            <Bell className="h-4 w-4 mr-2" />
            <span className="text-xs">Mark all as read</span>
          </Button>
        </div>
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {announcements.map((announcement) => {
            const isNew =
              new Date(announcement.date) >
              new Date(Date.now() - 24 * 60 * 60 * 1000);
            const timeDistance = getTimeDistance(announcement.date);

            return (
              <motion.div
                key={announcement.id}
                variants={itemVariants}
                className={cn(
                  "relative p-5 rounded-xl backdrop-blur-md border transition-all hover:shadow-sm overflow-hidden",
                  announcement.priority === "high"
                    ? "bg-white/[0.005] border-red-500/20 hover:shadow-red-900/5 hover:border-red-500/30"
                    : announcement.priority === "medium"
                    ? "bg-white/[0.005] border-amber-500/20 hover:shadow-amber-900/5 hover:border-amber-500/30"
                    : "bg-white/[0.005] border-white/10 hover:shadow-black/5 hover:border-white/20"
                )}
              >
                {/* Priority gradient overlay - extremely subtle */}
                <div
                  className={cn(
                    "absolute inset-0 pointer-events-none opacity-[0.005]", // Reduced from 0.015
                    announcement.priority === "high"
                      ? "bg-gradient-to-br from-red-500/3 via-transparent to-transparent" // Reduced from /5
                      : announcement.priority === "medium"
                      ? "bg-gradient-to-br from-amber-500/3 via-transparent to-transparent" // Reduced from /5
                      : "bg-gradient-to-br from-white/3 via-transparent to-transparent" // Reduced from /5
                  )}
                />

                {/* Subtle gradient border effect - extremely subtle */}
                <div
                  className={cn(
                    "absolute inset-0 pointer-events-none rounded-xl p-[1px] -m-[1px]",
                    announcement.priority === "high"
                      ? "bg-gradient-to-br from-red-500/10 via-red-500/3 to-transparent" // Reduced from 15/5
                      : announcement.priority === "medium"
                      ? "bg-gradient-to-br from-amber-500/10 via-amber-500/3 to-transparent" // Reduced from 15/5
                      : "bg-gradient-to-br from-white/7 via-white/3 to-transparent" // Reduced from 10/5
                  )}
                />

                {/* New indicator dot - more subtle */}
                {isNew && (
                  <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-purple-500/50 animate-pulse"></div>
                )}

                <div className="flex gap-4 relative z-10">
                  {announcement.priority === "high" ? (
                    <div className="p-2 rounded-full bg-white/5 border border-red-500/15 flex items-center justify-center shadow-sm shadow-red-900/3">
                      <AlertCircle className="h-4 w-4 text-red-400/50" />{" "}
                      {/* Reduced from /70 */}
                    </div>
                  ) : announcement.priority === "medium" ? (
                    <div className="p-2 rounded-full bg-white/5 border border-amber-500/15 flex items-center justify-center shadow-sm shadow-amber-900/3">
                      <AlertTriangle className="h-4 w-4 text-amber-400/50" />{" "}
                      {/* Reduced from /70 */}
                    </div>
                  ) : (
                    <div className="p-2 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Info className="h-4 w-4 text-white/60" />{" "}
                      {/* Reduced from /70 */}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <h3
                        className={cn(
                          "font-medium text-md",
                          announcement.priority === "high"
                            ? "text-white/95"
                            : announcement.priority === "medium"
                            ? "text-white/95"
                            : "text-white/90"
                        )}
                      >
                        {announcement.title}
                      </h3>

                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1 text-gray-400" />
                        <span>{timeDistance}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      {announcement.message}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="bg-white/10 text-xs text-white border border-white/10">
                            {announcement.author
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-400">
                          {announcement.author}
                        </span>
                      </div>

                      <Badge
                        className={cn(
                          "rounded-full text-xs font-normal",
                          announcement.priority === "high"
                            ? "bg-white/3 border border-red-500/15 text-red-300/70" // Reduced from /20 and /90
                            : announcement.priority === "medium"
                            ? "bg-white/3 border border-amber-500/15 text-amber-300/70" // Reduced from /20 and /90
                            : "bg-white/3 border border-white/10 text-white/70" // Reduced from /5 and /80
                        )}
                      >
                        {announcement.priority === "high"
                          ? "Critical"
                          : announcement.priority === "medium"
                          ? "Important"
                          : "Info"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View all button */}
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            className="border-white/10 bg-white/[0.005] hover:bg-white/[0.01] hover:border-white/20 transition-colors backdrop-blur-sm"
          >
            View All Announcements
          </Button>
        </div>
      </div>
    </Card>
  );
}
