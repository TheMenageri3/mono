"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MatchingLoadingScreen from "./MatchingLoadingScreen";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  ExternalLink,
  BookOpen,
  Award,
  Zap,
  Globe,
  Code,
  Heart,
  CheckCircle,
  TrendingUp,
  Target,
  UserPlus,
  MessageCircle,
  Trophy,
  Sparkles,
} from "lucide-react";

interface RecommendationCardProps {
  userChoice: {
    goal: "exploring" | "developer" | "entrepreneur" | null;
    experience?: "beginner" | "intermediate" | "advanced";
    interests?: string[];
  };
  onNext: () => void;
}

const featuredEvent = {
  id: "mtn-dao-builder",
  title: "MTN DAO Builder Meetup",
  organization: "Mountain DAO",
  type: "Workshop",
  date: "August 15, 2025",
  time: "2:00 PM - 6:00 PM MST",
  location: "Denver, CO + Virtual",
  attendees: 156,
  rating: 4.9,
  price: "Free",
  tags: ["Web3", "Networking", "Solana", "Builder"],
  description:
    "Join fellow Web3 builders for an afternoon of learning, networking, and collaboration. Perfect for developers and entrepreneurs looking to connect with the Solana ecosystem.",
  highlights: [
    "Network with 150+ Web3 builders",
    "Learn about latest Solana developments",
    "Workshops on dApp development",
    "Free food and drinks",
  ],
  image: "/mntdao.png",
  matchScore: 94,
  bestDates: "August is perfect - ideal weather and peak community activity",
  recommendedPeople: [
    {
      name: "Alex Chen",
      role: "Community Lead",
      reason: "Known for onboarding new users and super friendly",
      avatar: "👨‍💻",
    },
    {
      name: "Sarah Miller",
      role: "Developer Relations",
      reason: "Similar interests in Web3 development",
      avatar: "👩‍💼",
    },
    {
      name: "Mike Rodriguez",
      role: "Founder",
      reason: "Great mentor for Web3 entrepreneurs",
      avatar: "🚀",
    },
  ],
};

const featuredCourse = {
  id: "turbin3-solana-101",
  title: "Turbin3 Solana 101",
  provider: "Turbin3",
  type: "Online Course",
  duration: "6 weeks",
  level: "Beginner to Intermediate",
  students: 2847,
  rating: 4.8,
  price: "Free",
  tags: ["Solana", "Smart Contracts", "Rust", "Development"],
  description:
    "The most comprehensive Solana development course. Learn to build on the fastest blockchain with hands-on projects and expert mentorship.",
  highlights: [
    "Build 5 real-world projects",
    "Learn Rust programming",
    "Solana Program development",
    "Direct mentor support",
    "Job placement assistance",
  ],
  curriculum: [
    "Solana Fundamentals",
    "Rust Programming Basics",
    "Program Development",
    "Token Programs",
    "DeFi Protocol Building",
  ],
  matchScore: 97,
  bestDates: "August cohort starts - perfect timing for focused learning",
  recommendedPeople: [
    {
      name: "Jordan Smith",
      role: "Senior Instructor",
      reason: "Expert in onboarding developers to Solana",
      avatar: "🎓",
    },
    {
      name: "Emma Thompson",
      role: "TA & Mentor",
      reason: "Similar background in traditional development",
      avatar: "👩‍🎓",
    },
    {
      name: "Carlos Vega",
      role: "Alumni Lead",
      reason: "Successfully transitioned to Web3 career",
      avatar: "🌟",
    },
  ],
};

export default function RecommendationCard({
  userChoice,
  onNext,
}: RecommendationCardProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getPersonalizationMessage = () => {
    if (userChoice.goal === "developer") {
      return "Based on your development goals, here are our top recommendations tailored just for you:";
    } else if (userChoice.goal === "entrepreneur") {
      return "Perfect for entrepreneurs! These opportunities will accelerate your Web3 business journey:";
    } else {
      return "Excellent choices for exploring Web3! These curated picks will help you discover your path:";
    }
  };

  const MatchScoreCard = ({
    score,
    title,
  }: {
    score: number;
    title: string;
  }) => (
    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
          <Target className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="text-2xl font-bold text-green-400">{score}%</div>
          <div className="text-white/80 text-sm font-medium">Match Score</div>
        </div>
      </div>
      <p className="text-white/60 text-xs mt-2">
        Perfect alignment with your {userChoice.goal} goals!
      </p>
    </div>
  );

  const BestDatesCard = ({ dates }: { dates: string }) => (
    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
          <Calendar className="h-4 w-4 text-white" />
        </div>
        <div className="text-white/80 text-sm font-semibold">
          Best Time to Join
        </div>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">{dates}</p>
    </div>
  );

  const RecommendedPeopleCard = ({
    people,
  }: {
    people: typeof featuredEvent.recommendedPeople;
  }) => (
    <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
          <Users className="h-4 w-4 text-white" />
        </div>
        <div className="text-white/80 text-sm font-semibold">
          People to Connect With
        </div>
      </div>
      <div className="space-y-3">
        {people.map((person, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="text-lg">{person.avatar}</div>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">
                {person.name}
              </div>
              <div className="text-purple-300 text-xs mb-1">{person.role}</div>
              <div className="text-white/60 text-xs">{person.reason}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <MatchingLoadingScreen
          key="loading"
          onComplete={handleLoadingComplete}
        />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-xl shadow-purple-500/30"
            >
              <TrendingUp className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Personalized Recommendations
            </h2>
            <p className="text-white/70 text-xl max-w-4xl mx-auto mb-6 leading-relaxed">
              {getPersonalizationMessage()}
            </p>

            {userChoice.interests && userChoice.interests.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {userChoice.interests.slice(0, 4).map((interest) => (
                  <Badge
                    key={interest}
                    className="bg-violet-500/20 text-violet-300 border-violet-500/30 px-4 py-2 text-base"
                  >
                    {interest}
                  </Badge>
                ))}
                {userChoice.interests.length > 4 && (
                  <Badge className="bg-white/10 text-white/70 border-white/20 px-4 py-2 text-base">
                    +{userChoice.interests.length - 4} more
                  </Badge>
                )}
              </div>
            )}
          </div>
          <div className="space-y-16">
            {/* Featured Event - MTN DAO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="h-7 w-7 text-violet-400" />
                <h3 className="text-3xl font-bold text-white">
                  Recommended Event
                </h3>
                <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1">
                  Perfect Match
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Event Card */}
                <div className="lg:col-span-2">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    onClick={() => toggleSelection(featuredEvent.id)}
                    className="cursor-pointer"
                  >
                    <Card
                      className={`transition-all duration-300 h-full ${
                        selectedItems.includes(featuredEvent.id)
                          ? "bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-violet-500/50 shadow-xl shadow-violet-500/20"
                          : "bg-white/[0.02] backdrop-blur-xl border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                      }`}
                    >
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1">
                                {featuredEvent.type}
                              </Badge>
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 px-3 py-1">
                                Featured
                              </Badge>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3">
                              {featuredEvent.title}
                            </h4>
                            <p className="text-violet-300 font-semibold text-lg mb-4">
                              {featuredEvent.organization}
                            </p>
                          </div>

                          {selectedItems.includes(featuredEvent.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center"
                            >
                              <CheckCircle className="h-6 w-6 text-white" />
                            </motion.div>
                          )}
                        </div>

                        <p className="text-white/70 text-base mb-6 leading-relaxed">
                          {featuredEvent.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-3 text-white/70">
                            <Calendar className="h-5 w-5 text-violet-400" />
                            <div>
                              <div className="text-white font-medium">
                                {featuredEvent.date}
                              </div>
                              <div className="text-sm">
                                {featuredEvent.time}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-white/70">
                            <MapPin className="h-5 w-5 text-violet-400" />
                            <div>
                              <div className="text-white font-medium">
                                {featuredEvent.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-white/70">
                            <Users className="h-5 w-5 text-violet-400" />
                            <div>
                              <div className="text-white font-medium">
                                {featuredEvent.attendees} attendees
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-white/70">
                            <Star className="h-5 w-5 text-yellow-400" />
                            <div>
                              <div className="text-white font-medium">
                                {featuredEvent.rating} rating
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <h5 className="text-white font-semibold">
                            Event highlights:
                          </h5>
                          <ul className="space-y-2">
                            {featuredEvent.highlights.map((highlight, i) => (
                              <li
                                key={i}
                                className="text-white/70 text-sm flex items-center gap-3"
                              >
                                <Sparkles className="h-4 w-4 text-violet-400 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                          <span className="text-violet-400 font-bold text-lg">
                            {featuredEvent.price}
                          </span>{" "}
                          <Button
                            size="lg"
                            onClick={() => router.push("/demo/event")}
                            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                          >
                            View Event
                            <ExternalLink className="h-5 w-5 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Side Information Cards */}
                <div className="space-y-6">
                  <MatchScoreCard
                    score={featuredEvent.matchScore}
                    title="Event Match"
                  />
                  <BestDatesCard dates={featuredEvent.bestDates} />
                  <RecommendedPeopleCard
                    people={featuredEvent.recommendedPeople}
                  />
                </div>
              </div>
            </motion.div>
            {/* Featured Course - Turbin3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-7 w-7 text-green-400" />
                <h3 className="text-3xl font-bold text-white">
                  Recommended Learning Path
                </h3>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1">
                  Top Pick
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Course Card */}
                <div className="lg:col-span-2">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    onClick={() => toggleSelection(featuredCourse.id)}
                    className="cursor-pointer"
                  >
                    <Card
                      className={`transition-all duration-300 h-full ${
                        selectedItems.includes(featuredCourse.id)
                          ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/50 shadow-xl shadow-green-500/20"
                          : "bg-white/[0.02] backdrop-blur-xl border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                      }`}
                    >
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1">
                                {featuredCourse.type}
                              </Badge>
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 px-3 py-1">
                                Most Popular
                              </Badge>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3">
                              {featuredCourse.title}
                            </h4>
                            <p className="text-green-300 font-semibold text-lg mb-4">
                              {featuredCourse.provider}
                            </p>
                          </div>

                          {selectedItems.includes(featuredCourse.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center"
                            >
                              <CheckCircle className="h-6 w-6 text-white" />
                            </motion.div>
                          )}
                        </div>

                        <p className="text-white/70 text-base mb-6 leading-relaxed">
                          {featuredCourse.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-3 text-white/70">
                            <Clock className="h-5 w-5 text-green-400" />
                            <div>
                              <div className="text-white font-medium">
                                {featuredCourse.duration}
                              </div>
                              <div className="text-sm">
                                {featuredCourse.level}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-white/70">
                            <Users className="h-5 w-5 text-green-400" />
                            <div>
                              <div className="text-white font-medium">
                                {featuredCourse.students.toLocaleString()}{" "}
                                students
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-white/70">
                            <Star className="h-5 w-5 text-yellow-400" />
                            <div>
                              <div className="text-white font-medium">
                                {featuredCourse.rating} rating
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-white/70">
                            <Trophy className="h-5 w-5 text-green-400" />
                            <div>
                              <div className="text-white font-medium">
                                Certificate included
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <h5 className="text-white font-semibold">
                            What you'll learn:
                          </h5>
                          <ul className="space-y-2">
                            {featuredCourse.highlights.map((highlight, i) => (
                              <li
                                key={i}
                                className="text-white/70 text-sm flex items-center gap-3"
                              >
                                <Award className="h-4 w-4 text-green-400 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                          <span className="text-green-400 font-bold text-lg">
                            {featuredCourse.price}
                          </span>{" "}
                          <Button
                            size="lg"
                            onClick={() => router.push("/demo/classroom")}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
                          >
                            Start Course
                            <ExternalLink className="h-5 w-5 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Side Information Cards */}
                <div className="space-y-6">
                  <MatchScoreCard
                    score={featuredCourse.matchScore}
                    title="Course Match"
                  />
                  <BestDatesCard dates={featuredCourse.bestDates} />
                  <RecommendedPeopleCard
                    people={featuredCourse.recommendedPeople}
                  />
                </div>
              </div>
            </motion.div>{" "}
          </div>{" "}
          {/* Final Section */}
          <div className="text-center mt-12">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
              <Heart className="h-8 w-8 mx-auto mb-3 text-red-400" />
              <h3 className="text-white font-semibold mb-2">
                We'll keep you updated!
              </h3>
              <p className="text-white/70 text-sm">
                {selectedItems.length > 0
                  ? `We've noted your interest in ${selectedItems.length} item${
                      selectedItems.length !== 1 ? "s" : ""
                    }. We'll send you updates and reminders.`
                  : "Browse and select items you're interested in. We'll keep you updated on registration and new opportunities."}
              </p>
            </div>
            <Button
              size="lg"
              onClick={onNext}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-8"
            >
              Complete Onboarding
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>{" "}
            <p className="text-white/50 text-sm mt-4">
              You can always explore more events and courses from your dashboard{" "}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
