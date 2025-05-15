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
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main content container */}
      <div className="container max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/fe-tests/classroom" className="mr-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                {assignment.title}
              </h1>
              <p className="text-white/60">
                Review and grade student submissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleExportGrades}
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Grades
            </Button>
          </div>
        </div>

        {activeSubmission ? (
          // Submission review view
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-white/10">
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
                    <h2 className="font-medium">
                      {activeSubmission.studentName}
                    </h2>
                    <p className="text-sm text-white/60">
                      Submitted:{" "}
                      {formatSubmissionDate(activeSubmission.submissionDate)}
                      {isLateSubmission(activeSubmission) && (
                        <span className="text-amber-400 ml-2">(Late)</span>
                      )}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseSubmission}
                  className="rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Student submission answers */}
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

                  {/* Answers */}
                  {activeSubmission.answers &&
                  activeSubmission.answers.length > 0 ? (
                    <div className="space-y-6">
                      {activeSubmission.answers.map(
                        (answer: any, index: number) => (
                          <Card
                            key={index}
                            className="backdrop-blur-md bg-white/[0.01] border-white/10"
                          >
                            <CardHeader className="border-b border-white/5 bg-white/5">
                              <div className="flex justify-between">
                                <div>
                                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-2">
                                    Question {index + 1}
                                  </Badge>
                                  <CardTitle className="text-base">
                                    {answer.question}
                                  </CardTitle>
                                </div>
                                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                  {answer.points}/{answer.maxPoints}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                              <div>
                                <p className="text-sm text-white/60 mb-1">
                                  Student&apos;s Answer:
                                </p>
                                <div className="bg-white/5 p-3 rounded-md whitespace-pre-wrap">
                                  {answer.answer || "No answer provided"}
                                </div>
                              </div>

                              {answer.feedback && (
                                <div>
                                  <p className="text-sm text-white/60 mb-1">
                                    Feedback:
                                  </p>
                                  <div className="bg-purple-500/10 p-3 rounded-md border border-purple-500/20 text-sm">
                                    {answer.feedback}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  ) : (
                    <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                      <CardContent className="py-12 flex flex-col items-center justify-center text-center">
                        <div className="bg-white/5 p-4 rounded-full mb-4">
                          <Inbox className="h-8 w-8 text-white/60" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          No answers available
                        </h3>
                        <p className="text-white/60 max-w-md">
                          This submission hasn&apos;t been processed yet. Start
                          grading to review the student&apos;s answers.
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Feedback section */}
                  <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                    <CardHeader className="border-b border-white/5 bg-white/5">
                      <CardTitle className="text-lg">
                        Feedback to Student
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {activeSubmission.feedback ? (
                        <div className="bg-white/5 p-4 rounded-md whitespace-pre-wrap">
                          {activeSubmission.feedback}
                        </div>
                      ) : (
                        <p className="text-white/60">
                          No feedback has been provided yet.
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleStartGrading}
                      className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
                    >
                      {activeSubmission.grade !== null
                        ? "Edit Grades"
                        : "Start Grading"}
                    </Button>
                  </div>
                </div>
              ) : (
                // Grading interface
                <div className="space-y-6">
                  {/* Grading questions */}
                  {assignment.questions.map((question, index) => {
                    const maxPoints = question.points;
                    return (
                      <Card
                        key={question.id}
                        className="backdrop-blur-md bg-white/[0.01] border-white/10"
                      >
                        <CardHeader className="border-b border-white/5 bg-white/5">
                          <div className="flex justify-between">
                            <div>
                              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-2">
                                Question {index + 1}
                              </Badge>
                              <CardTitle className="text-base">
                                {question.title}
                              </CardTitle>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="number"
                                  min="0"
                                  max={maxPoints}
                                  value={gradingPoints[question.id] || 0}
                                  onChange={(e) =>
                                    handleUpdatePoints(
                                      question.id,
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-16 h-8 bg-white/5 border-white/10 text-center"
                                />
                                <span className="text-white/60">
                                  / {maxPoints}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                          {/* Student's answer */}
                          <div>
                            <p className="text-sm text-white/60 mb-1">
                              Student&apos;s Answer:
                            </p>
                            <div className="bg-white/5 p-3 rounded-md whitespace-pre-wrap">
                              {activeSubmission.answers?.find(
                                (a: any) => a.questionId === question.id
                              )?.answer || "No answer provided"}
                            </div>
                          </div>

                          {/* For multiple choice and checkboxes, show correct answers */}
                          {(question.type === "multipleChoice" ||
                            question.type === "checkboxes") && (
                            <div>
                              <p className="text-sm text-white/60 mb-1">
                                Correct Answer:
                              </p>
                              <div className="bg-green-500/10 p-3 rounded-md border border-green-500/20">
                                {question.type === "multipleChoice" ? (
                                  <p>{question.correctAnswer}</p>
                                ) : (
                                  <ul className="list-disc list-inside">
                                    {question.correctAnswers?.map(
                                      (answer: string, i: number) => (
                                        <li key={i}>{answer}</li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Grading controls */}
                          <div>
                            <p className="text-sm text-white/60 mb-1">
                              Points:
                            </p>
                            <div className="flex gap-2 items-center mb-4">
                              <Slider
                                value={[gradingPoints[question.id] || 0]}
                                max={maxPoints}
                                step={1}
                                className="flex-1"
                                onValueChange={(values: number[]) => {
                                  const [value] = values;
                                  handleUpdatePoints(question.id, value);
                                }}
                              />
                              <span className="text-sm font-medium w-16 text-center">
                                {gradingPoints[question.id] || 0} / {maxPoints}
                              </span>
                            </div>

                            <div>
                              <p className="text-sm text-white/60 mb-1">
                                Feedback for this answer:
                              </p>
                              <Textarea
                                placeholder="Enter feedback for the student on this question..."
                                value={gradingFeedback[question.id] || ""}
                                onChange={(e) =>
                                  handleUpdateFeedback(
                                    question.id,
                                    e.target.value
                                  )
                                }
                                className="bg-white/5 border-white/10 min-h-[100px]"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                  {/* Overall feedback */}
                  <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                    <CardHeader className="border-b border-white/5 bg-white/5">
                      <CardTitle className="text-lg">
                        Overall Feedback
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Textarea
                        placeholder="Enter feedback for the student on the overall assignment..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="bg-white/5 border-white/10 min-h-[150px]"
                      />
                    </CardContent>
                  </Card>

                  {/* Private notes */}
                  <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                    <CardHeader className="border-b border-white/5 bg-white/5">
                      <CardTitle className="text-lg">
                        Private Notes (not visible to student)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Textarea
                        placeholder="Enter private notes about this submission..."
                        value={privateNotes}
                        onChange={(e) => setPrivateNotes(e.target.value)}
                        className="bg-white/5 border-white/10 min-h-[100px]"
                      />
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      onClick={() => setIsGrading(false)}
                      variant="outline"
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={handleSaveGrades}
                      className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Grades
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right sidebar - 1/3 width */}
            <div className="space-y-6">
              {/* Assignment info */}
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 sticky top-8">
                <CardHeader className="border-b border-white/5 bg-white/5">
                  <CardTitle className="text-lg">
                    Assignment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Due date</span>
                      <span className="font-medium">
                        {format(
                          new Date(assignment.dueDate),
                          "MMM d, yyyy 'at' h:mm a"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Total points</span>
                      <span className="font-medium">
                        {assignment.totalPoints}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Questions</span>
                      <span className="font-medium">
                        {assignment.questions.length}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4 bg-white/10" />

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Current grade</span>
                      <span className="font-medium">
                        {activeSubmission.grade !== null ? (
                          <span>
                            {activeSubmission.grade}/{assignment.totalPoints} (
                            {Math.round(
                              (activeSubmission.grade /
                                assignment.totalPoints) *
                                100
                            )}
                            %)
                          </span>
                        ) : (
                          <span>Not graded</span>
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Status</span>
                      <Badge
                        className={getStatusBadge(activeSubmission.status)}
                      >
                        {activeSubmission.status.charAt(0).toUpperCase() +
                          activeSubmission.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Submitted</span>
                      <span
                        className={cn(
                          "font-medium",
                          isLateSubmission(activeSubmission) && "text-amber-400"
                        )}
                      >
                        {formatSubmissionDate(activeSubmission.submissionDate)}
                        {isLateSubmission(activeSubmission) && " (Late)"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Other submissions from this student */}
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                <CardHeader className="border-b border-white/5 bg-white/5">
                  <CardTitle className="text-lg">Other Submissions</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-white/60 mb-4">
                    This student has no other submissions for this assignment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Submissions list view
          <div>
            {/* Assignment overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-purple-500/10 p-3 rounded-full mb-3">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold">
                    {assignment.submissionsCount}
                  </p>
                  <p className="text-sm text-white/60">Total Submissions</p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-green-500/10 p-3 rounded-full mb-3">
                    <UserCheck className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{assignment.gradedCount}</p>
                  <p className="text-sm text-white/60">Graded</p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-amber-500/10 p-3 rounded-full mb-3">
                    <MessageSquare className="h-6 w-6 text-amber-400" />
                  </div>
                  <p className="text-3xl font-bold">
                    {assignment.submissionsCount - assignment.gradedCount}
                  </p>
                  <p className="text-sm text-white/60">Needs Grading</p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-500/10 p-3 rounded-full mb-3">
                    <Star className="h-6 w-6 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold">
                    {assignment.averageGrade}/100
                  </p>
                  <p className="text-sm text-white/60">Average Score</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs and search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full md:w-auto"
              >
                <TabsList className="bg-white/[0.03] border border-white/10 rounded-lg">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="graded"
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
                  >
                    Graded
                  </TabsTrigger>
                  <TabsTrigger
                    value="ungraded"
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
                  >
                    Needs Grading
                  </TabsTrigger>
                  <TabsTrigger
                    value="late"
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
                  >
                    Late
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex w-full md:w-auto gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Search by student name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white/5 border-white/10"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setStatusFilter(null)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          !statusFilter ? "opacity-100" : "opacity-0"
                        )}
                      />
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setStatusFilter("graded")}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          statusFilter === "graded"
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      Graded
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setStatusFilter("submitted")}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          statusFilter === "submitted"
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      Submitted
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setStatusFilter("late")}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          statusFilter === "late" ? "opacity-100" : "opacity-0"
                        )}
                      />
                      Late
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Submissions table */}
            <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow>
                      <TableHead className="text-white/70">Student</TableHead>
                      <TableHead className="text-white/70">Submitted</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                      <TableHead className="text-white/70 text-right">
                        Grade
                      </TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((submission) => (
                        <TableRow
                          key={submission.id}
                          className="border-white/5 hover:bg-white/5 cursor-pointer"
                          onClick={() => handleSelectSubmission(submission)}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-7 w-7 border border-white/10">
                                <AvatarImage
                                  src={submission.avatar}
                                  alt={submission.studentName}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-xs">
                                  {submission.studentName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{submission.studentName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>
                                {format(
                                  new Date(submission.submissionDate),
                                  "MMM d, yyyy"
                                )}
                              </span>
                              <span className="text-white/60 text-xs">
                                {format(
                                  new Date(submission.submissionDate),
                                  "h:mm a"
                                )}
                                {isLateSubmission(submission) && (
                                  <span className="text-amber-400 ml-2">
                                    (Late)
                                  </span>
                                )}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusBadge(submission.status)}
                            >
                              {submission.status.charAt(0).toUpperCase() +
                                submission.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {submission.grade !== null ? (
                              <div className="flex flex-col">
                                <span>
                                  {submission.grade}/{assignment.totalPoints}
                                </span>
                                <span className="text-white/60 text-xs">
                                  {Math.round(
                                    (submission.grade /
                                      assignment.totalPoints) *
                                      100
                                  )}
                                  %
                                </span>
                              </div>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-white/50 hover:text-white"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-black/90 border-white/10 text-white"
                              >
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectSubmission(submission);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectSubmission(submission);
                                    setIsGrading(true);
                                  }}
                                >
                                  <Star className="mr-2 h-4 w-4" />
                                  {submission.grade !== null
                                    ? "Edit Grade"
                                    : "Grade"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem
                                  className="cursor-pointer text-red-400 focus:text-red-400"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FileX className="mr-2 h-4 w-4" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-white/60">
                            <Inbox className="h-6 w-6 mb-2" />
                            <p>
                              {searchQuery
                                ? "No submissions match your search"
                                : "No submissions found"}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
