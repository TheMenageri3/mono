"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Code, PlusCircle, Eye } from "lucide-react";
import Link from "next/link";

interface Assignment {
  id: number;
  title: string;
  type: "milestone" | "quiz" | "review";
  status: "Not Started" | "In Progress" | "Completed";
  dueDate: string;
  points: number;
  icon: React.ReactNode;
}

export function AssignmentsTab() {
  const upcomingAssignments: Assignment[] = [
    {
      id: 1,
      title: "Solana Program Development - Milestone 2",
      type: "milestone",
      status: "Not Started",
      dueDate: "Due: May 25, 2025",
      points: 100,
      icon: <FileText className="h-5 w-5 text-purple-400" />,
    },
    {
      id: 2,
      title: "Smart Contract Security Quiz",
      type: "quiz",
      status: "Not Started",
      dueDate: "Due: May 17, 2025",
      points: 50,
      icon: <FileText className="h-5 w-5 text-yellow-400" />,
    },
    {
      id: 3,
      title: "Weekly Code Review",
      type: "review",
      status: "In Progress",
      dueDate: "Due: May 18, 2025",
      points: 50,
      icon: <Code className="h-5 w-5 text-cyan-400" />,
    },
  ];

  const pastAssignments: Assignment[] = [
    {
      id: 4,
      title: "Solana Program Development - Milestone 1",
      type: "milestone",
      status: "Completed",
      dueDate: "Due: May 1, 2025",
      points: 100,
      icon: <FileText className="h-5 w-5 text-purple-400" />,
    },
    {
      id: 5,
      title: "Rust Fundamentals Quiz",
      type: "quiz",
      status: "Completed",
      dueDate: "Due: Apr 24, 2025",
      points: 50,
      icon: <FileText className="h-5 w-5 text-yellow-400" />,
    },
  ];

  const upcomingDeadlines = [
    {
      title: "Solana Program Development - Milestone 2",
      date: "May 20, 2025",
      color: "bg-yellow-500",
    },
    {
      title: "Smart Contract Security Quiz",
      date: "May 17, 2025",
      color: "bg-red-500",
    },
    {
      title: "Weekly Code Review",
      date: "May 15, 2025",
      color: "bg-red-500",
    },
  ];

  const AssignmentCard = ({ assignment }: { assignment: Assignment }) => (
    <Card className="backdrop-blur-md bg-black/30 border border-white/10 hover:bg-white/[0.02] transition-colors">
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="mt-1">{assignment.icon}</div>
          <div>
            <h3 className="font-medium">{assignment.title}</h3>
            <div className="mt-1 flex items-center space-x-4 text-sm text-white/60">
              <span>{assignment.dueDate}</span>
              <span>• {assignment.points} points</span>
            </div>
          </div>
        </div>
        <Badge
          className={`${
            assignment.status === "Not Started"
              ? "bg-gray-700/50 text-gray-200 border-gray-500/30"
              : assignment.status === "In Progress"
              ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
              : "bg-green-500/20 text-green-300 border-green-500/30"
          }`}
        >
          {assignment.status}
        </Badge>
      </div>
    </Card>
  );

  const DeadlineItem = ({
    title,
    date,
    color,
  }: {
    title: string;
    date: string;
    color: string;
  }) => (
    <div className="flex items-start">
      <div
        className={`mr-3 h-2.5 w-2.5 rounded-full ${color} flex-shrink-0 mt-1.5`}
      ></div>
      <div className="flex-1">
        <span className="text-sm">{title}</span>
      </div>
      <div className="ml-4 px-3 py-1 bg-black/40 rounded-md">
        <span className="text-xs text-white/70 whitespace-nowrap">{date}</span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-2 space-y-6">
        <div>
          <h2 className="mb-4 text-xl font-bold">Upcoming Assignments</h2>
          <p className="mb-4 text-sm text-white/60">
            Due within the next two weeks
          </p>
          <div className="space-y-3">
            {upcomingAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">Past Assignments</h2>
          <p className="mb-4 text-sm text-white/60">
            Previously completed assignments
          </p>
          <div className="space-y-3">
            {pastAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="backdrop-blur-md bg-black/30 border border-white/10">
          <div className="p-6">
            <h2 className="mb-6 text-lg font-bold">Instructor Tools</h2>
            <div className="space-y-2">
              <Link href="/fe-tests/classroom/assignments/creation">
                <Button className="w-full justify-center bg-purple-500 hover:bg-purple-600">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Assignment
                </Button>
              </Link>
              <Link href="/fe-tests/classroom/assignments/review">
                <Button
                  variant="ghost"
                  className="w-full justify-center bg-transparent text-white hover:bg-white/5"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Review Submissions
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="backdrop-blur-md bg-black/30 border border-white/10">
          <div className="p-6">
            <h2 className="mb-6 text-lg font-bold">Your Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-white/60">
                    Assignments Completed
                  </span>
                  <span className="text-sm font-medium">2/5</span>
                </div>
                <Progress
                  value={40}
                  className="h-2 bg-white/5 [&>div]:bg-purple-500"
                />
              </div>
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-white/60">Current Grade</span>
                  <span className="text-sm font-medium">A- (92%)</span>
                </div>
                <Progress
                  value={92}
                  className="h-2 bg-white/5 [&>div]:bg-green-500"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="backdrop-blur-md bg-black/30 border border-white/10">
          <div className="p-4">
            <h2 className="mb-6 text-xl font-semibold">Upcoming Deadlines</h2>
            <div className="space-y-5">
              {upcomingDeadlines.map((deadline, index) => (
                <DeadlineItem
                  key={index}
                  title={deadline.title}
                  date={deadline.date}
                  color={deadline.color}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
