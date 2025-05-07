"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useAssignmentQuestionMutations } from "../hooks/useAssignmentQuestionMutations";
import { useAssignmentQuestionQueries } from "../hooks/useAssignmentQuestionQueries";
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
import { updateAssignmentQuestionsSchema } from "@/schemas";

type UpdateAssignmentQuestionInput = z.infer<typeof updateAssignmentQuestionsSchema>;


export function UpdateAssignmentQuestion() {
  const { useUpdateAssignmentQuestion } = useAssignmentQuestionMutations();
  const { updateAssignmentQuestion, isPending } = useUpdateAssignmentQuestion();


  const form = useForm<UpdateAssignmentQuestionInput>({
    resolver: zodResolver(updateAssignmentQuestionsSchema),
    defaultValues: {
        id: "",
        data: 
    {
        order: 1,
        required: true,
        points: 10,
        section: "",
        questionId: "",
    }
    },
  });

  const onSubmit = (data: UpdateAssignmentQuestionInput) => {
    updateAssignmentQuestion(data);
  };

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* ID */}
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID</FormLabel>
            <FormControl>
              <Input {...field} placeholder = "Enter ID"/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Order */}
      <FormField
        control={form.control}
        name="data.order"
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

      {/* Required */}
      <FormField
          control={form.control}
          name="data.required"
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

        {/* Points */}
        <FormField
          control={form.control}
          name="data.points"
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

        {/* Section */}
        <FormField
          control={form.control}
          name="data.section"
          render={({ field })  => (
            <FormItem>
                <FormLabel>Section</FormLabel>
                <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="Section name (e.g., 'Part A')" />
                </FormControl>
                <FormDescription>
                    Group questions by section for better organization
                </FormDescription>
                <FormMessage/>
            </FormItem>
          )}
        />

        {/* Question ID */}
        <FormField
          control={form.control}
          name="data.questionId"
          render={({ field })  => (
            <FormItem>
                <FormLabel>Section</FormLabel>
                <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="Question ID is here" />
                </FormControl>
                <FormDescription>
                    Sort them through Question ID
                </FormDescription>
                <FormMessage/>
            </FormItem>
          )}
        />
        
        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Assignment Question"}
        </Button>
      </form>
    </Form>
  );
};

