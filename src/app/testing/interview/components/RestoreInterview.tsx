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
import { restoreInterviewSchema } from "@/schemas";

type RestoreInterviewInput = z.infer<typeof restoreInterviewSchema>;

export default function RestoreInterview() {
  const { useRestoreInterview } = useInterviewMutations();
  const { restoreInterview, isPending } = useRestoreInterview();

  const form = useForm<RestoreInterviewInput>({
    resolver: zodResolver(restoreInterviewSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: RestoreInterviewInput) => {
    restoreInterview(data);
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
              <FormLabel>Interview ID (UUID)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter interview ID to restore" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore Interview"}
        </Button>
      </form>
    </Form>
  );
}
