"use client";

import { useState } from "react";
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

import { Badge } from "@/components/ui/badge";

import { LucideCircleCheckBig, ArrowLeft, Upload, Save } from "lucide-react";
import { cn } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ContactCard } from "@/components/features/ContactCard";

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
    element: "short-answer",
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

export default function SubmissionPage() {
  const [showSettings] = useState(false);

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
                Solana Program Development - Milestone 2
              </h1>
              <p className="text-white/60 mr-10">
                In this assignment, you will demonstrate your understanding of
                Solana program development by implementing key functionality for
                your project milestone.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => {}}
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={() => {}}
              className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
            >
              <LucideCircleCheckBig className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editing Area - 2/3 width */}
          <div className="lg:col-span-2">
            <form className="space-y-6" onSubmit={() => {}}>
              {questionsData.map((question, questionIndex) => (
                <Card
                  key={question.title}
                  className={cn(
                    "backdrop-blur-md border-white/10 relative transition-all bg-white/[0.01] hover:bg-white/[0.02]"
                  )}
                  // onClick={() => setSelectedQuestionId(question.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex gap-2 mb-4">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        Question {questionIndex + 1}
                      </Badge>
                      {question.isRequired && (
                        <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                          Required
                        </Badge>
                      )}
                      {question.isRequired && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          {10}
                          {"points"}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="text-lg text-white ">
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

                      <div className="border-l-2 pl-3 border-white/10">
                        {question.element === "short-answer" && (
                          <Input
                            placeholder="Your answer"
                            className="bg-white/[0.02] border-white/10 min-h-[60px] resize-none focus-visible:ring-purple-500/20 placeholder:text-white/40"
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
                            className="bg-white/[0.02] border-white/10 min-h-[120px] resize-none focus-visible:ring-purple-500/20 placeholder:text-white/40"
                          />
                        )}

                        {question.element === "multi-check" &&
                          question?.options?.map((option) => (
                            <div
                              className="flex flex-row items-start space-x-3 space-y-0"
                              key={option}
                            >
                              <Checkbox />
                              <div className="font-normal text-[16px]">
                                {option}
                              </div>
                            </div>
                          ))}
                        {question.element === "radio" &&
                          question?.options?.map(
                            (option: string, opIdx: number) => (
                              <div
                                key={opIdx}
                                className="flex items-start gap-3"
                              >
                                <div className="mt-3">
                                  <div
                                    className={cn(
                                      "h-4 w-4 rounded-full border flex items-center justify-center cursor-pointer",
                                      opIdx % 2 == 0
                                        ? "bg-purple-500 border-purple-500"
                                        : "bg-white/5 border-white/20"
                                    )}
                                    onClick={() => {}}
                                  >
                                    {opIdx % 2 == 0 && (
                                      <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                                    )}
                                  </div>
                                </div>
                                <div className="">
                                  <Input
                                    placeholder={`Option ${opIdx + 1}`}
                                    value={option}
                                    onChange={(e) => {}}
                                    className="border-transparent"
                                  />
                                </div>
                              </div>
                            )
                          )}

                        {question.element === "file" && (
                          <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center bg-white/[0.02]">
                            <Upload className="h-7 w-7 text-white/40 mx-auto mb-2" />
                            <p className="text-white/60">
                              Click to upload file
                            </p>
                            <p className="text-white/40">
                              ZIP, PDF, or other relevant files
                            </p>
                          </div>
                        )}

                        {question.element === "select" && (
                          <Select>
                            <SelectTrigger className="bg-white/5 border-white/10 w-full">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {question.options?.map(
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
                        {question.element === "h-radio" && (
                          <div className="space-y-2">
                            <div className="flex gap-5">
                              {question.options?.map((option) => (
                                <div key={option} className="text-center">
                                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
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

              {/* Add Question Button */}
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600">
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
                "backdrop-blur-md bg-white/[0.01] border-white/10 sticky top-8 transition-all",
                showSettings ? "opacity-100" : "opacity-70 hover:opacity-100"
              )}
            >
              <Card className="mb-5">
                <CardHeader className="border-b border-white/5 bg-white/5">
                  <CardTitle className="flex items-center gap-2">
                    Submission Status
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6 w-full ">
                  <div className="w-full flex-col justify-center">
                    <div className="flex flex-row items-center text-[12px]">
                      <span className="text-[16px]">Completion progress</span>
                      <span className="ml-auto">22%</span>
                    </div>
                    <Progress
                      value={36}
                      className="h-1.5 w-full bg-white/10 mt-2"
                    >
                      <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full" />
                    </Progress>
                  </div>
                  <div className="flex flex-row  mt-4 text-[12px]">
                    <span className="text-white/60">Due Date</span>
                    <span className="ml-auto">May 21, 2025 at 5:29 AM</span>
                  </div>
                  <div className="flex flex-row  mt-4 text-[12px]">
                    <span className="text-white/60">Due Date</span>
                    <span className="ml-auto">May 21, 2025 at 5:29 AM</span>
                  </div>
                  <div className="flex flex-row  mt-4 text-[12px]">
                    <span className="text-white/60">Time remaining</span>
                    <span className="ml-auto">6 days 9 hours remaining</span>
                  </div>
                  <div className="flex flex-row  mt-4 text-[12px]">
                    <span className="text-white/60">Total points</span>
                    <span className="ml-auto">100</span>
                  </div>
                  <div className="flex flex-row  mt-4 text-[12px]">
                    <span className="text-white/60">Required questions</span>
                    <span className="ml-auto">9/11</span>
                  </div>
                </CardContent>

                <CardFooter className="border-t border-white/5 px-6 py-4 flex-col gap-4">
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    onClick={() => {}}
                    className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
                  >
                    <LucideCircleCheckBig className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </Button>
                </CardFooter>
              </Card>
              <Card className="mb-5">
                <CardHeader className="border-b border-white/5 bg-white/5">
                  <CardTitle className="flex items-center gap-2">
                    Assignment Information
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6 flex-col gap-4">
                  <div className="flex-col mb-4">
                    <p className="text-white font-semibold">Instruction</p>
                    <p className="text-white/60 text-[12px] mt-1">
                      Complete all required questions in this assignment. You
                      can save your progress as a draft and return later to
                      complete it.
                    </p>
                  </div>
                  <div className="flex-col mb-4">
                    <p className="text-white font-semibold">
                      Submission Policy
                    </p>
                    <p className="text-white/60 text-[12px] mt-1">
                      Once submitted, you cannot make changes to your answers.
                      Make sure to review your work before submitting.
                    </p>
                  </div>
                  <div className="flex-col gap-4">
                    <p className="text-white font-semibold">Grading</p>
                    <p className="text-white/60 text-[12px] mt-1">
                      Your submission will be graded based on correctness,
                      completeness, and adherence to the requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="border-b border-white/5 bg-white/5">
                  <CardTitle className="flex items-center gap-2">
                    Need Help?
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6 flex-col gap-4">
                  <div className="flex-col mb-4">
                    <p className="text-white/60 text-[12px] mt-1">
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
                    className="bg-white/50"
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
