"use client";

import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Clock,
  File,
  MessageSquare,
  Plus,
  Users,
  FileEdit,
  GitBranch,
} from "lucide-react";

// Types for timeline items
type TimelineEventType =
  | "file-added"
  | "comment"
  | "milestone"
  | "member-joined"
  | "task-completed"
  | "update"
  | "code-commit";

interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description?: string;
  dateTime: string; // ISO string format
  user: {
    name: string;
    avatar?: string;
  };
  metadata?: {
    fileName?: string;
    fileSize?: string;
    commentCount?: number;
    taskName?: string;
    commitId?: string;
    branch?: string;
    milestoneTitle?: string;
  };
}

interface ProjectTimelineProps {
  events: TimelineEvent[];
}

export default function ProjectTimeline({ events }: ProjectTimelineProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Format the time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Get icon based on event type
  const getEventIcon = (type: TimelineEventType) => {
    switch (type) {
      case "file-added":
        return <File className="h-4 w-4" />;
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      case "milestone":
        return <CheckCircle className="h-4 w-4" />;
      case "member-joined":
        return <Users className="h-4 w-4" />;
      case "task-completed":
        return <CheckCircle className="h-4 w-4" />;
      case "update":
        return <FileEdit className="h-4 w-4" />;
      case "code-commit":
        return <GitBranch className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Get badge color based on event type
  const getBadgeClass = (type: TimelineEventType) => {
    switch (type) {
      case "file-added":
        return "bg-blue-600/20 text-blue-200 border-blue-400/20";
      case "comment":
        return "bg-amber-600/20 text-amber-200 border-amber-400/20";
      case "milestone":
        return "bg-green-600/20 text-green-200 border-green-400/20";
      case "member-joined":
        return "bg-purple-600/20 text-purple-200 border-purple-400/20";
      case "task-completed":
        return "bg-green-600/20 text-green-200 border-green-400/20";
      case "update":
        return "bg-indigo-600/20 text-indigo-200 border-indigo-400/20";
      case "code-commit":
        return "bg-orange-600/20 text-orange-200 border-orange-400/20";
      default:
        return "bg-gray-600/20 text-gray-200 border-gray-400/20";
    }
  };

  // Group events by date for better visual organization
  const groupEventsByDate = (events: TimelineEvent[]) => {
    const grouped = new Map<string, TimelineEvent[]>();

    events.forEach((event) => {
      const date = new Date(event.dateTime).toLocaleDateString();
      if (!grouped.has(date)) {
        grouped.set(date, []);
      }
      grouped.get(date)!.push(event);
    });

    // Convert to array sorted by date (newest first)
    return Array.from(grouped.entries())
      .sort(
        ([dateA], [dateB]) =>
          new Date(dateB).getTime() - new Date(dateA).getTime()
      )
      .map(([date, events]) => ({
        date,
        formattedDate: new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
        events: events.sort(
          (a, b) =>
            new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
        ),
      }));
  };

  const groupedEvents = groupEventsByDate(events);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">Project Timeline</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {groupedEvents.length > 0 ? (
        <div className="space-y-8">
          {groupedEvents.map((group, groupIndex) => (
            <div key={group.date} className="relative">
              {/* Date header */}
              <div className="sticky top-0 z-20 bg-background mb-4 flex items-center">
                <div className="w-[2px] h-6 bg-primary/40 mr-3"></div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  {group.formattedDate}
                </h4>
              </div>

              {/* Timeline events */}
              <motion.div
                className="space-y-4 pl-4 ml-[1px]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {group.events.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Timeline dot and line */}
                    <div className="absolute left-[-17px] top-0 bottom-0 w-[2px] bg-border"></div>
                    <div
                      className={cn(
                        "absolute left-[-24px] top-2 w-6 h-6 rounded-full",
                        "flex items-center justify-center border",
                        getBadgeClass(event.type)
                      )}
                    >
                      {getEventIcon(event.type)}
                    </div>

                    <Card className="overflow-hidden bg-card hover:bg-muted/5 transition-colors">
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={event.user.avatar}
                                alt={event.user.name}
                              />
                              <AvatarFallback className="text-xs">
                                {event.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {event.user.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                getBadgeClass(event.type)
                              )}
                            >
                              {event.type.split("-").join(" ")}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(event.dateTime)}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-medium mb-1">{event.title}</h3>

                        {event.description && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {event.description}
                          </p>
                        )}

                        {/* Metadata based on event type */}
                        {event.type === "file-added" &&
                          event.metadata?.fileName && (
                            <div className="flex items-center p-2 bg-muted/30 rounded-md text-xs">
                              <File className="h-3.5 w-3.5 mr-2 text-blue-400" />
                              <span>{event.metadata.fileName}</span>
                              {event.metadata.fileSize && (
                                <span className="ml-auto text-muted-foreground">
                                  {event.metadata.fileSize}
                                </span>
                              )}
                            </div>
                          )}

                        {event.type === "code-commit" &&
                          event.metadata?.commitId && (
                            <div className="flex items-center p-2 bg-muted/30 rounded-md text-xs">
                              <GitBranch className="h-3.5 w-3.5 mr-2 text-orange-400" />
                              <span className="font-mono">
                                {event.metadata.commitId.substring(0, 7)}
                              </span>
                              {event.metadata.branch && (
                                <span className="ml-auto text-muted-foreground">
                                  on {event.metadata.branch}
                                </span>
                              )}
                            </div>
                          )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No timeline events yet. Add your first event to start tracking project
          progress.
        </div>
      )}
    </div>
  );
}
