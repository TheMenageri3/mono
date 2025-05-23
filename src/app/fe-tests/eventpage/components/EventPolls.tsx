"use client";

import React, { useState, useRef, useEffect } from "react";
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
  ChevronDown,
  Plus,
  Trash2,
  X as CloseIcon,
  UserPlus as UserPlusIcon,
  Calendar,
  Eye,
  EyeOff,
  Check,
  Circle,
  SendHorizontal,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

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
        { id: "5a", text: "Official afterparty at Skybar", votes: 1 },
        { id: "5b", text: "Crypto Karaoke Bar", votes: 0 },
        { id: "5c", text: "drugs", votes: 5 },
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
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([
    { id: "option-1", text: "" },
    { id: "option-2", text: "" },
  ]);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
  );
  const [isPrivate, setIsPrivate] = useState(true);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock friends data
  const friendsList = [
    { id: "1", name: "Alex Johnson", avatar: "AJ" },
    { id: "2", name: "Maya Patel", avatar: "MP" },
    { id: "3", name: "David Kim", avatar: "DK" },
    { id: "4", name: "James Rodriguez", avatar: "JR" },
    { id: "5", name: "Sophia Chen", avatar: "SC" },
    { id: "6", name: "Raj Mehta", avatar: "RM" },
  ];

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCreatePoll(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add a poll option
  const addOption = () => {
    setPollOptions([
      ...pollOptions,
      { id: `option-${pollOptions.length + 1}`, text: "" },
    ]);
  };

  // Remove a poll option
  const removeOption = (id: string) => {
    if (pollOptions.length <= 2) return; // Minimum 2 options
    setPollOptions(pollOptions.filter((option) => option.id !== id));
  };

  // Update option text
  const updateOptionText = (id: string, text: string) => {
    setPollOptions(
      pollOptions.map((option) =>
        option.id === id ? { ...option, text } : option
      )
    );
  };

  // Toggle friend selection
  const toggleFriendSelection = (friendId: string) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  // Create new poll
  const createPoll = () => {
    // Validation
    if (!pollQuestion.trim()) return;
    if (pollOptions.some((option) => !option.text.trim())) return;
    if (selectedFriends.length === 0) return;

    setIsCreating(true);

    // In a real app, you would send this to your backend
    setTimeout(() => {
      console.log({
        question: pollQuestion,
        options: pollOptions,
        endDate,
        isPrivate,
        participants: selectedFriends,
      });

      // Reset form
      setPollQuestion("");
      setPollOptions([
        { id: "option-1", text: "" },
        { id: "option-2", text: "" },
      ]);
      setEndDate(
        new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
      );
      setSelectedFriends([]);
      setIsCreating(false);
      setShowCreatePoll(false);
    }, 1000);
  };

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
        className={`rounded-xl border ${
          endingSoon ? "border-amber-500/20" : "border-white/10"
        } 
    bg-white/[0.003] 
    overflow-hidden shadow-sm shadow-black/5 relative`}
      >
        <div className="absolute inset-0 bg-white/[0.005] pointer-events-none rounded-xl" />
        <div className="h-[1px] bg-white/5"></div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-md font-medium text-white">{poll.question}</h3>
            <div className="flex items-center gap-2">
              {poll.isPrivate && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-white bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
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
                      <div className="flex items-center text-xs text-amber-300 bg-amber-500/20 px-2 py-1 rounded-full backdrop-blur-sm border border-amber-500/20 shadow-sm shadow-amber-900/10">
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
                      className="space-y-1.5 group"
                      variants={itemVariants}
                      whileHover={{ scale: 1.005 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span
                            className={`text-sm font-medium ${
                              isSelected ? "text-purple-400" : "text-gray-200"
                            } group-hover:text-purple-300 transition-colors duration-200`}
                          >
                            {option.text}
                          </span>
                          {isSelected && (
                            <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/20">
                              Your vote
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-200 group-hover:text-purple-300 transition-colors duration-200">
                          {percentage}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner shadow-black/10 border border-white/5 relative">
                        <motion.div
                          className={`h-full ${
                            isSelected ? "bg-white/20" : "bg-white/10"
                          }`}
                          style={{ width: `${percentage}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
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
                      className="flex items-center space-x-3 rounded-md p-3.5 
                        bg-white/[0.003] border border-white/10 
                        hover:border-white/20 hover:bg-white/[0.008] 
                        transition-all duration-200 shadow-sm shadow-black/5 backdrop-blur-sm relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/[0.003] to-fuchsia-600/[0.003] pointer-events-none rounded-md" />
                      <div className="relative z-10 flex items-center space-x-3 w-full">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="text-white/80 border-white/30 focus:border-white/40 focus:ring-offset-0 focus:ring-white/10 focus:ring-offset-transparent focus:ring-2"
                        />
                        <Label
                          htmlFor={option.id}
                          className="w-full cursor-pointer text-sm text-gray-200 font-medium"
                        >
                          {option.text}
                        </Label>
                      </div>
                    </motion.div>
                  ))}
                </RadioGroup>
              </motion.div>
            )}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400 border-t border-white/5 pt-3">
            <div>
              <span className="flex items-center">
                <Activity className="h-3 w-3 mr-1 text-white/70" />
                {poll.totalVotes} votes total
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-white/70" />
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
                    ? "bg-white/10"
                    : "bg-white/[0.005] hover:bg-white/10"
                } text-white/90 font-medium backdrop-blur-md shadow-sm border border-white/10 hover:border-white/20 transition-all duration-200`}
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
    <Card className="border-white/10 bg-white/[0.005] backdrop-blur-xl overflow-hidden rounded-xl shadow-lg shadow-black/5 relative">
      <div className="absolute inset-0 bg-white/[0.003] pointer-events-none" />
      <div className="h-[1px] bg-white/10"></div>
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="bg-white/10 p-2 rounded-lg mr-3 border border-white/10">
              <BarChart3 className="h-5 w-5 text-white/90" />
            </div>
            <h2 className="text-xl font-semibold text-white">Event Polls</h2>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className="bg-white/[0.005] hover:bg-white/[0.01] border border-white/10 hover:border-white/20 text-white font-medium backdrop-blur-md shadow-sm transition-all duration-200"
                  onClick={() => setShowCreatePoll(true)}
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
          <TabsList className="w-full bg-white/[0.005] backdrop-blur-xl border border-white/10 rounded-xl mb-6 p-1 relative">
            <div className="absolute inset-0 bg-white/[0.003] pointer-events-none rounded-xl" />
            <TabsTrigger
              value="event-polls"
              className="flex items-center py-2.5 rounded-lg hover:bg-white/5 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-white/20 transition-all duration-200 backdrop-blur-sm z-10"
            >
              <Users className="h-4 w-4 mr-2" />
              Official Polls
            </TabsTrigger>
            <TabsTrigger
              value="friends-polls"
              className="flex items-center py-2.5 rounded-lg hover:bg-white/5 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-white/20 transition-all duration-200 backdrop-blur-sm z-10"
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

                  <div className="pl-3">
                    <motion.div
                      className="flex items-center gap-1 text-xs text-gray-400 bg-white/[0.005] border border-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit shadow-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Users className="h-3 w-3 mr-1 text-white/70" />
                      <span className="font-medium text-white/80">
                        Participants:
                      </span>
                      <span>{poll.participants.join(", ")}</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              <Separator className="my-6 bg-white/10" />

              <motion.div className="text-center" variants={itemVariants}>
                <Button
                  className="bg-white/[0.005] hover:bg-white/[0.01] border border-white/10 hover:border-white/20 text-white/90 font-medium backdrop-blur-md shadow-sm transition-all duration-200"
                  onClick={() => setShowCreatePoll(!showCreatePoll)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Friends Poll
                  <ChevronDown
                    className={`h-3.5 w-3.5 ml-2 transition-transform duration-200 ${
                      showCreatePoll ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                {/* Create Poll Dropdown */}
                {showCreatePoll && (
                  <motion.div
                    ref={dropdownRef}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-[450px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl z-50 p-5 text-left"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-medium text-white flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Create a Friends Poll
                      </h3>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-full hover:bg-white/10"
                        onClick={() => setShowCreatePoll(false)}
                      >
                        <CloseIcon className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {/* Poll Question */}
                      <div>
                        <label className="block text-xs font-medium text-white/80 mb-1.5">
                          Poll Question
                        </label>
                        <Textarea
                          placeholder="Ask a question..."
                          value={pollQuestion}
                          onChange={(e) => setPollQuestion(e.target.value)}
                          className="bg-white/5 border-white/10 focus-visible:ring-white/20 focus-visible:border-white/20 text-sm resize-none"
                          rows={2}
                        />
                      </div>

                      {/* Poll Options */}
                      <div>
                        <label className="block text-xs font-medium text-white/80 mb-1.5">
                          Options
                        </label>
                        <div className="space-y-2">
                          {pollOptions.map((option) => (
                            <div
                              key={option.id}
                              className="flex items-center gap-2"
                            >
                              <Circle className="h-3 w-3 text-white/40" />
                              <Input
                                placeholder="Option text..."
                                value={option.text}
                                onChange={(e) =>
                                  updateOptionText(option.id, e.target.value)
                                }
                                className="flex-1 h-8 bg-white/5 border-white/10 focus-visible:ring-white/20 focus-visible:border-white/20 text-sm"
                              />
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 rounded-full hover:bg-white/10 text-white/60 hover:text-white/90"
                                onClick={() => removeOption(option.id)}
                                disabled={pollOptions.length <= 2}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-xs text-white/70 hover:text-white/90 hover:bg-white/5"
                          onClick={addOption}
                        >
                          <Plus className="h-3.5 w-3.5 mr-1.5" />
                          Add Option
                        </Button>
                      </div>

                      {/* Settings Row */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* End Date */}
                        <div>
                          <label className=" text-xs font-medium text-white/80 mb-1.5 flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            End Date
                          </label>
                          <Input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="h-8 bg-white/5 border-white/10 focus-visible:ring-white/20 focus-visible:border-white/20 text-sm"
                            min={new Date().toISOString().slice(0, 16)}
                          />
                        </div>

                        {/* Privacy Setting */}
                        <div>
                          <label className=" text-xs font-medium text-white/80 mb-1.5 flex items-center">
                            {isPrivate ? (
                              <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                            ) : (
                              <Eye className="h-3.5 w-3.5 mr-1.5" />
                            )}
                            Privacy
                          </label>
                          <div className="flex items-center h-8 bg-white/5 border border-white/10 rounded-md px-3">
                            <div className="flex items-center flex-1">
                              <Checkbox
                                id="poll-privacy"
                                checked={isPrivate}
                                onCheckedChange={() => setIsPrivate(!isPrivate)}
                                className="border-white/30 data-[state=checked]:bg-white/20 data-[state=checked]:text-white"
                              />
                              <label
                                htmlFor="poll-privacy"
                                className="ml-2 text-sm text-white/80 cursor-pointer"
                              >
                                Private Poll
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Select Friends */}
                      <div>
                        <label className="text-xs font-medium text-white/80 mb-1.5 flex items-center">
                          <UserPlusIcon className="h-3.5 w-3.5 mr-1.5" />
                          Invite Friends{" "}
                          <span className="text-white/50 ml-1">
                            (Select at least one)
                          </span>
                        </label>
                        <div className="max-h-[140px] overflow-y-auto bg-white/[0.008] border border-white/10 rounded-lg p-1">
                          {friendsList.map((friend) => (
                            <div
                              key={friend.id}
                              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                                selectedFriends.includes(friend.id)
                                  ? "bg-white/10"
                                  : "hover:bg-white/5"
                              }`}
                              onClick={() => toggleFriendSelection(friend.id)}
                            >
                              <div className="flex items-center flex-1">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarFallback className="bg-white/10 text-white text-xs">
                                    {friend.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-white/90">
                                  {friend.name}
                                </span>
                              </div>
                              <div
                                className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                  selectedFriends.includes(friend.id)
                                    ? "bg-white/20 border-white/40"
                                    : "border-white/20"
                                }`}
                              >
                                {selectedFriends.includes(friend.id) && (
                                  <Check className="h-3 w-3 text-white/90" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center mt-2 text-xs text-white/60">
                          <span className="flex-1">
                            {selectedFriends.length} friend
                            {selectedFriends.length !== 1 ? "s" : ""} selected
                          </span>
                          {selectedFriends.length > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs hover:bg-white/5 text-white/60"
                              onClick={() => setSelectedFriends([])}
                            >
                              Clear all
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Create Button */}
                      <Button
                        className="w-full bg-white/[0.01] hover:bg-white/[0.03] border border-white/10 hover:border-white/20 text-white/90 transition-all"
                        disabled={
                          !pollQuestion.trim() ||
                          pollOptions.some((option) => !option.text.trim()) ||
                          selectedFriends.length === 0 ||
                          isCreating
                        }
                        onClick={createPoll}
                      >
                        {isCreating ? (
                          <span className="flex items-center">
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white/80 mr-2"></span>
                            Creating Poll...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <SendHorizontal className="h-4 w-4 mr-2" />
                            Create Poll
                          </span>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Create Poll Form */}
        {showCreatePoll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 p-6 rounded-xl bg-white/[0.005] border border-white/10 shadow-md"
            ref={dropdownRef}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Create a Poll
              </h3>
              <Button
                variant="ghost"
                onClick={() => setShowCreatePoll(false)}
                className="text-white/70 hover:text-white"
              >
                <CloseIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white" htmlFor="poll-question">
                  Poll Question
                </Label>
                <Input
                  id="poll-question"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  className="mt-2 bg-white/[0.003] border border-white/10 focus:border-purple-500 focus:ring-0 text-white"
                  placeholder="Enter your poll question"
                />
              </div>

              <div>
                <Label className="text-white" htmlFor="poll-options">
                  Poll Options
                </Label>
                <div className="mt-2 space-y-2">
                  {pollOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between p-3 rounded-md bg-white/[0.003] border border-white/10"
                    >
                      <Input
                        value={option.text}
                        onChange={(e) =>
                          updateOptionText(option.id, e.target.value)
                        }
                        className="bg-transparent focus:ring-0 text-white"
                        placeholder={`Option ${option.id.split("-")[1]}`}
                      />
                      <Button
                        variant="outline"
                        onClick={() => removeOption(option.id)}
                        className="text-white/70 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={addOption}
                  className="mt-2 w-full bg-white/[0.005] hover:bg-white/[0.01] text-white font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>

              <div>
                <Label className="text-white" htmlFor="end-date">
                  End Date & Time
                </Label>
                <Input
                  id="end-date"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-2 bg-white/[0.003] border border-white/10 focus:border-purple-500 focus:ring-0 text-white"
                />
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="is-private"
                  checked={isPrivate}
                  onCheckedChange={(checked) => setIsPrivate(!!checked)}
                  className="h-5 w-5 text-purple-600 bg-white/10 border-white/10 rounded-md"
                />
                <Label htmlFor="is-private" className="ml-2 text-sm text-white">
                  Private Poll
                </Label>
              </div>

              {isPrivate && (
                <div className="mt-4">
                  <Label className="text-white" htmlFor="participants">
                    Select Participants
                  </Label>
                  <div className="mt-2 rounded-md bg-white/[0.003] border border-white/10">
                    {friendsList.map((friend) => (
                      <div
                        key={friend.id}
                        className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-all duration-200 ${
                          selectedFriends.includes(friend.id)
                            ? "bg-purple-600/10"
                            : "hover:bg-white/10"
                        }`}
                        onClick={() => toggleFriendSelection(friend.id)}
                      >
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarFallback>{friend.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-white">
                            {friend.name}
                          </span>
                        </div>
                        {selectedFriends.includes(friend.id) && (
                          <Check className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={createPoll}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create Poll"}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}
