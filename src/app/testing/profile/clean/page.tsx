"use client";

import { useState } from "react";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileAbout } from "@/components/profile/profile-about";
import { ProfileSkills } from "@/components/profile/profile-skills";
import { ProfileActivity } from "@/components/profile/profile-activity";
import { ProfileConnections } from "@/components/profile/profile-connections";
import { ProfileProjects } from "@/components/profile/profile-projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { IconBar } from "@/components/profile/icon-bar";
import { Button } from "@/components/ui/button";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  FileText,
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about");

  // Mock profile data
  const profile = {
    name: "Alex Morgan",
    handle: "alexmorgan",
    avatar: "https://github.com/shadcn.png",
    role: "Product Designer & Developer",
    location: "San Francisco, CA",
    status: "Available for projects",
    bio: "I build digital products with a focus on user experience and accessibility. Currently working on design systems and component libraries for web applications.",
    links: {
      github: "github.com/alexmorgan",
      twitter: "twitter.com/alexmorgan",
      linkedin: "linkedin.com/in/alexmorgan",
      instagram: "instagram.com/alexmorgan",
      email: "alex@example.com",
      resume: "/resume.pdf",
    },
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
        bgColor: "bg-blue-100 dark:bg-blue-950/50",
        icon: "✨",
        tags: ["Design Systems", "React", "Documentation"],
        link: "#",
      },
      {
        title: "Analytics Dashboard",
        description:
          "Data visualization interface with customizable widgets and real-time updates",
        bgColor: "bg-purple-100 dark:bg-purple-950/50",
        icon: "📊",
        tags: ["Dashboard", "Data Viz", "React"],
        link: "#",
      },
      {
        title: "Mobile App Redesign",
        description: "Complete UX overhaul of a fintech mobile application",
        bgColor: "bg-emerald-100 dark:bg-emerald-950/50",
        icon: "📱",
        tags: ["Mobile", "UX Design", "Fintech"],
        link: "#",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20">
      {/* Top section with profile header */}
      <div className="w-full bg-background border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileHeader
            name={profile.name}
            handle={profile.handle}
            avatar={profile.avatar}
            role={profile.role}
            location={profile.location}
            status={profile.status}
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Bio and links section */}
            <div className="bg-background rounded-xl border p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-3">About</h3>
              <p className="text-muted-foreground">{profile.bio}</p>

              <div className="flex items-center justify-between mt-6">
                <IconBar
                  links={[
                    {
                      icon: <Github className="h-5 w-5" />,
                      href: `https://${profile.links.github}`,
                    },
                    {
                      icon: <Twitter className="h-5 w-5" />,
                      href: `https://${profile.links.twitter}`,
                    },
                    {
                      icon: <Linkedin className="h-5 w-5" />,
                      href: `https://${profile.links.linkedin}`,
                    },
                    {
                      icon: <Instagram className="h-5 w-5" />,
                      href: `https://${profile.links.instagram}`,
                    },
                  ]}
                />

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                  asChild
                >
                  <a href={profile.links.resume} target="_blank">
                    <FileText className="h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </div>
            </div>

            {/* Connections section on desktop */}
            <div className="bg-background rounded-xl border p-6 shadow-sm hidden lg:block">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Connections</h3>
                <Badge variant="outline" className="font-normal">
                  {profile.connections.length}
                </Badge>
              </div>
              <ProfileConnections
                connections={profile.connections.slice(0, 3)}
              />
              {profile.connections.length > 3 && (
                <Button
                  variant="link"
                  className="w-full text-sm mt-2 h-auto p-0"
                >
                  View all connections
                </Button>
              )}
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="about" className="text-sm">
                  About
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-sm">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="activity" className="text-sm">
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6 mt-0">
                <ProfileAbout
                  bio={profile.bio}
                  role={profile.role}
                  location={profile.location}
                />

                {/* Skills section */}
                <div className="bg-background rounded-xl border p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-5">
                    Skills & Expertise
                  </h3>
                  <ProfileSkills skills={profile.skills} displayType="grid" />
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-0">
                <div className="bg-background rounded-xl border p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-5">Projects</h3>
                  <ProfileProjects projects={profile.projects} />
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <div className="bg-background rounded-xl border p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-5">
                    Recent Activity
                  </h3>
                  <ProfileActivity activities={profile.activity} />
                </div>
              </TabsContent>
            </Tabs>

            {/* Connections section for mobile */}
            <div className="bg-background rounded-xl border p-6 shadow-sm lg:hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Connections</h3>
                <Badge variant="outline" className="font-normal">
                  {profile.connections.length}
                </Badge>
              </div>
              <ProfileConnections
                connections={profile.connections.slice(0, 3)}
              />
              {profile.connections.length > 3 && (
                <Button variant="link" className="p-0 h-auto text-sm mt-2">
                  View all connections
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
