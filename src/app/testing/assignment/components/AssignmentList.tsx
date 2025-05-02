import React from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileTextIcon, PencilIcon, Trash2Icon } from "lucide-react";

export default function AssignmentList() {
  const { data: assignments, isLoading } = api.assignment.read.useQuery({ classId: "" });
  const updateMutation = api.assignment.update.useMutation();
  const deleteMutation = api.assignment.delete.useMutation();

  if (isLoading) return <p>Loading…</p>;

  if (!assignments?.length) {
    return (
      <div className="py-12 text-center border border-dashed rounded-lg">
        <FileTextIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground">No assignments yet.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {assignments.map((a) => (
          <Card key={a.id} className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-xs text-muted-foreground">{a.description}</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => updateMutation.mutate({ id: a.id, data: {} })}>
                <PencilIcon className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteMutation.mutate({ id: a.id })}>
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
