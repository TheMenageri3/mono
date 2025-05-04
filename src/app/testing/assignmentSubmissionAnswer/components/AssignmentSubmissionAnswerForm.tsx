"use client";

import React from "react";
import { useAssignmentSubmissionAnswerForm } from "../hooks/useAssignmentSubmissionAnswerForm";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { KeyValueField } from "@/components/ui/keyvaluefield";

export default function AssignmentSubmissionAnswerForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const { form, createMutation } = useAssignmentSubmissionAnswerForm(onClose);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Create Assignment Submission Answer</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={handleSubmit((data) => createMutation.mutate(data))}
          className="space-y-4"
        >
          <FormField
            control={control}
            name="assignmentSubmissionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignment Submission ID</FormLabel>
                <FormControl>
                  <Input placeholder="submission_123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="questionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question ID</FormLabel>
                <FormControl>
                  <Input placeholder="question_456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="assignmentQuestionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignment Question ID</FormLabel>
                <FormControl>
                  <Input placeholder="assignment_question_789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer Value</FormLabel>
                <FormControl>
                  <KeyValueField
                    label="Key-Value Answer"
                    description="answer values"
                    onChange={(json) => field.onChange(json)}
                  />
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
                  <Input placeholder="user_abc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="answerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer ID (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="answer_xyz" {...field} />
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
            name="pointsAwarded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points Awarded</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
