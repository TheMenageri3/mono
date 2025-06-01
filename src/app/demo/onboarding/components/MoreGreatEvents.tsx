"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Network,
  Target,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  provider: string;
  description: string;
  longDescription: string;
  matchScore: number;
  location: string;
  date: string;
  category: string;
  price: string;
  tags: string[];
  attendees: number;
  maxAttendees?: number;
  reasons: string[];
  highlights: string[];
  difficulty?: string;
  format?: string;
}

interface MoreGreatEventsProps {
  events: Event[];
  selectedEvents: string[];
  onToggleSelection: (eventId: string) => void;
}

export default function MoreGreatEvents({
  events,
  selectedEvents,
  onToggleSelection,
}: MoreGreatEventsProps) {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length);
  };
  // Auto-rotate through events every 5 seconds, pausing on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextEvent, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentEvent = events[currentEventIndex];

  if (!currentEvent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="mb-16"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Network className="h-7 w-7 text-violet-400" />
          <h2 className="text-3xl font-bold text-white">More Great Events</h2>
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1">
            {events.length} More Options
          </Badge>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          {" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevEvent}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm text-white/60 px-3">
            {currentEventIndex + 1} / {events.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextEvent}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Event Card */}
        <div className="lg:col-span-2">
          {" "}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={() => onToggleSelection(currentEvent.id)}
              className="cursor-pointer"
            >
              <Card
                className={`transition-all duration-300 h-full ${
                  selectedEvents.includes(currentEvent.id)
                    ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/50 shadow-xl shadow-blue-500/20"
                    : "bg-white/[0.02] border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.05]"
                }`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">
                          {currentEvent.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-blue-300 border-blue-500/30"
                        >
                          {currentEvent.matchScore}% Match
                        </Badge>
                      </div>
                      <p className="text-blue-300 font-semibold text-lg mb-4">
                        {currentEvent.provider}
                      </p>
                    </div>

                    {selectedEvents.includes(currentEvent.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"
                      >
                        <CheckCircle className="h-6 w-6 text-white" />
                      </motion.div>
                    )}
                  </div>

                  <p className="text-white/70 text-base mb-6 leading-relaxed">
                    {currentEvent.longDescription || currentEvent.description}
                  </p>

                  {/* Enhanced Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-white/70">
                      <Calendar className="h-5 w-5 text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {currentEvent.date}
                        </div>
                        <div className="text-xs">{currentEvent.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <MapPin className="h-5 w-5 text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {currentEvent.location}
                        </div>
                        <div className="text-xs">
                          {currentEvent.format || "Hybrid"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Users className="h-5 w-5 text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {currentEvent.attendees.toLocaleString()} attending
                        </div>
                        {currentEvent.maxAttendees && (
                          <div className="text-xs">
                            {currentEvent.maxAttendees - currentEvent.attendees}{" "}
                            spots left
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Zap className="h-5 w-5 text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {currentEvent.price}
                        </div>
                        <div className="text-xs">
                          {currentEvent.difficulty || "All Levels"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why Recommended Section */}
                  {currentEvent.reasons && currentEvent.reasons.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-400" />
                        Why We Recommend This
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {currentEvent.reasons
                          .slice(0, 3)
                          .map((reason, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 text-white/80"
                            >
                              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                              <span className="text-sm">{reason}</span>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentEvent.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-blue-300 border-blue-500/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      className="text-white border-white/20 hover:bg-white/10"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelection(currentEvent.id);
                      }}
                      className={`${
                        selectedEvents.includes(currentEvent.id)
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                      }`}
                    >
                      {selectedEvents.includes(currentEvent.id) ? (
                        <>
                          <Heart className="h-4 w-4 mr-2 fill-current" />
                          Added
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4 mr-2" />
                          Add to List
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Event Highlights Sidebar */}
        <div className="space-y-6">
          {" "}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Card className="bg-white/[0.02] border border-white/10">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Event Highlights
                </h4>
                <div className="space-y-3">
                  {(currentEvent.highlights || [])
                    .slice(0, 4)
                    .map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-white/80"
                      >
                        <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          {/* Quick Stats */}{" "}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Card className="bg-white/[0.02] border border-white/10">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Quick Stats
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Match Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${currentEvent.matchScore}%` }}
                          transition={{ delay: 0.8, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-blue-300 text-sm font-medium">
                        {currentEvent.matchScore}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Popularity</span>
                    <span className="text-white text-sm font-medium">
                      {currentEvent.attendees > 1000
                        ? "High"
                        : currentEvent.attendees > 100
                        ? "Medium"
                        : "Intimate"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Category</span>
                    <Badge variant="outline" className="text-xs">
                      {currentEvent.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {" "}
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentEventIndex(index)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentEventIndex
                ? "bg-blue-400 w-8"
                : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
