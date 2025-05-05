"use client";

import React from "react";
import { useClassApplicationQueries } from "../hooks/useClassApplicationQueries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export function ListClassApplication() {
  const { useAllClassApplications } = useClassApplicationQueries();
  const {
    data: allClassApplications,
    isLoading,
    error: errorAll,
  } = useAllClassApplications(defaultQueryParams);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorAll) {
    return <div>Error: {errorAll.message}</div>;
  }

  // if (!allClassApplications?.length)
  //   return <div>No class applications found</div>;

  return (
    <div className="space-y-6">
      {/* All Class Applications */}
      <Card>
        <CardHeader>
          <CardTitle>All Class Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {allClassApplications && allClassApplications.length > 0 ? (
            <ul className="space-y-3">
              {allClassApplications.map((classApplication) => (
                <li
                  key={classApplication.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">
                      Title: {classApplication.title}
                    </p>
                    <p className="font-medium">
                      Description: {classApplication.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status: {classApplication.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Start Date: {classApplication.startDatetime.toISOString()},
                      End Date: {classApplication.endDatetime.toISOString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No class applications found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
