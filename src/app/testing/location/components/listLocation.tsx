"use client";

import React from "react";
import { useLocationQueries } from "../hooks/useLocationQueries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ListLocation() {
  const { useAllLocations } = useLocationQueries();
  const { data: locations, isLoading, error } = useAllLocations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!locations?.length) return <div>No events found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <Card key={location.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{location.name}</CardTitle>
              <span className="text-sm text-muted-foreground">
                type: {location.type}
              </span>
            </div>
            <CardDescription>Address - {location.addressLine1}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  country - {location.country}
                </p>
                <p className="text-sm text-muted-foreground">
                  city - {location.city}
                </p>
                <p className="text-sm text-muted-foreground">
                  state province - {location.stateProvince}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-sm text-muted-foreground">
              capacity: {location.capacity}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
