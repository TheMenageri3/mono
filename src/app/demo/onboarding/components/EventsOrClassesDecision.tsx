"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  GraduationCap,
  Users,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Network,
} from "lucide-react";

interface EventsOrClassesDecisionProps {
  onNext: (choice: "events" | "classes") => void;
}

export default function EventsOrClassesDecision({
  onNext,
}: EventsOrClassesDecisionProps) {
  const [selectedChoice, setSelectedChoice] = useState<
    "events" | "classes" | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (choice: "events" | "classes") => {
    if (isAnimating) return;

    setSelectedChoice(choice);
    setIsAnimating(true);

    setTimeout(() => {
      onNext(choice);
    }, 600);
  };

  const options = [
    {
      id: "events" as const,
      title: "Explore Events First",
      subtitle: "Recommended for you",
      description:
        "Connect with the Web3 community through live events, workshops, and networking opportunities",
      icon: Calendar,
      color: "from-violet-500 to-purple-600",
      accentColor: "ring-violet-400/50 bg-violet-400/10",
      recommended: true,
      benefits: [
        { icon: Users, text: "Meet industry experts" },
        { icon: Network, text: "Build connections" },
        { icon: MapPin, text: "Local & remote events" },
      ],
      stats: "2.5K+ events",
      nextSteps: "Find events happening near you or online",
    },
    {
      id: "classes" as const,
      title: "Jump Into Classes",
      subtitle: "Learn at your own pace",
      description:
        "Start with structured learning through expert-led courses and comprehensive curricula",
      icon: GraduationCap,
      color: "from-emerald-500 to-teal-600",
      accentColor: "ring-emerald-400/50 bg-emerald-400/10",
      recommended: false,
      benefits: [
        { icon: Clock, text: "Self-paced learning" },
        { icon: Star, text: "Expert instructors" },
        { icon: CheckCircle, text: "Completion certificates" },
      ],
      stats: "500+ courses",
      nextSteps: "Access curated learning paths",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
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
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent">
            Choose Your Starting Point
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          Both paths lead to success! Pick what feels right for you right now -
          you can always explore the other option later.
        </p>
      </motion.div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            className="relative"
          >
            {" "}
            {/* Recommended Badge */}
            <AnimatePresence>
              {option.recommended && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  className="absolute -top-1 left-0 z-20"
                >
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-0 px-3 py-1 text-xs font-medium shadow-lg">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Recommended
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
            <Card
              className={`h-full cursor-pointer transition-all duration-300 group relative overflow-hidden ${
                selectedChoice === option.id
                  ? `bg-white/[0.03] border-2 ${
                      option.id === "events"
                        ? "border-violet-400/30"
                        : "border-emerald-400/30"
                    } shadow-lg`
                  : "bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
              onClick={() => handleSelect(option.id)}
            >
              {/* Selection Indicator */}
              <AnimatePresence>
                {selectedChoice === option.id && (
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
              <CardContent className="p-8">
                {/* Icon and Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <option.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-white">
                        {option.title}
                      </h3>
                    </div>
                    <p className="text-lg text-violet-300 font-medium mb-1">
                      {option.subtitle}
                    </p>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${option.accentColor}`}
                    >
                      <span>{option.stats}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/70 text-base mb-6 leading-relaxed">
                  {option.description}
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {option.benefits.map((benefit, benefitIndex) => (
                    <motion.div
                      key={benefitIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + benefitIndex * 0.1 }}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${option.color}/20 flex items-center justify-center`}
                      >
                        <benefit.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Next Steps */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">
                      {option.nextSteps}
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center"
      >
        <p className="text-white/50 text-sm">
          Don't worry - you can explore both options anytime from your dashboard
        </p>
      </motion.div>
    </motion.div>
  );
}
