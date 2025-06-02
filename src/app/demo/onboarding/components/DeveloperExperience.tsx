"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Users,
  Database,
  Globe,
  Smartphone,
  CheckCircle,
  Star,
  Sparkles,
  TrendingUp,
  Gamepad2,
  Target,
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  FileQuestion,
  Shield,
  Coins,
  Clock,
  Heart,
} from "lucide-react";

interface DeveloperExperienceProps {
  onNext: (data: {
    devExperience: {
      type: string;
      years: number;
      technologies: string[];
    };
    experience: "beginner" | "intermediate" | "advanced";
    interests: string[];
    hesitations: string[];
  }) => void;
}

export default function DeveloperExperience({
  onNext,
}: DeveloperExperienceProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [years, setYears] = useState<number | null>(null);
  const [selectedYearsRange, setSelectedYearsRange] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<
    "beginner" | "intermediate" | "advanced" | ""
  >("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedHesitations, setSelectedHesitations] = useState<string[]>([]);
  const [showMoreInterests, setShowMoreInterests] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const devTypes = [
    {
      id: "fullstack",
      title: "Full Stack",
      subtitle: "Frontend + Backend",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      percentage: 35,
      trend: "Most Popular",
      description: "End-to-end development",
      stats: "35% of developers choose this path",
      encouragement: "Perfect! Full-stack devs are in high demand in Web3 🚀",
    },
    {
      id: "frontend",
      title: "Frontend",
      subtitle: "User Experience",
      icon: Smartphone,
      color: "from-purple-500 to-pink-500",
      percentage: 28,
      trend: "Growing Fast",
      description: "UI/UX focused development",
      stats: "28% of our community",
      encouragement: "Great choice! Web3 UIs need talented frontend devs ✨",
    },
    {
      id: "backend",
      title: "Backend",
      subtitle: "Server & APIs",
      icon: Database,
      color: "from-green-500 to-emerald-500",
      percentage: 22,
      trend: "High Demand",
      description: "Infrastructure & logic",
      stats: "22% prefer this path",
      encouragement: "Awesome! Blockchain backends are the future 🎯",
    },
    {
      id: "mobile",
      title: "Mobile",
      subtitle: "iOS & Android",
      icon: Smartphone,
      color: "from-orange-500 to-red-500",
      percentage: 15,
      trend: "Emerging",
      description: "Native & cross-platform",
      stats: "15% are mobile-focused",
      encouragement: "Exciting! Mobile Web3 is just getting started 📱",
    },
  ];
  // Experience levels data (from InterestsSelector)
  const experienceLevels = [
    {
      level: "beginner",
      title: "Just Getting Started",
      description: "New to crypto and Web3",
      icon: "🌱",
      color: "from-green-400 to-emerald-400",
    },
    {
      level: "intermediate",
      title: "Some Experience",
      description: "Used crypto, learning more",
      icon: "📚",
      color: "from-blue-400 to-cyan-400",
    },
    {
      level: "advanced",
      title: "Experienced User",
      description: "Active in Web3 ecosystem",
      icon: "🚀",
      color: "from-purple-400 to-pink-400",
    },
  ];

  // Interest categories data
  const interestCategories = [
    {
      title: "Development & Tech",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      interests: [
        {
          name: "Smart Contracts",
          icon: "⚡",
          description: "Build decentralized applications",
        },
        {
          name: "DeFi Protocols",
          icon: "🏦",
          description: "Decentralized finance systems",
        },
        {
          name: "Blockchain Development",
          icon: "🔗",
          description: "Core blockchain technology",
        },
        {
          name: "Web3 Integration",
          icon: "🌐",
          description: "Connect Web2 to Web3",
        },
      ],
    },
    {
      title: "Finance & Trading",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      interests: [
        {
          name: "Cryptocurrency Trading",
          icon: "📈",
          description: "Buy and sell digital assets",
        },
        {
          name: "Yield Farming",
          icon: "🌾",
          description: "Earn rewards on crypto",
        },
        {
          name: "Liquidity Pools",
          icon: "💧",
          description: "Provide liquidity for rewards",
        },
        {
          name: "Portfolio Management",
          icon: "📊",
          description: "Manage crypto investments",
        },
      ],
    },
    {
      title: "Gaming & Entertainment",
      icon: Gamepad2,
      color: "from-orange-500 to-red-500",
      interests: [
        {
          name: "Play-to-Earn Games",
          icon: "🎮",
          description: "Games that reward players",
        },
        {
          name: "Gaming NFTs",
          icon: "🏆",
          description: "In-game items and rewards",
        },
        {
          name: "Virtual Worlds",
          icon: "🌐",
          description: "Explore digital universes",
        },
        {
          name: "Game Development",
          icon: "🎯",
          description: "Create Web3 games",
        },
      ],
    },
    {
      title: "Community & Social",
      icon: Users,
      color: "from-violet-500 to-purple-500",
      interests: [
        {
          name: "DAOs",
          icon: "🏛️",
          description: "Decentralized organizations",
        },
        {
          name: "Social Tokens",
          icon: "🎭",
          description: "Community-driven tokens",
        },
        {
          name: "Governance",
          icon: "🗳️",
          description: "Participate in decisions",
        },
        {
          name: "Web3 Social",
          icon: "💬",
          description: "Decentralized social media",
        },
      ],
    },
  ];

  // Developer hesitations data
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

  const hesitationsData = [
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
      subtitle: "Price volatility",
      description: "Crypto prices are unstable",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      percentage: 29,
      trend: "Focus on Building",
      quickTip: "Building skills > watching prices! 🎯",
      solution: "Focus on development, not trading",
      encouragement:
        "29% worry about markets! Focus on building - that's where the value is 🔨",
    },
  ];
  const handleNext = () => {
    if (step === 4 && selectedInterests.length > 0) {
      // Advance to hesitations step
      setStep(5);
    } else if (
      step === 5 &&
      selectedType &&
      years !== null &&
      selectedExperience &&
      selectedInterests.length > 0
    ) {
      // Complete the onboarding
      onNext({
        devExperience: {
          type: selectedType,
          years: years,
          technologies: [],
        },
        experience: selectedExperience as
          | "beginner"
          | "intermediate"
          | "advanced",
        interests: selectedInterests,
        hesitations: selectedHesitations,
      });
    }
  };
  const getYearsMessage = (years: number | null) => {
    if (years === null) return "";
    if (years === 0) return "Perfect place to start! 🌱";
    if (years === 1) return "Perfect start! 🌱";
    if (years <= 3) return "Great experience level! 🚀";
    if (years <= 5) return "Solid foundation! 💪";
    if (years <= 10) return "Senior level expertise! 🎯";
    return "Wow, veteran status! 🏆";
  };
  const handleYearsSelect = (range: string, yearsValue: number) => {
    setSelectedYearsRange(range);
    setYears(yearsValue);
    // Auto-advance to next step
    setTimeout(() => setStep(3), 200);
  };
  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    // Auto-advance to next step
    setTimeout(() => setStep(2), 200);
  };
  const handleExperienceSelect = (
    experienceLevel: "beginner" | "intermediate" | "advanced"
  ) => {
    setSelectedExperience(experienceLevel);
    // Auto-advance to next step (interests)
    setTimeout(() => setStep(4), 200);
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };
  const toggleHesitation = (hesitation: string) => {
    setSelectedHesitations((prev) =>
      prev.includes(hesitation)
        ? prev.filter((h) => h !== hesitation)
        : [...prev, hesitation]
    );
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
          {/* Header */}
          <div className="text-center p-8 border-b border-white/10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25"
            >
              <Code className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Tell us about yourself
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Help us personalize your Web3 journey
            </p>{" "}
            {/* Progress Steps */}
            <div className="flex justify-center gap-2 mt-8">
              {[1, 2, 3, 4, 5].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`h-2 w-8 rounded-full transition-all duration-500 ${
                    stepNum <= step
                      ? "bg-gradient-to-r from-blue-500 to-purple-500"
                      : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Developer Type Selection */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      What type of developer are you?
                    </h3>
                    <p className="text-white/60">
                      Choose the path that best describes you
                    </p>
                  </div>{" "}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {devTypes.map((type, index) => (
                      <motion.div
                        key={type.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.4 }}
                      >
                        <Card
                          className={`group cursor-pointer transition-all duration-500 border-2 hover:scale-[1.02] ${
                            selectedType === type.id
                              ? "border-blue-500 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                              : "border-white/10 bg-white/[0.02] hover:border-white/30"
                          }`}
                          onClick={() => handleTypeSelect(type.id)}
                        >
                          <CardContent className="p-6 relative overflow-hidden">
                            {/* Background Glow Effect */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                            />

                            <div className="relative z-10">
                              <div className="flex items-center justify-between mb-4">
                                <div
                                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-lg`}
                                >
                                  <type.icon className="h-7 w-7 text-white" />
                                </div>

                                {/* Trending Badge */}
                                <Badge
                                  variant="secondary"
                                  className={`bg-gradient-to-r ${type.color} text-white border-0 opacity-80`}
                                >
                                  {type.trend}
                                </Badge>
                              </div>

                              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                                {type.title}
                              </h3>

                              <p className="text-white/80 font-medium mb-1">
                                {type.subtitle}
                              </p>

                              <p className="text-white/60 text-sm mb-4">
                                {type.description}
                              </p>

                              {/* Stats with animation */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white/70">
                                  <Users className="h-4 w-4" />
                                  <span className="text-sm">{type.stats}</span>
                                </div>

                                {selectedType === type.id && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex items-center gap-1 text-blue-400"
                                  >
                                    <CheckCircle className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                      Selected!
                                    </span>
                                  </motion.div>
                                )}
                              </div>

                              {/* Encouragement Message on Selection */}
                              <AnimatePresence>
                                {selectedType === type.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg"
                                  >
                                    <div className="flex items-center gap-2 text-blue-300">
                                      <Sparkles className="h-4 w-4" />
                                      <span className="font-medium text-sm">
                                        {type.encouragement}
                                      </span>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </CardContent>
                        </Card>{" "}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}{" "}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Years of Experience */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Years of experience?
                    </h3>
                    <p className="text-white/60">
                      This helps us tailor your learning path
                    </p>
                  </div>
                  <div className="max-w-2xl mx-auto space-y-6">
                    {" "}
                    {/* Experience Range Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          range: "0",
                          label: "Just Starting",
                          icon: "🌱",
                          description: "New to development",
                          yearsValue: 0,
                        },
                        {
                          range: "1-3",
                          label: "Learning",
                          icon: "📚",
                          description: "Building foundation",
                          yearsValue: 2,
                        },
                        {
                          range: "3-5",
                          label: "Growing",
                          icon: "🚀",
                          description: "Gaining confidence",
                          yearsValue: 4,
                        },
                        {
                          range: "5+",
                          label: "Experienced",
                          icon: "🎯",
                          description: "Ready for Web3",
                          yearsValue: 5,
                        },
                      ].map((exp, index) => (
                        <motion.div
                          key={exp.range}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.4 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all duration-300 border-2 hover:scale-[1.02] ${
                              selectedYearsRange === exp.range
                                ? "border-green-500 bg-gradient-to-br from-green-500/20 to-blue-500/20"
                                : "border-white/10 bg-white/[0.02] hover:border-white/30"
                            }`}
                            onClick={() =>
                              handleYearsSelect(exp.range, exp.yearsValue)
                            }
                          >
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl mb-2">{exp.icon}</div>
                              <h4 className="text-white font-bold text-sm mb-1">
                                {exp.label}
                              </h4>
                              <p className="text-white/60 text-xs mb-2">
                                {exp.description}
                              </p>
                              <Badge
                                variant="outline"
                                className="text-xs border-white/20 text-white/70"
                              >
                                {exp.range} years
                              </Badge>
                              {selectedYearsRange === exp.range && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="mt-2"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-400 mx-auto" />
                                </motion.div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>{" "}
                    {/* Experience Level Feedback */}
                    <AnimatePresence>
                      {years !== null && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl text-center"
                        >
                          <div className="flex items-center justify-center gap-2 text-green-300 mb-2">
                            <Star className="h-5 w-5" />
                            <span className="font-bold text-lg">
                              {getYearsMessage(years)}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm">
                            We&apos;ll customize your Web3 learning path for
                            your experience level
                          </p>
                        </motion.div>
                      )}{" "}
                    </AnimatePresence>{" "}
                    <div className="flex justify-center pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="border-white/20 text-white/80 hover:bg-white/10"
                      >
                        Back
                      </Button>
                    </div>
                  </div>{" "}
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Web3 Experience Level Selection */}
                  <div className="text-center mb-12">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <h2 className="text-4xl font-bold text-white mb-4">
                        What&apos;s Your Experience With Web3?
                      </h2>
                      <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
                        This helps us recommend the right content and
                        opportunities for you.
                      </p>
                    </motion.div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {experienceLevels.map((level, index) => (
                      <motion.div
                        key={level.level}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          handleExperienceSelect(
                            level.level as
                              | "beginner"
                              | "intermediate"
                              | "advanced"
                          )
                        }
                        className="cursor-pointer group"
                      >
                        <Card
                          className={`bg-white/[0.02] backdrop-blur-xl border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 h-full group-hover:shadow-xl group-hover:shadow-purple-500/10 ${
                            selectedExperience === level.level
                              ? "border-blue-500 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                              : ""
                          }`}
                        >
                          <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                            <div>
                              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {level.icon}
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-4">
                                {level.title}
                              </h3>
                              <p className="text-white/70 text-base mb-6 leading-relaxed">
                                {level.description}
                              </p>
                            </div>

                            <div className="space-y-3">
                              <div
                                className={`w-full h-3 bg-gradient-to-r ${level.color} rounded-full shadow-lg`}
                              />

                              {selectedExperience === level.level && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="flex items-center justify-center gap-1 text-blue-400"
                                >
                                  <CheckCircle className="h-5 w-5" />
                                  <span className="text-sm font-medium">
                                    Selected!
                                  </span>
                                </motion.div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>{" "}
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="border-white/20 text-white/80 hover:bg-white/10"
                    >
                      Back
                    </Button>
                  </div>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Interests Selection */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      What interests you most in Web3?
                    </h3>
                    <p className="text-white/60">
                      Select areas you&apos;d like to explore (choose at least
                      one)
                    </p>
                  </div>{" "}
                  <div className="space-y-6 max-w-4xl mx-auto">
                    {interestCategories
                      .slice(0, 3)
                      .map((category, categoryIndex) => (
                        <motion.div
                          key={category.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: categoryIndex * 0.1,
                            duration: 0.4,
                          }}
                          className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}
                            >
                              <category.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-white">
                                {category.title}
                              </h4>
                              <p className="text-white/60 text-sm">
                                {
                                  selectedInterests.filter((interest) =>
                                    category.interests.some(
                                      (catInterest) =>
                                        catInterest.name === interest
                                    )
                                  ).length
                                }{" "}
                                selected
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {category.interests.map((interest, index) => {
                              const isSelected = selectedInterests.includes(
                                interest.name
                              );

                              return (
                                <motion.div
                                  key={interest.name}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: index * 0.05,
                                    duration: 0.4,
                                  }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleInterest(interest.name)}
                                  className="cursor-pointer"
                                >
                                  <Card
                                    className={`transition-all duration-300 h-full ${
                                      isSelected
                                        ? "bg-white/[0.08] backdrop-blur-xl border-violet-500/40 shadow-lg shadow-violet-500/10 ring-1 ring-violet-500/20"
                                        : "bg-white/[0.03] backdrop-blur-xl border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                                    }`}
                                  >
                                    <CardContent className="p-4 h-full flex flex-col">
                                      <div className="flex items-start gap-3 flex-1">
                                        <div className="text-2xl flex-shrink-0 mt-1">
                                          {interest.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="text-white font-semibold text-sm mb-1 leading-tight">
                                            {interest.name}
                                          </h5>
                                          <p className="text-white/60 text-xs leading-relaxed">
                                            {interest.description}
                                          </p>
                                        </div>
                                      </div>

                                      {isSelected && (
                                        <motion.div
                                          initial={{ scale: 0, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 25,
                                          }}
                                          className="flex items-center justify-center mt-3 pt-3 border-t border-violet-500/20"
                                        >
                                          <div className="flex items-center gap-2 text-violet-300">
                                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center shadow-sm">
                                              <span className="text-xs font-bold text-white">
                                                ✓
                                              </span>
                                            </div>
                                            <span className="text-xs font-medium">
                                              Selected
                                            </span>
                                          </div>
                                        </motion.div>
                                      )}
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      ))}
                    {/* Show More Button */}
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        onClick={() => setShowMoreInterests(!showMoreInterests)}
                        className="border-white/20 text-white/80 hover:bg-white/10 flex items-center gap-2"
                      >
                        {showMoreInterests ? "Show Less" : "Show More"}
                        <motion.div
                          animate={{ rotate: showMoreInterests ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </div>
                    {/* Community & Social Category (expandable) */}
                    <AnimatePresence>
                      {showMoreInterests && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -20 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -20 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          {interestCategories
                            .slice(3)
                            .map((category, categoryIndex) => (
                              <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: categoryIndex * 0.1,
                                  duration: 0.4,
                                }}
                                className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                              >
                                <div className="flex items-center gap-3 mb-4">
                                  <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}
                                  >
                                    <category.icon className="h-6 w-6 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-bold text-white">
                                      {category.title}
                                    </h4>
                                    <p className="text-white/60 text-sm">
                                      {
                                        selectedInterests.filter((interest) =>
                                          category.interests.some(
                                            (catInterest) =>
                                              catInterest.name === interest
                                          )
                                        ).length
                                      }{" "}
                                      selected
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {category.interests.map((interest, index) => {
                                    const isSelected =
                                      selectedInterests.includes(interest.name);

                                    return (
                                      <motion.div
                                        key={interest.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                          delay: index * 0.05,
                                          duration: 0.4,
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() =>
                                          toggleInterest(interest.name)
                                        }
                                        className="cursor-pointer"
                                      >
                                        <Card
                                          className={`transition-all duration-300 h-full ${
                                            isSelected
                                              ? "bg-white/[0.08] backdrop-blur-xl border-violet-500/40 shadow-lg shadow-violet-500/10 ring-1 ring-violet-500/20"
                                              : "bg-white/[0.03] backdrop-blur-xl border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                                          }`}
                                        >
                                          <CardContent className="p-4 h-full flex flex-col">
                                            <div className="flex items-start gap-3 flex-1">
                                              <div className="text-2xl flex-shrink-0 mt-1">
                                                {interest.icon}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <h5 className="text-white font-semibold text-sm mb-1 leading-tight">
                                                  {interest.name}
                                                </h5>
                                                <p className="text-white/60 text-xs leading-relaxed">
                                                  {interest.description}
                                                </p>
                                              </div>
                                            </div>

                                            {isSelected && (
                                              <motion.div
                                                initial={{
                                                  scale: 0,
                                                  opacity: 0,
                                                }}
                                                animate={{
                                                  scale: 1,
                                                  opacity: 1,
                                                }}
                                                transition={{
                                                  type: "spring",
                                                  stiffness: 500,
                                                  damping: 25,
                                                }}
                                                className="flex items-center justify-center mt-3 pt-3 border-t border-violet-500/20"
                                              >
                                                <div className="flex items-center gap-2 text-violet-300">
                                                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center shadow-sm">
                                                    <span className="text-xs font-bold text-white">
                                                      ✓
                                                    </span>
                                                  </div>
                                                  <span className="text-xs font-medium">
                                                    Selected
                                                  </span>
                                                </div>
                                              </motion.div>
                                            )}
                                          </CardContent>
                                        </Card>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Continue Button */}
                    <div className="text-center bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                      {selectedInterests.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {selectedInterests.slice(0, 4).map((interest) => (
                              <Badge
                                key={interest}
                                className="bg-violet-500/20 text-violet-300 border-violet-500/30 px-3 py-1"
                              >
                                {interest}
                              </Badge>
                            ))}
                            {selectedInterests.length > 4 && (
                              <Badge className="bg-white/10 text-white/80 border-white/20 px-3 py-1">
                                +{selectedInterests.length - 4} more
                              </Badge>
                            )}
                          </div>{" "}
                          <Button
                            size="lg"
                            onClick={handleNext}
                            className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-xl shadow-purple-500/25 transition-all duration-300"
                          >
                            Continue to Next Step
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </Button>
                          <p className="text-white/60 text-sm">
                            Next: Address any concerns about Web3 development
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30">
                            <Target className="h-6 w-6 text-yellow-400" />
                          </div>
                          <h4 className="text-white font-semibold text-base">
                            Select Your Interests
                          </h4>
                          <p className="text-white/60 text-sm max-w-md mx-auto">
                            Choose at least one area that interests you to get
                            personalized recommendations
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep(3)}
                        className="border-white/20 text-white/80 hover:bg-white/10"
                      >
                        Back
                      </Button>
                    </div>{" "}
                  </div>
                </motion.div>
              )}{" "}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
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
                      What are your concerns about Web3?
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                      Be honest! Everyone has hesitations when starting Web3.
                      Select any that apply - we&apos;re here to help you
                      overcome them.
                    </p>
                  </div>

                  {/* Hesitations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {hesitationsData.map((hesitation, index) => (
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
                          const hesitation = hesitationsData.find(
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
                      🌟 Remember: Every expert was once a beginner. We&apos;re
                      here to support you every step of the way!
                    </p>
                  </motion.div>

                  {/* Back Button */}
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(4)}
                      className="border-white/20 text-white/80 hover:bg-white/10"
                    >
                      Back
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
