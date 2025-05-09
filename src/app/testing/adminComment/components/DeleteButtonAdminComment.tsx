"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAdminCommentMutations } from "@/app/testing/adminComment/hooks/useAdminCommentMutations";
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

const deleteAdminCommentSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format" }),
});

type DeleteAdminCommentInput = z.infer<typeof deleteAdminCommentSchema>;

export function DeleteButtonAdminComment() {
  const { useDeleteAdminComment } = useAdminCommentMutations();
  const { deleteAdminComment, isPending } = useDeleteAdminComment();

  const form = useForm<DeleteAdminCommentInput>({
    resolver: zodResolver(deleteAdminCommentSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (data: DeleteAdminCommentInput) => {
    deleteAdminComment(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Comment ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Admin Comment UUID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="destructive" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete Admin Comment"}
        </Button>
      </form>
    </Form>
  );
}