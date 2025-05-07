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

import { createAnswerSchema } from "@/schemas";
import { showToast } from "@/components/ui/toast";

type CreateAnswerInput = z.infer<typeof createAnswerSchema>;

export function CreateAnswer() {
    const { useCreateAnswer } = useAnswerMutations();
    const { createAnswer, isPending, isSuccess, isError, error, reset } =
        useCreateAnswer();

    const form = useForm<CreateAnswerInput>({
        resolver: zodResolver(createAnswerSchema),
        defaultValues: {
            value: "",
            questionId: "",
            answererId: "",
            assignmentId: "",
        },
    });

    const onSubmit = (data: CreateAnswerInput) => {
        console.log("Form submitted with data:", data);
        try {
            createAnswer(data);
        } catch (err) {
            console.error("Error submitting form:", err);
            showToast.error({
                title: "Error",
                description: "Failed to create answer. Please try again.",
            });
            form.reset();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log("Answer created successfully!");
            showToast.success({
                title: "Success",
                description: "Answer created successfully!",
            });
            form.reset();
        }

        if (isError) {
            console.error("Error creating answer:", error);
            showToast.error({
                title: "Error",
                description: "Failed to create answer. Please try again.",
            });
        }
    }, [isSuccess, isError, error, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-lg mx-auto py-8"
            >
                <FormField
                    control={form.control}
                    name="value"
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

                <FormField
                    control={form.control}
                    name="questionId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question ID</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter question ID" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="answererId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Answerer ID</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter answerer ID" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="assignmentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assignment ID</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter assignment ID" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Answer"}
                </Button>
            </form>
        </Form>
    );
}
