"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Users, TrendingUp, Heart } from "lucide-react";

interface RatingQuestion {
  id: "eventRating" | "lostFeeling" | "benefitRating" | "communityVibeRating";
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  lowLabel: string;
  highLabel: string;
}

interface RatingQuestionsProps {
  currentQuestion: number;
  ratings: {
    eventRating: number | null;
    lostFeeling: number | null;
    benefitRating: number | null;
    communityVibeRating: number | null;
  };
  onRatingSelect: (rating: number) => void;
  onNext: () => void;
}

export default function RatingQuestions({
  currentQuestion,
  ratings,
  onRatingSelect,
  onNext,
}: RatingQuestionsProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const questions: RatingQuestion[] = [
    {
      id: "eventRating",
      title: "How would you rate this event overall?",
      subtitle: "Your honest feedback helps us improve future events",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
      lowLabel: "Poor",
      highLabel: "Excellent",
    },
    {
      id: "lostFeeling",
      title: "How lost did you feel during the event?",
      subtitle: "This helps us adjust the complexity of our content",
      icon: Users,
      color: "from-blue-400 to-indigo-500",
      lowLabel: "Very Lost",
      highLabel: "Totally Clear",
    },
    {
      id: "benefitRating",
      title: "How beneficial was this event for you?",
      subtitle: "Did you gain valuable knowledge or connections?",
      icon: TrendingUp,
      color: "from-emerald-400 to-teal-500",
      lowLabel: "Not Beneficial",
      highLabel: "Extremely Beneficial",
    },
    {
      id: "communityVibeRating",
      title: "How well did the community match the vibe?",
      subtitle: "Was the atmosphere welcoming and engaging?",
      icon: Heart,
      color: "from-pink-400 to-rose-500",
      lowLabel: "Poor Match",
      highLabel: "Perfect Match",
    },
  ];

  const currentQ = questions[currentQuestion];
  const currentRating = currentQ ? ratings[currentQ.id] : null;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleRatingSelect = (rating: number) => {
    if (!currentQ) return;

    onRatingSelect(rating);

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        onNext();
      } else {
        // Move to connections section
        onNext();
      }
    }, 800); // 800ms delay to show the selection
  };

  if (!currentQ) return null;

  return (
    <motion.div
      key={`question-${currentQuestion}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
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
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {currentQ.title}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {currentQ.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Rating Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-12"
      >
        <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 overflow-hidden">
          <CardContent className="p-8">
            {/* Icon */}
            <div className="text-center mb-8">
              <div
                className={`w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br ${currentQ.color} flex items-center justify-center shadow-xl`}
              >
                <currentQ.icon className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Rating Scale */}
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-white/60 px-2">
                <span>{currentQ.lowLabel}</span>
                <span>{currentQ.highLabel}</span>
              </div>
              <div className="flex justify-center gap-2 md:gap-3">
                {[...Array(10)].map((_, index) => {
                  const rating = index + 1;
                  const isSelected = currentRating === rating;
                  const isHovered = hoveredRating === rating;

                  return (
                    <motion.button
                      key={rating}
                      layout
                      whileHover={{
                        scale: 1.15,
                        y: -4,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }}
                      whileTap={{
                        scale: 0.95,
                        transition: { duration: 0.1 },
                      }}
                      animate={{
                        scale: isSelected ? 1.1 : 1,
                        boxShadow: isSelected
                          ? "0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)"
                          : "0 4px 12px rgba(0, 0, 0, 0.2)",
                      }}
                      onClick={() => handleRatingSelect(rating)}
                      onMouseEnter={() => setHoveredRating(rating)}
                      onMouseLeave={() => setHoveredRating(null)}
                      className={`
                        relative w-11 h-11 md:w-12 md:h-12 rounded-xl font-bold text-base md:text-lg 
                        transition-all duration-300 ease-out transform-gpu
                        ${
                          isSelected
                            ? `bg-gradient-to-br ${currentQ.color} text-white ring-2 ring-white/60 ring-offset-2 ring-offset-transparent`
                            : "bg-white/[0.08] text-white/60 hover:bg-white/[0.12] border border-white/10 hover:border-white/20"
                        }
                      `}
                    >
                      <motion.span
                        animate={{
                          color: isSelected ? "#ffffff" : "#ffffff99",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {rating}
                      </motion.span>

                      {/* Glow effect for selected state only */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${currentQ.color} opacity-30 blur-sm -z-10`}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
              {currentRating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center pt-4"
                >
                  <p className="text-white/80">
                    You rated:{" "}
                    <span className="font-bold text-white">
                      {currentRating}/10
                    </span>
                  </p>
                  <p className="text-sm text-white/60 mt-2">
                    {isLastQuestion
                      ? "Moving to connections..."
                      : "Moving to next question..."}
                  </p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
