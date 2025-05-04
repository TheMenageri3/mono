// components/DeleteRole.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { deleteRoleSchema } from "@/schemas";
import { useRoleMutations } from "../hooks/useRoleMutations";

type DeleteRoleInput = z.infer<typeof deleteRoleSchema>;

export function DeleteRole() {
  const { useDeleteRole } = useRoleMutations();
  const { deleteRole, isPending } = useDeleteRole();

  const form = useForm<DeleteRoleInput>({
    resolver: zodResolver(deleteRoleSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeleteRoleInput) => {
    deleteRole(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter role ID to delete" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete Role"}
        </Button>
      </form>
    </Form>
  );
}
