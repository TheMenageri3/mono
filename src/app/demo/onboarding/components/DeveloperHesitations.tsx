"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  FileQuestion,
  Shield,
  Coins,
  Clock,
  Heart,
  CheckCircle,
  Users,
  BookOpen,
  Zap,
  Target,
  Lightbulb,
  TrendingUp,
  Star,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface DeveloperHesitationsProps {
  onNext: (data: { hesitations: string[] }) => void;
}

export default function DeveloperHesitations({
  onNext,
}: DeveloperHesitationsProps) {
  const [selectedHesitations, setSelectedHesitations] = useState<string[]>([]);
  const [step, setStep] = useState<number>(1);
  const hesitations = [
    {
      id: "documentation",
      title: "Documentation Issues",
      subtitle: "Confusing guides",
      description: "Web3 docs are hard to understand",
      icon: FileQuestion,
      color: "from-red-500 to-orange-500",
      percentage: 67,
      trend: "Common Issue",
      quickTip: "We provide clear, step-by-step guides! 📚",
      solution: "Interactive tutorials with real examples",
      encouragement:
        "You're not alone - 67% face this! We've got better docs ✨",
    },
    {
      id: "scam-fear",
      title: "Security Concerns",
      subtitle: "Fear of scams",
      description: "Worried about losing money",
      icon: Shield,
      color: "from-orange-500 to-red-500",
      percentage: 89,
      trend: "Top Concern",
      quickTip: "Security-first approach always! 🛡️",
      solution: "Built-in safety training and secure practices",
      encouragement:
        "89% worry about this! Our safety training has you covered 🔒",
    },
    {
      id: "complexity",
      title: "Learning Curve",
      subtitle: "Seems complex",
      description: "Web3 feels overwhelming",
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500",
      percentage: 54,
      trend: "Solvable",
      quickTip: "We break it down into simple steps! 🧩",
      solution: "Gradual learning path from basics to advanced",
      encouragement:
        "54% felt this way at first! It gets easier, we promise 🚀",
    },
    {
      id: "gas-fees",
      title: "Transaction Costs",
      subtitle: "High fees",
      description: "Gas fees seem expensive",
      icon: Coins,
      color: "from-green-500 to-emerald-500",
      percentage: 43,
      trend: "Has Solutions",
      quickTip: "Layer 2 solutions are much cheaper! ⚡",
      solution: "Learn cost optimization and L2 alternatives",
      encouragement:
        "43% worry about fees! We'll teach you optimization tricks 💡",
    },
    {
      id: "time-investment",
      title: "Time Constraints",
      subtitle: "Busy schedule",
      description: "Don't have enough time",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      percentage: 38,
      trend: "Flexible",
      quickTip: "15 minutes a day is enough! ⏰",
      solution: "Bite-sized lessons that fit your schedule",
      encouragement:
        "38% are busy too! Our flexible path works around your schedule 📈",
    },
    {
      id: "market-volatility",
      title: "Market Stability",
      subtitle: "Price swings",
      description: "Crypto market volatility",
      icon: Target,
      color: "from-purple-500 to-violet-500",
      percentage: 29,
      trend: "Focus on Building",
      quickTip: "Building skills > watching prices! 🎯",
      solution: "Focus on development, not trading",
      encouragement:
        "29% worry about markets! Focus on building - that's where the value is 🔨",
    },
  ];
  const toggleHesitation = (hesitationId: string) => {
    setSelectedHesitations((prev) =>
      prev.includes(hesitationId)
        ? prev.filter((h) => h !== hesitationId)
        : [...prev, hesitationId]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onNext({ hesitations: selectedHesitations });
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "What are your concerns about Web3?";
      case 2:
        return "Your personalized learning path";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Be honest! Everyone has hesitations when starting Web3. Select any that apply - we're here to help you overcome them.";
      case 2:
        return "Based on your concerns, we've created a customized learning journey just for you. Let's address each worry step by step.";
      default:
        return "";
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto"
    >
      <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 overflow-hidden">
        <CardContent className="p-0">
          {/* Progress Bar */}{" "}
          <div className="bg-white/[0.02] border-b border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">
                Concerns Assessment
              </h1>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>Step {step} of 2</span>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: step === 1 ? "50%" : "100%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/25"
              >
                <Heart className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {getStepTitle()}
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                {getStepDescription()}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Hesitations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {hesitations.map((hesitation, index) => (
                      <motion.div
                        key={hesitation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.4 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 border-2 hover:scale-[1.02] ${
                            selectedHesitations.includes(hesitation.id)
                              ? "border-orange-500 bg-gradient-to-br from-orange-500/20 to-red-500/20 shadow-lg shadow-orange-500/25"
                              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                          onClick={() => toggleHesitation(hesitation.id)}
                        >
                          <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hesitation.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                              >
                                <hesitation.icon className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-white font-semibold text-sm">
                                    {hesitation.title}
                                  </h3>
                                  {selectedHesitations.includes(
                                    hesitation.id
                                  ) && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 500,
                                      }}
                                    >
                                      <CheckCircle className="h-4 w-4 text-orange-400" />
                                    </motion.div>
                                  )}
                                </div>
                                <p className="text-white/60 text-xs mb-3">
                                  {hesitation.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <Badge
                                    variant="secondary"
                                    className="bg-white/10 text-white/80 text-xs"
                                  >
                                    <Users className="h-3 w-3 mr-1" />
                                    {hesitation.percentage}%
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs border-white/20 ${
                                      hesitation.trend === "Top Concern"
                                        ? "text-red-400"
                                        : hesitation.trend === "Common Issue"
                                        ? "text-orange-400"
                                        : "text-green-400"
                                    }`}
                                  >
                                    {hesitation.trend}
                                  </Badge>{" "}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Selected Summary */}
                  {selectedHesitations.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Target className="h-5 w-5 text-blue-400" />
                        <h4 className="text-white font-semibold">
                          We'll help you tackle:
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedHesitations.map((hesitationId) => {
                          const hesitation = hesitations.find(
                            (h) => h.id === hesitationId
                          );
                          return hesitation ? (
                            <Badge
                              key={hesitationId}
                              variant="secondary"
                              className="bg-blue-500/20 text-blue-200 border border-blue-500/30"
                            >
                              {hesitation.title}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                      <p className="text-white/60 text-sm">
                        Our learning path will specifically address these
                        concerns with tailored content and support.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Learning Path Preview */}
                  <div className="space-y-4 mb-8">
                    {selectedHesitations.length > 0 ? (
                      selectedHesitations.map((hesitationId, index) => {
                        const hesitation = hesitations.find(
                          (h) => h.id === hesitationId
                        );
                        if (!hesitation) return null;

                        return (
                          <motion.div
                            key={hesitationId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="bg-gradient-to-r from-white/[0.05] to-white/[0.02] border-white/10">
                              <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                  <div className="flex flex-col items-center">
                                    <div
                                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hesitation.color} flex items-center justify-center shadow-lg`}
                                    >
                                      <hesitation.icon className="h-6 w-6 text-white" />
                                    </div>
                                    {index < selectedHesitations.length - 1 && (
                                      <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent mt-4" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="text-white font-bold">
                                        {hesitation.title}
                                      </h3>
                                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                        Solution Ready
                                      </Badge>
                                    </div>
                                    <p className="text-white/70 mb-3">
                                      {hesitation.solution}
                                    </p>
                                    <div className="flex items-center gap-2 text-blue-300">
                                      <TrendingUp className="h-4 w-4" />
                                      <span className="font-medium text-sm">
                                        {hesitation.quickTip}
                                      </span>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-5 w-5 text-white/40" />
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
                          <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
                              <Star className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">
                              Confident Start! 🌟
                            </h3>
                            <p className="text-white/70">
                              Great! You're ready to dive into Web3 development.
                              We'll provide you with our comprehensive standard
                              learning path.
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex justify-between items-center pt-6"
            >
              {step > 1 ? (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              <Button
                onClick={handleNext}
                size="lg"
                className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-500 hover:via-red-500 hover:to-pink-500 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-xl shadow-orange-500/25"
              >
                {step === 1
                  ? selectedHesitations.length > 0
                    ? `Review Solutions (${selectedHesitations.length})`
                    : "Continue (No concerns)"
                  : "Start Learning Journey"}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>

            {/* Encouraging Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg"
            >
              <p className="text-white/80 font-medium">
                🌟 Remember: Every expert was once a beginner. We're here to
                support you every step of the way!
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
