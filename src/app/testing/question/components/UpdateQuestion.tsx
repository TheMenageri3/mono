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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateQuestionsSchema } from "@/schemas";
import { showToast } from "@/components/ui/toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestionType } from "@/generated/prisma";
import { useQuestionQueries } from "../hooks/useQuestionQueries";

type UpdateQuestionInput = z.infer<typeof updateQuestionsSchema>;

export function UpdateQuestion() {
    const { useUpdateQuestion } = useQuestionMutations();
    const { updateQuestion, isPending, isSuccess, isError, error } = useUpdateQuestion();


    const form = useForm<UpdateQuestionInput>({
        resolver: zodResolver(updateQuestionsSchema),
        defaultValues: {
            id: "",
            data: {
                text: "",
                description: "",
                type: QuestionType.TEXT,
                required: false,
                order: 1,
                metadata: undefined,
            },
        },
    });

    const onSubmit = (data: UpdateQuestionInput) => {
        console.log("Form submitted with data:", data);
        try {
            updateQuestion(data);
        } catch (err) {
            console.error("Error submitting form:", err);
            form.reset();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            showToast.success({
                title: "Success",
                description: "Question updated successfully!",
            });
            form.reset();
        }

        if (isError) {
            showToast.error({
                title: "Error",
                description: "Failed to update question. Please try again.",
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
                                <Input
                                    {...field}
                                    placeholder="Question ID"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="data.text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question Text</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Question Text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="data.description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Description" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="data.type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select question type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(QuestionType).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="data.order"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Order</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                    min={1}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="data.metadata"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Metadata</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Enter JSON object, e.g. {'key': 'value'}"
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
                    {isPending ? "Updating..." : "Update Question"}
                </Button>
            </form>
        </Form>
    );
}
