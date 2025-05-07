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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createQuestionSchema } from "@/schemas";
import { QuestionType } from "@/generated/prisma";
import { showToast } from "@/components/ui/toast";

type CreateQuestionInput = z.infer<typeof createQuestionSchema>;

export function CreateQuestion() {
    const { useCreateQuestion } = useQuestionMutations();
    const { createQuestion, isPending, isSuccess, isError, error, reset } =
        useCreateQuestion();

    const form = useForm<CreateQuestionInput>({
        resolver: zodResolver(createQuestionSchema),
        defaultValues: {
            text: "",
            description: "",
            type: QuestionType.TEXT,
            required: false,
            order: 1,
            metadata: undefined,
        },
    });

    const onSubmit = (data: CreateQuestionInput) => {
        console.log("Form submitted with data:", data);
        try {
            createQuestion(data);
        } catch (err) {
            console.error("Error submitting form:", err);
            form.reset();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            showToast.success({
                title: "Success",
                description: "Question created successfully!",
            });
            form.reset();
        }

        if (isError) {
            showToast.error({
                title: "Error",
                description: "Failed to create question. Please try again.",
            });
        }
    }, [isSuccess, isError, form, error]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="text"
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
                    name="description"
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
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(QuestionType).map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status}
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
                    name="required"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel>Required</FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Order</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(parseInt(e.target.value) || 1)
                                    }
                                    min={1}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="metadata"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Metadata</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder='Enter JSON object, e.g. {" options":["JavaScript","Python","Java","C++","Ruby","Go"]}'
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
                    {isPending ? "Creating..." : "Create Question"}
                </Button>
            </form>
        </Form>
    );
}