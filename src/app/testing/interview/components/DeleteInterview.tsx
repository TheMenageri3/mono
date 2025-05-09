"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInterviewMutations } from "../hooks/useInterviewMutations";
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
import { deleteInterviewSchema } from "@/schemas";

type DeleteInterviewInput = z.infer<typeof deleteInterviewSchema>;

export default function DeleteInterview() {
  const { useDeleteInterview } = useInterviewMutations();
  const { deleteInterview, isPending } = useDeleteInterview();

  const form = useForm<DeleteInterviewInput>({
    resolver: zodResolver(deleteInterviewSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeleteInterviewInput) => {
    deleteInterview(data);
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
              <FormLabel>Interview (UUID)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter interview ID to delete" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete Interview"}
        </Button>
      </form>
    </Form>
  );
}
