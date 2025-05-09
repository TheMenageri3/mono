"use client";

import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { createAdminCommentSchema } from "@/schemas";
import { useAdminCommentMutations } from "../hooks/useAdminCommentMutations";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Visibility,
  Category,
  Priority,
} from "@/generated/prisma";

type CreateAdminCommentInput = z.infer<typeof createAdminCommentSchema> & {
    priority: Priority;
    resolved: boolean;
  };

const CreateFormAdminComment = () => {
  const { useCreateAdminComment } = useAdminCommentMutations();
  const { createAdminComment, isPending } = useCreateAdminComment();


  const form = useForm({
    resolver: zodResolver(createAdminCommentSchema) as Resolver<{
        visibility: Visibility;
        category: Category;
        priority: Priority;
        resolved: boolean;
        commentId: string;
    }>,
    defaultValues: {
        visibility: Visibility.ADMIN_ONLY,
        category: Category.FEEDBACK,
        priority: Priority.NORMAL,
        resolved: false,
        commentId: "",
    },
  });

  const onSubmit = (data: CreateAdminCommentInput) => {
    createAdminComment(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Visibility */}
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Visibility).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Category).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Priority).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0) + option.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resolved */}
        <FormField
          control={form.control}
          name="resolved"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Resolved</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comment ID */}
        <FormField
          control={form.control}
          name="commentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Comment ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Admin Comment"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateFormAdminComment;
