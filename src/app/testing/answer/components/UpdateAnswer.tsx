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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { updateAnswerSchema } from "@/schemas";
import { showToast } from "@/components/ui/toast";

type UpdateAnswerInput = z.infer<typeof updateAnswerSchema>;

export function UpdateAnswer() {
    const { useUpdateAnswer } = useAnswerMutations();
    const { updateAnswer, isPending, isSuccess, isError, error, reset } =
        useUpdateAnswer();

    const form = useForm<UpdateAnswerInput>({
        resolver: zodResolver(updateAnswerSchema),
        defaultValues: {
            id: "",
            data: {
                value: "",
            },
        },
    });

    const onSubmit = (data: UpdateAnswerInput) => {
        console.log("Form submitted with data:", data);
        try {
            updateAnswer(data);
        } catch (err) {
            console.error("Error submitting form:", err);
            showToast.error({
                title: "Error",
                description: "Failed to update answer. Please try again.",
            });
            form.reset();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log("Answer updated successfully!");
            showToast.success({
                title: "Success",
                description: "Answer updated successfully!",
            });
            form.reset();
        }

        if (isError) {
            console.error("Error updating answer:", error);
            showToast.error({
                title: "Error",
                description: "Failed to update answer. Please try again.",
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

                <FormField
                    control={form.control}
                    name="data.value"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Answer Value</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Enter JSON object, e.g. {"type":"multiple_choice","options":["A","B","C","D"],"selected":["A","C"]}'
                                    value={field.value ? JSON.stringify(field.value, null, 2) : ""}
                                    onChange={(e) => {
                                        try {
                                            const parsed = JSON.parse(e.target.value);
                                            field.onChange(parsed);
                                        } catch {
                                            field.onChange(undefined);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Updating..." : "Update Answer"}
                </Button>
            </form>
        </Form>
    );
}