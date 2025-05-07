"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useEventCompanyMutations } from "../hooks/useEventCompanyMutations";
import { useEventQuerry } from "../hooks/useEventQuerry";
import { useCompanyQuerry } from "../hooks/useCompanyQuerry";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createEventCompanySchema } from "@/schemas";
import { EventAttendanceStatus, EventAttendanceType } from "@/generated/prisma";

type CreateEventCompanyInput = z.infer<typeof createEventCompanySchema>;

const CreateEventCompany = () => {
  const { useCreateEventCompany } = useEventCompanyMutations();
  const { createEventCompany, isPending } = useCreateEventCompany();

  const { data: events } = useEventQuerry();
  const { data: companies } = useCompanyQuerry();

  const form = useForm<CreateEventCompanyInput>({
    resolver: zodResolver(createEventCompanySchema),
    defaultValues: {
      attendanceStatus: EventAttendanceStatus.MAYBE,
      attendanceType: EventAttendanceType.SPONSOR,
      notes: "",
      feedback: "",
      companyId: "",
      eventId: "",
    },
  });

  const onSubmit = (data: CreateEventCompanyInput) => {
    createEventCompany(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Attendance Status */}
        <FormField
          control={form.control}
          name="attendanceStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attendance Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select attendance status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(EventAttendanceStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Attendance Type */}
        <FormField
          control={form.control}
          name="attendanceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attendance Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select attendance type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(EventAttendanceType).map((type) => (
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
                  placeholder="Add any notes about the company's attendance"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Feedback */}
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Add any feedback about the event"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Required IDs */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companies?.map((company) => (
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
            name="eventId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {events?.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Event Company"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateEventCompany;
