"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { EmploymentType } from "@/generated/prisma";

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
import { updatePlacementSchema } from "@/schemas";
import { usePlacementMutations } from "../hooks/usePlacementMutations";

type UpdatePlacementInput = z.infer<typeof updatePlacementSchema>;

export default function UpdatePlacements() {
  const { useUpdatePlacement } = usePlacementMutations();
  const { updatePlacement, isPending } = useUpdatePlacement();

  const form = useForm<UpdatePlacementInput>({
    resolver: zodResolver(updatePlacementSchema),
    defaultValues: {
      id: undefined,
      jobTitle: undefined,
      employmentType: undefined,
      startDatetime: undefined,
      endDatetime: undefined,
      isCurrent: undefined,
      salary: undefined,
      compensationDetails: undefined,
      matchQuality: undefined,
      verified: undefined,
      verificationDate: undefined,
      placementFacilitatorId: undefined,
      companyId: undefined,
    },
  });

  const onSubmit = (data: UpdatePlacementInput) => {
    console.log(data);

    updatePlacement(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placement ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter placement ID (UUID)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Placement Job Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="compensationDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compensation Details</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Compensation Details" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
{/* 
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDatetime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date & Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(new Date(e.target.value))
                    }
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
                    type="datetime-local"
                    {...field}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(new Date(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Company (UUID)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update placement"}
        </Button>
      </form>
    </Form>
  );
}
