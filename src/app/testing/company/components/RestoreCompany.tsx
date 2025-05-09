"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCompanyMutations } from "../hooks/useCompanyMutations";
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
import { restoreCompanySchema } from "@/schemas";

type RestoreCompanyInput = z.infer<typeof restoreCompanySchema>;

export default function RestoreCompany() {
  const { useRestoreCompany } = useCompanyMutations();
  const { restoreCompany, isPending } = useRestoreCompany();

  const form = useForm<RestoreCompanyInput>({
    resolver: zodResolver(restoreCompanySchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: RestoreCompanyInput) => {
    restoreCompany(data);
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
              <FormLabel>Company ID (UUID)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter company ID to restore" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="default" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore Company"}
        </Button>
      </form>
    </Form>
  );
}
