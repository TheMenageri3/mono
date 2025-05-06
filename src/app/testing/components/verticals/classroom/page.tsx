"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  User,
  FileText,
  Command,
  Layers,
  Users,
  MessageSquare,
  Tag,
  GraduationCap,
  UserPlus,
  FolderKanban,
} from "lucide-react";

export default function ClassroomComponentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Classroom Components</h1>
        <p className="text-muted-foreground mb-6">
          Specialized components for educational platforms and learning
          management systems
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Authentication Flow */}
        <ComponentCard
          icon={<User />}
          title="User Authentication"
          description="Login and registration components"
          href="/testing/components/verticals/classroom/auth"
          color="bg-blue-500/10 text-blue-500"
        />

        {/* Project Management */}
        <ComponentCard
          icon={<FolderKanban />}
          title="Project Management"
          description="Project creation and collaboration interfaces"
          href="/testing/components/verticals/classroom/projects"
          color="bg-purple-500/10 text-purple-500"
        />

        {/* User Profile System */}
        <ComponentCard
          icon={<UserPlus />}
          title="User Profile System"
          description="Profile editing and wallet connection interfaces"
          href="/testing/components/verticals/classroom/profiles"
          color="bg-green-500/10 text-green-500"
        />

        {/* Class System */}
        <ComponentCard
          icon={<GraduationCap />}
          title="Class System"
          description="Class browsing and application components"
          href="/testing/components/verticals/classroom/classes"
          color="bg-amber-500/10 text-amber-500"
        />

        {/* Application Components */}
        <ComponentCard
          icon={<FileText />}
          title="Application Components"
          description="Forms and interfaces for applications"
          href="/testing/components/verticals/classroom/applications"
          color="bg-orange-500/10 text-orange-500"
        />

        {/* Assignment System */}
        <ComponentCard
          icon={<Command />}
          title="Assignment System"
          description="Assignment viewing and submission interfaces"
          href="/testing/components/verticals/classroom/assignments"
          color="bg-teal-500/10 text-teal-500"
        />

        {/* Comment System */}
        <ComponentCard
          icon={<MessageSquare />}
          title="Comment System"
          description="Comment creation and thread viewing interfaces"
          href="/testing/components/verticals/classroom/comments"
          color="bg-pink-500/10 text-pink-500"
        />

        {/* Metadata Components */}
        <ComponentCard
          icon={<Tag />}
          title="Metadata Components"
          description="Section navigation and tag management"
          href="/testing/components/verticals/classroom/metadata"
          color="bg-indigo-500/10 text-indigo-500"
        />

        {/* Enrollment Management */}
        <ComponentCard
          icon={<Users />}
          title="Enrollment Management"
          description="Enrollment tracking and process interfaces"
          href="/testing/components/verticals/classroom/enrollment"
          color="bg-rose-500/10 text-rose-500"
        />
      </div>
    </div>
  );
}

function ComponentCard({
  icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Link href={href} className="block group">
      <Card className="hover:border-primary transition-colors h-full">
        <div className="p-6">
          <div className="flex flex-col h-full">
            <div className={`p-3 rounded-lg w-fit mb-4 ${color}`}>
              <div className="w-6 h-6">{icon}</div>
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h2>
            <p className="text-muted-foreground flex-grow">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
