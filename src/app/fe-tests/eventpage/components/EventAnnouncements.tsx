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
    title: "Schedule Change for Workshop A",
    message:
      "Due to high demand, we have moved the 'Building on Solana' workshop to the Grand Ballroom. Please note this location change for your schedule.",
    priority: "high",
    date: "2025-05-22T15:30:00Z",
    author: "Event Organizer",
  },
  {
    id: "2",
    title: "Special Guest Announcement",
    message:
      "We're excited to announce that Vitalik Buterin will be joining our closing panel discussion on cross-chain interoperability. Don't miss this opportunity!",
    priority: "high",
    date: "2025-05-21T09:00:00Z",
    author: "Event Organizer",
  },
  {
    id: "3",
    title: "Wi-Fi Access Information",
    message:
      "Connect to the network 'WebConf2025' with password 'blockchain4all' for high-speed internet access throughout the venue.",
    priority: "medium",
    date: "2025-05-20T12:00:00Z",
    author: "Event Support",
  },
  {
    id: "4",
    title: "Reminder: Bring Your Laptop",
    message:
      "For those attending the development workshops, please remember to bring your laptop with the required development environment already set up.",
    priority: "medium",
    date: "2025-05-19T10:00:00Z",
    author: "Workshop Coordinator",
  },
  {
    id: "5",
    title: "Afterparty Details",
    message:
      "Join us for the official afterparty on May 24th at 8PM at the Skybar Lounge. Your event badge will grant you entry.",
    priority: "low",
    date: "2025-05-18T14:30:00Z",
    author: "Social Events Team",
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
    <Card className="border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden rounded-xl shadow-lg shadow-purple-900/5">
      <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500"></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
              <Megaphone className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Announcements</h2>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-white/10 hover:border-purple-400/30 bg-white/5 hover:bg-white/10"
          >
            <Bell className="h-4 w-4 mr-2 text-purple-400" />
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
                  "relative p-5 rounded-xl backdrop-blur-md border transition-all hover:shadow-md",
                  announcement.priority === "high"
                    ? "bg-red-950/10 border-red-500/30 hover:shadow-red-900/10"
                    : announcement.priority === "medium"
                    ? "bg-amber-950/10 border-amber-500/30 hover:shadow-amber-900/10"
                    : "bg-white/5 border-white/10 hover:shadow-purple-900/10"
                )}
              >
                {/* New indicator dot for recently added announcements */}
                {isNew && (
                  <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                )}

                <div className="flex gap-4">
                  {getPriorityIconEnhanced(announcement.priority)}

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <h3 className="font-medium text-white text-md">
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
                          <AvatarFallback className="bg-purple-500/20 text-xs">
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
                            ? "bg-red-500/20 hover:bg-red-500/30 text-red-200 border-none"
                            : announcement.priority === "medium"
                            ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-200 border-none"
                            : "bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border-none"
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
            variant="ghost"
            className="text-purple-400 hover:text-purple-300 hover:bg-white/5"
          >
            View All Announcements
          </Button>
        </div>
      </div>
    </Card>
  );
}
