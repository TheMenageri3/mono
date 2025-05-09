"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { deleteClassApplicationSchema } from "@/schemas";

type DeleteClassApplicationInput = z.infer<typeof deleteClassApplicationSchema>;

export default function DeleteClassApplication() {
  const { useDeleteClassApplication } = useClassApplicationMutations();
  const { deleteClassApplication, isPending } = useDeleteClassApplication();

  const form = useForm<DeleteClassApplicationInput>({
    resolver: zodResolver(deleteClassApplicationSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeleteClassApplicationInput) => {
    deleteClassApplication(data);
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
              <FormLabel>Class Application (UUID)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter class application ID to delete"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete Class Application"}
        </Button>
      </form>
    </Form>
  );
}
