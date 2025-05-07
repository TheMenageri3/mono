"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { deleteClassApplicationResponseSchema } from "@/schemas";
import { useEffect } from "react";

type DeleteClassApplicationResponseInput = z.infer<
    typeof deleteClassApplicationResponseSchema
>;

export function DeleteClassApplicationResponse() {
    const { useDeleteClassApplicationResponse } =
        useClassApplicationResponseMutations();
    const { deleteClassApplicationResponse, isPending, isSuccess, isError } =
        useDeleteClassApplicationResponse();

    const form = useForm<DeleteClassApplicationResponseInput>({
        resolver: zodResolver(deleteClassApplicationResponseSchema),
        defaultValues: {
            id: "",
        },
    });

    const onSubmit = (data: DeleteClassApplicationResponseInput) => {
        deleteClassApplicationResponse(data);
    };

    useEffect(() => {
        if (isSuccess) {
            showToast.success({
                title: "Success",
                description: "Class application response deleted successfully!",
            });
            form.reset();
        }

        if (isError) {
            showToast.error({
                title: "Error",
                description: "Failed to delete class application response. Please try again.",
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

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Deleting..." : "Delete Class Application Response"}
                </Button>
            </form>
        </Form>
    );
}
