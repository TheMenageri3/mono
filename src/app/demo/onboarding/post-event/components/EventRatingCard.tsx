"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RatingQuestions from "./RatingQuestions";
import ConnectionsFeedback from "./ConnectionsFeedback";
import WorkshopsFeedback from "./WorkshopsFeedback";

interface EventRatingCardProps {
  feedback: {
    eventRating: number | null;
    lostFeeling: number | null;
    benefitRating: number | null;
    communityVibeRating: number | null;
    additionalComments?: string;
    connections?: {
      [key: string]: { commendation: string; customMessage: string };
    };
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
    connections?: {
      [key: string]: { commendation: string; customMessage: string };
    };
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
  const [connections, setConnections] = useState(feedback.connections || {});
  const [workshops, setWorkshops] = useState({
    attendedWorkshops: feedback.workshops?.attendedWorkshops || [],
    mostInteresting: feedback.workshops?.mostInteresting || "",
    feedback: feedback.workshops?.feedback || {},
  });

  const handleRatingSelect = (rating: number) => {
    const questions = [
      "eventRating",
      "lostFeeling",
      "benefitRating",
      "communityVibeRating",
    ];
    const currentField = questions[currentQuestion] as keyof typeof ratings;

    setRatings((prev) => ({ ...prev, [currentField]: rating }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Move to connections section
      setCurrentQuestion(-2);
    }
  };

  const handleConnectionUpdate = (
    personId: string,
    field: "commendation" | "customMessage",
    value: string
  ) => {
    setConnections((prev) => ({
      ...prev,
      [personId]: {
        ...prev[personId],
        [field]: value,
        commendation:
          field === "commendation" ? value : prev[personId]?.commendation || "",
        customMessage:
          field === "customMessage"
            ? value
            : prev[personId]?.customMessage || "",
      },
    }));
  };
  const proceedToWorkshops = () => {
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
      ratings.benefitRating &&
      ratings.communityVibeRating
    ) {
      onNext({
        eventRating: ratings.eventRating,
        lostFeeling: ratings.lostFeeling,
        benefitRating: ratings.benefitRating,
        communityVibeRating: ratings.communityVibeRating,
        connections: connections,
        workshops: workshops,
      });
    }
  };

  const allRatingsComplete = Object.values(ratings).every(
    (rating) => rating !== null
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4"
    >
      <AnimatePresence mode="wait">
        {currentQuestion >= 0 && currentQuestion <= 3 ? (
          <RatingQuestions
            currentQuestion={currentQuestion}
            ratings={ratings}
            onRatingSelect={handleRatingSelect}
            onNext={handleNextQuestion}
          />
        ) : currentQuestion === -2 ? (
          <ConnectionsFeedback
            connections={connections}
            onConnectionUpdate={handleConnectionUpdate}
            onNext={proceedToWorkshops}
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
