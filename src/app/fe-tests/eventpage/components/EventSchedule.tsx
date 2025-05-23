"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarDays,
  Users,
  Clock3,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Mock schedule data
const mockSchedule = {
  days: [
    {
      date: "2025-05-23",
      name: "Day 1",
      events: [
        {
          id: "1",
          title: "Registration & Welcome Coffee",
          startTime: "08:00",
          endTime: "09:00",
          location: "Main Lobby",
          description:
            "Pick up your badge and enjoy complimentary coffee while networking with other attendees.",
          speakers: [],
        },
        {
          id: "2",
          title: "Opening Keynote: The Future of Web3",
          startTime: "09:00",
          endTime: "10:00",
          location: "Grand Ballroom",
          description:
            "Join our keynote speaker as they discuss the evolving landscape of Web3 technologies and what to expect in the coming years.",
          speakers: [
            {
              id: "s1",
              name: "Anatoly Yakovenko",
              role: "Co-Founder, Solana",
              avatar: "/images/speakers/anatoly.jpg",
            },
          ],
        },
        {
          id: "3",
          title: "Workshop: Building on Solana",
          startTime: "10:15",
          endTime: "12:00",
          location: "Workshop Room A",
          description:
            "A hands-on workshop for developers interested in building decentralized applications on Solana.",
          speakers: [
            {
              id: "s2",
              name: "Jane Developer",
              role: "Lead Developer, Solana Labs",
              avatar: "/images/speakers/jane.jpg",
            },
          ],
        },
        {
          id: "4",
          title: "Networking Lunch",
          startTime: "12:00",
          endTime: "13:30",
          location: "Dining Hall",
          description:
            "Enjoy lunch while networking with fellow attendees, speakers, and sponsors.",
          speakers: [],
        },
      ],
    },
    {
      date: "2025-05-24",
      name: "Day 2",
      events: [
        {
          id: "5",
          title: "Breakfast & Networking",
          startTime: "08:30",
          endTime: "09:30",
          location: "Main Lobby",
          description:
            "Start your day with breakfast and networking opportunities.",
          speakers: [],
        },
        {
          id: "6",
          title: "Panel Discussion: DeFi Innovations",
          startTime: "09:30",
          endTime: "11:00",
          location: "Grand Ballroom",
          description:
            "Industry experts discuss the latest innovations and challenges in decentralized finance.",
          speakers: [
            {
              id: "s3",
              name: "Alex Financial",
              role: "CTO, DeFiProtocol",
              avatar: "/images/speakers/alex.jpg",
            },
            {
              id: "s4",
              name: "Michael Trader",
              role: "Founder, TradeChain",
              avatar: "/images/speakers/michael.jpg",
            },
          ],
        },
        {
          id: "7",
          title: "Workshop: NFT Creation and Minting",
          startTime: "11:15",
          endTime: "13:00",
          location: "Workshop Room B",
          description:
            "Learn how to create, mint, and market your own NFT collection on Solana.",
          speakers: [
            {
              id: "s5",
              name: "Sarah Artist",
              role: "NFT Artist & Developer",
              avatar: "/images/speakers/sarah.jpg",
            },
          ],
        },
      ],
    },
  ],
};

interface EventScheduleProps {
  eventId: string;
}

export default function EventSchedule({ eventId }: EventScheduleProps) {
  // In a real app, you would fetch the schedule data based on the eventId
  const schedule = mockSchedule;

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Format time helper function
  const formatTime = (time: string) => {
    // Convert 24-hour time format to 12-hour with AM/PM
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <Card className="border-white/10 bg-white/[0.01] backdrop-blur-xl overflow-hidden rounded-xl shadow-lg shadow-black/5 relative">
      <div className="absolute inset-0 bg-white/[0.005] pointer-events-none" />
      <div className="h-[1px] bg-white/10"></div>
      <div className="p-6 relative z-10">
        <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
          <CalendarDays className="h-5 w-5 mr-2 text-white/80" />
          Event Schedule
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {schedule.days.map((day, index) => (
            <AccordionItem
              key={day.date}
              value={day.date}
              className="border-white/10 mb-4 overflow-hidden"
            >
              <AccordionTrigger className="hover:bg-white/5 hover:border-purple-500/20 px-4 py-3 rounded-lg transition-all hover:no-underline">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4 backdrop-blur-sm border border-white/10 hover:border-purple-500/20">
                    <Calendar className="h-5 w-5 text-white/80" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">{day.name}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <motion.div
                  className="space-y-6 pl-14"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {day.events.map((event) => (
                    <motion.div
                      key={event.id}
                      variants={itemVariants}
                      className="relative"
                    >
                      {/* Timeline dot and line with purple accents */}
                      <div className="absolute left-[-24px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/20 via-white/20 to-white/10"></div>
                      <div className="absolute left-[-34px] top-[14px] w-6 h-6 rounded-full bg-white/10 border border-purple-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-400/30"></div>
                      </div>

                      <Card className="bg-white/[0.005] border-white/10 hover:bg-white/[0.01] hover:border-purple-500/20 transition-all rounded-xl overflow-hidden relative backdrop-blur-md">
                        <div className="absolute inset-0 bg-purple-900/[0.01] pointer-events-none rounded-xl" />
                        <div className="p-4 relative z-10">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <h4 className="font-medium text-white group-hover:text-purple-200 transition-colors">
                              {event.title}
                            </h4>
                            <Badge className="bg-white/10 hover:bg-purple-500/15 text-white border-none self-start sm:self-auto backdrop-blur-sm">
                              {formatTime(event.startTime)} -{" "}
                              {formatTime(event.endTime)}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-300 mb-4">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center text-xs text-gray-400">
                              <MapPin className="h-3 w-3 mr-1 text-purple-300/50" />
                              <span>{event.location}</span>
                            </div>

                            {event.speakers && event.speakers.length > 0 && (
                              <div className="flex items-center">
                                <Users className="h-3.5 w-3.5 mr-1.5 text-purple-300/50" />
                                <span className="text-xs text-gray-400">
                                  {event.speakers.length === 1
                                    ? "1 speaker"
                                    : `${event.speakers.length} speakers`}
                                </span>
                              </div>
                            )}
                          </div>

                          {event.speakers && event.speakers.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-white/10">
                              <p className="text-xs text-gray-400 mb-2">
                                Speakers:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {event.speakers.map((speaker) => (
                                  <div
                                    key={speaker.id}
                                    className="flex items-center bg-white/5 rounded-full py-1 px-2 hover:bg-purple-500/10 transition-colors backdrop-blur-sm border border-white/10 hover:border-purple-500/20"
                                  >
                                    <Avatar className="h-5 w-5 mr-1.5">
                                      <AvatarFallback className="text-[10px] bg-purple-500/20 text-white">
                                        {speaker.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-gray-200">
                                      {speaker.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full border-white/10 bg-white/[0.005] hover:bg-purple-500/10 hover:border-purple-500/20 text-white hover:text-white transition-colors backdrop-blur-sm"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
        </div>
      </div>
    </Card>
  );
}
