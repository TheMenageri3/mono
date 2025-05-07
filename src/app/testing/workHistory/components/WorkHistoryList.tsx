"use client";

import React from "react";
import { useWorkHistoryQueries } from "../hooks/useWorkHistoryQueries";
import { useWorkHistoryMutations } from "../hooks/useWorkHistoryMutations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type WorkHistoryListProps = {
  profileId: string;
  onEdit?: (id: string) => void;
};

export const WorkHistoryList: React.FC<WorkHistoryListProps> = ({
  profileId,
  onEdit,
}) => {
  const { useAllWorkHistory } = useWorkHistoryQueries();
  const { useDeleteWorkHistory } = useWorkHistoryMutations();

  const { data, isLoading, isError } = useAllWorkHistory({});
  const { deleteWorkHistory, isPending: isDeleting } = useDeleteWorkHistory();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="opacity-50 animate-pulse">
            <CardContent className="p-4 space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-6 bg-muted rounded w-24 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return <p className="text-destructive">Failed to load work history.</p>;
  }

  const items = data.filter((item) => item.profileId === profileId);

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-muted-foreground">No work history entries found.</p>
      ) : (
        items.map((item) => (
          <Card key={item.id} className="relative">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.companyName}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {onEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item.id)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteWorkHistory({ id: item.id })}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{item.location}</p>
              <div className="text-sm text-muted-foreground">
                {format(new Date(item.startDate), "MMM yyyy")} -{" "}
                {item.isCurrent
                  ? "Present"
                  : item.endDate
                  ? format(new Date(item.endDate), "MMM yyyy")
                  : "N/A"}
              </div>
              <Badge variant="secondary">
                {item.employmentType.replace("_", " ")}
              </Badge>
              {item.verified && <Badge className="ml-2">Verified</Badge>}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
