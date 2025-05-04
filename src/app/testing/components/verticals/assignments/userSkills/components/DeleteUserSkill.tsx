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

// Define schema for deleting a user skill by ID
const deleteUserSkillSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format" }),
});

type DeleteUserSkillInput = z.infer<typeof deleteUserSkillSchema>;

export function DeleteUserSkill() {
  const { useDeleteUserSkill } = useUserSkillsMutations();
  const { deleteUserSkill, isPending } = useDeleteUserSkill();

  const form = useForm<DeleteUserSkillInput>({
    resolver: zodResolver(deleteUserSkillSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeleteUserSkillInput) => {
    deleteUserSkill(data);
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
                <Input {...field} placeholder="Enter user skill ID to delete" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="destructive" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete User Skill"}
        </Button>
      </form>
    </Form>
  );
}
