"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
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
import { showToast } from "@/components/ui/toast";
import { createClassApplicationAnswerSchema } from "@/schemas";

type CreateClassApplicationAnswerInput = z.infer<
    typeof createClassApplicationAnswerSchema
>;

export function CreateClassApplicationAnswer() {
    const { useCreateClassApplicationAnswer } =
        useClassApplicationAnswerMutations();
    const { createClassApplicationAnswer, isPending, isSuccess, isError, error, reset } =
        useCreateClassApplicationAnswer();

    const form = useForm<CreateClassApplicationAnswerInput>({
        resolver: zodResolver(createClassApplicationAnswerSchema),
        defaultValues: {
            questionId: "",
            classApplicationQuestionId: "",
            answerId: "",
            classApplicationResponseId: "",
        },
    });

    const onSubmit = (data: CreateClassApplicationAnswerInput) => {
        console.log("Form submitted with data:", data);
        try {
            createClassApplicationAnswer(data);
        } catch (err) {
            console.error("Error submitting form:", err);
            showToast.error({
                title: "Error",
                description: "Failed to create class application answer. Please try again.",
            });
            form.reset();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            showToast.success({
                title: "Success",
                description: "Class application answer created successfully!",
            });
            form.reset();
        }

        if (isError) {
            showToast.error({
                title: "Error",
                description: "Failed to create class application answer. Please try again.",
            });
        }
    }, [isSuccess, isError, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="questionId"
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

                <FormField
                    control={form.control}
                    name="classApplicationQuestionId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class Application Question ID</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Class Application Question ID" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="answerId"
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
                    name="classApplicationResponseId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class Application Response ID</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Class Application Response ID" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Class Application Answer"}
                </Button>
            </form>
        </Form>
    );
}