"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RatingQuestions from "./RatingQuestions";
import WorkshopsFeedback from "./WorkshopsFeedback";

interface EventRatingCardProps {
  feedback: {
    eventRating: number | null;
    lostFeeling: number | null;
    benefitRating: number | null;
    communityVibeRating: number | null;
    additionalComments?: string;
    workshops?: {
      attendedWorkshops: string[];
      mostInteresting: string;
      feedback: { [key: string]: string };
    };
  };
  onNext: (data: {
    eventRating: number;
    lostFeeling: number;
    benefitRating: number;
    communityVibeRating: number;
    additionalComments?: string;
    workshops?: {
      attendedWorkshops: string[];
      mostInteresting: string;
      feedback: { [key: string]: string };
    };
  }) => void;
}

export default function EventRatingCard({
  feedback,
  onNext,
}: EventRatingCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [ratings, setRatings] = useState({
    eventRating: feedback.eventRating,
    lostFeeling: feedback.lostFeeling,
    benefitRating: feedback.benefitRating,
    communityVibeRating: feedback.communityVibeRating,
  });
  const [workshops, setWorkshops] = useState({
    attendedWorkshops: feedback.workshops?.attendedWorkshops || [],
    mostInteresting: feedback.workshops?.mostInteresting || "",
    feedback: feedback.workshops?.feedback || {},
  });
  const handleRatingSelect = (rating: number) => {
    // This is no longer used since all questions are shown at once
    // The RatingQuestions component handles the rating internally
  };

  const handleNextQuestion = () => {
    // Move directly to workshops section since all questions are shown at once
    setCurrentQuestion(-3);
  };

  const handleWorkshopToggle = (workshopId: string) => {
    setWorkshops((prev) => ({
      ...prev,
      attendedWorkshops: prev.attendedWorkshops.includes(workshopId)
        ? prev.attendedWorkshops.filter((id) => id !== workshopId)
        : [...prev.attendedWorkshops, workshopId],
    }));
  };

  const handleMostInterestingSelect = (workshopId: string) => {
    setWorkshops((prev) => ({
      ...prev,
      mostInteresting: workshopId,
    }));
  };

  const handleWorkshopFeedback = (workshopId: string, feedback: string) => {
    setWorkshops((prev) => ({
      ...prev,
      feedback: {
        ...prev.feedback,
        [workshopId]: feedback,
      },
    }));
  };
  const handleSubmit = () => {
    if (
      ratings.eventRating &&
      ratings.lostFeeling &&
      ratings.communityVibeRating
    ) {
      onNext({
        eventRating: ratings.eventRating,
        lostFeeling: ratings.lostFeeling,
        benefitRating: 5, // Default value since this question was removed
        communityVibeRating: ratings.communityVibeRating,
        workshops: workshops,
      });
    }
  };
  const allRatingsComplete =
    ratings.eventRating !== null &&
    ratings.lostFeeling !== null &&
    ratings.communityVibeRating !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4"
    >
      {" "}
      <AnimatePresence mode="wait">
        {" "}
        {currentQuestion >= 0 && currentQuestion <= 3 ? (
          <RatingQuestions
            currentQuestion={currentQuestion}
            ratings={ratings}
            onRatingSelect={(rating) => {
              // This is handled by onRatingUpdate now
            }}
            onNext={handleNextQuestion}
            onRatingUpdate={(questionId: string, rating: number) => {
              setRatings((prev) => ({ ...prev, [questionId]: rating }));
            }}
          />
        ) : currentQuestion === -3 ? (
          <WorkshopsFeedback
            workshops={workshops}
            onWorkshopToggle={handleWorkshopToggle}
            onMostInterestingSelect={handleMostInterestingSelect}
            onWorkshopFeedback={handleWorkshopFeedback}
            onNext={handleSubmit}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
