"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CheckCircle2,
  Clock,
  Edit,
  Eye,
  FileEdit,
  HelpCircle,
  Loader2,
  MessageSquare,
  Plus,
  Save,
  Search,
  Trash2,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import { QuestionDisplay } from "./components/QuestionDisplay";
import { AnswerInput } from "./components/AnswerInput";
import { QuestionTypeSelector } from "./components/QuestionTypeSelector";
import { QuestionPreview } from "./components/QuestionPreview";
import { OptionInput } from "./components/OptionInput";
import { ResponseAnalytics } from "./components/ResponseAnalytics";
import { ApplicationHistory } from "./components/ApplicationHistory";

export default function ApplicationQAPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Class Application Q&A Components
        </h1>
        <p className="text-muted-foreground">
          Interactive components for creating and responding to application
          questions
        </p>
      </div>

      {/* Full Interface Demo */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Complete Application Q&A Interface
        </h2>
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-3">
            <TabsTrigger value="student">Student View</TabsTrigger>
            <TabsTrigger value="admin">Admin View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <StudentApplicationView />
          </TabsContent>

          <TabsContent value="admin">
            <AdminQuestionManager />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Example of using our new ResponseAnalytics component */}
              <ResponseAnalytics
                totalApplicants={38}
                completedApplications={27}
                data={[
                  {
                    question:
                      "Why are you interested in blockchain development?",
                    questionType: "longText",
                    totalResponses: 32,
                    completionRate: 84,
                  },
                  {
                    question:
                      "Which areas of blockchain development are you most interested in?",
                    questionType: "multipleChoice",
                    totalResponses: 34,
                    completionRate: 89,
                    answers: [
                      { value: "Smart Contracts", count: 28, percentage: 82 },
                      { value: "DeFi", count: 24, percentage: 71 },
                      { value: "DAOs", count: 18, percentage: 53 },
                      { value: "NFTs", count: 15, percentage: 44 },
                      { value: "Identity", count: 12, percentage: 35 },
                    ],
                  },
                  {
                    question: "Rate your experience level with JavaScript",
                    questionType: "singleChoice",
                    totalResponses: 36,
                    completionRate: 95,
                    answers: [
                      { value: "Beginner", count: 8, percentage: 22 },
                      { value: "Intermediate", count: 16, percentage: 44 },
                      { value: "Advanced", count: 10, percentage: 28 },
                      { value: "Expert", count: 2, percentage: 6 },
                    ],
                  },
                ]}
              />

              {/* Example of using our new ApplicationHistory component */}
              <ApplicationHistory
                applications={[
                  {
                    id: "app-1",
                    applicant: {
                      name: "Alex Johnson",
                      email: "alex.johnson@example.com",
                      avatar: "/avatars/01.png",
                    },
                    submittedAt: "Apr 28, 2025",
                    status: "completed",
                    completionRate: 100,
                    reviewStatus: "pending",
                  },
                  {
                    id: "app-2",
                    applicant: {
                      name: "Jamie Smith",
                      email: "jamie.smith@example.com",
                    },
                    submittedAt: "Apr 27, 2025",
                    status: "completed",
                    completionRate: 100,
                    reviewStatus: "approved",
                  },
                  {
                    id: "app-3",
                    applicant: {
                      name: "Taylor Wilson",
                      email: "taylor.wilson@example.com",
                      avatar: "/avatars/03.png",
                    },
                    submittedAt: "Apr 25, 2025",
                    status: "in_progress",
                    completionRate: 60,
                  },
                  {
                    id: "app-4",
                    applicant: {
                      name: "Jordan Lee",
                      email: "jordan.lee@example.com",
                    },
                    submittedAt: "Apr 23, 2025",
                    status: "abandoned",
                    completionRate: 30,
                  },
                ]}
                onView={(id) => console.log(`View application ${id}`)}
                onExport={(id) => console.log(`Export application ${id}`)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Individual Components */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6">Individual Components</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Question Component */}
          <Card>
            <CardHeader>
              <CardTitle>Question Component</CardTitle>
              <CardDescription>
                Display a single application question
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuestionDisplay
                question={{
                  id: "q1",
                  text: "Why are you interested in blockchain development?",
                  type: "longText",
                  required: true,
                  helpText:
                    "Tell us what sparked your interest and what aspects you find most compelling.",
                }}
              />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Displays question text, help text, and requirement status
            </CardFooter>
          </Card>

          {/* Answer Input Component */}
          <Card>
            <CardHeader>
              <CardTitle>Answer Input</CardTitle>
              <CardDescription>
                Interactive input for answering questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnswerInput
                question={{
                  id: "q2",
                  text: "Which areas of blockchain development are you most interested in?",
                  type: "multipleChoice",
                  options: [
                    "Smart Contracts",
                    "DeFi",
                    "DAOs",
                    "NFTs",
                    "Identity",
                  ],
                  required: true,
                }}
              />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Adaptable input controls based on question type
            </CardFooter>
          </Card>

          {/* Question Editor Component */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Question Editor</CardTitle>
              <CardDescription>
                Form for creating or editing application questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuestionEditor
                initialQuestion={{
                  text: "What experience do you have with JavaScript?",
                  type: "longText",
                  required: true,
                  helpText:
                    "Please describe your JavaScript experience, including frameworks and libraries you've used.",
                  options: [],
                }}
              />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Full-featured editor with support for all question types
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}

// Student Application View Component
function StudentApplicationView() {
  const [formState, setFormState] = useState<
    "editing" | "submitting" | "submitted" | "saved"
  >("editing");
  const [questions] = useState([
    {
      id: "q1",
      text: "Why are you interested in this blockchain development course?",
      type: "longText",
      required: true,
      helpText: "Tell us about your motivation and what you hope to learn.",
    },
    {
      id: "q2",
      text: "Which areas of blockchain development are you most interested in?",
      type: "multipleChoice",
      options: ["Smart Contracts", "DeFi", "DAOs", "NFTs", "Identity"],
      required: true,
    },
    {
      id: "q3",
      text: "Rate your experience level with JavaScript",
      type: "singleChoice",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true,
    },
    {
      id: "q4",
      text: "Do you have any prior experience with blockchain development?",
      type: "boolean",
      required: true,
    },
    {
      id: "q5",
      text: "Share a link to your GitHub profile or relevant project",
      type: "shortText",
      required: false,
      helpText: "Optional, but helps us understand your background",
    },
  ]);
  const [answers, setAnswers] = useState<Record<string, any>>({
    q1: "",
    q2: [],
    q3: "",
    q4: null,
    q5: "",
  });

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate form
    const requiredQuestions = questions.filter((q) => q.required);
    const unansweredRequired = requiredQuestions.filter((q) => {
      const answer = answers[q.id];
      if (answer === null || answer === undefined) return true;
      if (Array.isArray(answer) && answer.length === 0) return true;
      if (answer === "") return true;
      return false;
    });

    if (unansweredRequired.length > 0) {
      alert("Please answer all required questions");
      return;
    }

    // Submit form
    setFormState("submitting");
    setTimeout(() => {
      setFormState("submitted");
    }, 1500);
  };

  const handleSaveDraft = () => {
    setFormState("submitting");
    setTimeout(() => {
      setFormState("saved");
      setTimeout(() => setFormState("editing"), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card className="overflow-hidden">
        <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">
                Web3 Developer Program Application
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Spring 2025 Cohort
              </p>
            </div>
            <Badge
              variant={
                formState === "editing"
                  ? "outline"
                  : formState === "submitting"
                  ? "secondary"
                  : formState === "submitted"
                  ? "default"
                  : "outline"
              }
            >
              {formState === "editing" && "Draft"}
              {formState === "submitting" && "Processing..."}
              {formState === "submitted" && "Submitted"}
              {formState === "saved" && "Draft Saved"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Student" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Alex Johnson</p>
                <p className="text-sm text-muted-foreground">
                  alex.johnson@example.com
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={`space-y-3 p-5 border rounded-lg ${
                    question.required &&
                    !answers[question.id] &&
                    formState === "submitted"
                      ? "border-red-300 bg-red-50 dark:bg-red-900/10"
                      : "border-gray-200"
                  }`}
                >
                  <QuestionDisplay question={question} />

                  <div className="mt-2">
                    <AnswerInput
                      question={question}
                      value={answers[question.id]}
                      onChange={(value) =>
                        handleAnswerChange(question.id, value)
                      }
                      disabled={
                        formState === "submitting" || formState === "submitted"
                      }
                    />
                  </div>

                  {question.required &&
                    !answers[question.id] &&
                    formState === "submitted" && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>This question requires an answer</span>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-900/20 border-t flex flex-wrap gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={formState === "submitting" || formState === "submitted"}
          >
            {formState === "saved" && <CheckCircle className="mr-2 h-4 w-4" />}
            {formState !== "saved" && <Save className="mr-2 h-4 w-4" />}
            Save Draft
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={formState === "submitting" || formState === "submitted"}
          >
            {formState === "submitting" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {formState === "submitted" && (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            {formState === "submitting"
              ? "Submitting..."
              : formState === "submitted"
              ? "Submitted"
              : "Submit Application"}
          </Button>
        </CardFooter>
      </Card>

      {formState === "submitted" && (
        <Card className="bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  Application Submitted Successfully
                </h3>
                <p className="text-muted-foreground mt-1">
                  Thank you for submitting your application to the Web3
                  Developer Program. Our team will review your application and
                  get back to you within 5-7 business days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Admin Question Manager Component
function AdminQuestionManager() {
  const [questions, setQuestions] = useState([
    {
      id: "q1",
      text: "Why are you interested in this blockchain development course?",
      type: "longText",
      required: true,
      helpText: "Tell us about your motivation and what you hope to learn.",
      section: "Background",
    },
    {
      id: "q2",
      text: "Which areas of blockchain development are you most interested in?",
      type: "multipleChoice",
      options: ["Smart Contracts", "DeFi", "DAOs", "NFTs", "Identity"],
      required: true,
      section: "Interests",
    },
    {
      id: "q3",
      text: "Rate your experience level with JavaScript",
      type: "singleChoice",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true,
      section: "Skills",
    },
    {
      id: "q4",
      text: "Do you have any prior experience with blockchain development?",
      type: "boolean",
      required: true,
      helpText: "If yes, please describe in the next question",
      section: "Experience",
    },
    {
      id: "q5",
      text: "Share a link to your GitHub profile or relevant project",
      type: "shortText",
      required: false,
      helpText: "Optional, but helps us understand your background",
      section: "Portfolio",
    },
  ]);

  const [editing, setEditing] = useState<string | null>(null);
  const [hoveredQuestion, setHoveredQuestion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Get unique sections
  const sections = Array.from(new Set(questions.map((q) => q.section)));

  // Filter questions based on search and section
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.helpText &&
        q.helpText.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSection = !activeSection || q.section === activeSection;
    return matchesSearch && matchesSection;
  });

  const addQuestion = (question: any) => {
    setQuestions([
      ...questions,
      { ...question, id: `q${questions.length + 1}` },
    ]);
  };

  const updateQuestion = (id: string, updatedQuestion: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updatedQuestion } : q))
    );
    setEditing(null);
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle>Application Questions</CardTitle>
              <CardDescription>
                Manage the questions that applicants will answer
              </CardDescription>
            </div>
            <Button onClick={() => setEditing("new")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={activeSection || "all"}
              onValueChange={(value) =>
                setActiveSection(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sections</SelectItem>
                {sections.map((section) => (
                  <SelectItem
                    key={section}
                    value={section || "undefined-section"}
                  >
                    {section || "Uncategorized"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredQuestions.length > 0 ? (
            <ScrollArea className="max-h-[600px] pr-4">
              <div className="space-y-3">
                {filteredQuestions.map((question, index) => (
                  <Card
                    key={question.id}
                    className={`transition-shadow ${
                      editing === question.id ? "ring-2 ring-primary" : ""
                    }`}
                    onMouseEnter={() => setHoveredQuestion(question.id)}
                    onMouseLeave={() => setHoveredQuestion(null)}
                  >
                    <div className="p-4">
                      <div className="flex justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant={
                                question.required ? "default" : "outline"
                              }
                              className="font-normal"
                            >
                              {question.required ? "Required" : "Optional"}
                            </Badge>
                            <Badge variant="secondary" className="font-normal">
                              {question.section}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="font-normal capitalize"
                            >
                              {question.type}
                            </Badge>
                          </div>

                          <h3 className="font-medium text-base">
                            {question.text}
                          </h3>

                          {question.helpText && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <HelpCircle className="h-3 w-3" />
                              {question.helpText}
                            </p>
                          )}

                          {question.options && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {question.options.map((option, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="bg-muted/50"
                                >
                                  {option}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-2 ${
                            hoveredQuestion === question.id
                              ? "opacity-100"
                              : "opacity-0"
                          } transition-opacity`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditing(question.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteQuestion(question.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 border rounded-md">
              <FileEdit className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 font-medium">No questions found</p>
              <p className="text-sm text-muted-foreground">
                {searchTerm || activeSection
                  ? "Try adjusting your filters"
                  : "Add your first question to get started"}
              </p>
              {(searchTerm || activeSection) && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveSection(null);
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {editing && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editing === "new" ? "Add New Question" : "Edit Question"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <QuestionEditor
              initialQuestion={
                editing === "new"
                  ? {
                      text: "",
                      type: "shortText",
                      required: false,
                      helpText: "",
                      options: [],
                      section: sections[0] || "General",
                    }
                  : questions.find((q) => q.id === editing)!
              }
              onSave={(question) => {
                if (editing === "new") {
                  addQuestion(question);
                } else {
                  updateQuestion(editing, question);
                }
                setEditing(null);
              }}
              onCancel={() => setEditing(null)}
            />
          </CardContent>
        </Card>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-4 flex gap-3">
        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full h-min">
          <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-medium">Application Questions Best Practices</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
            <li>
              Keep questions concise and clear to improve completion rates
            </li>
            <li>Organize questions by section for a logical progression</li>
            <li>
              Include helpful text for questions that may need clarification
            </li>
            <li>Limit required questions to essential information only</li>
            <li>
              Use appropriate question types for different kinds of information
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Question Editor Component
function QuestionEditor({
  initialQuestion,
  onSave = () => {},
  onCancel = () => {},
}: {
  initialQuestion: any;
  onSave?: (question: any) => void;
  onCancel?: () => void;
}) {
  const formSchema = z.object({
    text: z.string().min(1, "Question text is required"),
    type: z.string(),
    required: z.boolean(),
    helpText: z.string().optional(),
    options: z.array(z.string()).optional(),
    section: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: initialQuestion.text || "",
      type: initialQuestion.type || "shortText",
      required: initialQuestion.required || false,
      helpText: initialQuestion.helpText || "",
      options: initialQuestion.options || [],
      section: initialQuestion.section || "General",
    },
  });

  const watchType = form.watch("type");
  const watchOptions = form.watch("options");

  const addOption = () => {
    const currentOptions = form.getValues("options") || [];
    form.setValue("options", [...currentOptions, ""]);
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options") || [];
    form.setValue(
      "options",
      currentOptions.filter((_, i) => i !== index)
    );
  };

  const updateOption = (index: number, value: string) => {
    const currentOptions = form.getValues("options") || [];
    const newOptions = [...currentOptions];
    newOptions[index] = value;
    form.setValue("options", newOptions);
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSave({
      ...initialQuestion,
      ...data,
      section: data.section || "General",
      options:
        data.type === "singleChoice" || data.type === "multipleChoice"
          ? data.options?.filter((o) => o.trim() !== "")
          : undefined,
    });
  });

  // Preview the question as the user edits
  const previewQuestion = {
    id: initialQuestion.id || "preview",
    text: form.watch("text") || "Question preview",
    type: form.watch("type"),
    required: form.watch("required"),
    helpText: form.watch("helpText"),
    options:
      watchType === "singleChoice" || watchType === "multipleChoice"
        ? watchOptions?.filter((o) => o.trim() !== "")
        : [],
  };

  // Import our new components at the top of the file
  // import { OptionInput } from "./components/OptionInput";
  // import { QuestionPreview } from "./components/QuestionPreview";
  // import { QuestionTypeSelector } from "./components/QuestionTypeSelector";

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Text</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the question"
                        {...field}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Type</FormLabel>
                    <FormControl>
                      {/* Replace the Select with our custom component */}
                      <QuestionTypeSelector
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a section" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Background">Background</SelectItem>
                        <SelectItem value="Skills">Skills</SelectItem>
                        <SelectItem value="Interests">Interests</SelectItem>
                        <SelectItem value="Experience">Experience</SelectItem>
                        <SelectItem value="Portfolio">Portfolio</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Group related questions into sections
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="helpText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Help Text (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Additional guidance for the applicant"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide additional context or instructions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Use our OptionInput component for options */}
              {(watchType === "singleChoice" ||
                watchType === "multipleChoice") && (
                <div className="space-y-4 border p-4 rounded-lg">
                  <Label className="font-medium">Answer Options</Label>
                  <OptionInput
                    options={watchOptions || []}
                    onAdd={addOption}
                    onRemove={removeOption}
                    onUpdate={updateOption}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="required"
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel htmlFor="required">
                        Required question
                      </FormLabel>
                      <FormDescription>
                        Applicants must answer this question
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              {/* Use our QuestionPreview component */}
              <QuestionPreview question={previewQuestion} />

              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-4">
                <div className="flex gap-2 items-center mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium">Suggested Question Types</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 pl-6">
                  <li>
                    <span className="font-medium">Short Text</span>: Names,
                    URLs, short answers
                  </li>
                  <li>
                    <span className="font-medium">Long Text</span>:
                    Explanations, detailed responses
                  </li>
                  <li>
                    <span className="font-medium">Single Choice</span>:
                    Selecting one option from a list
                  </li>
                  <li>
                    <span className="font-medium">Multiple Choice</span>:
                    Selecting many options
                  </li>
                  <li>
                    <span className="font-medium">Yes/No</span>: Binary
                    questions with two options
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Question
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
