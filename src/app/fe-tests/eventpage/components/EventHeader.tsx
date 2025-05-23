"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Users,
  ExternalLink,
  Share2,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface EventHeaderProps {
  event: {
    id: string;
    title: string;
    description: string;
    startDatetime: string;
    endDatetime: string;
    location: string;
    virtual: boolean;
    virtualUrl?: string;
    type: string;
    status: string;
    attendeeCount: number;
  };
  isAttending: boolean;
  onAttendanceChange: (attending: boolean) => void;
}

export default function EventHeader({
  event,
  isAttending,
  onAttendanceChange,
}: EventHeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [expandDescription, setExpandDescription] = useState(false);

  // Format date helper function
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time helper function
  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const description = event.description;
  const shortDescription =
    description.length > 300 && !expandDescription
      ? `${description.substring(0, 300)}...`
      : description;

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.h1
            className="text-3xl font-bold text-white/90"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {event.title}
          </motion.h1>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border border-white/10 bg-white/[0.003] text-white/80 px-3 backdrop-blur-lg"
            >
              {event.type}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "border px-3 backdrop-blur-lg",
                event.status === "PUBLISHED"
                  ? "border-green-400/20 bg-green-400/[0.003] text-green-100/90"
                  : event.status === "COMPLETED"
                  ? "border-blue-400/20 bg-blue-400/[0.003] text-blue-100/90"
                  : "border-amber-400/20 bg-amber-400/[0.003] text-amber-100/90"
              )}
            >
              {event.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 bg-white/[0.003] p-4 rounded-lg border border-white/5 backdrop-blur-xl relative">
          <div className="absolute inset-0 bg-purple-900/[0.005] pointer-events-none rounded-lg" />
          <div className="flex items-center relative z-10">
            <div className="h-10 w-10 bg-white/[0.008] rounded-full flex items-center justify-center mr-3 border border-white/5">
              <CalendarDays className="h-5 w-5 text-white/90" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">Date & Time</p>
              <p className="text-xs text-gray-400">
                {formatEventDate(event.startDatetime)}
                <br />
                {formatEventTime(event.startDatetime)} -{" "}
                {formatEventTime(event.endDatetime)}
              </p>
            </div>
          </div>

          <div className="flex items-center relative z-10">
            <div className="h-10 w-10 bg-white/[0.008] rounded-full flex items-center justify-center mr-3 border border-white/5">
              <MapPin className="h-5 w-5 text-white/90" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">Location</p>
              <p className="text-xs text-gray-400">{event.location}</p>
              {event.virtual && event.virtualUrl && (
                <a
                  href={event.virtualUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-xs text-purple-300/60 hover:text-purple-300/80 transition-colors mt-0.5"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span>Virtual Link</span>
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center relative z-10">
            <div className="h-10 w-10 bg-white/[0.008] rounded-full flex items-center justify-center mr-3 border border-white/5">
              <Users className="h-5 w-5 text-white/90" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">Attendees</p>
              <p className="text-xs text-gray-400">
                {event.attendeeCount} attending
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => onAttendanceChange(!isAttending)}
              className={cn(
                "rounded-lg transition-all text-white",
                isAttending
                  ? "bg-white/[0.008] hover:bg-white/[0.02] border border-purple-500/20 hover:border-purple-500/30 shadow-sm backdrop-blur-xl"
                  : "bg-white/[0.005] hover:bg-white/[0.01] border border-white/10 hover:border-purple-500/20 shadow-sm backdrop-blur-xl"
              )}
              size="lg"
            >
              {isAttending ? "I'm Attending" : "Attend Event"}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-white/5 bg-white/[0.003] hover:bg-white/[0.01] backdrop-blur-xl"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark
                className={cn(
                  "h-4 w-4 text-white/70",
                  isBookmarked && "fill-purple-400/50 text-purple-400/50"
                )}
              />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-white/5 bg-white/[0.003] hover:bg-white/[0.01] backdrop-blur-xl"
            >
              <Share2 className="h-4 w-4 text-white/70" />
            </Button>
          </div>

          <div className="text-xs text-gray-400/90 italic">
            {event.virtual ? "In-person & Virtual Event" : "In-person Event"}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium text-white/90">
            Event Description
          </h2>
          <div className="prose prose-sm prose-invert max-w-none text-gray-400 leading-relaxed">
            {shortDescription.split("\n").map((paragraph, i) => (
              <p key={i} className="my-2">
                {paragraph}
              </p>
            ))}
          </div>
          {event.description.length > 300 && (
            <Button
              variant="outline"
              size="sm"
              className="text-white/80 hover:text-white/90 border-white/5 bg-white/[0.003] hover:bg-white/[0.008] hover:border-purple-500/10 transition-colors backdrop-blur-xl"
              onClick={() => setExpandDescription(!expandDescription)}
            >
              {expandDescription ? "Show less" : "Read more"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
