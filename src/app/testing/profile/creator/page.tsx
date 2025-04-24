"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

export default function CreatorProfilePage() {
  const [activeTab, setActiveTab] = useState("about");
  const [showSendMessage, setShowSendMessage] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Profile data
  const profile = {
    name: "Emma Rodriguez",
    handle: "emmabuilds",
    avatar: "/avatars/emma.png", // Fallback to initials if this doesn't exist
    role: "Design Engineer & Indie Maker",
    location: "Portland, OR",
    status: "Working on something new ✨",
    joined: "March 2022",
    bio: "Building tools that help creative people make cool stuff. Former designer turned developer with a soft spot for quirky interfaces and thoughtful interactions. I love sharing what I learn along the way.",
    links: {
      github: "idkman",
      twitter: "idk",
      portfolio: "emma.design",
      coffee: "i think people giv em mone",
    },
    stats: [
      { label: "Projects", value: 14, emoji: "🛠️" },
      { label: "Articles", value: 23, emoji: "📝" },
      { label: "Bookmarks", value: 142, emoji: "🔖" },
    ],
    currentStatus: {
      text: "Building a design tool for developers",
      progress: 65,
      emoji: "🎨",
    },
    skills: [
      {
        category: "Design",
        items: [
          "UI/UX",
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
          "CSS/Tailwind",
          "Next.js",
          "Node.js",
          "SVG",
        ],
      },
      {
        category: "Other",
        items: [
          "Storytelling",
          "Technical Writing",
          "Community Building",
          "Product Strategy",
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
        tags: ["Color Theory", "Accessibility", "Tool"],
        link: "#",
      },
      {
        title: "LayoutBuddy",
        description: "Visual grid and layout tool for rapid web prototyping",
        image: "/projects/layoutbuddy.png",
        variant: "blue",
        tags: ["CSS Grid", "Layouts", "Tool"],
        link: "#",
      },
      {
        title: "IconForge",
        description: "Custom SVG icon editor with animation capabilities",
        image: "/projects/iconforge.png",
        variant: "amber",
        tags: ["SVG", "Icons", "Animation"],
        link: "#",
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
      },
      {
        title: "CSS Grid: The Ultimate Layout Tool",
        excerpt: "A deep dive into creating complex layouts with simple CSS",
        date: "April 3, 2025",
        readTime: "12 min read",
        tags: ["CSS", "Development"],
        link: "#",
      },
      {
        title: "Building a Design System from Scratch",
        excerpt: "Lessons learned from creating a system that scales",
        date: "March 18, 2025",
        readTime: "15 min read",
        tags: ["Design Systems", "Process"],
        link: "#",
      },
    ],
    activity: [
      {
        type: "project" as const,
        title: "Started a new project: AnimTools",
        date: "2 days ago",
        description: "A toolkit for web animations without the complexity",
        link: "#",
      },
      {
        type: "article" as const,
        title: "Published: The Joy of Creative Coding",
        date: "1 week ago",
        description: "Why coding can be as expressive as traditional art forms",
        link: "#",
      },
      {
        type: "release" as const,
        title: "IconForge 2.0 Released",
        date: "2 weeks ago",
        description: "Major update with animation timeline and batch export",
        link: "#",
      },
    ],
    testimonials: [
      {
        author: "Jamie Lee",
        avatar: "/avatars/jamie.png",
        role: "Product Designer",
        text: "Emma's color palette tool completely changed my workflow. The accessibility checks have saved me countless hours of revisions.",
      },
      {
        author: "Alex Kim",
        avatar: "/avatars/alex.png",
        role: "Frontend Developer",
        text: "LayoutBuddy has become an essential part of my process. I can visualize complex grids before writing a line of code.",
      },
    ],
    bookmarked: [
      {
        title: "The Art of Animation Timing",
        author: "Sarah Johnson",
        link: "#",
      },
      {
        title: "Building Accessible Components",
        author: "Robin Singh",
        link: "#",
      },
      {
        title: "Color Theory for Digital Interfaces",
        author: "Mia Chen",
        link: "#",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with wavy border */}
      <div className="relative">
        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-amber-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-amber-950/20 h-44"></div>
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
        <div className="absolute bottom-0 w-full transform translate-y-1/2">
          <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70 blur-sm group-hover:opacity-100 transition duration-200"></div>
              <Avatar className="h-28 w-28 border-4 border-background relative">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-3xl">ER</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col sm:items-start items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <Badge
                  variant="secondary"
                  className="font-normal text-xs rounded-full"
                >
                  Joined {profile.joined}
                </Badge>
              </div>
              <p className="text-muted-foreground">@{profile.handle}</p>
              <div className="mt-1 flex flex-wrap items-center gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  {profile.location}
                </div>
                <StatusIndicator status={profile.status} />
              </div>
            </div>
            <div className="sm:ml-auto flex gap-3 mt-4 sm:mt-0">
              <Button variant="outline" size="sm" className="gap-2">
                <Coffee className="h-4 w-4" />
                <span>Buy me a coffee</span>
              </Button>
              <Button
                size="sm"
                className="gap-2"
                onClick={() => setShowSendMessage(!showSendMessage)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Message</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-20" ref={contentRef}>
        {showSendMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-8 p-4 bg-card border rounded-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Send a message to Emma</h3>
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
          </motion.div>
        )}

        {/* Currently working on */}
        <div className="mb-8">
          <Card className="overflow-hidden border-dashed">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{profile.currentStatus.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <h3 className="font-medium">Currently working on</h3>
                  </div>
                  <p className="text-lg font-medium mb-4">
                    {profile.currentStatus.text}
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>Progress</span>
                      <span>{profile.currentStatus.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                        style={{ width: `${profile.currentStatus.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left sidebar */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            {/* Stats with playful icons */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-2">
                  {profile.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 rounded-md hover:bg-muted transition-colors group cursor-pointer text-center"
                    >
                      <p className="text-2xl mb-1">{stat.emoji}</p>
                      <p className="text-xl font-medium group-hover:text-primary transition-colors">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Links with hover effects */}
            <Card>
              <CardContent className="p-6 space-y-3">
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
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded-md mr-3">
                    <Palette className="h-5 w-5 text-purple-500" />
                  </div>
                  <span className="text-sm">{profile.links.portfolio}</span>
                </a>

                <a
                  href={`https://${profile.links.coffee}`}
                  className="flex items-center p-2 -m-2 rounded-md hover:bg-muted transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-2 rounded-md mr-3">
                    <Coffee className="h-5 w-5 text-amber-500" />
                  </div>
                  <span className="text-sm">{profile.links.coffee}</span>
                </a>
              </CardContent>
            </Card>

            {/* Bookmarks section */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-sm font-medium">
                    Recently Bookmarked
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-2 space-y-3">
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
          </div>

          {/* Main content area */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-4 mb-8">
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span>About</span>
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

              <TabsContent
                value="about"
                className="m-0 space-y-8 animate-in fade-in-50 duration-300"
              >
                <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold">
                  <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                    <span>About Emma</span>
                    <div className="h-px flex-1 bg-border"></div>
                  </h2>
                  <p className="text-lg">{profile.bio}</p>

                  <p>
                    After five years as a digital product designer at various
                    agencies, I decided to dive into development full-time and
                    haven't looked back. I'm passionate about building tools
                    that make design and development more accessible, especially
                    for people who think visually.
                  </p>

                  <p>
                    When I'm not coding or designing, you'll find me hiking the
                    Pacific Northwest trails, brewing unnecessarily elaborate
                    coffee, or illustrating quirky characters for my side
                    projects.
                  </p>

                  <p>
                    I believe the best tools feel like an extension of your
                    creativity rather than technical obstacles. That's the
                    philosophy behind everything I build.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                    <span>Skills & Expertise</span>
                    <div className="h-px flex-1 bg-border"></div>
                  </h2>
                  <div className="bg-card rounded-lg border p-6">
                    <ProfileSkills skills={profile.skills} displayType="grid" />
                  </div>
                </div>

                <div className="space-y-5">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span>Recent Activity</span>
                    <div className="h-px flex-1 bg-border"></div>
                  </h2>
                  <ProfileActivity activities={profile.activity} />
                </div>
              </TabsContent>

              <TabsContent
                value="projects"
                className="m-0 space-y-8 animate-in fade-in-50 duration-300"
              >
                <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                  <span>Featured Projects</span>
                  <div className="h-px flex-1 bg-border"></div>
                </h2>

                <div className="grid gap-8">
                  {profile.projects.map((project, i) => (
                    <CreativeProjectCard
                      key={project.title}
                      project={project}
                      index={i}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="articles"
                className="m-0 space-y-8 animate-in fade-in-50 duration-300"
              >
                <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                  <span>Latest Articles</span>
                  <div className="h-px flex-1 bg-border"></div>
                </h2>

                <div className="grid gap-6">
                  {profile.articles.map((article, i) => (
                    <ArticleCard
                      key={article.title}
                      article={article}
                      index={i}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="testimonials"
                className="m-0 space-y-8 animate-in fade-in-50 duration-300"
              >
                <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                  <span>What People Say</span>
                  <div className="h-px flex-1 bg-border"></div>
                </h2>

                <div className="grid gap-8 sm:grid-cols-2">
                  {profile.testimonials.map((testimonial, i) => (
                    <TestimonialCard key={i} testimonial={testimonial} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
      </span>
      <span className="text-sky-500 dark:text-sky-400">{status}</span>
    </div>
  );
}

function CreativeProjectCard({
  project,
  index,
}: {
  project: any;
  index: number;
}) {
  const variants = {
    purple:
      "from-purple-200 to-pink-200 dark:from-purple-900/30 dark:to-pink-900/30",
    blue: "from-blue-200 to-cyan-200 dark:from-blue-900/30 dark:to-cyan-900/30",
    amber:
      "from-amber-200 to-yellow-200 dark:from-amber-900/30 dark:to-yellow-900/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="grid md:grid-cols-5 gap-6 p-6 rounded-lg bg-gradient-to-br border hover:border-primary/50 transition-all cursor-pointer">
        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-muted-foreground">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          <div>
            <Button
              variant="link"
              className="p-0 h-auto font-normal text-primary"
            >
              View project &rarr;
            </Button>
          </div>
        </div>

        <div
          className={`md:col-span-2 rounded-lg bg-gradient-to-br ${
            variants[project.variant as keyof typeof variants]
          } flex items-center justify-center p-8`}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-32 object-contain"
            />
          ) : (
            <div className="aspect-video w-full bg-muted rounded-md"></div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ArticleCard({ article, index }: { article: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group border rounded-lg p-6 hover:border-primary/50 transition-all"
    >
      <div className="space-y-3">
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

        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <p className="text-muted-foreground">{article.excerpt}</p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            {article.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            variant="link"
            className="p-0 h-auto font-normal text-primary"
          >
            Read article &rarr;
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="relative border rounded-lg p-6 bg-card">
      <div className="absolute -top-3 -left-3 text-4xl">"</div>
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
