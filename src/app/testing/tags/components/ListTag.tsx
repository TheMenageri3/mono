"use client";

import React from "react";
import { api } from "@/trpc/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TagIcon } from "lucide-react";

export function ListTags() {
  const {
    data: tags,
    isLoading,
    error,
  } = api.tag.read.useQuery({ limit: 10, offset: 0 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!tags?.length) return <div>No tags found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tags.map((tag) => (
        <Card key={tag.tagName}>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <TagIcon className="w-4 h-4 text-muted-foreground" />
              {tag.tagName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              className="px-3 py-1.5 text-sm font-medium"
              style={{
                backgroundColor: `${tag.color}15`,
                color: tag.color,
                borderColor: tag.color,
                borderWidth: "1.5px",
              }}
              variant="outline"
            >
              <div className="flex items-center">
                <span
                  className="h-2 w-2 rounded-full mr-1.5"
                  style={{ backgroundColor: tag.color }}
                ></span>
                {tag.tagName}
              </div>
            </Badge>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
