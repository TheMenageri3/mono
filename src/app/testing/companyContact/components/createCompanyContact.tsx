"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { EngagementLevel } from "@/generated/prisma";
import { useCompanyContactMutations } from "../hooks/useCompanyContactMutations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createCompanyContactSchema } from "@/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Type inference from schema
type CreateCompanyContactInput = z.infer<typeof createCompanyContactSchema>;

export default function CreateCompanyContact() {
  const { useCreateCompanyContact } = useCompanyContactMutations();
  const { createCompanyContact, isPending, isSuccess, isError, error, reset } =
    useCreateCompanyContact();

  const form = useForm<CreateCompanyContactInput>({
    resolver: zodResolver(createCompanyContactSchema),
    defaultValues: {
      companyId: "",
      userId: "",
      profileId: undefined,
      title: "",
      department: undefined,
      isPrimary: false,
      engagementLevel: EngagementLevel.PASSIVE,
      lastContactDate: undefined,
      notes: undefined,
    },
  });

  // Handle form submission
  const onSubmit = (data: CreateCompanyContactInput) => {
    createCompanyContact(data);
  };

  // Reset form after successful submission
  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  // Reset mutation state when form is unmounted
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Company ID */}
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter company ID" />
              </FormControl>
              <FormDescription>
                The ID of the company this contact belongs to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* User ID */}
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter user ID for this contact"
                />
              </FormControl>
              <FormDescription>
                The user associated with this contact
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profile ID (Optional) */}
        <FormField
          control={form.control}
          name="profileId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile ID (Optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter profile ID if applicable"
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                If this contact is linked to a specific profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter contact title" />
              </FormControl>
              <FormDescription>
                Job title or position of this contact
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Department (Optional) */}
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department (Optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter department"
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Department or division within the company
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Is Primary */}
        <FormField
          control={form.control}
          name="isPrimary"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Primary Contact</FormLabel>
                <FormDescription>
                  Mark this as a primary contact for the company
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Engagement Level */}
        <FormField
          control={form.control}
          name="engagementLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engagement Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select engagement level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={EngagementLevel.PASSIVE}>
                    Passive
                  </SelectItem>
                  <SelectItem value={EngagementLevel.RESPONSIVE}>
                    Responsive
                  </SelectItem>
                  <SelectItem value={EngagementLevel.INACTIVE}>
                    Inactive
                  </SelectItem>
                  <SelectItem value={EngagementLevel.ACTIVE}>Active</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The level of engagement of this contact
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Contact Date */}
        <FormField
          control={form.control}
          name="lastContactDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last Contact Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The last date this contact was contacted
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes (Optional) */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Additional notes about this contact"
                  className="min-h-20"
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Any additional information about this contact
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating..." : "Create Contact"}
        </Button>

        {/* Error Message */}
        {isError && (
          <div className="text-red-500 text-sm">
            Error: {error?.message || "Failed to create contact"}
          </div>
        )}
      </form>
    </Form>
  );
}
