"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { QuarterType, StatusType } from "@/generated/prisma";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateClassSchema } from "@/schemas";
import { useClassMutations } from "../hooks/useClassroomMutations";

type UpdateClassroomInput = z.infer<typeof updateClassSchema>;

export default function UpdateClassroom() {
  const { useUpdateClass } = useClassMutations();
  const { updateClass, isPending } = useUpdateClass();

  const form = useForm<UpdateClassroomInput>({
    resolver: zodResolver(updateClassSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      shortDescription: "",
      year: new Date().getFullYear(),
      quarter: QuarterType.FALL,
      status: StatusType.ACTIVE,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      enrollmentCapacity: 30,
      syllabusUrl: "",
      meetingSchedule: "",
      location: "",
    },
  });

  const onSubmit = (data: UpdateClassroomInput) => {
    updateClass(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classroom ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter classroom ID (UUID)" />
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
                <Input {...field} placeholder="Course Title" />
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
                <Input {...field} placeholder="Full description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Short description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quarter"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Quarter</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  {Object.values(QuarterType).map((q) => (
                    <FormItem
                      key={q}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={q} />
                      </FormControl>
                      <FormLabel className="font-normal">{q}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  {Object.values(StatusType).map((status) => (
                    <FormItem
                      key={status}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={status} />
                      </FormControl>
                      <FormLabel className="font-normal">{status}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO: Use datetime picker component */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO: Use datetime picker component */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enrollmentCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enrollment Capacity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="syllabusUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Syllabus URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://example.com/syllabus.pdf"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meetingSchedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Schedule</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Mon/Wed 10–11 AM" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Room 101" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Classroom"}
        </Button>
      </form>
    </Form>
  );
}
