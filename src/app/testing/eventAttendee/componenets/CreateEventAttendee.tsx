"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useEventAttendeeMutations } from "../hooks/useEventAttendeeMutations";
import { useProfileQuerry } from "../hooks/useProfileQuerry";
import { useEventQuerry } from "../hooks/useEventQuerry";
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
import { Textarea } from "@/components/ui/textarea";
import { createEventAttendeeSchema } from "@/schemas";
import { EventAttendanceStatus, EventAttendanceType } from "@/generated/prisma";

type CreateEventAttendeeInput = z.infer<typeof createEventAttendeeSchema>;

const CreateEventAttendee = () => {
  const { useCreateEventAttendee } = useEventAttendeeMutations();
  const { createEventAttendee, isPending } = useCreateEventAttendee();
  const { data: profiles } = useProfileQuerry();
  const { data: events } = useEventQuerry();

  const form = useForm<CreateEventAttendeeInput>({
    resolver: zodResolver(createEventAttendeeSchema),
    defaultValues: {
      attendanceStatus: EventAttendanceStatus.MAYBE,
      attendanceType: EventAttendanceType.ATTENDEE,
      notes: "",
      feedback: "",
      attendeeId: "",
      eventId: "",
    },
  });

  const onSubmit = (data: CreateEventAttendeeInput) => {
    createEventAttendee(data);
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
                  placeholder="Add any notes about the attendance"
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
            name="attendeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attendee</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an attendee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {profiles?.map((profile) => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.email}
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
          {isPending ? "Creating..." : "Create Event Attendee"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateEventAttendee;
