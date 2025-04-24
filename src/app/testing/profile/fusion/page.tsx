"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/primitives/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileSkills } from "@/components/profile/profile-skills";
import { ProfileProjects } from "@/components/profile/profile-projects";
import { ProfileActivity } from "@/components/profile/profile-activity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Github,
  Twitter,
  Coffee,
  FileText,
  MapPin,
  User,
  Sparkles,
  Code,
  MessageSquare,
  Heart,
  Palette,
  BookOpen,
  SendHorizonal,
  Zap,
  MessagesSquare,
  Bookmark,
  ArrowRight,
  Plus,
  Download,
  Linkedin,
  ExternalLink,
  Star,
  GitFork,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

export default function FusionProfilePage() {
  const [activeTab, setActiveTab] = useState("about");
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Profile data - combining elements from both profiles
  const profile = {
    name: "Emma Rodriguez",
    handle: "emmabuilds",
    avatar: "/avatars/emma.png", // Will default to initials if not found
    role: "Design Engineer & Open Source Creator",
    location: "Portland, OR",
    status: "Working on something new ✨",
    joined: "March 2022",
    bio: "Building tools that help creative people make cool stuff. I focus on the intersection of design and code, creating accessible web applications and design systems that spark joy.",
    links: {
      github: "emmabuilds",
      twitter: "emmatweets",
      linkedin: "emmarodriguez",
      portfolio: "emma.design",
      coffee: "emmarodriguez",
    },
    stats: [
      { label: "Projects", value: 16, emoji: "🛠️" },
      { label: "Articles", value: 24, emoji: "📝" },
      { label: "Stars", value: 538, emoji: "⭐" },
    ],
    currentStatus: {
      text: "Building ColorMeUp - an accessibility-first color palette tool",
      progress: 72,
      emoji: "🎨",
    },
    highlightedWork: {
      title: "Featured in Web Design Weekly",
      link: "#",
      date: "Last week",
    },
    skills: [
      {
        category: "Design",
        items: [
          "UI/UX Design",
          "Design Systems",
          "Figma",
          "Prototyping",
          "Illustration",
          "Animation",
        ],
      },
      {
        category: "Development",
        items: [
          "React",
          "TypeScript",
          "Next.js",
          "TailwindCSS",
          "Framer Motion",
          "SVG",
        ],
      },
      {
        category: "Methods",
        items: [
          "Accessibility",
          "Design Tokens",
          "Component Architecture",
          "User Testing",
          "Technical Writing",
          "Mentoring",
        ],
      },
    ],
    projects: [
      {
        title: "ColorMeUp",
        description:
          "A color palette generator with accessibility checking built in",
        image: "/projects/colormeup.png",
        variant: "purple",
        tags: ["Color Theory", "Accessibility", "React"],
        link: "#",
        stars: 213,
        forks: 42,
        featured: true,
      },
      {
        title: "LayoutBuddy",
        description: "Visual grid and layout tool for rapid web prototyping",
        image: "/projects/layoutbuddy.png",
        variant: "blue",
        tags: ["CSS Grid", "Layouts", "Tool"],
        link: "#",
        stars: 128,
        forks: 26,
      },
      {
        title: "IconForge",
        description: "Custom SVG icon editor with animation capabilities",
        image: "/projects/iconforge.png",
        variant: "amber",
        tags: ["SVG", "Icons", "Animation"],
        link: "#",
        stars: 117,
        forks: 19,
      },
      {
        title: "Accessible UI Components",
        description: "A library of accessible, customizable React components",
        image: "/projects/components.png",
        variant: "green",
        tags: ["Accessibility", "React", "Component Library"],
        link: "#",
        stars: 304,
        forks: 57,
      },
    ],
    articles: [
      {
        title: "Designing for Playfulness",
        excerpt:
          "How to add delight to interfaces without sacrificing usability",
        date: "May 12, 2025",
        readTime: "8 min read",
        tags: ["Design", "UX"],
        link: "#",
        featured: true,
      },
      {
        title: "Building a Modern Design System",
        excerpt:
          "Lessons learned from creating a system used by thousands of developers",
        date: "April 3, 2025",
        readTime: "12 min read",
        tags: ["Design Systems", "Architecture"],
        link: "#",
      },
      {
        title: "The Art of Micro-Interactions",
        excerpt: "Small details that make a big difference in user experience",
        date: "March 18, 2025",
        readTime: "10 min read",
        tags: ["Interaction", "Animation"],
        link: "#",
      },
    ],
    activity: [
      {
        type: "release" as const,
        title: "ColorMeUp v2.0",
        date: "2 days ago",
        description:
          "Released with dark mode palette generation and contrast ratio improvements",
        link: "#",
      },
      {
        type: "article" as const,
        title: "Designing for Playfulness",
        date: "1 week ago",
        description:
          "Published an article about balancing fun and function in UI design",
        link: "#",
      },
      {
        type: "contribution" as const,
        title: "Contributed to React Aria",
        date: "2 weeks ago",
        description:
          "Added enhanced keyboard navigation to the combobox component",
        link: "#",
      },
      {
        type: "project" as const,
        title: "Started a new project: AnimTools",
        date: "3 weeks ago",
        description: "A toolkit for web animations without the complexity",
        link: "#",
      },
    ],
    testimonials: [
      {
        author: "Jamie Lee",
        avatar: "/avatars/jamie.png",
        role: "Product Designer",
        text: "Emma's color palette tool completely changed my workflow. The accessibility checks have saved me countless hours of revisions and the interface is a joy to use.",
      },
      {
        author: "Alex Kim",
        avatar: "/avatars/alex.png",
        role: "Frontend Developer",
        text: "LayoutBuddy has become an essential part of my process. I can visualize complex grids before writing a line of code, and the export options are fantastic.",
      },
      {
        author: "Sarah Chen",
        avatar: "/avatars/sarah.png",
        role: "Design Engineer",
        text: "Working with Emma on our design system was a highlight of my year. Her attention to detail and focus on developer experience really elevated the quality of our components.",
      },
    ],
    bookmarked: [
      {
        title: "Designing Beautiful Shadows",
        author: "Josh W. Comeau",
        link: "#",
      },
      {
        title: "Advanced Animation Patterns",
        author: "Sarah Drasner",
        link: "#",
      },
      {
        title: "Color Theory for Digital Interfaces",
        author: "Mia Chen",
        link: "#",
      },
    ],
    process: [
      {
        title: "Research & Discover",
        description:
          "I start by deeply understanding the problem space and user needs through research and exploration.",
        icon: "🔍",
      },
      {
        title: "Design & Prototype",
        description:
          "Next, I create low-fidelity wireframes that evolve into interactive prototypes for testing.",
        icon: "✏️",
      },
      {
        title: "Build & Refine",
        description:
          "I develop using modern frameworks with a focus on accessibility, performance, and maintainability.",
        icon: "🛠️",
      },
      {
        title: "Test & Iterate",
        description:
          "Finally, I test with real users, gather feedback, and iterate to improve the experience.",
        icon: "🔄",
      },
    ],
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const processVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const processItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background">
        {/* Hero section with gradient wave */}
        <div className="relative">
          <motion.div
            className="h-64 bg-gradient-to-r from-purple-50/70 via-blue-50/70 to-pink-50/70 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-pink-950/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <svg
                viewBox="0 0 1000 1000"
                className="absolute left-1/3 -top-700 h-[1600px] w-[1600px] -translate-x-1/3 stroke-slate-200 dark:stroke-slate-800/30 [mask-image:radial-gradient(transparent,white)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="100"
                    height="100"
                    patternUnits="userSpaceOnUse"
                    x="50%"
                    y="50%"
                    patternTransform="translate(0 0)"
                  >
                    <path d="M.5 200V.5H200" fill="none"></path>
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="0"
                  fill="url(#grid)"
                ></rect>
              </svg>
            </motion.div>
          </motion.div>

          {/* Wavy divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 60"
              className="w-full h-auto"
            >
              <path
                fill="hsl(var(--background))"
                fillOpacity="1"
                d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,32C840,21,960,11,1080,16C1200,21,1320,43,1380,53.3L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
              ></path>
            </svg>
          </div>

          {/* Profile basics positioned on the wave */}
          <div className="absolute -bottom-24 w-full">
            <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center sm:items-end gap-6">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  duration: 0.5,
                }}
              >
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70 blur group-hover:opacity-100 transition duration-200"></div>
                <Avatar className="h-36 w-36 border-4 border-background relative">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-4xl">
                    {profile.name.charAt(0) +
                      profile.name.split(" ")[1].charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="flex-1 text-center sm:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-3xl font-bold tracking-tight">
                    {profile.name}
                  </h1>
                  <div className="flex items-center gap-2 justify-center sm:justify-start mt-1">
                    <p className="text-muted-foreground">@{profile.handle}</p>
                    <Badge variant="secondary" className="font-normal text-xs">
                      Joined {profile.joined}
                    </Badge>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-wrap items-center gap-3 mt-3 justify-center sm:justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    {profile.location}
                  </div>
                  <Badge variant="outline" className="font-normal text-xs">
                    {profile.role}
                  </Badge>
                  <StatusIndicator status={profile.status} />
                </motion.div>
              </div>

              <motion.div
                className="flex gap-2 mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>Resume</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Connect</span>
                </Button>
                <Button
                  size="sm"
                  className="gap-2"
                  onClick={() => setShowSendMessage(!showSendMessage)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Message</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main content with spacer to compensate for avatar */}
        <div className="container max-w-6xl mx-auto px-4 pt-32">
          {/* Message form */}
          <AnimatePresence>
            {showSendMessage && (
              <motion.div
                className="mb-8 bg-card border rounded-lg overflow-hidden shadow-md"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-medium">
                      Send a message to Emma
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setShowSendMessage(false)}
                    >
                      <MessagesSquare className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Input placeholder="Subject" />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Write your message here..."
                        className="min-h-[120px]"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button className="gap-2">
                        <SendHorizonal className="h-4 w-4" />
                        <span>Send Message</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Featured work highlight */}
          {profile.highlightedWork && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <a
                href={profile.highlightedWork.link}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-primary/5 hover:bg-primary/10 border border-primary/10 text-primary rounded-full text-sm font-medium transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {profile.highlightedWork.title} •{" "}
                  {profile.highlightedWork.date}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          )}

          {/* Currently working on */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="overflow-hidden border-dashed shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="text-4xl mb-2 sm:mb-0">
                    {profile.currentStatus.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <h3 className="font-medium">Currently working on</h3>
                    </div>
                    <p className="text-lg font-medium mb-5">
                      {profile.currentStatus.text}
                    </p>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground flex justify-between">
                        <span>Progress</span>
                        <span>{profile.currentStatus.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${profile.currentStatus.progress}%`,
                          }}
                          transition={{
                            delay: 0.5,
                            duration: 1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left sidebar */}
            <motion.aside
              className="col-span-1 lg:col-span-3 space-y-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {/* Stats */}
              <motion.div variants={item}>
                <Card className="shadow-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-4">
                      {profile.stats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          className="text-center group cursor-pointer"
                          whileHover={{ y: -2 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <p className="text-2xl mb-1">{stat.emoji}</p>
                            <p className="text-lg font-medium group-hover:text-primary transition-colors">
                              {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {stat.label}
                            </p>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Links */}
              <motion.div variants={item}>
                <Card className="shadow-sm overflow-hidden">
                  <CardContent className="p-6 space-y-3.5">
                    <a
                      href={`https://github.com/${profile.links.github}`}
                      className="flex items-center p-2 -m-2 rounded-md hover:bg-muted transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md mr-3 shrink-0">
                        <Github className="h-5 w-5" />
                      </div>
                      <span className="text-sm truncate">
                        github.com/{profile.links.github}
                      </span>
                    </a>

                    <a
                      href={`https://twitter.com/${profile.links.twitter}`}
                      className="flex items-center p-2 -m-2 rounded-md hover:bg-muted transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-md mr-3 shrink-0">
                        <Twitter className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="text-sm truncate">
                        twitter.com/{profile.links.twitter}
                      </span>
                    </a>

                    <a
                      href={`https://linkedin.com/in/${profile.links.linkedin}`}
                      className="flex items-center p-2 -m-2 rounded-md hover:bg-muted transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-md mr-3 shrink-0">
                        <Linkedin className="h-5 w-5 text-blue-700" />
                      </div>
                      <span className="text-sm truncate">
                        linkedin.com/in/{profile.links.linkedin}
                      </span>
                    </a>

                    <a
                      href={`https://${profile.links.portfolio}`}
                      className="flex items-center p-2 -m-2 rounded-md hover:bg-muted transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded-md mr-3 shrink-0">
                        <Palette className="h-5 w-5 text-purple-500" />
                      </div>
                      <span className="text-sm truncate">
                        {profile.links.portfolio}
                      </span>
                    </a>

                    <a
                      href={`https://buymeacoffee.com/${profile.links.coffee}`}
                      className="flex items-center p-2 -m-2 rounded-md hover:bg-muted transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-amber-50 dark:bg-amber-950/30 p-2 rounded-md mr-3 shrink-0">
                        <Coffee className="h-5 w-5 text-amber-500" />
                      </div>
                      <span className="text-sm truncate">
                        buymeacoffee.com/{profile.links.coffee}
                      </span>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bookmarks */}
              <motion.div variants={item}>
                <Card className="shadow-sm overflow-hidden">
                  <CardHeader className="pb-2 pt-5 px-6">
                    <div className="flex items-center gap-2">
                      <Bookmark className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">
                        Reading List
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-3 space-y-3">
                    {profile.bookmarked.map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.link}
                        className="block p-2 -mx-2 rounded-md hover:bg-muted transition-colors"
                        whileHover={{ x: 3 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          by {item.author}
                        </div>
                      </motion.a>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.aside>

            {/* Main content area */}
            <div className="col-span-1 lg:col-span-9">
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4 mb-8 bg-muted/50">
                    <TabsTrigger
                      value="about"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
                    >
                      <User className="h-4 w-4 mr-2" />
                      <span>About</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="projects"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      <span>Projects</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="articles"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Articles</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="testimonials"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      <span>Testimonials</span>
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TabsContent value="about" className="m-0 space-y-10">
                        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold">
                          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                            <span>About</span>
                            <div className="h-px flex-1 bg-border"></div>
                          </h2>
                          <p className="text-lg">{profile.bio}</p>

                          <p>
                            After five years as a digital product designer at
                            various agencies, I decided to dive deeper into
                            development and haven&apos;t looked back. I&apos;m
                            passionate about building tools that make design and
                            development more accessible, especially for people
                            who think visually.
                          </p>

                          <p>
                            My work sits at the intersection of design and
                            engineering, focusing on creating systems and tools
                            that enable creative expression while maintaining
                            technical excellence. I believe the best tools feel
                            like an extension of your creativity rather than
                            technical obstacles.
                          </p>

                          <p>
                            When I&apos;m not coding or designing, you&apos;ll
                            find me hiking the Pacific Northwest trails, brewing
                            unnecessarily elaborate coffee, or illustrating
                            quirky characters for my side projects.
                          </p>
                        </div>

                        <motion.div
                          className="space-y-5"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <span>My Process</span>
                            <div className="h-px flex-1 bg-border"></div>
                          </h2>

                          <motion.div
                            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6"
                            variants={processVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                          >
                            {profile.process.map((step, index) => (
                              <motion.div
                                key={step.title}
                                className="border rounded-lg p-5 hover:border-primary/50 transition-colors"
                                variants={processItemVariants}
                              >
                                <div className="text-3xl mb-3">{step.icon}</div>
                                <h3 className="text-lg font-medium mb-2">
                                  {index + 1}. {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {step.description}
                                </p>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>

                        <div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                              <span>Skills & Expertise</span>
                              <div className="h-px flex-1 bg-border"></div>
                            </h2>
                            <Card className="shadow-sm overflow-hidden">
                              <CardContent className="p-6">
                                <ProfileSkills
                                  skills={profile.skills}
                                  displayType="grid"
                                />
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>

                        <motion.div
                          className="space-y-5"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <span>Recent Activity</span>
                            <div className="h-px flex-1 bg-border"></div>
                          </h2>
                          <Card className="shadow-sm overflow-hidden">
                            <CardContent className="p-6">
                              <ProfileActivity
                                activities={profile.activity.slice(0, 3)}
                              />
                            </CardContent>
                          </Card>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="projects" className="m-0 space-y-10">
                        <div>
                          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                            <span>Featured Project</span>
                            <div className="h-px flex-1 bg-border"></div>
                          </h2>

                          {/* Featured project */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {profile.projects
                              .filter((p) => p.featured)
                              .map((project) => (
                                <FeaturedProjectCard
                                  key={project.title}
                                  project={project}
                                />
                              ))}
                          </motion.div>
                        </div>

                        <motion.div
                          variants={container}
                          initial="hidden"
                          animate="show"
                        >
                          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                            <span>All Projects</span>
                            <div className="h-px flex-1 bg-border"></div>
                          </h2>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {profile.projects.map((project, i) => (
                              <motion.div key={project.title} variants={item}>
                                <ProjectCard project={project} />
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="articles" className="m-0 space-y-10">
                        <div>
                          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                            <span>Featured Article</span>
                            <div className="h-px flex-1 bg-border"></div>
                          </h2>

                          {/* Featured article */}
                          {profile.articles
                            .filter((a) => a.featured)
                            .map((article) => (
                              <motion.div
                                key={article.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <FeaturedArticleCard article={article} />
                              </motion.div>
                            ))}
                        </div>

                        <div>
                          <h2 className="text-2xl font-semibold flex items-center gap-2 mt-8 mb-6">
                            <span>All Articles</span>
                            <div className="h-px flex-1 bg-border"></div>
                          </h2>

                          <motion.div
                            className="grid gap-6"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                          >
                            {profile.articles.map((article, i) => (
                              <motion.div key={article.title} variants={item}>
                                <ArticleCard article={article} />
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>

                        <motion.div
                          className="rounded-xl border bg-muted/40 p-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="text-3xl">📬</div>
                            <div className="flex-1">
                              <h3 className="text-lg font-medium">
                                Subscribe to my newsletter
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                Get notified when I publish new articles and
                                resources.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Email address"
                                className="w-auto min-w-[200px]"
                              />
                              <Button>Subscribe</Button>
                            </div>
                          </div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent
                        value="testimonials"
                        className="m-0 space-y-8"
                      >
                        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-8">
                          <span>What People Say</span>
                          <div className="h-px flex-1 bg-border"></div>
                        </h2>

                        <motion.div
                          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="show"
                        >
                          {profile.testimonials.map((testimonial, i) => (
                            <motion.div key={i} variants={item}>
                              <TestimonialCard testimonial={testimonial} />
                            </motion.div>
                          ))}
                        </motion.div>

                        <motion.div
                          className="rounded-lg border p-8 mt-10 text-center"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <div className="max-w-lg mx-auto">
                            <h3 className="text-xl font-medium mb-3">
                              Have we worked together?
                            </h3>
                            <p className="text-muted-foreground mb-6">
                              If you&apos;ve used my projects or collaborated
                              with me, I&apos;d love to hear about your
                              experience. Your feedback helps me improve and
                              helps others discover my work.
                            </p>
                            <Button className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              <span>Leave a testimonial</span>
                            </Button>
                          </div>
                        </motion.div>
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </motion.div>
            </div>
          </div>

          <motion.footer
            className="mt-20 mb-8 text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex justify-center gap-3">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Home
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Projects
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Articles
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Contact
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              Last updated: April 24, 2025 •{" "}
              <a href="#" className="hover:text-foreground transition-colors">
                Changelog
              </a>
            </p>
          </motion.footer>
        </div>
      </div>
    </MotionConfig>
  );
}

function StatusIndicator({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <span className="relative flex h-2.5 w-2.5">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>
      <span className="text-emerald-600 dark:text-emerald-400">{status}</span>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  const variants = {
    blue: "from-blue-100 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30",
    green:
      "from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30",
    purple:
      "from-purple-100 to-fuchsia-100 dark:from-purple-950/30 dark:to-fuchsia-950/30",
    amber:
      "from-amber-100 to-yellow-100 dark:from-amber-950/30 dark:to-yellow-950/30",
  };

  return (
    <motion.div
      className="h-full border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-all"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div
        className={`bg-gradient-to-br h-36 flex items-center justify-center p-6 ${
          variants[project.variant as keyof typeof variants]
        }`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="max-h-24 object-contain"
          />
        ) : (
          <div className="text-4xl">✨</div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <p className="text-muted-foreground mt-1.5 mb-3 text-sm line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
            <span>{project.stars}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="h-3.5 w-3.5 mr-1.5" />
            <span>{project.forks}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 3).map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-normal text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full gap-1 group">
          <Github className="mr-1 h-4 w-4" />
          View Project
          <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </Button>
      </div>
    </motion.div>
  );
}

function FeaturedProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="grid md:grid-cols-2">
        <div
          className={`bg-gradient-to-br h-48 md:h-auto flex items-center justify-center p-6 
          ${
            project.variant === "purple"
              ? "from-purple-100 to-fuchsia-100 dark:from-purple-950/30 dark:to-fuchsia-950/30"
              : "from-blue-100 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30"
          }`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center w-full h-full"
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="max-h-48 object-contain"
              />
            ) : (
              <div className="text-6xl">✨</div>
            )}
          </motion.div>
        </div>

        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-1 mb-1 text-sm text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Featured Project</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-muted-foreground mb-4">{project.description}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1.5 text-amber-500" />
                <span>{project.stars} stars</span>
              </div>
              <div className="flex items-center">
                <GitFork className="h-4 w-4 mr-1.5" />
                <span>{project.forks} forks</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <Button className="gap-2">
                <Code className="mr-1 h-4 w-4" />
                View Project
              </Button>
              <Button variant="outline">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}

function ArticleCard({ article }: { article: any }) {
  return (
    <motion.div
      className="border rounded-lg hover:border-primary/30 transition-all group bg-card shadow-sm"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div className="text-sm text-muted-foreground">{article.date}</div>
          </div>
          <Badge variant="outline" className="font-normal text-xs">
            {article.readTime}
          </Badge>
        </div>

        <h3 className="mt-3 text-lg font-semibold group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1.5">
            {article.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-normal text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Button variant="link" className="p-0 h-auto text-sm">
            Read article <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedArticleCard({ article }: { article: any }) {
  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="font-normal px-2 py-1">
              Featured
            </Badge>
            <span className="text-sm text-muted-foreground">
              {article.date}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {article.readTime}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {article.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {article.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>

            <Button className="gap-2">
              <BookOpen className="h-4 w-4" />
              Read article
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <motion.div
      className="relative border rounded-lg p-6 bg-card shadow-sm h-full"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="mb-1 mt-2">
        <Lightbulb className="h-6 w-6 text-amber-400" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute -top-3 right-6 text-5xl text-primary/10"
      >
        &quot;
      </motion.div>
      <div className="space-y-4">
        <p className="italic text-muted-foreground leading-relaxed">
          {testimonial.text}
        </p>

        <div className="flex items-center gap-3 pt-4 border-t mt-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
            <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{testimonial.author}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
