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
import { deleteCompanyContactSchema } from "@/schemas";

type DeleteCompanyContactInput = z.infer<typeof deleteCompanyContactSchema>;

export default function DeleteCompanyContact() {
  const { useDeleteCompanyContact } = useCompanyContactMutations();
  const { deleteCompanyContact, isPending, isError, error } =
    useDeleteCompanyContact();

  const form = useForm<DeleteCompanyContactInput>({
    resolver: zodResolver(deleteCompanyContactSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeleteCompanyContactInput) => {
    deleteCompanyContact(data);
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
                <Input {...field} placeholder="Enter contact ID to delete" />
              </FormControl>
              <FormDescription>
                Enter the ID of the company contact you want to delete
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="destructive" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete Contact"}
        </Button>

        {isError && (
          <div className="text-red-500 text-sm mt-2">
            {error?.message || "An error occurred while deleting the contact"}
          </div>
        )}
      </form>
    </Form>
  );
}
