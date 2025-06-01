"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Star, CheckCircle, ArrowRight } from "lucide-react";

interface Workshop {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  description: string;
}

interface WorkshopData {
  attendedWorkshops: string[];
  mostInteresting: string;
  feedback: { [key: string]: string };
}

interface WorkshopsFeedbackProps {
  workshops: WorkshopData;
  onWorkshopToggle: (workshopId: string) => void;
  onMostInterestingSelect: (workshopId: string) => void;
  onWorkshopFeedback: (workshopId: string, feedback: string) => void;
  onNext: () => void;
}

export default function WorkshopsFeedback({
  workshops,
  onWorkshopToggle,
  onMostInterestingSelect,
  onWorkshopFeedback,
  onNext,
}: WorkshopsFeedbackProps) {
  // Event workshops data
  const eventWorkshops: Workshop[] = [
    {
      id: "solana-turbin3",
      title: "Introduction to Solana with Turbin3",
      speaker: "Jack Sturtevant",
      duration: "",
      description:
        "Learn the basics of Solana Architecture, and send your first transaction",
    },
    {
      id: "ephemeral-rollups",
      title: "What are ephemeral rollups?",
      speaker: "Gabrielle Picco",
      duration: "",
      description:
        "Learn about ephemeral rollups, a tool that gives you 25x the transaction speed",
    },
    {
      id: "solana-svm",
      title: "Introduction to the SVM",
      speaker: "Berg Abman",
      duration: "",
      description:
        "Go down to the sea level, and learn what really drives solana",
    },
    {
      id: "colosseum-submission",
      title: "How to craft a perfect Colosseum Submission",
      speaker: "Matty Taylor",
      duration: "",
      description:
        "Learn from the founder of Colosseum on how to make your submission stand out",
    },
    {
      id: "nfts-future",
      title: "NFTs are dead, what comes next",
      speaker: "Coinbase Team",
      duration: "",
      description: "NFT meta is gone, learn about the future of digital assets",
    },
  ];

  return (
    <motion.div
      key="workshops"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      {" "}
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 border-violet-500/30 mb-4 px-4 py-1.5 text-sm">
          <BookOpen className="h-4 w-4 mr-2" />
          Workshops
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent">
            Which workshops did you attend?
          </span>
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Select the workshops you attended and tell us which one was your
          <span className="text-yellow-400 font-medium"> favorite</span>
        </p>
      </div>
      {/* Workshops List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-12 space-y-4"
      >
        {eventWorkshops.map((workshop, index) => {
          const isAttended = workshops.attendedWorkshops.includes(workshop.id);
          const isMostInteresting = workshops.mostInteresting === workshop.id;

          return (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              {" "}
              <Card
                className={`
                  bg-white/[0.02] backdrop-blur-xl border-white/10 overflow-hidden cursor-pointer transition-all duration-200 group
                  ${
                    isAttended
                      ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.02] to-emerald-600/[0.01] hover:from-emerald-500/[0.05] hover:to-emerald-600/[0.02] shadow-emerald-500/10 shadow-lg"
                      : "hover:bg-gradient-to-br hover:from-white/[0.05] hover:to-violet-500/[0.02] hover:border-violet-500/20 hover:shadow-violet-500/10 hover:shadow-lg"
                  }
                `}
              >
                <CardContent className="p-0">
                  {/* Main clickable area */}
                  <motion.div
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => onWorkshopToggle(workshop.id)}
                    className="p-6 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {" "}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-violet-200 transition-colors duration-200">
                            {workshop.title}
                          </h3>
                          {isAttended && (
                            <Badge className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 border-emerald-500/30 shadow-emerald-500/20 shadow-sm">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Attended
                            </Badge>
                          )}
                          {isMostInteresting && (
                            <Badge className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/30 shadow-yellow-500/20 shadow-sm">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Favorite
                            </Badge>
                          )}
                        </div>{" "}
                        <p className="text-sm text-white/60 mb-2 group-hover:text-violet-300/80 transition-colors duration-200">
                          By{" "}
                          <span className="font-medium text-violet-300">
                            {workshop.speaker}
                          </span>
                        </p>
                        <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors duration-200">
                          {workshop.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {" "}
                        {/* Favorite Star - only show if attended */}
                        {isAttended && (
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 12 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Toggle favorite: if already favorite, unfavorite it
                              onMostInterestingSelect(
                                isMostInteresting ? "" : workshop.id
                              );
                            }}
                            className="p-2 rounded-lg transition-all duration-200 hover:bg-yellow-500/10"
                          >
                            <Star
                              className={`h-6 w-6 transition-all duration-200 ${
                                isMostInteresting
                                  ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                                  : "text-white/40 hover:text-yellow-400/80 hover:drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]"
                              }`}
                            />
                          </motion.button>
                        )}
                        {/* Status indicator */}
                        <div className="flex items-center gap-2">
                          <CheckCircle
                            className={`h-5 w-5 transition-all duration-200 ${
                              isAttended
                                ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]"
                                : "text-white/30 group-hover:text-violet-400/60"
                            }`}
                          />
                          {!isAttended && (
                            <span className="text-xs text-white/50 group-hover:text-violet-300/70 transition-colors duration-200">
                              Click to mark as attended
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Workshop Feedback - only show if attended */}
                  {isAttended && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="border-t border-violet-500/20 bg-gradient-to-r from-violet-500/[0.01] to-purple-500/[0.01] p-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        What did you think of this workshop?{" "}
                        <span className="text-violet-300">(optional)</span>
                      </label>
                      <Textarea
                        placeholder="Share your thoughts about this workshop..."
                        value={workshops.feedback[workshop.id] || ""}
                        onChange={(e) =>
                          onWorkshopFeedback(workshop.id, e.target.value)
                        }
                        className="min-h-[60px] bg-white/[0.02] border-white/20 text-white placeholder:text-white/50 focus:border-violet-500/50 focus:ring-violet-500/20 resize-none transition-all duration-200"
                      />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>{" "}
      {/* Summary */}
      {workshops.attendedWorkshops.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-white/[0.02] to-violet-500/[0.02] backdrop-blur-xl border-violet-500/20 shadow-violet-500/10 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-purple-400"></div>
                Summary
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-white/80">
                  <span className="font-medium text-emerald-300">
                    Workshops attended:
                  </span>{" "}
                  <span className="text-white">
                    {workshops.attendedWorkshops.length}
                  </span>
                </p>{" "}
                {workshops.mostInteresting && (
                  <p className="text-white/80">
                    <span className="font-medium text-yellow-300">
                      Favorite workshop:
                    </span>{" "}
                    <span className="text-white">
                      {
                        eventWorkshops.find(
                          (w) => w.id === workshops.mostInteresting
                        )?.title
                      }
                    </span>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}{" "}
      {/* Submit Button */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={onNext}
          className="px-12 py-6 text-lg font-bold rounded-2xl shadow-xl transition-all duration-300 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white shadow-purple-500/25"
        >
          Submit Feedback
          <ArrowRight className="ml-3 h-6 w-6" />
        </Button>
      </div>
    </motion.div>
  );
}
