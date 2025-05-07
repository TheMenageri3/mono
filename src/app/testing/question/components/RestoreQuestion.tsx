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
import { restoreQuestionSchema } from "@/schemas";
import { showToast } from "@/components/ui/toast";

type RestoreQuestionInput = z.infer<typeof restoreQuestionSchema>;

export function RestoreQuestion() {
    const { useRestoreQuestion } = useQuestionMutations();
    const { restoreQuestion, isPending, isSuccess, isError, error } = useRestoreQuestion();

    const form = useForm<RestoreQuestionInput>({
        resolver: zodResolver(restoreQuestionSchema),
        defaultValues: {
            id: "",
        },
    });

    const onSubmit = (data: RestoreQuestionInput) => {
        console.log("Form submitted with data:", data);
        try {
            restoreQuestion(data);
        } catch (err) {
            console.error("Error submitting form:", err);
            showToast.error({
                title: "Error",
                description: "Failed to restore question. Please try again.",
            });
            form.reset();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            showToast.success({
                title: "Success",
                description: "Question restored successfully!",
            });
            form.reset();
        }

        if (isError) {
            console.error("Error restoring question:", error);
            showToast.error({
                title: "Error",
                description: "Failed to restore question. Please try again.",
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
                    {isPending ? "Restoring..." : "Restore Question"}
                </Button>
            </form>
        </Form>
    );
}
