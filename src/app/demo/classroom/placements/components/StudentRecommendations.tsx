"use client";

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Star,
  Award,
  GraduationCap,
  Briefcase,
  MessageSquare,
  UserPlus,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Code,
  ExternalLink,
  CheckCircle2,
  Clock,
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const getMatchScoreColor = (score: number) => {
  if (score >= 90) return "bg-green-100 text-green-800 border-green-200";
  if (score >= 75) return "bg-blue-100 text-blue-800 border-blue-200";
  if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-red-100 text-red-800 border-red-200";
};

const getMatchScoreLabel = (score: number) => {
  if (score >= 90) return "Excellent Match";
  if (score >= 75) return "Good Match";
  if (score >= 60) return "Fair Match";
  return "Poor Match";
};

interface StudentCardProps {
  student: any;
  jobPosting: any;
  onAssign: (student: any, notes: string) => void;
  onContact: (student: any) => void;
  onViewProfile: (student: any) => void;
}

const StudentCard = ({
  student,
  jobPosting,
  onAssign,
  onContact,
  onViewProfile,
}: StudentCardProps) => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [assignmentNotes, setAssignmentNotes] = useState("");

  const handleAssign = () => {
    onAssign(student, assignmentNotes);
    setIsAssignDialogOpen(false);
    setAssignmentNotes("");
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
                <AvatarImage src={student.avatar} />
                <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
              </Avatar>{" "}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-white">{student.name}</h3>
                  <Badge
                    className={cn(
                      "text-xs",
                      getMatchScoreColor(student.matchScore)
                    )}
                  >
                    {student.matchScore}% match
                  </Badge>
                </div>
                <p className="text-sm text-white/60 mb-2">
                  {getMatchScoreLabel(student.matchScore)}
                </p>
                <div className="flex items-center space-x-3 text-xs text-white/50">
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-3 h-3" />
                    <span>{student.experience} experience</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GraduationCap className="w-3 h-3" />
                    <span>GPA: {student.gpa}</span>
                  </div>
                </div>
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
                <DropdownMenuItem onClick={() => onViewProfile(student)}>
                  <Users className="w-4 h-4 mr-2" />
                  View Full Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onContact(student)}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Portfolio
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {" "}
          {/* Match Score Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Match Score</span>
              <span className="font-medium text-white">
                {student.matchScore}%
              </span>
            </div>
            <Progress value={student.matchScore} className="h-2" />
          </div>
          {/* Skills */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Key Skills</h4>
            <div className="flex flex-wrap gap-1">
              {student.skills.slice(0, 4).map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  <Code className="w-3 h-3 mr-1" />
                  {skill}
                </Badge>
              ))}
              {student.skills.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{student.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>
          {/* Current Status & Last Project */}
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>Status</span>
              </div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                {student.currentStatus}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Award className="w-3 h-3" />
                <span>Latest Project</span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {student.lastProject}
              </p>
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
                    onClick={() => onContact(student)}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message to student</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProfile(student)}
                  >
                    <Users className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View full profile</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <Dialog
              open={isAssignDialogOpen}
              onOpenChange={setIsAssignDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Assign to Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Assign Student to Job</DialogTitle>
                  <DialogDescription>
                    Assign {student.name} to &quot;{jobPosting.title}&quot; at{" "}
                    {jobPosting.company.name}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900 dark:text-blue-100">
                        Match Score: {student.matchScore}%
                      </span>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {getMatchScoreLabel(student.matchScore)} - This student
                      meets the job requirements well.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignment-notes">
                      Assignment Notes (Optional)
                    </Label>
                    <Textarea
                      id="assignment-notes"
                      placeholder="Add any notes about this assignment..."
                      value={assignmentNotes}
                      onChange={(e) => setAssignmentNotes(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAssignDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAssign}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Assign Student
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

interface StudentRecommendationsProps {
  jobPosting: any;
  students: any[];
  onAssign?: (student: any, notes: string) => void;
  onContact?: (student: any) => void;
  onViewProfile?: (student: any) => void;
}

export default function StudentRecommendations({
  jobPosting,
  students,
  onAssign,
  onContact,
  onViewProfile,
}: StudentRecommendationsProps) {
  const [sortBy, setSortBy] = useState("matchScore");
  const [filterStatus, setFilterStatus] = useState("all");
  const sortedAndFilteredStudents = students
    .filter(
      (student: any) =>
        filterStatus === "all" || student.currentStatus === filterStatus
    )
    .sort((a: any, b: any) => {
      if (sortBy === "matchScore") return b.matchScore - a.matchScore;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "gpa") return b.gpa - a.gpa;
      return 0;
    });

  const handleAssign = (student: any, notes: string) => {
    // Here you would make an API call to assign the student
    console.log(`Assigning ${student.name} to ${jobPosting.title}`, { notes });
    if (onAssign) onAssign(student, notes);
  };

  const handleContact = (student: any) => {
    // Here you would open a messaging interface
    console.log(`Contacting ${student.name}`);
    if (onContact) onContact(student);
  };

  const handleViewProfile = (student: any) => {
    // Here you would navigate to the student's full profile
    console.log(`Viewing profile for ${student.name}`);
    if (onViewProfile) onViewProfile(student);
  };
  if (!students || students.length === 0) {
    return (
      <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
        <CardContent className="p-8 text-center">
          <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No Student Recommendations
          </h3>
          <p className="text-white/60">
            No students match the requirements for this position yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Users className="w-5 h-5 text-blue-400" />
                <span>Recommended Students</span>
                <Badge variant="secondary">{students.length} total</Badge>
              </CardTitle>{" "}
              <CardDescription className="text-white/60">
                AI-matched students for &quot;{jobPosting.title}&quot; at{" "}
                {jobPosting.company.name}
              </CardDescription>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800"
              >
                <option value="matchScore">Sort by Match Score</option>
                <option value="name">Sort by Name</option>
                <option value="gpa">Sort by GPA</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Placed">Placed</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {students.filter((s) => s.matchScore >= 90).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Excellent Matches
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {
                  students.filter(
                    (s) => s.matchScore >= 75 && s.matchScore < 90
                  ).length
                }
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Good Matches
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {students.filter((s) => s.currentStatus === "Available").length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Available Now
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {(
                  students.reduce((sum, s) => sum + s.gpa, 0) / students.length
                ).toFixed(1)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Avg. GPA
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Student Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence>
          {sortedAndFilteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              jobPosting={jobPosting}
              onAssign={handleAssign}
              onContact={handleContact}
              onViewProfile={handleViewProfile}
            />
          ))}
        </AnimatePresence>
      </div>{" "}
      {sortedAndFilteredStudents.length === 0 && (
        <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No students match your filters
            </h3>
            <p className="text-white/60">
              Try adjusting your filter criteria to see more students.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
