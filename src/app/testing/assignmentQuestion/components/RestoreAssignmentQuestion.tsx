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

 const restoreAssignmentQuestionSchema = z.object({
    id: z.string().uuid({ message: "Invalid UUID format" }),
 })

 type RestoreAssignmentQuestionInput = z.infer<typeof restoreAssignmentQuestionSchema>;

 export function RestoreAssignmentQuestion() {
    const { useRestoreAssignmentQuestion } = useAssignmentQuestionMutations();
    const { restoreAssignmentQuestion, isPending } = useRestoreAssignmentQuestion();

    const form = useForm<RestoreAssignmentQuestionInput>({
        resolver: zodResolver(restoreAssignmentQuestionSchema),
        defaultValues: {
            id: "",
        },
    });

    const onSubmit = ( data: RestoreAssignmentQuestionInput ) => {
        restoreAssignmentQuestion(data);
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
                    <Input
                      {...field}
                      placeholder="Enter assignment question ID to restore"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? "Restoring..." : "Restore Assignment Question"}
            </Button>
          </form>
        </Form>
      );
 }