"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Play,
  Calendar,
  Clock,
  MapPin,
  Monitor,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Video,
  BookOpen,
} from "lucide-react";

interface PreferenceSelectionProps {
  onNext: (preference: "live-classes" | "pre-recorded-classes") => void;
}

export default function PreferenceSelection({
  onNext,
}: PreferenceSelectionProps) {
  const [selectedPreference, setSelectedPreference] = useState<
    "live-classes" | "pre-recorded-classes" | null
  >(null);
  const [showDetails, setShowDetails] = useState(false);

  const preferences = [
    {
      id: "live-classes" as const,
      title: "In Person Classes",
      subtitle: "Join live interactive sessions",
      description:
        "Connect with instructors and peers in real-time workshops and bootcamps",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Live instructor support",
        "Real-time Q&A sessions",
        "Network with classmates",
        "Hands-on group projects",
        "Immediate feedback",
      ],
      benefits: [
        "Interactive learning experience",
        "Build lasting connections",
        "Structured schedule",
        "Collaborative environment",
      ],
    },
    {
      id: "pre-recorded-classes" as const,
      title: "Pre Recorded Videos",
      subtitle: "Learn at your own pace",
      description:
        "Access comprehensive video courses and tutorials anytime, anywhere",
      icon: Play,
      color: "from-purple-500 to-violet-500",
      features: [
        "Self-paced learning",
        "Replay videos anytime",
        "Download for offline",
        "Closed captions available",
        "Multiple playback speeds",
      ],
      benefits: [
        "Flexible scheduling",
        "Learn from anywhere",
        "Personalized pace",
        "Cost-effective option",
      ],
    },
  ];

  const handleSelect = (
    preference: "live-classes" | "pre-recorded-classes"
  ) => {
    setSelectedPreference(preference);
    setShowDetails(true);

    // Auto advance after showing details
    setTimeout(() => {
      onNext(preference);
    }, 2000);
  };

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
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/25"
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
            <BookOpen className="h-10 w-10 text-white" />
          </motion.div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
            Choose Your Learning Style
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          How would you like to continue your Web3 education journey? Both
          options offer high-quality content to help you succeed.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showDetails ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {preferences.map((preference, index) => {
              const Icon = preference.icon;
              return (
                <motion.div
                  key={preference.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                  className="group"
                >
                  <Card className="h-full bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden relative group-hover:bg-white/[0.05]">
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${preference.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                    />

                    <CardContent className="p-8 relative z-10">
                      {/* Header with icon */}
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${preference.color} flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {preference.title}
                          </h3>
                          <p className="text-white/60 font-medium">
                            {preference.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white/80 text-lg mb-8 leading-relaxed">
                        {preference.description}
                      </p>

                      {/* Features grid */}
                      <div className="space-y-3 mb-8">
                        {preference.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.6 + featureIndex * 0.1,
                              duration: 0.4,
                            }}
                            className="flex items-center gap-3"
                          >
                            <div
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${preference.color}`}
                            />
                            <span className="text-white/70">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Select button */}
                      <Button
                        onClick={() => handleSelect(preference.id)}
                        size="lg"
                        className={`w-full bg-gradient-to-r ${preference.color} hover:opacity-90 text-white font-semibold py-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        Choose This Option
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-xl shadow-emerald-500/20"
            >
              <CheckCircle className="h-12 w-12 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Perfect Choice!
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                We're preparing your personalized{" "}
                {selectedPreference === "live-classes"
                  ? "live class"
                  : "video course"}{" "}
                recommendations...
              </p>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex justify-center gap-2 mt-8"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-emerald-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
