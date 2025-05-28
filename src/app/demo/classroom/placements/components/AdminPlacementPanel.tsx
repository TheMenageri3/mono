"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Briefcase,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Calendar,
  DollarSign,
  Edit,
  MoreHorizontal,
  UserCheck,
  Star,
  Award,
  TrendingUp,
  Building2,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const placementStatusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800 border-green-200",
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  COMPLETED: "bg-blue-100 text-blue-800 border-blue-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

const matchQualityColors: Record<string, string> = {
  EXCELLENT: "bg-green-100 text-green-800 border-green-200",
  GOOD: "bg-blue-100 text-blue-800 border-blue-200",
  FAIR: "bg-yellow-100 text-yellow-800 border-yellow-200",
  POOR: "bg-red-100 text-red-800 border-red-200",
};

interface PlacementCardProps {
  placement: any;
  onUpdateStatus: (placementId: string, status: string, notes: string) => void;
  onContact: (student: any) => void;
  onViewDetails: (placement: any) => void;
}

const PlacementCard = ({
  placement,
  onUpdateStatus,
  onContact,
  onViewDetails,
}: PlacementCardProps) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(placement.status);
  const [updateNotes, setUpdateNotes] = useState("");

  const handleUpdateStatus = () => {
    onUpdateStatus(placement.id, newStatus, updateNotes);
    setIsUpdateDialogOpen(false);
    setUpdateNotes("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle2 className="w-4 h-4" />;
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "COMPLETED":
        return <Award className="w-4 h-4" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={placement.student.avatar} />
                <AvatarFallback>
                  {placement.student.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                {" "}
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-white">
                    {placement.student.name}
                  </h3>
                  <Badge
                    className={cn(
                      "text-xs",
                      placementStatusColors[placement.status]
                    )}
                  >
                    {getStatusIcon(placement.status)}
                    <span className="ml-1">{placement.status}</span>
                  </Badge>
                </div>
                <p className="text-sm text-white/60 mb-1">
                  {placement.jobPosting.title}
                </p>
                <p className="text-xs text-white/50">
                  at {placement.jobPosting.company}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onViewDetails(placement)}>
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onContact(placement.student)}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Student
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Employer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Placement
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>Start Date</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(placement.startDate)}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                <DollarSign className="w-3 h-3" />
                <span>Salary</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                ${placement.salary?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Match Quality
              </span>
              <Badge
                className={cn(
                  "text-xs",
                  matchQualityColors[placement.matchQuality]
                )}
              >
                {placement.matchQuality}
              </Badge>
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <UserCheck className="w-3 h-3" />
              <span>Facilitated by {placement.facilitator}</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <Clock className="w-3 h-3" />
              <span>Created {formatDate(placement.createdAt)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50/50 dark:bg-gray-700/20 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onContact(placement.student)}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Message student</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(placement)}
                  >
                    <FileText className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View placement details</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <Dialog
              open={isUpdateDialogOpen}
              onOpenChange={setIsUpdateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Update Status
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Update Placement Status</DialogTitle>
                  <DialogDescription>
                    Update the status for {placement.student.name}&apos;s
                    placement
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status-select">New Status</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="update-notes">Update Notes</Label>
                    <Textarea
                      id="update-notes"
                      placeholder="Add notes about this status change..."
                      value={updateNotes}
                      onChange={(e) => setUpdateNotes(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsUpdateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateStatus}>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Status
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

interface AdminPlacementPanelProps {
  jobPosting: any;
  placements: any[];
  onUpdateStatus?: (placementId: string, status: string, notes: string) => void;
  onContact?: (student: any) => void;
  onViewDetails?: (placement: any) => void;
}

export default function AdminPlacementPanel({
  jobPosting,
  placements,
  onUpdateStatus,
  onContact,
  onViewDetails,
}: AdminPlacementPanelProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  // Filter placements related to this job posting and apply filters
  const relatedPlacements = placements.filter(
    (placement: any) =>
      placement.jobPosting.id === jobPosting.id ||
      placement.jobPosting.title === jobPosting.title
  );

  const filteredPlacements = relatedPlacements
    .filter(
      (placement: any) =>
        statusFilter === "all" || placement.status === statusFilter
    )
    .sort((a: any, b: any) => {
      if (sortBy === "createdAt")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "student")
        return a.student.name.localeCompare(b.student.name);
      if (sortBy === "salary") return (b.salary || 0) - (a.salary || 0);
      return 0;
    });

  const handleUpdateStatus = (
    placementId: string,
    newStatus: string,
    notes: string
  ) => {
    console.log(`Updating placement ${placementId} to ${newStatus}`, { notes });
    if (onUpdateStatus) onUpdateStatus(placementId, newStatus, notes);
  };

  const handleContact = (student: { name: any }) => {
    console.log(`Contacting student ${student.name}`);
    if (onContact) onContact(student);
  };

  const handleViewDetails = (placement: { id: any }) => {
    console.log(`Viewing details for placement ${placement.id}`);
    if (onViewDetails) onViewDetails(placement);
  };

  const getStatsForJob = () => {
    const total = relatedPlacements.length;
    const active = relatedPlacements.filter(
      (p) => p.status === "ACTIVE"
    ).length;
    const pending = relatedPlacements.filter(
      (p) => p.status === "PENDING"
    ).length;
    const completed = relatedPlacements.filter(
      (p) => p.status === "COMPLETED"
    ).length;
    const avgSalary =
      relatedPlacements.length > 0
        ? relatedPlacements.reduce((sum, p) => sum + (p.salary || 0), 0) /
          relatedPlacements.length
        : 0;

    return { total, active, pending, completed, avgSalary };
  };

  const stats = getStatsForJob();

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Briefcase className="w-5 h-5 text-purple-400" />
                <span>Placements for this Job</span>
                <Badge variant="secondary">{stats.total} total</Badge>
              </CardTitle>
              <CardDescription className="text-white/60">
                Manage student placements for &quot;{jobPosting.title}&quot;
              </CardDescription>
            </div>

            <div className="flex items-center space-x-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Latest First</SelectItem>
                  <SelectItem value="student">Student Name</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Total Placements
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.active}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Active
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.pending}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Pending
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.completed}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                ${Math.round(stats.avgSalary / 1000)}k
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Avg. Salary
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placements List */}
      {filteredPlacements.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredPlacements.map((placement) => (
              <PlacementCard
                key={placement.id}
                placement={placement}
                onUpdateStatus={handleUpdateStatus}
                onContact={handleContact}
                onViewDetails={handleViewDetails}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
          <CardContent className="p-8 text-center">
            <Briefcase className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              {statusFilter === "all"
                ? "No Placements Yet"
                : `No ${statusFilter.toLowerCase()} placements`}
            </h3>
            <p className="text-white/60">
              {statusFilter === "all"
                ? "No students have been placed in this position yet. Check the recommendations tab to assign students."
                : "No placements match your current filter. Try adjusting the status filter."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Communication Panel */}
      <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <span>Communication Hub</span>
          </CardTitle>
          <CardDescription className="text-white/60">
            Quick actions to communicate with students and employers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message All Students
            </Button>
            <Button variant="outline" className="justify-start">
              <Mail className="w-4 h-4 mr-2" />
              Email Employer Update
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
