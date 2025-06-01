"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Youtube,
  Zap,
  Target,
  ExternalLink,
} from "lucide-react";

interface IntroToSolanaPageProps {
  onNext: () => void;
}

export default function IntroToSolanaPage({ onNext }: IntroToSolanaPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Video prerequisites data
  const prerequisiteVideos = [
    {
      id: "solana-basics",
      title: "What is Solana? Blockchain Fundamentals",
      instructor: "Jacob Creech",
      duration: "14:32",
      thumbnail: "/api/placeholder/320/180",
      views: "125K",
      rating: 4.9,
      description:
        "Learn the core concepts of Solana blockchain and why it's revolutionizing Web3.",
      youtubeId: "dQw4w9WgXcQ", // placeholder
    },
    {
      id: "setup-environment",
      title: "Setting Up Your Solana Development Environment",
      instructor: "Jacob Creech",
      duration: "22:15",
      thumbnail: "/api/placeholder/320/180",
      views: "89K",
      rating: 4.8,
      description:
        "Complete guide to installing Solana CLI, Rust, and your first wallet setup.",
      youtubeId: "dQw4w9WgXcQ", // placeholder
    },
    {
      id: "first-transaction",
      title: "Your First Solana Transaction",
      instructor: "Jacob Creech",
      duration: "18:45",
      thumbnail: "/api/placeholder/320/180",
      views: "76K",
      rating: 4.9,
      description:
        "Step-by-step tutorial on sending your first transaction on Solana.",
      youtubeId: "dQw4w9WgXcQ", // placeholder
    },
    {
      id: "solana-programs",
      title: "Introduction to Solana Programs",
      instructor: "Jacob Creech",
      duration: "26:30",
      thumbnail: "/api/placeholder/320/180",
      views: "65K",
      rating: 4.7,
      description:
        "Understanding smart contracts on Solana and how they differ from Ethereum.",
      youtubeId: "dQw4w9WgXcQ", // placeholder
    },
    {
      id: "tokens-nfts",
      title: "Tokens and NFTs on Solana",
      instructor: "Jacob Creech",
      duration: "31:20",
      thumbnail: "/api/placeholder/320/180",
      views: "54K",
      rating: 4.8,
      description:
        "Learn about SPL tokens, NFTs, and the Metaplex standard on Solana.",
      youtubeId: "dQw4w9WgXcQ", // placeholder
    },
  ];

  const videosPerSlide = 3;
  const totalSlides = Math.ceil(prerequisiteVideos.length / videosPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentVideos = () => {
    const startIndex = currentSlide * videosPerSlide;
    return prerequisiteVideos.slice(startIndex, startIndex + videosPerSlide);
  };

  const handleVideoClick = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto space-y-16"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-500/25"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BookOpen className="h-10 w-10 text-white" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Introduction to Solana
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-3xl md:text-4xl">
            with Jacob Creech
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8"
        >
          Explore these prerequisite videos at your own pace to get ready for
          our live classes. Master the fundamentals with expert guidance from
          Jacob Creech.
        </motion.p>

        {/* Course overview stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/[0.05] backdrop-blur-xl rounded-2xl p-6 border border-white/10 max-w-lg mx-auto"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {prerequisiteVideos.length}
              </div>
              <div className="text-white/70 text-sm">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">~2h</div>
              <div className="text-white/70 text-sm">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-400 mb-1">
                Beginner
              </div>
              <div className="text-white/70 text-sm">Level</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Video Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              Prerequisite Videos
            </h2>
            <p className="text-white/70">
              Essential foundations for Solana development
            </p>
          </motion.div>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="border-white/20 text-white/70 hover:text-white hover:border-white/40 disabled:opacity-30 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-white/60 text-sm px-3 font-medium">
              {currentSlide + 1} / {totalSlides}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="border-white/20 text-white/70 hover:text-white hover:border-white/40 disabled:opacity-30 transition-all duration-200"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Video Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getCurrentVideos().map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="group cursor-pointer"
                onClick={() => handleVideoClick(video.youtubeId)}
              >
                <Card className="h-full backdrop-blur-xl border bg-white/[0.03] border-white/10 hover:border-blue-500/30 group-hover:bg-white/[0.05] transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/20" />

                      {/* Play button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center z-10 group-hover:bg-white/30 transition-colors duration-200"
                      >
                        <Play className="h-8 w-8 text-white ml-1" />
                      </motion.div>

                      {/* YouTube badge */}
                      <div className="absolute top-3 right-3 bg-red-600 px-2 py-1 rounded text-white text-xs font-medium flex items-center gap-1">
                        <Youtube className="h-3 w-3" />
                        YouTube
                      </div>

                      {/* Duration badge */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-sm font-medium">
                        {video.duration}
                      </div>

                      {/* External link indicator */}
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge
                          variant="outline"
                          className="border-blue-500/50 text-blue-300 bg-blue-500/10 text-xs"
                        >
                          Prerequisite
                        </Badge>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">
                            {video.rating}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors line-clamp-2">
                        {video.title}
                      </h3>

                      <p className="text-white/70 text-sm mb-4 leading-relaxed line-clamp-2">
                        {video.description}
                      </p>

                      {/* Instructor and stats */}
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span className="font-medium text-blue-300">
                          by {video.instructor}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {video.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {video.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Ready for Live Classes Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="border-t border-white/10 pt-16"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/25"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Target className="h-10 w-10 text-white" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready for Live Classes!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-white/70 mb-8 max-w-2xl mx-auto"
          >
            These prerequisite videos will prepare you for our interactive live
            classes. Continue to join the Turbin3 Builders Cohort and start
            building on Solana!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <Button
              onClick={onNext}
              size="lg"
              className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-xl shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              Continue to Live Classes
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap className="h-8 w-8 text-yellow-400" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white">Pro Tips</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="space-y-3"
          >
            <h4 className="text-lg font-semibold text-white">📝 Take Notes</h4>
            <p className="text-white/70 text-sm">
              Keep track of key concepts, commands, and code snippets as you
              watch.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="space-y-3"
          >
            <h4 className="text-lg font-semibold text-white">
              💻 Practice Along
            </h4>
            <p className="text-white/70 text-sm">
              Set up your development environment and follow along with the
              examples.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="space-y-3"
          >
            <h4 className="text-lg font-semibold text-white">
              ❓ Ask Questions
            </h4>
            <p className="text-white/70 text-sm">
              Join our Discord community to discuss concepts and get help from
              peers.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="space-y-3"
          >
            <h4 className="text-lg font-semibold text-white">🔄 Review</h4>
            <p className="text-white/70 text-sm">
              Don&apos;t hesitate to rewatch sections until the concepts are
              clear.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
