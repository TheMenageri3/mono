"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileCheck,
  Inbox,
  MessageSquare,
  MoreHorizontal,
  Save,
  Search,
  Star,
  Upload,
  UserCheck,
  Users,
  X,
  Check,
  Filter,
  FileX,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock data (would come from API/backend in a real application)
const submissionsData = [
  {
    id: "sub-1",
    studentName: "Maya Johnson",
    studentId: "student-1",
    avatar: "https://i.pravatar.cc/150?u=maya",
    submissionDate: "2025-05-18T14:28:00Z",
    status: "graded",
    grade: 92,
    feedback:
      "Excellent work on the security implementation. Your code is well-structured and documented. For future projects, consider adding more error handling.",
    answers: [
      {
        questionId: "q1",
        type: "shortAnswer",
        question:
          "Explain the difference between a program-derived address (PDA) and a normal account address in Solana.",
        answer:
          "A PDA is deterministically derived from a program ID and optional seeds, allowing a program to control the account without needing a private key. Regular accounts have private keys and are controlled by the owner of that key.",
        points: 10,
        maxPoints: 10,
        feedback: "Complete and accurate explanation!",
      },
      {
        questionId: "q2",
        type: "paragraph",
        question:
          "Describe how you would implement cross-program invocation (CPI) in your project. What are the security considerations?",
        answer:
          "To implement CPI, I would use the invoke() or invoke_signed() functions to call instructions in another program. For invoke(), I'd pass the accounts and instruction data needed by the target program. For invoke_signed(), I'd also include PDAs that my program controls.\n\nSecurity considerations include:\n1. Ensuring the target program is the expected one (verify program ID)\n2. Properly setting up account privileges (is_signer, is_writable)\n3. Handling potential reentrancy attacks\n4. Validating return data when needed\n5. Careful privilege elevation management when using invoke_signed()",
        points: 14,
        maxPoints: 15,
        feedback:
          "Very thorough response. Could have mentioned handling potential errors from the invoked program.",
      },
      // More answers would be here
    ],
    files: [
      {
        name: "program_code.zip",
        size: 156892,
        url: "#",
      },
    ],
    notes:
      "Strong submission overall. Student demonstrates good understanding of Solana concepts.",
  },
  {
    id: "sub-2",
    studentName: "Raj Patel",
    studentId: "student-2",
    avatar: "https://i.pravatar.cc/150?u=raj",
    submissionDate: "2025-05-19T09:15:00Z",
    status: "submitted",
    grade: null,
    feedback: "",
    files: [
      {
        name: "milestone2.zip",
        size: 245298,
        url: "#",
      },
    ],
    notes: "",
  },
  {
    id: "sub-3",
    studentName: "Chris Wong",
    studentId: "student-3",
    avatar: "https://i.pravatar.cc/150?u=chris",
    submissionDate: "2025-05-17T22:48:00Z",
    status: "graded",
    grade: 78,
    feedback:
      "Good attempt at implementing the required functionality. Your program meets the basic requirements, but there are security vulnerabilities that need addressing.",
    files: [
      {
        name: "solana_program.zip",
        size: 189432,
        url: "#",
      },
    ],
    notes: "Student struggled with implementing proper owner checks.",
  },
  {
    id: "sub-4",
    studentName: "Sarah Miller",
    studentId: "student-4",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    submissionDate: "2025-05-15T18:22:00Z",
    status: "late",
    grade: null,
    feedback: "",
    files: [
      {
        name: "program_milestone2.zip",
        size: 176543,
        url: "#",
      },
    ],
    notes: "",
  },
  {
    id: "sub-5",
    studentName: "Daniel Kim",
    studentId: "student-5",
    avatar: "https://i.pravatar.cc/150?u=daniel",
    submissionDate: "2025-05-10T11:30:00Z",
    status: "graded",
    grade: 85,
    feedback:
      "Good work overall. Your implementation of PDAs is correct, but there are some inefficiencies in your approach to state management.",
    files: [
      {
        name: "solana_project_m2.zip",
        size: 203421,
        url: "#",
      },
    ],
    notes:
      "Showed good understanding of core concepts but needs improvement in code optimization.",
  },
];

const assignmentData = {
  id: "assign-1",
  title: "Solana Program Development - Milestone 2",
  description:
    "In this assignment, you will demonstrate your understanding of Solana program development by implementing key functionality for your project milestone.",
  dueDate: "2025-05-20T23:59:59Z",
  totalPoints: 100,
  submissionsCount: 23,
  gradedCount: 14,
  averageGrade: 82,
  timeEstimate: "2 hours",
  questions: [
    {
      id: "q1",
      type: "shortAnswer",
      title:
        "Explain the difference between a program-derived address (PDA) and a normal account address in Solana.",
      description: "Keep your answer concise, around 2-3 sentences.",
      required: true,
      points: 10,
    },
    {
      id: "q2",
      type: "paragraph",
      title:
        "Describe how you would implement cross-program invocation (CPI) in your project. What are the security considerations?",
      description: "Include code examples if relevant.",
      required: true,
      points: 15,
    },
    {
      id: "q3",
      type: "multipleChoice",
      title:
        "Which of the following is NOT a valid account constraint in Solana programs?",
      required: true,
      points: 5,
      options: ["init", "mut", "signer", "async", "seeds"],
      correctAnswer: "async",
    },
    {
      id: "q4",
      type: "checkboxes",
      title:
        "Select all data types that are natively supported by Borsh serialization in Solana programs:",
      required: true,
      points: 10,
      options: [
        "u8, u16, u32, u64, u128",
        "i8, i16, i32, i64, i128",
        "String",
        "HashMap",
        "Vec<T>",
      ],
      correctAnswers: [
        "u8, u16, u32, u64, u128",
        "i8, i16, i32, i64, i128",
        "Vec<T>",
      ],
    },
    {
      id: "q5",
      type: "pubkey",
      title: "Enter your program's deployed public key on devnet:",
      required: true,
      points: 15,
      description:
        "This should be the program you've deployed for Milestone 2.",
    },
    {
      id: "q6",
      type: "fileUpload",
      title: "Upload your program's source code as a ZIP file:",
      description:
        "Please include a README.md file with build and test instructions.",
      required: true,
      points: 20,
    },
    {
      id: "q7",
      type: "linearScale",
      title:
        "How confident are you in your understanding of Solana program development?",
      description: "1 = Not confident, 5 = Very confident",
      required: false,
      points: 0,
    },
    {
      id: "q8",
      type: "paragraph",
      title:
        "What aspects of Solana program development would you like the instructors to cover in more depth?",
      description:
        "This feedback helps us improve the course. No points are awarded for this question.",
      required: false,
      points: 0,
    },
    {
      id: "q9",
      type: "dropdown",
      title:
        "Which Solana client library are you primarily using for your project?",
      required: true,
      points: 5,
      options: ["Web3.js", "Anchor", "Solana-py", "Solana-go", "Other"],
    },
    {
      id: "q10",
      type: "multipleChoice",
      title: "How many instructions does your program currently implement?",
      required: true,
      points: 5,
      options: ["1-2", "3-5", "6-10", "More than 10"],
    },
    {
      id: "q11",
      type: "checkboxes",
      title:
        "Which of the following security practices have you implemented in your program? (Select all that apply)",
      required: true,
      points: 15,
      options: [
        "Owner checks",
        "Signer validation",
        "Input validation",
        "Arithmetic overflow protection",
        "Re-initialization attack protection",
      ],
      correctAnswers: [
        "Owner checks",
        "Signer validation",
        "Input validation",
        "Arithmetic overflow protection",
        "Re-initialization attack protection",
      ],
    },
  ],
};

export default function AssignmentReviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const assignmentId = searchParams.get("id") || "assign-1"; // Default if no ID provided
  const submissionId = searchParams.get("submissionId");

  const [assignment, setAssignment] = useState(assignmentData);
  const [submissions, setSubmissions] = useState(submissionsData);
  const [activeSubmission, setActiveSubmission] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [gradingPoints, setGradingPoints] = useState<Record<string, number>>(
    {}
  );
  const [gradingFeedback, setGradingFeedback] = useState<
    Record<string, string>
  >({});
  const [isSaving, setIsSaving] = useState(false);
  const [isBatchGrading, setIsBatchGrading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [privateNotes, setPrivateNotes] = useState("");

  // If submissionId is provided in URL, load that submission
  useEffect(() => {
    if (submissionId) {
      const submission = submissions.find((s) => s.id === submissionId);
      if (submission) {
        setActiveSubmission(submission);
        setFeedbackText(submission.feedback || "");
        setPrivateNotes(submission.notes || "");

        // Initialize grading points and feedback if this is a graded submission
        if (submission.answers) {
          const points: Record<string, number> = {};
          const feedback: Record<string, string> = {};

          submission.answers.forEach((answer) => {
            points[answer.questionId] = answer.points || 0;
            feedback[answer.questionId] = answer.feedback || "";
          });

          setGradingPoints(points);
          setGradingFeedback(feedback);
        }
      }
    }
  }, [submissionId, submissions]);

  // Filter submissions based on search and status filter
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch = submission.studentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate total points from individual question scores
  const calculateTotalPoints = () => {
    return Object.values(gradingPoints).reduce(
      (sum, points) => sum + points,
      0
    );
  };

  // Handle selecting a submission to review
  const handleSelectSubmission = (submission: any) => {
    setActiveSubmission(submission);
    setFeedbackText(submission.feedback || "");
    setPrivateNotes(submission.notes || "");

    // Initialize grading points and feedback if this is a graded submission
    if (submission.answers) {
      const points: Record<string, number> = {};
      const feedback: Record<string, string> = {};

      submission.answers.forEach(
        (answer: {
          questionId: string | number;
          points: number;
          feedback: string;
        }) => {
          points[answer.questionId] = answer.points || 0;
          feedback[answer.questionId] = answer.feedback || "";
        }
      );

      setGradingPoints(points);
      setGradingFeedback(feedback);
    } else {
      // Initialize empty grading points based on assignment questions
      const points: Record<string, number> = {};
      const feedback: Record<string, string> = {};

      assignment.questions.forEach((question) => {
        points[question.id] = 0;
        feedback[question.id] = "";
      });

      setGradingPoints(points);
      setGradingFeedback(feedback);
    }

    // Create a new URL with the submissionId parameter
    const newUrl = `?id=${assignmentId}&submissionId=${submission.id}`;
    window.history.pushState({}, "", newUrl);
  };

  // Handle starting the grading process
  const handleStartGrading = () => {
    setIsGrading(true);
  };

  // Handle updating points for a question
  const handleUpdatePoints = (questionId: string, points: number) => {
    setGradingPoints((prev) => ({ ...prev, [questionId]: points }));
  };

  // Handle updating feedback for a question
  const handleUpdateFeedback = (questionId: string, feedback: string) => {
    setGradingFeedback((prev) => ({ ...prev, [questionId]: feedback }));
  };

  // Handle saving grades
  const handleSaveGrades = () => {
    setIsSaving(true);

    // Simulate API request
    setTimeout(() => {
      // Update the submission with grades and feedback
      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) => {
          if (submission.id === activeSubmission.id) {
            // Create answers array with grades and feedback
            const answers = assignment.questions.map((question) => {
              return {
                questionId: question.id,
                type: question.type,
                question: question.title,
                // This would come from the actual submission data in a real app
                answer:
                  activeSubmission.answers?.find(
                    (a: any) => a.questionId === question.id
                  )?.answer || "No answer provided",
                points: gradingPoints[question.id] || 0,
                maxPoints: question.points,
                feedback: gradingFeedback[question.id] || "",
              };
            });

            return {
              ...submission,
              status: "graded",
              grade: calculateTotalPoints(),
              feedback: feedbackText,
              answers,
              notes: privateNotes,
            };
          }
          return submission;
        })
      );

      // Also update active submission
      setActiveSubmission((prev: any) => ({
        ...prev,
        status: "graded",
        grade: calculateTotalPoints(),
        feedback: feedbackText,
        notes: privateNotes,
      }));

      setIsGrading(false);
      setIsSaving(false);
    }, 1000);
  };

  // Format the submission date
  const formatSubmissionDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  // Check if a submission is late
  const isLateSubmission = (submission: any) => {
    const submissionDate = new Date(submission.submissionDate);
    const dueDate = new Date(assignment.dueDate);
    return submissionDate > dueDate;
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "submitted":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "late":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-white/10 border-white/20 text-white/70";
    }
  };

  // Handle exporting grades
  const handleExportGrades = () => {
    // In a real app, this would generate a CSV file or similar
    console.log("Exporting grades...");
  };

  // Close the active submission
  const handleCloseSubmission = () => {
    setActiveSubmission(null);
    setIsGrading(false);

    // Remove the submissionId from the URL
    const newUrl = `?id=${assignmentId}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background gradient effects */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[180px] animate-pulse-slower" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-medium" />
        <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main content container */}
      <div className="container max-w-8xl mx-auto px-4 py-6">
        {/* Header with breadcrumb and actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/fe-tests/classroom">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Classroom</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {assignment.title}
              </h1>
              <p className="text-white/60 mt-1">
                Review and grade student submissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleExportGrades}
              variant="outline"
              className="relative overflow-hidden bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Download className="h-4 w-4 mr-2" />
              Export Grades
            </Button>
          </div>
        </div>

        {activeSubmission ? (
          // Submission review view
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content area - 8/12 width */}
            <div className="lg:col-span-8 space-y-6">
              {/* Student info card */}
              <Card className="backdrop-blur-md bg-white/[0.02] border-white/5 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-purple-500/20">
                        <AvatarImage
                          src={activeSubmission.avatar}
                          alt={activeSubmission.studentName}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white">
                          {activeSubmission.studentName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {activeSubmission.studentName}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={cn(
                              "px-2 py-0.5 text-xs font-medium",
                              getStatusBadge(activeSubmission.status)
                            )}
                          >
                            {activeSubmission.status.charAt(0).toUpperCase() +
                              activeSubmission.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-white/60">
                            Submitted{" "}
                            {formatSubmissionDate(
                              activeSubmission.submissionDate
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCloseSubmission}
                      className="bg-white/5 border-white/10 hover:bg-white/10 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to Submissions</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Content continues... */}
              {!isGrading ? (
                <div className="space-y-6">
                  {/* Submission info card */}
                  <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap gap-4 text-sm text-white/80">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                          <span>
                            Submitted:{" "}
                            {formatSubmissionDate(
                              activeSubmission.submissionDate
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-purple-400" />
                          <span>
                            {isLateSubmission(activeSubmission)
                              ? "Submitted after deadline"
                              : "Submitted on time"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-2 text-purple-400" />
                          <span>
                            {activeSubmission.grade !== null
                              ? `${activeSubmission.grade}/${assignment.totalPoints}`
                              : "Not graded"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Uploaded files */}
                  {activeSubmission.files &&
                    activeSubmission.files.length > 0 && (
                      <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                        <CardHeader className="border-b border-white/5 bg-white/5">
                          <CardTitle className="text-lg">
                            Uploaded Files
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            {activeSubmission.files.map(
                              (file: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                  <div className="flex items-center">
                                    <FileCheck className="h-5 w-5 text-purple-400 mr-3" />
                                    <div>
                                      <p className="font-medium">{file.name}</p>
                                      <p className="text-xs text-white/60">
                                        {(file.size / 1024 / 1024).toFixed(2)}{" "}
                                        MB
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white/70 hover:text-white"
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                  {/* Submission answers */}
                  <div className="space-y-6">
                    {activeSubmission.answers?.map(
                      (answer: any, index: number) => (
                        <Card
                          key={index}
                          className="backdrop-blur-md bg-white/[0.02] border-white/5 overflow-hidden group transition-all hover:border-purple-500/20"
                        >
                          <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                  Question {index + 1}
                                </Badge>
                                <CardTitle className="text-base leading-tight">
                                  {answer.question}
                                </CardTitle>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge
                                  className={cn(
                                    "px-3 py-1",
                                    answer.points === answer.maxPoints
                                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                                      : answer.points === 0
                                      ? "bg-red-500/20 text-red-300 border-red-500/30"
                                      : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                  )}
                                >
                                  {answer.points}/{answer.maxPoints} points
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                              <p className="text-sm text-white/60">
                                Student&apos;s Answer:
                              </p>
                              <div className="bg-white/5 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                                {answer.answer || "No answer provided"}
                              </div>
                            </div>

                            {answer.feedback && (
                              <div className="space-y-2">
                                <p className="text-sm text-white/60">
                                  Feedback:
                                </p>
                                <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                                  <p className="text-sm text-purple-200">
                                    {answer.feedback}
                                  </p>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    )}

                    {!activeSubmission.answers?.length && (
                      <Card className="backdrop-blur-md bg-white/[0.02] border-white/5">
                        <CardContent className="py-12 flex flex-col items-center justify-center text-center">
                          <div className="bg-white/5 p-4 rounded-full mb-4">
                            <Inbox className="h-8 w-8 text-white/60" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">
                            No answers available
                          </h3>
                          <p className="text-white/60 max-w-md">
                            This submission hasn&apos;t been processed yet.
                            Start grading to review the student&apos;s answers.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Feedback section */}
                  <Card className="backdrop-blur-md bg-white/[0.02] border-white/5">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-purple-400" />
                        <CardTitle className="text-lg">
                          Feedback to Student
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {activeSubmission.feedback ? (
                        <div className="bg-white/5 p-4 rounded-lg whitespace-pre-wrap">
                          {activeSubmission.feedback}
                        </div>
                      ) : (
                        <p className="text-white/60">
                          No feedback has been provided yet.
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Action buttons */}
                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={handleStartGrading}
                      className="relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span className="relative">
                        {activeSubmission.grade !== null
                          ? "Edit Grades"
                          : "Start Grading"}
                      </span>
                    </Button>
                  </div>
                </div>
              ) : (
                // Grading interface
                <div
                  className="space-y-6 overflow-y-auto pr-1.5"
                  style={{ maxHeight: "calc(100vh - 200px)" }}
                >
                  {assignment.questions.map((question, index) => (
                    <Card
                      key={question.id}
                      className="backdrop-blur-md bg-white/[0.02] border-white/5 overflow-hidden group transition-all hover:border-purple-500/20"
                    >
                      <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                              Question {index + 1}
                            </Badge>
                            <CardTitle className="text-base leading-tight">
                              {question.title}
                            </CardTitle>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={gradingPoints[question.id] || 0}
                                min={0}
                                max={question.points}
                                onChange={(e) =>
                                  handleUpdatePoints(
                                    question.id,
                                    Math.min(
                                      Math.max(
                                        0,
                                        parseInt(e.target.value) || 0
                                      ),
                                      question.points
                                    )
                                  )
                                }
                                className="w-20 bg-white/5 border-white/10 text-center"
                              />
                              <span className="text-white/60">
                                / {question.points}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full bg-white/5 hover:bg-white/10"
                                onClick={() =>
                                  handleUpdatePoints(
                                    question.id,
                                    Math.max(
                                      0,
                                      (gradingPoints[question.id] || 0) - 1
                                    )
                                  )
                                }
                              >
                                <span className="sr-only">Decrease</span>
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3"
                                >
                                  <path
                                    d="M10 7.5H5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full bg-white/5 hover:bg-white/10"
                                onClick={() =>
                                  handleUpdatePoints(
                                    question.id,
                                    Math.min(
                                      (gradingPoints[question.id] || 0) + 1,
                                      question.points
                                    )
                                  )
                                }
                              >
                                <span className="sr-only">Increase</span>
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3"
                                >
                                  <path
                                    d="M7.5 2.5V12.5M2.5 7.5H12.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-6">
                        {/* Student's answer */}
                        <div className="space-y-2">
                          <p className="text-sm text-white/60">
                            Student&apos;s Answer:
                          </p>
                          <div className="bg-white/5 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                            {activeSubmission.answers?.find(
                              (a: any) => a.questionId === question.id
                            )?.answer || "No answer provided"}
                          </div>
                        </div>

                        {/* Correct answer for multiple choice questions */}
                        {(question.type === "multipleChoice" ||
                          question.type === "checkboxes") && (
                          <div className="space-y-2">
                            <p className="text-sm text-white/60">
                              Correct Answer:
                            </p>
                            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                              <p className="text-sm text-green-200">
                                {question.type === "multipleChoice"
                                  ? question.correctAnswer
                                  : question.correctAnswers?.join(", ")}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Feedback input */}
                        <div className="space-y-2">
                          <p className="text-sm text-white/60">Feedback:</p>
                          <Textarea
                            value={gradingFeedback[question.id] || ""}
                            onChange={(e) =>
                              handleUpdateFeedback(question.id, e.target.value)
                            }
                            placeholder="Provide feedback for this answer..."
                            className="bg-white/5 border-white/10 min-h-[100px] resize-none"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Overall feedback */}
                  <Card className="backdrop-blur-md bg-white/[0.02] border-white/5">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-purple-400" />
                        <CardTitle className="text-lg">
                          Overall Feedback
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Textarea
                        placeholder="Enter feedback for the student on the overall assignment..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="bg-white/5 border-white/10 min-h-[150px] resize-none"
                      />
                    </CardContent>
                  </Card>

                  {/* Action buttons */}
                  <div className="flex justify-between pt-4">
                    <Button
                      onClick={() => setIsGrading(false)}
                      variant="outline"
                      className="relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-white/5 opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span className="relative">Cancel</span>
                    </Button>

                    <Button
                      onClick={handleSaveGrades}
                      disabled={isSaving}
                      className="relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span className="relative flex items-center gap-2">
                        {isSaving ? (
                          <>
                            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Grades
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right sidebar - 4/12 width */}
            <div className="lg:col-span-4 space-y-6">
              {/* Assignment info card */}
              <Card className="backdrop-blur-md bg-white/[0.02] border-white/5 sticky top-6">
                <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-purple-400" />
                    <CardTitle className="text-lg">Assignment Info</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Due date */}
                    <div className="flex items-start gap-4">
                      <div className="bg-white/5 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Due Date</p>
                        <p className="font-medium">
                          {formatSubmissionDate(assignment.dueDate)}
                        </p>
                      </div>
                    </div>

                    {/* Time estimate */}
                    <div className="flex items-start gap-4">
                      <div className="bg-white/5 p-2 rounded-lg">
                        <Clock className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Time Estimate</p>
                        <p className="font-medium">{assignment.timeEstimate}</p>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="flex items-start gap-4">
                      <div className="bg-white/5 p-2 rounded-lg">
                        <Star className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Total Points</p>
                        <p className="font-medium">
                          {assignment.totalPoints} points
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6 bg-white/10" />

                  {/* Progress stats */}
                  <div className="space-y-4">
                    <p className="text-sm font-medium">Grading Progress</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <p className="text-2xl font-semibold text-purple-300">
                          {(
                            (assignment.gradedCount /
                              assignment.submissionsCount) *
                            100
                          ).toFixed(0)}
                          %
                        </p>
                        <p className="text-sm text-white/60">Graded</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <p className="text-2xl font-semibold text-green-300">
                          {assignment.averageGrade}
                        </p>
                        <p className="text-sm text-white/60">Avg. Grade</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Class stats */}
              <Card className="backdrop-blur-md bg-white/[0.02] border-white/5">
                <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    <CardTitle className="text-lg">Class Overview</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-3xl font-semibold text-white mb-1">
                        {assignment.submissionsCount}
                      </p>
                      <p className="text-sm text-white/60">Total Submissions</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-3xl font-semibold text-white mb-1">
                        {assignment.gradedCount}
                      </p>
                      <p className="text-sm text-white/60">Graded</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Submissions list view
          <div className="space-y-8">
            {/* Overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="backdrop-blur-md bg-white/[0.02] border-white/5">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-white/60">Total Submissions</p>
                      <p className="text-3xl font-semibold mt-2">
                        {assignment.submissionsCount}
                      </p>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <Inbox className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/[0.02] border-white/5">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-white/60">Graded</p>
                      <p className="text-3xl font-semibold mt-2">
                        {assignment.gradedCount}
                      </p>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/[0.02] border-white/5">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-white/60">Average Grade</p>
                      <p className="text-3xl font-semibold mt-2">
                        {assignment.averageGrade}
                      </p>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <Star className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/[0.02] border-white/5">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-white/60">Time Estimate</p>
                      <p className="text-3xl font-semibold mt-2">
                        {assignment.timeEstimate}
                      </p>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1 w-full md:max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Search submissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className={cn(
                    "bg-white/5 border-white/10",
                    !statusFilter && "bg-purple-500/20 border-purple-500/30"
                  )}
                  onClick={() => setStatusFilter(null)}
                >
                  All
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "bg-white/5 border-white/10",
                    statusFilter === "graded" &&
                      "bg-green-500/20 border-green-500/30"
                  )}
                  onClick={() => setStatusFilter("graded")}
                >
                  Graded
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "bg-white/5 border-white/10",
                    statusFilter === "submitted" &&
                      "bg-blue-500/20 border-blue-500/30"
                  )}
                  onClick={() => setStatusFilter("submitted")}
                >
                  Pending
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "bg-white/5 border-white/10",
                    statusFilter === "late" &&
                      "bg-amber-500/20 border-amber-500/30"
                  )}
                  onClick={() => setStatusFilter("late")}
                >
                  Late
                </Button>
              </div>
            </div>

            {/* Submissions list */}
            <div className="grid grid-cols-1 gap-4">
              {filteredSubmissions.map((submission) => (
                <Card
                  key={submission.id}
                  className={cn(
                    "backdrop-blur-md bg-white/[0.02] border-white/5 transition-all hover:bg-white/[0.04] cursor-pointer group",
                    activeSubmission?.id === submission.id &&
                      "ring-2 ring-purple-500"
                  )}
                  onClick={() => handleSelectSubmission(submission)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border-2 border-purple-500/20">
                          <AvatarImage
                            src={submission.avatar}
                            alt={submission.studentName}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-fuchsia-500">
                            {submission.studentName
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                            {submission.studentName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              className={cn(
                                "px-2 py-0.5 text-xs font-medium",
                                getStatusBadge(submission.status)
                              )}
                            >
                              {submission.status.charAt(0).toUpperCase() +
                                submission.status.slice(1)}
                            </Badge>
                            <span className="text-sm text-white/60">
                              Submitted{" "}
                              {formatSubmissionDate(submission.submissionDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {submission.grade !== null && (
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-white">
                            {submission.grade}
                          </p>
                          <p className="text-sm text-white/60">
                            / {assignment.totalPoints}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
