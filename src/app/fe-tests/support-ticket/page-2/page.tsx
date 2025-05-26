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

import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  LucidePlus,
  LucideMessageSquare,
  CircleX,
  Send,
  Clock1,
  TriangleAlert,
  UserRound,
  UsersRound,
  ArrowUpRight,
  CircleCheck,
  Clock2,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

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

const ticketMetricsData = [
  { number: 67, label: "Total Tickets" },
  { number: 12, label: "Open", color: "cyan" },
  { number: 8, label: "In Progress", color: "purple" },
  { number: 5, label: "pending", color: "yellow" },
  { number: 24, label: "resolved", color: "green" },
  { number: 24, label: "closed" },
];

const recentActivityData = [
  {
    time: "10 minutes ago",
    name: "Taylor Swift",
    text: "responded to ticket T-1002: Payment processing error",
  },
  {
    time: "25 minutes ago",
    name: "Robin Smith",
    text: " assigned ticket to Morgan Freeman T-1004: Dashboard data not loading",
  },
  {
    time: "1 hour ago",
    name: "Jamie Davis",
    text: " changed status to Closed T-1005: Account deletion request",
  },
  {
    time: "2 hour ago",
    name: "Morgan Freeman",
    text: " added internal note T-1004: Dashboard data not loading",
  },
  {
    time: "3 hour ago",
    name: "Current User",
    text: " created ticket T-1001: Login authentication failed",
  },
];

const teamData = [
  { name: "Taylor Swift", numberOfTickets: 8, progress: 80 },
  { name: "John Smith", numberOfTickets: 11, progress: 60 },
  { name: "Morgan Freeman", numberOfTickets: 5, progress: 40 },
  { name: "Bob Delton", numberOfTickets: 10, progress: 90 },
];

export default function SubmissionPage() {
  const [showSettings] = useState(false);

  const [currentTicket, setCurrentTicket] = useState<any | null>(null);

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

        <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.07)]">
          <CardContent className="pt-6 flex flex-col gap-3">
            <div className="flex flex-row gap-3">
              {ticketMetricsData.map((ticket, idx) => {
                const color = ticket.color;
                return (
                  <div
                    className={`p-3 ${
                      color
                        ? `bg-${color}-600/10 text-${color}-300 border-${color}-500/30 `
                        : "bg-white/5 border border-white/10 "
                    } rounded-lg w-full`}
                    key={idx}
                  >
                    <div className="text-2xl font-bold mb-1">
                      {ticket.number}
                    </div>
                    <div
                      className={`text-xs ${
                        color ? `text-${color}-400` : "text-white/60"
                      }  uppercase tracking-wider`}
                    >
                      {ticket.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-row gap-3">
              <div className="bg-white/5 border w-full  border-white/10 p-4 rounded-lg flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <div className="text-[11.81px] text-white/60">
                    Avg. Response Time
                  </div>
                  <div className="text-[17.72px] font-bold">1h 23m</div>
                </div>
                <div className="p-2 bg-cyan-500/20 rounded-full">
                  <Clock1 className="h-4 w-4  text-cyan-300 " />
                </div>
              </div>
              <div className="bg-white/5 border w-full  border-white/10 p-4 rounded-lg flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <div className="text-[11.81px] text-white/60">
                    Avg. Responses
                  </div>
                  <div className="text-[17.72px] font-bold">8h 23m</div>
                </div>
                <div className="p-2 bg-purple-500/20 rounded-full">
                  <CircleCheck className="h-4 w-4  text-purple-300 " />
                </div>
              </div>
              <div className="bg-white/5 border w-full  border-white/10 p-4 rounded-lg flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <div className="text-[11.81px] text-white/60">
                    Customer Satisfaction
                  </div>
                  <div className="text-[17.72px] font-bold">94%</div>
                </div>
                <div className="p-2 bg-green-500/20 rounded-full">
                  <ArrowUpRight className="h-4 w-4  text-green-300 " />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
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
                <div className="flex flex-row items-center gap-1">
                  <Input
                    className="w-[200px]  bg-white/5"
                    placeholder="Search tickets..."
                  />
                  <Button
                    variant="outline"
                    className="border-white/10 bg-white/5"
                  >
                    <Filter className="h-4 w-4" />
                  
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                {ticketInfo.map((ticket, i) => (
                  <Fragment key={i}>
                    <div
                      className="w-full flex flex-row justify-between py-6 px-1  "
                      onClick={() => {
                        setCurrentTicket({ ...ticket, index: i + 1 });
                      }}
                    >
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
                           {`I'm unable to login to my account after the recent
                            update. It keeps showing an error message.`}
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
              {!currentTicket && (
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
              )}

              {currentTicket && (
                <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.07)]">
                  <CardHeader className="border-b border-white/5 bg-gradient-to-r from-white/[0.07] to-transparent">
                    <div className="flex flex-row gap-2 items-center">
                      <span className="text-[13.8px] bg-white/5 text-white border-white/30 p-1 rounded-full">
                        T-100{currentTicket.index}
                      </span>
                      {currentTicket.status === "open" && (
                        <Badge className="w-fit text-[9.96px] bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                          <TriangleAlert className="h-3 w-3 mr-1" />
                          open
                        </Badge>
                      )}
                      {currentTicket.status === "closed" && (
                        <Badge className="w-fit text-[9.96px] bg-white/20 text-white border-white/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                          <TriangleAlert className="h-3 w-3 mr-1" />
                          closed
                        </Badge>
                      )}
                      {currentTicket.status === "resolved" && (
                        <Badge className="w-fit text-[9.96px] bg-green-500/20 text-green-300 border-green-500/30  shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                          <TriangleAlert className="h-3 w-3 mr-1" />
                          resolved
                        </Badge>
                      )}
                      {currentTicket.status === "pending" && (
                        <Badge className="w-fit text-[9.96px] bg-yellow-500/20 text-yellow-300 border-yellow-500/30  shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                          <TriangleAlert className="h-3 w-3 mr-1" />
                          pending
                        </Badge>
                      )}
                      {currentTicket.status === "in progress" && (
                        <Badge className="w-fit text-[9.96px] bg-purple-500/20 text-purple-300 border-purple-500/30  shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                          <TriangleAlert className="h-3 w-3 mr-1" />
                          in progress
                        </Badge>
                      )}

                      {currentTicket.priority === "high" && (
                        <Badge className="w-fit ml-auto text-[9.96px] bg-red-500/20 text-red-300 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                          high priority
                        </Badge>
                      )}
                      {currentTicket.priority === "low" && (
                        <Badge className="w-fit ml-auto text-[9.96px] bg-green-500/20 text-green-300 border-green-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                          low
                        </Badge>
                      )}
                      {currentTicket.priority === "medium" && (
                        <Badge className="w-fit ml-auto text-[9.96px] bg-yellow-500/20 text-yellow-300 border-yellow-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                          medium
                        </Badge>
                      )}
                      {currentTicket.priority === "in progress" && (
                        <Badge className="w-fit ml-auto text-[9.96px] bg-yellow-500/20 text-yellow-300 border-yellow-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                          medium
                        </Badge>
                      )}
                    </div>
                    <p className="text-[17.02px] font-semibold">
                      {currentTicket.title}
                    </p>
                    <div className="flex flex-row gap-1">
                      {currentTicket.tags.map((tag: any, tagIdx: number) => {
                        return (
                          <Badge
                            className="w-fit text-[9.96px] bg-white-500/20 text-white-300 border-white-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]"
                            key={tagIdx}
                          >
                            login
                          </Badge>
                        );
                      })}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <p className="text-xs text-white/60 mb-2">Customer</p>
                    <div className="w-full flex flex-row gap-2">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <p className="text-[12.01px] font-semibold">
                          Alex Morgan
                        </p>{" "}
                        <p className="text-[11.81px] text-white/80">
                          email@example.com
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mt-3 mb-1">
                      Assigned To
                    </p>
                    <div className="flex flex-row gap-1 items-center">
                      <UserRound className="h-3 w-3 text-white/60" />
                      <p className="text-[11px] text-white/60">Unassigned</p>
                    </div>
                    <p className="text-xs text-white/60 mt-3 mb-1">
                      Description
                    </p>
                    <p className="text-[11px] text-white/60">
                      {`I'm unable to login to my account after the recent
                        update. It keeps showing an error message.`}
                    </p>
                    <div className="mt-[19px]">
                      <div className="w-full flex flex-row justify-between items-center mb-2">
                        <p className="text-white/60 text-[12px]">Timeline</p>
                        <p className="text-white/60 text-[12px] p-1 bg-white/5 rounded-full">
                          1 comment
                        </p>
                      </div>
                      <div className="w-full flex flex-row gap-2 bg-white/5 border-1 border-white/10 p-3 rounded-lg">
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1  w-full">
                          <div className="flex flex-row justify-between">
                            <p className="text-[12.01px] font-semibold">
                              Alex Morgan
                            </p>
                            <p className="text-white/60 text-[9.79px]">
                              May 20, 2025, 08:30 AM
                            </p>
                          </div>
                          <p className="text-[11.81px] text-white/80">
                            Ticket {currentTicket.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mt-4">
                        <p className="text-white/60 text-[12px]">
                          Add Internal Note
                        </p>
                        <Textarea
                          className="h-[100px] bg-white/5 placeholder:text-[11.62px] placeholder::text-white/60"
                          placeholder="Add a internal note(not visible to customer)..."
                        />
                      </div>

                      <div className="flex flex-row justify-end">
                        <Button
                          onClick={() => {}}
                          className="mt-4 text-[12px]  relative group overflow-hidden backdrop-blur-md bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                        >
                          <span className="absolute -inset-x-1 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300"></span>
                          <Send className="h-4 w-4 mr-2" />
                          Add Internal Note
                        </Button>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-white/5 px-6 py-4 flex-row justify-between flex-wrap">
                    <Button
                      onClick={() => {}}
                      className="text-[12px]  relative group overflow-hidden backdrop-blur-md bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <LucideMessageSquare className="h-4 w-4 mr-2 text-black" />
                      Reply to Customer
                    </Button>
                    <Button
                      onClick={() => {}}
                      variant="outline"
                      className="px-2 relative group overflow-hidden backdrop-blur-md bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all text-[11.81px]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <CircleX className="h-4 w-4 mr-2 text-purple-300" />
                      Close Ticket
                    </Button>
                  </CardFooter>
                </Card>
              )}

              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
                <CardContent className="pt-6 flex-col gap-4">
                  <div className="flex flex-row gap-1 items-center mb-3">
                    <UsersRound className="h-5 w-5 mr-1 text-purple-400" />
                    <p className="text-lg font-bold">Team Performance</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {teamData.map((member, idx) => {
                      return (
                        <div className="flex flex-row gap-2" key={idx}>
                          <Avatar>
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                              className="h-7 w-7"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-2 w-full">
                            <div className="flex flex-row justify-between">
                              <p className="text-xs">{member.name}</p>
                              <p className="text-white/60 text-[10px] mt-[3px]">
                                {member.numberOfTickets} tickets handled
                              </p>
                            </div>
                            <Progress
                              value={member.progress}
                              className="h-[6.5px] bg-white/5 [&>div]:bg-white"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Card className="mt-4 backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.07)]">
          <CardHeader className="border-b border-white/5 flex-row justify-between items-center">
            <div className="flex-col">
              <CardTitle className="flex items-center gap-2 bg-t">
                <Clock2 className="h-5 w-5 text-purple-500" />
                Recent Activity
              </CardTitle>
              <p className="text-white/60 text-[12px] mt-1">
                Latest actions taken in the support system
              </p>
            </div>
          </CardHeader>

          <CardContent className="pt-4 flex flex-col gap-7">
            {recentActivityData.map((rData, idx) => {
              return (
                <div
                  className="flex flex-row text-xs border-b border-white/10 pb-5 "
                  key={idx}
                >
                  <p className="text-white/60 w-[120px]">{rData.time}</p>
                  <p className="text-white/60">
                    <span className="text-white">{rData.name}</span>
                    {rData.text}
                  </p>
                  <p className="text-white/60 ml-auto">View</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
