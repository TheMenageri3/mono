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

// Define schema for deleting a user by UUID
const deleteUserSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format" }),
});

type DeleteUserInput = z.infer<typeof deleteUserSchema>;

export function DeleteUser() {
  const { useDeleteUser } = useUserMutations();
  const { deleteUser, isPending } = useDeleteUser();

  const form = useForm<DeleteUserInput>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeleteUserInput) => {
    deleteUser(data);
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
                <Input {...field} placeholder="Enter user ID to delete" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="destructive" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete User"}
        </Button>
      </form>
    </Form>
  );
}
