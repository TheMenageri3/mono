"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useCompanyMutations } from "../hooks/useCompanyMutations";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { updateCompanySchema } from "@/schemas";
import { showToast } from "@/components/ui/toast";

type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;

export default function UpdateCompany() {
  const { useUpdateCompany } = useCompanyMutations();
  // Only use properties that actually exist in the mutation hook
  const { updateCompany, isPending, error } = useUpdateCompany();

  const form = useForm<UpdateCompanyInput>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      id: "",
      name: undefined,
      description: undefined,
      headquarters: undefined,
      website: undefined,
      // Use logoId instead of logo if that's what your schema has
      logoId: undefined,
      active: undefined,
    },
  });

  // Handle form submission
  const onSubmit = (data: UpdateCompanyInput) => {
    console.log("Form submitted with data:", data);
    updateCompany(data);
  };

  // Log errors
  useEffect(() => {
    if (error) {
      console.error("Error updating company:", error);
    }
  }, [error]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter company ID (UUID)" />
              </FormControl>
              <FormDescription>
                Required: The unique identifier of the company to update
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Update company name" />
              </FormControl>
              <FormDescription>
                Optional: Leave blank to keep the current name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Update company description"
                  className="min-h-24"
                />
              </FormControl>
              <FormDescription>
                Optional: Leave blank to keep the current description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headquarters"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headquarters</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Update company headquarters location"
                />
              </FormControl>
              <FormDescription>
                Optional: Leave blank to keep the current headquarters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Update company website URL" />
              </FormControl>
              <FormDescription>
                Optional: Leave blank to keep the current website
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Using logoId instead of logo based on schema error */}
        <FormField
          control={form.control}
          name="logoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Update company logo ID" />
              </FormControl>
              <FormDescription>
                Optional: Leave blank to keep the current logo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Active</FormLabel>
              <FormDescription className="ml-2">
                Optional: Update company&apos;s active status
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Company"}
        </Button>
      </form>
    </Form>
  );
}
