"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Users,
  Building2,
  Star,
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
  UserCheck,
  PieChart,
  ArrowUpRight,
  DollarSign,
  MapPin,
  GraduationCap,
  Award,
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
import JobPostingDetails from "./components/JobPostingDetails";
import AdminPlacementPanel from "./components/AdminPlacementPanel";
import PlacementStats from "./components/PlacementStats";
import StudentRecommendations from "./components/StudentRecommendations";
import { NewPlacementDialog } from "./components/NewPlacementDialog";

// Mock data for job postings and placements
const MOCK_JOB_POSTINGS = [
  {
    id: "JP-2001",
    title: "Senior Blockchain Developer",
    company: {
      name: "DeFi Labs",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=DL",
      industry: "Blockchain",
    },
    description:
      "We're looking for a senior blockchain developer to join our team and work on cutting-edge DeFi protocols.",
    shortDescription: "Senior role focusing on DeFi protocol development",
    location: "San Francisco, CA",
    remoteOption: "HYBRID",
    employmentType: "FULL_TIME",
    experienceLevel: "SENIOR",
    salaryMin: 120000,
    salaryMax: 180000,
    status: "PUBLISHED",
    postedDate: "2025-05-20T08:00:00",
    deadlineDate: "2025-06-20T23:59:59",
    benefits: "Health insurance, 401k, Stock options, Remote work",
    applicants: 12,
    recommendedStudents: [
      {
        id: "S-001",
        name: "Alice Chen",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=alice",
        skills: ["Solidity", "React", "Node.js", "Web3"],
        matchScore: 95,
        experience: "2 years",
        currentStatus: "Available",
        lastProject: "DeFi Trading Platform",
        gpa: 3.8,
      },
      {
        id: "S-002",
        name: "Bob Kumar",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=bob",
        skills: ["Rust", "Solana", "TypeScript", "GraphQL"],
        matchScore: 88,
        experience: "1.5 years",
        currentStatus: "Available",
        lastProject: "NFT Marketplace",
        gpa: 3.9,
      },
    ],
    tags: ["blockchain", "defi", "senior", "remote"],
    priority: "high",
  },
  {
    id: "JP-2002",
    title: "Frontend Developer - Web3",
    company: {
      name: "Crypto Innovations",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=CI",
      industry: "Cryptocurrency",
    },
    description:
      "Join our team to build the next generation of Web3 user interfaces and experiences.",
    shortDescription: "Frontend development for Web3 applications",
    location: "Remote",
    remoteOption: "REMOTE",
    employmentType: "FULL_TIME",
    experienceLevel: "MID_LEVEL",
    salaryMin: 80000,
    salaryMax: 120000,
    status: "PUBLISHED",
    postedDate: "2025-05-18T10:30:00",
    deadlineDate: "2025-06-15T23:59:59",
    benefits: "Health insurance, Flexible PTO, Learning budget",
    applicants: 8,
    recommendedStudents: [
      {
        id: "S-003",
        name: "Carol Rodriguez",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=carol",
        skills: ["React", "Web3.js", "Ethers.js", "CSS"],
        matchScore: 92,
        experience: "1 year",
        currentStatus: "Available",
        lastProject: "Web3 Portfolio Tracker",
        gpa: 3.7,
      },
    ],
    tags: ["frontend", "web3", "react", "remote"],
    priority: "medium",
  },
  {
    id: "JP-2003",
    title: "Smart Contract Auditor",
    company: {
      name: "Security First",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=SF",
      industry: "Cybersecurity",
    },
    description:
      "Looking for a detail-oriented smart contract auditor to review and secure blockchain applications.",
    shortDescription: "Security auditing for smart contracts",
    location: "New York, NY",
    remoteOption: "HYBRID",
    employmentType: "CONTRACT",
    experienceLevel: "SENIOR",
    salaryMin: 100000,
    salaryMax: 150000,
    status: "PUBLISHED",
    postedDate: "2025-05-15T14:00:00",
    deadlineDate: "2025-06-01T23:59:59",
    benefits: "Competitive rates, Flexible schedule, Professional development",
    applicants: 5,
    recommendedStudents: [
      {
        id: "S-004",
        name: "David Park",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=david",
        skills: ["Solidity", "Security", "Audit Tools", "Testing"],
        matchScore: 90,
        experience: "3 years",
        currentStatus: "Available",
        lastProject: "Security Audit Framework",
        gpa: 3.9,
      },
    ],
    tags: ["security", "audit", "smart-contracts", "senior"],
    priority: "high",
  },
];

// Mock placement data
const MOCK_PLACEMENTS = [
  {
    id: "P-1001",
    student: {
      name: "Emily Zhang",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=emily",
      email: "emily@turbin3.com",
    },
    jobPosting: {
      id: "JP-1999",
      title: "Junior Blockchain Developer",
      company: "Blockchain Startups Inc",
    },
    status: "ACTIVE",
    startDate: "2025-05-01",
    salary: 95000,
    matchQuality: "EXCELLENT",
    facilitator: "Jeff Admin",
    createdAt: "2025-04-15T09:00:00",
  },
  {
    id: "P-1002",
    student: {
      name: "Marcus Johnson",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=marcus",
      email: "marcus@turbin3.com",
    },
    jobPosting: {
      id: "JP-1998",
      title: "Full Stack Developer",
      company: "Tech Solutions Ltd",
    },
    status: "PENDING",
    startDate: "2025-06-01",
    salary: 85000,
    matchQuality: "GOOD",
    facilitator: "Jeff Admin",
    createdAt: "2025-05-10T11:30:00",
  },
];

// Priority color mapping
const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

// Status color mapping
const statusColors: Record<string, string> = {
  PUBLISHED: "bg-green-100 text-green-800 border-green-200",
  DRAFT: "bg-gray-100 text-gray-800 border-gray-200",
  CLOSED: "bg-red-100 text-red-800 border-red-200",
  PAUSED: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const placementStatusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800 border-green-200",
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  COMPLETED: "bg-blue-100 text-blue-800 border-blue-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

export default function PlacementManagementPage() {
  const [selectedJobPosting, setSelectedJobPosting] = useState<any>(null);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentView, setCurrentView] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Filter job postings based on search and filters
  const filteredJobPostings = MOCK_JOB_POSTINGS.filter((posting) => {
    const matchesSearch =
      posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      posting.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      posting.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || posting.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || posting.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };
  return (
    <TooltipProvider>
      <div className="min-h-screen relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Header */}
        <div className="sticky top-0 z-40 backdrop-blur-md bg-white/[0.01] border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>{" "}
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                      Placement Management
                    </h1>
                    <p className="text-sm text-white/60">
                      Manage Turbin3 student placements and job opportunities
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  <RefreshCw
                    className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")}
                  />
                  Refresh
                </Button>
                <NewPlacementDialog
                  open={false}
                  onOpenChange={function (open: boolean): void {
                    throw new Error("Function not implemented.");
                  }}
                  onSubmit={function (placement: any): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-6 py-6">
          <PlacementStats />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Job Postings List */}
            <div className="lg:col-span-5 space-y-4">
              {" "}
              {/* Search and Filters */}
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                {" "}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-white">
                      Job Postings
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {filteredJobPostings.length} total
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {" "}
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                    <Input
                      placeholder="Search job postings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {/* Filters */}
                  <div className="flex space-x-2">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                        <SelectItem value="PAUSED">Paused</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={priorityFilter}
                      onValueChange={setPriorityFilter}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              {/* Job Postings List */}
              <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                <AnimatePresence>
                  {filteredJobPostings.map((posting) => (
                    <motion.div
                      key={posting.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {" "}
                      <Card
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:shadow-lg backdrop-blur-md bg-white/[0.01] border-white/10",
                          selectedJobPosting?.id === posting.id
                            ? "ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20"
                            : ""
                        )}
                        onClick={() => setSelectedJobPosting(posting)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={posting.company.logo} />
                                  <AvatarFallback>
                                    {posting.company.name.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>{" "}
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-sm text-white truncate">
                                    {posting.title}
                                  </h3>
                                  <p className="text-xs text-white/60 truncate">
                                    {posting.company.name}
                                  </p>
                                </div>
                              </div>{" "}
                              <p className="text-xs text-white/60 mb-3 line-clamp-2">
                                {posting.shortDescription}
                              </p>
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-1 text-white/50">
                                    <MapPin className="w-3 h-3" />
                                    <span>{posting.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-white/50">
                                    <DollarSign className="w-3 h-3" />
                                    <span>
                                      ${posting.salaryMin?.toLocaleString()}-$
                                      {posting.salaryMax?.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    className={cn(
                                      "text-xs",
                                      statusColors[posting.status]
                                    )}
                                  >
                                    {posting.status}
                                  </Badge>
                                  <Badge
                                    className={cn(
                                      "text-xs",
                                      priorityColors[posting.priority]
                                    )}
                                  >
                                    {posting.priority}
                                  </Badge>
                                </div>

                                <div className="flex items-center space-x-2 text-xs text-white/50">
                                  <div className="flex items-center space-x-1">
                                    <Users className="w-3 h-3" />
                                    <span>{posting.applicants}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3" />
                                    <span>
                                      {posting.recommendedStudents.length}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredJobPostings.length === 0 && (
                  <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                    <CardContent className="p-8 text-center">
                      <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No job postings found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Try adjusting your search terms or filters
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Right Panel - Details and Actions */}
            <div className="lg:col-span-7">
              {selectedJobPosting ? (
                <Tabs
                  value={currentView}
                  onValueChange={setCurrentView}
                  className="space-y-4"
                >
                  <TabsList className="grid w-full grid-cols-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                    <TabsTrigger value="overview">Job Details</TabsTrigger>
                    <TabsTrigger value="recommendations">
                      Recommendations
                    </TabsTrigger>
                    <TabsTrigger value="placements">Placements</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <JobPostingDetails jobPosting={selectedJobPosting} />
                  </TabsContent>

                  <TabsContent value="recommendations">
                    <StudentRecommendations
                      jobPosting={selectedJobPosting}
                      students={selectedJobPosting.recommendedStudents}
                    />
                  </TabsContent>

                  <TabsContent value="placements">
                    <AdminPlacementPanel
                      jobPosting={selectedJobPosting}
                      placements={MOCK_PLACEMENTS}
                    />
                  </TabsContent>
                </Tabs>
              ) : (
                <Card className="h-[600px] backdrop-blur-md bg-white/[0.01] border-white/10">
                  <CardContent className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Briefcase className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Select a Job Posting
                      </h3>
                      <p className="text-white/60 max-w-md">
                        Choose a job posting from the list to view details,
                        student recommendations, and manage placements.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
