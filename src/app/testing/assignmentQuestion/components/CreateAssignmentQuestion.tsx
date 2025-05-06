"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useAssignmentQuestionMutations } from "../hooks/useAssignmentQuestionMutations";
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
import { Checkbox } from "@/components/ui/checkbox";
import { createAssignmentQuestionSchema } from "@/schemas";
import { useEffect } from "react";
import { showToast } from "@/components/ui/toast";

type CreateAssignmentQuestionInput = z.infer<typeof createAssignmentQuestionSchema>;

export function CreateAssignmentQuestion() {
  const { useCreateAssignmentQuestion } = useAssignmentQuestionMutations();
  const { createAssignmentQuestion, isPending, isSuccess, isError, error } = useCreateAssignmentQuestion();

  const form = useForm<CreateAssignmentQuestionInput>({
    resolver: zodResolver(createAssignmentQuestionSchema),
    defaultValues: {
      order: 1,
      required: true,
      points: 10,
      section: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: CreateAssignmentQuestionInput) => {
    console.log("Form submitted with data:", data);
    try {
      await createAssignmentQuestion(data);
    } catch (err) {
      console.error("Error submitting form:", err);
      showToast.error({
        title: "Error",
        description: "Failed to create assignment question. Please try again.",
      });
    }
  };

  // Log status changes
  useEffect(() => {
    if (isSuccess) {
      console.log("Assignment question created successfully!");
      showToast.success({
        title: "Success",
        description: "Assignment question created successfully!",
      });
      form.reset(); // Reset form after successful submission
    }
    
    if (isError) {
      console.error("Error creating assignment question:", error);
    }
  }, [isSuccess, isError, error, form]);

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6"
      >

        {/* Order */}
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Order</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  min={1}
                />
              </FormControl>
              <FormDescription>
                The display order of this question in the assignment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Points */}
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  step="0.5"
                  min={0}
                />
              </FormControl>
              <FormDescription>
                Points awarded for correct answer to this question
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Required */}
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Required Question</FormLabel>
              <FormDescription className="ml-2">
                Students must answer this question to submit the assignment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Section */}
        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Section name (e.g., 'Part A')" />
              </FormControl>
              <FormDescription>
                Group questions by section for better organization
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isPending}
          onClick={() => console.log("Button clicked, form state:", form.formState)}
        >
          {isPending ? "Creating..." : "Add Assignment Question"}
        </Button>
      </form>
    </Form>
  );
}