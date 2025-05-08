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
import { restorePlacementSchema } from "@/schemas";

type RestorePlacementInput = z.infer<typeof restorePlacementSchema>;

export default function RestorePlacement() {
  const { useRestorePlacement } = usePlacementMutations();
  const { restorePlacement, isPending } = useRestorePlacement();

  const form = useForm<RestorePlacementInput>({
    resolver: zodResolver(restorePlacementSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: RestorePlacementInput) => {
    restorePlacement(data);
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
              <FormLabel>Placement ID (UUID)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter placement ID to restore" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore Placement"}
        </Button>
      </form>
    </Form>
  );
}
