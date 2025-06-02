"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Loader2,
  Search,
  Database,
  Brain,
  Cpu,
  Sparkles,
  CheckCircle,
  Zap,
  Target,
} from "lucide-react";

interface MatchingLoadingScreenProps {
  onComplete: () => void;
}

export default function MatchingLoadingScreen({
  onComplete,
}: MatchingLoadingScreenProps) {
  const [loadingStep, setLoadingStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  // Motion values for enhanced animations
  const progress = useMotionValue(0);
  const progressPercentage = useTransform(progress, [0, 1], [0, 100]);

  // Enhanced loading steps with better icons and descriptions
  const loadingSteps = [
    {
      icon: Search,
      title: "Analyzing preferences",
      description: "Processing your Web3 goals and experience level...",
      color: "from-blue-500 to-cyan-500",
      delay: 0,
    },
    {
      icon: Database,
      title: "Scanning ecosystem",
      description: "Searching 10,000+ events, courses, and opportunities...",
      color: "from-purple-500 to-violet-500",
      delay: 0.1,
    },
    {
      icon: Brain,
      title: "AI matching engine",
      description: "Using machine learning to find perfect matches...",
      color: "from-pink-500 to-rose-500",
      delay: 0.2,
    },
    {
      icon: Cpu,
      title: "Optimizing results",
      description: "Ranking opportunities by relevance score...",
      color: "from-orange-500 to-amber-500",
      delay: 0.3,
    },
    {
      icon: Target,
      title: "Perfect matches found!",
      description: "Your personalized Web3 journey awaits",
      color: "from-green-500 to-emerald-500",
      delay: 0.4,
    },
  ];
  useEffect(() => {
    let stepInterval: NodeJS.Timeout;
    let completeTimeout: NodeJS.Timeout;

    // Progress through steps with slower timing for longer experience
    stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        const nextStep = prev + 1;
        if (nextStep < loadingSteps.length) {
          // Update progress motion value
          progress.set(nextStep / loadingSteps.length);
          return nextStep;
        }
        // Start completion animation
        if (prev === loadingSteps.length - 1) {
          setIsCompleting(true);
        }
        return prev;
      });
    }, 1600); // Slower steps for longer duration

    // Complete loading after 9 seconds
    completeTimeout = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, progress, loadingSteps.length]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center min-h-screen max-w-5xl mx-auto px-6"
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Main logo/spinner */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-indigo-500/20 border border-violet-500/30"
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner circle */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl shadow-purple-500/40"
            animate={{ rotate: -360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: 360,
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              }}
            >
              <Zap className="h-12 w-12 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent"
        >
          Finding Your Perfect Match
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Our AI is analyzing your preferences to curate the perfect Web3
          opportunities just for you
        </motion.p>
      </motion.div>{" "}
      {/* Loading Steps Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-8 border border-white/10 w-full max-w-3xl shadow-2xl shadow-black/20"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] via-transparent to-purple-500/[0.03] rounded-3xl" />
        <div className="relative space-y-5">
          <AnimatePresence mode="wait">
            {loadingSteps.map((step, index) => {
              const isActive = index === loadingStep;
              const isCompleted = index < loadingStep;
              const isPending = index > loadingStep;
              const StepIcon = step.icon;

              return (
                <motion.div
                  key={`step-${index}`}
                  layout
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: isPending ? 0.4 : 1,
                    x: 0,
                    scale: isActive ? 1.02 : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: step.delay,
                  }}
                  className={`flex items-center gap-5 p-6 rounded-2xl border relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 border-violet-500/40 shadow-lg shadow-violet-500/20"
                      : isCompleted
                      ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  {/* Animated background for active step */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {/* Step Icon Container */}
                  <motion.div
                    className={`relative w-14 h-14 rounded-2xl flex items-center justify-center ${
                      isActive
                        ? `bg-gradient-to-br ${step.color} shadow-lg`
                        : isCompleted
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"
                        : "bg-white/10"
                    }`}
                    animate={
                      isActive
                        ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {isCompleted ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.5, ease: "backOut" }}
                        >
                          <CheckCircle className="h-7 w-7 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="icon"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.5, ease: "backOut" }}
                        >
                          <StepIcon className="h-7 w-7 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Step Content */}
                  <div className="flex-1 relative z-10">
                    <motion.h4
                      className={`font-bold text-lg mb-1 ${
                        isActive || isCompleted ? "text-white" : "text-white/60"
                      }`}
                      animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {step.title}
                    </motion.h4>
                    <motion.p
                      className={`text-sm ${
                        isActive || isCompleted
                          ? "text-white/90"
                          : "text-white/40"
                      }`}
                      animate={isActive ? { opacity: [0.9, 1, 0.9] } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {step.description}
                    </motion.p>
                  </div>

                  {/* Status indicator */}
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {isActive && (
                      <motion.div
                        className="flex gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-violet-400 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>{" "}
        {/* Enhanced Progress Bar */}
        <motion.div
          className="mt-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex justify-between text-sm text-white/70 mb-4 font-medium">
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Progress
            </span>
            <motion.span
              className="text-violet-300 font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              {Math.round(((loadingStep + 1) / loadingSteps.length) * 100)}%
            </motion.span>
          </div>

          <div className="relative w-full bg-white/10 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-white/20">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full" />

            {/* Progress bar */}
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full shadow-lg relative overflow-hidden"
              initial={{ width: "0%" }}
              animate={{
                width: `${((loadingStep + 1) / loadingSteps.length) * 100}%`,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
              }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>{" "}
      {/* Simple Fun Fact */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-12 text-center"
      >
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-lg mx-auto border border-white/10"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Did you know?</span>
          </div>
          <p className="text-white/80 text-base leading-relaxed">
            Most Web3 builders started in Web2. We connect you with communities
            that understand your background and help you transition smoothly.
          </p>

          {/* Completion state */}
          <AnimatePresence>
            {isCompleting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <div className="flex items-center justify-center gap-2 text-green-300">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Target className="h-4 w-4" />
                  </motion.div>
                  <span className="text-sm font-medium">
                    Finalizing your matches...
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
