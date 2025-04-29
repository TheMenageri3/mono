"use client";

import React from "react";
import { useEventQueries } from "../hooks/useEventQueries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ListEvent() {
  const { useAllEvents } = useEventQueries();
  const { data: events, isLoading, error } = useAllEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!events?.length) return <div>No events found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{event.title}</CardTitle>
              <span className="text-sm text-muted-foreground">
                {event.type}
              </span>
            </div>
            <CardDescription>{event.shortDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Date & Time</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.startDatetime).toLocaleString()} -{" "}
                  {new Date(event.endDatetime).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {event.isVirtual ? "Virtual Event" : "In-Person Event"}
                  {event.isVirtual && event.virtualMeetingUrl && (
                    <a
                      href={event.virtualMeetingUrl}
                      className="ml-2 text-primary hover:underline"
                    >
                      Join Meeting
                    </a>
                  )}
                </p>
              </div>
              {event.registrationRequired && (
                <div>
                  <p className="text-sm font-medium">Registration</p>
                  <p className="text-sm text-muted-foreground">
                    Required
                    {event.registrationUrl && (
                      <a
                        href={event.registrationUrl}
                        className="ml-2 text-primary hover:underline"
                      >
                        Register Now
                      </a>
                    )}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-sm text-muted-foreground">
              Status: {event.status}
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
