"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  Code,
  Briefcase,
  ArrowRight,
  Users,
  Target,
  Zap,
  Star,
  Rocket,
  Globe,
  Heart,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface QuizCardProps {
  onNext: (data: { goal: "exploring" | "developer" | "entrepreneur" }) => void;
}

export default function QuizCard({ onNext }: QuizCardProps) {
  const [selectedGoal, setSelectedGoal] = useState<
    "exploring" | "developer" | "entrepreneur" | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);
  const goals = [
    {
      id: "exploring" as const,
      title: "Just Exploring",
      subtitle: "Start your Web3 journey",
      description:
        "Perfect for beginners who want to understand Web3 basics and explore safely",
      icon: Compass,
      color: "from-emerald-400 to-teal-500",
      accentColor: "ring-emerald-400/50 bg-emerald-400/10",
      stats: "15K+ explorers",
      popular: false,
      benefits: [
        { icon: Compass, text: "Guided learning paths" },
        { icon: Globe, text: "Safe exploration tools" },
        { icon: Users, text: "Beginner community" },
      ],
    },
    {
      id: "developer" as const,
      title: "Build & Create",
      subtitle: "Become a Web3 developer",
      description:
        "Learn to code smart contracts and build the next generation of applications",
      icon: Code,
      color: "from-violet-400 to-purple-500",
      accentColor: "ring-violet-400/50 bg-violet-400/10",
      stats: "25K+ developers",
      popular: true,
      benefits: [
        { icon: Code, text: "Smart contract tutorials" },
        { icon: Rocket, text: "Project-based learning" },
        { icon: Target, text: "Developer job board" },
      ],
    },
    {
      id: "entrepreneur" as const,
      title: "Launch & Scale",
      subtitle: "Start a Web3 business",
      description:
        "Get the tools and connections to build successful Web3 ventures",
      icon: Briefcase,
      color: "from-blue-400 to-cyan-500",
      accentColor: "ring-blue-400/50 bg-blue-400/10",
      stats: "8K+ founders",
      popular: false,
      benefits: [
        { icon: Briefcase, text: "Business plan templates" },
        { icon: Users, text: "Investor connections" },
        { icon: Zap, text: "Funding opportunities" },
      ],
    },
  ];
  const handleSelect = (goal: "exploring" | "developer" | "entrepreneur") => {
    if (isAnimating) return;

    setSelectedGoal(goal);
    setIsAnimating(true);

    setTimeout(() => {
      onNext({ goal });
    }, 200);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4"
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 mb-4 px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Step 1
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What brings you to Web3?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Choose your journey and we&apos;ll create a personalized experience
            for you
          </p>
        </motion.div>
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: selectedGoal === goal.id ? 1.02 : 1,
            }}
            transition={{
              delay: 0.3 + index * 0.1,
              duration: 0.5,
              scale: { duration: 0.3 },
            }}
            className="relative group"
            onMouseEnter={() => setHoveredGoal(goal.id)}
            onMouseLeave={() => setHoveredGoal(null)}
          >
            <Card
              className={`relative h-full bg-white/5 backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                selectedGoal === goal.id
                  ? `${goal.accentColor} border-white/30`
                  : "border-white/10 hover:border-white/20 hover:bg-white/8"
              }`}
              onClick={() => handleSelect(goal.id)}
            >
              {/* Popular Badge */}
              {goal.popular && (
                <motion.div
                  className="absolute -top-2 -right-2 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-0 px-3 py-1 text-xs font-medium">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Popular
                  </Badge>
                </motion.div>
              )}

              {/* Selection Indicator */}
              <AnimatePresence>
                {selectedGoal === goal.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-4 right-4 z-10"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <CardContent className="p-6">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  <goal.icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-white/60 font-medium">
                      {goal.subtitle}
                    </p>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-white/50" />
                  <span className="text-white/70 text-sm">{goal.stats}</span>
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                  {goal.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-white/70"
                    >
                      <div
                        className={`w-4 h-4 rounded bg-gradient-to-br ${goal.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <benefit.icon className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-white/90 text-sm font-medium">
                    Choose this path
                  </span>
                  <motion.div
                    animate={{ x: hoveredGoal === goal.id ? 4 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-4 w-4 text-white/60" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>{" "}
      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Target className="h-5 w-5 text-violet-400" />
            <span className="text-lg font-semibold text-white">
              Still deciding?
            </span>
          </div>

          <p className="text-white/70 text-sm leading-relaxed mb-4">
            No worries! You can explore other paths anytime and switch freely.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs text-white/60">
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-emerald-400" />
              <span>Free to switch</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-violet-400" />
              <span>Personalized</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-blue-400" />
              <span>Global community</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
