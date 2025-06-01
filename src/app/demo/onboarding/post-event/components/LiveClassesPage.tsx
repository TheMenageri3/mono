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
  Video,
  MessageCircle,
  Award,
  Globe,
  Wifi,
  BookOpen,
  Target,
  Coffee,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

interface LiveClassesPageProps {
  onNext: () => void;
}

export default function LiveClassesPage({ onNext }: LiveClassesPageProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Helper function to render the appropriate icon for each class
  const renderClassIcon = (classId: string, website?: string) => {
    const imageElement = (() => {
      switch (classId) {
        case "risein-solana-bootcamp":
          return (
            <Image
              src="/risein.png"
              alt="RiseIn Logo"
              width={48}
              height={48}
              className="object-cover rounded-full w-12 h-12"
            />
          );
        case "ackee-school-solana":
          return (
            <Image
              src="/ackee.png"
              alt="Ackee Logo"
              width={48}
              height={48}
              className="object-cover rounded-full w-12 h-12"
            />
          );
        default:
          return <Calendar className="h-12 w-12 text-white/70" />;
      }
    })();

    if (website) {
      return (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {imageElement}
        </a>
      );
    }

    return imageElement;
  }; // Mock live classes data
  const upcomingClasses = [
    {
      id: "risein-solana-bootcamp",
      title: "RiseIn Solana Bootcamp",
      instructor: "RiseIn Expert Instructors",
      date: "March 15-29, 2024",
      time: "7:00 PM - 9:00 PM EST",
      duration: "2 weeks",
      type: "Elite Bootcamp",
      location: "Virtual",
      spots: 15,
      totalSpots: 50,
      price: "FREE",
      difficulty: "Beginner to Intermediate",
      description:
        "The gold standard for Solana development education. RiseIn has trained over 5,000 developers and maintains a 94% job placement rate. This intensive bootcamp covers everything from basics to advanced smart contract development.",
      features: [
        "Learn from Solana ecosystem leaders",
        "Elite cohort-based learning experience",
        "Industry-recognized RiseIn certificate",
        "Portfolio projects that get you hired",
      ],
      requirements: [
        "Basic programming knowledge helpful",
        "Interest in blockchain & crypto",
        "Stable internet connection",
      ],
      color: "from-blue-500 to-cyan-500",
      sponsor: "Solana Foundation",
      website: "https://www.risein.com/learn",
    },
    {
      id: "ackee-school-solana",
      title: "Ackee Blockchain School of Solana",
      instructor: "Ackee Blockchain Security Team",
      date: "April 8 - June 10, 2024",
      time: "6:00 PM - 8:00 PM CET",
      duration: "9 weeks",
      type: "Professional Certification",
      location: "Virtual (English)",
      spots: 8,
      totalSpots: 30,
      price: "FREE",
      difficulty: "Beginner to Advanced",
      description:
        "The most comprehensive Solana security program available. Ackee Blockchain is the #1 security auditing firm in the Solana ecosystem, having secured over $2B in TVL. Learn directly from the experts who protect the biggest protocols.",
      features: [
        "Master Rust and advanced Solana development",
        "Professional security certification from industry leaders",
        "Exclusive Solana Handbook (valued at $200)",
        "Direct pathway to security auditing roles",
      ],
      requirements: [
        "Previous programming experience required",
        "Miss no more than 2 assignments",
        "Develop a functional Solana program",
        "Complete all course requirements",
      ],
      color: "from-emerald-500 to-teal-500",
      sponsor: "Solana Foundation",
      handbook: "Solana Handbook included",
      website: "https://ackee.xyz/school-of-solana",
    },
  ];
  const benefits = [
    {
      icon: Users,
      title: "Expert-Led Instruction",
      description: "Learn from industry veterans with proven track records",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageCircle,
      title: "Interactive Learning",
      description: "Real-time Q&A and hands-on coding sessions",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Target,
      title: "Career-Focused Curriculum",
      description: "Skills that top Web3 companies actually need",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Certificates valued by leading blockchain companies",
      color: "from-orange-500 to-amber-500",
    },
  ];
  const handleRegister = (classId: string) => {
    const classItem = upcomingClasses.find((c) => c.id === classId);
    if (classItem?.website) {
      window.open(classItem.website, "_blank", "noopener,noreferrer");
    } else {
      setSelectedClass(classId);
      // Fallback for classes without website
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
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-500/25"
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
            <Users className="h-10 w-10 text-white" />
          </motion.div>
        </motion.div>{" "}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Industry-Leading Live Classes
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-6">
          The #1 destination for beginner-focused Web3 education. Join thousands
          of developers who've launched their blockchain careers through our
          expert-led workshops and bootcamps.
        </p>{" "}
        <div className="flex flex-wrap justify-center gap-8 text-center mb-8">
          <div className="text-white/90">
            <div className="text-2xl font-bold text-cyan-300">15,000+</div>
            <div className="text-sm text-white/60">Students Trained</div>
          </div>
          <div className="text-white/90">
            <div className="text-2xl font-bold text-blue-300">95%</div>
            <div className="text-sm text-white/60">Success Rate</div>
          </div>
          <div className="text-white/90">
            <div className="text-2xl font-bold text-purple-300">50+</div>
            <div className="text-sm text-white/60">Expert Instructors</div>
          </div>
          <div className="text-white/90">
            <div className="text-2xl font-bold text-green-300">200+</div>
            <div className="text-sm text-white/60">Live Bootcamps</div>
          </div>
        </div>
        {/* Industry Leader Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50 text-yellow-300 px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            #1 Web3 Educator
          </Badge>
          <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-300 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by 500+ Companies
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50 text-blue-300 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Industry Leader Since 2021
          </Badge>
        </div>
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
              {" "}
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

      {/* Upcoming Classes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {" "}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Premier Beginner Bootcamps
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Hand-picked partnerships with the most respected names in Web3
            education. These are the exact programs that have launched thousands
            of successful careers.
          </p>
        </div>
        <div className="space-y-8">
          {upcomingClasses.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
            >
              <Card className="bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Class Info */}
                    <div className="lg:col-span-2">
                      {" "}
                      <div className="flex items-start gap-4 mb-6">
                        {" "}
                        <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg hover:bg-white/10 transition-colors duration-200 overflow-hidden">
                          {renderClassIcon(classItem.id, classItem.website)}
                        </div>
                        <div className="flex-1">
                          {" "}
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className={`${
                                classItem.difficulty === "Beginner"
                                  ? "border-green-500/50 text-green-300 bg-green-500/10"
                                  : classItem.difficulty === "Intermediate"
                                  ? "border-yellow-500/50 text-yellow-300 bg-yellow-500/10"
                                  : "border-red-500/50 text-red-300 bg-red-500/10"
                              }`}
                            >
                              {classItem.difficulty}
                            </Badge>{" "}
                            <Badge
                              variant="outline"
                              className="border-blue-500/50 text-blue-300 bg-blue-500/10"
                            >
                              {classItem.type}
                            </Badge>
                          </div>{" "}
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {classItem.website ? (
                              <a
                                href={classItem.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-300 transition-colors duration-200 cursor-pointer"
                              >
                                {classItem.title}
                              </a>
                            ) : (
                              classItem.title
                            )}
                          </h3>
                          <p className="text-white/60 font-medium">
                            with {classItem.instructor}
                          </p>
                        </div>
                      </div>
                      <p className="text-white/80 leading-relaxed mb-6">
                        {classItem.description}
                      </p>
                      {/* Schedule & Location */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-white/70">
                            <Calendar className="h-5 w-5 text-blue-400" />
                            <span>{classItem.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/70">
                            <Clock className="h-5 w-5 text-green-400" />
                            <span>{classItem.time}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-white/70">
                            <MapPin className="h-5 w-5 text-purple-400" />
                            <span>{classItem.location}</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/70">
                            <Users className="h-5 w-5 text-orange-400" />
                            <span>
                              {classItem.spots} spots left of{" "}
                              {classItem.totalSpots}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          What You'll Get:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {classItem.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span className="text-white/70 text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Registration Card */}
                    <div className="lg:col-span-1">
                      <Card className="bg-white/[0.05] backdrop-blur-xl border-white/20 h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-white mb-2">
                              {classItem.price}
                            </div>
                            <div className="text-white/60">
                              {classItem.duration} intensive
                            </div>
                          </div>

                          {/* Availability */}
                          <div className="mb-6">
                            <div className="flex justify-between text-sm text-white/70 mb-2">
                              <span>Availability</span>
                              <span>
                                {classItem.spots}/{classItem.totalSpots}
                              </span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full bg-gradient-to-r ${classItem.color}`}
                                style={{
                                  width: `${
                                    (classItem.spots / classItem.totalSpots) *
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
                              {classItem.requirements.map((req, reqIndex) => (
                                <li
                                  key={reqIndex}
                                  className="text-white/60 text-xs flex items-start gap-2"
                                >
                                  <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Register Button */}
                          <Button
                            onClick={() => handleRegister(classItem.id)}
                            size="lg"
                            className={`w-full bg-gradient-to-r ${classItem.color} hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300`}
                            disabled={classItem.spots === 0}
                          >
                            {classItem.spots === 0
                              ? "Sold Out"
                              : "Register Now"}
                            {classItem.spots > 0 && (
                              <ArrowRight className="ml-2 h-5 w-5" />
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>{" "}
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-16"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Loved by Industry Leaders
          </h3>
          <p className="text-white/70">
            See what top Web3 professionals say about our programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.03] rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">
                  Sarah Martinez
                </div>
                <div className="text-white/60 text-xs">
                  Senior Developer @ Solana Labs
                </div>
              </div>
            </div>
            <p className="text-white/80 text-sm italic">
              "This program gave me the exact skills I needed to land my dream
              job at Solana Labs. The instructors are world-class."
            </p>
          </div>

          <div className="bg-white/[0.03] rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">JC</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">
                  James Chen
                </div>
                <div className="text-white/60 text-xs">
                  Blockchain Lead @ Magic Eden
                </div>
              </div>
            </div>
            <p className="text-white/80 text-sm italic">
              "The most comprehensive Web3 education I've found. Went from zero
              to shipping production code in weeks."
            </p>
          </div>

          <div className="bg-white/[0.03] rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AK</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Alex Kim</div>
                <div className="text-white/60 text-xs">
                  CTO @ Jupiter Exchange
                </div>
              </div>
            </div>
            <p className="text-white/80 text-sm italic">
              "We exclusively hire from these programs. The quality of education
              and practical skills is unmatched."
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="text-center py-16 border-t border-white/10"
      >
        {" "}
        <h3 className="text-2xl font-bold text-white mb-4">
          Ready to Join the Web3 Elite?
        </h3>
        <p className="text-white/70 mb-8 max-w-2xl mx-auto">
          These aren't just classes—they're your gateway to the most in-demand
          career in tech. Join the thousands who've already transformed their
          futures with our industry-leading programs.
        </p>{" "}
        <Button
          onClick={onNext}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/25"
        >
          See My Complete Learning Path
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
