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
import { restoreClassApplicationSchema } from "@/schemas";

type RestoreClassApplicationInput = z.infer<
  typeof restoreClassApplicationSchema
>;

export default function RestoreClassApplication() {
  const { useRestoreClassApplication } = useClassApplicationMutations();
  const { restoreClassApplication, isPending } = useRestoreClassApplication();

  const form = useForm<RestoreClassApplicationInput>({
    resolver: zodResolver(restoreClassApplicationSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: RestoreClassApplicationInput) => {
    restoreClassApplication(data);
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
              <FormLabel>Class Application ID (UUID)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter class application ID to restore"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore Class Application"}
        </Button>
      </form>
    </Form>
  );
}
