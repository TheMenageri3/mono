"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Code,
  Palette,
  TrendingUp,
  Gamepad2,
  Music,
  Camera,
  Coins,
  Users,
  ShoppingBag,
  Globe,
  Zap,
  Heart,
  BookOpen,
  Target,
  Sparkles,
  Plus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
interface InterestsSelectorProps {
  userChoice: {
    goal: "exploring" | "developer" | "entrepreneur" | null;
    experience?: "beginner" | "intermediate" | "advanced";
    interests?: string[];
  };
  onNext: (data: {
    interests: string[];
    experience: "beginner" | "intermediate" | "advanced";
  }) => void;
}

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
    title: "Creative & Digital Art",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    interests: [
      {
        name: "NFT Art",
        icon: "🎨",
        description: "Digital collectibles and art",
      },
      {
        name: "Generative Art",
        icon: "🤖",
        description: "AI-generated artwork",
      },
      {
        name: "Digital Collectibles",
        icon: "💎",
        description: "Rare digital items",
      },
      {
        name: "Metaverse Assets",
        icon: "🌍",
        description: "Virtual world items",
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
      { name: "DAOs", icon: "🏛️", description: "Decentralized organizations" },
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
  {
    title: "Business & Entrepreneurship",
    icon: ShoppingBag,
    color: "from-indigo-500 to-blue-500",
    interests: [
      {
        name: "Web3 Startups",
        icon: "🚀",
        description: "Build decentralized businesses",
      },
      {
        name: "Token Economics",
        icon: "⚖️",
        description: "Design token systems",
      },
      { name: "DeFi Products", icon: "🏢", description: "Financial products" },
      {
        name: "NFT Marketplaces",
        icon: "🛒",
        description: "Digital asset platforms",
      },
    ],
  },
];

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

export default function InterestsSelector({
  userChoice,
  onNext,
}: InterestsSelectorProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<
    "beginner" | "intermediate" | "advanced" | ""
  >("");
  const [currentStep, setCurrentStep] = useState<"experience" | "interests">(
    "experience"
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleCategoryExpansion = (categoryTitle: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryTitle)) {
        newSet.delete(categoryTitle);
      } else {
        newSet.add(categoryTitle);
      }
      return newSet;
    });
  };
  const getVisibleInterests = (category: (typeof interestCategories)[0]) => {
    const isExpanded = expandedCategories.has(category.title);
    return isExpanded ? category.interests : category.interests.slice(0, 3);
  };

  const getVisibleCategories = () => {
    return showAllCategories
      ? interestCategories
      : interestCategories.slice(0, 4);
  };

  const handleExperienceSelect = (
    experience: "beginner" | "intermediate" | "advanced"
  ) => {
    setSelectedExperience(experience);
    setCurrentStep("interests");
  };
  const handleNext = () => {
    if (selectedInterests.length > 0 && selectedExperience) {
      onNext({
        interests: selectedInterests,
        experience: selectedExperience as
          | "beginner"
          | "intermediate"
          | "advanced",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      {/* Experience Level Selection */}
      {currentStep === "experience" && (
        <motion.div
          key="experience"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {" "}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-xl shadow-purple-500/30"
            >
              <Target className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-4">
              What&apos;s Your Experience With Web3?
            </h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
              This helps us recommend the right content and opportunities for
              you.
            </p>
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
                    level.level as "beginner" | "intermediate" | "advanced"
                  )
                }
                className="cursor-pointer group"
              >
                <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 h-full group-hover:shadow-xl group-hover:shadow-purple-500/10">
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
                      <div className="text-white/60 text-sm font-medium">
                        Click to select
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      {/* Interests Selection */}
      {currentStep === "interests" && (
        <motion.div
          key="interests"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {" "}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep("experience")}
                className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                ← Change Experience Level
              </Button>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1">
                {selectedExperience} level
              </Badge>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-xl shadow-purple-500/30"
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-4">
              What Interests You Most?
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
              Select the areas you&apos;d like to explore. We&apos;ll
              personalize your experience based on your choices.
            </p>
            {selectedInterests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-6"
              >
                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 px-4 py-2 text-base">
                  {selectedInterests.length} interest
                  {selectedInterests.length !== 1 ? "s" : ""} selected
                </Badge>
              </motion.div>
            )}{" "}
          </div>
          <div className="space-y-8 mb-8">
            {getVisibleCategories().map((category, categoryIndex) => {
              const visibleInterests = getVisibleInterests(category);
              const hasMore = category.interests.length > 3;
              const isExpanded = expandedCategories.has(category.title);

              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                  className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}
                      >
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {category.title}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {
                            selectedInterests.filter((interest) =>
                              category.interests.some(
                                (catInterest) => catInterest.name === interest
                              )
                            ).length
                          }{" "}
                          selected
                        </p>
                      </div>
                    </div>

                    {hasMore && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCategoryExpansion(category.title)}
                        className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                      >
                        {isExpanded
                          ? "Show Less"
                          : `+${category.interests.length - 3} More`}
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {visibleInterests.map((interest, index) => {
                      const isSelected = selectedInterests.includes(
                        interest.name
                      );

                      return (
                        <motion.div
                          key={interest.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleInterest(interest.name)}
                          className="cursor-pointer"
                        >
                          {" "}
                          <Card
                            className={`transition-all duration-300 h-full ${
                              isSelected
                                ? "bg-white/[0.08] backdrop-blur-xl border-violet-500/40 shadow-lg shadow-violet-500/10 ring-1 ring-violet-500/20"
                                : "bg-white/[0.03] backdrop-blur-xl border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                            }`}
                          >
                            <CardContent className="p-5 h-full flex flex-col">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="text-3xl flex-shrink-0 mt-1">
                                  {interest.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-white font-semibold text-base mb-2 leading-tight">
                                    {interest.name}
                                  </h4>
                                  <p className="text-white/60 text-sm leading-relaxed">
                                    {interest.description}
                                  </p>
                                </div>
                              </div>{" "}
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 25,
                                  }}
                                  className="flex items-center justify-center mt-4 pt-3 border-t border-violet-500/20"
                                >
                                  <div className="flex items-center gap-2 text-violet-300">
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center shadow-sm">
                                      <span className="text-xs font-bold text-white">
                                        ✓
                                      </span>
                                    </div>
                                    <span className="text-sm font-medium">
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
                  </div>{" "}
                </motion.div>
              );
            })}

            {/* Show More Categories Button */}
            {!showAllCategories && interestCategories.length > 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-center"
              >
                <Button
                  variant="outline"
                  onClick={() => setShowAllCategories(true)}
                  className="bg-white/[0.03] backdrop-blur-xl border-white/20 text-white/80 hover:bg-white/[0.08] hover:border-white/30 hover:text-white px-8 py-4 text-base font-medium rounded-xl transition-all duration-300"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Show {interestCategories.length - 4} More Categories
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Show Less Categories Button */}
            {showAllCategories && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <Button
                  variant="outline"
                  onClick={() => setShowAllCategories(false)}
                  className="bg-white/[0.03] backdrop-blur-xl border-white/20 text-white/80 hover:bg-white/[0.08] hover:border-white/30 hover:text-white px-8 py-4 text-base font-medium rounded-xl transition-all duration-300"
                >
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less Categories
                </Button>
              </motion.div>
            )}
          </div>{" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10"
          >
            {selectedInterests.length > 0 ? (
              <div className="space-y-4">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {selectedInterests.slice(0, 6).map((interest) => (
                    <Badge
                      key={interest}
                      className="bg-violet-500/20 text-violet-300 border-violet-500/30 px-3 py-1"
                    >
                      {interest}
                    </Badge>
                  ))}
                  {selectedInterests.length > 6 && (
                    <Badge className="bg-white/10 text-white/80 border-white/20 px-3 py-1">
                      +{selectedInterests.length - 6} more
                    </Badge>
                  )}
                </div>

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white px-12 py-6 text-lg font-bold rounded-xl shadow-xl shadow-purple-500/25 transition-all duration-300"
                >
                  Continue with {selectedInterests.length} interest
                  {selectedInterests.length !== 1 ? "s" : ""}
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Button>

                <p className="text-white/60 text-sm">
                  Perfect! We&apos;ll customize your experience based on these
                  interests
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30">
                  <Target className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-white font-semibold text-lg">
                  Select Your Interests
                </h3>
                <p className="text-white/60 text-sm max-w-md mx-auto">
                  Choose at least one area that interests you to get
                  personalized recommendations
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
      {/* Chat Bot */}{" "}
    </motion.div>
  );
}
