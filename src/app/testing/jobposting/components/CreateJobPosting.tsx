"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createJobPostingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useJobPostingMutations } from "../hooks/useJobPostingMutations";
import { useJobPostingQueries } from "../hooks/useJobPostingQueries";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type CreateJobPostingInput = z.infer<typeof createJobPostingSchema>;

const CreateJobPosting = () => {
  const { useCreateJobPosting } = useJobPostingMutations();
  const { createJobPosting, isPending } = useCreateJobPosting();
  const {useAllCompany, useAllIndustry} = useJobPostingQueries()
  const {data: companies} = useAllCompany()
  const {data: industries} = useAllIndustry()
  
    const { data: session, status } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<CreateJobPostingInput>({
    resolver: zodResolver(createJobPostingSchema),
    defaultValues: {
      title: "",
      description: "",
      shortDescription: "",
      location: "",
      remoteOption: undefined,
      employmentType: undefined,
      experienceLevel: undefined,
      educationRequirements: "",
      salaryMin: undefined,
      salaryMax: undefined,
      benefits: "",
      applicationInstructions: "",
      externalPostingUrl: "",
      internalNotes: "",
      status: "DRAFT",
      postedDate: new Date(),
      deadlineDate: new Date(),     
      companyId: companies && companies[0].id,
      hiringManagerId: session?.user.id,
      industryIds: [] 
    },
  });

  const onSubmit = (data: CreateJobPostingInput) => {
    console.log(data, "data")
    createJobPosting(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter title" className="col-span-3" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="shortDescription" className="text-right">
                    Short Description
                  </Label>
                  <FormControl>
                    <Textarea
                      id="shortDescription"
                      className="col-span-3"
                      placeholder="Short description"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Full Description
                  </Label>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Full description"
                      {...field}
                      className="col-span-3"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remoteOption"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4 text-right">
                  <FormLabel>Remote Option</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {" "}
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select remote option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ON_SITE">On Site</SelectItem>
                        <SelectItem value="HYBRID">Hybrid</SelectItem>
                        <SelectItem value="REMOTE">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4 text-right">
                  <FormLabel>Employment Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {" "}
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FULL_TIME">Full Time</SelectItem>
                        <SelectItem value="PART_TIME">Part Time</SelectItem>
                        <SelectItem value="CONTRACT">Contract</SelectItem>
                        <SelectItem value="INTERNSHIP">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4 text-right">
                  <FormLabel>Experience level</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {" "}
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ENTRY">Entry Level</SelectItem>
                        <SelectItem value="MID">Mid Level</SelectItem>
                        <SelectItem value="SENIOR">Senior Level</SelectItem>
                        <SelectItem value="EXECUTIVE">
                          Executive Level
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="educationRequirements"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Education Requirements
                  </Label>
                  <FormControl>
                    <Textarea
                      id="educationRequirements"
                      {...field}
                      value={field.value ?? ""}
                      className="col-span-3"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <FormControl>
                    <Input id="location" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary" className="text-right">
              Salary Range
            </Label>
            <div className="col-span-3 flex gap-4">
              <FormField
                control={form.control}
                name="salaryMax"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="salaryMax"
                        type="number"
                        placeholder="Max"
                        // {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryMin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="salaryMin"
                        type="number"
                        placeholder="Min"
                        // {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="benefits"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="benefits" className="text-right">
                    Benefits
                  </Label>
                  <FormControl>
                    <Textarea
                      id="benefits"
                      className="col-span-3"
                      placeholder="List the benefits package"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="applicationInstructions"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="applicationInstructions"
                    className="text-right"
                  >
                    Application Instructions
                  </Label>
                  <FormControl>
                    <Textarea
                      id="applicationInstructions"
                      className="col-span-3"
                      placeholder="How to apply for this position"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
            <FormField
              control={form.control}
              name="industryIds"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Industries</Label>
                    <div className="col-span-3 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {industries?.map((industry) => (
                          <Badge
                            key={industry.id}
                            variant={field.value.includes(industry.id) ? "default" : "outline"}
                            className={`cursor-pointer text-sm py-1.5 ${
                              field.value.includes(industry.id) ? "" : "hover:bg-muted"
                            }`}
                            onClick={() => {
                              const newValue = field.value.includes(industry.id)
                                ? field.value.filter((id) => id !== industry.id)
                                : [...field.value, industry.id];
                              field.onChange(newValue);
                            }}
                          >
                            {industry.name}
                            {field.value.includes(industry.id) && <Check className="ml-1 h-3 w-3" />}
                          </Badge>
                        ))}
                      </div>
                      {field.value.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {field.value.length} industry
                          {field.value.length !== 1 ? "ies" : ""} selected
                        </p>
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
           

          <FormField
            control={form.control}
            name="externalPostingUrl"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="externalPostingUrl" className="text-right">
                    External URL
                  </Label>
                  <FormControl>
                    <Input
                      id="externalPostingUrl"
                      className="col-span-3"
                      placeholder="Link to external job posting"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadlineDate"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deadlineDate" className="text-right">
                    Application Deadline
                  </Label>
                  <FormControl>
                    <DatePicker date={field.value} onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Job Posting"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobPosting;
