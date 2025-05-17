"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, ChevronRight } from "lucide-react";

interface ForumThread {
  id: number;
  title: string;
  author: string;
  replies: number;
  timeAgo: string;
}

export function DiscussionsTab() {
  // Define discussions data
  const forumThreads: ForumThread[] = [
    {
      id: 1,
      title: "Best practices for optimizing Solana program compute units?",
      author: "Maya Johnson",
      replies: 14,
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "Having trouble with serializing nested structs",
      author: "Raj Patel",
      replies: 8,
      timeAgo: "Yesterday",
    },
    {
      id: 3,
      title: "Resources for learning anchor framework",
      author: "Chris Wong",
      replies: 22,
      timeAgo: "3 days ago",
    },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Class Forum section */}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-bold">Class Forum</h2>
          </div>
          <p className="text-white/60 mt-1">
            Join conversations with your classmates and instructors
          </p>
        </div>

        {/* Thread list */}
        <div className="space-y-4">
          {forumThreads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>

        {/* Visit Forum Button */}
        <Button className="w-full py-6 bg-purple-500 hover:bg-purple-600 text-white font-medium">
          Visit Full Forum
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

interface ThreadCardProps {
  thread: ForumThread;
}

function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <Card className="backdrop-blur-md bg-black/30 border border-white/10 hover:bg-white/[0.05] transition-colors">
      <div className="p-4 sm:p-5">
        <h3 className="font-medium text-lg mb-1">{thread.title}</h3>
        <div className="text-sm text-white/60">Started by {thread.author}</div>
        <div className="flex justify-end items-center mt-2 text-sm text-white/70">
          <div className="flex items-center mr-4">
            <MessageSquare className="h-4 w-4 mr-1.5 opacity-70" />
            <span>{thread.replies} replies</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1.5 opacity-70" />
            <span>{thread.timeAgo}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
