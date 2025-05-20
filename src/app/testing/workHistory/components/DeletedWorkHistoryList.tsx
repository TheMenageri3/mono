"use client";

import React from "react";
import { useWorkHistoryQueries } from "../hooks/useWorkHistoryQueries";
import { useWorkHistoryMutations } from "../hooks/useWorkHistoryMutations";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const DeletedWorkHistoryList: React.FC = () => {
  const { useDeletedWorkHistory } = useWorkHistoryQueries();
  const { useRestoreWorkHistory } = useWorkHistoryMutations();
  const { data, isLoading, isError } = useDeletedWorkHistory();
  const { restoreWorkHistory, isPending } = useRestoreWorkHistory();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 w-full bg-muted rounded-2xl p-4 shadow-sm"
          />
        ))}
      </div>
    );
  }

  if (isError || !data?.length) {
    return (
      <p className="text-muted-foreground">
        No deleted work history entries found.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((entry) => (
        <div
          key={entry.id}
          className="border rounded-2xl p-4 shadow-sm bg-muted/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
        >
          <div>
            <h3 className="text-lg font-medium">{entry.title}</h3>
            <p className="text-sm text-muted-foreground">{entry.companyName}</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(entry.startDate), "MMM yyyy")} –{" "}
              {entry.isCurrent
                ? "Present"
                : entry.endDate
                ? format(new Date(entry.endDate), "MMM yyyy")
                : "N/A"}
            </p>
            <Badge variant="outline" className="mt-1">
              {entry.employmentType.replace("_", " ")}
            </Badge>
          </div>

          <Button
            size="sm"
            variant="default"
            onClick={() => restoreWorkHistory({ id: entry.id })}
            disabled={isPending}
          >
            Restore
          </Button>
        </div>
      ))}
    </div>
  );
};
