"use client";

import Link from "next/link";
import {
  ArrowRight,
  Package,
  Building,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text ">Component Library</span>
          </h1>

          <div className="inline-flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium">Latest version: v1.0.0</span>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Core Components */}
            <MainCategoryCard
              icon={<Package className="w-12 h-12" />}
              title="Core Components"
              description="Foundational UI building blocks that form the basis of all interfaces in the design system"
              href="/testing/components/core"
              color="bg-blue-500/10 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400"
              features={[
                "Basic Inputs",
                "Form Components",
                "Data Display",
                "Feature Components",
                "Layout Components",
                "Feedback Components",
              ]}
            />

            {/* Vertical Components */}
            <MainCategoryCard
              icon={<Building className="w-12 h-12" />}
              title="Vertical Components"
              description="Specialized components designed for specific business domains and use cases"
              href="/testing/components/verticals"
              color="bg-emerald-500/10 text-emerald-500 dark:bg-emerald-900/20 dark:text-emerald-400"
              features={["Assignments", "Placements", "Applications"]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function MainCategoryCard({
  icon,
  title,
  description,
  href,
  color,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
  features: string[];
}) {
  return (
    <Link href={href} className="block">
      <div className="border rounded-lg overflow-hidden transition-all hover:shadow-lg hover:border-primary bg-card group h-full relative">
        {/* Top section with icon and title */}
        <div className={`p-6 pb-4 border-b ${color}`}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-background/80 backdrop-blur rounded-lg">
              {icon}
            </div>
            <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
              {title}
            </h2>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6">
          <p className="text-muted-foreground mb-6">{description}</p>
          <div className="space-y-2 mb-14">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Floating button/badge at bottom-right */}
          <div className="absolute bottom-6 right-6 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full flex items-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <span className="text-sm font-medium">Browse Components</span>
            <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Overlay effect on hover */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
      </div>
    </Link>
  );
}
