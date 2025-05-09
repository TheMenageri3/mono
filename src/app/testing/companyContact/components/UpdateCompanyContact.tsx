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
import { updateCompanyContactSchema } from "@/schemas";
import { showToast } from "@/components/ui/toast";
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

type UpdateCompanyContactInput = z.infer<typeof updateCompanyContactSchema>;

export default function UpdateCompanyContact() {
  const { useUpdateCompanyContact } = useCompanyContactMutations();
  const { updateCompanyContact, isPending, error } = useUpdateCompanyContact();

  const form = useForm<UpdateCompanyContactInput>({
    resolver: zodResolver(updateCompanyContactSchema),
    defaultValues: {
      id: "",
      title: undefined,
      department: undefined,
      isPrimary: undefined,
      engagementLevel: undefined,
      lastContactDate: undefined,
      notes: undefined,
      companyId: undefined,
      userId: undefined,
      profileId: undefined,
    },
  });

  // Handle form submission
  const onSubmit = (data: UpdateCompanyContactInput) => {
    console.log("Form submitted with data:", data);
    updateCompanyContact(data);
  };

  // Log errors
  useEffect(() => {
    if (error) {
      console.error("Error updating company contact:", error);
    }
  }, [error]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact ID */}
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter contact ID (UUID)" />
              </FormControl>
              <FormDescription>
                Required: The unique identifier of the contact to update
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
                <Input
                  {...field}
                  placeholder="Update contact title"
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Optional: Update the title of this contact
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Department */}
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Update department"
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Optional: Update the department</FormDescription>
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
                  Update whether this is a primary contact
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
                    <SelectValue placeholder="Update engagement level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={EngagementLevel.PASSIVE}>
                    Passive
                  </SelectItem>
                  <SelectItem value={EngagementLevel.RESPONSIVE}>
                    Interested
                  </SelectItem>
                  <SelectItem value={EngagementLevel.INACTIVE}>
                    Engaged
                  </SelectItem>
                  <SelectItem value={EngagementLevel.ACTIVE}>Active</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Optional: Update the level of engagement of this contact
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
                Optional: Update the last contact date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company ID */}
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company ID</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Update company ID"
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Optional: Update the company this contact belongs to
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
                  placeholder="Update user ID"
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Optional: Update the user ID</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profile ID */}
        <FormField
          control={form.control}
          name="profileId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile ID</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Update profile ID"
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Optional: Update the profile ID</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Update notes about this contact"
                  className="min-h-20"
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Optional: Update additional information about this contact
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Contact"}
        </Button>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error.message || "An error occurred while updating the contact"}
          </div>
        )}
      </form>
    </Form>
  );
}
