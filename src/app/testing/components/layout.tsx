"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
// import { ThemeToggle } from "@/components/patterns/theme-toggle";
// import { ColorPresetPicker } from "@/components/patterns/color-preset-picker";
import { ChevronDown, ChevronRight, FolderIcon } from "lucide-react";
import { useState } from "react";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    core: true,
    verticals: false,
  });

  // Determine if any subcategory of verticals is expanded
  const [expandedVerticals, setExpandedVerticals] = useState<
    Record<string, boolean>
  >({
    assignments: false,
    placements: false,
    application: false, // Set this to true to expand application by default
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleVertical = (vertical: string) => {
    setExpandedVerticals((prev) => ({
      ...prev,
      [vertical]: !prev[vertical],
    }));
  };

  const categories = [
    {
      name: "Core",
      id: "core",
      items: [
        { name: "Basic Inputs", href: "/testing/components/core/basic-inputs" },
        {
          name: "Form Components",
          href: "/testing/components/core/form-components",
        },
        { name: "Data Display", href: "/testing/components/core/data-display" },
        {
          name: "Feature Components",
          href: "/testing/components/core/feature-components",
        },
        { name: "Layout", href: "/testing/components/core/layout" },
        { name: "Feedback", href: "/testing/components/core/feedback" },
        { name: "Skeleton", href: "/testing/components/core/skeleton" },
      ],
    },
    {
      name: "Verticals",
      id: "verticals",
      items: [
        {
          name: "Application",
          id: "application",
          href: "/testing/components/verticals",
          subItems: [
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
            },
            // {
            //   name: "Forms",
            //   href: "/testing/components/verticals/application/forms",
            // },
            // {
            //   name: "Status Indicators",
            //   href: "/testing/components/verticals/application/status",
            // },
            // {
            //   name: "Document Upload",
            //   href: "/testing/components/verticals/application/documents",
            // },
          ],
        },
        {
          name: "Assignments",
          id: "assignments",
          href: "/testing/components/verticals",
          subItems: [
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
            {
              name: "Profile",
              href: "/testing/components/verticals/assignments/profile",
            },
            {
              name: "User Skills",
              href: "/testing/components/verticals/assignments/userSkills",
            },
            {
              name: "Classroom",
              href: "/testing/components/verticals/assignments/classroom",
            },
          ],
        },
        {
          name: "Classroom",
          id: "classroom",
          href: "/testing/components/verticals/classroom",
          subItems: [
            {
              name: "classroom thing",
              href: "/testing/components/verticals/classroom/",
            },
          ],
        },

        {
          name: "Placements",
          id: "placements",
          href: "/testing/components/verticals",
          subItems: [
            {
              name: "todo",
              href: "/testing/components/verticals/placements/profiles",
            },
            {
              name: "todo",
              href: "/testing/components/verticals/placements/positions",
            },
            {
              name: "todo",
              href: "/testing/components/verticals/placements/matching",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <Link href="/">
          <Button variant="outline" size="sm">
            ← Back to Home
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          {/* <ColorPresetPicker />
          <ThemeToggle /> */}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation with Collapsible Sections */}
        <div className="w-full md:w-64 md:shrink-0">
          <div className="sticky top-8 space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="space-y-1">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-center justify-between p-2 text-left font-medium rounded-md hover:bg-muted ${
                    pathname.includes(`/testing/components/${category.id}`)
                      ? "bg-muted/50"
                      : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FolderIcon className="h-4 w-4" />
                    {category.name}
                  </span>
                  {expandedCategories[category.id] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {expandedCategories[category.id] && (
                  <div className="ml-5 pl-2 border-l space-y-1">
                    {category.id === "core" ? (
                      // Regular links for core components
                      category.items.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant={
                              pathname === item.href ? "default" : "ghost"
                            }
                            size="sm"
                            className="w-full justify-start h-8 text-sm"
                          >
                            {item.name}
                          </Button>
                        </Link>
                      ))
                    ) : (
                      // Nested structure for verticals
                      <>
                        <Link href="/testing/components/verticals">
                          <Button
                            variant={
                              pathname === "/testing/components/verticals"
                                ? "default"
                                : "ghost"
                            }
                            size="sm"
                            className="w-full justify-start h-8 text-sm"
                          >
                            Overview
                          </Button>
                        </Link>

                        {/* Vertical Categories */}
                        {category.items.map((vertical: any) => (
                          <div key={vertical.id} className="space-y-1 mt-2">
                            <button
                              onClick={() => toggleVertical(vertical.id)}
                              className={`w-full flex items-center justify-between p-2 text-left text-sm rounded-md hover:bg-muted ${
                                pathname.includes(
                                  `/testing/components/verticals/${vertical.id}`
                                )
                                  ? "bg-muted/50"
                                  : ""
                              }`}
                            >
                              <span>{vertical.name}</span>
                              {expandedVerticals[vertical.id] ? (
                                <ChevronDown className="h-3 w-3" />
                              ) : (
                                <ChevronRight className="h-3 w-3" />
                              )}
                            </button>

                            {expandedVerticals[vertical.id] && (
                              <div className="ml-3 pl-2 border-l space-y-1">
                                {vertical.subItems.map((subItem: any) => (
                                  <Link key={subItem.href} href={subItem.href}>
                                    <Button
                                      variant={
                                        pathname === subItem.href
                                          ? "default"
                                          : "ghost"
                                      }
                                      size="sm"
                                      className="w-full justify-start h-7 text-xs"
                                    >
                                      {subItem.name}
                                    </Button>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
