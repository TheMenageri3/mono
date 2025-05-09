"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { InterviewType, InterviewStatus } from "@/generated/prisma";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateInterviewSchema } from "@/schemas";
import { useInterviewMutations } from "../hooks/useInterviewMutations";

type UpdateInterviewInput = z.infer<typeof updateInterviewSchema>;

export default function UpdateInterview() {
  const { useUpdateInterview } = useInterviewMutations();
  const { updateInterview, isPending } = useUpdateInterview();

  const form = useForm<UpdateInterviewInput>({
    resolver: zodResolver(updateInterviewSchema),
    defaultValues: {
      id: undefined,
      type: undefined,
      scheduledDate: undefined,
      durationMinutes: undefined,
      interviewLocationType: undefined,
      preparationNotes: undefined,
      status: undefined,
      feedback: undefined,
      candidateFeedback: undefined,
      nextSteps: undefined,
      intervieweeId: undefined,
      jobApplicationId: undefined,
      companyContactId: undefined,
    },
  });

  const onSubmit = (data: UpdateInterviewInput) => {
    updateInterview(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter interview ID (UUID)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="durationMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (in minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(Number(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preparationNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preparation Notes</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Preparation Notes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(InterviewType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(InterviewStatus).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update interview"}
        </Button>
      </form>
    </Form>
  );
}
