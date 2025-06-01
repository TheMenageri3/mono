"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventSchedule from "./EventSchedule";
import EventAnnouncements from "./EventAnnouncements";
import EventConnections from "./EventConnections";
import EventPolls from "./EventPolls";
import EventExternalEvents from "./EventExternalEvents";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Megaphone,
  Users,
  BarChart2,
  CalendarRange,
} from "lucide-react";

interface EventTabsProps {
  eventId: string;
}

export default function EventTabs({ eventId }: EventTabsProps) {
  const [activeTab, setActiveTab] = useState("schedule");

  // Animation variants for tab content
  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Get icon based on tab value
  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "schedule":
        return <CalendarDays className="h-4 w-4" />;
      case "announcements":
        return <Megaphone className="h-4 w-4" />;
      case "connections":
        return <Users className="h-4 w-4" />;
      case "polls":
        return <BarChart2 className="h-4 w-4" />;
      case "external-events":
        return <CalendarRange className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Tab label mapping
  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "schedule":
        return "Schedule";
      case "announcements":
        return "Announcements";
      case "connections":
        return "My Connections";
      case "polls":
        return "Polls";
      case "external-events":
        return "Related Events";
      default:
        return tab;
    }
  };

  const handleValueChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs
      defaultValue="schedule"
      className="w-full"
      onValueChange={handleValueChange}
    >
      {" "}
      <div className="relative mb-6">
        <TabsList className="w-full bg-gradient-to-r from-white/[0.02] via-white/[0.01] to-white/[0.02] backdrop-blur-xl border border-violet-500/20 rounded-xl flex overflow-hidden shadow-lg shadow-violet-500/10">
          {[
            "schedule",
            "announcements",
            "connections",
            "polls",
            "external-events",
          ].map((tab, index) => {
            const colorSchemes = [
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:border-violet-400/50",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:border-blue-400/50",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:border-emerald-400/50",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/20 data-[state=active]:to-amber-500/20 data-[state=active]:border-orange-400/50",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-rose-500/20 data-[state=active]:border-pink-400/50",
            ];

            return (
              <TabsTrigger
                key={tab}
                value={tab}
                className={`flex items-center gap-2 py-3 px-4 text-sm border-b-2 border-transparent
                  ${colorSchemes[index]}
                  data-[state=active]:text-white
                  text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all relative`}
              >
                {/* Subtle glow for active tab */}
                {activeTab === tab && (
                  <div className="absolute inset-0 bg-white/[0.05] pointer-events-none rounded-lg" />
                )}

                <span
                  className={activeTab === tab ? "text-white" : "text-white/70"}
                >
                  {getTabIcon(tab)}
                </span>
                <span className="hidden sm:inline font-medium">
                  {getTabLabel(tab)}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
      <motion.div
        key={activeTab}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={tabContentVariants}
        className="relative"
      >
        <TabsContent value="schedule">
          <EventSchedule eventId={eventId} />
        </TabsContent>

        <TabsContent value="announcements">
          <EventAnnouncements eventId={eventId} />
        </TabsContent>

        <TabsContent value="connections">
          <EventConnections eventId={eventId} />
        </TabsContent>

        <TabsContent value="polls">
          <EventPolls eventId={eventId} />
        </TabsContent>

        <TabsContent value="external-events">
          <EventExternalEvents eventId={eventId} />
        </TabsContent>
      </motion.div>
    </Tabs>
  );
}
