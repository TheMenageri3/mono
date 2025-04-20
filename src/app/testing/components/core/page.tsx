"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  SlidersHorizontal,
  BarChart3,
  Component,
  Layers,
  Layout,
  Bell,
  ArrowRight,
} from "lucide-react";

export default function CoreComponentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Core Components</h1>
        <p className="text-muted-foreground mb-6">
          Foundational UI building blocks for creating consistent interfaces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ComponentCard
          icon={<SlidersHorizontal />}
          title="Basic Inputs"
          description="Buttons, inputs, selects, and other basic form controls"
          href="/components/core/basic-inputs"
          color="bg-blue-500/10 text-blue-500"
        />

        <ComponentCard
          icon={<Component />}
          title="Form Components"
          description="Form layouts, validations, and specialized inputs"
          href="/components/core/form-components"
          color="bg-purple-500/10 text-purple-500"
        />

        <ComponentCard
          icon={<BarChart3 />}
          title="Data Display"
          description="Cards, badges, avatars, and data visualization components"
          href="/components/core/data-display"
          color="bg-emerald-500/10 text-emerald-500"
        />

        <ComponentCard
          icon={<Layers />}
          title="Feature Components"
          description="Higher-level components used in the application"
          href="/components/core/feature-components"
          color="bg-amber-500/10 text-amber-500"
        />

        <ComponentCard
          icon={<Layout />}
          title="Layout Components"
          description="Layout structuring components and patterns"
          href="/components/core/layout"
          color="bg-sky-500/10 text-sky-500"
        />

        <ComponentCard
          icon={<Bell />}
          title="Feedback Components"
          description="Alerts, toasts, dialogs, and feedback mechanisms"
          href="/components/core/feedback"
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
        <CardContent className="p-6">
          <div className="flex flex-col h-full">
            <div className={`p-3 rounded-lg w-fit mb-4 ${color}`}>{icon}</div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h2>
            <p className="text-muted-foreground flex-grow">{description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-medium">Explore</span>
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
