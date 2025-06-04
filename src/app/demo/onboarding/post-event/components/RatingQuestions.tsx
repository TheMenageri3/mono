"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Sparkles,
  Users,
  Heart,
  ArrowRight,
  Zap,
  Crown,
  Globe,
} from "lucide-react";

interface RatingQuestion {
  id: "eventRating" | "lostFeeling" | "communityVibeRating";
  title: string;
  subtitle: string;
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
  onRatingUpdate?: (questionId: string, rating: number) => void;
}

export default function RatingQuestions({
  currentQuestion,
  ratings,
  onRatingSelect,
  onNext,
  onRatingUpdate,
}: RatingQuestionsProps) {
  const [hoveredRating, setHoveredRating] = useState<{
    questionId: string;
    rating: number;
  } | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions: RatingQuestion[] = [
    {
      id: "eventRating",
      title: "How would you rate this event overall?",
      subtitle: "Your honest feedback helps us improve future events",
      color: "from-yellow-400 via-orange-400 to-red-500",
      lowLabel: "Poor",
      highLabel: "Excellent",
    },
    {
      id: "lostFeeling",
      title: "How lost did you feel during the event?",
      subtitle: "This helps us adjust the complexity of our content",
      color: "from-blue-400 via-cyan-400 to-teal-500",
      lowLabel: "Very Lost",
      highLabel: "Totally Clear",
    },
    {
      id: "communityVibeRating",
      title: "How well did the community match your vibe?",
      subtitle: "Was the atmosphere welcoming and engaging?",
      color: "from-pink-400 via-purple-400 to-violet-500",
      lowLabel: "Poor Match",
      highLabel: "Perfect Match",
    },
  ];
  const handleRatingSelect = (questionId: string, rating: number) => {
    // Update the parent component's state
    if (onRatingUpdate) {
      onRatingUpdate(questionId, rating);
    }

    // Find the question index to simulate the old behavior if needed
    const questionIndex = questions.findIndex((q) => q.id === questionId);
    if (questionIndex !== -1) {
      setCurrentQuestionIndex(questionIndex);
      onRatingSelect(rating);
    }

    // Check if all questions are now answered and auto-proceed
    const updatedRatings = { ...ratings, [questionId]: rating };
    const allAnswered = questions.every((q) => updatedRatings[q.id] !== null);

    if (allAnswered) {
      // Small delay to let the user see their final selection before proceeding
      setTimeout(() => {
        onNext();
      }, 300);
    }
  };

  const allQuestionsAnswered = questions.every((q) => ratings[q.id] !== null);

  const handleNext = () => {
    if (allQuestionsAnswered) {
      onNext();
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
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
            Event Feedback
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How was your experience?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Please rate your experience on all aspects below
          </p>
        </motion.div>
      </div>

      {/* All Questions */}
      <div className="space-y-8 mb-12">
        {questions.map((question, index) => {
          const currentRating = ratings[question.id];

          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 overflow-hidden">
                <CardContent className="p-8">
                  {" "}
                  {/* Question Header */}
                  <div className="text-center mb-8">
                    <div className="mb-4">
                      <h3
                        className={`text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r ${question.color} bg-clip-text text-transparent`}
                      >
                        {question.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {question.subtitle}
                      </p>
                    </div>
                  </div>
                  {/* Rating Scale */}
                  <div className="space-y-6">
                    <div className="flex justify-between text-sm text-white/60 px-2">
                      <span>{question.lowLabel}</span>
                      <span>{question.highLabel}</span>
                    </div>
                    <div className="flex justify-center gap-2 md:gap-3">
                      {[...Array(10)].map((_, ratingIndex) => {
                        const rating = ratingIndex + 1;
                        const isSelected = currentRating === rating;
                        const isHovered =
                          hoveredRating?.questionId === question.id &&
                          hoveredRating?.rating === rating;
                        return (
                          <motion.button
                            key={rating}
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
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={() =>
                              handleRatingSelect(question.id, rating)
                            }
                            onMouseEnter={() =>
                              setHoveredRating({
                                questionId: question.id,
                                rating,
                              })
                            }
                            onMouseLeave={() => setHoveredRating(null)}
                            className={`
                              relative w-11 h-11 md:w-12 md:h-12 rounded-xl font-bold text-base md:text-lg 
                              transition-all duration-300 ease-out transform-gpu
                              ${
                                isSelected
                                  ? `bg-gradient-to-br ${question.color} text-white ring-2 ring-white/60 ring-offset-2 ring-offset-transparent`
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
                                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${question.color} opacity-30 blur-sm -z-10`}
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
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center"
      >
        <Button
          onClick={handleNext}
          disabled={!allQuestionsAnswered}
          size="lg"
          className={`
            px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300
            ${
              allQuestionsAnswered
                ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-violet-500/25"
                : "bg-white/10 text-white/50 cursor-not-allowed"
            }
          `}
        >
          Continue to Connections
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        {!allQuestionsAnswered && (
          <p className="text-white/60 text-sm mt-2">
            Please answer all questions to continue
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
