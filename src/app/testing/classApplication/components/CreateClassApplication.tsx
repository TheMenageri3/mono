"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useClassApplicationMutations } from "../hooks/useClassApplicationMutations";
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
import { createClassApplicationSchema } from "@/schemas";
import { ApplicationStatus } from "@/generated/prisma";
import { api } from "@/trpc/react";

type CreateClassApplicationInput = z.infer<typeof createClassApplicationSchema>;

const CreateClassApplication = () => {
  const { useCreateClassApplication } = useClassApplicationMutations();
  const { createClassApplication, isPending } = useCreateClassApplication();

  const form = useForm<CreateClassApplicationInput>({
    resolver: zodResolver(createClassApplicationSchema),
    defaultValues: {
      title: "",
      description: "",
      status: undefined,
      startDatetime: undefined,
      endDatetime: undefined,
      classId: "",
      publisherId: "",
    },
  });

  const onSubmit = (data: CreateClassApplicationInput) => {
    createClassApplication(data);
  };

  const { data: classes } = api.class.read.useQuery({});

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
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

        {/* Description */}
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

        {/* Class application Status */}
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

        {/* Required IDs */}
        <FormField
          control={form.control}
          name="classId"
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
                  {classes &&
                    classes.length > 0 &&
                    classes.map((class_) => (
                      <SelectItem key={class_.id} value={class_.id}>
                        {class_.title}
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

export default CreateClassApplication;
