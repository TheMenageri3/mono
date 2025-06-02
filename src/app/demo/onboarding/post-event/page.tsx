"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Sparkles,
  CheckCircle,
  Calendar,
  Users,
  Heart,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  Award,
} from "lucide-react";
import Link from "next/link";
import EventRatingCard from "./components/EventRatingCard";
import FeedbackSummary from "./components/FeedbackSummary";
import PreferenceSelection from "./components/PreferenceSelection";
import LoadingScreen from "./components/LoadingScreen";
import PreRecordedClassesPage from "./components/PreRecordedClassesPage";
import IntroToSolanaPage from "./components/IntroToSolanaPage";
import LearningTimeline from "./components/LearningTimeline";
import Turbin3ClassesPage from "./components/Turbin3ClassesPage";
import PostEventChatBot from "./components/PostEventChatBot";

// Define the post-event steps
type PostEventStep =
  | "rating"
  | "feedback-summary"
  | "content-selection"
  | "learning-timeline"
  | "live-classes"
  | "turbin3-classes"
  | "pre-recorded-classes"
  | "next-steps"
  | "complete";

interface EventFeedback {
  eventRating: number | null;
  lostFeeling: number | null;
  benefitRating: number | null;
  communityVibeRating: number | null;
  additionalComments?: string;
  pathPreference?: "events" | "classes";
  selectedLearningType?: "live-classes" | "pre-recorded-classes";
}

export default function PostEventPage() {
  const [currentStep, setCurrentStep] = useState<PostEventStep>("rating");
  const [feedback, setFeedback] = useState<EventFeedback>({
    eventRating: null,
    lostFeeling: null,
    benefitRating: null,
    communityVibeRating: null,
  });
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Calculate progress based on current step
  useEffect(() => {
    const stepProgress = {
      rating: 20,
      "feedback-summary": 30, // Keep for type compatibility even though step is skipped
      "content-selection": 40,
      "learning-timeline": 60,
      "live-classes": 75,
      "turbin3-classes": 75,
      "pre-recorded-classes": 75,
      "next-steps": 90,
      complete: 100,
    };
    setProgress(stepProgress[currentStep]);
  }, [currentStep]); // Handle step transitions with loading states
  const handleNextStep = async (
    nextStep: PostEventStep,
    data?: Partial<EventFeedback>
  ) => {
    if (data) {
      setFeedback((prev) => ({ ...prev, ...data }));
    } // Skip loading for rating to content-selection and learning-timeline to class transitions
    const shouldSkipLoading =
      (currentStep === "rating" && nextStep === "content-selection") ||
      (currentStep === "learning-timeline" &&
        (nextStep === "live-classes" ||
          nextStep === "turbin3-classes" ||
          nextStep === "pre-recorded-classes"));
    if (!shouldSkipLoading) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 4500)); // 5 second loading animation
      setIsLoading(false);
    }

    setCurrentStep(nextStep);
  };
  const handleBack = () => {
    const getBackStep = (current: PostEventStep): PostEventStep | null => {
      switch (current) {
        case "content-selection":
          return "rating";
        case "learning-timeline":
          return "content-selection";
        case "live-classes":
        case "turbin3-classes":
          return "learning-timeline";
        case "pre-recorded-classes":
          // Pre-recorded classes came directly from content-selection
          return "content-selection";
        case "next-steps":
          // Return to the previous content page based on what was selected
          if (feedback.selectedLearningType === "live-classes") {
            return "live-classes";
          } else if (feedback.selectedLearningType === "pre-recorded-classes") {
            return "pre-recorded-classes";
          }
          return "learning-timeline";
        case "complete":
          return "next-steps";
        default:
          return null;
      }
    };

    const backStep = getBackStep(currentStep);
    if (backStep) {
      setCurrentStep(backStep);
    }
  };

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background gradient effect - same as onboarding */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[150px] animate-pulse-slower" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-medium" />
        <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.015] z-[-1]" />

      {/* Main content container */}
      <div className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {" "}
        {/* Header */}
        <motion.header
          className="p-6 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4">
            {currentStep !== "rating" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}

            <Link href="/" className="flex items-center gap-2">
              {/* Logo/Brand can go here */}
            </Link>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-sm font-medium">Progress</span>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                {" "}
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <span className="text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.header>
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {" "}
              {/* Loading State */}
              {isLoading && (
                <LoadingScreen
                  key="loading"
                  type={
                    currentStep === "content-selection"
                      ? "preference"
                      : "content"
                  }
                  onComplete={() => setIsLoading(false)}
                />
              )}{" "}
              {/* Rating Step */}
              {currentStep === "rating" && !isLoading && (
                <EventRatingCard
                  key="rating"
                  feedback={feedback}
                  onNext={(data) => handleNextStep("content-selection", data)}
                />
              )}{" "}
              {/* Feedback Summary Step */}
              {currentStep === "feedback-summary" && !isLoading && (
                <FeedbackSummary
                  key="feedback-summary"
                  feedback={feedback}
                  onNext={() => handleNextStep("content-selection")}
                />
              )}{" "}
              {/* Content Selection Step */}
              {currentStep === "content-selection" && !isLoading && (
                <PreferenceSelection
                  key="content-selection"
                  onNext={(preference) => {
                    const data = {
                      pathPreference: "classes" as const,
                      selectedLearningType: preference,
                    };
                    // Route pre-recorded classes directly, but live classes go to learning timeline
                    if (preference === "pre-recorded-classes") {
                      handleNextStep("pre-recorded-classes", data);
                    } else {
                      // live-classes goes to learning timeline first
                      handleNextStep("learning-timeline", data);
                    }
                  }}
                />
              )}{" "}
              {/* Learning Timeline Step */}
              {currentStep === "learning-timeline" && !isLoading && (
                <LearningTimeline
                  key="learning-timeline"
                  selectedPath={feedback.pathPreference || "classes"}
                  onBeginnerPathSelect={() => {
                    if (feedback.selectedLearningType === "live-classes") {
                      handleNextStep("live-classes");
                    } else {
                      handleNextStep("pre-recorded-classes");
                    }
                  }}
                  onAdvancedPathSelect={() => handleNextStep("turbin3-classes")}
                />
              )}{" "}
              {/* Introduction to Solana Page */}
              {currentStep === "live-classes" && !isLoading && (
                <IntroToSolanaPage
                  key="intro-to-solana"
                  onNext={() => setCurrentStep("learning-timeline")}
                />
              )}
              {/* Turbin3 Classes Page */}
              {currentStep === "turbin3-classes" && !isLoading && (
                <Turbin3ClassesPage
                  key="turbin3-classes"
                  onNext={() => handleNextStep("next-steps")}
                />
              )}
              {/* Pre-recorded Classes Page */}{" "}
              {/* Pre-recorded Classes Page */}
              {currentStep === "pre-recorded-classes" && !isLoading && (
                <PreRecordedClassesPage
                  key="pre-recorded-classes"
                  onNext={() => handleNextStep("next-steps")}
                />
              )}
              {/* Next Steps */}
              {currentStep === "next-steps" && !isLoading && (
                <motion.div
                  key="next-steps"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  {" "}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="mb-8"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-xl shadow-purple-500/30">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <TrendingUp className="h-12 w-12 text-white" />
                      </motion.div>
                    </div>{" "}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mb-12"
                  >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                        What&apos;s Next in Your
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                        Web3 Journey?
                      </span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                      Based on your feedback, here are some personalized next
                      steps to continue your growth in the Web3 ecosystem.
                    </p>
                  </motion.div>{" "}
                  {/* Action Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
                  >
                    <Link href="/demo/event" className="group">
                      {" "}
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.1 }}
                        className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300"
                      >
                        {" "}
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                          <Calendar className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          More Events
                        </h3>
                        <p className="text-white/70 mb-6 leading-relaxed">
                          Discover more Web3 events and continue building your
                          network and knowledge.
                        </p>
                        <div className="flex items-center justify-center text-violet-400 font-semibold">
                          <span>Explore Events</span>
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    </Link>

                    <Link href="/demo/classroom" className="group">
                      {" "}
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.1 }}
                        className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300"
                      >
                        {" "}
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                          <Award className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          Deep Dive Learning
                        </h3>
                        <p className="text-white/70 mb-6 leading-relaxed">
                          Take your knowledge to the next level with structured
                          courses and hands-on projects.
                        </p>
                        <div className="flex items-center justify-center text-emerald-400 font-semibold">
                          <span>Start Learning</span>
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                  <Button
                    size="lg"
                    onClick={() => handleNextStep("complete")}
                    className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white px-12 py-6 text-lg font-bold rounded-2xl shadow-xl shadow-purple-500/25"
                  >
                    Complete Feedback
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>
              )}
              {/* Complete Step */}
              {currentStep === "complete" && !isLoading && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  {" "}
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
                    className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-xl shadow-emerald-500/20"
                  >
                    <CheckCircle className="h-12 w-12 text-white" />
                  </motion.div>{" "}
                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mb-12"
                  >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        Thank You!
                      </span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-6">
                      Your feedback helps us create better events and
                      experiences for the entire Web3 community.
                    </p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto" />
                  </motion.div>{" "}
                  {/* Simple Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="flex justify-center gap-4"
                  >
                    {" "}
                    <Link
                      href="/demo/event"
                      className="text-white/60 hover:text-white/90 transition-colors text-sm flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-white/[0.02] border border-white/10"
                    >
                      <Calendar className="h-4 w-4" />
                      Find More Events
                    </Link>
                    <Link
                      href="/"
                      className="text-white/60 hover:text-white/90 transition-colors text-sm flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-white/[0.02] border border-white/10"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Return to Home
                    </Link>
                  </motion.div>
                </motion.div>
              )}{" "}
            </AnimatePresence>
          </div>
        </main>
        {/* Post-Event ChatBot */}
        <PostEventChatBot step={currentStep} />
      </div>
    </div>
  );
}
