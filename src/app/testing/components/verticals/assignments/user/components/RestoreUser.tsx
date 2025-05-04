"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserMutations } from "../hooks/useUserMutations";
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

// Schema for restoring a user
const restoreUserSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format" }),
});

type RestoreUserInput = z.infer<typeof restoreUserSchema>;

export function RestoreUser() {
  const { useRestoreUser } = useUserMutations();
  const { restoreUser, isPending } = useRestoreUser();

  const form = useForm<RestoreUserInput>({
    resolver: zodResolver(restoreUserSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: RestoreUserInput) => {
    restoreUser(data);
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
              <FormLabel>User ID (UUID)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter user ID to restore" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore User"}
        </Button>
      </form>
    </Form>
  );
}
