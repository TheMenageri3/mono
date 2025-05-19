"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";

export function EmailTemplateList() {
  const utils = api.useUtils();
  const { data: templates, isLoading } = api.emailTemplate.readAll.useQuery({});
  const deleteMutation = api.emailTemplate.delete.useMutation({
    onSuccess: () => utils.emailTemplate.readAll.invalidate(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Templates</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading…</div>
        ) : templates && templates.length ? (
          <div className="space-y-3">
            {templates.map((t) => (
              <div key={t.id} className="flex justify-between items-center border p-3 rounded">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.subject}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate({ id: t.id })}
                  className="text-destructive"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-center py-12">
            No email templates yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
