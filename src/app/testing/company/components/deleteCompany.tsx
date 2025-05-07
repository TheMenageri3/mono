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
import { deleteCompanySchema } from "@/schemas";

type DeleteCompanyInput = z.infer<typeof deleteCompanySchema>;

export default function DeleteCompany() {
  const { useDeleteCompany } = useCompanyMutations();
  const { deleteCompany, isPending } = useDeleteCompany();

  const form = useForm<DeleteCompanyInput>({
    resolver: zodResolver(deleteCompanySchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeleteCompanyInput) => {
    deleteCompany(data);
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
                <Input {...field} placeholder="Enter company ID to delete" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="destructive" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete Company"}
        </Button>
      </form>
    </Form>
  );
}
