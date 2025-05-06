"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { ApplicationStatus } from "@/generated/prisma";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateClassApplicationSchema } from "@/schemas";
import { useClassApplicationMutations } from "../hooks/useClassApplicationMutations";

type UpdateClassApplicationInput = z.infer<typeof updateClassApplicationSchema>;

export default function UpdateClassApplication() {
  const { useUpdateClassApplication } = useClassApplicationMutations();
  const { updateClassApplication, isPending } = useUpdateClassApplication();

  const form = useForm<UpdateClassApplicationInput>({
    resolver: zodResolver(updateClassApplicationSchema),
    defaultValues: {
      id: undefined,
      title: undefined,
      description: undefined,
      status: undefined,
      startDatetime: undefined,
      endDatetime: undefined,
      classId: undefined,
      publisherId: undefined,
    },
  });

  const onSubmit = (data: UpdateClassApplicationInput) => {
    updateClassApplication(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Application ID</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter class application ID (UUID)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Class application title" />
              </FormControl>
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
                <Input {...field} placeholder="Class application description" />
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
              <FormLabel>Class Application Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class application status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ApplicationStatus).map((type) => (
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
                      field.value ? field.value.toISOString().slice(0, 16) : ""
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
                      field.value ? field.value.toISOString().slice(0, 16) : ""
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
        </div>

        <FormField
          control={form.control}
          name="classId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Application ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter class ID (UUID)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Class Application"}
        </Button>
      </form>
    </Form>
  );
}
