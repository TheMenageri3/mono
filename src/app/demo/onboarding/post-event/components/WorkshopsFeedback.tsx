"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Star, Clock, CheckCircle, ArrowRight } from "lucide-react";

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
  // Mock data for workshops at the event
  const eventWorkshops: Workshop[] = [
    {
      id: "react-advanced",
      title: "Advanced React Patterns",
      speaker: "Sarah Chen",
      duration: "2 hours",
      description:
        "Deep dive into advanced React patterns and performance optimization",
    },
    {
      id: "ai-integration",
      title: "AI Integration in Modern Apps",
      speaker: "Marcus Johnson",
      duration: "90 minutes",
      description: "How to integrate AI tools and APIs into your applications",
    },
    {
      id: "ux-design",
      title: "UX Design for Developers",
      speaker: "Elena Rodriguez",
      duration: "1.5 hours",
      description: "Essential UX principles every developer should know",
    },
    {
      id: "data-science",
      title: "Data Science Fundamentals",
      speaker: "David Kim",
      duration: "2 hours",
      description: "Introduction to data science concepts and tools",
    },
    {
      id: "leadership",
      title: "Technical Leadership",
      speaker: "Rachel Adams",
      duration: "1 hour",
      description: "Growing from individual contributor to technical leader",
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
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 mb-4 px-4 py-1.5 text-sm">
          <BookOpen className="h-4 w-4 mr-2" />
          Workshops
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Which workshops did you attend?
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Select the workshops you attended and tell us which one was most
          interesting
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
              <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {workshop.title}
                        </h3>
                        {isAttended && (
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Attended
                          </Badge>
                        )}
                        {isMostInteresting && (
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                            <Star className="h-3 w-3 mr-1" />
                            Most Interesting
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-white/60 mb-2">
                        By {workshop.speaker} •{" "}
                        <Clock className="h-3 w-3 inline mr-1" />
                        {workshop.duration}
                      </p>
                      <p className="text-white/70 text-sm">
                        {workshop.description}
                      </p>

                      {/* Workshop Feedback - only show if attended */}
                      {isAttended && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="mt-4"
                        >
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            What did you think of this workshop? (optional)
                          </label>
                          <Textarea
                            placeholder="Share your thoughts about this workshop..."
                            value={workshops.feedback[workshop.id] || ""}
                            onChange={(e) =>
                              onWorkshopFeedback(workshop.id, e.target.value)
                            }
                            className="min-h-[60px] bg-white/[0.02] border-white/20 text-white placeholder:text-white/50 focus:border-violet-500/50 resize-none"
                          />
                        </motion.div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {/* Attend Workshop Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onWorkshopToggle(workshop.id)}
                        className={`
                          px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2
                          ${
                            isAttended
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                              : "bg-white/[0.05] text-white/70 border border-white/20 hover:bg-white/[0.08]"
                          }
                        `}
                      >
                        <CheckCircle className="h-4 w-4" />
                        {isAttended ? "Attended" : "Mark as Attended"}
                      </motion.button>

                      {/* Most Interesting Button - only show if attended */}
                      {isAttended && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onMostInterestingSelect(workshop.id)}
                          className={`
                            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2
                            ${
                              isMostInteresting
                                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 hover:bg-yellow-500/30"
                                : "bg-white/[0.05] text-white/70 border border-white/20 hover:bg-white/[0.08]"
                            }
                          `}
                        >
                          <Star className="h-4 w-4" />
                          {isMostInteresting
                            ? "Most Interesting"
                            : "Mark as Most Interesting"}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
      {/* Summary */}
      {workshops.attendedWorkshops.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Summary</h3>
              <div className="space-y-2 text-sm">
                <p className="text-white/80">
                  <span className="font-medium">Workshops attended:</span>{" "}
                  {workshops.attendedWorkshops.length}
                </p>
                {workshops.mostInteresting && (
                  <p className="text-white/80">
                    <span className="font-medium">Most interesting:</span>{" "}
                    {
                      eventWorkshops.find(
                        (w) => w.id === workshops.mostInteresting
                      )?.title
                    }
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
