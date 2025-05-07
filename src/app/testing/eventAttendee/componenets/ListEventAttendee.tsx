"use client";

import React from "react";
import { useEventAttendeeQueries } from "../hooks/useEventAttendeeQueries";
import { useEventAttendeeMutations } from "../hooks/useEventAttendeeMutations";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { EventAttendanceStatus, EventAttendanceType } from "@/generated/prisma";

type ListEventAttendeeProps = {
  eventId?: string;
  viewType?: "byEvent" | "byStatus" | "byType" | "deleted";
};

export default function ListEventAttendee({
  eventId,
  viewType = "byEvent",
}: ListEventAttendeeProps) {
  const {
    useEventAttendeesByEventId,
    useEventAttendeesByStatus,
    useEventAttendeesByType,
    useDeletedEventAttendees,
  } = useEventAttendeeQueries();

  const { useDeleteEventAttendee, useRestoreEventAttendee } =
    useEventAttendeeMutations();
  const { deleteEventAttendee, isPending: isDeleting } =
    useDeleteEventAttendee();
  const { restoreEventAttendee, isPending: isRestoring } =
    useRestoreEventAttendee();

  const { data: attendeesByEvent, isLoading: isLoadingByEvent } =
    useEventAttendeesByEventId({
      eventId: eventId || "",
      limit: 10,
      offset: 0,
    });

  const { data: attendeesByStatus, isLoading: isLoadingByStatus } =
    useEventAttendeesByStatus({
      status: EventAttendanceStatus.ATTENDING,
      limit: 10,
      offset: 0,
    });

  const { data: attendeesByType, isLoading: isLoadingByType } =
    useEventAttendeesByType({
      type: EventAttendanceType.ATTENDEE,
      limit: 10,
      offset: 0,
    });

  const { data: deletedAttendees, isLoading: isLoadingDeleted } =
    useDeletedEventAttendees({ limit: 10, offset: 0 });

  // Determine which data to display based on viewType
  const attendees =
    viewType === "byEvent"
      ? attendeesByEvent
      : viewType === "byStatus"
      ? attendeesByStatus
      : viewType === "byType"
      ? attendeesByType
      : deletedAttendees;

  const isLoading =
    viewType === "byEvent"
      ? isLoadingByEvent
      : viewType === "byStatus"
      ? isLoadingByStatus
      : viewType === "byType"
      ? isLoadingByType
      : isLoadingDeleted;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!attendees?.length) return <div>No attendees found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {attendees.map((attendee) => (
        <Card key={attendee.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Attendee</CardTitle>
              <span className="text-sm text-muted-foreground">
                {attendee.attendanceType}
              </span>
            </div>
            <CardDescription>
              Status: {attendee.attendanceStatus}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Event ID</p>
                <p className="text-sm text-muted-foreground">
                  {attendee.eventId}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Attendee ID</p>
                <p className="text-sm text-muted-foreground">
                  {attendee.attendeeId}
                </p>
              </div>
              {attendee.notes && (
                <div>
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm text-muted-foreground">
                    {attendee.notes}
                  </p>
                </div>
              )}
              {attendee.feedback && (
                <div>
                  <p className="text-sm font-medium">Feedback</p>
                  <p className="text-sm text-muted-foreground">
                    {attendee.feedback}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-sm text-muted-foreground">
              Created: {new Date(attendee.createdAt).toLocaleDateString()}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              {viewType === "deleted" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => restoreEventAttendee({ id: attendee.id })}
                  disabled={isRestoring}
                >
                  Restore
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteEventAttendee({ id: attendee.id })}
                  disabled={isDeleting}
                >
                  Delete
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
