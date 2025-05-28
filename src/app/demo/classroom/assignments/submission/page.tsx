"use client";

import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
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
import {
  AlertCircle,
  LucideCircleCheckBig,
  ArrowLeft,
  Upload,
  Save,
  Clock,
  Calendar,
  FileCheck,
  HelpCircle,
  Trophy,
  BarChart4,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ContactCard } from "@/components/features/ContactCard";
import { format, addDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const questionsData = [
  {
    isRequired: true,
    title: `Explain the difference between a program-derived address (PDA) and a normal
account address in Solana.`,
    caption: "Keep your answer concise, around 2-3 sentences.",
    element: "short-answer",
  },
  {
    isRequired: true,
    title: `Describe how you would implement cross-program invocation (CPI) in your project.
What are the security considerations?`,
    caption: "Include code examples if relevant.",
    element: "long-answer",
  },
  {
    isRequired: true,
    title: `Which of the following is NOT a valid account constraint in Solana programs?`,
    caption: null,
    element: "radio",
    options: ["init", "mut", "signer", "async", "seeds"],
  },
  {
    isRequired: true,
    title: `Select all data types that are natively supported by Borsh serialization in Solana
programs:`,
    caption: null,
    element: "multi-check",
    options: [
      "u8, u16, u32, u64, u128",
      "i8, i16, i32, i64, i128",
      "String",
      "HashMap",
      "Vec<T>",
    ],
  },
  {
    isRequired: true,
    title: `Enter your program's deployed public key on devnet:`,
    caption: `This should be the program you've deployed for Milestone 2.`,
    element: "public-key-verify", // Changed from short-answer to custom element
    placeholder: "Enter Solana public key",
  },
  {
    isRequired: true,
    title: `Upload your program's source code as a ZIP file:`,
    caption: `Please include a README.md file with build and test instructions.`,
    element: "file",
  },
  {
    isRequired: false,
    title: `How confident are you in your understanding of Solana program development?`,
    caption: `1 = Not confident, 5 = Very confident`,
    element: "h-radio",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    isRequired: true,
    title: `Which Solana client library are you primarily using for your project?`,
    caption: null,
    element: "select",
    options: ["spl-token", "web3.js", "solana-scaffold"],
  },
];

// Add mock test data
const mockTestResults = {
  status: "success",
  testsRun: 11,
  testsPassed: 11,
  computeUnits: 125782,
  percentile: 95,
  benchmarks: [
    { name: "Transaction throughput", value: "1,240 TPS", status: "excellent" },
    { name: "State compression", value: "Optimal", status: "excellent" },
    { name: "Memory efficiency", value: "High", status: "good" },
    { name: "Serialization overhead", value: "Low", status: "good" },
  ],
  testDetails: [
    { name: "Program ownership verification", status: "passed", time: "0.12s" },
    { name: "Account constraints validation", status: "passed", time: "0.34s" },
    { name: "Cross-program invocation", status: "passed", time: "0.56s" },
    { name: "Error handling", status: "passed", time: "0.23s" },
    { name: "Transaction simulation", status: "passed", time: "0.89s" },
    { name: "Instruction validation", status: "passed", time: "0.44s" },
    { name: "State update integrity", status: "passed", time: "0.67s" },
    { name: "Account rent exemption", status: "passed", time: "0.22s" },
    { name: "Authority verification", status: "passed", time: "0.18s" },
    { name: "Program upgrade authority", status: "passed", time: "0.31s" },
    { name: "Security vulnerability scan", status: "passed", time: "1.42s" },
  ],
};

export default function SubmissionPage() {
  const [showSettings] = useState(false);
  const [focusedQuestion, setFocusedQuestion] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number>(22);
  const dueDate = addDays(new Date(), 6);

  // Add new state variables
  const [publicKey, setPublicKey] = useState<string>("");
  const [verifying, setVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Function to handle verification
  const handleVerification = async () => {
    // Show loading state
    setVerifying(true);

    // Mock API call with timeout
    setTimeout(() => {
      setVerificationResult(mockTestResults);
      setVerifying(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Enhanced background with dynamic gradients */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[180px] animate-pulse-slower" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-medium" />
        <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      {/* Grid overlay with subtle animation */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Subtle floating particles effect */}
      <div className="fixed inset-0 z-[-1] opacity-30">
        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-white rounded-full animate-float-slow"></div>
        <div className="absolute top-[35%] left-[80%] w-1 h-1 bg-white rounded-full animate-float-medium"></div>
        <div className="absolute top-[65%] left-[30%] w-1 h-1 bg-white rounded-full animate-float-fast"></div>
        <div className="absolute top-[85%] left-[70%] w-1 h-1 bg-white rounded-full animate-float-slow"></div>
        <div className="absolute top-[25%] left-[40%] w-1 h-1 bg-white rounded-full animate-float-fast"></div>
      </div>

      {/* Main content container */}
      <div className="container max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
          <div className="flex items-center">
            <Link href="/fe-tests/classroom" className="mr-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/5 hover:bg-white/10 hover:text-purple-300 transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 leading-tight">
                Solana Program Development - Milestone 2
              </h1>
              <p className="text-white/60 max-w-2xl mt-1">
                In this assignment, you will demonstrate your understanding of
                Solana program development by implementing key functionality for
                your project milestone.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start">
            <Button
              onClick={() => {}}
              variant="outline"
              className="relative group overflow-hidden backdrop-blur-md bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <Save className="h-4 w-4 mr-2 text-purple-300" />
              Save Draft
            </Button>
            <Button
              onClick={() => {}}
              className="relative group overflow-hidden backdrop-blur-md bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <span className="absolute -inset-x-1 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300"></span>
              <LucideCircleCheckBig className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editing Area - 2/3 width */}
          <div className="lg:col-span-2">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {questionsData.map((question, questionIndex) => (
                <Card
                  key={question.title}
                  className={cn(
                    "backdrop-blur-md border-white/10 relative transition-all group",
                    focusedQuestion === questionIndex
                      ? "bg-white/[0.03] shadow-[0_0_30px_rgba(168,85,247,0.1)] ring-1 ring-purple-500/20"
                      : "bg-white/[0.01] hover:bg-white/[0.02]"
                  )}
                  onClick={() => setFocusedQuestion(questionIndex)}
                >
                  {focusedQuestion === questionIndex && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-gradient-to-b from-purple-500 to-fuchsia-500/50 rounded-full"></div>
                  )}

                  <CardContent className="pt-6">
                    <div className="flex gap-2 mb-4">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
                        Question {questionIndex + 1}
                      </Badge>
                      {question.isRequired && (
                        <Badge className="bg-red-500/20 text-red-300 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                          Required
                        </Badge>
                      )}
                      {question.isRequired && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
                          10 points
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="text-lg text-white group-hover:text-white/90 transition-colors">
                        {question.title}{" "}
                        {question.isRequired && (
                          <span className="text-red-500 text-2xl mt-[-5px] ml-[-3px]">
                            *
                          </span>
                        )}
                        {question.caption && (
                          <p className="text-white/70 text-sm mt-1">
                            {question.caption}
                          </p>
                        )}
                      </div>

                      <div className="border-l-2 border-purple-500/30 pl-4 py-1">
                        {/* Replace the short-answer input with our custom element for the public key question */}
                        {question.element === "public-key-verify" && (
                          <div className="space-y-4">
                            <div className="flex gap-3">
                              <Input
                                placeholder={
                                  question.placeholder ||
                                  "Enter Solana public key"
                                }
                                value={publicKey}
                                onChange={(e) => setPublicKey(e.target.value)}
                                className="bg-white/[0.02] border-white/10 resize-none focus-visible:ring-purple-500/30 focus-visible:border-purple-500/50 placeholder:text-white/40 transition-all duration-200"
                              />
                              <Button
                                onClick={handleVerification}
                                disabled={!publicKey || verifying}
                                className="relative group overflow-hidden backdrop-blur-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-[0_0_15px_rgba(96,165,250,0.3)]"
                              >
                                {verifying ? (
                                  <>
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin mr-2"></div>
                                    Verifying
                                  </>
                                ) : (
                                  <>
                                    <ArrowRight className="h-4 w-4 mr-1" />
                                    Verify Program
                                  </>
                                )}
                              </Button>
                            </div>

                            {verificationResult && (
                              <div className="mt-4 animate-fadeIn">
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                                  <div className="flex items-center mb-3">
                                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div className="ml-3">
                                      <div className="font-medium text-green-400">
                                        Program Verification Successful
                                      </div>
                                      <div className="text-xs text-white/60">
                                        All tests passed successfully
                                      </div>
                                    </div>
                                    <div className="ml-auto">
                                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                        {verificationResult.testsPassed}/
                                        {verificationResult.testsRun} Tests
                                        Passed
                                      </Badge>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                                    <div className="bg-white/5 rounded p-3 border border-white/10 flex flex-col items-center text-center">
                                      <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
                                        <Cpu className="h-3.5 w-3.5 text-blue-400" />
                                        Compute Units
                                      </div>
                                      <div className="text-lg font-semibold text-white">
                                        {verificationResult.computeUnits.toLocaleString()}
                                      </div>
                                    </div>

                                    <div className="bg-white/5 rounded p-3 border border-white/10 flex flex-col items-center text-center">
                                      <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
                                        <Trophy className="h-3.5 w-3.5 text-amber-400" />
                                        Percentile
                                      </div>
                                      <div className="text-lg font-semibold text-white">
                                        Top{" "}
                                        {100 - verificationResult.percentile}%
                                      </div>
                                    </div>

                                    <div className="bg-white/5 rounded p-3 border border-white/10 flex flex-col items-center text-center">
                                      <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
                                        <Zap className="h-3.5 w-3.5 text-purple-400" />
                                        Efficiency
                                      </div>
                                      <div className="text-lg font-semibold text-white">
                                        Excellent
                                      </div>
                                    </div>
                                  </div>

                                  <Tabs
                                    defaultValue="overview"
                                    className="w-full"
                                    onValueChange={setActiveTab}
                                  >
                                    <TabsList className="bg-white/5 border border-white/10">
                                      <TabsTrigger
                                        value="overview"
                                        className="data-[state=active]:bg-purple-500/30 data-[state=active]:text-white"
                                      >
                                        Overview
                                      </TabsTrigger>
                                      <TabsTrigger
                                        value="tests"
                                        className="data-[state=active]:bg-purple-500/30 data-[state=active]:text-white"
                                      >
                                        Tests
                                      </TabsTrigger>
                                      <TabsTrigger
                                        value="benchmarks"
                                        className="data-[state=active]:bg-purple-500/30 data-[state=active]:text-white"
                                      >
                                        Benchmarks
                                      </TabsTrigger>
                                    </TabsList>

                                    <TabsContent
                                      value="overview"
                                      className="mt-4 animate-fadeIn"
                                    >
                                      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-purple-950/20 to-blue-950/20">
                                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:30px_30px] opacity-[0.02]"></div>
                                        <div className="h-40 p-6 relative">
                                          <div className="absolute bottom-0 left-0 right-0 h-[70%]">
                                            <div className="relative h-full">
                                              {/* Mock graph indicators */}
                                              {[...Array(8)].map((_, i) => (
                                                <div
                                                  key={i}
                                                  className="absolute bottom-0 bg-purple-500/80 rounded-t-sm w-[8%]"
                                                  style={{
                                                    height: `${
                                                      30 + Math.random() * 70
                                                    }%`,
                                                    left: `${i * 12 + 5}%`,
                                                    opacity:
                                                      0.5 + Math.random() * 0.5,
                                                  }}
                                                ></div>
                                              ))}
                                              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20"></div>
                                            </div>
                                          </div>
                                          <div className="relative z-10">
                                            <div className="text-lg font-semibold text-white">
                                              Performance Analysis
                                            </div>
                                            <div className="text-sm text-white/70 mt-1">
                                              Your program is performing
                                              efficiently and meets all
                                              requirements.
                                            </div>
                                          </div>
                                        </div>
                                        <div className="bg-black/30 border-t border-white/10 p-4">
                                          <div className="flex justify-between text-sm">
                                            <div className="text-green-400 flex items-center">
                                              <CheckCircle2 className="h-4 w-4 mr-1" />
                                              All security checks passed
                                            </div>
                                            <div className="text-purple-300">
                                              Verified on{" "}
                                              {format(
                                                new Date(),
                                                "MMM d, yyyy"
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabsContent>

                                    <TabsContent
                                      value="tests"
                                      className="mt-4 space-y-2 animate-fadeIn"
                                    >
                                      {verificationResult.testDetails.map(
                                        (
                                          test: {
                                            name:
                                              | string
                                              | number
                                              | bigint
                                              | boolean
                                              | ReactElement<
                                                  unknown,
                                                  | string
                                                  | JSXElementConstructor<any>
                                                >
                                              | Iterable<ReactNode>
                                              | ReactPortal
                                              | Promise<
                                                  | string
                                                  | number
                                                  | bigint
                                                  | boolean
                                                  | ReactPortal
                                                  | ReactElement<
                                                      unknown,
                                                      | string
                                                      | JSXElementConstructor<any>
                                                    >
                                                  | Iterable<ReactNode>
                                                  | null
                                                  | undefined
                                                >
                                              | null
                                              | undefined;
                                            time:
                                              | string
                                              | number
                                              | bigint
                                              | boolean
                                              | ReactElement<
                                                  unknown,
                                                  | string
                                                  | JSXElementConstructor<any>
                                                >
                                              | Iterable<ReactNode>
                                              | ReactPortal
                                              | Promise<
                                                  | string
                                                  | number
                                                  | bigint
                                                  | boolean
                                                  | ReactPortal
                                                  | ReactElement<
                                                      unknown,
                                                      | string
                                                      | JSXElementConstructor<any>
                                                    >
                                                  | Iterable<ReactNode>
                                                  | null
                                                  | undefined
                                                >
                                              | null
                                              | undefined;
                                          },
                                          index: Key | null | undefined
                                        ) => (
                                          <div
                                            key={index}
                                            className="flex items-center justify-between p-2.5 bg-white/5 border border-white/10 rounded-md hover:bg-white/[0.07] transition-colors"
                                          >
                                            <div className="flex items-center">
                                              <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2.5">
                                                <CheckCircle2 className="h-3 w-3 text-green-400" />
                                              </div>
                                              <span className="text-sm">
                                                {test.name}
                                              </span>
                                            </div>
                                            <Badge className="bg-green-500/10 text-green-300 border-green-500/20 text-xs">
                                              {test.time}
                                            </Badge>
                                          </div>
                                        )
                                      )}
                                    </TabsContent>

                                    <TabsContent
                                      value="benchmarks"
                                      className="mt-4 space-y-3 animate-fadeIn"
                                    >
                                      {verificationResult.benchmarks.map(
                                        (
                                          benchmark: {
                                            name:
                                              | string
                                              | number
                                              | bigint
                                              | boolean
                                              | ReactElement<
                                                  unknown,
                                                  | string
                                                  | JSXElementConstructor<any>
                                                >
                                              | Iterable<ReactNode>
                                              | ReactPortal
                                              | Promise<
                                                  | string
                                                  | number
                                                  | bigint
                                                  | boolean
                                                  | ReactPortal
                                                  | ReactElement<
                                                      unknown,
                                                      | string
                                                      | JSXElementConstructor<any>
                                                    >
                                                  | Iterable<ReactNode>
                                                  | null
                                                  | undefined
                                                >
                                              | null
                                              | undefined;
                                            status: string;
                                            value:
                                              | string
                                              | number
                                              | bigint
                                              | boolean
                                              | ReactElement<
                                                  unknown,
                                                  | string
                                                  | JSXElementConstructor<any>
                                                >
                                              | Iterable<ReactNode>
                                              | ReactPortal
                                              | Promise<
                                                  | string
                                                  | number
                                                  | bigint
                                                  | boolean
                                                  | ReactPortal
                                                  | ReactElement<
                                                      unknown,
                                                      | string
                                                      | JSXElementConstructor<any>
                                                    >
                                                  | Iterable<ReactNode>
                                                  | null
                                                  | undefined
                                                >
                                              | null
                                              | undefined;
                                          },
                                          index: Key | null | undefined
                                        ) => (
                                          <div
                                            key={index}
                                            className="space-y-1.5"
                                          >
                                            <div className="flex justify-between text-sm">
                                              <span className="text-white/80">
                                                {benchmark.name}
                                              </span>
                                              <div className="flex items-center">
                                                <span
                                                  className={cn(
                                                    benchmark.status ===
                                                      "excellent"
                                                      ? "text-green-400"
                                                      : "text-blue-400"
                                                  )}
                                                >
                                                  {benchmark.value}
                                                </span>
                                                <TooltipProvider>
                                                  <Tooltip>
                                                    <TooltipTrigger asChild>
                                                      <div className="ml-1.5 cursor-help">
                                                        <HelpCircle className="h-3.5 w-3.5 text-white/40" />
                                                      </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-black/90 border-white/10">
                                                      <p className="text-xs max-w-[200px]">
                                                        {benchmark.status ===
                                                        "excellent"
                                                          ? "This metric is in the top tier of all submissions."
                                                          : "This metric is performing well above average."}
                                                      </p>
                                                    </TooltipContent>
                                                  </Tooltip>
                                                </TooltipProvider>
                                              </div>
                                            </div>
                                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                              <div
                                                className={cn(
                                                  "h-full rounded-full",
                                                  benchmark.status ===
                                                    "excellent"
                                                    ? "bg-gradient-to-r from-green-500 to-blue-500"
                                                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                                                )}
                                                style={{
                                                  width: `${
                                                    benchmark.status ===
                                                    "excellent"
                                                      ? 95
                                                      : 80
                                                  }%`,
                                                }}
                                              ></div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </TabsContent>
                                  </Tabs>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {question.element === "short-answer" && (
                          <Input
                            placeholder="Your answer"
                            className="bg-white/[0.02] border-white/10 min-h-[60px] resize-none focus-visible:ring-purple-500/30 focus-visible:border-purple-500/50 placeholder:text-white/40 transition-all duration-200"
                          />
                        )}
                        {question.element === "long-answer" && (
                          <Textarea
                            placeholder={
                              question.placeholder
                                ? question.placeholder
                                : "Your answer"
                            }
                            value={""}
                            onChange={(e) => {}}
                            className="bg-white/[0.02] border-white/10 min-h-[120px] resize-none focus-visible:ring-purple-500/30 focus-visible:border-purple-500/50 placeholder:text-white/40 transition-all duration-200"
                          />
                        )}

                        {question.element === "multi-check" &&
                          question?.options?.map((option) => (
                            <div
                              className="flex items-start space-x-3 space-y-0 py-1 group/option hover:bg-white/[0.01] rounded transition-colors"
                              key={option}
                            >
                              <Checkbox className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 border-white/20 mt-0.5" />
                              <div className="font-normal">{option}</div>
                            </div>
                          ))}

                        {question.element === "radio" &&
                          question?.options?.map(
                            (option: string, opIdx: number) => (
                              <div
                                key={opIdx}
                                className="flex items-start gap-3 py-1 group/option hover:bg-white/[0.01] rounded transition-colors"
                              >
                                <div className="mt-1">
                                  <div
                                    className={cn(
                                      "h-4 w-4 rounded-full border flex items-center justify-center cursor-pointer transition-all",
                                      opIdx % 2 == 0
                                        ? "bg-purple-500 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                                        : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30"
                                    )}
                                    onClick={() => {}}
                                  >
                                    {opIdx % 2 == 0 && (
                                      <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                                    )}
                                  </div>
                                </div>
                                <div className="pt-0.5">{option}</div>
                              </div>
                            )
                          )}

                        {question.element === "file" && (
                          <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center bg-white/[0.02] hover:bg-white/[0.03] hover:border-purple-500/20 transition-all cursor-pointer group/upload">
                            <Upload className="h-7 w-7 text-white/40 mx-auto mb-2 group-hover/upload:text-purple-400 transition-colors" />
                            <p className="text-white/60 group-hover/upload:text-white/80 transition-colors">
                              Click to upload file
                            </p>
                            <p className="text-white/40 group-hover/upload:text-white/60 transition-colors text-sm mt-1">
                              ZIP, PDF, or other relevant files
                            </p>
                          </div>
                        )}

                        {question.element === "select" && (
                          <Select>
                            <SelectTrigger className="bg-white/5 border-white/10 w-full focus:ring-purple-500/30 focus:border-purple-500/50 transition-all">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-white/10">
                              {question.options?.map(
                                (option: string, optionIndex: number) => (
                                  <SelectItem
                                    key={optionIndex}
                                    value={`option-${optionIndex}`}
                                    className="focus:bg-purple-500/20"
                                  >
                                    {option || `Option ${optionIndex + 1}`}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        )}

                        {question.element === "h-radio" && (
                          <div className="space-y-2">
                            <div className="flex gap-2 md:gap-5">
                              {question.options?.map((option, idx) => (
                                <div key={option} className="text-center">
                                  <div
                                    className={cn(
                                      "h-10 w-10 rounded-full border flex items-center justify-center cursor-pointer transition-all hover:bg-white/10",
                                      idx === 2
                                        ? "bg-purple-500/30 border-purple-500/50 text-white"
                                        : "bg-white/5 border-white/10 text-white/70"
                                    )}
                                  >
                                    {option}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between text-xs text-white/60">
                              <span>Not confident</span>
                              <span>Very confident</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Submit Button - Anchored to bottom on mobile */}
              <div className="flex justify-end lg:hidden sticky bottom-4 right-4 mt-8">
                <Button className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 shadow-lg shadow-purple-700/20">
                  <LucideCircleCheckBig className="h-4 w-4 mr-2" />
                  Submit Assignment
                </Button>
              </div>

              {/* Submit Button - Desktop */}
              <div className="hidden lg:flex justify-end">
                <Button className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300">
                  <LucideCircleCheckBig className="h-4 w-4 mr-2" />
                  Submit Assignment
                </Button>
              </div>
            </form>
          </div>

          {/* Right Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            {/* Settings Panel */}
            <div
              className={cn(
                "space-y-5 sticky top-8 transition-all",
                showSettings ? "opacity-100" : "opacity-100"
              )}
            >
              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.07)]">
                <CardHeader className="border-b border-white/5 bg-gradient-to-r from-white/[0.07] to-transparent">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-400" />
                    Submission Status
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="w-full">
                    <div className="flex items-center text-[12px] mb-1">
                      <span className="text-[16px] font-medium">
                        Completion progress
                      </span>
                      <span className="ml-auto text-[14px]">{completed}%</span>
                    </div>
                    <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
                        style={{ width: `${completed}%` }}
                      ></div>
                    </div>
                    <div className="text-white/40 text-xs mt-1">
                      3 of 8 questions completed
                    </div>
                  </div>

                  <div className="space-y-3 mt-5">
                    <div className="flex items-center gap-3 p-2 rounded bg-white/[0.02] border border-white/5">
                      <Calendar className="h-4 w-4 text-purple-400 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">Due Date</div>
                        <div className="text-xs text-white/60">
                          {format(dueDate, "MMMM d, yyyy 'at' h:mm a")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded bg-white/[0.02] border border-white/5">
                      <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">
                          Time remaining
                        </div>
                        <div className="text-xs text-white/60">
                          6 days 9 hours remaining
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded bg-white/[0.02] border border-white/5">
                      <FileCheck className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">
                          Required questions
                        </div>
                        <div className="text-xs text-white/60">
                          6 out of 8 questions (75 points total)
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="border-t border-white/5 px-6 py-4 flex-col gap-4">
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    className="w-full relative group overflow-hidden backdrop-blur-md bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <Save className="h-4 w-4 mr-2 text-purple-300" />
                    Save Draft
                  </Button>
                  <Button
                    onClick={() => {}}
                    className="w-full relative group overflow-hidden backdrop-blur-md bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  >
                    <span className="absolute -inset-x-1 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300"></span>
                    <LucideCircleCheckBig className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </Button>
                </CardFooter>
              </Card>

              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-gradient-to-r from-white/[0.07] to-transparent">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-purple-400" />
                    Assignment Information
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6 flex-col gap-4">
                  <div className="flex-col mb-4">
                    <p className="text-white font-medium flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      Instructions
                    </p>
                    <p className="text-white/60 text-sm mt-1 ml-3">
                      Complete all required questions in this assignment. You
                      can save your progress as a draft and return later to
                      complete it.
                    </p>
                  </div>
                  <div className="flex-col mb-4">
                    <p className="text-white font-medium flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      Submission Policy
                    </p>
                    <p className="text-white/60 text-sm mt-1 ml-3">
                      Once submitted, you cannot make changes to your answers.
                      Make sure to review your work before submitting.
                    </p>
                  </div>
                  <div className="flex-col gap-4">
                    <p className="text-white font-medium flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      Grading
                    </p>
                    <p className="text-white/60 text-sm mt-1 ml-3">
                      Your submission will be graded based on correctness,
                      completeness, and adherence to the requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/[0.01] border-white/10 overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-gradient-to-r from-white/[0.07] to-transparent">
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-purple-400" />
                    Need Help?
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6 flex-col gap-4">
                  <div className="flex-col mb-4">
                    <p className="text-white/60 text-sm mt-1">
                      If you have questions about this assignment or technical
                      difficulties, please contact your instructor.
                    </p>
                  </div>
                  <ContactCard
                    name="Sarah Johnson"
                    email="Office hours: Mon/Wed 2-4pm"
                    phone=""
                    status=""
                    avatarUrl="https://github.com/shadcn.png"
                    className="bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
