"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  User,
  Sparkles,
  Code,
  Compass,
  Wallet,
  Chrome,
  MessageCircle,
  Calendar,
  GraduationCap,
  CheckCircle,
  Star,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

// Import components
import ChatBot from "./components/ChatBot";
import QuizCard from "./components/QuizCard";
import DeveloperExperience from "./components/DeveloperExperience";
import WalletSetupGuide from "./components/WalletSetupGuide";
import InterestsSelector from "./components/InterestsSelector";
import DeveloperHesitations from "./components/DeveloperHesitations";
import RecommendationCard from "./components/RecommendationCard";
import EventsOrClassesDecision from "./components/EventsOrClassesDecision";
import EventsResultsPage from "./components/EventsResultsPage";
import MatchingLoadingScreen from "./components/MatchingLoadingScreen";

// Define the onboarding steps
type OnboardingStep =
  | "welcome"
  | "quiz"
  | "developer-experience"
  | "wallet-setup"
  | "chrome-extension"
  | "interests"
  | "developer-hesitations"
  | "events-or-classes-decision"
  | "events-loading"
  | "recommendations"
  | "events-results"
  | "complete";

interface UserChoice {
  goal: "exploring" | "developer" | "entrepreneur" | null;
  experience?: "beginner" | "intermediate" | "advanced";
  devExperience?: {
    type: string;
    years: number;
    technologies: string[];
  };
  interests?: string[];
  hesitations?: string[];
  wantsEvents?: boolean;
  pathPreference?: "events" | "classes";
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [userChoice, setUserChoice] = useState<UserChoice>({ goal: null });
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Calculate progress based on current step
  useEffect(() => {
    const stepProgress = {
      welcome: 0,
      quiz: 10,
      "developer-experience": 20,
      "wallet-setup": 30,
      "chrome-extension": 40,
      interests: 50,
      "developer-hesitations": 65,
      "events-or-classes-decision": 75,
      "events-loading": 80,
      recommendations: 85,
      "events-results": 85,
      complete: 100,
    };
    setProgress(stepProgress[currentStep]);
  }, [currentStep]);

  // Handle step transitions with loading states
  const handleNextStep = async (
    nextStep: OnboardingStep,
    data?: Partial<UserChoice>
  ) => {
    if (data) {
      setUserChoice((prev) => ({ ...prev, ...data }));
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate processing
    setCurrentStep(nextStep);
    setIsLoading(false);
  };
  const handleBack = () => {
    // Define navigation paths for different user types
    const getBackStep = (
      current: OnboardingStep,
      userGoal: string | null
    ): OnboardingStep | null => {
      switch (current) {
        case "quiz":
          return "welcome";

        // Developer path
        case "developer-experience":
          return "quiz";
        case "developer-hesitations":
          return "interests";
        case "events-or-classes-decision":
          if (userGoal === "developer") {
            return "developer-hesitations";
          } else {
            return "interests";
          }

        case "events-loading":
          return "events-or-classes-decision";

        // Normal user/explorer path
        case "wallet-setup":
          return "quiz";
        case "chrome-extension":
          return "wallet-setup";

        // Shared paths
        case "interests":
          if (userGoal === "developer") {
            return "developer-experience";
          } else {
            return "quiz"; // For explorers and entrepreneurs
          }
        case "recommendations":
          return "events-or-classes-decision";
        case "events-results":
          return "events-loading";

        case "complete":
          return "recommendations";

        default:
          return null;
      }
    };

    const backStep = getBackStep(currentStep, userChoice.goal);
    if (backStep) {
      setCurrentStep(backStep);
    }
  };
  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background gradient effect - inspired by dashboard */}
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
        {/* Header */}
        <motion.header
          className="p-6 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            {currentStep !== "welcome" && (
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
              {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div> */}
              {/* <span className="text-xl font-bold text-white">Menageri3</span> */}
            </Link>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-sm font-medium">Progress</span>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
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
              {/* Welcome Step */}
              {currentStep === "welcome" && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-8"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-xl shadow-purple-500/30">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Sparkles className="h-12 w-12 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-12"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                        Welcome to
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                        Web3 Onboarding
                      </span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                      Let&apos;s get you started on your Web3 journey!
                      We&apos;ll guide you through setting up your wallet,
                      understanding the ecosystem, and finding opportunities
                      that match your interests.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        {
                          icon: Wallet,
                          title: "Setup Wallet",
                          desc: "Secure digital wallet",
                        },
                        {
                          icon: GraduationCap,
                          title: "Learn & Grow",
                          desc: "Educational resources",
                        },
                        {
                          icon: Compass,
                          title: "Explore Opportunities",
                          desc: "Find your path",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                          className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/[0.04] transition-colors duration-300"
                        >
                          <item.icon className="h-8 w-8 text-violet-400 mb-3 mx-auto" />
                          <h3 className="text-white font-semibold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-white/60 text-sm">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      size="lg"
                      onClick={() => handleNextStep("quiz")}
                      className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white px-12 py-6 text-lg font-bold rounded-2xl shadow-xl shadow-purple-500/25"
                    >
                      Let&apos;s Get Started!
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
              {/* Loading State */}
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-violet-500/20 border-t-violet-500"
                  />
                  <p className="text-white/70 text-lg">
                    Processing your response...
                  </p>
                </motion.div>
              )}{" "}
              {/* Quiz Step */}
              {currentStep === "quiz" && !isLoading && (
                <QuizCard
                  key="quiz"
                  onNext={(data) => {
                    if (data.goal === "exploring") {
                      handleNextStep("wallet-setup", data);
                    } else if (data.goal === "developer") {
                      handleNextStep("developer-experience", data);
                    } else {
                      handleNextStep("interests", data);
                    }
                  }}
                />
              )}{" "}
              {/* Developer Experience Step */}
              {currentStep === "developer-experience" && !isLoading && (
                <DeveloperExperience
                  key="developer-experience"
                  onNext={(data) => handleNextStep("interests", data)}
                />
              )}
              {/* Wallet Setup Step */}
              {currentStep === "wallet-setup" && !isLoading && (
                <WalletSetupGuide
                  key="wallet-setup"
                  onNext={() => handleNextStep("chrome-extension")}
                />
              )}{" "}
              {/* Chrome Extension Step */}
              {currentStep === "chrome-extension" && !isLoading && (
                <motion.div
                  key="chrome-extension"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-3xl mx-auto relative"
                >
                  <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10">
                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <Chrome className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                        <h2 className="text-3xl font-bold text-white mb-4">
                          Install Browser Extension
                        </h2>
                        <p className="text-white/70 text-lg">
                          Enhance your Web3 experience with our browser
                          extension for seamless wallet integration.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white/[0.02] rounded-xl p-6 border border-white/10">
                            <h3 className="text-white font-semibold mb-3">
                              ✅ Secure Wallet Connection
                            </h3>
                            <p className="text-white/60 text-sm">
                              Connect safely to dApps with enhanced security
                            </p>
                          </div>
                          <div className="bg-white/[0.02] rounded-xl p-6 border border-white/10">
                            <h3 className="text-white font-semibold mb-3">
                              ⚡ One-Click Transactions
                            </h3>
                            <p className="text-white/60 text-sm">
                              Streamlined transaction signing experience
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center gap-4">
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white"
                          >
                            <Chrome className="h-5 w-5 mr-2" />
                            Install Extension
                          </Button>
                          <Button
                            size="lg"
                            variant="outline"
                            onClick={() => handleNextStep("complete")}
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            Skip for Now
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </Button>{" "}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}{" "}
              {/* Interests Step */}
              {currentStep === "interests" && !isLoading && (
                <InterestsSelector
                  key="interests"
                  userChoice={userChoice}
                  onNext={(data) => {
                    if (userChoice.goal === "developer") {
                      handleNextStep("developer-hesitations", data);
                    } else {
                      handleNextStep("events-or-classes-decision", data);
                    }
                  }}
                />
              )}
              {/* Developer Hesitations Step */}
              {currentStep === "developer-hesitations" && !isLoading && (
                <DeveloperHesitations
                  key="developer-hesitations"
                  onNext={(data) =>
                    handleNextStep("events-or-classes-decision", data)
                  }
                />
              )}{" "}
              {/* Events or Classes Decision Step */}
              {currentStep === "events-or-classes-decision" && !isLoading && (
                <EventsOrClassesDecision
                  key="events-or-classes-decision"
                  onNext={(choice) => {
                    const data = { pathPreference: choice };
                    if (choice === "events") {
                      handleNextStep("events-loading", data);
                    } else {
                      handleNextStep("recommendations", data);
                    }
                  }}
                />
              )}
              {/* Events Loading Step */}
              {currentStep === "events-loading" && !isLoading && (
                <MatchingLoadingScreen
                  key="events-loading"
                  onComplete={() => handleNextStep("events-results")}
                />
              )}
              {/* Events Results Step */}
              {currentStep === "events-results" && !isLoading && (
                <EventsResultsPage
                  key="events-results"
                  userChoice={userChoice}
                  onNext={() => handleNextStep("complete")}
                />
              )}
              {/* Recommendations Step */}
              {currentStep === "recommendations" && !isLoading && (
                <RecommendationCard
                  key="recommendations"
                  userChoice={userChoice}
                  onNext={() => handleNextStep("complete")}
                />
              )}{" "}
              {/* Complete Step */}
              {currentStep === "complete" && !isLoading && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                    className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-xl shadow-emerald-500/20"
                  >
                    <CheckCircle className="h-12 w-12 text-white" />
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-12"
                  >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        You&apos;re All Set!
                      </span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-6">
                      Perfect! You&apos;ve completed your Web3 onboarding
                      journey. Now let&apos;s explore what awaits you.
                    </p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto" />
                  </motion.div>

                  {/* Action Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
                  >
                    {/* Events Card */}
                    <Link href="/demo/event" className="group">
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300"
                      >
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                          <Calendar className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          Explore Events
                        </h3>
                        <p className="text-white/70 mb-6 leading-relaxed">
                          Discover Web3 events, workshops, and networking
                          opportunities curated for your interests and
                          experience level.
                        </p>
                        <div className="flex items-center justify-center text-violet-400 font-semibold">
                          <span>Start Exploring</span>
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    </Link>

                    {/* Classroom Card */}
                    <Link href="/demo/classroom" className="group">
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300"
                      >
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                          <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          Enter Classroom
                        </h3>
                        <p className="text-white/70 mb-6 leading-relaxed">
                          Access comprehensive learning materials and expert-led
                          courses designed specifically for your Web3 journey.
                        </p>
                        <div className="flex items-center justify-center text-emerald-400 font-semibold">
                          <span>Begin Learning</span>
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>

                  {/* Simple Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex justify-center"
                  >
                    <Link
                      href="/"
                      className="text-white/60 hover:text-white/90 transition-colors text-sm flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/[0.02]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Return to Home
                    </Link>
                  </motion.div>
                </motion.div>
              )}{" "}
            </AnimatePresence>
          </div>
        </main>{" "}
        {/* Global ChatBot - Always mounted for smooth transitions */}
        <ChatBot step={currentStep} />
      </div>
    </div>
  );
}
//stuff to change, rewamp the just exploring section, the bg is fucked, so fix that, the chat bot needs to have more options, the wallet setup is doing too much
