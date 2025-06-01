"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Target,
  Trophy,
  BookOpen,
  Code,
  Rocket,
} from "lucide-react";

interface LearningTimelineProps {
  selectedPath: "events" | "classes";
  onBeginnerPathSelect: () => void;
  onAdvancedPathSelect: () => void;
}

export default function LearningTimeline({
  selectedPath,
  onBeginnerPathSelect,
  onAdvancedPathSelect,
}: LearningTimelineProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const timelineSteps = [
    {
      id: 1,
      title: "Foundation",
      subtitle: "Start Your Journey",
      description:
        selectedPath === "classes"
          ? "Live Interactive Classes - Learn the fundamentals with expert guidance"
          : "Web3 Events - Network and learn from the community",
      icon: selectedPath === "classes" ? GraduationCap : Users,
      status: "current",
      color: "from-blue-500 to-cyan-500",
      action: "Begin Now",
      isClickable: true,
      onClick: onBeginnerPathSelect,
      features:
        selectedPath === "classes"
          ? [
              "Expert-led live sessions",
              "Interactive Q&A",
              "Peer learning groups",
              "Beginner-friendly content",
            ]
          : [
              "Industry networking",
              "Latest trends & insights",
              "Community building",
              "Real-world applications",
            ],
    },
    {
      id: 2,
      title: "Specialization",
      subtitle: "Level Up Your Skills",
      description:
        "Advanced Turbin3 Programs - Deep dive into specialized Web3 development",
      icon: Rocket,
      status: "next",
      color: "from-purple-500 to-violet-500",
      action: "Explore Advanced",
      isClickable: true,
      onClick: onAdvancedPathSelect,
      features: [
        "Builder's Cohort Program",
        "Advanced SVM Development",
        "Specialized frameworks",
        "Industry mentorship",
      ],
    },
    {
      id: 3,
      title: "Mastery",
      subtitle: "Expert Level",
      description:
        "Professional Development - Master advanced concepts and lead projects",
      icon: Trophy,
      status: "future",
      color: "from-orange-500 to-amber-500",
      action: "Coming Soon",
      isClickable: false,
      features: [
        "Leadership training",
        "Advanced certifications",
        "Mentorship programs",
        "Industry partnerships",
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/25"
        >
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
            <Target className="h-10 w-10 text-white" />
          </motion.div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Your Perfect Learning Path
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          Follow this curated roadmap designed specifically for your Web3
          journey. Each step builds upon the previous, ensuring you develop
          strong foundations before advancing.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 rounded-full opacity-30" />

        <div className="space-y-24">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.4 }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl border-4 border-black/20`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </motion.div>
              </div>

              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? "pr-16" : "pl-16"}`}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`bg-white/[0.03] backdrop-blur-xl border-white/10 overflow-hidden transition-all duration-300 ${
                      hoveredStep === step.id
                        ? "border-white/30 bg-white/[0.06]"
                        : ""
                    } ${step.isClickable ? "cursor-pointer" : ""}`}
                  >
                    <CardContent className="p-8">
                      {/* Step Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge
                          variant="outline"
                          className={`border-opacity-50 ${
                            step.status === "current"
                              ? "border-blue-500 text-blue-300 bg-blue-500/10"
                              : step.status === "next"
                              ? "border-purple-500 text-purple-300 bg-purple-500/10"
                              : "border-orange-500 text-orange-300 bg-orange-500/10"
                          }`}
                        >
                          Step {step.id}
                        </Badge>
                        {step.status === "current" && (
                          <div className="flex items-center gap-1 text-blue-400">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-xs font-medium">
                              Start Here
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-white/60 font-medium mb-3">
                          {step.subtitle}
                        </p>
                        <p className="text-white/80 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          What You'll Get:
                        </h4>
                        <div className="space-y-2">
                          {step.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span className="text-white/70 text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        onClick={step.isClickable ? step.onClick : undefined}
                        disabled={!step.isClickable}
                        size="lg"
                        className={`w-full bg-gradient-to-r ${
                          step.color
                        } hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 ${
                          !step.isClickable
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {step.action}
                        {step.isClickable && (
                          <ArrowRight className="ml-2 h-5 w-5" />
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center mt-16 pt-16 border-t border-white/10"
      >
        <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Choose your starting point above and begin building your Web3
            expertise with expert guidance and a community of passionate
            learners.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/50">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm">
              Trusted by 10,000+ developers worldwide
            </span>
            <Star className="h-4 w-4 fill-current" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
