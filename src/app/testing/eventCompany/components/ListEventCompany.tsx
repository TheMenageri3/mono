"use client";

import React from "react";
import { useEventCompanyQueries } from "../hooks/useEventCompanyQueries";
import { useEventCompanyMutations } from "../hooks/useEventCompanyMutations";
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

type ListEventCompanyProps = {
  eventId?: string;
  viewType?: "byEvent" | "byStatus" | "byType" | "deleted";
};

export default function ListEventCompany({
  eventId,
  viewType = "byEvent",
}: ListEventCompanyProps) {
  const {
    useEventCompaniesByEventId,
    useEventCompanyByAttendanceStatus,
    useEventCompanyByAttendanceType,
    useAllEventCompanies,
    useDeletedEventCompanies,
  } = useEventCompanyQueries();

  const { useDeleteEventCompany, useRestoreEventCompany } =
    useEventCompanyMutations();
  const { deleteEventCompany, isPending: isDeleting } = useDeleteEventCompany();
  const { restoreEventCompany, isPending: isRestoring } =
    useRestoreEventCompany();

  const { data: companiesByEvent, isLoading: isLoadingByEvent } =
    useEventCompaniesByEventId({
      eventId: eventId || "",
      limit: 10,
      offset: 0,
    });

  const { data: companiesByStatus, isLoading: isLoadingByStatus } =
    useEventCompanyByAttendanceStatus({
      attendanceStatus: EventAttendanceStatus.ATTENDING,
      limit: 10,
      offset: 0,
    });

  const { data: companiesByType, isLoading: isLoadingByType } =
    useEventCompanyByAttendanceType({
      attendanceType: EventAttendanceType.SPONSOR,
      limit: 10,
      offset: 0,
    });

  const { data: allCompanies, isLoading: isLoadingAll } = useAllEventCompanies({
    limit: 10,
    offset: 0,
  });

  const { data: deletedCompanies, isLoading: isLoadingDeleted } =
    useDeletedEventCompanies({
      limit: 10,
      offset: 0,
    });

  // Determine which data to display based on viewType
  const companies =
    viewType === "byEvent"
      ? companiesByEvent
      : viewType === "byStatus"
      ? companiesByStatus
      : viewType === "byType"
      ? companiesByType
      : viewType === "deleted"
      ? deletedCompanies
      : allCompanies;

  const isLoading =
    viewType === "byEvent"
      ? isLoadingByEvent
      : viewType === "byStatus"
      ? isLoadingByStatus
      : viewType === "byType"
      ? isLoadingByType
      : viewType === "deleted"
      ? isLoadingDeleted
      : isLoadingAll;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!companies?.length) return <div>No companies found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <Card key={company.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Company</CardTitle>
              <span className="text-sm text-muted-foreground">
                {company.attendanceType}
              </span>
            </div>
            <CardDescription>
              Status: {company.attendanceStatus}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Event ID</p>
                <p className="text-sm text-muted-foreground">
                  {company.eventId}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Company ID</p>
                <p className="text-sm text-muted-foreground">
                  {company.companyId}
                </p>
              </div>
              {company.notes && (
                <div>
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm text-muted-foreground">
                    {company.notes}
                  </p>
                </div>
              )}
              {company.feedback && (
                <div>
                  <p className="text-sm font-medium">Feedback</p>
                  <p className="text-sm text-muted-foreground">
                    {company.feedback}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-sm text-muted-foreground">
              Created: {new Date(company.createdAt).toLocaleDateString()}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              {viewType === "deleted" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => restoreEventCompany({ id: company.id })}
                  disabled={isRestoring}
                >
                  Restore
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteEventCompany({ id: company.id })}
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
