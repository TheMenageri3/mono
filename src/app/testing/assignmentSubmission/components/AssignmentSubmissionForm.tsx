"use client";

import React from "react";
import { useAssignmentSubmissionForm } from "../hooks/useAssignmentSubmissionForm";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SubmissionStatus } from "@/generated/prisma";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AssignmentSubmissionForm({ onClose }: { onClose: () => void }) {
  const { form, createMutation } = useAssignmentSubmissionForm(onClose);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Create Assignment Submission</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit((data) => createMutation.mutate(data))}>
          <ScrollArea className="h-[70vh] pr-2">
            <div className="space-y-4 pb-6">
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(SubmissionStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="submissionText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Submission Text</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter text..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="submissionUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Submission URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="submittedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Submitted At</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="gradedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graded At</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Score</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter feedback..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="gradedById"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graded By</FormLabel>
                    <FormControl>
                      <Input placeholder="Grader ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="submitterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Submitter ID</FormLabel>
                    <FormControl>
                      <Input placeholder="User ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="assignmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignment ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Assignment ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || createMutation.isPending}>
              {createMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
