"use client";

import { useEffect } from "react";
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
import { updateClassApplicationResponseSchema } from "@/schemas";
import { ClassApplicationResponseStatus } from "@/generated/prisma";
import { showToast } from "@/components/ui/toast";

type UpdateClassApplicationResponseInput = z.infer<
    typeof updateClassApplicationResponseSchema
>;

export function UpdateClassApplicationResponse() {
    const { useUpdateClassApplicationResponse } =
        useClassApplicationResponseMutations();
    const { updateClassApplicationResponse, isPending, isSuccess, isError, error, reset } =
        useUpdateClassApplicationResponse();

    const form = useForm<UpdateClassApplicationResponseInput>({
        resolver: zodResolver(updateClassApplicationResponseSchema),
        defaultValues: {
            id: "",
            data: {
                status: ClassApplicationResponseStatus.DRAFT,
                submittedAt: undefined,
                reviewedAt: undefined,
                feedback: undefined,
                reviewedById: undefined,
            },
        },
    });

    const onSubmit = (data: UpdateClassApplicationResponseInput) => {
        updateClassApplicationResponse(data);
    };


    useEffect(() => {
        if (isSuccess) {
            showToast.success({
                title: "Success",
                description: "Class application response updated successfully!",
            });
            form.reset();
        }

        if (isError) {
            showToast.error({
                title: "Error",
                description: "Failed to update class application response. Please try again.",
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
                            <FormLabel>Class Application Response ID</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter class application response ID (UUID)"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="data.status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter status (e.g., DRAFT, SUBMITTED, REVIEWED, ACCEPTED, REJECTED)"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="data.submittedAt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Submitted At</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="datetime-local"
                                    placeholder="Enter submitted at (YYYY-MM-DDTHH:MM)"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="data.reviewedAt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reviewed At</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="datetime-local"
                                    placeholder="Enter reviewed at (YYYY-MM-DDTHH:MM)"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="data.feedback"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Feedback</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter feedback (e.g., 'Great job!')"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="data.reviewedById"
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
                    {isPending ? "Updating..." : "Update Class Application Response"}
                </Button>
            </form>
        </Form>
    );
}
