"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { usePlacementMutations } from "../hooks/usePlacementMutations";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPlacementSchema } from "@/schemas";
import { EmploymentType, MatchQuality } from "@/generated/prisma";
import { api } from "@/trpc/react";

type CreatePlacementInput = z.infer<typeof createPlacementSchema>;

const CreatePlacement = () => {
  const { useCreatePlacement } = usePlacementMutations();
  const { createPlacement, isPending } = useCreatePlacement();

  const form = useForm<CreatePlacementInput>({
    resolver: zodResolver(createPlacementSchema),
    defaultValues: {
      jobTitle: "",
      employmentType: undefined,
      startDatetime: undefined,
      endDatetime: undefined,
      isCurrent: true,
      salary: undefined,
      compensationDetails: undefined,
      matchQuality: undefined,
      verified: undefined,
      verificationDate: undefined,
      profileId: "",
      companyId: "",
      jobApplicationId: undefined,
      placementFacilitatorId: "",
    },
  });

  const onSubmit = (data: CreatePlacementInput) => {
    createPlacement(data);
  };

  const { data: companies } = api.company.read.useQuery({});
  const { data: jobApplications } = api.jobApplication.readAll.useQuery({});
  const { data: profiles } = api.profile.read.useQuery({});

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Job Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Compensation Details */}
        <FormField
          control={form.control}
          name="compensationDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compensation Details</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="compensation details"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Employment Type */}
        <FormField
          control={form.control}
          name="employmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(EmploymentType).map((type) => (
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

        {/* Match Quality */}
        <FormField
          control={form.control}
          name="matchQuality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Match Quality</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select match quality" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(MatchQuality).map((type) => (
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

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDatetime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date & Time</FormLabel>
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
            name="endDatetime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date & Time</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="isCurrent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is Current Placement</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
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
          name="verified"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is Placement Verified?</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="verificationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Date</FormLabel>
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

        {/* Required IDs */}
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companies &&
                    companies.length > 0 &&
                    companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
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
          name="placementFacilitatorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placement Facilitator Id</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Placement Facilitator" />
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
          name="profileId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile ID</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job application" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {profiles &&
                    profiles.length > 0 &&
                    profiles.map((profile) => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.firstName} {profile.lastName}
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
          {isPending ? "Creating..." : "Create Class Application"}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePlacement;
