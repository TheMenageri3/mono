"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket,
  MessageSquare,
  Bell,
  User,
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  RefreshCw,
  MoreHorizontal,
  Calendar,
  Tag,
  Users,
  PieChart,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Import components
import NewTicketDialog from "./components/NewTicketDialog";
import TicketDetails from "./components/TicketDetails";
import AdminTicketPanel from "./components/AdminTicketPanel";
import TicketStats from "./components/TicketStats";

// Mock data for tickets
const MOCK_TICKETS = [
  {
    id: "T-1001",
    title: "Login authentication failed",
    description:
      "I'm unable to login to my account after the recent update. It keeps showing an error message.",
    status: "open",
    priority: "high",
    category: "authentication",
    createdAt: "2025-05-20T08:30:00",
    updatedAt: "2025-05-20T10:15:00",
    user: {
      name: "Alex Morgan",
      email: "alex@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    assignedTo: null,
    comments: [
      {
        id: "c1",
        text: "I've tried clearing cache and cookies, but still having the issue.",
        createdAt: "2025-05-20T09:00:00",
        user: {
          name: "Alex Morgan",
          isAdmin: false,
          avatar: "https://github.com/shadcn.png",
        },
      },
    ],
    tags: ["login", "critical", "bug"],
  },
  {
    id: "T-1002",
    title: "Payment processing error",
    description:
      "When trying to make a payment, I get an error message saying 'Unable to process payment at this time'.",
    status: "in-progress",
    priority: "high",
    category: "billing",
    createdAt: "2025-05-19T14:20:00",
    updatedAt: "2025-05-20T11:30:00",
    user: {
      name: "Jordan Lee",
      email: "jordan@example.com",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=jordan",
    },
    assignedTo: {
      name: "Taylor Swift",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=taylor",
    },
    comments: [
      {
        id: "c2",
        text: "I've checked my card details and they are correct.",
        createdAt: "2025-05-19T15:10:00",
        user: {
          name: "Jordan Lee",
          isAdmin: false,
          avatar: "https://api.dicebear.com/7.x/personas/svg?seed=jordan",
        },
      },
      {
        id: "c3",
        text: "We're investigating this issue with our payment processor. Will update you shortly.",
        createdAt: "2025-05-20T09:45:00",
        user: {
          name: "Taylor Swift",
          isAdmin: true,
          avatar: "https://api.dicebear.com/7.x/personas/svg?seed=taylor",
        },
        isInternal: true,
      },
    ],
    tags: ["payment", "urgent"],
  },
  {
    id: "T-1003",
    title: "Feature request: Dark mode",
    description:
      "It would be great to have a dark mode option for the dashboard to reduce eye strain when working late.",
    status: "pending",
    priority: "medium",
    category: "feature",
    createdAt: "2025-05-18T11:45:00",
    updatedAt: "2025-05-19T16:20:00",
    user: {
      name: "Casey Kim",
      email: "casey@example.com",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=casey",
    },
    assignedTo: {
      name: "Robin Smith",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=robin",
    },
    comments: [
      {
        id: "c4",
        text: "Thanks for your suggestion! We've added this to our feature backlog.",
        createdAt: "2025-05-19T09:30:00",
        user: {
          name: "Robin Smith",
          isAdmin: true,
          avatar: "https://api.dicebear.com/7.x/personas/svg?seed=robin",
        },
      },
    ],
    tags: ["feature", "enhancement", "ui"],
  },
  {
    id: "T-1004",
    title: "Dashboard data not loading",
    description:
      "My analytics dashboard is showing a loading spinner but never displays the data.",
    status: "resolved",
    priority: "medium",
    category: "dashboard",
    createdAt: "2025-05-17T10:15:00",
    updatedAt: "2025-05-18T14:30:00",
    user: {
      name: "Reese Johnson",
      email: "reese@example.com",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=reese",
    },
    assignedTo: {
      name: "Morgan Freeman",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=morgan",
    },
    comments: [
      {
        id: "c5",
        text: "Is this happening on all browsers or just one specific browser?",
        createdAt: "2025-05-17T13:20:00",
        user: {
          name: "Morgan Freeman",
          isAdmin: true,
          avatar: "https://api.dicebear.com/7.x/personas/svg?seed=morgan",
        },
      },
      {
        id: "c6",
        text: "It's happening on Chrome and Firefox, haven't tried others.",
        createdAt: "2025-05-17T14:05:00",
        user: {
          name: "Reese Johnson",
          isAdmin: false,
          avatar: "https://api.dicebear.com/7.x/personas/svg?seed=reese",
        },
      },
      {
        id: "c7",
        text: "Issue resolved. There was a connection problem with our analytics provider that has now been fixed.",
        createdAt: "2025-05-18T14:30:00",
        user: {
          name: "Morgan Freeman",
          isAdmin: true,
          avatar: "https://api.dicebear.com/7.x/personas/svg?seed=morgan",
        },
      },
    ],
    tags: ["analytics", "bug", "fixed"],
  },
  {
    id: "T-1005",
    title: "Account deletion request",
    description:
      "I would like to delete my account and all associated data in accordance with privacy regulations.",
    status: "closed",
    priority: "low",
    category: "account",
    createdAt: "2025-05-16T09:40:00",
    updatedAt: "2025-05-17T11:25:00",
    user: {
      name: "Taylor Rodriguez",
      email: "taylor@example.com",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=taylor_r",
    },
    assignedTo: {
      name: "Jamie Davis",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=jamie",
    },
    comments: [
      {
        id: "c8",
        text: "We've processed your account deletion request. All your data has been removed from our systems.",
        createdAt: "2025-05-17T11:25:00",
        user: {
          name: "Jamie Davis",
          isAdmin: true,
          avatar: "https://api.dicebear.com/7.x/personas/svg?seed=jamie",
        },
      },
    ],
    tags: ["account", "privacy", "deletion"],
  },
];

// Mock data for ticket metrics
const ticketMetrics = {
  open: 12,
  inProgress: 8,
  pending: 5,
  resolved: 24,
  closed: 18,
  totalTickets: 67,
  avgResponseTime: "1h 23m",
  avgResolutionTime: "8h 15m",
  satisfactionRate: 94,
};

// Function to format date in relative time
function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString();
}

// Main component
export default function ServiceManagementPage() {
  const [tickets, setTickets] = useState<typeof MOCK_TICKETS>(MOCK_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<
    (typeof MOCK_TICKETS)[0] | null
  >(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);

  // Filter tickets based on status and search query
  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Add new ticket handler
  const handleAddTicket = (newTicket: any) => {
    const ticketWithId = {
      ...newTicket,
      id: `T-${1000 + tickets.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "open",
      comments: [],
      assignedTo: null,
    };
    setTickets([ticketWithId, ...tickets]);
  };

  // Update ticket handler
  const handleUpdateTicket = (updatedTicket: any) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === updatedTicket.id
          ? { ...updatedTicket, updatedAt: new Date().toISOString() }
          : ticket
      )
    );
    setSelectedTicket(updatedTicket);
  };

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background gradient effect */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[150px] animate-pulse-slower" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-medium" />
        <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main content container */}
      <div className="container max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Support Ticketing
            </h1>
            <p className="text-white/60 mt-2">
              Submit and track support requests
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
              onClick={() => setShowAdminPanel(!showAdminPanel)}
            >
              {showAdminPanel ? "User View" : "Admin Panel"}
            </Button>
            <NewTicketDialog onAddTicket={handleAddTicket} />
          </div>
        </motion.div>

        {showAdminPanel ? (
          <AdminTicketPanel
            tickets={tickets}
            updateTicket={handleUpdateTicket}
            metrics={ticketMetrics}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ticket List */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
                <CardHeader className="border-b border-white/5 flex flex-row justify-between items-center pb-4">
                  <div>
                    <CardTitle>My Tickets</CardTitle>
                    <CardDescription className="text-white/60">
                      Submit and track your support requests
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      className="max-w-[180px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
                      placeholder="Search tickets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs defaultValue="all" className="w-full">
                    <div className="border-b border-white/5">
                      <div className="flex items-center px-6 py-2 overflow-x-auto scrollbar-thin">
                        <TabsList className="bg-transparent">
                          <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                            onClick={() => setFilterStatus("all")}
                          >
                            All
                          </TabsTrigger>
                          <TabsTrigger
                            value="open"
                            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                            onClick={() => setFilterStatus("open")}
                          >
                            Open
                          </TabsTrigger>
                          <TabsTrigger
                            value="in-progress"
                            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                            onClick={() => setFilterStatus("in-progress")}
                          >
                            In Progress
                          </TabsTrigger>
                          <TabsTrigger
                            value="pending"
                            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                            onClick={() => setFilterStatus("pending")}
                          >
                            Pending
                          </TabsTrigger>
                          <TabsTrigger
                            value="resolved"
                            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                            onClick={() => setFilterStatus("resolved")}
                          >
                            Resolved
                          </TabsTrigger>
                          <TabsTrigger
                            value="closed"
                            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                            onClick={() => setFilterStatus("closed")}
                          >
                            Closed
                          </TabsTrigger>
                        </TabsList>
                      </div>
                    </div>

                    <TabsContent value="all" className="m-0">
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.05,
                            },
                          },
                        }}
                        className="divide-y divide-white/5"
                      >
                        {filteredTickets.length > 0 ? (
                          filteredTickets.map((ticket) => (
                            <motion.div
                              key={ticket.id}
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 },
                              }}
                              className={cn(
                                "p-4 sm:p-6 hover:bg-white/[0.02] transition-colors cursor-pointer",
                                selectedTicket?.id === ticket.id &&
                                  "bg-white/[0.03]"
                              )}
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                  <Avatar className="h-10 w-10 border border-white/10">
                                    <AvatarImage
                                      src={ticket.user.avatar}
                                      alt={ticket.user.name}
                                    />
                                    <AvatarFallback className="bg-purple-900/50 text-white">
                                      {ticket.user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="outline"
                                        className="text-xs py-0 px-1 border-white/10 bg-white/5"
                                      >
                                        {ticket.id}
                                      </Badge>
                                      <Badge
                                        className={cn(
                                          "text-xs",
                                          ticket.priority === "high"
                                            ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                                            : ticket.priority === "medium"
                                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                            : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                        )}
                                      >
                                        {ticket.priority}
                                      </Badge>
                                    </div>
                                    <h4 className="font-medium text-white mt-1">
                                      {ticket.title}
                                    </h4>
                                    <div className="flex items-center gap-1 mt-1 text-white/60 text-xs">
                                      <Clock className="h-3 w-3" />
                                      <span>
                                        Updated{" "}
                                        {formatRelativeTime(ticket.updatedAt)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Badge
                                  className={cn(
                                    "text-xs",
                                    ticket.status === "open"
                                      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                      : ticket.status === "in-progress"
                                      ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                      : ticket.status === "pending"
                                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                      : ticket.status === "resolved"
                                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                      : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                                  )}
                                >
                                  {ticket.status.replace("-", " ")}
                                </Badge>
                              </div>
                              <div className="pl-14 mt-1 flex flex-wrap gap-1">
                                {ticket.tags.map((tag, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="bg-white/5 text-white/80 border-white/10 text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="pl-14 mt-2 text-white/60 text-sm line-clamp-2">
                                {ticket.description}
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="py-10 text-center text-white/60">
                            <p>No tickets match your filters</p>
                          </div>
                        )}
                      </motion.div>
                    </TabsContent>

                    {/* Other tabs content will be the same */}
                    <TabsContent value="open" className="m-0">
                      {/* Same structure as "all" tab but with filtered content */}
                    </TabsContent>
                    <TabsContent value="in-progress" className="m-0">
                      {/* Same structure as "all" tab but with filtered content */}
                    </TabsContent>
                    <TabsContent value="pending" className="m-0">
                      {/* Same structure as "all" tab but with filtered content */}
                    </TabsContent>
                    <TabsContent value="resolved" className="m-0">
                      {/* Same structure as "all" tab but with filtered content */}
                    </TabsContent>
                    <TabsContent value="closed" className="m-0">
                      {/* Same structure as "all" tab but with filtered content */}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ticket Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {selectedTicket ? (
                <TicketDetails
                  ticket={selectedTicket}
                  onUpdateTicket={handleUpdateTicket}
                />
              ) : (
                <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 h-[400px] flex items-center justify-center">
                  <CardContent>
                    <div className="text-center text-white/60">
                      <Ticket className="h-10 w-10 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Select a ticket to view details</p>
                      <p className="mt-2 text-sm">
                        Or create a new ticket to get support
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Ticket Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-2 gap-4 mt-4"
              >
                <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-sm">Avg. Response</p>
                        <p className="text-xl font-semibold text-white">
                          1h 23m
                        </p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-sm">Satisfaction</p>
                        <p className="text-xl font-semibold text-white">94%</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <TicketStats className="mt-4" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
