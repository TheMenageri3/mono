"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, Lightbulb, GraduationCap } from "lucide-react";

export function ResourcesTab() {
  const resourceCategories = [
    {
      id: "required",
      title: "Required Reading",
      icon: <BookOpen className="h-5 w-5 text-purple-400" />,
      resources: [
        {
          id: 1,
          title: "Solana Programming Model",
          description: "Official Solana Documentation",
        },
        {
          id: 2,
          title: "Anchor Framework Introduction",
          description: "Programming Guide - Chapter 3",
        },
        {
          id: 3,
          title: "Transaction Processing and the Runtime",
          description: "Deep Dive Whitepaper",
        },
      ],
    },
    {
      id: "supplemental",
      title: "Supplemental Materials",
      icon: <Lightbulb className="h-5 w-5 text-yellow-400" />,
      resources: [
        {
          id: 1,
          title: "Rust Learning Path",
          description: "Interactive tutorials for Rust fundamentals",
        },
        {
          id: 2,
          title: "Cryptography Basics",
          description: "Understanding digital signatures and hashing",
        },
        {
          id: 3,
          title: "DApp Architecture Guide",
          description: "Best practices for web3 frontend integration",
        },
      ],
    },
    {
      id: "course",
      title: "Course Information",
      icon: <GraduationCap className="h-5 w-5 text-purple-400" />,
      resources: [
        {
          id: 1,
          title: "Course Syllabus",
          description: "Complete outline and expectations",
        },
        {
          id: 2,
          title: "Office Hours Schedule",
          description: "Weekly availability for instructor support",
        },
        {
          id: 3,
          title: "Grading Policy",
          description: "Evaluation criteria and rubrics",
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {resourceCategories.map((category) => (
        <Card
          key={category.id}
          className="backdrop-blur-md bg-black/30 border border-white/10"
        >
          <div className="p-5">
            <div className="flex items-center mb-6">
              <div className="mr-3">{category.icon}</div>
              <h2 className="text-lg font-bold">{category.title}</h2>
            </div>

            <div className="space-y-4">
              {category.resources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-4 border-t border-white/10 hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <h3 className="font-medium mb-1">{resource.title}</h3>
                  <p className="text-sm text-white/60">
                    {resource.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
