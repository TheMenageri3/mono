"use client";

import React from "react";
import { useWorkHistoryQueries } from "../hooks/useWorkHistoryQueries";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type WorkHistoryDetailsProps = {
  id: string;
};

export const WorkHistoryDetails: React.FC<WorkHistoryDetailsProps> = ({
  id,
}) => {
  const { useWorkHistoryById } = useWorkHistoryQueries();
  const { data, isLoading, isError } = useWorkHistoryById({ id });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-1/2 bg-muted rounded" />
        <div className="h-4 w-1/3 bg-muted rounded" />
        <div className="h-20 w-full bg-muted rounded" />
        <div className="h-4 w-1/4 bg-muted rounded" />
        <div className="h-6 w-32 bg-muted rounded" />
        <div className="h-16 w-full bg-muted rounded" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-destructive">Failed to load work history details.</p>
    );
  }

  const {
    title,
    companyName,
    location,
    description,
    startDate,
    endDate,
    isCurrent,
    employmentType,
    achievements,
    references,
    verified,
  } = data;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Badge variant="secondary">{employmentType.replace("_", " ")}</Badge>
          {verified && <Badge>Verified</Badge>}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {format(new Date(startDate), "MMM yyyy")} –{" "}
        {isCurrent
          ? "Present"
          : endDate
          ? format(new Date(endDate), "MMM yyyy")
          : "N/A"}
      </p>

      <p className="text-sm">{location}</p>

      <div>
        <h3 className="font-medium">Description</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {description}
        </p>
      </div>

      {achievements && (
        <div>
          <h3 className="font-medium">Achievements</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {achievements}
          </p>
        </div>
      )}

      {references && (
        <div>
          <h3 className="font-medium">References</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {references}
          </p>
        </div>
      )}
    </div>
  );
};
