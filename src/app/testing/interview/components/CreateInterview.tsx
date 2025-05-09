"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useInterviewMutations } from "../hooks/useInterviewMutations";
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
import { createInterviewSchema } from "@/schemas";
import {
  InterviewType,
  InterviewLocationType,
  InterviewStatus,
} from "@/generated/prisma";
import { api } from "@/trpc/react";

type CreateInterviewInput = z.infer<typeof createInterviewSchema>;

const CreateInterview = () => {
  const { useCreateInterview } = useInterviewMutations();
  const { createInterview, isPending } = useCreateInterview();

  const form = useForm<CreateInterviewInput>({
    resolver: zodResolver(createInterviewSchema),
    defaultValues: {
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

  const onSubmit = (data: CreateInterviewInput) => {
    createInterview(data);
  };

  const { data: companyContacts } = api.companyContact.read.useQuery({});
  const { data: jobApplications } = api.jobApplication.readAll.useQuery({});
  const { data: profiles } = api.profile.read.useQuery({});

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview Type</FormLabel>
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
          name="scheduledDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scheduled Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value?.toISOString().substring(0, 10) || ""}
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
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
              <FormLabel>Duration (Minutes)</FormLabel>
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
          name="interviewLocationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(InterviewLocationType).map((type) => (
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
          name="preparationNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preparation Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="preparation notes"
                  value={field.value || ""}
                />
              </FormControl>
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
                    <SelectValue placeholder="Select status" />
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
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="feedback"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="candidateFeedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Candidate Feedback (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="candidate feedback"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nextSteps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Next Steps (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="next step"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Required IDs */}

        <FormField
          control={form.control}
          name="jobApplicationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Application</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job application" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobApplications &&
                    jobApplications.length > 0 &&
                    jobApplications.map((jb) => (
                      <SelectItem key={jb.id} value={jb.id}>
                        {jb.id}
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
          name="intervieweeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interviewee Id</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Interviewee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {profiles &&
                    profiles.length > 0 &&
                    profiles.map((profile) => {
                      return (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.firstName} {profile.lastName}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyContactId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Contact (optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company contact" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companyContacts &&
                    companyContacts.length > 0 &&
                    companyContacts.map((cmp) => (
                      <SelectItem key={cmp.id} value={cmp.id}>
                        {cmp.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Interview"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateInterview;
