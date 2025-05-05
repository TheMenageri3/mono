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
const deleteClassroomSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format" }),
});

type DeleteClassroomInput = z.infer<typeof deleteClassroomSchema>;

export default function DeleteClassroom() {
  const { useDeleteClass } = useClassMutations();
  const { deleteClass, isPending } = useDeleteClass();

  const form = useForm<DeleteClassroomInput>({
    resolver: zodResolver(deleteClassroomSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeleteClassroomInput) => {
    deleteClass(data);
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
                <Input {...field} placeholder="Enter classroom ID to delete" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete Classroom"}
        </Button>
      </form>
    </Form>
  );
}
