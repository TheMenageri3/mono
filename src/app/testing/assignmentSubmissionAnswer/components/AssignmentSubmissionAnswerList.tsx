"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";

export function AssignmentSubmissionAnswerList() {
  const utils = api.useUtils();

  const { data: answers, isLoading } = api.assignmentSubmissionAnswer.read.useQuery({
    limit: 50,
    offset: 0,
  });

  const deleteMutation = api.assignmentSubmissionAnswer.delete.useMutation({
    onSuccess: () => utils.assignmentSubmissionAnswer.read.invalidate(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment Submission Answers</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading…</div>
        ) : answers && answers.length ? (
          <div className="space-y-3">
            {answers.map((answer) => (
              <div
                key={answer.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <p className="font-medium">Submitter: {answer.submitterId}</p>
                  <p className="text-xs text-muted-foreground">
                    Submission ID: {answer.assignmentSubmissionId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Question ID: {answer.questionId}
                  </p>
                  {answer.pointsAwarded !== undefined && (
                    <p className="text-xs text-muted-foreground">
                      Points Awarded: {answer.pointsAwarded}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate({ id: answer.id })}
                  className="text-destructive"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-center py-12">
            No assignment submission answers yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
