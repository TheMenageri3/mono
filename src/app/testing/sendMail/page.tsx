"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { showToast } from "@/components/ui/toast";

export default function SendMailPage() {
  const { data: users, isLoading: loadingUsers } = api.user.read.useQuery({});
  const { data: templates } = api.emailTemplate.readAll.useQuery({});
  const sendMutation = api.email.send.useMutation();

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [templateId, setTemplateId] = useState<string>("");

  const handleUserToggle = (id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSend = async () => {
    if (!templateId || selectedUserIds.length === 0) {
      showToast.error({ title: "Missing data", description: "Select users and a template." });
      return;
    }

    const template = templates?.find((t) => t.id === templateId);
    if (!template) {
      showToast.error({ title: "Template not found" });
      return;
    }

    const selectedUsers = users?.filter((u: any) => selectedUserIds.includes(u.id)) ?? [];

    for (const user of selectedUsers) {
      const variableObject: Record<string, any> = {};

      for (const key of template.variables ?? []) {
        const [root, nested] = key.split(".");
        if (!variableObject[root]) variableObject[root] = {};

        if (root === "user" && nested) {
          variableObject.user[nested] = user[nested as keyof typeof user];
        }

        if (root === "company" && nested) {
          variableObject.company = variableObject.company || {};
          variableObject.company[nested] = "Menageri3"; // Replace with actual company info if needed
        }
      }

      await sendMutation.mutateAsync({
        to: user.email,
        templateId,
        variables: variableObject,
      });
    }

    showToast.success({ title: "Emails sent" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Email to Users</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select Email Template</Label>
          <Select onValueChange={setTemplateId} value={templateId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a template..." />
            </SelectTrigger>
            <SelectContent>
              {templates?.map((t: any) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Select Users</Label>
          <div className="max-h-[300px] overflow-y-auto border rounded p-2">
            {loadingUsers ? (
              <p>Loading users...</p>
            ) : (
              users?.map((u: any) => (
                <div key={u.id} className="flex items-center gap-2 py-1">
                  <Checkbox
                    id={u.id}
                    checked={selectedUserIds.includes(u.id)}
                    onCheckedChange={() => handleUserToggle(u.id)}
                  />
                  <Label htmlFor={u.id}>{u.name || u.email}</Label>
                </div>
              ))
            )}
          </div>
        </div>

        <Button onClick={handleSend} disabled={sendMutation.isPending}>
          {sendMutation.isPending ? "Sending..." : "Send Email"}
        </Button>
      </CardContent>
    </Card>
  );
}