"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  ChevronDown,
  GripVertical,
  X,
  Check,
  Settings,
  Copy,
  Eye,
  ArrowLeft,
  PenTool,
  TextIcon,
  ListOrdered,
  FileCheck,
  FileText,
  CheckSquare,
  ChevronsUpDown,
  CircleCheck,
  Code,
  Info,
  Sparkles,
  Trash,
  PlusCircle,
  Save,
  ArrowUp,
  ArrowDown,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Question types
const questionTypes = [
  {
    id: "shortAnswer",
    label: "Short Answer",
    icon: <TextIcon className="h-4 w-4" />,
  },
  {
    id: "paragraph",
    label: "Paragraph",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "multipleChoice",
    label: "Multiple Choice",
    icon: <CircleCheck className="h-4 w-4" />,
  },
  {
    id: "checkboxes",
    label: "Checkboxes",
    icon: <CheckSquare className="h-4 w-4" />,
  },
  {
    id: "dropdown",
    label: "Dropdown",
    icon: <ChevronDown className="h-4 w-4" />,
  },
  {
    id: "linearScale",
    label: "Linear Scale",
    icon: <ListOrdered className="h-4 w-4" />,
  },
  {
    id: "pubkey",
    label: "Solana Public Key",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "fileUpload",
    label: "File Upload",
    icon: <FileCheck className="h-4 w-4" />,
  },
];

// Default new question template
const createEmptyQuestion = (id: string, type = "shortAnswer") => ({
  id,
  type,
  title: "",
  description: "",
  required: false,
  points: 0,
  options:
    type === "multipleChoice" || type === "checkboxes" || type === "dropdown"
      ? [""]
      : [],
  correctAnswers:
    type === "multipleChoice" || type === "checkboxes" || type === "dropdown"
      ? []
      : "",
  validations: {},
});

// Form schema
const assignmentFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  dueDate: z.date().optional(),
  totalPoints: z.number().min(0),
  showPointsToStudents: z.boolean(),
  allowLateSubmissions: z.boolean(),
  latePenaltyPercentage: z.number().min(0).max(100).optional(),
  status: z.enum(["draft", "published"]),
});

type AssignmentFormValues = z.infer<typeof assignmentFormSchema>;

const defaultValues: AssignmentFormValues = {
  title: "",
  description: "",
  dueDate: undefined,
  totalPoints: 100,
  showPointsToStudents: true,
  allowLateSubmissions: true,
  latePenaltyPercentage: 10,
  status: "draft",
};

export default function AssignmentCreationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("edit");
  const [questions, setQuestions] = useState<any[]>([
    createEmptyQuestion("q-" + Date.now()),
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    questions[0]?.id || null
  );

  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Calculate total points dynamically
  const calculateTotalPoints = () => {
    return questions.reduce((sum, question) => sum + (question.points || 0), 0);
  };

  // Add a new question
  const addQuestion = (type = "shortAnswer") => {
    const newQuestion = createEmptyQuestion("q-" + Date.now(), type);
    setQuestions([...questions, newQuestion]);
    setSelectedQuestionId(newQuestion.id);
  };

  // Remove a question
  const removeQuestion = (id: string) => {
    const newQuestions = questions.filter((q) => q.id !== id);
    setQuestions(newQuestions);

    // If we're removing the selected question, select the first question or null
    if (selectedQuestionId === id) {
      setSelectedQuestionId(newQuestions[0]?.id || null);
    }
  };

  // Update a question
  const updateQuestion = (id: string, updates: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  // Find the currently selected question
  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId);

  // Add an option to a question
  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && Array.isArray(question.options)) {
      const updatedOptions = [...question.options, ""];
      updateQuestion(questionId, { options: updatedOptions });
    }
  };

  // Remove an option from a question
  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && Array.isArray(question.options)) {
      const updatedOptions = question.options.filter(
        (_: any, i: number) => i !== optionIndex
      );
      updateQuestion(questionId, { options: updatedOptions });

      // Also update correctAnswers if needed
      if (question.type === "multipleChoice" || question.type === "dropdown") {
        if (question.correctAnswers === optionIndex) {
          updateQuestion(questionId, { correctAnswers: "" });
        } else if (
          typeof question.correctAnswers === "number" &&
          question.correctAnswers > optionIndex
        ) {
          updateQuestion(questionId, {
            correctAnswers: question.correctAnswers - 1,
          });
        }
      } else if (
        question.type === "checkboxes" &&
        Array.isArray(question.correctAnswers)
      ) {
        const updatedCorrectAnswers = question.correctAnswers
          .filter((ans: number) => ans !== optionIndex)
          .map((ans: number) => (ans > optionIndex ? ans - 1 : ans));
        updateQuestion(questionId, { correctAnswers: updatedCorrectAnswers });
      }
    }
  };

  // Update an option
  const updateOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && Array.isArray(question.options)) {
      const updatedOptions = [...question.options];
      updatedOptions[optionIndex] = value;
      updateQuestion(questionId, { options: updatedOptions });
    }
  };

  // Toggle correct answer for multiple choice
  const toggleCorrectAnswer = (questionId: string, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      if (question.type === "multipleChoice" || question.type === "dropdown") {
        // For single-select, just set the correct answer index
        updateQuestion(questionId, { correctAnswers: optionIndex });
      } else if (question.type === "checkboxes") {
        // For multi-select, toggle the presence of this index in the array
        const correctAnswers = Array.isArray(question.correctAnswers)
          ? [...question.correctAnswers]
          : [];

        const answerIndex = correctAnswers.indexOf(optionIndex);

        if (answerIndex >= 0) {
          // Remove if already selected
          correctAnswers.splice(answerIndex, 1);
        } else {
          // Add if not selected
          correctAnswers.push(optionIndex);
        }

        updateQuestion(questionId, { correctAnswers });
      }
    }
  };

  // Check if an option is selected as correct
  const isCorrectAnswer = (questionId: string, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return false;

    if (question.type === "multipleChoice" || question.type === "dropdown") {
      return question.correctAnswers === optionIndex;
    } else if (
      question.type === "checkboxes" &&
      Array.isArray(question.correctAnswers)
    ) {
      return question.correctAnswers.includes(optionIndex);
    }
    return false;
  };

  // Duplicate a question
  const duplicateQuestion = (id: string) => {
    const question = questions.find((q) => q.id === id);
    if (question) {
      const newQuestion = {
        ...JSON.parse(JSON.stringify(question)),
        id: "q-" + Date.now(),
        title: question.title ? `${question.title} (Copy)` : "",
      };
      setQuestions([...questions, newQuestion]);
      setSelectedQuestionId(newQuestion.id);
    }
  };

  // Move a question up or down
  const moveQuestion = (id: string, direction: "up" | "down") => {
    const index = questions.findIndex((q) => q.id === id);
    if (index < 0) return;

    if (direction === "up" && index > 0) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index - 1]] = [
        newQuestions[index - 1],
        newQuestions[index],
      ];
      setQuestions(newQuestions);
    } else if (direction === "down" && index < questions.length - 1) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index + 1]] = [
        newQuestions[index + 1],
        newQuestions[index],
      ];
      setQuestions(newQuestions);
    }
  };

  // Handle form submission
  const onSubmit = (values: AssignmentFormValues) => {
    // Here you would typically send the data to your API
    console.log("Assignment form values:", values);
    console.log("Questions:", questions);

    // For demo, we'll just show a success alert and redirect
    alert(
      `Assignment "${values.title}" ${
        values.status === "published" ? "published" : "saved as draft"
      } successfully!`
    );
    router.push("/fe-tests/classroom");
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
      <div className="container max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/fe-tests/classroom" className="mr-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Create Assignment
              </h1>
              <p className="text-white/60">
                Build and publish a new assignment form
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSettings(!showSettings)}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              onClick={() => {
                form.setValue("status", "draft");
                form.handleSubmit(onSubmit)();
              }}
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={() => {
                form.setValue("status", "published");
                form.handleSubmit(onSubmit)();
              }}
              className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editing Area - 2/3 width */}
          <div className="lg:col-span-2">
            <Tabs
              defaultValue="edit"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full mb-8"
            >
              <TabsList className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-1 mb-8">
                <TabsTrigger
                  value="edit"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Edit
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>

              {/* Edit Tab Content */}
              <TabsContent value="edit" className="mt-0">
                <Form {...form}>
                  <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    {/* Assignment Header */}
                    <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Assignment Title"
                                    {...field}
                                    className="bg-transparent border-none text-2xl font-medium focus-visible:ring-0 px-0 placeholder:text-white/40"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="Add a description..."
                                    {...field}
                                    className="bg-transparent border-none min-h-[60px] focus-visible:ring-0 px-0 resize-none placeholder:text-white/40"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Questions */}
                    {questions.map((question, questionIndex) => (
                      <Card
                        key={question.id}
                        className={cn(
                          "mt-6",
                          "backdrop-blur-md border-white/10 relative transition-all",
                          selectedQuestionId === question.id
                            ? "bg-white/[0.03] ring-2 ring-purple-500/50"
                            : "bg-white/[0.01] hover:bg-white/[0.02]"
                        )}
                        onClick={() => setSelectedQuestionId(question.id)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex gap-2 mb-4">
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                              Question {questionIndex + 1}
                            </Badge>
                            {question.required && (
                              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                                Required
                              </Badge>
                            )}
                            {question.points > 0 && (
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                {question.points}{" "}
                                {question.points === 1 ? "point" : "points"}
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Input
                                placeholder="Question"
                                value={question.title}
                                onChange={(e) =>
                                  updateQuestion(question.id, {
                                    title: e.target.value,
                                  })
                                }
                                className="bg-white/[0.02] border-white/10 font-medium focus-visible:ring-purple-500/20"
                              />
                            </div>

                            <div>
                              <Textarea
                                placeholder="Add description or instructions (optional)"
                                value={question.description}
                                onChange={(e) =>
                                  updateQuestion(question.id, {
                                    description: e.target.value,
                                  })
                                }
                                className="bg-white/[0.02] border-white/10 min-h-[60px] resize-none focus-visible:ring-purple-500/20 placeholder:text-white/40"
                              />
                            </div>

                            {/* Question content based on type */}
                            <div className="pt-2">
                              {/* Short Answer & Paragraph */}
                              {(question.type === "shortAnswer" ||
                                question.type === "paragraph") && (
                                <div className="pl-4 border-l-2 border-white/10">
                                  <Input
                                    placeholder={
                                      question.type === "shortAnswer"
                                        ? "Short answer text"
                                        : "Long answer text"
                                    }
                                    disabled
                                    className="bg-white/[0.02] border-white/10 text-white/50"
                                  />
                                  {question.type === "paragraph" && (
                                    <p className="text-xs text-white/50 mt-1">
                                      Students will see a paragraph-sized text
                                      area
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Multiple Choice */}
                              {question.type === "multipleChoice" && (
                                <div className="space-y-2">
                                  {question.options.map(
                                    (option: string, optionIndex: number) => (
                                      <div
                                        key={optionIndex}
                                        className="flex items-start gap-3"
                                      >
                                        <div className="mt-3">
                                          <div
                                            className={cn(
                                              "h-4 w-4 rounded-full border flex items-center justify-center cursor-pointer",
                                              isCorrectAnswer(
                                                question.id,
                                                optionIndex
                                              )
                                                ? "bg-purple-500 border-purple-500"
                                                : "bg-white/5 border-white/20"
                                            )}
                                            onClick={() =>
                                              toggleCorrectAnswer(
                                                question.id,
                                                optionIndex
                                              )
                                            }
                                          >
                                            {isCorrectAnswer(
                                              question.id,
                                              optionIndex
                                            ) && (
                                              <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex-1">
                                          <Input
                                            placeholder={`Option ${
                                              optionIndex + 1
                                            }`}
                                            value={option}
                                            onChange={(e) =>
                                              updateOption(
                                                question.id,
                                                optionIndex,
                                                e.target.value
                                              )
                                            }
                                            className="bg-white/[0.02] border-white/10 focus-visible:ring-purple-500/20"
                                          />
                                        </div>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            removeOption(
                                              question.id,
                                              optionIndex
                                            )
                                          }
                                          className="text-white/50 hover:text-white mt-1"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )
                                  )}

                                  <div className="pl-7">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      onClick={() => addOption(question.id)}
                                      className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 p-0 h-8"
                                    >
                                      <Plus className="h-4 w-4 mr-1" />
                                      Add Option
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Checkboxes */}
                              {question.type === "checkboxes" && (
                                <div className="space-y-2">
                                  {question.options.map(
                                    (option: string, optionIndex: number) => (
                                      <div
                                        key={optionIndex}
                                        className="flex items-start gap-3"
                                      >
                                        <div className="mt-3">
                                          <div
                                            className={cn(
                                              "h-4 w-4 rounded border flex items-center justify-center cursor-pointer",
                                              isCorrectAnswer(
                                                question.id,
                                                optionIndex
                                              )
                                                ? "bg-purple-500 border-purple-500"
                                                : "bg-white/5 border-white/20"
                                            )}
                                            onClick={() =>
                                              toggleCorrectAnswer(
                                                question.id,
                                                optionIndex
                                              )
                                            }
                                          >
                                            {isCorrectAnswer(
                                              question.id,
                                              optionIndex
                                            ) && (
                                              <Check className="h-3 w-3 text-white" />
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex-1">
                                          <Input
                                            placeholder={`Option ${
                                              optionIndex + 1
                                            }`}
                                            value={option}
                                            onChange={(e) =>
                                              updateOption(
                                                question.id,
                                                optionIndex,
                                                e.target.value
                                              )
                                            }
                                            className="bg-white/[0.02] border-white/10 focus-visible:ring-purple-500/20"
                                          />
                                        </div>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            removeOption(
                                              question.id,
                                              optionIndex
                                            )
                                          }
                                          className="text-white/50 hover:text-white mt-1"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )
                                  )}

                                  <div className="pl-7">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      onClick={() => addOption(question.id)}
                                      className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 p-0 h-8"
                                    >
                                      <Plus className="h-4 w-4 mr-1" />
                                      Add Option
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Dropdown */}
                              {question.type === "dropdown" && (
                                <div className="space-y-2">
                                  {question.options.map(
                                    (option: string, optionIndex: number) => (
                                      <div
                                        key={optionIndex}
                                        className="flex items-start gap-3"
                                      >
                                        <div className="mt-3 flex items-center justify-center w-4">
                                          <div
                                            className={cn(
                                              "h-4 w-4 rounded flex items-center justify-center cursor-pointer",
                                              isCorrectAnswer(
                                                question.id,
                                                optionIndex
                                              )
                                                ? "bg-purple-500 text-white"
                                                : "bg-white/5 text-white/50"
                                            )}
                                            onClick={() =>
                                              toggleCorrectAnswer(
                                                question.id,
                                                optionIndex
                                              )
                                            }
                                          >
                                            {optionIndex + 1}
                                          </div>
                                        </div>
                                        <div className="flex-1">
                                          <Input
                                            placeholder={`Option ${
                                              optionIndex + 1
                                            }`}
                                            value={option}
                                            onChange={(e) =>
                                              updateOption(
                                                question.id,
                                                optionIndex,
                                                e.target.value
                                              )
                                            }
                                            className="bg-white/[0.02] border-white/10 focus-visible:ring-purple-500/20"
                                          />
                                        </div>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            removeOption(
                                              question.id,
                                              optionIndex
                                            )
                                          }
                                          className="text-white/50 hover:text-white mt-1"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )
                                  )}

                                  <div className="pl-7">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      onClick={() => addOption(question.id)}
                                      className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 p-0 h-8"
                                    >
                                      <Plus className="h-4 w-4 mr-1" />
                                      Add Option
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Linear Scale */}
                              {question.type === "linearScale" && (
                                <div className="pl-4 border-l-2 border-white/10">
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                      <div
                                        key={num}
                                        className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm"
                                      >
                                        {num}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex justify-between text-xs text-white/60">
                                    <span>Low</span>
                                    <span>High</span>
                                  </div>
                                </div>
                              )}

                              {/* Solana Public Key */}
                              {question.type === "pubkey" && (
                                <div className="pl-4 border-l-2 border-white/10">
                                  <Input
                                    placeholder="Solana Public Key"
                                    disabled
                                    className="bg-white/[0.02] border-white/10 text-white/50 font-mono"
                                  />
                                  <p className="text-xs text-white/50 mt-1">
                                    Students will need to provide a valid Solana
                                    address
                                  </p>
                                </div>
                              )}

                              {/* File Upload */}
                              {question.type === "fileUpload" && (
                                <div className="pl-4 border-l-2 border-white/10">
                                  <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center bg-white/[0.02]">
                                    <FileCheck className="h-8 w-8 text-white/40 mx-auto mb-2" />
                                    <p className="text-white/60">
                                      Students will be able to upload files here
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Question actions */}
                          <div className="flex justify-between items-center gap-2 mt-6">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={question.required}
                                  onCheckedChange={(checked) =>
                                    updateQuestion(question.id, {
                                      required: checked,
                                    })
                                  }
                                  className="data-[state=checked]:bg-purple-500"
                                />
                                <span className="text-sm text-white/70">
                                  Required
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="Points"
                                  value={question.points || ""}
                                  onChange={(e) =>
                                    updateQuestion(question.id, {
                                      points: parseInt(e.target.value) || 0,
                                    })
                                  }
                                  className="w-16 h-8 bg-white/5 border-white/10 text-center"
                                />
                                <span className="text-sm text-white/70">
                                  {question.points === 1 ? "point" : "points"}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                  >
                                    {
                                      questionTypes.find(
                                        (t) => t.id === question.type
                                      )?.icon
                                    }
                                    <span className="ml-2">
                                      {
                                        questionTypes.find(
                                          (t) => t.id === question.type
                                        )?.label
                                      }
                                    </span>
                                    <ChevronDown className="h-4 w-4 ml-2" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
                                  <DropdownMenuLabel>
                                    Question Type
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator className="bg-white/10" />
                                  {questionTypes.map((type) => (
                                    <DropdownMenuItem
                                      key={type.id}
                                      className={cn(
                                        "flex items-center gap-2 cursor-pointer",
                                        question.type === type.id &&
                                          "bg-white/10"
                                      )}
                                      onClick={() =>
                                        updateQuestion(question.id, {
                                          type: type.id,
                                        })
                                      }
                                    >
                                      {type.icon}
                                      <span>{type.label}</span>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white/60 hover:text-white"
                                  >
                                    <ChevronsUpDown className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
                                  <DropdownMenuItem
                                    className="cursor-pointer flex items-center gap-2"
                                    onClick={() =>
                                      duplicateQuestion(question.id)
                                    }
                                  >
                                    <Copy className="h-4 w-4" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="cursor-pointer flex items-center gap-2"
                                    onClick={() =>
                                      moveQuestion(question.id, "up")
                                    }
                                    disabled={questionIndex === 0}
                                  >
                                    <ArrowUp className="h-4 w-4" />
                                    Move Up
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="cursor-pointer flex items-center gap-2"
                                    onClick={() =>
                                      moveQuestion(question.id, "down")
                                    }
                                    disabled={
                                      questionIndex === questions.length - 1
                                    }
                                  >
                                    <ArrowDown className="h-4 w-4" />
                                    Move Down
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-white/10" />
                                  <DropdownMenuItem
                                    className="cursor-pointer flex items-center gap-2 text-red-400 focus:text-red-400"
                                    onClick={() => removeQuestion(question.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Add Question Button */}
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Question
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
                          {questionTypes.map((type) => (
                            <DropdownMenuItem
                              key={type.id}
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={() => addQuestion(type.id)}
                            >
                              {type.icon}
                              <span>{type.label}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              {/* Preview Tab Content */}
              <TabsContent value="preview" className="space-y-6">
                {/* Preview Header */}
                <Card className="backdrop-blur-md bg-white/[0.01] border-white/10">
                  <CardContent className="pt-6">
                    <h1 className="text-2xl font-medium mb-2">
                      {form.watch("title") || "Untitled Assignment"}
                    </h1>
                    <p className="text-white/70 mb-4">
                      {form.watch("description") || "No description provided"}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <span className="flex items-center">
                        {/* <Calendar className="h-4 w-4 mr-1" /> */}
                        Due:{" "}
                        {form.watch("dueDate") &&
                        form.watch("dueDate") instanceof Date &&
                        !isNaN(form.watch("dueDate")!.getTime())
                          ? format(form.watch("dueDate")!, "PPP")
                          : "No due date"}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {form.watch("totalPoints") ||
                          calculateTotalPoints()}{" "}
                        points
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Preview Questions */}
                {questions.map((question, index) => (
                  <Card
                    key={index}
                    className="backdrop-blur-md bg-white/[0.01] border-white/10"
                  >
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        <div className="flex gap-1 items-center">
                          <h3 className="font-medium text-lg">
                            {question.title || `Question ${index + 1}`}
                          </h3>
                          {question.required && (
                            <span className="text-red-400">*</span>
                          )}
                          {question.points > 0 && (
                            <span className="text-sm text-white/60 ml-2">
                              ({question.points}{" "}
                              {question.points === 1 ? "point" : "points"})
                            </span>
                          )}
                        </div>
                        {question.description && (
                          <p className="text-white/70 text-sm mt-1">
                            {question.description}
                          </p>
                        )}
                      </div>

                      <div className="pl-4 border-l-2 border-purple-500/30 ">
                        {/* Short Answer */}
                        {question.type === "shortAnswer" && (
                          <Input
                            placeholder="Your answer"
                            disabled
                            className="bg-white/5 border-white/10"
                          />
                        )}

                        {/* Paragraph */}
                        {question.type === "paragraph" && (
                          <Textarea
                            placeholder="Your answer"
                            disabled
                            className="bg-white/5 border-white/10 min-h-[100px]"
                          />
                        )}

                        {/* Multiple Choice */}
                        {question.type === "multipleChoice" && (
                          <div className="space-y-2">
                            {question.options.map(
                              (option: string, optionIndex: number) => (
                                <div
                                  key={optionIndex}
                                  className="flex items-center gap-3"
                                >
                                  <div className="h-4 w-4 rounded-full border border-white/20 bg-white/5"></div>
                                  <span>
                                    {option || `Option ${optionIndex + 1}`}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {/* Checkboxes */}
                        {question.type === "checkboxes" && (
                          <div className="space-y-2">
                            {question.options.map(
                              (option: string, optionIndex: number) => (
                                <div
                                  key={optionIndex}
                                  className="flex items-center gap-3"
                                >
                                  <div className="h-4 w-4 rounded border border-white/20 bg-white/5"></div>
                                  <span>
                                    {option || `Option ${optionIndex + 1}`}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {/* Dropdown */}
                        {question.type === "dropdown" && (
                          <Select disabled>
                            <SelectTrigger className="bg-white/5 border-white/10 w-full">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {question.options.map(
                                (option: string, optionIndex: number) => (
                                  <SelectItem
                                    key={optionIndex}
                                    value={`option-${optionIndex}`}
                                  >
                                    {option || `Option ${optionIndex + 1}`}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        )}

                        {/* Linear Scale */}
                        {question.type === "linearScale" && (
                          <div className="space-y-2">
                            <div className="flex gap-4">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div key={num} className="text-center">
                                  <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    {num}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between text-xs text-white/60">
                              <span>Low</span>
                              <span>High</span>
                            </div>
                          </div>
                        )}

                        {/* Solana Public Key */}
                        {question.type === "pubkey" && (
                          <Input
                            placeholder="Enter Solana public key"
                            disabled
                            className="bg-white/5 border-white/10 font-mono"
                          />
                        )}

                        {/* File Upload */}
                        {question.type === "fileUpload" && (
                          <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center bg-white/[0.02]">
                            <FileCheck className="h-6 w-6 text-white/40 mx-auto mb-2" />
                            <p className="text-white/60">
                              Click to upload file
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600">
                    Submit
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            {/* Settings Panel */}
            <Card
              className={cn(
                "backdrop-blur-md bg-white/[0.01] border-white/10 sticky top-8 transition-all",
                showSettings ? "opacity-100" : "opacity-70 hover:opacity-100"
              )}
            >
              <CardHeader className="border-b border-white/5 bg-white/5">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-400" />
                  Assignment Settings
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-6">
                <Form {...form}>
                  <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Due Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal bg-white/5 border-white/10",
                                    !field.value && "text-white/60"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>No due date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-black/90 border-white/10">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="bg-transparent"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="totalPoints"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Points</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                              className="bg-white/5 border-white/10"
                            />
                          </FormControl>
                          <FormDescription className="text-white/50">
                            {calculateTotalPoints() > 0 &&
                              calculateTotalPoints() !== field.value && (
                                <span className="text-amber-400">
                                  Questions total: {calculateTotalPoints()}{" "}
                                  points
                                </span>
                              )}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="showPointsToStudents"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-3 shadow-sm bg-white/5">
                          <div className="space-y-0.5">
                            <FormLabel>Show Points to Students</FormLabel>
                            <FormDescription className="text-white/50">
                              Make points visible during assignment
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-purple-500"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="allowLateSubmissions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-3 shadow-sm bg-white/5">
                          <div className="space-y-0.5">
                            <FormLabel>Allow Late Submissions</FormLabel>
                            <FormDescription className="text-white/50">
                              Accept submissions after due date
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-purple-500"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("allowLateSubmissions") && (
                      <FormField
                        control={form.control}
                        name="latePenaltyPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Late Submission Penalty (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value) || 0)
                                }
                                className="bg-white/5 border-white/10"
                              />
                            </FormControl>
                            <FormDescription className="text-white/50">
                              Points deducted for late submissions
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </form>
                </Form>

                <div className="border-t border-white/10 pt-4 mt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Info className="h-4 w-4 text-white/60" />
                    <span className="text-sm text-white/60">
                      Assignment Summary
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Questions:</span>
                      <span>{questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Required Questions:</span>
                      <span>{questions.filter((q) => q.required).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Total Points:</span>
                      <span>{calculateTotalPoints()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Status:</span>
                      <Badge
                        className={
                          form.watch("status") === "draft"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : "bg-green-500/20 text-green-300 border-green-500/30"
                        }
                      >
                        {form.watch("status") === "draft"
                          ? "Draft"
                          : "Published"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-white/5 px-6 py-4">
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Assignment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
