"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Code,
  Cpu,
  Brain,
  Award,
  Target,
  Rocket,
  Shield,
  BookOpen,
} from "lucide-react";

interface Turbin3ClassesPageProps {
  onNext: () => void;
}

export default function Turbin3ClassesPage({
  onNext,
}: Turbin3ClassesPageProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Advanced Turbin3 classes data
  const turbin3Classes = [
    {
      id: "builders-cohort",
      title: "Builder's Cohort",
      instructor: "Turbin3 Core Team",
      date: "April 1 - May 30, 2024",
      time: "8:00 PM - 10:00 PM UTC",
      duration: "8 weeks",
      type: "Intensive Cohort",
      location: "Virtual + IRL Meetups",
      spots: 12,
      totalSpots: 25,
      price: "$2,500",
      difficulty: "Intermediate to Advanced",
      description:
        "Join an elite cohort of builders creating the next generation of Solana applications. This intensive program combines theoretical knowledge with hands-on project development.",
      features: [
        "Weekly 1:1 mentorship sessions",
        "Access to exclusive Turbin3 network",
        "Real-world project development",
        "Direct feedback from industry veterans",
        "Graduation demo day presentation",
        "Lifetime access to alumni network",
      ],
      requirements: [
        "Previous Solana development experience",
        "Completed at least 2 Solana projects",
        "Strong Rust programming skills",
        "Commit 15+ hours per week",
        "Pass technical assessment",
      ],
      color: "from-emerald-500 to-teal-500",
      step: 1,
      website: "https://turbin3.com/builders-cohort",
      highlights: [
        "🏆 Flagship program",
        "🤝 1:1 mentorship",
        "🚀 Demo day",
        "🌟 Alumni network",
      ],
    },
    {
      id: "advanced-svm",
      title: "Advanced SVM Masterclass",
      instructor: "SVM Core Contributors",
      date: "June 10 - July 22, 2024",
      time: "7:00 PM - 9:00 PM UTC",
      duration: "6 weeks",
      type: "Technical Deep Dive",
      location: "Virtual",
      spots: 8,
      totalSpots: 15,
      price: "$1,800",
      difficulty: "Advanced",
      description:
        "Master the Solana Virtual Machine with deep technical insights from core contributors. Learn optimization techniques and advanced runtime concepts.",
      features: [
        "SVM internals and architecture",
        "Performance optimization techniques",
        "Advanced debugging methods",
        "Custom program loader development",
        "Security audit methodologies",
        "Direct access to SVM engineers",
      ],
      requirements: [
        "Expert-level Rust programming",
        "Previous SVM program development",
        "Understanding of blockchain internals",
        "Experience with low-level systems",
        "Technical interview required",
      ],
      color: "from-purple-500 to-violet-500",
      step: 2,
      website: "https://turbin3.com/advanced-svm",
      highlights: [
        "⚡ SVM internals",
        "🔧 Performance tuning",
        "🛡️ Security auditing",
        "👨‍💻 Core contributors",
      ],
    },
    {
      id: "pinnochio-framework",
      title: "Pinnochio Framework Mastery",
      instructor: "Pinnochio Development Team",
      date: "August 5 - September 16, 2024",
      time: "6:00 PM - 8:00 PM UTC",
      duration: "6 weeks",
      type: "Framework Specialization",
      location: "Virtual",
      spots: 10,
      totalSpots: 20,
      price: "$1,500",
      difficulty: "Advanced",
      description:
        "Become an expert in the Pinnochio framework for advanced Solana development. Learn cutting-edge patterns and contribute to the ecosystem.",
      features: [
        "Advanced framework patterns",
        "Custom middleware development",
        "Ecosystem contribution projects",
        "Framework optimization techniques",
        "Open source mentorship",
        "Community leadership training",
      ],
      requirements: [
        "Intermediate Solana development",
        "Previous framework experience",
        "Strong TypeScript/JavaScript skills",
        "Open source contribution experience",
        "Portfolio review required",
      ],
      color: "from-orange-500 to-red-500",
      step: 2,
      website: "https://turbin3.com/pinnochio-mastery",
      highlights: [
        "🎭 Framework mastery",
        "🔨 Custom middleware",
        "🌐 Open source",
        "👑 Community leadership",
      ],
    },
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Expert Mentorship",
      description: "Learn directly from industry veterans",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Rocket,
      title: "Advanced Projects",
      description: "Build production-ready applications",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Users,
      title: "Elite Network",
      description: "Connect with top builders",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Gain credibility in the ecosystem",
      color: "from-orange-500 to-amber-500",
    },
  ];

  const handleRegister = (classId: string) => {
    const classItem = turbin3Classes.find((c) => c.id === classId);
    if (classItem?.website) {
      window.open(classItem.website, "_blank", "noopener,noreferrer");
    } else {
      setSelectedClass(classId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto space-y-16"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center"
      >
        {" "}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl overflow-hidden"
        >
          <Image
            src="/turbin3.png"
            alt="Turbin3 Logo"
            width={56}
            height={56}
            className="object-contain rounded-3xl"
          />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent">
            Turbin3 Advanced Programs
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          Take your Solana development skills to the next level with intensive,
          expert-led programs designed for serious builders ready to shape the
          future of Web3.
        </p>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
            >
              <Card className="h-full bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 text-center">
                <CardContent className="p-4">
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Step 1: Builder's Cohort */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/50">
              Step 1
            </Badge>
            <h2 className="text-3xl font-bold text-white">
              Foundation Program
            </h2>
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Start with our flagship Builder&apos;s Cohort to establish your
            expertise
          </p>
        </div>

        {/* Builder's Cohort Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Card className="bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Class Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 flex items-center justify-center shadow-lg">
                      <Target className="h-8 w-8 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className="border-emerald-500/50 text-emerald-300 bg-emerald-500/10"
                        >
                          {turbin3Classes[0].difficulty}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-blue-500/50 text-blue-300 bg-blue-500/10"
                        >
                          {turbin3Classes[0].type}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {turbin3Classes[0].title}
                      </h3>
                      <p className="text-white/60 font-medium">
                        with {turbin3Classes[0].instructor}
                      </p>
                      <div className="flex gap-2 mt-3">
                        {turbin3Classes[0].highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="text-xs text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-white/80 leading-relaxed mb-6">
                    {turbin3Classes[0].description}
                  </p>

                  {/* Schedule & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-white/70">
                        <Calendar className="h-5 w-5 text-blue-400" />
                        <span>{turbin3Classes[0].date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70">
                        <Clock className="h-5 w-5 text-green-400" />
                        <span>{turbin3Classes[0].time}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-white/70">
                        <MapPin className="h-5 w-5 text-purple-400" />
                        <span>{turbin3Classes[0].location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70">
                        <Users className="h-5 w-5 text-orange-400" />
                        <span>
                          {turbin3Classes[0].spots} spots left of{" "}
                          {turbin3Classes[0].totalSpots}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      What You&apos;ll Get:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {turbin3Classes[0].features.map(
                        (feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-white/70 text-sm">
                              {feature}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Registration Card */}
                <div className="lg:col-span-1">
                  <Card className="bg-white/[0.05] backdrop-blur-xl border-emerald-500/20 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-white mb-2">
                          {turbin3Classes[0].price}
                        </div>
                        <div className="text-white/60">
                          {turbin3Classes[0].duration} intensive
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-white/70 mb-2">
                          <span>Availability</span>
                          <span>
                            {turbin3Classes[0].spots}/
                            {turbin3Classes[0].totalSpots}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${turbin3Classes[0].color}`}
                            style={{
                              width: `${
                                (turbin3Classes[0].spots /
                                  turbin3Classes[0].totalSpots) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="mb-6 flex-1">
                        <h5 className="text-sm font-semibold text-white mb-3">
                          Requirements:
                        </h5>
                        <ul className="space-y-2">
                          {turbin3Classes[0].requirements.map(
                            (req, reqIndex) => (
                              <li
                                key={reqIndex}
                                className="text-white/60 text-xs flex items-start gap-2"
                              >
                                <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                                {req}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Register Button */}
                      <Button
                        onClick={() => handleRegister(turbin3Classes[0].id)}
                        size="lg"
                        className={`w-full bg-gradient-to-r ${turbin3Classes[0].color} hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300`}
                      >
                        Apply Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Step 2: Advanced Specializations */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
              Step 2
            </Badge>
            <h2 className="text-3xl font-bold text-white">
              Advanced Specializations
            </h2>
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Choose your specialization to become an expert in your domain
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {turbin3Classes.slice(1).map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
            >
              <Card className="bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${classItem.color} flex items-center justify-center shadow-lg`}
                    >
                      {classItem.id === "advanced-svm" ? (
                        <Cpu className="h-6 w-6 text-white" />
                      ) : (
                        <Code className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className="border-orange-500/50 text-orange-300 bg-orange-500/10 text-xs"
                        >
                          {classItem.difficulty}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-blue-500/50 text-blue-300 bg-blue-500/10 text-xs"
                        >
                          {classItem.type}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {classItem.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        with {classItem.instructor}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4 flex-wrap">
                    {classItem.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1">
                    {classItem.description}
                  </p>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div className="flex items-center gap-2 text-white/60">
                      <Calendar className="h-3 w-3" />
                      <span>{classItem.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Users className="h-3 w-3" />
                      <span>{classItem.spots} spots left</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xl font-bold text-white">
                      {classItem.price}
                    </div>
                    <div className="text-white/60 text-sm">
                      {classItem.duration}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleRegister(classItem.id)}
                    size="sm"
                    className={`w-full bg-gradient-to-r ${classItem.color} hover:opacity-90 text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-300`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="text-center py-16 border-t border-white/10"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          Want to Continue Your Learning Journey?
        </h3>
        <p className="text-white/70 mb-8 max-w-2xl mx-auto">
          Ready to explore more opportunities? Continue to see your complete
          learning roadmap and discover additional resources.
        </p>
        <Button
          onClick={onNext}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-purple-500/25"
        >
          Continue to Next Steps
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
