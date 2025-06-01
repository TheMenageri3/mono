"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  UserCheck,
  Award,
  Lightbulb,
  Handshake,
  ArrowRight,
} from "lucide-react";

interface Connection {
  commendation: string;
  customMessage: string;
}

interface Attendee {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

interface ConnectionsFeedbackProps {
  connections: { [key: string]: Connection };
  onConnectionUpdate: (
    personId: string,
    field: "commendation" | "customMessage",
    value: string
  ) => void;
  onNext: () => void;
}

export default function ConnectionsFeedback({
  connections,
  onConnectionUpdate,
  onNext,
}: ConnectionsFeedbackProps) {
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);

  // Mock data for people who attended the event
  const eventAttendees: Attendee[] = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp",
      avatar: "SC",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      role: "Product Manager",
      company: "StartupXYZ",
      avatar: "MJ",
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      role: "UX Designer",
      company: "DesignStudio",
      avatar: "ER",
    },
    {
      id: "4",
      name: "David Kim",
      role: "Data Scientist",
      company: "AI Labs",
      avatar: "DK",
    },
    {
      id: "5",
      name: "Rachel Adams",
      role: "Engineering Manager",
      company: "BigTech",
      avatar: "RA",
    },
  ];

  const commendationOptions = [
    {
      id: "helpful",
      label: "Helpful",
      icon: Handshake,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "insightful",
      label: "Insightful",
      icon: Lightbulb,
      color: "from-yellow-400 to-amber-500",
    },
    {
      id: "inspiring",
      label: "Inspiring",
      icon: Award,
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "knowledgeable",
      label: "Knowledgeable",
      icon: Award,
      color: "from-emerald-400 to-emerald-600",
    },
  ];

  return (
    <motion.div
      key="connections"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 mb-4 px-4 py-1.5 text-sm">
          <UserCheck className="h-4 w-4 mr-2" />
          Connections
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Who did you connect with?
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Share your thoughts about the people you met and connected with during
          the event
        </p>
      </div>

      {/* People List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-12 space-y-4"
      >
        {eventAttendees.map((person, index) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 overflow-hidden">
              <CardContent className="p-0">
                {/* Person Header */}
                <motion.button
                  onClick={() =>
                    setExpandedPerson(
                      expandedPerson === person.id ? null : person.id
                    )
                  }
                  className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {person.avatar}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-white">
                        {person.name}
                      </h3>
                      <p className="text-sm text-white/60">
                        {person.role} at {person.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {connections[person.id]?.commendation && (
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                        <Award className="h-3 w-3 mr-1" />
                        {
                          commendationOptions.find(
                            (opt) =>
                              opt.id === connections[person.id]?.commendation
                          )?.label
                        }
                      </Badge>
                    )}
                    {expandedPerson === person.id ? (
                      <ChevronUp className="h-5 w-5 text-white/60" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white/60" />
                    )}
                  </div>
                </motion.button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedPerson === person.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-6 space-y-6">
                        {/* Commendation Options */}
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-3">
                            How would you describe this person?
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {commendationOptions.map((option) => (
                              <motion.button
                                key={option.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                  onConnectionUpdate(
                                    person.id,
                                    "commendation",
                                    option.id
                                  )
                                }
                                className={`
                                  p-3 rounded-xl border transition-all duration-200 flex items-center gap-3
                                  ${
                                    connections[person.id]?.commendation ===
                                    option.id
                                      ? `bg-gradient-to-br ${option.color} text-white border-transparent shadow-lg`
                                      : "bg-white/[0.05] border-white/20 text-white/70 hover:bg-white/[0.08] hover:border-white/30"
                                  }
                                `}
                              >
                                <option.icon className="h-4 w-4" />
                                <span className="font-medium">
                                  {option.label}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Custom Message */}
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-3">
                            Additional thoughts (optional)
                          </label>
                          <Textarea
                            placeholder="Share more about your interaction with this person..."
                            value={connections[person.id]?.customMessage || ""}
                            onChange={(e) =>
                              onConnectionUpdate(
                                person.id,
                                "customMessage",
                                e.target.value
                              )
                            }
                            className="min-h-[80px] bg-white/[0.02] border-white/20 text-white placeholder:text-white/50 focus:border-violet-500/50 resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Continue Button */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={onNext}
          className="px-12 py-6 text-lg font-bold rounded-2xl shadow-xl transition-all duration-300 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white shadow-purple-500/25"
        >
          Continue
          <ArrowRight className="ml-3 h-6 w-6" />
        </Button>
      </div>
    </motion.div>
  );
}
