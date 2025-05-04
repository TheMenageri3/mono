"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useClassMutations } from "../hooks/useClassroomMutations";
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

// Schema for restoring a classroom
const restoreClassroomSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format" }),
});

type RestoreClassroomInput = z.infer<typeof restoreClassroomSchema>;

export default function RestoreClassroom() {
  const { useRestoreClass } = useClassMutations();
  const { restoreClass, isPending } = useRestoreClass();

  const form = useForm<RestoreClassroomInput>({
    resolver: zodResolver(restoreClassroomSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: RestoreClassroomInput) => {
    restoreClass(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mx-auto py-8"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classroom ID (UUID)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter classroom ID to restore" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore Classroom"}
        </Button>
      </form>
    </Form>
  );
}
