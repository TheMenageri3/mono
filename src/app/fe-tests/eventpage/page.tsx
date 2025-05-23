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
  startDatetime: "2025-01-15T09:00:00Z",
  endDatetime: "2025-02-15T18:00:00Z",
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
      name: "MarginFi",
      logo: "/images/sponsors/marginfi.svg",
      tier: "GOLD",
    },
    {
      id: "sponsor-3",
      name: "Cypher Protocol",
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
      role: "Core Contributor, Cypher Protocol",
      avatar: "/images/speakers/barrett.jpg",
    },
    {
      id: "speaker-2",
      name: "Edgar Pavlovsky",
      role: "Co-Founder, MarginFi",
      avatar: "/images/speakers/edgar.jpg",
    },
    {
      id: "speaker-3",
      name: "Sam Mehr",
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
      {/* Enhanced Background elements - glassmorphic style */}
      <div className="fixed inset-0 z-[-2] overflow-hidden">
        <div className="absolute top-[-5%] left-[10%] w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[150px] opacity-70 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[130px] opacity-60 animate-pulse-slower" />
        <div className="absolute top-[30%] right-[20%] w-[450px] h-[450px] bg-violet-600/15 rounded-full blur-[120px] opacity-50 animate-pulse-medium" />
        <div className="absolute bottom-[15%] left-[15%] w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px] opacity-50 animate-pulse-slow" />
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      {/* Floating header on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl shadow-md shadow-black/10"
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
                    className="rounded-full hover:bg-white/10 transition-colors"
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
                          className="rounded-full hover:bg-white/10 transition-colors"
                          onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              isBookmarked ? "fill-white/80 text-white/80" : ""
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
                          className="rounded-full hover:bg-white/10 transition-colors"
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
                      "transition-all duration-200 font-medium shadow-sm min-w-[120px]",
                      isAttending
                        ? "bg-white/10 hover:bg-white/15 shadow-black/5 border border-white/20"
                        : "bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm hover:shadow-black/5"
                    )}
                  >
                    <span className="flex items-center">
                      {isAttending ? (
                        <>
                          <Star className="w-4 h-4 mr-2 fill-white/80" />
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
        {/* Navigation */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            className="p-2 hover:bg-white/5 -ml-3 flex items-center"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Back to Events</span>
          </Button>
        </motion.div>

        {/* Hero banner - Using custom image */}
        <motion.div
          className="w-full h-52 sm:h-64 md:h-80 mb-16 relative overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/10"
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

            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>
          </div>

          {/* Sparkles and particles overlayed on image */}
          <div className="absolute inset-0 z-20">
            {/* Animated glow elements */}
            <div className="absolute top-[-20%] left-[20%] w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[80px] animate-pulse-slow"></div>
            <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[100px] animate-pulse-slower"></div>

            {/* Particle effect - small glowing dots */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 5,
                }}
              />
            ))}

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-10"></div>
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-between pt-4 pb-6 z-30 px-8">
            {/* Event badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className="bg-white/10 border border-white/20 text-white/90 backdrop-blur-md px-4 py-1 text-xs">
                Hacker House
              </Badge>
            </motion.div>

            {/* Bottom info with date/location/attendance */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <CalendarDays className="h-4 w-4 mr-2 text-white/70" />
                <span className="text-sm text-white/90">
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
              <div className="flex items-center bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <MapPin className="h-4 w-4 mr-2 text-white/70" />
                <span className="text-sm text-white/90">
                  {mockEvent.location.split(",")[0]}
                </span>
              </div>
              <div className="flex items-center bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Users className="h-4 w-4 mr-2 text-white/70" />
                <span className="text-sm text-white/90">
                  {mockEvent.attendeeCount} attending
                </span>
              </div>
            </motion.div>
          </div>

          {/* Profile picture positioned to be half in/half out of the banner */}
          {/* <motion.div
            className="absolute z-50 h-20 w-20 sm:h-24 sm:w-24 left-6 sm:left-8 bottom-0 translate-y-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ transform: "translateY(50%)" }} // Force exactly 50% translation
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/40 via-indigo-500/30 to-blue-500/40 blur-md"></div>
            <div className="absolute inset-[3px] rounded-lg bg-black/20 backdrop-blur-sm border border-white/20"></div>
            <div className="relative h-full w-full rounded-xl overflow-hidden border-2 border-white/20">
              <Image
                src="/mntdaopfp.png"
                alt="MTN DAO Logo"
                layout="fill"
                objectFit="cover"
                className="z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent z-20 pointer-events-none"></div>
            </div>
          </motion.div> */}
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
            {/* Event Header */}
            <Card className="border-white/10 bg-white/[0.005] backdrop-blur-xl overflow-hidden rounded-xl shadow-lg shadow-black/5 relative">
              <div className="absolute inset-0 bg-white/[0.003] pointer-events-none" />
              <div className="h-[1px] bg-white/10"></div>
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
            {/* Action buttons */}
            <Card className="border-white/10 bg-white/[0.005] backdrop-blur-xl rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-white/[0.003] pointer-events-none" />
              <div className="h-[1px] bg-white/10"></div>
              <div className="p-4 relative z-10">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex flex-col items-center justify-center h-16 w-full rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <Share2 className="h-5 w-5 mb-1 text-white/80" />
                          <span className="text-xs">Share</span>
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
                          className="flex flex-col items-center justify-center h-16 w-full rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <MessageCircle className="h-5 w-5 mb-1 text-white/80" />
                          <span className="text-xs">Chat</span>
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
                          className="flex flex-col items-center justify-center h-16 w-full rounded-lg hover:bg-white/5 transition-colors"
                          onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                          <Bookmark
                            className={`h-5 w-5 mb-1 ${
                              isBookmarked
                                ? "fill-white/80 text-white/80"
                                : "text-white/80"
                            }`}
                          />
                          <span className="text-xs">Save</span>
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
                          className="flex flex-col items-center justify-center h-16 w-full rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <Download className="h-5 w-5 mb-1 text-white/80" />
                          <span className="text-xs">Export</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Export to calendar</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </Card>

            {/* Event Details Card */}
            <Card className="border-white/10 bg-white/[0.005] backdrop-blur-xl overflow-hidden rounded-xl shadow-lg shadow-black/5 relative">
              <div className="absolute inset-0 bg-white/[0.003] pointer-events-none" />
              <div className="h-[1px] bg-white/10"></div>
              <div className="p-6 relative z-10">
                <h2 className="text-lg font-semibold mb-5 text-white flex items-center">
                  <Hexagon className="h-5 w-5 mr-2 text-white/80 stroke-[1.5]" />
                  Event Details
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="rounded-full bg-white/10 p-2 mr-3 border border-white/10">
                      <CalendarDays className="h-5 w-5 text-white/80" />
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
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-white/10 p-2 mr-3 border border-white/10">
                      <MapPin className="h-5 w-5 text-white/80" />
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
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-white/10 p-2 mr-3 border border-white/10">
                      <Users className="h-5 w-5 text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Attendance
                      </h3>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-300 mr-2">
                          {mockEvent.attendeeCount} / {mockEvent.capacity}
                        </p>
                        <div className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                          {Math.round(
                            (mockEvent.attendeeCount / mockEvent.capacity) * 100
                          )}
                          % Full
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-white/20 rounded-full"
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
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-white mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-white/80" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mockEvent.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-white mb-3">
                    Organized by
                  </h3>
                  <div className="flex items-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <Avatar className="h-10 w-10 mr-3 border-2 border-white/20">
                      <AvatarFallback className="bg-white/10 text-white">
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
            </Card>

            {/* Featured Speakers Card */}
            <Card className="border-white/10 bg-white/[0.005] backdrop-blur-xl overflow-hidden rounded-xl shadow-lg shadow-black/5 relative">
              <div className="absolute inset-0 bg-white/[0.003] pointer-events-none" />
              <div className="h-[1px] bg-white/10"></div>
              <div className="p-6 relative z-10">
                <h2 className="text-lg font-semibold mb-5 text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-white/80 stroke-[1.5]" />
                  Featured Speakers
                </h2>

                <div className="space-y-4">
                  {mockEvent.featuredSpeakers.map((speaker) => (
                    <div
                      key={speaker.id}
                      className="group flex items-center bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
                    >
                      <Avatar className="h-12 w-12 border-2 border-white/20">
                        <AvatarFallback className="bg-white/10 text-white">
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
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 hover:bg-white/5 border border-white/10 hover:border-white/20 transition-colors bg-white/[0.003]"
                >
                  View All Speakers
                </Button>
              </div>
            </Card>

            {/* Sponsors Card */}
            <Card className="border-white/10 bg-white/[0.005] backdrop-blur-xl overflow-hidden rounded-xl shadow-lg shadow-black/5 relative">
              <div className="absolute inset-0 bg-white/[0.003] pointer-events-none" />
              <div className="h-[1px] bg-white/10"></div>
              <div className="p-6 relative z-10">
                <h2 className="text-lg font-semibold mb-4 text-white flex items-center">
                  <Hexagon className="h-5 w-5 mr-2 text-white/80 stroke-[1.5]" />
                  Event Sponsors
                </h2>

                {/* Platinum Sponsors */}
                <div className="mb-5">
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-gray-100/80 to-gray-400/80 mr-2"></span>
                    Platinum
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockEvent.sponsors
                      .filter((s) => s.tier === "PLATINUM")
                      .map((sponsor) => (
                        <div
                          key={sponsor.id}
                          className="flex items-center justify-center h-16 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/[0.008] transition-all backdrop-blur-sm"
                        >
                          <span className="text-sm font-medium">
                            {sponsor.name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Gold Sponsors */}
                <div className="mb-5">
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-yellow-200/80 to-yellow-500/80 mr-2"></span>
                    Gold
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockEvent.sponsors
                      .filter((s) => s.tier === "GOLD")
                      .map((sponsor) => (
                        <div
                          key={sponsor.id}
                          className="flex items-center justify-center h-14 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/[0.008] transition-all backdrop-blur-sm"
                        >
                          <span className="text-sm">{sponsor.name}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Silver Sponsors */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-gray-300/80 to-gray-500/80 mr-2"></span>
                    Silver
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockEvent.sponsors
                      .filter((s) => s.tier === "SILVER")
                      .map((sponsor) => (
                        <div
                          key={sponsor.id}
                          className="flex items-center justify-center h-12 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/[0.008] transition-all backdrop-blur-sm"
                        >
                          <span className="text-sm">{sponsor.name}</span>
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
