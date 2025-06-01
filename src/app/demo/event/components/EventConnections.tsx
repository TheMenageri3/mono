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
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
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
      badgeClass =
        "bg-emerald-500/10 text-emerald-300/90 border-emerald-500/20";
      statusText = "Attending";
      icon = <Check className="h-3 w-3 mr-1" />;
    } else if (status === "maybe") {
      badgeClass = "bg-amber-500/10 text-amber-300/90 border-amber-500/20";
      statusText = "Maybe";
      icon = <UserCog className="h-3 w-3 mr-1" />;
    } else if (status === "not_attending") {
      badgeClass = "bg-red-500/10 text-red-300/90 border-red-500/20";
      statusText = "Not Attending";
      icon = <X className="h-3 w-3 mr-1" />;
    } else {
      badgeClass = "bg-gray-500/10 text-gray-300/90 border-gray-500/20";
      icon = <UserRound className="h-3 w-3 mr-1" />;
    }

    return (
      <Badge
        variant="outline"
        className={cn(
          "flex items-center px-2 border backdrop-blur-sm",
          badgeClass
        )}
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
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleConnect = () => {
      setIsConnecting(true);
      // Simulate connection request
      setTimeout(() => {
        setIsConnecting(false);
      }, 1000);
    };

    const handleSendMessage = () => {
      if (!message.trim()) return;

      setIsSending(true);
      // Simulate sending message
      setTimeout(() => {
        setIsSending(false);
        setMessage("");
        // Optional: you could add the message to a messages array to display chat history
      }, 800);
    };

    return (
      <div className="relative">
        {" "}
        <motion.div
          variants={itemVariants}
          className="flex items-center p-4 rounded-xl bg-gradient-to-r from-white/[0.02] to-emerald-500/[0.02] hover:from-white/[0.03] hover:to-emerald-500/[0.03] transition-all border border-emerald-500/20 hover:border-emerald-500/30 group relative overflow-hidden shadow-lg shadow-emerald-500/5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Enhanced glow effect on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.02] to-teal-500/[0.02] pointer-events-none"></div>
          )}

          <Avatar className="flex-shrink-0 h-12 w-12 border-2 border-emerald-400/30">
            <AvatarFallback className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-white">
              {person.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="ml-3 flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-white/90 transition-colors">
                  {person.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {person.role} at {person.company}
                </p>
              </div>
              <StatusBadge status={person.status} />
            </div>{" "}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="flex items-center text-xs text-gray-400 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-2 py-1 rounded-full border border-emerald-400/30">
                <Wallet className="h-3 w-3 mr-1.5 text-emerald-300" />
                <span>{person.shortWalletAddress}</span>
              </div>

              <div className="flex items-center text-xs text-gray-400">
                <UserCheck className="h-3 w-3 mr-1.5 text-emerald-300" />
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
                    ? "bg-white/10 border-white/20 text-white"
                    : "border-white/10 hover:bg-white/10 hover:border-white/20"
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
                  className={cn(
                    "rounded-full h-9 w-9 p-0 bg-white/5 hover:bg-white/10 hover:text-white transition-colors",
                    showMessageBox &&
                      "bg-white/10 text-white ring-1 ring-white/20"
                  )}
                  onClick={() => setShowMessageBox(!showMessageBox)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </motion.div>
        {/* Message box that appears beneath the card */}
        <AnimatePresence>
          {showMessageBox && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1 mb-3 overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-white/[0.008] border border-white/10 backdrop-blur-md shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0">
                    <Avatar className="h-8 w-8 border border-white/20">
                      <AvatarFallback className="bg-white/10 text-white text-xs">
                        {person.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-2 flex-1">
                    <p className="text-xs font-medium text-white/90">
                      Message {person.name.split(" ")[0]}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 rounded-full"
                    onClick={() => setShowMessageBox(false)}
                  >
                    <X className="h-3.5 w-3.5 text-white/70" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/5 border-white/10 focus-visible:ring-white/20 focus-visible:border-white/20 text-sm h-9"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      className="ml-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isSending}
                    >
                      {isSending ? (
                        <span className="flex items-center">
                          <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white/80 mr-2"></span>
                          <span className="text-xs text-white/90">Sending</span>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <span className="text-xs text-white/90">Send</span>
                          <ArrowRight className="h-3 w-3 ml-1 text-white/90" />
                        </span>
                      )}
                    </Button>
                  </div>

                  <div className="text-xs text-gray-400 flex items-center">
                    <div className="flex-1">
                      <span className="mr-4">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500/50 mr-1"></span>
                        Online
                      </span>
                      <span>
                        <Clock className="h-3 w-3 inline mr-1 mb-0.5 text-white/50" />
                        Usually responds in a few minutes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  return (
    <Card className="border-emerald-500/20 bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-emerald-500/[0.02] backdrop-blur-xl overflow-hidden rounded-xl shadow-lg shadow-emerald-500/10 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-teal-500/[0.03] pointer-events-none" />
      <div className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
      <div className="p-6 relative z-10">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-2 rounded-lg mr-3 border border-emerald-400/30">
            <Users className="h-5 w-5 text-emerald-300" />
          </div>
          <h2 className="text-xl font-semibold text-white">My Connections</h2>
        </div>
        <Tabs defaultValue="attending" className="w-full">
          {" "}
          <TabsList className="w-full bg-gradient-to-r from-white/[0.02] via-white/[0.01] to-white/[0.02] backdrop-blur-xl border border-emerald-500/20 rounded-xl mb-6 p-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-teal-500/[0.02] pointer-events-none rounded-xl" />
            <TabsTrigger
              value="attending"
              className="flex items-center py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-emerald-400/40 transition-all duration-200 backdrop-blur-md z-10"
            >
              <UserRound className="h-4 w-4 mr-2" />
              My Connections
            </TabsTrigger>
            <TabsTrigger
              value="suggested"
              className="flex items-center py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-emerald-400/40 transition-all duration-200 backdrop-blur-md z-10"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Suggested Connections
            </TabsTrigger>
          </TabsList>
          <div className="relative mb-6">
            {" "}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
            <Input
              placeholder="Search connections..."
              className="pl-10 bg-gradient-to-r from-white/[0.02] to-emerald-500/[0.02] border-emerald-500/20 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/40 placeholder:text-white/40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <TabsContent value="attending" className="space-y-3">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <ConnectionCard key={friend.id} person={friend} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>No connected friends attending this event yet.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
          <TabsContent value="suggested" className="space-y-3">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {filteredSuggestions.map((connection) => (
                <ConnectionCard
                  key={connection.id}
                  person={connection}
                  showConnect
                />
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>{" "}
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className="border-emerald-400/30 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 hover:border-emerald-400/50 transition-all backdrop-blur-sm shadow-lg shadow-emerald-500/20"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite More Connections
          </Button>
        </div>
      </div>
    </Card>
  );
}
