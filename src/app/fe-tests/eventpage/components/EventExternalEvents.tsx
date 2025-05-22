"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  ExternalLink,
  Calendar,
  MapPin,
  Filter,
  Star,
  Search,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

// Motion animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// Mock external events data
const mockExternalEvents = [
  {
    id: "1",
    title: "Solana Developers Meetup",
    description:
      "Join local Solana developers for a casual meetup to discuss the latest in Solana development.",
    date: "2025-05-25T19:00:00Z", // One day after the main event
    location: "Web3 Lounge, Downtown",
    organizer: "Solana Developers Community",
    sponsorId: "solana-labs",
    sponsorName: "Solana Labs",
    sponsorLogo: "/images/sponsors/solana-labs.svg",
    url: "https://solana.com/events",
    type: "NETWORKING",
    isSponsored: true,
  },
  {
    id: "2",
    title: "NFT Art Exhibition",
    description:
      "Explore a curated collection of NFT art created by leading digital artists in the blockchain space.",
    date: "2025-05-26T10:00:00Z", // Two days after the main event
    location: "Digital Art Gallery",
    organizer: "Magic Eden",
    sponsorId: "magic-eden",
    sponsorName: "Magic Eden",
    sponsorLogo: "/images/sponsors/magic-eden.svg",
    url: "https://magiceden.io/events",
    type: "EXHIBITION",
    isSponsored: true,
  },
  {
    id: "3",
    title: "DeFi Discussion Panel",
    description:
      "Industry experts discuss the current state and future of DeFi protocols and applications.",
    date: "2025-05-24T16:00:00Z", // Same day as the main event (after)
    location: "Finance Tech Hub",
    organizer: "DeFi Alliance",
    sponsorId: "defi-alliance",
    sponsorName: "DeFi Alliance",
    sponsorLogo: "/images/sponsors/defi-alliance.svg",
    url: "https://defialliance.co/events",
    type: "PANEL",
    isSponsored: false,
  },
  {
    id: "4",
    title: "Blockchain Career Fair",
    description:
      "Connect with top companies in the blockchain space looking to hire talented individuals.",
    date: "2025-05-27T09:00:00Z", // Three days after the main event
    location: "Tech Innovation Center",
    organizer: "Blockchain Jobs Network",
    sponsorId: "blockchain-jobs",
    sponsorName: "Blockchain Jobs Network",
    sponsorLogo: "/images/sponsors/blockchain-jobs.svg",
    url: "https://blockchainjobs.com/fair",
    type: "CAREER_FAIR",
    isSponsored: false,
  },
  {
    id: "5",
    title: "Web3 Hackathon",
    description:
      "48-hour hackathon for developers to build innovative Web3 applications on multiple blockchains.",
    date: "2025-05-28T08:00:00Z", // Four days after the main event
    location: "Dev Campus",
    organizer: "ETHGlobal",
    sponsorId: "eth-global",
    sponsorName: "ETHGlobal",
    sponsorLogo: "/images/sponsors/eth-global.svg",
    url: "https://ethglobal.com/events",
    type: "HACKATHON",
    isSponsored: true,
  },
];

interface EventExternalEventsProps {
  eventId: string;
}

export default function EventExternalEvents({
  eventId,
}: EventExternalEventsProps) {
  // In a real app, you would fetch the external events data based on the eventId
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [externalEvents, setExternalEvents] = useState(mockExternalEvents);

  const filterTypes = [
    { id: "ALL", label: "All Events" },
    { id: "NETWORKING", label: "Networking" },
    { id: "HACKATHON", label: "Hackathons" },
    { id: "PANEL", label: "Panels" },
    { id: "EXHIBITION", label: "Exhibitions" },
    { id: "CAREER_FAIR", label: "Career Fairs" },
  ];

  // Filter function
  const filterEvents = (filter: string, search: string) => {
    return mockExternalEvents.filter((event) => {
      const matchesFilter = filter === "ALL" || event.type === filter;
      const matchesSearch =
        search === "" ||
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setExternalEvents(filterEvents(filter, searchTerm));
  };

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setExternalEvents(filterEvents(activeFilter, value));
  };

  // Format date function
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Calculate days from now
  const getDaysFromNow = (dateString: string) => {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diffTime = Math.abs(eventDate.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `In ${diffDays} days`;
  };

  // Get event type badge
  const getEventTypeBadge = (type: string) => {
    let styles = {
      bg: "bg-purple-500/20",
      border: "border-purple-400",
      text: "text-purple-400",
      gradient: "from-purple-500 to-blue-500",
    };

    switch (type) {
      case "NETWORKING":
        styles = {
          bg: "bg-blue-500/20",
          border: "border-blue-400",
          text: "text-blue-400",
          gradient: "from-blue-500 to-indigo-500",
        };
        break;
      case "HACKATHON":
        styles = {
          bg: "bg-green-500/20",
          border: "border-green-400",
          text: "text-green-400",
          gradient: "from-green-500 to-emerald-500",
        };
        break;
      case "CAREER_FAIR":
        styles = {
          bg: "bg-amber-500/20",
          border: "border-amber-400",
          text: "text-amber-400",
          gradient: "from-amber-500 to-yellow-500",
        };
        break;
      case "EXHIBITION":
        styles = {
          bg: "bg-pink-500/20",
          border: "border-pink-400",
          text: "text-pink-400",
          gradient: "from-pink-500 to-rose-500",
        };
        break;
      case "PANEL":
        styles = {
          bg: "bg-cyan-500/20",
          border: "border-cyan-400",
          text: "text-cyan-400",
          gradient: "from-cyan-500 to-sky-500",
        };
        break;
    }
    return {
      badge: (
        <Badge
          variant="outline"
          className={`${styles.bg} ${styles.text} border ${styles.border} px-2 py-1 text-xs font-medium`}
        >
          {type.replace("_", " ")}
        </Badge>
      ),
      gradient: styles.gradient,
      text: styles.text,
      bg: styles.bg,
    };
  };

  return (
    <Card className="border-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-xl overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.15)] rounded-xl">
      <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
              <ExternalLink className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Related Events</h2>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-9 bg-black/40 border-white/10 focus-visible:ring-purple-500/50 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
          {filterTypes.map((filter) => (
            <Button
              key={filter.id}
              size="sm"
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`
                rounded-full text-xs px-3 whitespace-nowrap
                ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-purple-600/90 to-blue-600/90 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                    : "border-white/10 bg-black/40 hover:bg-black/60"
                }
              `}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {externalEvents.length > 0 ? (
              externalEvents.map((event) => {
                const eventTypeBadge = getEventTypeBadge(event.type);

                return (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="rounded-lg overflow-hidden bg-gradient-to-b from-white/10 to-black/60 
                      backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border-0 
                      hover:shadow-[0_4px_20px_rgba(139,92,246,0.2)] transition-all duration-300"
                  >
                    <div
                      className={`h-1 bg-gradient-to-r ${eventTypeBadge.gradient}`}
                    ></div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2.5">
                        <h3 className="text-md font-medium text-white">
                          {event.title}
                        </h3>
                        {eventTypeBadge.badge}
                      </div>

                      <p className="text-sm text-gray-300 line-clamp-2 mb-3 min-h-[2.5rem]">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-sm text-gray-300 gap-2.5">
                          <div className="flex items-center">
                            <Calendar
                              className={`h-4 w-4 mr-1.5 ${eventTypeBadge.text}`}
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>{formatEventDate(event.date)}</span>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="bottom"
                                  className="text-xs"
                                >
                                  <p>{new Date(event.date).toLocaleString()}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                          <div
                            className={`px-2 py-0.5 rounded-full bg-white/5 text-xs ${eventTypeBadge.text}`}
                          >
                            {getDaysFromNow(event.date)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-300 mb-4">
                        <MapPin
                          className={`h-4 w-4 mr-1.5 ${eventTypeBadge.text}`}
                        />
                        {event.location}
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-3">
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full ${eventTypeBadge.bg} flex items-center justify-center mr-2`}
                          >
                            {event.isSponsored && (
                              <Star className="h-3 w-3 text-amber-400" />
                            )}
                          </div>
                          <span className="text-xs text-gray-400">
                            By {event.sponsorName}
                          </span>
                          {event.isSponsored && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="outline"
                                    className="ml-2 px-1.5 border-amber-400/30 text-amber-400 text-[10px] bg-amber-500/10"
                                  >
                                    Official Sponsor
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">
                                    Event by official conference sponsor
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>

                        <Button
                          size="sm"
                          className={`text-xs bg-gradient-to-r ${eventTypeBadge.gradient} text-white hover:opacity-90`}
                          onClick={() => window.open(event.url, "_blank")}
                        >
                          View Details
                          <ArrowRight className="h-3 w-3 ml-1.5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                className="col-span-2 text-center py-10 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-black/20 rounded-lg p-8 border border-white/5">
                  <div className="flex justify-center mb-4">
                    <Search className="h-12 w-12 text-gray-500 opacity-40" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-300">
                    No events found
                  </h3>
                  <p className="text-sm mt-2">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    className="mt-4 bg-black/40 hover:bg-black/60 border border-white/10"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter("ALL");
                      setExternalEvents(mockExternalEvents);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {externalEvents.length > 0 && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button className="bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-white border-0">
              Browse All Related Events
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </Card>
  );
}
