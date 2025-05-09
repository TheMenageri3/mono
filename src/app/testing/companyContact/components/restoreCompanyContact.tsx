"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCompanyContactMutations } from "../hooks/useCompanyContactMutations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { restoreCompanyContactSchema } from "@/schemas";

type RestoreCompanyContactInput = z.infer<typeof restoreCompanyContactSchema>;

export default function RestoreCompanyContact() {
  const { useRestoreCompanyContact } = useCompanyContactMutations();
  const { restoreCompanyContact, isPending, isError, error } =
    useRestoreCompanyContact();

  const form = useForm<RestoreCompanyContactInput>({
    resolver: zodResolver(restoreCompanyContactSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: RestoreCompanyContactInput) => {
    restoreCompanyContact(data);
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
              <FormLabel>Contact ID (UUID)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter contact ID to restore" />
              </FormControl>
              <FormDescription>
                Enter the ID of the deleted company contact you want to restore
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="default" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore Contact"}
        </Button>

        {isError && (
          <div className="text-red-500 text-sm mt-2">
            {error?.message || "An error occurred while restoring the contact"}
          </div>
        )}
      </form>
    </Form>
  );
}
