"use client";
import EventTabs from "./components/EventTabs";
import EventHeader from "./components/EventHeader";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Users,
  CalendarDays,
  MapPin,
  ArrowLeft,
  Share2,
  MessageCircle,
  Star,
  Bookmark,
  Hexagon,
  Activity,
  Download,
  ExternalLink,
  Globe,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Mock event data
const mockEvent = {
  id: "event-1",
  title: "MTN DAO Hacker House 2025",
  description:
    "MTN DAO is a month-long hacker house and builder retreat held annually in Salt Lake City, Utah, designed to bring together top minds in the Solana ecosystem. It provides an intensive co-working and co-living experience for builders, developers, founders, and researchers focused on decentralized technologies—especially DeFi and DAO tooling.\n\nMore than just a hackathon, MTN DAO is a creative incubation space where participants collaborate on real projects, attend technical workshops, and gain exposure to cutting-edge Web3 developments. Set against the backdrop of Utah's snowy mountains, it blends innovation with adventure in a unique environment built for productivity, community, and fun.",
  shortDescription:
    "Month-long hacker house bringing together Solana builders, developers, founders, and researchers in Salt Lake City.",
  startDatetime: "2025-07-15T09:00:00Z",
  endDatetime: "2025-08-15T18:00:00Z",
  timezone: "America/Denver",
  location: "Salt Lake City, Utah, USA",
  virtual: false,
  virtualUrl: "",
  capacity: 175,
  attendeeCount: 157,
  organizer: {
    id: "org-1",
    name: "MTN DAO",
    logo: "/images/organizers/mtndao.svg",
  },
  type: "HACKER_HOUSE",
  status: "PUBLISHED",
  tags: ["solana", "defi", "hackathon", "dao", "blockchain", "builders"],
  sponsors: [
    {
      id: "sponsor-1",
      name: "Solana Foundation",
      logo: "/images/sponsors/solana-foundation.svg",
      tier: "PLATINUM",
    },
    {
      id: "sponsor-2",
      name: "Paladin",
      logo: "/images/sponsors/paladin.svg",
      tier: "GOLD",
    },
    {
      id: "sponsor-3",
      name: "Ranger",
      logo: "/images/sponsors/cypher.svg",
      tier: "GOLD",
    },
    {
      id: "sponsor-4",
      name: "Sino Global Capital",
      logo: "/images/sponsors/sino.svg",
      tier: "SILVER",
    },
    {
      id: "sponsor-5",
      name: "Pantera Capital",
      logo: "/images/sponsors/pantera.svg",
      tier: "SILVER",
    },
    {
      id: "sponsor-6",
      name: "Multicoin Capital",
      logo: "/images/sponsors/multicoin.svg",
      tier: "SILVER",
    },
  ],
  featuredSpeakers: [
    {
      id: "speaker-1",
      name: "Barrett",
      role: "Co Founder, Ranger",
      avatar: "/images/speakers/barrett.jpg",
    },
    {
      id: "speaker-2",
      name: "Edgar Pavlovsky",
      role: "Founder, Paladin",
      avatar: "/images/speakers/edgar.jpg",
    },
    {
      id: "speaker-3",
      name: "Harambe",
      role: "Blockchain Attorney",
      avatar: "/images/speakers/sam.jpg",
    },
  ],
};

export default function EventPage() {
  const [isAttending, setIsAttending] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Track scroll position for floating header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAttendanceChange = (attending: boolean) => {
    // In a real app, you would update this in your backend
    setIsAttending(attending);
  };

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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };
  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      {/* Enhanced Background elements - vibrant and dynamic like onboarding */}
      <div className="fixed inset-0 z-[-2] overflow-hidden">
        <div className="absolute top-[-10%] left-[5%] w-[800px] h-[800px] bg-gradient-to-br from-purple-500/25 via-violet-600/20 to-indigo-500/25 rounded-full blur-[120px] opacity-80 animate-pulse-slow" />
        <div className="absolute bottom-[-15%] right-[5%] w-[700px] h-[700px] bg-gradient-to-tr from-blue-500/25 via-cyan-500/20 to-teal-500/25 rounded-full blur-[130px] opacity-70 animate-pulse-slower" />
        <div className="absolute top-[40%] right-[15%] w-[600px] h-[600px] bg-gradient-to-bl from-violet-600/25 via-purple-500/20 to-pink-500/25 rounded-full blur-[110px] opacity-60 animate-pulse-medium" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/25 via-blue-500/20 to-cyan-500/25 rounded-full blur-[100px] opacity-60 animate-pulse-slow" />
        <div className="absolute top-[15%] left-[40%] w-[400px] h-[400px] bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-green-500/20 rounded-full blur-[90px] opacity-50 animate-pulse-medium" />
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5 }}
        />
      </div>{" "}
      {/* Floating header on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl shadow-lg shadow-black/20"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container max-w-6xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/10 transition-colors border border-white/10"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="text-sm font-medium truncate max-w-xs">
                    {mockEvent.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-white/10 transition-colors border border-white/10"
                          onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              isBookmarked
                                ? "fill-yellow-400 text-yellow-400"
                                : ""
                            }`}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-xs">
                          {isBookmarked ? "Remove Bookmark" : "Bookmark Event"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-white/10 transition-colors border border-white/10"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-xs">Share Event</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    size="sm"
                    onClick={() => handleAttendanceChange(!isAttending)}
                    className={cn(
                      "transition-all duration-200 font-medium shadow-lg min-w-[120px] border",
                      isAttending
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 border-emerald-400/50 text-white shadow-emerald-500/25"
                        : "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 border-violet-500/50 text-white shadow-violet-500/25"
                    )}
                  >
                    <span className="flex items-center">
                      {isAttending ? (
                        <>
                          <Star className="w-4 h-4 mr-2 fill-white" />
                          Attending
                        </>
                      ) : (
                        <>
                          <Star className="w-4 h-4 mr-2" />
                          Attend
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8 relative z-10">
        {" "}
        {/* Navigation */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            className="p-2 hover:bg-white/10 -ml-3 flex items-center border border-white/10 rounded-xl transition-all duration-200 hover:border-white/20"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Back to Events</span>
          </Button>
        </motion.div>{" "}
        {/* Hero banner - Clean image without overlays */}
        <motion.div
          className="w-full h-52 sm:h-64 md:h-80 mb-16 relative overflow-hidden rounded-3xl border-2 border-violet-500/20 shadow-2xl shadow-violet-500/10"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Banner image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/mntdao.png"
              alt={mockEvent.title}
              layout="fill"
              objectFit="cover"
              quality={90}
              priority
            />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-between pt-4 pb-6 z-30 px-8">
            {/* Event badge - hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: "none" }}
              className="sm:!block" // Override inline style for sm (640px) and up
            >
              <Badge className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-2 border-violet-400/30 text-white backdrop-blur-md px-6 py-2 text-sm font-medium shadow-lg shadow-violet-500/25">
                ✨ Hacker House
              </Badge>
            </motion.div>

            {/* Bottom info with date/location/attendance - also hidden on mobile */}
            <motion.div
              className="hidden sm:flex sm:flex-row items-center gap-4" // Hide on mobile, show as flex on sm breakpoints and up
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center bg-gradient-to-r from-violet-600/40 to-purple-600/40 backdrop-blur-md px-5 py-3 rounded-full border border-violet-400/30 shadow-lg shadow-violet-500/20">
                <CalendarDays className="h-4 w-4 mr-2 text-violet-200" />
                <span className="text-sm font-medium text-white">
                  {new Date(mockEvent.startDatetime).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-blue-600/40 to-cyan-600/40 backdrop-blur-md px-5 py-3 rounded-full border border-blue-400/30 shadow-lg shadow-blue-500/20">
                <MapPin className="h-4 w-4 mr-2 text-blue-200" />
                <span className="text-sm font-medium text-white">
                  {mockEvent.location.split(",")[0]}
                </span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-emerald-600/40 to-teal-600/40 backdrop-blur-md px-5 py-3 rounded-full border border-emerald-400/30 shadow-lg shadow-emerald-500/20">
                <Users className="h-4 w-4 mr-2 text-emerald-200" />
                <span className="text-sm font-medium text-white">
                  {mockEvent.attendeeCount} attending
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {" "}
            {/* Event Header */}
            <Card className="border-violet-500/20 bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-violet-500/[0.02] backdrop-blur-xl overflow-hidden rounded-2xl shadow-xl shadow-violet-500/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] to-purple-500/[0.03] pointer-events-none" />
              <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"></div>
              <div className="p-6 relative z-10">
                <EventHeader
                  event={{
                    id: mockEvent.id,
                    title: mockEvent.title,
                    description: mockEvent.description,
                    startDatetime: mockEvent.startDatetime,
                    endDatetime: mockEvent.endDatetime,
                    location: mockEvent.location,
                    virtual: mockEvent.virtual,
                    virtualUrl: mockEvent.virtualUrl,
                    type: mockEvent.type,
                    status: mockEvent.status,
                    attendeeCount: mockEvent.attendeeCount,
                  }}
                  isAttending={isAttending}
                  onAttendanceChange={handleAttendanceChange}
                />
              </div>
            </Card>
            {/* Event Tabs */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <EventTabs eventId={mockEvent.id} />
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {" "}
            {/* Action buttons */}
            <Card className="border-violet-500/20 bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-blue-500/[0.02] backdrop-blur-xl rounded-2xl overflow-hidden relative shadow-lg shadow-blue-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.03] pointer-events-none" />
              <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
              <div className="p-4 relative z-10">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex flex-col items-center justify-center h-16 w-full rounded-xl hover:bg-violet-500/10 hover:border-violet-500/30 border border-transparent transition-all duration-200"
                        >
                          <Share2 className="h-5 w-5 mb-1 text-violet-300" />
                          <span className="text-xs text-violet-200">Share</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Share with your network</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex flex-col items-center justify-center h-16 w-full rounded-xl hover:bg-blue-500/10 hover:border-blue-500/30 border border-transparent transition-all duration-200"
                        >
                          <MessageCircle className="h-5 w-5 mb-1 text-blue-300" />
                          <span className="text-xs text-blue-200">Chat</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Connect with attendees</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex flex-col items-center justify-center h-16 w-full rounded-xl hover:bg-yellow-500/10 hover:border-yellow-500/30 border border-transparent transition-all duration-200"
                          onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                          <Bookmark
                            className={`h-5 w-5 mb-1 ${
                              isBookmarked
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-yellow-300"
                            }`}
                          />
                          <span className="text-xs text-yellow-200">Save</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          {isBookmarked
                            ? "Remove from bookmarks"
                            : "Add to bookmarks"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex flex-col items-center justify-center h-16 w-full rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/30 border border-transparent transition-all duration-200"
                        >
                          <Download className="h-5 w-5 mb-1 text-emerald-300" />
                          <span className="text-xs text-emerald-200">
                            Export
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Export to calendar</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </Card>{" "}
            {/* Event Details Card */}
            <Card className="border-emerald-500/20 bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-emerald-500/[0.02] backdrop-blur-xl overflow-hidden rounded-2xl shadow-xl shadow-emerald-500/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-teal-500/[0.03] pointer-events-none" />
              <div className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
              <div className="p-6 relative z-10">
                {" "}
                <h2 className="text-lg font-semibold mb-5 text-white flex items-center">
                  <Hexagon className="h-5 w-5 mr-2 text-emerald-400 stroke-[1.5]" />
                  Event Details
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 p-2 mr-3 border border-violet-400/30">
                      <CalendarDays className="h-5 w-5 text-violet-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Date & Time
                      </h3>
                      <p className="text-sm text-gray-300">
                        {new Date(mockEvent.startDatetime).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-sm text-gray-300">
                        {new Date(mockEvent.startDatetime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}{" "}
                        -{" "}
                        {new Date(mockEvent.endDatetime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Timezone: {mockEvent.timezone}
                      </p>
                    </div>
                  </div>{" "}
                  <div className="flex items-start">
                    <div className="rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-2 mr-3 border border-blue-400/30">
                      <MapPin className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Location
                      </h3>
                      <p className="text-sm text-gray-300">
                        {mockEvent.location}
                      </p>
                      {mockEvent.virtual && mockEvent.virtualUrl && (
                        <p className="text-xs text-white/80 mt-1 hover:underline">
                          <a
                            href={mockEvent.virtualUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Activity className="h-3 w-3 mr-1" />
                            Virtual attendance available
                          </a>
                        </p>
                      )}
                    </div>
                  </div>{" "}
                  <div className="flex items-start">
                    <div className="rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-2 mr-3 border border-emerald-400/30">
                      <Users className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Attendance
                      </h3>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-300 mr-2">
                          {mockEvent.attendeeCount} / {mockEvent.capacity}
                        </p>{" "}
                        <div className="text-xs px-1.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-200 border border-emerald-400/30">
                          {Math.round(
                            (mockEvent.attendeeCount / mockEvent.capacity) * 100
                          )}
                          % Full
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                          style={{
                            width: `${
                              (mockEvent.attendeeCount / mockEvent.capacity) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-white mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-400" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mockEvent.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="px-2.5 py-1 bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-400/30 rounded-full text-xs hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-violet-500/20 hover:border-purple-400/50 transition-all cursor-pointer text-purple-200"
                      >
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-white mb-3">
                    Organized by
                  </h3>{" "}
                  <div className="flex items-center p-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-400/30">
                    <Avatar className="h-10 w-10 mr-3 border-2 border-orange-400/50">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-orange-200">
                        SF
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {mockEvent.organizer.name}
                      </p>
                      <p className="text-xs text-gray-400">Event Organizer</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>{" "}
            {/* Featured Speakers Card */}
            <Card className="border-indigo-500/20 bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-indigo-500/[0.02] backdrop-blur-xl overflow-hidden rounded-2xl shadow-xl shadow-indigo-500/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-purple-500/[0.03] pointer-events-none" />
              <div className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
              <div className="p-6 relative z-10">
                <h2 className="text-lg font-semibold mb-5 text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-indigo-400 stroke-[1.5]" />
                  Featured Speakers
                </h2>{" "}
                <div className="space-y-4">
                  {mockEvent.featuredSpeakers.map((speaker, index) => (
                    <div
                      key={speaker.id}
                      className={`group flex items-center rounded-xl p-3 transition-all border ${
                        index === 0
                          ? "bg-gradient-to-r from-violet-500/10 to-purple-500/10 hover:from-violet-500/20 hover:to-purple-500/20 border-violet-400/30 hover:border-violet-400/50"
                          : index === 1
                          ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border-blue-400/30 hover:border-blue-400/50"
                          : "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border-emerald-400/30 hover:border-emerald-400/50"
                      }`}
                    >
                      <Avatar
                        className={`h-12 w-12 border-2 ${
                          index === 0
                            ? "border-violet-400/50"
                            : index === 1
                            ? "border-blue-400/50"
                            : "border-emerald-400/50"
                        }`}
                      >
                        <AvatarFallback
                          className={`text-white ${
                            index === 0
                              ? "bg-gradient-to-br from-violet-500/20 to-purple-500/20"
                              : index === 1
                              ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                              : "bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
                          }`}
                        >
                          {speaker.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-white group-hover:text-white transition-colors">
                          {speaker.name}
                        </h3>
                        <p className="text-xs text-gray-400">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>{" "}
                <Button
                  variant="outline"
                  className="w-full mt-4 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 border border-indigo-400/30 hover:border-indigo-400/50 transition-all bg-gradient-to-r from-indigo-500/5 to-purple-500/5"
                >
                  View All Speakers
                </Button>
              </div>
            </Card>{" "}
            {/* Sponsors Card */}
            <Card className="border-pink-500/20 bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-pink-500/[0.02] backdrop-blur-xl overflow-hidden rounded-2xl shadow-xl shadow-pink-500/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/[0.03] to-rose-500/[0.03] pointer-events-none" />
              <div className="h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>
              <div className="p-6 relative z-10">
                <h2 className="text-lg font-semibold mb-4 text-white flex items-center">
                  <Hexagon className="h-5 w-5 mr-2 text-pink-400 stroke-[1.5]" />
                  Event Sponsors
                </h2>{" "}
                {/* Platinum Sponsors */}
                <div className="mb-5">
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 mr-2 shadow-lg shadow-slate-400/25"></span>
                    Platinum
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockEvent.sponsors
                      .filter((s) => s.tier === "PLATINUM")
                      .map((sponsor) => (
                        <div
                          key={sponsor.id}
                          className="flex items-center justify-center h-16 bg-gradient-to-br from-slate-500/10 to-gray-500/10 rounded-lg border border-slate-400/30 hover:border-slate-400/50 hover:bg-gradient-to-br hover:from-slate-500/20 hover:to-gray-500/20 transition-all backdrop-blur-sm shadow-lg shadow-slate-500/10"
                        >
                          <span className="text-sm font-medium text-slate-200">
                            {sponsor.name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>{" "}
                {/* Gold Sponsors */}
                <div className="mb-5">
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 mr-2 shadow-lg shadow-yellow-400/25"></span>
                    Gold
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockEvent.sponsors
                      .filter((s) => s.tier === "GOLD")
                      .map((sponsor) => (
                        <div
                          key={sponsor.id}
                          className="flex items-center justify-center h-14 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-lg border border-yellow-400/30 hover:border-yellow-400/50 hover:bg-gradient-to-br hover:from-yellow-500/20 hover:to-amber-500/20 transition-all backdrop-blur-sm shadow-lg shadow-yellow-500/10"
                        >
                          <span className="text-sm text-yellow-200">
                            {sponsor.name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>{" "}
                {/* Silver Sponsors */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 mr-2 shadow-lg shadow-gray-400/25"></span>
                    Silver
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockEvent.sponsors
                      .filter((s) => s.tier === "SILVER")
                      .map((sponsor) => (
                        <div
                          key={sponsor.id}
                          className="flex items-center justify-center h-12 bg-gradient-to-br from-gray-500/10 to-slate-500/10 rounded-lg border border-gray-400/30 hover:border-gray-400/50 hover:bg-gradient-to-br hover:from-gray-500/20 hover:to-slate-500/20 transition-all backdrop-blur-sm shadow-lg shadow-gray-500/10"
                        >
                          <span className="text-sm text-gray-200">
                            {sponsor.name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

//todo add poll making functionality with adding friends and shit, improve the ui even more add connection messaging alight the event schedule shit
