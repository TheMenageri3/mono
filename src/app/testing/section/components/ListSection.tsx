"use client";

import React from "react";
import { useSectionQueries } from "../hooks/useSectionQueries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ListSection() {
  const { useAllSections } = useSectionQueries();
  const { data: sections, isLoading, error } = useAllSections();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!sections?.length) return <div>No events found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sections.map((section, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{section.header}</CardTitle>
            </div>
          </CardHeader>

          <CardFooter className="justify-between">
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
