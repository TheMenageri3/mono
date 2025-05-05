"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserSkillsMutations } from "../hooks/useUserSkillsMutations";
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

// Define schema for restoring a user skill by ID
const restoreUserSkillSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format" }),
});

type RestoreUserSkillInput = z.infer<typeof restoreUserSkillSchema>;

export function RestoreUserSkill() {
  const { useRestoreUserSkill } = useUserSkillsMutations();
  const { restoreUserSkill, isPending } = useRestoreUserSkill();

  const form = useForm<RestoreUserSkillInput>({
    resolver: zodResolver(restoreUserSkillSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: RestoreUserSkillInput) => {
    restoreUserSkill(data);
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
              <FormLabel>User Skill ID (UUID)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter user skill ID to restore"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="destructive" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore User Skill"}
        </Button>
      </form>
    </Form>
  );
}
