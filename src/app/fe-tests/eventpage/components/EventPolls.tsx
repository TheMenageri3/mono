"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart3,
  Users,
  Lock,
  Settings,
  UserPlus,
  Clock,
  Activity,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock polls data
const mockPolls = {
  eventPolls: [
    {
      id: "1",
      question: "Which workshop are you most interested in attending?",
      totalVotes: 156,
      options: [
        { id: "1a", text: "Building on Solana", votes: 78 },
        { id: "1b", text: "NFT Creation and Minting", votes: 42 },
        { id: "1c", text: "DeFi Protocol Development", votes: 36 },
      ],
      hasVoted: true,
      myVote: "1a",
      createdBy: "Event Organizer",
      createdAt: "2025-05-15T14:30:00Z",
      endsAt: "2025-05-23T00:00:00Z",
      isActive: true,
    },
    {
      id: "2",
      question:
        "What topic would you like to see covered in the closing panel?",
      totalVotes: 142,
      options: [
        { id: "2a", text: "Cross-chain interoperability", votes: 67 },
        { id: "2b", text: "DeFi's Future in 2026", votes: 48 },
        { id: "2c", text: "NFT Use Cases Beyond Art", votes: 27 },
      ],
      hasVoted: true,
      myVote: "2b",
      createdBy: "Event Organizer",
      createdAt: "2025-05-16T09:15:00Z",
      endsAt: "2025-05-24T00:00:00Z",
      isActive: true,
    },
    {
      id: "3",
      question: "Would you be interested in a post-event networking session?",
      totalVotes: 118,
      options: [
        { id: "3a", text: "Yes, definitely", votes: 89 },
        { id: "3b", text: "Maybe, depending on time", votes: 24 },
        { id: "3c", text: "No, not interested", votes: 5 },
      ],
      hasVoted: false,
      createdBy: "Event Organizer",
      createdAt: "2025-05-17T11:45:00Z",
      endsAt: "2025-05-23T12:00:00Z",
      isActive: true,
    },
  ],
  friendPolls: [
    {
      id: "4",
      question: "Where should we grab lunch on Day 1?",
      totalVotes: 8,
      options: [
        { id: "4a", text: "Blockchain Bistro (in venue)", votes: 3 },
        { id: "4b", text: "Satoshi's Sushi (5 min walk)", votes: 4 },
        { id: "4c", text: "Decentralized Deli (10 min walk)", votes: 1 },
      ],
      hasVoted: true,
      myVote: "4b",
      createdBy: "Alex Johnson",
      createdAt: "2025-05-21T08:30:00Z",
      endsAt: "2025-05-23T11:30:00Z",
      isActive: true,
      isPrivate: true,
      participants: [
        "Alex Johnson",
        "Maya Patel",
        "David Kim",
        "You",
        "James Rodriguez",
      ],
    },
    {
      id: "5",
      question: "After party plans for Saturday?",
      totalVotes: 6,
      options: [
        { id: "5a", text: "Official afterparty at Skybar", votes: 3 },
        { id: "5b", text: "Crypto Karaoke Bar", votes: 1 },
        { id: "5c", text: "Web3 Lounge", votes: 2 },
      ],
      hasVoted: false,
      createdBy: "Maya Patel",
      createdAt: "2025-05-20T19:20:00Z",
      endsAt: "2025-05-24T18:00:00Z",
      isActive: true,
      isPrivate: true,
      participants: ["Maya Patel", "Alex Johnson", "You", "James Rodriguez"],
    },
  ],
};

interface EventPollsProps {
  eventId: string;
}

// Animation variants
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

const progressVariants = {
  hidden: { width: 0 },
  show: { width: "100%" },
};

export default function EventPolls({ eventId }: EventPollsProps) {
  // In a real app, you would fetch the polls data based on the eventId
  const polls = mockPolls;

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.abs(Math.round(diffMs / (1000 * 60 * 60)));
    const diffDays = Math.abs(Math.round(diffMs / (1000 * 60 * 60 * 24)));

    if (diffMs < 0) return "Ended";
    if (diffHours < 1) return "Ending soon";
    if (diffHours < 24) return `Ends in ${diffHours}h`;
    return `Ends in ${diffDays}d`;
  };

  // Calculate percentage
  const calculatePercentage = (votes: number, totalVotes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  // Poll card component
  const PollCard = ({
    poll,
    isPollCard = true,
  }: {
    poll: any;
    isPollCard?: boolean;
  }) => {
    const [selectedOption, setSelectedOption] = React.useState(
      poll.hasVoted ? poll.myVote : ""
    );
    const [hasVoted, setHasVoted] = React.useState(poll.hasVoted);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleVote = () => {
      if (!selectedOption) return;

      setIsSubmitting(true);
      // In a real app, you would send this vote to your backend
      setTimeout(() => {
        console.log(`Voted for option ${selectedOption} on poll ${poll.id}`);
        setHasVoted(true);
        setIsSubmitting(false);
      }, 700);
    };

    const endingSoon = formatRelativeTime(poll.endsAt) === "Ending soon";

    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className={`rounded-lg border ${
          endingSoon ? "border-amber-500/30" : "border-white/10"
        } 
          bg-gradient-to-b from-white/10 to-black/50 backdrop-blur-xl 
          overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.1)]`}
      >
        <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-md font-medium text-white">{poll.question}</h3>
            <div className="flex items-center gap-2">
              {poll.isPrivate && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                        <Lock className="h-3 w-3 mr-1" />
                        Private
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        Only visible to selected participants
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {endingSoon && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-amber-400 bg-amber-500/20 px-2 py-1 rounded-full">
                        <Clock className="h-3 w-3 mr-1" />
                        Ending Soon
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">This poll is ending very soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>

          <div className="mb-4">
            {hasVoted ? (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {poll.options.map((option: any) => {
                  const percentage = calculatePercentage(
                    option.votes,
                    poll.totalVotes
                  );
                  const isSelected = poll.myVote === option.id;

                  return (
                    <motion.div
                      key={option.id}
                      className="space-y-1.5"
                      variants={itemVariants}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span
                            className={`text-sm font-medium ${
                              isSelected ? "text-purple-400" : "text-gray-200"
                            }`}
                          >
                            {option.text}
                          </span>
                          {isSelected && (
                            <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                              Your vote
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-200">
                          {percentage}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            isSelected
                              ? "bg-gradient-to-r from-purple-600 to-blue-500"
                              : "bg-white/30"
                          }`}
                          style={{ width: `${percentage}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                      <div className="text-xs text-gray-400 flex justify-end">
                        {option.votes} votes
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <RadioGroup
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                  className="space-y-3"
                >
                  {poll.options.map((option: any) => (
                    <motion.div
                      key={option.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center space-x-2 rounded-md p-3 
                        bg-black/40 border border-white/10 
                        hover:border-purple-500/30 hover:bg-black/50 
                        transition-all duration-200"
                    >
                      <RadioGroupItem
                        value={option.id}
                        id={option.id}
                        className="text-purple-400 border-white/30"
                      />
                      <Label
                        htmlFor={option.id}
                        className="w-full cursor-pointer text-sm text-gray-200"
                      >
                        {option.text}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </motion.div>
            )}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400 border-t border-white/5 pt-3">
            <div>
              <span className="flex items-center">
                <Activity className="h-3 w-3 mr-1 text-purple-400" />
                {poll.totalVotes} votes total
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-purple-400" />
              <span>{formatDate(poll.endsAt)}</span>
            </div>
          </div>

          {!hasVoted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={handleVote}
                disabled={!selectedOption || isSubmitting}
                className={`mt-4 w-full ${
                  isSubmitting
                    ? "bg-purple-700/50"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                } text-white font-medium`}
              >
                {isSubmitting ? "Submitting..." : "Submit Vote"}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <Card className="border-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-xl overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.15)] rounded-xl">
      <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
              <BarChart3 className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Event Polls</h2>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Create Poll
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Create a new poll for event attendees</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Tabs defaultValue="event-polls" className="w-full">
          <TabsList className="w-full bg-black/50 border border-white/10 rounded-lg mb-6 p-1">
            <TabsTrigger
              value="event-polls"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-blue-500/20 
                data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500 
                rounded-md flex items-center transition-all duration-200"
            >
              <Users className="h-4 w-4 mr-2" />
              Official Polls
            </TabsTrigger>
            <TabsTrigger
              value="friends-polls"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-blue-500/20 
                data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500 
                rounded-md flex items-center transition-all duration-200"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Friends Polls
            </TabsTrigger>
          </TabsList>

          <TabsContent value="event-polls">
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {polls.eventPolls.map((poll) => (
                <PollCard key={poll.id} poll={poll} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="friends-polls">
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {polls.friendPolls.map((poll) => (
                <motion.div
                  key={poll.id}
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <PollCard poll={poll} />

                  <motion.div
                    className="pl-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-1 text-xs text-gray-400 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit">
                      <Users className="h-3 w-3 mr-1 text-purple-400" />
                      <span className="font-medium text-purple-300">
                        Participants:
                      </span>
                      <span>{poll.participants.join(", ")}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              <Separator className="my-6 bg-white/10" />

              <motion.div className="text-center" variants={itemVariants}>
                <Button className="bg-black/40 border border-purple-500/30 hover:bg-purple-500/10 text-purple-300">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Friends Poll
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
