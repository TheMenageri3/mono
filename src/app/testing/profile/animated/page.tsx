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
import { ProfileActivity } from "@/components/profile/profile-activity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Github,
  Twitter,
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
  Coffee,
  ArrowRight,
  Download,
  Plus,
  CheckCircle,
  Mail,
} from "lucide-react";

export default function AnimatedProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [scrolled, setScrolled] = useState(false);
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for the sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const offset = window.scrollY;
        setScrolled(offset > 60);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Profile data
  const profile = {
    name: "Jordan Ramirez",
    handle: "jordanbuilds",
    avatar: "https://github.com/shadcn.png",
    role: "Full-Stack Developer & Open-Source Contributor",
    location: "Seattle, WA",
    status: "Open to Collaborations",
    joined: "May 2021",
    bio: "Building useful things with code and sharing what I learn along the way. Focused on creating accessible web applications and tools that make developers' lives easier.",
    links: {
      github: "jordanbuilds",
      twitter: "jordantweets",
      portfolio: "jordan.codes",
      coffee: "jordanramirez",
    },
    stats: [
      { label: "Projects", value: 16, emoji: "🛠️" },
      { label: "Repos", value: 32, emoji: "📦" },
      { label: "Stars", value: 458, emoji: "⭐" },
    ],
    currentStatus: {
      text: "Building an open-source component library",
      progress: 75,
      emoji: "🧩",
    },
    skills: [
      {
        category: "Frontend",
        items: [
          "React",
          "TypeScript",
          "Next.js",
          "TailwindCSS",
          "Framer Motion",
          "React Query",
        ],
      },
      {
        category: "Backend",
        items: [
          "Node.js",
          "Express",
          "PostgreSQL",
          "MongoDB",
          "Prisma",
          "GraphQL",
        ],
      },
      {
        category: "Tools & Methods",
        items: [
          "Git",
          "CI/CD",
          "Testing",
          "Accessibility",
          "Performance",
          "Design Systems",
        ],
      },
    ],
    projects: [
      {
        title: "UI Component Library",
        description:
          "A comprehensive React component system with accessibility baked in",
        image: "/projects/components.png",
        variant: "blue",
        tags: ["React", "TypeScript", "Design System"],
        link: "#",
        stars: 213,
        forks: 42,
      },
      {
        title: "Developer Toolbox",
        description:
          "Collection of CLI tools to automate common development tasks",
        image: "/projects/tools.png",
        variant: "green",
        tags: ["Node.js", "CLI", "DevTools"],
        link: "#",
        stars: 128,
        forks: 26,
      },
      {
        title: "Auth Simplified",
        description: "Authentication and authorization package with simple API",
        image: "/projects/auth.png",
        variant: "purple",
        tags: ["Security", "Authentication", "NPM Package"],
        link: "#",
        stars: 117,
        forks: 19,
      },
    ],
    articles: [
      {
        title: "Building a Modern Component Library",
        excerpt:
          "Lessons learned from creating and maintaining a component system used by thousands",
        date: "March 12, 2025",
        readTime: "9 min read",
        tags: ["React", "Design Systems"],
        link: "#",
        featured: true,
      },
      {
        title: "Performance Optimization Techniques for React",
        excerpt:
          "Practical strategies to make your React applications lightning fast",
        date: "February 27, 2025",
        readTime: "12 min read",
        tags: ["React", "Performance"],
        link: "#",
        featured: false,
      },
      {
        title: "Rethinking Authentication for Modern Apps",
        excerpt:
          "A guide to implementing secure, user-friendly auth in your applications",
        date: "January 30, 2025",
        readTime: "10 min read",
        tags: ["Security", "UX"],
        link: "#",
        featured: false,
      },
    ],
    activity: [
      {
        type: "release" as const,
        title: "UI Component Library v2.0",
        date: "3 days ago",
        description: "Released with new hooks API and improved accessibility",
        link: "#",
      },
      {
        type: "article" as const,
        title: "Building a Modern Component Library",
        date: "1 week ago",
        description:
          "Shared my experience creating a component system with React and TypeScript",
        link: "#",
      },
      {
        type: "contribution" as const,
        title: "Contributed to React Query",
        date: "2 weeks ago",
        description: "Fixed a bug in the infinite query fetching mechanism",
        link: "#",
      },
    ],
    testimonials: [
      {
        author: "Sarah Chen",
        avatar: "/avatars/sarah.png",
        role: "Sr. Frontend Engineer",
        text: "Jordan's component library saved our team countless hours. The documentation is exceptional, and the accessibility features are better than most commercial offerings.",
      },
      {
        author: "Miguel Rodriguez",
        avatar: "/avatars/miguel.png",
        role: "Engineering Manager",
        text: "Working with Jordan on our open source project was fantastic. Their attention to detail and focus on developer experience really elevated the quality of our codebase.",
      },
    ],
    bookmarked: [
      {
        title: "Rethinking React Best Practices",
        author: "Dan Abramov",
        link: "#",
      },
      {
        title: "The Art of Developer Experience",
        author: "Cassidy Williams",
        link: "#",
      },
      {
        title: "Testing Strategies for Modern Applications",
        author: "Kent C. Dodds",
        link: "#",
      },
    ],
  };

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

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background">
        {/* Hero section with gradient */}
        <div className="relative">
          <motion.div
            className="h-48 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-indigo-950/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <svg
                viewBox="0 0 1000 1000"
                className="absolute left-1/3 -top-700 h-[1600px] w-[1600px] -translate-x-1/3 stroke-slate-200 dark:stroke-slate-800 [mask-image:radial-gradient(transparent,white)]"
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

          <div className="absolute -bottom-16 w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="flex flex-col sm:flex-row gap-6 items-center sm:items-end"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-70 blur-sm"></div>
                  <Avatar className="h-32 w-32 border-4 border-background relative">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-4xl">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <div className="flex-1 text-center sm:text-left mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    <p className="text-muted-foreground">@{profile.handle}</p>
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
                    <Badge variant="secondary" className="font-normal text-xs">
                      {profile.role}
                    </Badge>
                    <StatusIndicator status={profile.status} />
                  </motion.div>
                </div>

                <motion.div
                  className="flex gap-3 mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <Coffee className="h-4 w-4" />
                    <span>Support</span>
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
              </motion.div>
            </div>
          </div>
        </div>

        {/* Sticky header that appears when scrolling */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: -100 }}
          animate={{
            opacity: scrolled ? 1 : 0,
            y: scrolled ? 0 : -100,
            pointerEvents: scrolled ? "auto" : "none",
          }}
          transition={{ duration: 0.3 }}
          className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b"
        >
          <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-medium">{profile.name}</h1>
                <p className="text-xs text-muted-foreground">{profile.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSendMessage(!showSendMessage)}
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                <span className="hidden sm:inline">Message</span>
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1.5" />
                <span className="hidden sm:inline">Connect</span>
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Main content with spacer to compensate for avatar */}
        <div className="container max-w-6xl mx-auto px-4 pt-20">
          {/* Message form */}
          <AnimatePresence>
            {showSendMessage && (
              <motion.div
                className="mb-8 bg-card border rounded-lg overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      Send a message to Jordan
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left sidebar */}
            <motion.aside
              className="col-span-1 lg:col-span-3 space-y-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {/* Currently working on */}
              <motion.div variants={item}>
                <Card className="overflow-hidden border-dashed shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {profile.currentStatus.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-3.5 w-3.5 text-amber-500" />
                          <h3 className="font-medium text-sm">
                            Currently working on
                          </h3>
                        </div>
                        <p className="font-medium text-sm mb-3">
                          {profile.currentStatus.text}
                        </p>
                        <div className="space-y-1.5">
                          <div className="text-xs text-muted-foreground flex justify-between">
                            <span>Progress</span>
                            <span>{profile.currentStatus.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
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

              {/* Stats */}
              <motion.div variants={item}>
                <Card className="shadow-sm">
                  <CardContent className="p-5">
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
                <Card className="shadow-sm">
                  <CardContent className="p-5 space-y-3">
                    <a
                      href={`https://github.com/${profile.links.github}`}
                      className="flex items-center p-2 -m-2 rounded-md hover:bg-muted transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md mr-3">
                        <Github className="h-5 w-5" />
                      </div>
                      <span className="text-sm">
                        github.com/{profile.links.github}
                      </span>
                    </a>

                    <a
                      href={`https://twitter.com/${profile.links.twitter}`}
                      className="flex items-center p-2 -m-2 rounded-md hover:bg-muted transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-md mr-3">
                        <Twitter className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="text-sm">
                        twitter.com/{profile.links.twitter}
                      </span>
                    </a>

                    <a
                      href={`https://${profile.links.portfolio}`}
                      className="flex items-center p-2 -m-2 rounded-md hover:bg-muted transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-indigo-50 dark:bg-indigo-950/30 p-2 rounded-md mr-3">
                        <Code className="h-5 w-5 text-indigo-500" />
                      </div>
                      <span className="text-sm">{profile.links.portfolio}</span>
                    </a>

                    <a
                      href={`https://buymeacoffee.com/${profile.links.coffee}`}
                      className="flex items-center p-2 -m-2 rounded-md hover:bg-muted transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-amber-50 dark:bg-amber-950/30 p-2 rounded-md mr-3">
                        <Coffee className="h-5 w-5 text-amber-500" />
                      </div>
                      <span className="text-sm">
                        buymeacoffee.com/{profile.links.coffee}
                      </span>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bookmarks */}
              <motion.div variants={item}>
                <Card className="shadow-sm">
                  <CardHeader className="pb-2 pt-5 px-5">
                    <div className="flex items-center gap-2">
                      <Bookmark className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">
                        Recently Bookmarked
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 pt-2 space-y-2">
                    {profile.bookmarked.map((item, i) => (
                      <a
                        key={i}
                        href={item.link}
                        className="block p-2 -mx-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          by {item.author}
                        </div>
                      </a>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.aside>

            {/* Main content */}
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
                  <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4 mb-8">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <User className="h-4 w-4 mr-2" />
                      <span>Overview</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="projects"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      <span>Projects</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="articles"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Articles</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="testimonials"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
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
                      <TabsContent value="overview" className="m-0 space-y-8">
                        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold">
                          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                            <span>About</span>
                            <div className="h-px flex-1 bg-border"></div>
                          </h2>
                          <p className="text-lg">{profile.bio}</p>

                          <p>
                            I've been building web applications for over 8
                            years, with a focus on creating tools that help
                            other developers work more efficiently. My journey
                            started in frontend development, but I've since
                            expanded to full-stack projects with a particular
                            interest in developer experience and accessibility.
                          </p>

                          <p>
                            When I'm not coding, you can find me contributing to
                            open source projects, writing technical articles, or
                            mentoring beginner developers. I believe in building
                            in public and sharing knowledge freely.
                          </p>

                          <p>
                            My approach to software development centers around
                            three principles: accessibility first, developer
                            experience matters, and simplicity over complexity.
                            These guide everything I create.
                          </p>
                        </div>

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
                            <Card className="shadow-sm">
                              <CardContent className="p-6">
                                <ProfileSkills
                                  skills={profile.skills}
                                  displayType="grid"
                                />
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <h2 className="text-xl font-semibold">
                              Featured Project
                            </h2>
                            <Card className="shadow-sm h-full overflow-hidden">
                              <div
                                className={`bg-blue-50 dark:bg-blue-950/20 p-6 flex justify-center items-center`}
                              >
                                {profile.projects[0].image ? (
                                  <img
                                    src={profile.projects[0].image}
                                    alt={profile.projects[0].title}
                                    className="max-h-32 object-contain"
                                  />
                                ) : (
                                  <div className="text-4xl">✨</div>
                                )}
                              </div>
                              <CardContent className="p-5">
                                <h3 className="font-semibold text-lg">
                                  {profile.projects[0].title}
                                </h3>
                                <p className="text-muted-foreground mt-1.5 mb-3 text-sm">
                                  {profile.projects[0].description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                  <div className="flex items-center">
                                    <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                                    <span>
                                      {profile.projects[0].stars} stars
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <Github className="h-3.5 w-3.5 mr-1.5" />
                                    <span>
                                      {profile.projects[0].forks} forks
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                  {profile.projects[0].tags.map(
                                    (tag: string) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="font-normal text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    )
                                  )}
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full mt-2"
                                >
                                  <Github className="mr-2 h-4 w-4" />
                                  View Repository
                                </Button>
                              </CardContent>
                            </Card>
                          </motion.div>

                          <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <h2 className="text-xl font-semibold">
                              Recent Activity
                            </h2>
                            <Card className="shadow-sm h-full">
                              <CardContent className="p-5">
                                <ProfileActivity
                                  activities={profile.activity}
                                />
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      </TabsContent>

                      <TabsContent value="projects" className="m-0 space-y-8">
                        <motion.div
                          variants={container}
                          initial="hidden"
                          animate="show"
                        >
                          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                            <span>Open Source Projects</span>
                            <div className="h-px flex-1 bg-border"></div>
                          </h2>

                          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {profile.projects.map((project, i) => (
                              <motion.div key={project.title} variants={item}>
                                <ProjectCard project={project} />
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="articles" className="m-0 space-y-8">
                        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                          <span>Featured Article</span>
                          <div className="h-px flex-1 bg-border"></div>
                        </h2>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Card className="overflow-hidden shadow-sm">
                            <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 flex justify-center items-center p-6">
                              <div className="text-center max-w-md">
                                <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                                <h3 className="text-xl font-semibold">
                                  {profile.articles[0].title}
                                </h3>
                                <p className="text-muted-foreground mt-2">
                                  {profile.articles[0].excerpt}
                                </p>
                              </div>
                            </div>
                            <CardContent className="p-5">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                  {profile.articles[0].date}
                                </div>
                                <Badge
                                  variant="outline"
                                  className="font-normal text-xs"
                                >
                                  {profile.articles[0].readTime}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex gap-1.5">
                                  {profile.articles[0].tags.map(
                                    (tag: string) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="font-normal text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    )
                                  )}
                                </div>
                                <Button variant="link" className="p-0 h-auto">
                                  Read article{" "}
                                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <h2 className="text-2xl font-semibold flex items-center gap-2 mt-8 mb-6">
                          <span>All Articles</span>
                          <div className="h-px flex-1 bg-border"></div>
                        </h2>

                        <motion.div
                          className="grid gap-6"
                          variants={container}
                          initial="hidden"
                          animate="show"
                        >
                          {profile.articles.map((article, i) => (
                            <motion.div key={article.title} variants={item}>
                              <ArticleCard article={article} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </TabsContent>

                      <TabsContent
                        value="testimonials"
                        className="m-0 space-y-8"
                      >
                        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                          <span>What People Say</span>
                          <div className="h-px flex-1 bg-border"></div>
                        </h2>

                        <motion.div
                          className="grid gap-8 sm:grid-cols-2"
                          variants={container}
                          initial="hidden"
                          animate="show"
                        >
                          {profile.testimonials.map((testimonial, i) => (
                            <motion.div key={i} variants={item}>
                              <TestimonialCard testimonial={testimonial} />
                            </motion.div>
                          ))}
                        </motion.div>

                        <div className="bg-muted/50 rounded-lg border p-6 mt-8">
                          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
                            <div className="md:flex-1">
                              <h3 className="text-lg font-medium mb-2">
                                Have we worked together?
                              </h3>
                              <p className="text-muted-foreground">
                                If you've used my projects or collaborated with
                                me, I'd love to hear about your experience.
                              </p>
                            </div>
                            <Button className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              <span>Leave a testimonial</span>
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-16 mb-8 text-center text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <p>
              Last updated: April 24, 2025 •{" "}
              <a href="#" className="hover:text-foreground transition-colors">
                Changelog
              </a>
            </p>
          </motion.div>
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
  };

  return (
    <motion.div
      className="h-full border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow"
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
        <p className="text-muted-foreground mt-1.5 mb-3 text-sm">
          {project.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
            <span>{project.stars} stars</span>
          </div>
          <div className="flex items-center">
            <Github className="h-3.5 w-3.5 mr-1.5" />
            <span>{project.forks} forks</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-normal text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <Github className="mr-2 h-4 w-4" />
          View on GitHub
        </Button>
      </div>
    </motion.div>
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
            Read more <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="relative border rounded-lg p-6 bg-card shadow-sm">
      <motion.div
        className="absolute -top-3 -left-3 text-4xl text-primary/50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        "
      </motion.div>
      <div className="pt-4 space-y-4">
        <p className="italic text-muted-foreground">{testimonial.text}</p>

        <div className="flex items-center gap-3">
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
    </div>
  );
}
