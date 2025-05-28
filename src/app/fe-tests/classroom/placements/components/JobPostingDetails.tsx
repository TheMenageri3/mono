"use client";

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Users,
  Briefcase,
  Globe,
  Award,
  Tag,
  ExternalLink,
  Edit,
  MoreHorizontal,
  MessageSquare,
  FileText,
  AlertCircle,
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const remoteOptionLabels: Record<string, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ON_SITE: "On-site",
};

const employmentTypeLabels: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

const experienceLevelLabels: Record<string, string> = {
  ENTRY_LEVEL: "Entry Level",
  MID_LEVEL: "Mid Level",
  SENIOR: "Senior",
  LEAD: "Lead",
  EXECUTIVE: "Executive",
};

const statusColors: Record<string, string> = {
  PUBLISHED: "bg-green-100 text-green-800 border-green-200",
  DRAFT: "bg-gray-100 text-gray-800 border-gray-200",
  CLOSED: "bg-red-100 text-red-800 border-red-200",
  PAUSED: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

interface JobPostingDetailsProps {
  jobPosting: any;
}

export default function JobPostingDetails({
  jobPosting,
}: JobPostingDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!jobPosting) {
    return (
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No job posting selected
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Select a job posting to view details
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const daysUntilDeadline = jobPosting.deadlineDate
    ? Math.ceil(
        (new Date(jobPosting.deadlineDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {" "}
      {/* Main Job Details Card */}
      <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={jobPosting.company.logo} />
                <AvatarFallback className="text-lg">
                  {jobPosting.company.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                {" "}
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    {jobPosting.title}
                  </h1>
                  <Badge
                    className={cn("text-xs", statusColors[jobPosting.status])}
                  >
                    {jobPosting.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-white/60 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">{jobPosting.company.name}</span>
                  <span className="text-sm">
                    • {jobPosting.company.industry}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-white/50">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{jobPosting.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>{remoteOptionLabels[jobPosting.remoteOption]}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4" />
                    <span>
                      {employmentTypeLabels[jobPosting.employmentType]}
                    </span>
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
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Posting
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Employer
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View External Link
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Close Posting
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {" "}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm text-white/50">
                <DollarSign className="w-4 h-4" />
                <span>Salary Range</span>
              </div>
              <p className="font-semibold text-white">
                ${jobPosting.salaryMin?.toLocaleString()} - $
                {jobPosting.salaryMax?.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm text-white/50">
                <Award className="w-4 h-4" />
                <span>Experience</span>
              </div>
              <p className="font-semibold text-white">
                {experienceLevelLabels[jobPosting.experienceLevel]}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm text-white/50">
                <Users className="w-4 h-4" />
                <span>Applicants</span>
              </div>
              <p className="font-semibold text-white">
                {jobPosting.applicants} applied
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm text-white/50">
                <Calendar className="w-4 h-4" />
                <span>Posted</span>
              </div>
              <p className="font-semibold text-white">
                {formatDate(jobPosting.postedDate)}
              </p>
            </div>
          </div>
          <Separator /> {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Job Description
            </h3>
            <div
              className={cn(
                "text-white/70 leading-relaxed",
                !isExpanded && "line-clamp-3"
              )}
            >
              {jobPosting.description}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700 p-0 h-auto"
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
          </div>{" "}
          {/* Benefits */}
          {jobPosting.benefits && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">
                Benefits & Perks
              </h3>
              <p className="text-white/70 leading-relaxed">
                {jobPosting.benefits}
              </p>
            </div>
          )}
          {/* Tags */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Skills & Tags</h3>
            <div className="flex flex-wrap gap-2">
              {jobPosting.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>{" "}
        <CardFooter className="backdrop-blur-md bg-white/[0.01] border-t border-white/10">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4 text-sm text-white/50">
              {jobPosting.deadlineDate && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    Deadline: {formatDate(jobPosting.deadlineDate)}{" "}
                    {daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                      <span className="ml-1 text-orange-400">
                        ({daysUntilDeadline} days left)
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Employer
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send a message to the hiring manager</p>
                </TooltipContent>
              </Tooltip>

              {jobPosting.externalPostingUrl && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      External Link
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View on company website</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>{" "}
      {/* Quick Actions */}
      <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common actions for this job posting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start">
              <Users className="w-4 h-4 mr-2" />
              View All Applicants
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Download Applications
            </Button>
            <Button variant="outline" className="justify-start">
              <Edit className="w-4 h-4 mr-2" />
              Edit Job Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
