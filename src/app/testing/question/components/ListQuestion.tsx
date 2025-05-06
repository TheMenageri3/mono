"use client";

import React from "react";
import { api } from "@/trpc/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuestionQueries } from "../hooks/useQuestionQueries";

export function ListQuestion() {
    const { useAllQuestions } = useQuestionQueries();
    const { data: questions, isLoading, error } = useAllQuestions();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!questions?.length) return <div>No questions found</div>;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {questions.map((question) => (
                <Card key={question.id}>
                    <CardHeader>
                        <CardTitle>{question.text}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{question.description}</p>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button variant="outline" size="sm">
                            Manage
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
