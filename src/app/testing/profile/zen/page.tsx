"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/primitives/separator";
import { ProfileSkills } from "@/components/profile/profile-skills";
import { ProfileProjects } from "@/components/profile/profile-projects";
import { ProfileActivity } from "@/components/profile/profile-activity";
import { ProfileConnections } from "@/components/profile/profile-connections";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Github,
  Twitter,
  Linkedin,
  FileText,
  MapPin,
  User,
  Code,
  Activity,
  Users,
  ChevronDown,
} from "lucide-react";

export default function ZenProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for the sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const offset = window.scrollY;
        setScrolled(offset > 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock profile data
  const profile = {
    name: "Alex Morgan",
    handle: "alexmorgan",
    avatar: "https://github.com/shadcn.png",
    role: "Product Designer & Developer",
    location: "San Francisco, CA",
    status: "Open to Opportunities",
    bio: "I build digital products with a focus on user experience and accessibility. Currently working on design systems and component libraries for web applications.",
    links: {
      github: "github.com/dontbearealperson",
      twitter: "twitter.com/OngIAmNotReal",
      linkedin: "linkedin.com/in/IThinkImNotReal",
      email: "butificanthinkmaybeiam@real.com",
      resume: "/resume.pdf",
    },
    stats: [
      { label: "Contributions", value: 247 },
      { label: "Projects", value: 16 },
      { label: "Connections", value: 89 },
    ],
    skills: [
      {
        category: "Design",
        items: [
          "UI/UX",
          "Design Systems",
          "User Research",
          "Wireframing",
          "Prototyping",
          "Figma",
          "Sketch",
        ],
      },
      {
        category: "Development",
        items: [
          "React",
          "TypeScript",
          "Next.js",
          "TailwindCSS",
          "Node.js",
          "GraphQL",
          "Frontend Architecture",
        ],
      },
      {
        category: "Tools",
        items: [
          "Git",
          "VS Code",
          "Storybook",
          "Jest",
          "Netlify",
          "Vercel",
          "GitHub Actions",
        ],
      },
    ],
    bounties: [
      {
        title: "Design System Documentation Overhaul",
        reward: "$1,200",
        status: "open",
        dueDate: "May 15, 2025",
        tags: ["Documentation", "Design Systems"],
      },
      {
        title: "Accessibility Improvements for Dashboard",
        reward: "$800",
        status: "in progress",
        dueDate: "May 10, 2025",
        tags: ["Accessibility", "Frontend"],
      },
      {
        title: "GraphQL Type Generator Tool",
        reward: "$1,500",
        status: "completed",
        dueDate: "April 18, 2025",
        tags: ["GraphQL", "TypeScript", "Developer Tools"],
      },
    ],
    activity: [
      {
        type: "project" as const,
        title: "Design System Documentation",
        date: "2 days ago",
        description:
          "Updated component documentation with accessibility guidelines",
        link: "#",
      },
      {
        type: "article" as const,
        title: "Building Better Design Systems",
        date: "1 week ago",
        description:
          "Published an article about scalable design system architecture",
        link: "#",
      },
      {
        type: "contribution" as const,
        title: "Open Source Contribution",
        date: "2 weeks ago",
        description:
          "Fixed accessibility issues in a popular React component library",
        link: "#",
      },
      {
        type: "release" as const,
        title: "Component Library v2.0",
        date: "1 month ago",
        description:
          "Released major update with 15 new components and improved theming",
        link: "#",
      },
    ],
    connections: [
      {
        name: "Taylor Kim",
        avatar: "https://github.com/shadcn.png",
        role: "Product Manager",
        mutual: 12,
      },
      {
        name: "Jordan Lee",
        avatar: "https://github.com/shadcn.png",
        role: "UX Designer",
        mutual: 8,
      },
      {
        name: "Casey Smith",
        avatar: "https://github.com/shadcn.png",
        role: "Frontend Developer",
        mutual: 15,
      },
      {
        name: "Riley Johnson",
        avatar: "https://github.com/shadcn.png",
        role: "Design Engineer",
        mutual: 5,
      },
      {
        name: "Morgan Taylor",
        avatar: "https://github.com/shadcn.png",
        role: "Product Designer",
        mutual: 10,
      },
    ],
    projects: [
      {
        title: "Design System Framework",
        description:
          "A cohesive system of components, guidelines, and tools for product teams",
        bgColor: "bg-blue-50 dark:bg-blue-950/20",
        icon: "✨",
        tags: ["Design Systems", "React", "Documentation"],
        link: "#",
      },
      {
        title: "Analytics Dashboard",
        description:
          "Data visualization interface with customizable widgets and real-time updates",
        bgColor: "bg-purple-50 dark:bg-purple-950/20",
        icon: "📊",
        tags: ["Dashboard", "Data Viz", "React"],
        link: "#",
      },
      {
        title: "Mobile App Redesign",
        description: "Complete UX overhaul of a fintech mobile application",
        bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
        icon: "📱",
        tags: ["Mobile", "UX Design", "Fintech"],
        link: "#",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky header */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-10 bg-background transition-all duration-200 ease-in-out border-b ${
          scrolled ? "py-3 border-border shadow-sm" : "py-5 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              className={`transition-all duration-200 ${
                scrolled ? "h-8 w-8" : "h-10 w-10"
              }`}
            >
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1
                className={`font-medium transition-all duration-200 ${
                  scrolled ? "text-lg" : "text-xl"
                }`}
              >
                {profile.name}
              </h1>
              {scrolled ? null : (
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={profile.status} />
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Resume
            </Button>
            <Button size="sm">Connect</Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left sidebar */}
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-sm text-muted-foreground font-medium">
                  About
                </h3>
                <p className="text-sm">{profile.bio}</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  {profile.location}
                </div>
                <a
                  href={`https://${profile.links.github}`}
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-3.5 w-3.5 mr-1.5" />
                  {profile.links.github}
                </a>
                <a
                  href={`https://${profile.links.twitter}`}
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-3.5 w-3.5 mr-1.5" />
                  {profile.links.twitter}
                </a>
                <a
                  href={`https://${profile.links.linkedin}`}
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5 mr-1.5" />
                  {profile.links.linkedin}
                </a>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm text-muted-foreground font-medium mb-3">
                Stats
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {profile.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
                  >
                    <p className="text-lg font-medium group-hover:text-primary transition-colors">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm text-muted-foreground font-medium">
                  Connections
                </h3>
                <Badge variant="outline" className="text-xs font-normal">
                  {profile.connections.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {profile.connections.slice(0, 3).map((connection) => (
                  <div
                    key={connection.name}
                    className="flex items-center gap-3 group"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={connection.avatar}
                        alt={connection.name}
                      />
                      <AvatarFallback>
                        {connection.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {connection.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {connection.role}
                      </p>
                    </div>
                  </div>
                ))}

                {profile.connections.length > 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs h-8 font-normal"
                  >
                    View all {profile.connections.length} connections
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </aside>

          {/* Main content area */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="h-9 w-full justify-start bg-transparent border-b rounded-none p-0 mb-6">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-4 h-9"
                >
                  <User className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-4 h-9"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="bounties"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-4 h-9"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Bounties
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-4 h-9"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="m-0 space-y-6">
                <section className="space-y-4">
                  <h2 className="text-xl font-medium">Skills & Expertise</h2>
                  <div className="bg-card rounded-lg border p-6">
                    <ProfileSkills skills={profile.skills} displayType="grid" />
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-medium">Featured Projects</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {profile.projects.map((project) => (
                      <ProjectCard key={project.title} project={project} />
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-medium">Recent Activity</h2>
                    <Button variant="link" size="sm" className="text-xs">
                      View all
                    </Button>
                  </div>
                  <div className="bg-card rounded-lg border p-6">
                    <ProfileActivity
                      activities={profile.activity.slice(0, 2)}
                    />
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="projects" className="m-0">
                <section className="space-y-4">
                  <h2 className="text-xl font-medium">All Projects</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...profile.projects, ...profile.projects].map(
                      (project, i) => (
                        <ProjectCard
                          key={`${project.title}-${i}`}
                          project={project}
                        />
                      )
                    )}
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="bounties" className="m-0">
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-medium">Current Bounties</h2>
                    <Button size="sm">Create Bounty</Button>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    {profile.bounties.map((bounty, index) => (
                      <BountyRow
                        key={bounty.title}
                        bounty={bounty}
                        isLast={index === profile.bounties.length - 1}
                      />
                    ))}
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="activity" className="m-0">
                <section className="space-y-4">
                  <h2 className="text-xl font-medium">All Activity</h2>
                  <div className="bg-card rounded-lg border p-6">
                    <ProfileActivity activities={profile.activity} />
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isAvailable =
    status.toLowerCase().includes("open") ||
    status.toLowerCase().includes("available");

  return (
    <Badge
      variant={isAvailable ? "default" : "outline"}
      className={`font-normal py-1 px-2 text-xs ${
        isAvailable
          ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
          : ""
      }`}
    >
      {status}
    </Badge>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <a
      href={project.link}
      className="group block border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-sm transition-all"
    >
      <div
        className={`${project.bgColor} p-4 group-hover:saturate-125 transition-all`}
      >
        <div className="text-2xl">{project.icon}</div>
      </div>
      <div className="p-4">
        <h3 className="font-medium group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-normal text-xs bg-secondary/50"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </a>
  );
}

function BountyRow({ bounty, isLast }: { bounty: any; isLast: boolean }) {
  return (
    <div
      className={`p-4 hover:bg-accent/50 transition-colors ${
        !isLast ? "border-b" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{bounty.title}</h3>
            <BountyStatusBadge status={bounty.status} />
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="text-xs text-muted-foreground">
              Due {bounty.dueDate}
            </div>
            <div className="flex gap-1.5">
              {bounty.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-normal text-xs bg-secondary/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-lg">{bounty.reward}</div>
          <Button variant="ghost" size="sm" className="text-xs h-7 px-2.5">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

function BountyStatusBadge({ status }: { status: string }) {
  let badgeStyles = "";

  switch (status) {
    case "open":
      badgeStyles =
        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
      break;
    case "in progress":
      badgeStyles =
        "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
      break;
    case "completed":
      badgeStyles =
        "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      break;
    default:
      badgeStyles = "";
  }

  return (
    <Badge variant="outline" className={`font-normal text-xs ${badgeStyles}`}>
      {status}
    </Badge>
  );
}
