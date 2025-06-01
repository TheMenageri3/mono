"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  AlertTriangle,
  FileQuestion,
  Shield,
  Coins,
  Clock,
  Heart,
  CheckCircle,
  Target,
} from "lucide-react";

interface DeveloperHesitationsProps {
  onNext: (data: { hesitations: string[] }) => void;
}

export default function DeveloperHesitations({
  onNext,
}: DeveloperHesitationsProps) {
  const [selectedHesitations, setSelectedHesitations] = useState<string[]>([]);
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
    onNext({ hesitations: selectedHesitations });
  };

  const getStepTitle = () => {
    return "What are your concerns about Web3?";
  };
  const getStepDescription = () => {
    return "Be honest! Everyone has hesitations when starting Web3. Select any that apply - we're here to help you overcome them.";
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
            </div>{" "}
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
                    className={`cursor-pointer transition-all duration-300 border hover:scale-[1.02] h-full ${
                      selectedHesitations.includes(hesitation.id)
                        ? "border-orange-500 bg-gradient-to-br from-orange-500/20 to-red-500/20 shadow-lg shadow-orange-500/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                    onClick={() => toggleHesitation(hesitation.id)}
                  >
                    <CardContent className="p-5 h-full flex flex-col">
                      <div className="flex flex-col h-full">
                        {/* Top Section with Icon and Title */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hesitation.color} flex items-center justify-center shadow-lg`}
                            >
                              <hesitation.icon className="h-6 w-6 text-white" />
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-white font-semibold text-sm">
                                {hesitation.title}
                              </h3>
                              {selectedHesitations.includes(hesitation.id) && (
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
                            <span className="text-white/70 text-xs font-medium block">
                              {hesitation.subtitle}
                            </span>
                          </div>
                        </div>
                        {/* Trend Badge */}
                        <div className="mt-auto">
                          <div
                            className={`w-full h-6 rounded-md flex items-center justify-center text-xs font-medium ${
                              hesitation.trend === "Top Concern"
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : hesitation.trend === "Common Issue"
                                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                : hesitation.trend === "Has Solutions"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                : hesitation.trend === "Flexible"
                                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                                : hesitation.trend === "Focus on Building"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : "bg-green-500/20 text-green-300 border border-green-500/30"
                            }`}
                          >
                            {hesitation.trend}
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
                    We&apos;ll help you tackle:
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
                  Our learning path will specifically address these concerns
                  with tailored content and support.
                </p>
              </motion.div>
            )}{" "}
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex justify-end items-center pt-6"
            >
              <Button
                onClick={handleNext}
                size="lg"
                className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-500 hover:via-red-500 hover:to-pink-500 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-xl shadow-orange-500/25"
              >
                {selectedHesitations.length > 0
                  ? `Continue (${selectedHesitations.length} selected)`
                  : "Continue (No concerns)"}
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
                🌟 Remember: Every expert was once a beginner. We&apos;re here
                to support you every step of the way!
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
