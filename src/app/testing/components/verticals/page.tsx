"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BriefcaseIcon,
  UserIcon,
  FileTextIcon,
  ArrowRight,
  Lock,
} from "lucide-react";

export default function VerticalsComponentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Vertical Components</h1>
        <p className="text-muted-foreground mb-6">
          Specialized components designed for specific business domains
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Application Vertical - Put this first to highlight it */}
        <VerticalCard
          icon={<FileTextIcon className="w-8 h-8" />}
          title="Application"
          items={[
            {
              name: "Sign In",
              href: "/testing/components/verticals/application/sign-in",
            },
            {
              name: "Onboarding",
              href: "/testing/components/verticals/application/onboarding",
            },
            {
              name: "Review",
              href: "/testing/components/verticals/application/review",
              highlight: true,
            },
            {
              name: "Forms",
              href: "/testing/components/verticals/application/forms",
            },
            {
              name: "Status Indicators",
              href: "/testing/components/verticals/application/status",
            },
            {
              name: "Document Upload",
              href: "/testing/components/verticals/application/documents",
            },
          ]}
          color="bg-orange-500/10 text-orange-600 dark:text-orange-400"
        />

        {/* Assignments Vertical */}
        <VerticalCard
          icon={<BriefcaseIcon className="w-8 h-8" />}
          title="Assignments"
          items={[
            {
              name: "Wallet",
              href: "/testing/components/verticals/assignments/wallet",
            },
            {
              name: "User",
              href: "/testing/components/verticals/assignments/user",
            },
            {
              name: "Role",
              href: "/testing/components/verticals/assignments/role",
            },
          ]}
          color="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        />

        {/* Placements Vertical */}
        <VerticalCard
          icon={<UserIcon className="w-8 h-8" />}
          title="Placements"
          items={[
            {
              name: "todo",
              href: "/components/verticals/placements/profiles",
            },
            {
              name: "todo",
              href: "/components/verticals/placements/positions",
            },
            {
              name: "todo",
              href: "/components/verticals/placements/matching",
            },
          ]}
          color="bg-teal-500/10 text-teal-600 dark:text-teal-400"
        />
      </div>
    </div>
  );
}

function VerticalCard({
  icon,
  title,
  items,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  items: { name: string; href: string; highlight?: boolean }[];
  color: string;
}) {
  return (
    <Card className="overflow-hidden hover:border-primary transition-colors">
      <div
        className={`p-6 ${color} border-b border-muted flex items-center gap-3`}
      >
        <div className="p-2 bg-background/80 backdrop-blur rounded-md shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <div className="p-4">
        <ul className="divide-y">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center justify-between py-3 px-2 rounded-md hover:bg-muted group ${
                  item.highlight ? "bg-muted/50" : ""
                }`}
              >
                <span
                  className={item.highlight ? "font-medium text-primary" : ""}
                >
                  {item.name}
                  {item.highlight && (
                    <span className="inline-block ml-2 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </span>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
