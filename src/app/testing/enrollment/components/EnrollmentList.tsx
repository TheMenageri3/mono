"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";

export function EnrollmentList() {
  const { data: enrollments, isLoading } = api.enrollment.read.useQuery({});
  const deleteMutation = api.enrollment.delete.useMutation({
    onSuccess: () => api.useUtils().enrollment.read.invalidate(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollment List</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading…</div>
        ) : enrollments && enrollments.length ? (
          <div className="space-y-3">
            {enrollments.map((e) => (
              <div key={e.id} className="flex justify-between items-center border p-3 rounded">
                <div>
                  <p className="font-medium">{e.studentId}</p>
                  <p className="text-xs text-muted-foreground">{e.status}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate({ id: e.id })}
                  className="text-destructive"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-center py-12">
            No enrollments yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
