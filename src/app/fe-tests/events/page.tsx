"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Filter, Search, ArrowUpDown, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

// Mock events data
const mockEvents = [
  {
    id: "",
    title: "Solana Web3 Conference 2025",
    shortDescription:
      "Join us for the premier Solana ecosystem conference bringing together developers, founders, and community members.",
    startDatetime: "2025-05-23T08:00:00Z",
    endDatetime: "2025-05-24T18:00:00Z",
    location: "Blockchain Convention Center, San Francisco",
    type: "CONFERENCE",
    status: "PUBLISHED",
    attendeeCount: 347,
    capacity: 500,
    tags: ["web3", "solana", "blockchain"],
    featured: true,
    organizer: {
      name: "Solana Foundation",
    },
    bannerImage: "/images/events/solana-conference.jpg",
  },
  {
    id: "event-2",
    title: "DeFi Developer Workshop",
    shortDescription:
      "Learn how to build decentralized finance applications on Solana with hands-on tutorials and expert guidance.",
    startDatetime: "2025-06-15T09:00:00Z",
    endDatetime: "2025-06-15T17:00:00Z",
    location: "Web3 Academy, New York",
    type: "WORKSHOP",
    status: "PUBLISHED",
    attendeeCount: 42,
    capacity: 50,
    tags: ["defi", "solana", "development"],
    featured: false,
    organizer: {
      name: "DeFi Alliance",
    },
    bannerImage: "/images/events/defi-workshop.jpg",
  },
  {
    id: "event-3",
    title: "NFT Creators Meetup",
    shortDescription:
      "Connect with NFT artists, developers, and collectors to share insights and explore collaborations.",
    startDatetime: "2025-06-05T18:00:00Z",
    endDatetime: "2025-06-05T21:00:00Z",
    location: "Digital Art Gallery, Los Angeles",
    type: "NETWORKING",
    status: "PUBLISHED",
    attendeeCount: 78,
    capacity: 100,
    tags: ["nft", "art", "networking"],
    featured: false,
    organizer: {
      name: "Magic Eden",
    },
    bannerImage: "/images/events/nft-meetup.jpg",
  },
  {
    id: "event-4",
    title: "Solana Hackathon 2025",
    shortDescription:
      "A 48-hour hackathon for developers to build innovative projects on the Solana blockchain with $100k in prizes.",
    startDatetime: "2025-07-10T09:00:00Z",
    endDatetime: "2025-07-12T18:00:00Z",
    location: "Tech Innovation Center, Austin",
    type: "HACKATHON",
    status: "PUBLISHED",
    attendeeCount: 203,
    capacity: 300,
    tags: ["hackathon", "solana", "development"],
    featured: true,
    organizer: {
      name: "Solana Labs",
    },
    bannerImage: "/images/events/solana-hackathon.jpg",
  },
  {
    id: "event-5",
    title: "Blockchain Career Fair",
    shortDescription:
      "Connect with top companies in the blockchain space looking to hire talented individuals.",
    startDatetime: "2025-06-28T10:00:00Z",
    endDatetime: "2025-06-28T16:00:00Z",
    location: "Virtual Event",
    type: "CAREER_FAIR",
    status: "PUBLISHED",
    attendeeCount: 156,
    capacity: 500,
    tags: ["career", "jobs", "blockchain"],
    featured: false,
    organizer: {
      name: "Blockchain Jobs Network",
    },
    bannerImage: "/images/events/career-fair.jpg",
  },
];

const eventTypes = [
  { value: "CONFERENCE", label: "Conference" },
  { value: "WORKSHOP", label: "Workshop" },
  { value: "NETWORKING", label: "Networking" },
  { value: "HACKATHON", label: "Hackathon" },
  { value: "CAREER_FAIR", label: "Career Fair" },
  { value: "INFO_SESSION", label: "Info Session" },
];

export default function EventsListingPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");

  // Format date function
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter and sort events
  const filteredEvents = mockEvents
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedEventTypes.length === 0 ||
        selectedEventTypes.includes(event.type);

      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(a.startDatetime).getTime() -
          new Date(b.startDatetime).getTime()
        );
      } else if (sortBy === "popularity") {
        return b.attendeeCount - a.attendeeCount;
      }
      return 0;
    });

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background elements */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px]" />
      </div>
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {" "}
        <header className="mb-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 mb-3">
                Events
              </h1>
              <p className="text-lg text-gray-300">
                Discover and join upcoming events in the Web3 ecosystem
              </p>
            </div>
            <Button
              className="bg-purple-500 hover:bg-purple-600"
              onClick={() => router.push("/fe-tests/events/create")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </header>
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/30 border-white/10"
            />
          </div>

          <div className="flex space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-white/10 bg-black/30"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-black/80 backdrop-blur-md border-white/10">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Event Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {eventTypes.map((type) => (
                      <div
                        key={type.value}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`type-${type.value}`}
                          checked={selectedEventTypes.includes(type.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedEventTypes([
                                ...selectedEventTypes,
                                type.value,
                              ]);
                            } else {
                              setSelectedEventTypes(
                                selectedEventTypes.filter(
                                  (t) => t !== type.value
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`type-${type.value}`}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex justify-between">
                    <Button
                      variant="ghost"
                      className="text-sm hover:bg-white/5"
                      onClick={() => setSelectedEventTypes([])}
                    >
                      Clear Filters
                    </Button>
                    <Button className="text-sm bg-purple-500 hover:bg-purple-600">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-white/10 bg-black/30">
                <div className="flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <span>Sort by</span>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-black/80 backdrop-blur-md border-white/10">
                <SelectItem value="date">Date (Upcoming)</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link href={`/fe-tests/eventpage/${event.id}`} key={event.id}>
              <Card className="h-full border-white/10 bg-black/30 backdrop-blur-md overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/5">
                <div className="h-3 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                <div className="p-4 flex flex-col h-[calc(100%-3px)]">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className="border-purple-400 text-purple-400 px-2 py-0"
                      >
                        {event.type.replace(/_/g, " ")}
                      </Badge>
                      {event.featured && (
                        <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-2 py-0">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-white line-clamp-2">
                      {event.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                    {event.shortDescription}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-2 text-purple-400" />
                      {formatEventDate(event.startDatetime)}
                      {event.startDatetime.split("T")[0] !==
                        event.endDatetime.split("T")[0] &&
                        ` - ${formatEventDate(event.endDatetime)}`}
                    </div>

                    <div className="flex justify-between items-end">
                      <span className="text-xs text-gray-400">
                        By {event.organizer.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {event.attendeeCount} attendees
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium mb-2">No events found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
