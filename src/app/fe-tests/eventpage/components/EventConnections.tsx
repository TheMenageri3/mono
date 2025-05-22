"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Users,
  UserRound,
  MessageCircle,
  MessageSquare,
  UserPlus,
  Search,
  Check,
  X,
  UserCog,
  BadgeCheck,
  UserCheck,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock connections data
const mockConnections = {
  friends: [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "/images/avatars/alex.jpg",
      walletAddress: "8YUb5PGSm1MgHqJiJCCMeFyJ9KMnKgLnVWbFskYHtXjG",
      shortWalletAddress: "8YUb...tXjG",
      status: "attending",
      role: "Developer",
      company: "Solana Labs",
      mutualConnections: 12,
    },
    {
      id: "2",
      name: "Maya Patel",
      avatar: "/images/avatars/maya.jpg",
      walletAddress: "5zKd1EXdA2J3oCYvmVGCTbXKgEGSJAzAAbJKMxEKxnfd",
      shortWalletAddress: "5zKd...xnfd",
      status: "attending",
      role: "Designer",
      company: "Phantom",
      mutualConnections: 8,
    },
    {
      id: "3",
      name: "David Kim",
      avatar: "/images/avatars/david.jpg",
      walletAddress: "3uL6jHkR1TBDNrT4ZvUxds5FUh8tZLnxbRXuTVs9E8Aq",
      shortWalletAddress: "3uL6...E8Aq",
      status: "maybe",
      role: "Product Manager",
      company: "Metaplex",
      mutualConnections: 5,
    },
    {
      id: "4",
      name: "Sarah Wilson",
      avatar: "/images/avatars/sarah.jpg",
      walletAddress: "9PYb3NaU2Dq5XDMGRfeCd15JKKaGgmkLarUURF9uJyGu",
      shortWalletAddress: "9PYb...yGu",
      status: "not_attending",
      role: "Blockchain Engineer",
      company: "Solflare",
      mutualConnections: 3,
    },
    {
      id: "5",
      name: "James Rodriguez",
      avatar: "/images/avatars/james.jpg",
      walletAddress: "7Hn1XR5KJ9ESjX2JJgJv8ZTkTBNSGPh6vjvJmQ4CKN5C",
      shortWalletAddress: "7Hn1...KN5C",
      status: "attending",
      role: "DeFi Developer",
      company: "Serum",
      mutualConnections: 7,
    },
  ],
  suggestedConnections: [
    {
      id: "6",
      name: "Liam Chen",
      avatar: "/images/avatars/liam.jpg",
      walletAddress: "6VYtT8CzAAJjVDTXRDwzNd9PvTTQyRnpTKUsHvZvYNcj",
      shortWalletAddress: "6VYt...vYNcj",
      status: "attending",
      role: "DAO Specialist",
      company: "Mango Markets",
      mutualConnections: 3,
    },
    {
      id: "7",
      name: "Olivia Baker",
      avatar: "/images/avatars/olivia.jpg",
      walletAddress: "2GqJHkYMX9CeuRocbm5cH5JmgwiGLA1C8LRciDuuHDrg",
      shortWalletAddress: "2GqJ...uHDrg",
      status: "attending",
      role: "NFT Artist",
      company: "Magic Eden",
      mutualConnections: 2,
    },
    {
      id: "8",
      name: "Ethan Jackson",
      avatar: "/images/avatars/ethan.jpg",
      walletAddress: "4xKUD8iJYBqnEXtjrK6ByFWBEVmnCK7pVsUoBTxzPojS",
      shortWalletAddress: "4xKU...xzPojS",
      status: "attending",
      role: "Investment Analyst",
      company: "Multicoin Capital",
      mutualConnections: 1,
    },
  ],
};

interface EventConnectionsProps {
  eventId: string;
}

export default function EventConnections({ eventId }: EventConnectionsProps) {
  // In a real app, you would fetch the connections data based on the eventId
  const connections = mockConnections;
  const [searchQuery, setSearchQuery] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Filter connections based on search query
  const filteredFriends = connections.friends.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggestions = connections.suggestedConnections.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status badge component with enhanced styling
  const StatusBadge = ({ status }: { status: string }) => {
    let badgeClass = "";
    let statusText = "Not Confirmed";
    let icon = null;

    if (status === "attending") {
      badgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      statusText = "Attending";
      icon = <Check className="h-3 w-3 mr-1" />;
    } else if (status === "maybe") {
      badgeClass = "bg-amber-500/20 text-amber-300 border-amber-500/30";
      statusText = "Maybe";
      icon = <UserCog className="h-3 w-3 mr-1" />;
    } else if (status === "not_attending") {
      badgeClass = "bg-red-500/20 text-red-300 border-red-500/30";
      statusText = "Not Attending";
      icon = <X className="h-3 w-3 mr-1" />;
    } else {
      badgeClass = "bg-gray-500/20 text-gray-300 border-gray-500/30";
      icon = <UserRound className="h-3 w-3 mr-1" />;
    }

    return (
      <Badge
        variant="outline"
        className={cn("flex items-center px-2 border", badgeClass)}
      >
        {icon}
        <span className="text-xs">{statusText}</span>
      </Badge>
    );
  };

  // Connection card component with improved styling
  const ConnectionCard = ({
    person,
    showConnect = false,
  }: {
    person: any;
    showConnect?: boolean;
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = () => {
      setIsConnecting(true);
      // Simulate connection request
      setTimeout(() => {
        setIsConnecting(false);
      }, 1000);
    };

    return (
      <motion.div
        variants={itemVariants}
        className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-all border border-white/10 hover:border-purple-500/30 group relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle glow effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 animate-pulse pointer-events-none"></div>
        )}

        <Avatar className="flex-shrink-0 h-12 w-12 border-2 border-purple-500/30">
          <AvatarFallback className="bg-purple-500/30 text-white">
            {person.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="ml-3 flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate group-hover:text-purple-200 transition-colors">
                {person.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {person.role} at {person.company}
              </p>
            </div>
            <StatusBadge status={person.status} />
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex items-center text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
              <Wallet className="h-3 w-3 mr-1.5 text-purple-400" />
              <span>{person.shortWalletAddress}</span>
            </div>

            <div className="flex items-center text-xs text-gray-400">
              <UserCheck className="h-3 w-3 mr-1.5 text-purple-400" />
              <span>{person.mutualConnections} mutual</span>
            </div>
          </div>
        </div>

        <div className="ml-4 flex-shrink-0 flex space-x-2">
          {showConnect ? (
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "transition-all",
                isConnecting
                  ? "bg-purple-500/20 border-purple-500 text-purple-300"
                  : "border-white/10 hover:bg-white/10 hover:border-purple-400/50"
              )}
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <span className="flex items-center">
                  <span className="animate-pulse">Connecting</span>
                </span>
              ) : (
                <span className="flex items-center">
                  <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                  Connect
                </span>
              )}
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full h-9 w-9 p-0 bg-white/5 hover:bg-purple-500/20 hover:text-purple-300"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <Card className="border-white/10 bg-black/30 backdrop-blur-md">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Users className="h-5 w-5 mr-2 text-purple-400" />
          <h2 className="text-xl font-bold text-white">My Connections</h2>
        </div>

        <Tabs defaultValue="attending" className="w-full">
          <TabsList className="w-full bg-black/30 border border-white/10 rounded-lg mb-6">
            <TabsTrigger
              value="attending"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white flex items-center"
            >
              <UserRound className="h-4 w-4 mr-1" />
              My Connections
            </TabsTrigger>
            <TabsTrigger
              value="suggested"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white flex items-center"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Suggested Connections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attending" className="space-y-3">
            {connections.friends.length > 0 ? (
              connections.friends.map((friend) => (
                <ConnectionCard key={friend.id} person={friend} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No connected friends attending this event yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="suggested" className="space-y-3">
            {connections.suggestedConnections.map((connection) => (
              <ConnectionCard
                key={connection.id}
                person={connection}
                showConnect
              />
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className="border-purple-500/30 hover:bg-purple-500/10"
          >
            Invite More Connections
          </Button>
        </div>
      </div>
    </Card>
  );
}
