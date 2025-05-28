"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  MoreHorizontal,
  Search,
  Send,
  User,
  Users,
  XCircle,
  MessageSquare,
  PieChart,
  ArrowUpRight,
  Tag,
} from "lucide-react";

// Admin Team Members (mock data)
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Taylor Swift",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=taylor",
  },
  {
    id: 2,
    name: "Robin Smith",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=robin",
  },
  {
    id: 3,
    name: "Morgan Freeman",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=morgan",
  },
  {
    id: 4,
    name: "Jamie Davis",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=jamie",
  },
  { id: 5, name: "Current User", avatar: "https://github.com/shadcn.png" },
];

interface AdminTicketPanelProps {
  tickets: any[];
  updateTicket: (updatedTicket: any) => void;
  metrics: any;
}

// Function to format date in readable format
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminTicketPanel({
  tickets,
  updateTicket,
  metrics,
}: AdminTicketPanelProps) {
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newInternalNote, setNewInternalNote] = useState<string>("");
  const [isSubmittingNote, setIsSubmittingNote] = useState<boolean>(false);

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

  const handleStatusChange = (ticket: any, newStatus: string) => {
    const updatedTicket = {
      ...ticket,
      status: newStatus,
    };
    updateTicket(updatedTicket);

    if (selectedTicket?.id === ticket.id) {
      setSelectedTicket(updatedTicket);
    }
  };

  const handleAssignTicket = (ticket: any, assigneeId: number) => {
    const assignee = TEAM_MEMBERS.find((member) => member.id === assigneeId);
    if (!assignee) return;

    const updatedTicket = {
      ...ticket,
      assignedTo: {
        name: assignee.name,
        avatar: assignee.avatar,
      },
    };

    updateTicket(updatedTicket);

    if (selectedTicket?.id === ticket.id) {
      setSelectedTicket(updatedTicket);
    }
  };

  const handleAddInternalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInternalNote.trim() || !selectedTicket) return;

    setIsSubmittingNote(true);

    // Create new internal note
    const internalNote = {
      id: `c${selectedTicket.comments.length + 1}`,
      text: newInternalNote,
      createdAt: new Date().toISOString(),
      user: {
        name: "Current User",
        isAdmin: true,
        avatar: "https://github.com/shadcn.png",
      },
      isInternal: true,
    };

    // Add note to ticket
    const updatedTicket = {
      ...selectedTicket,
      comments: [...selectedTicket.comments, internalNote],
    };

    // Simulate API call
    setTimeout(() => {
      updateTicket(updatedTicket);
      setSelectedTicket(updatedTicket);
      setNewInternalNote("");
      setIsSubmittingNote(false);
    }, 500);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "in-progress":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "pending":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "resolved":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4 text-blue-300" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-purple-300" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-300" />;
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-emerald-300" />;
      case "closed":
        return <XCircle className="h-4 w-4 text-gray-300" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Metrics Overview */}
      <motion.div
        className="lg:col-span-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-400" />
              Ticket Metrics
            </CardTitle>
            <CardDescription className="text-white/60">
              Overview of all support ticket metrics
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-lg border border-white/10 bg-white/[0.01]">
                <div className="text-3xl font-bold">{metrics.totalTickets}</div>
                <div className="text-sm text-white/60">Total Tickets</div>
              </div>

              <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/[0.01]">
                <div className="text-3xl font-bold text-blue-300">
                  {metrics.open}
                </div>
                <div className="text-sm text-blue-300/60">Open</div>
              </div>

              <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/[0.01]">
                <div className="text-3xl font-bold text-purple-300">
                  {metrics.inProgress}
                </div>
                <div className="text-sm text-purple-300/60">In Progress</div>
              </div>

              <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/[0.01]">
                <div className="text-3xl font-bold text-amber-300">
                  {metrics.pending}
                </div>
                <div className="text-sm text-amber-300/60">Pending</div>
              </div>

              <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.01]">
                <div className="text-3xl font-bold text-emerald-300">
                  {metrics.resolved}
                </div>
                <div className="text-sm text-emerald-300/60">Resolved</div>
              </div>

              <div className="p-4 rounded-lg border border-gray-500/20 bg-gray-500/[0.01]">
                <div className="text-3xl font-bold text-gray-300">
                  {metrics.closed}
                </div>
                <div className="text-sm text-gray-300/60">Closed</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg border border-white/10 bg-white/[0.01] flex justify-between items-center">
                <div>
                  <div className="text-sm text-white/60">
                    Avg. Response Time
                  </div>
                  <div className="text-xl font-bold">
                    {metrics.avgResponseTime}
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-300" />
                </div>
              </div>

              <div className="p-4 rounded-lg border border-white/10 bg-white/[0.01] flex justify-between items-center">
                <div>
                  <div className="text-sm text-white/60">
                    Avg. Resolution Time
                  </div>
                  <div className="text-xl font-bold">
                    {metrics.avgResolutionTime}
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-purple-300" />
                </div>
              </div>

              <div className="p-4 rounded-lg border border-white/10 bg-white/[0.01] flex justify-between items-center">
                <div>
                  <div className="text-sm text-white/60">
                    Customer Satisfaction
                  </div>
                  <div className="text-xl font-bold">
                    {metrics.satisfactionRate}%
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-emerald-300" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ticket Management */}
      <motion.div
        className="lg:col-span-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
          <CardHeader className="border-b border-white/5 flex flex-row justify-between items-center">
            <div>
              <CardTitle>Ticket Management</CardTitle>
              <CardDescription className="text-white/60">
                Manage and respond to all support tickets
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <Input
                  className="pl-9 max-w-[180px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a1a1a] border-white/10 text-white">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="focus:bg-white/10"
                    onClick={() => setFilterStatus("all")}
                  >
                    All Tickets
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-white/10"
                    onClick={() => setFilterStatus("open")}
                  >
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-white/10"
                    onClick={() => setFilterStatus("in-progress")}
                  >
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-white/10"
                    onClick={() => setFilterStatus("pending")}
                  >
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-white/10"
                    onClick={() => setFilterStatus("resolved")}
                  >
                    Resolved
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-white/10"
                    onClick={() => setFilterStatus("closed")}
                  >
                    Closed
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuLabel>Filter By Priority</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="focus:bg-white/10">
                    High
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-white/10">
                    Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-white/10">
                    Low
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filteredTickets.length > 0 ? (
              <div className="divide-y divide-white/5">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={cn(
                      "p-4 sm:p-6 hover:bg-white/[0.02] transition-colors cursor-pointer",
                      selectedTicket?.id === ticket.id && "bg-white/[0.03]"
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
                              .map((n: string) => n[0])
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
                                getPriorityColor(ticket.priority)
                              )}
                            >
                              {ticket.priority}
                            </Badge>
                            <span className="text-sm font-medium">
                              {ticket.user.name}
                            </span>
                          </div>
                          <h4 className="font-medium text-white mt-1">
                            {ticket.title}
                          </h4>
                          <div className="flex items-center gap-1 mt-1 text-white/60 text-xs">
                            <Clock className="h-3 w-3" />
                            <span>Created {formatDate(ticket.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          className={cn(
                            "text-xs",
                            getStatusColor(ticket.status)
                          )}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(ticket.status)}{" "}
                            {ticket.status.replace("-", " ")}
                          </span>
                        </Badge>

                        {ticket.assignedTo ? (
                          <div className="flex items-center gap-1 text-xs text-white/60">
                            <User className="h-3 w-3" />
                            <span>Assigned to {ticket.assignedTo.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-white/60">
                            <User className="h-3 w-3" />
                            <span>Unassigned</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedTicket?.id !== ticket.id && (
                      <div className="pl-14 mt-2 text-white/60 text-sm line-clamp-2">
                        {ticket.description}
                      </div>
                    )}

                    {selectedTicket?.id === ticket.id && (
                      <div className="mt-4 pl-14 flex flex-wrap gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/10 bg-white/5 hover:bg-white/10"
                            >
                              <User className="h-3 w-3 mr-1" />
                              {ticket.assignedTo ? "Reassign" : "Assign"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-[#1a1a1a] border-white/10 text-white">
                            <DropdownMenuLabel>Assign to</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            {TEAM_MEMBERS.map((member) => (
                              <DropdownMenuItem
                                key={member.id}
                                className="focus:bg-white/10"
                                onClick={() =>
                                  handleAssignTicket(ticket, member.id)
                                }
                              >
                                <div className="flex items-center">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>
                                      {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  {member.name}
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/10 bg-white/5 hover:bg-white/10"
                            >
                              {getStatusIcon(ticket.status)}
                              <span className="ml-1">
                                {ticket.status.replace("-", " ")}
                              </span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-[#1a1a1a] border-white/10 text-white">
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem
                              className="focus:bg-white/10"
                              onClick={() => handleStatusChange(ticket, "open")}
                            >
                              <AlertTriangle className="h-4 w-4 mr-2 text-blue-300" />
                              Open
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="focus:bg-white/10"
                              onClick={() =>
                                handleStatusChange(ticket, "in-progress")
                              }
                            >
                              <Clock className="h-4 w-4 mr-2 text-purple-300" />
                              In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="focus:bg-white/10"
                              onClick={() =>
                                handleStatusChange(ticket, "pending")
                              }
                            >
                              <Clock className="h-4 w-4 mr-2 text-amber-300" />
                              Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="focus:bg-white/10"
                              onClick={() =>
                                handleStatusChange(ticket, "resolved")
                              }
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-300" />
                              Resolved
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="focus:bg-white/10"
                              onClick={() =>
                                handleStatusChange(ticket, "closed")
                              }
                            >
                              <XCircle className="h-4 w-4 mr-2 text-gray-300" />
                              Closed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-white/60">
                <p>No tickets match your filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Selected Ticket Details */}
      <motion.div
        className="lg:col-span-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {selectedTicket ? (
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <CardHeader className="border-b border-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs py-0 px-1 border-white/10 bg-white/5"
                    >
                      {selectedTicket.id}
                    </Badge>
                    <Badge
                      className={cn(
                        "text-xs",
                        getStatusColor(selectedTicket.status)
                      )}
                    >
                      <span className="flex items-center gap-1">
                        {getStatusIcon(selectedTicket.status)}{" "}
                        {selectedTicket.status.replace("-", " ")}
                      </span>
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">{selectedTicket.title}</CardTitle>
                </div>
                <Badge
                  className={cn(
                    "text-xs",
                    getPriorityColor(selectedTicket.priority)
                  )}
                >
                  {selectedTicket.priority} priority
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedTicket.tags.map((tag: string, idx: number) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-white/5 text-white/80 border-white/10 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-1">
                    Customer
                  </h4>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border border-white/10">
                      <AvatarImage
                        src={selectedTicket.user.avatar}
                        alt={selectedTicket.user.name}
                      />
                      <AvatarFallback className="bg-purple-900/50 text-white text-xs">
                        {selectedTicket.user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">
                        {selectedTicket.user.name}
                      </div>
                      <div className="text-xs text-white/60">
                        {selectedTicket.user.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-1">
                    Assigned To
                  </h4>
                  {selectedTicket.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-white/10">
                        <AvatarImage
                          src={selectedTicket.assignedTo.avatar}
                          alt={selectedTicket.assignedTo.name}
                        />
                        <AvatarFallback className="bg-purple-900/50 text-white text-xs">
                          {selectedTicket.assignedTo.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {selectedTicket.assignedTo.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white/60">
                      <User className="h-4 w-4" />
                      <span>Unassigned</span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-1">
                    Description
                  </h4>
                  <p className="text-sm text-white/80">
                    {selectedTicket.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white/70">
                      Timeline
                    </h4>
                    <Badge
                      variant="outline"
                      className="text-xs py-0 px-1 border-white/10 bg-white/5"
                    >
                      {selectedTicket.comments.length} comments
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg p-3 border-white/5 border bg-white/[0.01]">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6 border border-white/10">
                          <AvatarImage
                            src={selectedTicket.user.avatar}
                            alt={selectedTicket.user.name}
                          />
                          <AvatarFallback className="bg-purple-900/50 text-white text-xs">
                            {selectedTicket.user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-medium">
                            {selectedTicket.user.name}
                          </span>
                          <span className="text-xs text-white/40">
                            {formatDate(selectedTicket.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="pl-8 text-sm text-white/80">
                        Ticket created
                      </div>
                    </div>

                    {selectedTicket.comments.map((comment: any) => (
                      <div
                        key={comment.id}
                        className={cn(
                          "rounded-lg p-3 border",
                          comment.isInternal
                            ? "border-purple-500/20 bg-purple-900/10"
                            : "border-white/5 bg-white/[0.01]"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-6 w-6 border border-white/10">
                            <AvatarImage
                              src={comment.user.avatar}
                              alt={comment.user.name}
                            />
                            <AvatarFallback className="bg-purple-900/50 text-white text-xs">
                              {comment.user.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {comment.user.name}
                              </span>
                              {comment.user.isAdmin && (
                                <Badge className="text-[10px] py-0 px-1 bg-purple-500/20 text-purple-300 border-purple-500/30">
                                  Staff
                                </Badge>
                              )}
                              {comment.isInternal && (
                                <Badge className="text-[10px] py-0 px-1 bg-purple-900/20 text-purple-300 border-purple-500/30">
                                  Internal Note
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-white/40">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="pl-8 text-sm text-white/80">
                          {comment.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <form onSubmit={handleAddInternalNote} className="mt-6">
                <h4 className="text-sm font-medium text-white/70 mb-2">
                  Add Internal Note
                </h4>
                <div className="p-1 border border-purple-500/20 bg-purple-900/10 rounded-lg">
                  <Textarea
                    placeholder="Add an internal note (not visible to customer)..."
                    value={newInternalNote}
                    onChange={(e) => setNewInternalNote(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={isSubmittingNote || !newInternalNote.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmittingNote ? "Sending..." : "Add Internal Note"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="border-t border-white/5 p-4">
              <div className="flex flex-wrap gap-2 w-full">
                {/* Reply actions */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Reply to Customer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#121212]/95 backdrop-blur-xl border-white/10 text-white max-w-md mx-4">
                    <DialogHeader>
                      <DialogTitle>
                        Reply to {selectedTicket.user.name}
                      </DialogTitle>
                      <DialogDescription className="text-white/60">
                        Your response will be sent to the customer via email
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Textarea
                        placeholder="Type your response..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[150px]"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
                      >
                        Cancel
                      </Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Send className="h-4 w-4 mr-2" />
                        Send Response
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Status actions */}
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white ml-auto"
                  onClick={() => handleStatusChange(selectedTicket, "closed")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Close Ticket
                </Button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 h-[400px] flex items-center justify-center">
            <CardContent>
              <div className="text-center text-white/60">
                <Users className="h-10 w-10 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Select a ticket to manage</p>
                <p className="mt-2 text-sm">
                  View details and respond to customer inquiries
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
          <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {TEAM_MEMBERS.map((member, index) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <Avatar className="h-8 w-8 border border-white/10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">{member.name}</div>
                        <div className="text-xs text-white/60">
                          {[8, 11, 5, 9, 7][index]} tickets handled
                        </div>
                      </div>
                      <Progress
                        value={[75, 60, 40, 55, 85][index]}
                        className="h-1.5 bg-white/10"
                        style={
                          {
                            "--progress-foreground":
                              index === 0
                                ? "linear-gradient(to right, #a855f7, #8b5cf6)"
                                : index === 1
                                ? "linear-gradient(to right, #3b82f6, #6366f1)"
                                : index === 2
                                ? "linear-gradient(to right, #10b981, #059669)"
                                : index === 3
                                ? "linear-gradient(to right, #f59e0b, #d97706)"
                                : "linear-gradient(to right, #ec4899, #d946ef)",
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Activity Logs */}
      <motion.div
        className="lg:col-span-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-white/60">
              Latest actions taken in the support system
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {[
                {
                  time: "10 minutes ago",
                  user: "Taylor Swift",
                  action: "responded to ticket",
                  ticketId: "T-1002",
                  ticketTitle: "Payment processing error",
                },
                {
                  time: "25 minutes ago",
                  user: "Robin Smith",
                  action: "assigned ticket to Morgan Freeman",
                  ticketId: "T-1004",
                  ticketTitle: "Dashboard data not loading",
                },
                {
                  time: "1 hour ago",
                  user: "Jamie Davis",
                  action: "changed status to Closed",
                  ticketId: "T-1005",
                  ticketTitle: "Account deletion request",
                },
                {
                  time: "2 hours ago",
                  user: "Morgan Freeman",
                  action: "added internal note",
                  ticketId: "T-1004",
                  ticketTitle: "Dashboard data not loading",
                },
                {
                  time: "3 hours ago",
                  user: "Current User",
                  action: "created ticket",
                  ticketId: "T-1001",
                  ticketTitle: "Login authentication failed",
                },
              ].map((activity, index) => (
                <div key={index} className="p-4 sm:px-6 hover:bg-white/[0.01]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-white/60 w-24">
                        {activity.time}
                      </div>
                      <div>
                        <span className="text-sm font-medium">
                          {activity.user}
                        </span>
                        <span className="text-sm text-white/60">
                          {" "}
                          {activity.action}{" "}
                        </span>
                        <span className="text-sm text-white/80">
                          {activity.ticketId}: {activity.ticketTitle}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/60 hover:text-white hover:bg-white/5"
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
