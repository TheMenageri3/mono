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
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {event.title}
          </motion.h1>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border border-purple-400/50 bg-purple-400/10 text-purple-100 px-3 backdrop-blur-sm"
            >
              {event.type}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "border px-3 backdrop-blur-sm",
                event.status === "PUBLISHED"
                  ? "border-green-400/50 bg-green-400/10 text-green-100"
                  : event.status === "COMPLETED"
                  ? "border-blue-400/50 bg-blue-400/10 text-blue-100"
                  : "border-amber-400/50 bg-amber-400/10 text-amber-100"
              )}
            >
              {event.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 bg-white/[0.01] p-4 rounded-lg border border-white/10 backdrop-blur-md relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none rounded-lg" />
          <div className="flex items-center relative z-10">
            <div className="h-10 w-10 bg-purple-500/10 rounded-full flex items-center justify-center mr-3">
              <CalendarDays className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Date & Time</p>
              <p className="text-xs text-gray-300">
                {formatEventDate(event.startDatetime)}
                <br />
                {formatEventTime(event.startDatetime)} -{" "}
                {formatEventTime(event.endDatetime)}
              </p>
            </div>
          </div>

          <div className="flex items-center relative z-10">
            <div className="h-10 w-10 bg-purple-500/10 rounded-full flex items-center justify-center mr-3">
              <MapPin className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Location</p>
              <p className="text-xs text-gray-300">{event.location}</p>
              {event.virtual && event.virtualUrl && (
                <a
                  href={event.virtualUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-xs text-purple-300 hover:text-purple-200 transition-colors mt-0.5"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span>Virtual Link</span>
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center relative z-10">
            <div className="h-10 w-10 bg-purple-500/10 rounded-full flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Attendees</p>
              <p className="text-xs text-gray-300">
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
                "rounded-lg transition-all",
                isAttending
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-700/20"
                  : "bg-white/5 hover:bg-white/10 border border-purple-500/50 shadow-md shadow-purple-900/10 backdrop-blur-sm"
              )}
              size="lg"
            >
              {isAttending ? "I'm Attending" : "Attend Event"}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-white/10 bg-white/[0.01] hover:bg-white/10 backdrop-blur-sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark
                className={cn(
                  "h-4 w-4",
                  isBookmarked && "fill-purple-400 text-purple-400"
                )}
              />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-white/10 bg-white/[0.01] hover:bg-white/10 backdrop-blur-sm"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-gray-400 italic">
            {event.virtual ? "In-person & Virtual Event" : "In-person Event"}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Event Description
          </h2>
          <div className="prose prose-sm prose-invert max-w-none text-gray-300 leading-relaxed">
            {shortDescription.split("\n").map((paragraph, i) => (
              <p key={i} className="my-2">
                {paragraph}
              </p>
            ))}
          </div>

          {event.description.length > 300 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-400 hover:text-purple-300 p-0 h-auto"
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
