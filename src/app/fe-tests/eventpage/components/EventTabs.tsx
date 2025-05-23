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
      <div className="relative mb-6">
        <TabsList className="w-full bg-white/[0.003] backdrop-blur-xl border border-white/10 rounded-xl flex overflow-hidden">
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
              className="flex items-center gap-2 py-3 px-4 text-sm 
                data-[state=active]:bg-white/10 
                data-[state=active]:text-white
                data-[state=active]:border-b-2 data-[state=active]:border-white/30
                text-gray-400 hover:text-gray-200 transition-all relative"
            >
              {/* Subtle glow for active tab */}
              {activeTab === tab && (
                <div className="absolute inset-0 bg-white/[0.003] pointer-events-none" />
              )}

              <span
                className={
                  activeTab === tab ? "text-white/90" : "text-white/70"
                }
              >
                {getTabIcon(tab)}
              </span>
              <span className="hidden sm:inline">{getTabLabel(tab)}</span>
            </TabsTrigger>
          ))}
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
