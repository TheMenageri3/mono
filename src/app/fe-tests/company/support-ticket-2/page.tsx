"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  LucideCircleCheckBig,
  ArrowLeft,
  Upload,
  Save,
  Clock,
  Calendar,
  FileCheck,
  AlertTriangle,
  HelpCircle,
  LucidePlus,
  LucideBatteryWarning,
  LucideMailWarning,
  LucideMessageSquare,
  Timer,
  CircleX,
  BadgeCheck,
  Send,
  Clock1,
  TriangleAlert,
  UserRound,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ContactCard } from "@/components/features/ContactCard";
import { format, addDays } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ticketInfo = [
  {
    title: "Login authentication failed",
    priority: "high",
    tags: ["critical", "login", "bug"],
    description: [
      "I'm unable to login to my account after the recent update. It keeps showing an error message.",
    ],
    status: "open",
    name: "Alex Morgan",
    assignee: "Unassigned",
  },
  {
    title: "Payment processing error",
    priority: "high",
    tags: ["payment", "urgent"],
    description: [
      "When trying to make a payment, I get an error message saying 'Unable to process payment at this time'.",
    ],
    status: "in progress",
    name: "Jordan Lee",
    assignee: "Assigned to Taylor Swift",
  },
  {
    title: "Feature request: Dark mode",
    priority: "medium",
    tags: ["feature", "enhancement", "ui"],
    description: [
      "It would be great to have a dark mode option for the dashboard to reduce eye strain when working late.",
    ],
    status: "pending",
    name: "Jordan Lee",
    assignee: "Assigned to Robin Smith",
  },
  {
    title: "Dashboard data not loading",
    priority: "medium",
    tags: ["analytics", "bug", "fixed"],
    description: [
      "My analytics dashboard is showing a loading spinner but never displays the data.",
    ],
    status: "resolved",
    name: "Reese Johnson",
    assignee: "Assigned to Robin Smith",
  },
  {
    title: "Account deletion request",
    priority: "low",
    tags: ["account", "privacy", "deletion"],
    description: [
      "I would like to delete my account and all associated data in accordance with privacy regulations.",
    ],
    status: "closed",
    name: "Taylor Rodriguez",
    assignee: "Assigned to Jamie Davis",
  },
];

export default function SubmissionPage() {
  const [showSettings] = useState(false);
  const [focusedQuestion, setFocusedQuestion] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number>(22);
  const dueDate = addDays(new Date(), 6);

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Enhanced background with dynamic gradients */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[180px] animate-pulse-slower" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-medium" />
        <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      {/* Grid overlay with subtle animation */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Subtle floating particles effect */}
      <div className="fixed inset-0 z-[-1] opacity-30">
        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-white rounded-full animate-float-slow"></div>
        <div className="absolute top-[35%] left-[80%] w-1 h-1 bg-white rounded-full animate-float-medium"></div>
        <div className="absolute top-[65%] left-[30%] w-1 h-1 bg-white rounded-full animate-float-fast"></div>
        <div className="absolute top-[85%] left-[70%] w-1 h-1 bg-white rounded-full animate-float-slow"></div>
        <div className="absolute top-[25%] left-[40%] w-1 h-1 bg-white rounded-full animate-float-fast"></div>
      </div>

      {/* Main content container */}
      <div className="container max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
          <div className="flex items-center">
            <Link href="/fe-tests/classroom" className="mr-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/5 hover:bg-white/10 hover:text-purple-300 transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 leading-tight">
                Support Ticketing
              </h1>
              <p className="text-white/60 max-w-2xl mt-1">
                Submit and track support requests
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start">
            <Button
              onClick={() => {}}
              variant="outline"
              className="relative group overflow-hidden backdrop-blur-md bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              User View
            </Button>
            <Button
              onClick={() => {}}
              className="relative group overflow-hidden backdrop-blur-md bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <span className="absolute -inset-x-1 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300"></span>
              <LucidePlus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editing Area - 2/3 width */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.07)]">
              <CardHeader className="border-b border-white/5 flex-row justify-between items-center">
                <div className="flex-col">
                  <CardTitle className="flex items-center gap-2 bg-t">
                    Ticket Management
                  </CardTitle>
                  <p className="text-white/60 text-[12px] mt-1">
                    Manage and respond to all support tickets
                  </p>
                </div>
                <Input className="w-[200px]" placeholder="Search tickets..." />
              </CardHeader>

              <CardContent className="pt-4">
                {ticketInfo.map((ticket, i) => (
                  <Fragment key={i}>
                    <div className="w-full flex flex-row justify-between py-6 px-1  ">
                      {/* Main */}
                      <div className="flex flex-row gap-4 ">
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-[3px]">
                          <div className="flex flex-row gap-1">
                            <Badge className="w-fit text-[9.96px] bg-white-500/20 text-white-300 border-white-500/30 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
                              T-100{i + 1}
                            </Badge>
                            {ticket.priority === "high" && (
                              <Badge className="w-fit text-[9.96px] bg-red-500/20 text-red-300 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                                high
                              </Badge>
                            )}
                            {ticket.priority === "medium" && (
                              <Badge className="w-fit text-[9.96px] bg-yellow-500/20 text-yellow-300 border-yellow-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                                medium
                              </Badge>
                            )}
                            {ticket.priority === "low" && (
                              <Badge className="w-fit text-[9.96px] bg-green-500/20 text-green-300 border-green-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                                low
                              </Badge>
                            )}
                            <p className="text-[12px] ml-2">{ticket.name}</p>
                          </div>
                          <p className="text-white text-[13.61px] font-semibold">
                            Login authentication failed
                          </p>
                          <div className="flex flex-row items-center">
                            <Clock1 className="h-2.5 w-2.5 text-white/60 mr-1" />
                            <p className="text-white/60 text-[9.96px]">
                              Created May 20, 2025, 08:30 AM
                            </p>
                          </div>

                          <p className="text-white/60 text-[11.62px] ">
                            I'm unable to login to my account after the recent
                            update. It keeps showing an error message.
                          </p>
                        </div>
                      </div>
                      {/* Status */}
                      <div className="flex flex-col items-end">
                        {ticket.status === "in progress" && (
                          <Badge className="w-fit text-[9.96px] bg-purple-500/20 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                            in progress
                          </Badge>
                        )}
                        {ticket.status === "open" && (
                          <Badge className="w-fit text-[9.96px] bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                            open
                          </Badge>
                        )}
                        {ticket.status === "pending" && (
                          <Badge className="w-fit text-[9.96px] bg-yellow-500/20 text-yellow-300 border-yellow-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                            pending
                          </Badge>
                        )}
                        {ticket.status === "resolved" && (
                          <Badge className="w-fit text-[9.96px] bg-green-500/20 text-green-300 border-green-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                            resolved
                          </Badge>
                        )}
                        {ticket.status === "closed" && (
                          <Badge className="w-fit text-[9.96px] bg-white-500/20 text-white-300 border-white-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                            closed
                          </Badge>
                        )}
                        <div className="flex flex-row gap-1 items-center mt-2">
                          <UserRound className="h-3 w-3 text-white/60" />
                          <p className="text-white/60 text-[9.76px]">
                            {ticket.assignee}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-white/10 mx-[-16px]"></div>
                  </Fragment>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            {/* Settings Panel */}
            <div
              className={cn(
                "space-y-5 sticky top-8 transition-all",
                showSettings ? "opacity-100" : "opacity-100"
              )}
            >
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.07)]">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-2 items-center h-[400px] justify-center text-white/60">
                    <UsersRound className="h-9 w-9 text-white/60" />
                    <p className="text-[15px]">Select a ticket to manage</p>
                    <p className="text-[12px]">
                      View details and respond to customer inquiries
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-row gap-4">
                <div className="bg-white/5 border w-full  border-white/10 p-4 rounded-lg flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <div className="text-[11.42px] text-white/60">
                      Avg. Responses
                    </div>
                    <div className="text-[16.73px] font-bold">1h 23m</div>
                  </div>
                  <div className="p-2 bg-cyan-500/20 rounded-full">
                    <Clock1 className="h-4 w-4  text-cyan-300 " />
                  </div>
                </div>
                <div className="bg-white/5 border w-full  border-white/10 p-4 rounded-lg flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <div className="text-[11.42px] text-white/60">
                      Satisfaction
                    </div>
                    <div className="text-[16.73px] font-bold">94%</div>
                  </div>
                  <div className="p-2 bg-green-500/20 rounded-full">
                    <BadgeCheck className="h-4 w-4  text-green-300 " />
                  </div>
                </div>
              </div>

              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
                <CardContent className="pt-6 flex-col gap-4">
                  <p>Ticket Insights</p>
                  <div className="flex flex-row gap-2">
                    <div className="bg-purple-600/10 border w-full  border-purple-600/40 p-4 rounded-lg flex flex-row justify-between items-center">
                      <div className="flex flex-col items-center">
                        <div className="text-[9.96px] text-white/60">Open</div>
                        <div className="text-[16.73px] font-bold">12</div>
                      </div>
                    </div>
                    <div className="border w-full bg-cyan-600/10   border-cyan-600/40 p-4 rounded-lg flex flex-row justify-between items-center">
                      <div className="flex flex-col items-center">
                        <div className="text-[9.96px] text-white/60">
                          InProgress
                        </div>
                        <div className="text-[16.73px] font-bold">8</div>
                      </div>
                    </div>
                    <div className=" border w-full  bg-green-600/10   border-green-600/40 p-4 rounded-lg flex flex-row justify-between items-center">
                      <div className="flex flex-col items-center">
                        <div className="text-[9.96px] text-white/60">
                          Resolved
                        </div>
                        <div className="text-[16.73px] font-bold">24</div>
                      </div>
                    </div>
                    <div className=" border w-full bg-white/5   border-white/40 px-4 py-1 rounded-lg flex flex-row justify-between items-center">
                      <div className="flex flex-col items-center">
                        <div className="text-[9.96px] text-white/60">Total</div>
                        <div className="text-[16.73px] font-bold">44</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
