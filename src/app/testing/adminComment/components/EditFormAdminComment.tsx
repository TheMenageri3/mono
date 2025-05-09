"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { updateAdminCommentSchema } from "@/schemas";
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

// Optionally accept initial data as props for editing
interface EditFormAdminCommentProps {
  id?: string;
  data?: {
    visibility?: Visibility;
    category?: Category;
    priority?: Priority;
    resolved?: boolean;
    commentId?: string;
  };
}

type UpdateAdminCommentInput = z.infer<typeof updateAdminCommentSchema>;

const EditFormAdminComment = ({ id = "", data }: EditFormAdminCommentProps) => {
  const { useUpdateAdminComment } = useAdminCommentMutations();
  const { updateAdminComment, isPending } = useUpdateAdminComment();

  const form = useForm<UpdateAdminCommentInput>({
    resolver: zodResolver(updateAdminCommentSchema),
    defaultValues: {
      id,
      data: {
        visibility: data?.visibility ?? Visibility.ADMIN_ONLY,
        category: data?.category ?? Category.FEEDBACK,
        priority: data?.priority ?? Priority.NORMAL,
        resolved: data?.resolved ?? false,
        commentId: data?.commentId ?? "",
      },
    },
  });

  const onSubmit = (formData: UpdateAdminCommentInput) => {
    updateAdminComment(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Visibility */}
        <FormField
          control={form.control}
          name="data.visibility"
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
          name="data.category"
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
          name="data.priority"
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
          name="data.resolved"
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
          name="data.commentId"
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

        {/* Save and Reset Buttons */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isPending}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditFormAdminComment;