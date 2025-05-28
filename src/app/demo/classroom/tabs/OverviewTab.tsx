"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Clock,
  Award,
  MessageSquare,
  FileText,
  Code,
  Bell,
  Users,
  CheckCircle,
} from "lucide-react";

export function OverviewTab() {
  const stats = [
    {
      value: "42",
      label: "Students Enrolled",
      icon: <Users className="h-8 w-8 text-purple-400" />,
    },
    {
      value: "78%",
      label: "Avg. Completion Rate",
      icon: <CheckCircle className="h-8 w-8 text-blue-400" />,
    },
    {
      value: "87/100",
      label: "Average Score",
      icon: <Award className="h-8 w-8 text-purple-400" />,
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Final Project Guidelines Released",
      content:
        "I've just uploaded the guidelines for the final project. Please review them and start planning your submissions.",
      date: "May 10, 2025",
      author: "Prof. Alex Morgan",
    },
    {
      id: 2,
      title: "Guest Lecture: Advanced Smart Contracts",
      content:
        "We'll have a special guest lecturer from Solana core developer Sarah Chen this Friday. Don't miss it!",
      date: "May 8, 2025",
      author: "Prof. Alex Morgan",
    },
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: "Solana Program Development - Milestone 2",
      dueDate: "May 20, 2025",
      points: 100,
      status: "Not Started",
      icon: <FileText className="h-5 w-5 text-purple-400" />,
    },
    {
      id: 2,
      title: "Smart Contract Security Quiz",
      dueDate: "May 17, 2025",
      points: 50,
      status: "Not Started",
      icon: <FileText className="h-5 w-5 text-yellow-400" />,
    },
    {
      id: 3,
      title: "Weekly Code Review",
      dueDate: "May 15, 2025",
      points: 50,
      status: "In Progress",
      icon: <Code className="h-5 w-5 text-cyan-400" />,
    },
  ];

  const recentDiscussions = [
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="backdrop-blur-md bg-black/30 border border-white/10"
          >
            <div className="py-8 px-6 flex flex-col items-center justify-center text-center">
              <div className="mb-4">{stat.icon}</div>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="backdrop-blur-md bg-black/30 border border-white/10">
        <div className="p-5">
          <div className="flex items-center mb-6">
            <Bell className="h-5 w-5 mr-2 text-purple-400" />
            <h2 className="text-lg font-bold">Recent Announcements</h2>
          </div>
          <div className="space-y-8">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="pb-8 border-b border-white/10 last:border-0 last:pb-0"
              >
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-orange-400 mt-2 mr-3 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-md">
                        {announcement.title}
                      </h3>
                      <span className="text-xs text-white/60 bg-black/40 px-2 py-1 rounded ml-2">
                        {announcement.date}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 mt-2 mb-2">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-white/50">
                      Posted by {announcement.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full justify-center mt-4 text-white/70 hover:text-white hover:bg-white/5"
          >
            View All Announcements
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Card className="backdrop-blur-md bg-black/30 border border-white/10">
        <div className="p-5">
          <div className="flex items-center mb-6">
            <FileText className="h-5 w-5 mr-2 text-purple-400" />
            <h2 className="text-lg font-bold">Upcoming Assignments</h2>
          </div>
          <div className="space-y-6">
            {upcomingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-start justify-between pb-6 border-b border-white/10 last:border-0 last:pb-0"
              >
                <div className="flex items-start">
                  <div className="mt-1 mr-3">{assignment.icon}</div>
                  <div>
                    <h3 className="font-medium">{assignment.title}</h3>
                    <div className="flex items-center text-xs text-white/60 mt-2">
                      <span>Due: {assignment.dueDate}</span>
                      <span className="mx-2">•</span>
                      <span>{assignment.points} points</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 text-xs rounded-md ${
                    assignment.status === "Not Started"
                      ? "bg-gray-800/60 text-gray-200"
                      : assignment.status === "In Progress"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-green-500/20 text-green-300"
                  }`}
                >
                  {assignment.status}
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full justify-center mt-4 text-white/70 hover:text-white hover:bg-white/5"
          >
            View All Assignments
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Card className="backdrop-blur-md bg-black/30 border border-white/10">
        <div className="p-5">
          <div className="flex items-center mb-6">
            <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
            <h2 className="text-lg font-bold">Recent Discussions</h2>
          </div>
          <div className="space-y-6">
            {recentDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="pb-6 border-b border-white/10 last:border-0 last:pb-0"
              >
                <h3 className="font-medium mb-2">{discussion.title}</h3>
                <p className="text-xs text-white/60 mb-3">
                  Started by {discussion.author}
                </p>
                <div className="flex justify-end items-center text-xs text-white/60">
                  <div className="flex items-center mr-3">
                    <MessageSquare className="h-3 w-3 mr-1 opacity-70" />
                    <span>{discussion.replies} replies</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 opacity-70" />
                    <span>{discussion.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full justify-center mt-4 text-white/70 hover:text-white hover:bg-white/5"
          >
            Visit Forum
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
