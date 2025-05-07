"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useCommentMutations } from "../hooks/useCommentMutation";
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
import { createCommentSchema } from "@/schemas";
import { CommentStatus } from "@/generated/prisma";

type CreateCommentInput = z.infer<typeof createCommentSchema>;

const CreateComment = () => {
  const { useCreateComment } = useCommentMutations();
  const { createComment, isPending } = useCreateComment();

  const form = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      text: "",
      status: CommentStatus.ACTIVE,
      commenterId: "",
    },
  });

  const onSubmit = (data: CreateCommentInput) => {
    createComment(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Text */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input {...field} placeholder="your comment...." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* commenterId */}
        <FormField
          control={form.control}
          name="commenterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commenter Id (id for a commenter profile: commenter profile id)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="179c4786-de66-40aa-8080-0a6aa1672c60" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Optional IDs */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="adminCommentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Comment ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="admin Comment Id" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assignmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignment ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Assignment ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="classApplicationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Application ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Class Application ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parentCommentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Comment ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Parent Comment ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating..." : "Create Comment"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateComment;
