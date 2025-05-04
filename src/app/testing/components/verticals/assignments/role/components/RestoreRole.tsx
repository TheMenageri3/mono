// components/RestoreRole.tsx

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
import { restoreRoleSchema } from "@/schemas";
import { useRoleMutations } from "../hooks/useRoleMutations";

type RestoreRoleInput = z.infer<typeof restoreRoleSchema>;

export function RestoreRole() {
  const { useRestoreRole } = useRoleMutations();
  const { restoreRole, isPending } = useRestoreRole();

  const form = useForm<RestoreRoleInput>({
    resolver: zodResolver(restoreRoleSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: RestoreRoleInput) => {
    restoreRole(data);
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
                <Input {...field} placeholder="Enter role ID to restore" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore Role"}
        </Button>
      </form>
    </Form>
  );
}
