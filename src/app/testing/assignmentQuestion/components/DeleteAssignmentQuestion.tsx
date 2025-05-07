"use client";
 
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import { useAssignmentQuestionMutations } from "../hooks/useAssignmentQuestionMutations";
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

 const deleteAssignmentQuestionSchema = z.object({
    id: z.string().uuid({ message: "Invalid UUID format" }),
 });

 type DeleteAssignmentQuestionInput = z.infer<typeof deleteAssignmentQuestionSchema>;

 export function DeleteAssignmentQuestion() {
    const { useDeleteAssignmentQuestion } = useAssignmentQuestionMutations();
    const { deleteAssignmentQuestion, isPending } = useDeleteAssignmentQuestion();

    const form = useForm<DeleteAssignmentQuestionInput>({
        resolver: zodResolver(deleteAssignmentQuestionSchema),
        defaultValues: {
            id: "",
        },
    });

    const onSubmit = (data: DeleteAssignmentQuestionInput) => {
        deleteAssignmentQuestion(data);
    }

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
                  <FormLabel>Assignment Question ID (UUID)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter assignment question ID to delete" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant="destructive" disabled={isPending}>
                {isPending ? "Deleting..." : "Delete Assignment Question"}
            </Button>
        </form>
    </Form>         
);
}

