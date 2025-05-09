"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectCollaboratorMutations } from "../hooks/useProjectCollaboratorMutations";

export default function CollaboratorManagement({ collaborators, projectId }: { collaborators: any[], projectId: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ userId: "", role: "editor", contributions: "", profileId: "" });
  const { useCreateProjectCollaborator } = useProjectCollaboratorMutations();
  const { createProjectCollaborator, isPending } = useCreateProjectCollaborator();

  function handleAdd() {
    createProjectCollaborator(
      {
        ...form,
        projectId,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setForm({ userId: "", role: "editor", contributions: "", profileId: "" });
        },
      }
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Project Collaborators</h3>
        <Button size="sm" onClick={() => setOpen(true)}>
          <span className="inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4 mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add People
          </span>
        </Button>
      </div>

      {/* Add Collaborator Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Collaborator</h2>
            <div className="space-y-4">
              <input
                className="w-full border rounded px-3 py-2 bg-black text-white placeholder:text-white/70"
                placeholder="User ID"
                value={form.userId}
                onChange={e => setForm(f => ({ ...f, userId: e.target.value }))}
              />
              <input
                className="w-full border rounded px-3 py-2 bg-black text-white placeholder:text-white/70"
                placeholder="Profile ID"
                value={form.profileId}
                onChange={e => setForm(f => ({ ...f, profileId: e.target.value }))}
              />
              <Select value={form.role} onValueChange={role => setForm(f => ({ ...f, role }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <input
                className="w-full border rounded px-3 py-2 bg-black text-white placeholder:text-white/70"
                placeholder="Contributions"
                value={form.contributions}
                onChange={e => setForm(f => ({ ...f, contributions: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={isPending}>
                {isPending ? "Adding..." : "Add"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="border rounded-md">
        <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 border-b text-sm font-medium">
          <div className="col-span-5">User</div>
          <div className="col-span-4">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y">
          {collaborators.map((collaborator) => (
            <div
              key={collaborator.id}
              className="grid grid-cols-12 gap-4 p-3 items-center"
            >
              <div className="col-span-5 flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={collaborator.avatar}
                    alt={collaborator.name}
                  />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">{collaborator.name}</span>
              </div>
              <div className="col-span-4 text-sm text-muted-foreground">
                {collaborator.email}
              </div>
              <div className="col-span-2">
                <Select defaultValue={collaborator.role.toLowerCase()}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1 text-right">
                {collaborator.role !== "Owner" && (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Remove</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/30 rounded-md p-4 text-sm">
        <p className="font-medium mb-1">About permission levels</p>
        <ul className="text-muted-foreground space-y-1">
          <li>
            <strong>Owner:</strong> Full access including adding/removing
            members
          </li>
          <li>
            <strong>Editor:</strong> Can edit content but can&apos;t change
            project settings
          </li>
          <li>
            <strong>Viewer:</strong> Can view content but can&apos;t make
            changes
          </li>
        </ul>
      </div>
    </div>
  );
}
