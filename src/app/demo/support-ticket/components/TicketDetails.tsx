"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Send,
} from "lucide-react";

interface TicketDetailsProps {
  ticket: any;
  onUpdateTicket: (updatedTicket: any) => void;
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

export default function TicketDetails({
  ticket,
  onUpdateTicket,
}: TicketDetailsProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    const updatedTicket = {
      ...ticket,
      status: newStatus,
    };
    onUpdateTicket(updatedTicket);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // Create new comment object
    const comment = {
      id: `c${ticket.comments.length + 1}`,
      text: newComment,
      createdAt: new Date().toISOString(),
      user: {
        name: "Current User",
        isAdmin: false,
        avatar: "https://github.com/shadcn.png",
      },
    };

    // Add comment to ticket
    const updatedTicket = {
      ...ticket,
      comments: [...ticket.comments, comment],
    };

    // Simulate API call
    setTimeout(() => {
      onUpdateTicket(updatedTicket);
      setNewComment("");
      setIsSubmitting(false);
    }, 500);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={cardVariants}>
      <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
        <CardHeader className="border-b border-white/5">
          <div className="flex justify-between items-start">
            <motion.div variants={itemVariants}>
              <CardTitle className="flex items-center gap-2">
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
                  <span className="flex items-center gap-1">
                    {getStatusIcon(ticket.status)}{" "}
                    {ticket.status.replace("-", " ")}
                  </span>
                </Badge>
                <span className="ml-1">#{ticket.id}</span>
              </CardTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
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
                {ticket.priority} priority
              </Badge>
            </motion.div>
          </div>
          <motion.div
            variants={itemVariants}
            className="text-xl font-semibold mt-2"
          >
            {ticket.title}
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-1 mt-2"
          >
            {ticket.tags.map((tag: string, idx: number) => (
              <Badge
                key={idx}
                variant="outline"
                className="bg-white/5 text-white/80 border-white/10 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </motion.div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-8 w-8 border border-white/10">
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
                  <div className="font-medium text-sm">{ticket.user.name}</div>
                  <div className="text-xs text-white/60">
                    Created: {formatDate(ticket.createdAt)}
                  </div>
                </div>
              </div>
              <div className="pl-10 text-white/80 text-sm">
                {ticket.description}
              </div>
            </div>

            <div className="border-t border-white/5 pt-5">
              <h4 className="font-medium mb-3 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comments ({ticket.comments.length})
              </h4>

              <div className="space-y-4">
                {ticket.comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className={cn(
                      "rounded-lg p-3 relative",
                      comment.isInternal
                        ? "bg-purple-900/10 border border-purple-500/20"
                        : "bg-white/[0.02] border border-white/5"
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

              <form onSubmit={handleSubmitComment} className="mt-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={isSubmitting || !newComment.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </CardContent>

        {ticket.status !== "closed" && (
          <CardFooter className="border-t border-white/5 p-4">
            <div className="flex flex-wrap gap-2 w-full">
              {ticket.status !== "open" && (
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
                  onClick={() => handleStatusChange("open")}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Re-open
                </Button>
              )}

              {ticket.status !== "in-progress" && (
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
                  onClick={() => handleStatusChange("in-progress")}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Mark In Progress
                </Button>
              )}

              {ticket.status !== "resolved" && (
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
                  onClick={() => handleStatusChange("resolved")}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Resolved
                </Button>
              )}

              <Button
                variant="outline"
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white ml-auto"
                onClick={() => handleStatusChange("closed")}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Close Ticket
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
