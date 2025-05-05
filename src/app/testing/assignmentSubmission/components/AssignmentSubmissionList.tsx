"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";

export function AssignmentSubmissionList() {
  const { data: submissions, isLoading } = api.assignmentSubmission.read.useQuery({});
  const utils = api.useUtils();

  const deleteMutation = api.assignmentSubmission.delete.useMutation({
    onSuccess: () => utils.assignmentSubmission.read.invalidate(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading…</div>
        ) : submissions && submissions.length ? (
          <div className="space-y-3">
            {submissions.map((s) => (
              <div
                key={s.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <p className="font-medium">{s.assignmentId}</p>
                  <p className="text-sm text-muted-foreground">{s.status}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate({ id: s.id })}
                  className="text-destructive"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-center py-12">
            No submissions yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
