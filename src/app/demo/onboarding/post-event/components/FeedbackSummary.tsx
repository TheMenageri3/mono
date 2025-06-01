"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Users,
  TrendingUp,
  Heart,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  BarChart3,
  Sparkles,
} from "lucide-react";

interface FeedbackSummaryProps {
  feedback: {
    eventRating: number | null;
    lostFeeling: number | null;
    benefitRating: number | null;
    communityVibeRating: number | null;
    additionalComments?: string;
  };
  onNext: () => void;
}

export default function FeedbackSummary({
  feedback,
  onNext,
}: FeedbackSummaryProps) {
  const ratings = [
    {
      id: "eventRating",
      title: "Overall Event Rating",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
      value: feedback.eventRating,
      interpretation: getEventRatingInterpretation(feedback.eventRating || 0),
    },
    {
      id: "lostFeeling",
      title: "Clarity Level",
      icon: Users,
      color: "from-blue-400 to-indigo-500",
      value: feedback.lostFeeling,
      interpretation: getLostFeelingInterpretation(feedback.lostFeeling || 0),
    },
    {
      id: "benefitRating",
      title: "Event Benefit",
      icon: TrendingUp,
      color: "from-emerald-400 to-teal-500",
      value: feedback.benefitRating,
      interpretation: getBenefitInterpretation(feedback.benefitRating || 0),
    },
    {
      id: "communityVibeRating",
      title: "Community Vibe",
      icon: Heart,
      color: "from-pink-400 to-rose-500",
      value: feedback.communityVibeRating,
      interpretation: getCommunityVibeInterpretation(
        feedback.communityVibeRating || 0
      ),
    },
  ];

  const averageRating =
    ratings.reduce((sum, rating) => sum + (rating.value || 0), 0) /
    ratings.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
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
            <BarChart3 className="h-4 w-4 mr-2" />
            Feedback Summary
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Here&apos;s Your Event Feedback
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Thank you for sharing your thoughts! Here&apos;s a summary of your
            experience.
          </p>
        </motion.div>
      </div>

      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 backdrop-blur-xl border-violet-500/20">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Overall Experience
                </h3>
                <p className="text-white/70">
                  Average rating across all categories
                </p>
              </div>
            </div>
            <div className="text-5xl font-bold text-white mb-2">
              {averageRating.toFixed(1)}
              <span className="text-2xl text-white/60">/10</span>
            </div>
            <p className="text-lg text-violet-300 font-medium">
              {getOverallInterpretation(averageRating)}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Individual Ratings Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        {ratings.map((rating, index) => (
          <motion.div
            key={rating.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          >
            <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 hover:bg-white/[0.04] transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${rating.color} flex items-center justify-center shadow-lg`}
                  >
                    <rating.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{rating.title}</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-white">
                        {rating.value}
                        <span className="text-sm text-white/60">/10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(rating.value || 0) * 10}%` }}
                    transition={{
                      delay: 0.7 + index * 0.1,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className={`h-full bg-gradient-to-r ${rating.color}`}
                  />
                </div>

                <p className="text-white/70 text-sm">{rating.interpretation}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Comments Section (if provided) */}
      {feedback.additionalComments && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-6 w-6 text-violet-400" />
                <h4 className="text-xl font-semibold text-white">
                  Your Additional Thoughts
                </h4>
              </div>
              <div className="bg-white/[0.02] rounded-xl p-6 border border-white/10">
                <p className="text-white/80 leading-relaxed italic">
                  &quot;{feedback.additionalComments}&quot;
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="text-center"
      >
        <Button
          size="lg"
          onClick={onNext}
          className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white px-12 py-6 text-lg font-bold rounded-2xl shadow-xl shadow-purple-500/25"
        >
          Continue to Next Steps
          <ArrowRight className="ml-3 h-6 w-6" />
        </Button>
      </motion.div>
    </motion.div>
  );
}

// Helper functions for rating interpretations
function getEventRatingInterpretation(rating: number): string {
  if (rating >= 9) return "Outstanding! You had an amazing experience.";
  if (rating >= 7) return "Great! You found the event very valuable.";
  if (rating >= 5) return "Good! The event met your expectations.";
  if (rating >= 3) return "Fair. There's room for improvement.";
  return "We'll work to make future events better.";
}

function getLostFeelingInterpretation(rating: number): string {
  if (rating >= 8) return "Excellent! The content was very clear to you.";
  if (rating >= 6) return "Good! You followed along well.";
  if (rating >= 4) return "Fair. Some parts were challenging.";
  if (rating >= 2) return "Difficult. We should adjust complexity.";
  return "Very challenging. We need to improve clarity.";
}

function getBenefitInterpretation(rating: number): string {
  if (rating >= 9)
    return "Extremely valuable! You gained significant insights.";
  if (rating >= 7) return "Very beneficial! Great learning experience.";
  if (rating >= 5) return "Moderately helpful with useful takeaways.";
  if (rating >= 3) return "Some value, but could be more relevant.";
  return "Limited benefit. We'll improve content relevance.";
}

function getCommunityVibeInterpretation(rating: number): string {
  if (rating >= 9) return "Perfect match! The community was exactly your vibe.";
  if (rating >= 7) return "Great fit! You connected well with the community.";
  if (rating >= 5) return "Good atmosphere with welcoming people.";
  if (rating >= 3) return "Decent vibe, but could be more engaging.";
  return "The community didn't quite match your expectations.";
}

function getOverallInterpretation(average: number): string {
  if (average >= 8.5) return "Exceptional Experience";
  if (average >= 7) return "Great Experience";
  if (average >= 5.5) return "Good Experience";
  if (average >= 4) return "Fair Experience";
  return "Needs Improvement";
}
