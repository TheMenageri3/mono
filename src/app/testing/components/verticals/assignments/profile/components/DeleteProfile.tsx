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

// Schema for deleting a profile
const deleteProfileSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format" }),
});

type DeleteProfileInput = z.infer<typeof deleteProfileSchema>;

export function DeleteProfile() {
  const { useDeleteProfile } = useProfileMutations();
  const { deleteProfile, isPending } = useDeleteProfile();

  const form = useForm<DeleteProfileInput>({
    resolver: zodResolver(deleteProfileSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeleteProfileInput) => {
    deleteProfile(data);
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
                <Input {...field} placeholder="Enter profile ID to delete" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete Profile"}
        </Button>
      </form>
    </Form>
  );
}
