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
  ExternalLink,
  Download,
  Bookmark,
  CheckCircle,
  TrendingUp,
  Globe,
  Cpu,
  Shield,
  Coins,
} from "lucide-react";

interface PreRecordedClassesPageProps {
  onNext: () => void;
}

export default function PreRecordedClassesPage({
  onNext,
}: PreRecordedClassesPageProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Mock YouTube video data
  const videoCategories = [
    {
      title: "Solana Fundamentals",
      description: "Master the basics of Solana blockchain development",
      videos: [
        {
          id: "solana-intro",
          title: "Introduction to Solana: The World's Fastest Blockchain",
          thumbnail: "/api/placeholder/320/180",
          duration: "12:45",
          views: "45.2K",
          instructor: "Sarah Chen",
          rating: 4.9,
          difficulty: "Beginner",
          description:
            "Learn why Solana is revolutionizing blockchain technology with its high speed and low costs.",
        },
        {
          id: "solana-setup",
          title: "Setting Up Your Solana Development Environment",
          thumbnail: "/api/placeholder/320/180",
          duration: "18:30",
          views: "32.1K",
          instructor: "Marcus Johnson",
          rating: 4.8,
          difficulty: "Beginner",
          description:
            "Complete guide to installing Solana CLI, Rust, and setting up your first Solana project.",
        },
        {
          id: "solana-programs",
          title: "Building Your First Solana Program",
          thumbnail: "/api/placeholder/320/180",
          duration: "25:15",
          views: "28.7K",
          instructor: "Elena Rodriguez",
          rating: 4.9,
          difficulty: "Intermediate",
          description:
            "Step-by-step tutorial on creating and deploying your first Solana smart contract.",
        },
      ],
    },
    {
      title: "Advanced Solana",
      description: "Deep dive into advanced Solana development techniques",
      videos: [
        {
          id: "solana-anchor",
          title: "Mastering Anchor Framework for Solana",
          thumbnail: "/api/placeholder/320/180",
          duration: "34:20",
          views: "19.5K",
          instructor: "David Kim",
          rating: 4.7,
          difficulty: "Advanced",
          description:
            "Learn the Anchor framework to build production-ready Solana applications.",
        },
        {
          id: "solana-defi",
          title: "Building DeFi Applications on Solana",
          thumbnail: "/api/placeholder/320/180",
          duration: "42:10",
          views: "15.3K",
          instructor: "Rachel Adams",
          rating: 4.8,
          difficulty: "Advanced",
          description:
            "Create sophisticated DeFi protocols using Solana's high-performance capabilities.",
        },
      ],
    },
  ];

  // Solana articles data
  const solanaArticles = [
    {
      title: "Why Solana is the Future of Blockchain",
      excerpt:
        "Discover how Solana's unique Proof of History consensus mechanism enables unprecedented transaction speeds of 65,000 TPS.",
      readTime: "5 min read",
      category: "Technology",
      image: "/api/placeholder/400/250",
      featured: true,
    },
    {
      title: "Solana vs Ethereum: A Developer's Perspective",
      excerpt:
        "Compare development experience, costs, and performance between Solana and Ethereum ecosystems.",
      readTime: "7 min read",
      category: "Comparison",
      image: "/api/placeholder/400/250",
      featured: false,
    },
    {
      title: "Building Scalable dApps on Solana",
      excerpt:
        "Best practices and architectural patterns for creating high-performance decentralized applications.",
      readTime: "10 min read",
      category: "Development",
      image: "/api/placeholder/400/250",
      featured: false,
    },
    {
      title: "Solana's Growing Ecosystem in 2024",
      excerpt:
        "Explore the latest projects, tools, and opportunities in the rapidly expanding Solana ecosystem.",
      readTime: "6 min read",
      category: "Ecosystem",
      image: "/api/placeholder/400/250",
      featured: false,
    },
  ];

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
    // Here you would typically open a video player or navigate to video page
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
          className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-xl shadow-purple-500/25"
        >
          <Play className="h-10 w-10 text-white" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent">
            Video Learning Library
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          Access our comprehensive collection of Solana development courses and
          tutorials. Learn at your own pace with expert-led content.
        </p>
      </motion.div>

      {/* Video Categories */}
      <div className="space-y-12">
        {videoCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + categoryIndex * 0.2, duration: 0.6 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">
                {category.title}
              </h2>
              <p className="text-white/70 text-lg">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.videos.map((video, videoIndex) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + videoIndex * 0.1, duration: 0.4 }}
                  className="group cursor-pointer"
                  onClick={() => handleVideoClick(video.id)}
                >
                  <Card className="h-full bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden group-hover:bg-white/[0.05]">
                    <CardContent className="p-0">
                      {/* Video Thumbnail */}
                      <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/20" />
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center z-10"
                        >
                          <Play className="h-8 w-8 text-white ml-1" />
                        </motion.div>

                        {/* Duration badge */}
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-sm font-medium">
                          {video.duration}
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <Badge
                            variant="outline"
                            className={`${
                              video.difficulty === "Beginner"
                                ? "border-green-500/50 text-green-300 bg-green-500/10"
                                : video.difficulty === "Intermediate"
                                ? "border-yellow-500/50 text-yellow-300 bg-yellow-500/10"
                                : "border-red-500/50 text-red-300 bg-red-500/10"
                            }`}
                          >
                            {video.difficulty}
                          </Badge>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                          {video.title}
                        </h3>

                        <p className="text-white/70 text-sm mb-4 leading-relaxed">
                          {video.description}
                        </p>

                        {/* Instructor and stats */}
                        <div className="flex items-center justify-between text-sm text-white/60">
                          <span>by {video.instructor}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {video.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400" />
                              {video.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Solana Articles Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="border-t border-white/10 pt-16"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              Solana Deep Dive Articles
            </h2>
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Enhance your learning with in-depth articles covering Solana
            technology, development best practices, and ecosystem insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="lg:row-span-2"
          >
            <Card className="h-full bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-blue-500/30 transition-all duration-300 overflow-hidden group cursor-pointer">
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-500 text-white">Featured</Badge>
                  </div>
                </div>
                <div className="p-8">
                  <Badge
                    variant="outline"
                    className="border-blue-500/50 text-blue-300 bg-blue-500/10 mb-4"
                  >
                    {solanaArticles[0].category}
                  </Badge>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">
                    {solanaArticles[0].title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-6">
                    {solanaArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">
                      {solanaArticles[0].readTime}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-300 hover:text-blue-200"
                    >
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Other Articles */}
          <div className="space-y-6">
            {solanaArticles.slice(1).map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              >
                <Card className="bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Badge
                          variant="outline"
                          className="border-white/30 text-white/70 bg-white/5 mb-3 text-xs"
                        >
                          {article.category}
                        </Badge>
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white/80 transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-white/60 text-sm leading-relaxed mb-3">
                          {article.excerpt}
                        </p>
                        <span className="text-white/50 text-xs">
                          {article.readTime}
                        </span>
                      </div>
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                        <ExternalLink className="h-6 w-6 text-white/40" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="text-center py-16 border-t border-white/10"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          Ready to Start Learning?
        </h3>
        <p className="text-white/70 mb-8 max-w-2xl mx-auto">
          You now have access to our complete video library and article
          collection. Continue to see your personalized learning path.
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
