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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ContactCard } from "@/components/features/ContactCard";
import { format, addDays } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TabsContainer } from "./components/TabsContainer";
import SupportTicketPieChart from "./components/SupportTicketPieChart";
import SupportTicketLineChart from "./components/SupportTicketLineChart";

const questionsData = [
  {
    isRequired: true,
    title: `Explain the difference between a program-derived address (PDA) and a normal
account address in Solana.`,
    caption: "Keep your answer concise, around 2-3 sentences.",
    element: "short-answer",
  },
  {
    isRequired: true,
    title: `Describe how you would implement cross-program invocation (CPI) in your project.
What are the security considerations?`,
    caption: "Include code examples if relevant.",
    element: "long-answer",
  },
  {
    isRequired: true,
    title: `Which of the following is NOT a valid account constraint in Solana programs?`,
    caption: null,
    element: "radio",
    options: ["init", "mut", "signer", "async", "seeds"],
  },
  {
    isRequired: true,
    title: `Select all data types that are natively supported by Borsh serialization in Solana
programs:`,
    caption: null,
    element: "multi-check",
    options: [
      "u8, u16, u32, u64, u128",
      "i8, i16, i32, i64, i128",
      "String",
      "HashMap",
      "Vec<T>",
    ],
  },
  {
    isRequired: true,
    title: `Enter your program's deployed public key on devnet:`,
    caption: `This should be the program you've deployed for Milestone 2.`,
    element: "short-answer",
    placeholder: "Enter Solana public key",
  },
  {
    isRequired: true,
    title: `Upload your program's source code as a ZIP file:`,
    caption: `Please include a README.md file with build and test instructions.`,
    element: "file",
  },
  {
    isRequired: false,
    title: `How confident are you in your understanding of Solana program development?`,
    caption: `1 = Not confident, 5 = Very confident`,
    element: "h-radio",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    isRequired: true,
    title: `Which Solana client library are you primarily using for your project?`,
    caption: null,
    element: "select",
    options: ["spl-token", "web3.js", "solana-scaffold"],
  },
];

const ticketInfo = [
  {
    title: "Login authentication failed",
    priority: "high",
    tags: ["critical", "login", "bug"],
    description: [
      "I'm unable to login to my account after the recent update. It keeps showing an error message.",
    ],
    status: "open",
  },
  {
    title: "Payment processing error",
    priority: "high",
    tags: ["payment", "urgent"],
    description: [
      "When trying to make a payment, I get an error message saying 'Unable to process payment at this time'.",
    ],
    status: "in progress",
  },
  {
    title: "Feature request: Dark mode",
    priority: "medium",
    tags: ["feature", "enhancement", "ui"],
    description: [
      "It would be great to have a dark mode option for the dashboard to reduce eye strain when working late.",
    ],
    status: "pending",
  },
  {
    title: "Dashboard data not loading",
    priority: "medium",
    tags: ["analytics", "bug", "fixed"],
    description: [
      "My analytics dashboard is showing a loading spinner but never displays the data.",
    ],
    status: "resolved",
  },
  {
    title: "Account deletion request",
    priority: "low",
    tags: ["account", "privacy", "deletion"],
    description: [
      "I would like to delete my account and all associated data in accordance with privacy regulations.",
    ],
    status: "closed",
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
              Admin Panel
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
                    My Tickets
                  </CardTitle>
                  <p className="text-white/60 text-[12px] mt-1">
                    Submit and track your support requests
                  </p>
                </div>
                <Input className="w-[200px]" placeholder="Search tickets..." />
              </CardHeader>

              <CardContent className="pt-4">
                <TabsContainer />
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
                          </div>
                          <p className="text-white text-[13.61px] font-semibold">
                            Login authentication failed
                          </p>
                          <p className="text-white/60 text-[9.96px] ">
                            Updated 3d ago
                          </p>
                          <div className="flex flex-row gap-1">
                            {ticket.tags.map((tag, tagIndex) => {
                              return (
                                <Badge
                                  className="w-fit text-[9.62px] bg-white/5 text-white-300 border-white-500/30 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                                  key={tagIndex}
                                >
                                  {tag}
                                </Badge>
                              );
                            })}
                          </div>
                          <p className="text-white/60 text-[11.62px] ">
                            {`I'm unable to login to my account after the recent
                            update. It keeps showing an error message.`}
                          </p>
                        </div>
                      </div>
                      {/* Status */}
                      <div>
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
                <CardHeader className="border-b border-white/5 bg-gradient-to-r from-white/[0.07] to-transparent">
                  <div className="flex flex-row gap-2 items-center">
                    <Badge className="w-fit text-[9.96px] bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                      <TriangleAlert className="h-3 w-3 mr-1" />
                      open
                    </Badge>
                    <span className="text-[13.8px]"># T-1001</span>
                    <Badge className="w-fit ml-auto text-[9.96px] bg-red-500/20 text-red-300 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                      high priority
                    </Badge>
                  </div>
                  <p className="text-[17.02px] font-semibold">
                    Login authentication failed
                  </p>
                  <div className="flex flex-row gap-1">
                    <Badge className="w-fit text-[9.96px] bg-white-500/20 text-white-300 border-white-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                      login
                    </Badge>
                    <Badge className="w-fit text-[9.96px] bg-white-500/20 text-white-300 border-white-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                      critical
                    </Badge>
                    <Badge className="w-fit text-[9.96px] bg-white-500/20 text-white-300 border-white-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                      bug
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="w-full flex flex-row gap-2">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1 ">
                      <p className="text-[12.01px] font-semibold">
                        Alex Morgan
                      </p>
                      <p className="text-white/60 text-[9.79px]">
                        Created: May 20, 2025, 08:30 AM
                      </p>
                      <p className="text-[11.81px] text-white/80">
                        {`I'm unable to login to my account after the recent
                        update. It keeps showing an error message.`}
                      </p>
                    </div>
                  </div>
                  <div className="mt-[19px]">
                    <div className="w-full flex flex-row gap-2 items-center mb-2">
                      <LucideMessageSquare className="h-4 w-4" />
                      <p className="text-[13.16px]">Comments (1)</p>
                    </div>
                    <div className="w-full flex flex-row gap-2 bg-white/5 border-1 border-white/10 p-3 rounded-lg">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1 ">
                        <div className="flex flex-row justify-between">
                          <p className="text-[12.01px] font-semibold">
                            Alex Morgan
                          </p>
                          <p className="text-white/60 text-[9.79px]">
                            May 20, 2025, 08:30 AM
                          </p>
                        </div>
                        <p className="text-[11.81px] text-white/80">
                          {`I'm unable to login to my account after the recent
                          update. It keeps showing an error message.`}
                        </p>
                      </div>
                    </div>

                    <Textarea
                      className="mt-4 h-[100px] bg-white/5 placeholder:text-[11.62px] placeholder::text-white/60"
                      placeholder="Add a comment..."
                    />

                    <div className="flex flex-row justify-end">
                      <Button
                        onClick={() => {}}
                        className="mt-4  relative group overflow-hidden backdrop-blur-md bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                      >
                        <span className="absolute -inset-x-1 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300"></span>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="border-t border-white/5 px-6 py-4 flex-row gap-4 flex-wrap">
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    className="px-2 relative group overflow-hidden backdrop-blur-md bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all text-[11.81px]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <Timer className="h-4 w-4 mr-2 text-white" />
                    Mark In Progress
                  </Button>
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    className="px-2  relative group overflow-hidden backdrop-blur-md bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all text-[11.81px]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <BadgeCheck className="h-4 w-4 mr-2 text-purple-300" />
                    Mark Resolved
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
                  <SupportTicketPieChart />
                  <SupportTicketLineChart />
                  <div className="flex flex-row gap-2">
                    <div className="bg-purple-600/10 border w-full  border-purple-600/40 p-4 py-0 rounded-lg flex flex-row justify-between items-center">
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
