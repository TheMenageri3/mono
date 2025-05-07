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
import { restoreClassApplicationResponseSchema } from "@/schemas";
import { useEffect } from "react";

type RestoreClassApplicationResponseInput = z.infer<
    typeof restoreClassApplicationResponseSchema
>;

export function RestoreClassApplicationResponse() {
    const { useRestoreClassApplicationResponse } =
        useClassApplicationResponseMutations();
    const { restoreClassApplicationResponse, isPending, isSuccess, isError } =
        useRestoreClassApplicationResponse();

    const form = useForm<RestoreClassApplicationResponseInput>({
        resolver: zodResolver(restoreClassApplicationResponseSchema),
        defaultValues: {
            id: "",
        },
    });

    const onSubmit = (data: RestoreClassApplicationResponseInput) => {
        restoreClassApplicationResponse(data);
    };

    useEffect(() => {
        if (isSuccess) {
            showToast.success({
                title: "Success",
                description: "Class application response restored successfully!",
            });
            form.reset();
        }

        if (isError) {
            showToast.error({
                title: "Error",
                description: "Failed to restore class application response. Please try again.",
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
                    {isPending ? "Restoring..." : "Restore Class Application Response"}
                </Button>
            </form>
        </Form>
    );
}
