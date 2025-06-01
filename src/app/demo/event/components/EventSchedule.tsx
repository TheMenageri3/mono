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
      date: "2025-01-15",
      name: "Week 1",
      events: [
        {
          id: "1",
          title: "Welcome Reception & Check-in",
          startTime: "09:00",
          endTime: "12:00",
          location: "MTN DAO House",
          description:
            "Welcome to MTN DAO 2025! Check in, get your welcome pack, and meet your fellow builders over coffee and breakfast.",
          speakers: [],
        },
        {
          id: "2",
          title: "Opening Keynote: The State of Solana",
          startTime: "14:00",
          endTime: "15:30",
          location: "Main Hall",
          description:
            "Barrett and the MTN DAO team outline the vision for the month ahead and discuss the current state of the Solana ecosystem.",
          speakers: [
            {
              id: "s1",
              name: "Barrett",
              role: "Co Founder, Ranger",
              avatar: "/images/speakers/barrett.jpg",
            },
          ],
        },
        {
          id: "3",
          title: "DeFi Protocol Workshop",
          startTime: "16:00",
          endTime: "18:00",
          location: "Workshop Room",
          description:
            "Deep dive into DeFi protocol development on Solana, with hands-on coding examples and best practices.",
          speakers: [
            {
              id: "s2",
              name: "Edgar Pavlovsky",
              role: "Co-Founder, Paladin",
              avatar: "/images/speakers/edgar.jpg",
            },
          ],
        },
        {
          id: "4",
          title: "Welcome Dinner & Networking",
          startTime: "19:00",
          endTime: "22:00",
          location: "Dining Hall",
          description:
            "Get to know your fellow participants over dinner and drinks. Form teams and discuss project ideas for the month ahead.",
          speakers: [],
        },
      ],
    },
    {
      date: "2025-01-22",
      name: "Week 2",
      events: [
        {
          id: "5",
          title: "Legal Workshop: DAO Structures",
          startTime: "10:00",
          endTime: "12:00",
          location: "Main Hall",
          description:
            "Understanding the legal frameworks for DAOs and decentralized protocols. Compliance best practices and risk management.",
          speakers: [
            {
              id: "s3",
              name: "Harambe",
              role: "Blockchain Attorney",
              avatar: "/images/speakers/sam.jpg",
            },
          ],
        },
        {
          id: "6",
          title: "Mid-Month Demo Day",
          startTime: "14:00",
          endTime: "17:00",
          location: "Main Hall",
          description:
            "Teams present their progress and get feedback from mentors and fellow participants. Share your work and gather insights.",
          speakers: [],
        },
        {
          id: "7",
          title: "Ski Trip & Bonding",
          startTime: "09:00",
          endTime: "18:00",
          location: "Utah Mountains",
          description:
            "Take a break from coding with a day on the slopes. All skill levels welcome - equipment and lessons available for beginners.",
          speakers: [],
        },
      ],
    },
    {
      date: "2025-02-12",
      name: "Final Week",
      events: [
        {
          id: "8",
          title: "Project Presentations",
          startTime: "10:00",
          endTime: "16:00",
          location: "Main Hall",
          description:
            "Final project presentations from all teams. Demonstrate what you've built during your time at MTN DAO to the community and sponsors.",
          speakers: [],
        },
        {
          id: "9",
          title: "Funding Panel",
          startTime: "16:30",
          endTime: "18:00",
          location: "Main Hall",
          description:
            "Selected projects pitch to potential investors. Panel of VCs and angels provide feedback and potential funding opportunities.",
          speakers: [
            {
              id: "s4",
              name: "Various VCs",
              role: "Multicoin, Pantera, Sino Global",
              avatar: "/images/speakers/vcs.jpg",
            },
          ],
        },
        {
          id: "10",
          title: "Closing Party",
          startTime: "19:00",
          endTime: "23:00",
          location: "MTN DAO House",
          description:
            "Celebrate the achievements of the month with food, drinks, and music. Exchange contacts and plan for continued collaboration beyond MTN DAO.",
          speakers: [],
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
    <Card className="border-violet-500/20 bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-violet-500/[0.02] backdrop-blur-xl overflow-hidden rounded-xl shadow-lg shadow-violet-500/10 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] to-purple-500/[0.03] pointer-events-none" />
      <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"></div>
      <div className="p-6 relative z-10">
        <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
          <CalendarDays className="h-5 w-5 mr-2 text-violet-400" />
          Event Schedule
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {schedule.days.map((day, index) => (
            <AccordionItem
              key={day.date}
              value={day.date}
              className="border-white/10 mb-4 overflow-hidden"
            >
              {" "}
              <AccordionTrigger className="hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-purple-500/10 hover:border-violet-500/30 px-4 py-3 rounded-lg transition-all hover:no-underline border border-transparent">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mr-4 backdrop-blur-sm border border-violet-400/30">
                    <Calendar className="h-5 w-5 text-violet-300" />
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
                      {" "}
                      {/* Timeline dot and line with colorful accents */}
                      <div className="absolute left-[-24px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500/40 via-purple-500/30 to-indigo-500/20"></div>
                      <div className="absolute left-[-34px] top-[14px] w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-400/40 flex items-center justify-center shadow-lg shadow-violet-500/20">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-violet-400 to-purple-400"></div>
                      </div>
                      <Card className="bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-violet-500/[0.02] border-violet-500/20 hover:bg-gradient-to-br hover:from-white/[0.03] hover:to-violet-500/[0.03] hover:border-violet-500/30 transition-all rounded-xl overflow-hidden relative backdrop-blur-md shadow-lg shadow-violet-500/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.02] to-purple-500/[0.02] pointer-events-none rounded-xl" />
                        <div className="p-4 relative z-10">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            {" "}
                            <h4 className="font-medium text-white group-hover:text-violet-200 transition-colors">
                              {event.title}
                            </h4>
                            <Badge className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 hover:from-violet-500/30 hover:to-purple-500/30 text-white border border-violet-400/30 self-start sm:self-auto backdrop-blur-sm shadow-lg shadow-violet-500/20">
                              {formatTime(event.startTime)} -{" "}
                              {formatTime(event.endTime)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300 mb-4">
                            {event.description}
                          </p>{" "}
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center text-xs text-gray-400">
                              <MapPin className="h-3 w-3 mr-1 text-violet-400" />
                              <span>{event.location}</span>
                            </div>

                            {event.speakers && event.speakers.length > 0 && (
                              <div className="flex items-center">
                                <Users className="h-3.5 w-3.5 mr-1.5 text-violet-400" />
                                <span className="text-xs text-gray-400">
                                  {event.speakers.length === 1
                                    ? "1 speaker"
                                    : `${event.speakers.length} speakers`}
                                </span>
                              </div>
                            )}
                          </div>
                          {event.speakers && event.speakers.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-violet-500/20">
                              <p className="text-xs text-gray-400 mb-2">
                                Speakers:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {event.speakers.map((speaker) => (
                                  <div
                                    key={speaker.id}
                                    className="flex items-center bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full py-1 px-2 hover:from-violet-500/20 hover:to-purple-500/20 transition-colors backdrop-blur-sm border border-violet-400/30 hover:border-violet-400/50"
                                  >
                                    <Avatar className="h-5 w-5 mr-1.5">
                                      <AvatarFallback className="text-[10px] bg-gradient-to-br from-violet-500/30 to-purple-500/30 text-white">
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
        </Accordion>{" "}
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-purple-500/10 hover:from-violet-500/20 hover:to-purple-500/20 hover:border-violet-500/50 text-white hover:text-white transition-all backdrop-blur-sm shadow-lg shadow-violet-500/20"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
        </div>
      </div>
    </Card>
  );
}
