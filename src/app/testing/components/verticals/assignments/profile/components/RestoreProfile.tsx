"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProfileMutations } from "../hooks/useProfileMutations";
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

// Schema for restoring a profile
const restoreProfileSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format" }),
});

type RestoreProfileInput = z.infer<typeof restoreProfileSchema>;

export function RestoreProfile() {
  const { useRestoreProfile } = useProfileMutations();
  const { restoreProfile, isPending } = useRestoreProfile();

  const form = useForm<RestoreProfileInput>({
    resolver: zodResolver(restoreProfileSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: RestoreProfileInput) => {
    restoreProfile(data);
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
              <FormLabel>Profile ID (UUID)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter profile ID to restore" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore Profile"}
        </Button>
      </form>
    </Form>
  );
}
