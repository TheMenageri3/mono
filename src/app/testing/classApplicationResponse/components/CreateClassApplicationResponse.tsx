"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useClassApplicationResponseMutations } from "../hooks/useClassApplicationResponseMutations";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createClassApplicationResponseSchema } from "@/schemas";
import { ClassApplicationResponseStatus } from "@/generated/prisma";
import { useEffect } from "react";

type CreateClassApplicationResponseInput = z.infer<
    typeof createClassApplicationResponseSchema
>;

export function CreateClassApplicationResponse() {
    const { useCreateClassApplicationResponse } =
        useClassApplicationResponseMutations();
    const { createClassApplicationResponse, isPending, isSuccess, isError, error, reset } =
        useCreateClassApplicationResponse();

    const form = useForm<CreateClassApplicationResponseInput>({
        resolver: zodResolver(createClassApplicationResponseSchema),
        defaultValues: {
            status: ClassApplicationResponseStatus.DRAFT,
            submittedAt: undefined,
            reviewedAt: undefined,
            feedback: undefined,
            classApplicationId: "",
            applicantId: "",
            reviewedById: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data: CreateClassApplicationResponseInput) => {
        console.log("Form submitted with data:", data);
        try {
            await createClassApplicationResponse(data);
        } catch (err) {
            console.error("Error submitting form:", err);
            showToast.error({
                title: "Error",
                description: "Failed to create class application response. Please try again.",
            });
            form.reset();
        }
    };

    // Log status changes
    useEffect(() => {
        if (isSuccess) {
            console.log("Class application response created successfully!");
            showToast.success({
                title: "Success",
                description: "Class application response created successfully!",
            });
            form.reset();
        }

        if (isError) {
            console.error("Error creating class application response:", error);
        }
    }, [isSuccess, isError, error, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(ClassApplicationResponseStatus).map((status) => (
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
                    name="submittedAt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Submitted At</FormLabel>
                            <FormControl>
                                <Input
                                    type="datetime-local"
                                    {...field}
                                    value={
                                        field.value ? field.value.toString().slice(0, 16) : ""
                                    }
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        field.onChange(new Date(e.target.value))
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="reviewedAt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reviewed At</FormLabel>
                            <FormControl>
                                <Input
                                    type="datetime-local"
                                    {...field}
                                    value={
                                        field.value ? field.value.toString().slice(0, 16) : ""
                                    }
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        field.onChange(new Date(e.target.value))
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Feedback</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Feedback" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="classApplicationId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class Application ID</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Class Application ID" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="applicantId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Applicant ID</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Applicant ID" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="reviewedById"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reviewed By ID</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Reviewed By ID" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Class Application Response"}
                </Button>
            </form>
        </Form>
    );
}
