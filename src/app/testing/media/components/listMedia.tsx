"use client";

import React from "react";
import { useMediaQueries } from "../hooks/useMediaQueries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function ListMedia() {
  const { useAllMedia } = useMediaQueries();
  const { data: medias, isLoading, error } = useAllMedia();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!medias?.length) return <div>No events found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {medias.map((media) => (
        <Card key={media.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{media.title}</CardTitle>
            </div>
            <CardDescription>
              Storage Type - {media.storageType}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Details</p>
                <p className="text-sm text-muted-foreground">
                  Media Type - {media.type}
                </p>
                <p className="text-sm text-muted-foreground">
                  url - {media.url}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
