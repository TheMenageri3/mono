"use client";
import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, FormField } from "~/_components/final/ui/form";
import { Textarea } from "~/_components/ui/textarea";
import { Button } from "~/_components/ui/button";
import { Dialog, DialogTrigger } from "~/_components/ui/dialog";
import { DialogContent } from "~/_components/ui/dialog";
import CustomFormItem from "~/_components/final/CustomForm";
import H3 from "~/_components/final/H3";

const JobPostSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  location: z.string().min(1, "Location is required"),
  jobDescription: z.string().min(1, "Job description is required"),
  skills: z.string().min(1, "Skills are required"),
  compensation: z.string().min(1, "Compensation is required"),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
});

const PostJobInputs = [
  {
    label: "Job Title",
    id: "jobTitle",
    placeholder: "Job Title",
  },
  {
    label: "Location",
    id: "location",
    placeholder: "Location",
  },
  {
    label: "Job Description",
    id: "jobDescription",
    placeholder: "Job Description",
  },
  {
    label: "Skills",
    id: "skills",
    placeholder: "Skills",
  },
  {
    label: "Compensation & Benefits",
    id: "compensation",
    placeholder: "Compensation & Benefits",
  },
  {
    label: "Application Deadline",
    id: "applicationDeadline",
    placeholder: "Application Deadline",
  },
];

export const PostJob = () => {
  return (
    <React.Fragment>
      <div className="flex w-full flex-col items-center gap-5 border-b border-zinc-200 p-10">
        <p className="font-bold text-zinc-800">
          Looking to Hire CHADS on solana...?
        </p>
        <PostJobModal />
      </div>
      <div className="flex w-full flex-col items-start p-5">
        <H3 className="mb-6 font-bold text-primary">Trending Flicks</H3>
      </div>
    </React.Fragment>
  );
};

const PostJobModal = () => {
  const form = useForm<z.infer<typeof JobPostSchema>>({
    resolver: zodResolver(JobPostSchema),
    defaultValues: {
      jobTitle: "",
      location: "",
      jobDescription: "",
      skills: "",
      compensation: "",
      applicationDeadline: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof JobPostSchema>) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Job posted:", values);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Post a Job</Button>
      </DialogTrigger>
      <DialogContent className="flex h-[90vh] flex-col overflow-hidden p-0 sm:max-w-[500px]">
        <div className="absolute left-0 right-0 top-0 z-10 bg-white p-6">
          <H3 className="font-bold text-zinc-700">Post a Job</H3>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="h-full pb-20 pt-16"
          >
            <div className="h-full overflow-y-auto px-6">
              <div className="flex w-full flex-col gap-[15px] py-4">
                {/* {PostJobInputs.map((input) => (
                  <FormField
                    key={input.id}
                    control={form.control}
                    name={input.id as keyof z.infer<typeof JobPostSchema>}
                    render={({ field }) => (
                      <CustomFormItem
                        label={input.label}
                        field={field}
                        placeholder={input.placeholder}
                        InputComponent={
                          input.id === "jobDescription" ? Textarea : undefined
                        }
                        inputProps={
                          input.id === "jobDescription"
                            ? { rows: 4 }
                            : undefined
                        }
                      />
                    )}
                  />
                ))} */}
              </div>
            </div>
          </form>
        </Form>
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-zinc-200 bg-white p-6">
          <Button
            type="submit"
            className="w-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(handleSubmit)}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit Job Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
