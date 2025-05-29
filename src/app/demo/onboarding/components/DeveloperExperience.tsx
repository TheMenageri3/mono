"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Code,
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Database,
  Globe,
  Smartphone,
  Cloud,
  Cpu,
  CheckCircle,
  Star,
  Sparkles,
  Trophy,
  Target,
} from "lucide-react";

interface DeveloperExperienceProps {
  onNext: (data: {
    devExperience: {
      type: string;
      years: number;
      technologies: string[];
    };
  }) => void;
}

export default function DeveloperExperience({
  onNext,
}: DeveloperExperienceProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [years, setYears] = useState<number | null>(null);
  const [selectedYearsRange, setSelectedYearsRange] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
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

  const topTechnologies = [
    { name: "JavaScript", popularity: 95, category: "Essential" },
    { name: "TypeScript", popularity: 88, category: "Trending" },
    { name: "React", popularity: 82, category: "Popular" },
    { name: "Node.js", popularity: 78, category: "Backend" },
    { name: "Python", popularity: 75, category: "Versatile" },
    { name: "Solidity", popularity: 45, category: "Web3" },
    { name: "Rust", popularity: 38, category: "Performance" },
    { name: "Go", popularity: 32, category: "Scalable" },
  ];
  const handleNext = () => {
    if (selectedType && years !== null) {
      onNext({
        devExperience: {
          type: selectedType,
          years: years,
          technologies: selectedTech,
        },
      });
    }
  };

  const toggleTechnology = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
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
  };
  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
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
            </p>

            {/* Progress Steps */}
            <div className="flex justify-center gap-2 mt-8">
              {[1, 2, 3].map((stepNum) => (
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
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  {/* Continue Button */}
                  <div className="flex justify-center mt-8">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!selectedType}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed px-8"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
                            We'll customize your Web3 learning path for your
                            experience level
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex gap-3 justify-center pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="border-white/20 text-white/80 hover:bg-white/10"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        disabled={years === null}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed px-8"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}{" "}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Technologies */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      What technologies do you use?
                    </h3>
                    <p className="text-white/60">
                      Pick your favorites (optional)
                    </p>
                  </div>{" "}
                  <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {topTechnologies.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * index, duration: 0.3 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all duration-300 border-2 hover:scale-[1.02] group ${
                              selectedTech.includes(tech.name)
                                ? "border-purple-500 bg-gradient-to-br from-purple-500/20 to-blue-500/20 shadow-lg shadow-purple-500/25"
                                : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]"
                            }`}
                            onClick={() => toggleTechnology(tech.name)}
                          >
                            <CardContent className="p-5 text-center relative overflow-hidden">
                              {/* Background glow effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                              <div className="relative z-10">
                                {/* Header with selection indicator */}
                                <div className="flex items-center justify-center gap-2 mb-3">
                                  {selectedTech.includes(tech.name) && (
                                    <motion.div
                                      initial={{ scale: 0, rotate: -180 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 300,
                                      }}
                                    >
                                      <CheckCircle className="h-5 w-5 text-purple-400" />
                                    </motion.div>
                                  )}
                                  <span className="text-white font-bold text-base group-hover:text-purple-200 transition-colors">
                                    {tech.name}
                                  </span>
                                </div>

                                {/* Category badge */}
                                <Badge
                                  variant="outline"
                                  className={`text-xs mb-3 transition-all duration-300 ${
                                    selectedTech.includes(tech.name)
                                      ? "border-purple-400/50 text-purple-300 bg-purple-500/10"
                                      : "border-white/20 text-white/70 group-hover:border-white/40"
                                  }`}
                                >
                                  {tech.category}
                                </Badge>

                                {/* Popularity indicator with improved styling */}
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="text-white/60">
                                      Popularity
                                    </span>
                                    <span className="text-white/80 font-medium">
                                      {tech.popularity}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${tech.popularity}%` }}
                                      transition={{
                                        delay: 0.1 * index + 0.3,
                                        duration: 0.8,
                                        ease: "easeOut",
                                      }}
                                      className={`h-2 rounded-full transition-all duration-500 ${
                                        selectedTech.includes(tech.name)
                                          ? "bg-gradient-to-r from-purple-500 to-blue-500"
                                          : "bg-gradient-to-r from-white/30 to-white/20 group-hover:from-purple-500/50 group-hover:to-blue-500/50"
                                      }`}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Selection overlay */}
                              {selectedTech.includes(tech.name) && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="absolute inset-0 border-2 border-purple-500/50 rounded-lg pointer-events-none"
                                />
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>{" "}
                    {/* Selection Summary */}
                    <AnimatePresence>
                      {selectedTech.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="p-6 bg-gradient-to-r from-purple-500/15 to-blue-500/15 border border-purple-500/30 rounded-xl text-center mb-6 backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-center gap-2 text-purple-300 mb-3">
                            <Zap className="h-6 w-6" />
                            <span className="font-bold text-lg">
                              {selectedTech.length}{" "}
                              {selectedTech.length === 1
                                ? "technology"
                                : "technologies"}{" "}
                              selected!
                            </span>
                          </div>
                          <p className="text-white/80 text-sm mb-2">
                            Great stack! We'll show you how these integrate with
                            Web3
                          </p>
                          <div className="flex flex-wrap justify-center gap-2 mt-3">
                            {selectedTech.map((tech) => (
                              <Badge
                                key={tech}
                                className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="border-white/20 text-white/80 hover:bg-white/10"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:via-purple-500 hover:to-indigo-500 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-xl shadow-blue-500/25"
                      >
                        Complete Setup
                        <Target className="ml-3 h-6 w-6" />
                      </Button>
                    </div>
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
