"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePlacementMutations } from "../hooks/usePlacementMutations";
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
import { deletePlacementSchema } from "@/schemas";

type DeletePlacementInput = z.infer<typeof deletePlacementSchema>;

export default function DeletePlacement() {
  const { useDeletePlacement } = usePlacementMutations();
  const { deletePlacement, isPending } = useDeletePlacement();

  const form = useForm<DeletePlacementInput>({
    resolver: zodResolver(deletePlacementSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeletePlacementInput) => {
    deletePlacement(data);
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
              <FormLabel>Placement (UUID)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter placement ID to delete" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete Placement"}
        </Button>
      </form>
    </Form>
  );
}
