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
      date: "2025-08-01",
      name: "Week 1: DePin",
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
          title: "DePin Fundamentals: Building Decentralized Infrastructure",
          startTime: "14:00",
          endTime: "15:30",
          location: "Main Hall",
          description:
            "Explore the foundations of Decentralized Physical Infrastructure Networks (DePin) and learn how to build real-world infrastructure on blockchain.",
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
          title: "DePin Protocol Workshop",
          startTime: "16:00",
          endTime: "18:00",
          location: "Workshop Room",
          description:
            "Hands-on workshop covering DePin protocol development, tokenomics, and incentive mechanisms for physical infrastructure networks.",
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
            "Get to know your fellow participants over dinner and drinks. Form teams and discuss DePin project ideas for the week ahead.",
          speakers: [],
        },
      ],
    },
    {
      date: "2025-08-08",
      name: "Week 2: Gaming",
      events: [
        {
          id: "5",
          title: "Blockchain Gaming Architecture",
          startTime: "10:00",
          endTime: "12:00",
          location: "Main Hall",
          description:
            "Deep dive into blockchain gaming infrastructure, NFT integration, and building sustainable gaming economies on Solana.",
          speakers: [
            {
              id: "s3",
              name: "Gaming Expert",
              role: "Lead Game Developer",
              avatar: "/images/speakers/gaming.jpg",
            },
          ],
        },
        {
          id: "6",
          title: "Gaming Demo Day",
          startTime: "14:00",
          endTime: "17:00",
          location: "Main Hall",
          description:
            "Teams showcase their gaming prototypes and get feedback from industry experts and fellow participants.",
          speakers: [],
        },
        {
          id: "7",
          title: "Gaming Night & Tournament",
          startTime: "19:00",
          endTime: "23:00",
          location: "Gaming Lounge",
          description:
            "Relax and compete in both blockchain and traditional gaming tournaments while networking with fellow builders.",
          speakers: [],
        },
      ],
    },
    {
      date: "2025-08-15",
      name: "Week 3: DeFi",
      events: [
        {
          id: "8",
          title: "Advanced DeFi Protocols",
          startTime: "10:00",
          endTime: "12:00",
          location: "Main Hall",
          description:
            "Explore cutting-edge DeFi innovations including yield farming, liquidity mining, and cross-chain protocols.",
          speakers: [
            {
              id: "s4",
              name: "Edgar Pavlovsky",
              role: "Co-Founder, Paladin",
              avatar: "/images/speakers/edgar.jpg",
            },
          ],
        },
        {
          id: "9",
          title: "DeFi Security Workshop",
          startTime: "14:00",
          endTime: "16:00",
          location: "Workshop Room",
          description:
            "Learn about common DeFi vulnerabilities, audit processes, and best practices for building secure financial protocols.",
          speakers: [],
        },
        {
          id: "10",
          title: "DeFi Project Showcase",
          startTime: "16:30",
          endTime: "18:00",
          location: "Main Hall",
          description:
            "Present your DeFi innovations and receive feedback from industry experts and potential investors.",
          speakers: [],
        },
      ],
    },
    {
      date: "2025-08-22",
      name: "Week 4: Payments",
      events: [
        {
          id: "11",
          title: "Next-Gen Payment Systems",
          startTime: "10:00",
          endTime: "12:00",
          location: "Main Hall",
          description:
            "Explore the future of payments with blockchain technology, including stablecoins, CBDCs, and cross-border solutions.",
          speakers: [
            {
              id: "s5",
              name: "Payments Expert",
              role: "Fintech Specialist",
              avatar: "/images/speakers/payments.jpg",
            },
          ],
        },
        {
          id: "12",
          title: "Final Project Presentations",
          startTime: "14:00",
          endTime: "17:00",
          location: "Main Hall",
          description:
            "Final project presentations from all teams. Demonstrate what you've built during your time at MTN DAO to the community and sponsors.",
          speakers: [],
        },
        {
          id: "13",
          title: "Funding Panel",
          startTime: "17:30",
          endTime: "19:00",
          location: "Main Hall",
          description:
            "Selected projects pitch to potential investors. Panel of VCs and angels provide feedback and potential funding opportunities.",
          speakers: [
            {
              id: "s6",
              name: "Various VCs",
              role: "Multicoin, Pantera, Sino Global",
              avatar: "/images/speakers/vcs.jpg",
            },
          ],
        },
        {
          id: "14",
          title: "Closing Party",
          startTime: "19:30",
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
