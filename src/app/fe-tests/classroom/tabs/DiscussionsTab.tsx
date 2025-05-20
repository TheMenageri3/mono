"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ForumThread {
  id: number;
  title: string;
  author: string;
  replies: number;
  timeAgo: string;
}

export function DiscussionsTab() {
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
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-bold">Class Forum</h2>
          </div>
          <p className="text-white/60 mt-1">
            Join conversations with your classmates and instructors
          </p>
        </div>

        <div className="space-y-4">
          {forumThreads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>

        <Link href="/fe-tests/solana-forum" className="flex justify-end">
          <Button className="relative group overflow-hidden backdrop-blur-md bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-white/10 text-white hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-orange-500/30 hover:border-white/20 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-orange-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -inset-x-1 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent group-hover:via-orange-500/70 transition-all duration-300"></span>
            <span className="relative flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-orange-300" />
              Visit Full Forum
            </span>
          </Button>
        </Link>
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
