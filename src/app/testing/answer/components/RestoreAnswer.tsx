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
import { restoreAnswerSchema } from "@/schemas";
import { showToast } from "@/components/ui/toast";

type RestoreAnswerInput = z.infer<typeof restoreAnswerSchema>;

export function RestoreAnswer() {
    const { useRestoreAnswer } = useAnswerMutations();
    const { restoreAnswer, isPending, isSuccess, isError, error } = useRestoreAnswer();

    const form = useForm<RestoreAnswerInput>({
        resolver: zodResolver(restoreAnswerSchema),
        defaultValues: {
            id: "",
        },
    });

    const onSubmit = (data: RestoreAnswerInput) => {
        console.log("Form submitted with data:", data);
        try {
            restoreAnswer(data);
        } catch (err) {
            console.error("Error submitting form:", err);
            showToast.error({
                title: "Error",
                description: "Failed to restore answer. Please try again.",
            });
            form.reset();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log("Answer restored successfully!");
            showToast.success({
                title: "Success",
                description: "Answer restored successfully!",
            });
            form.reset();
        }

        if (isError) {
            console.error("Error restoring answer:", error);
            showToast.error({
                title: "Error",
                description: "Failed to restore answer. Please try again.",
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
                    {isPending ? "Restoring..." : "Restore Answer"}
                </Button>
            </form>
        </Form>
    );
}
