"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useAnswerMutations } from "../hooks/useAnswerMutations";
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
import { deleteAnswerSchema } from "@/schemas";
import { showToast } from "@/components/ui/toast";

type DeleteAnswerInput = z.infer<typeof deleteAnswerSchema>;

export function DeleteAnswer() {
    const { useDeleteAnswer } = useAnswerMutations();
    const { deleteAnswer, isPending, isSuccess, isError, error } = useDeleteAnswer();

    const form = useForm<DeleteAnswerInput>({
        resolver: zodResolver(deleteAnswerSchema),
        defaultValues: {
            id: "",
        },
    });

    const onSubmit = (data: DeleteAnswerInput) => {
        console.log("Form submitted with data:", data);
        try {
            deleteAnswer(data);
        } catch (err) {
            console.error("Error submitting form:", err);
            showToast.error({
                title: "Error",
                description: "Failed to delete answer. Please try again.",
            });
            form.reset();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log("Answer deleted successfully!");
            showToast.success({
                title: "Success",
                description: "Answer deleted successfully!",
            });
            form.reset();
        }

        if (isError) {
            console.error("Error deleting answer:", error);
            showToast.error({
                title: "Error",
                description: "Failed to delete answer. Please try again.",
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
                            <FormLabel>Answer ID</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Answer ID" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Deleting..." : "Delete Answer"}
                </Button>
            </form>
        </Form>
    );
}
