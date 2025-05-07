"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useQuestionMutations } from "../hooks/useQuestionMutations";
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
import { deleteQuestionSchema } from "@/schemas";
import { showToast } from "@/components/ui/toast";

type DeleteQuestionInput = z.infer<typeof deleteQuestionSchema>;

export function DeleteQuestion() {
    const { useDeleteQuestion } = useQuestionMutations();
    const { deleteQuestion, isPending, isSuccess, isError, error } = useDeleteQuestion();

    const form = useForm<DeleteQuestionInput>({
        resolver: zodResolver(deleteQuestionSchema),
        defaultValues: {
            id: "",
        },
    });

    const onSubmit = (data: DeleteQuestionInput) => {
        console.log("Form submitted with data:", data);
        try {
            deleteQuestion(data);
        } catch (err) {
            console.error("Error submitting form:", err);
            form.reset();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            showToast.success({
                title: "Success",
                description: "Question deleted successfully!",
            });
            form.reset();
        }

        if (isError) {
            console.error("Error deleting question:", error);
            showToast.error({
                title: "Error",
                description: "Failed to delete question. Please try again.",
            });
        }
    }, [isSuccess, isError, form, error]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question ID</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Question ID" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Deleting..." : "Delete Question"}
                </Button>
            </form>
        </Form>
    );
}
