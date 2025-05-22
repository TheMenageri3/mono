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
        return <CalendarDays className="h-4 w-4 mr-2" />;
      case "announcements":
        return <Megaphone className="h-4 w-4 mr-2" />;
      case "connections":
        return <Users className="h-4 w-4 mr-2" />;
      case "polls":
        return <BarChart2 className="h-4 w-4 mr-2" />;
      case "external-events":
        return <CalendarRange className="h-4 w-4 mr-2" />;
      default:
        return null;
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
      <div className="relative">
        <TabsList className="w-full bg-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl mb-6 p-1 overflow-x-auto flex-nowrap whitespace-nowrap relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 pointer-events-none rounded-xl" />
          {[
            "schedule",
            "announcements",
            "connections",
            "polls",
            "external-events",
          ].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="flex items-center py-2.5 rounded-lg hover:bg-white/5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/40 data-[state=active]:to-fuchsia-600/30 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-900/20 data-[state=active]:border data-[state=active]:border-purple-500/30 transition-all duration-200 backdrop-blur-md z-10"
            >
              {getTabIcon(tab)}
              <span>
                {tab === "schedule"
                  ? "Schedule"
                  : tab === "announcements"
                  ? "Announcements"
                  : tab === "connections"
                  ? "My Connections"
                  : tab === "polls"
                  ? "Polls"
                  : "Related Events"}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Glowing underline indicator */}
        <div className="absolute bottom-[18px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-sm"></div>
      </div>

      <motion.div
        key={activeTab}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={tabContentVariants}
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
