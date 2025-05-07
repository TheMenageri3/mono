"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useClassApplicationAnswerMutations } from "../hooks/useClassApplicationAnswerMutations";
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
import { deleteClassApplicationAnswerSchema } from "@/schemas";
import { showToast } from "@/components/ui/toast";
import { useEffect } from "react";

type DeleteClassApplicationAnswerInput = z.infer<
    typeof deleteClassApplicationAnswerSchema
>;

export function DeleteClassApplicationAnswer() {
    const { useDeleteClassApplicationAnswer } =
        useClassApplicationAnswerMutations();
    const { deleteClassApplicationAnswer, isPending, isSuccess, isError } =
        useDeleteClassApplicationAnswer();

    const form = useForm<DeleteClassApplicationAnswerInput>({
        resolver: zodResolver(deleteClassApplicationAnswerSchema),
        defaultValues: {
            id: "",
        },
    });

    const onSubmit = (data: DeleteClassApplicationAnswerInput) => {
        deleteClassApplicationAnswer(data);
    };

    useEffect(() => {
        if (isSuccess) {
            showToast.success({
                title: "Success",
                description: "Class application answer deleted successfully!",
            });
            form.reset();
        }

        if (isError) {
            showToast.error({
                title: "Error",
                description: "Failed to delete class application answer. Please try again.",
            });
        }
    }, [isSuccess, isError, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class Application Answer ID</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter class application answer ID (UUID)"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Deleting..." : "Delete Class Application Answer"}
                </Button>
            </form>
        </Form>
    );
}
