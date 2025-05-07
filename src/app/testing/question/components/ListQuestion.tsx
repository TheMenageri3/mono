"use client";

import { useState } from "react";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useQuestionQueries } from "../hooks/useQuestionQueries";

const defaultQueryParams = {
    limit: 10,
    offset: 0,
};

export function ListQuestion() {
    const [inputId, setInputId] = useState("");
    const [searchId, setSearchId] = useState("");

    const {
        useAllActiveQuestions,
        useQuestionById,
        useDeletedQuestions,
    } = useQuestionQueries();

    const {
        data: allQuestions,
        isLoading: loadingAll,
        error: errorAll,
    } = useAllActiveQuestions(defaultQueryParams);

    const {
        data: questionById,
        isLoading: loadingSingle,
        error: errorSingle,
    } = useQuestionById({ id: searchId });

    const {
        data: deletedQuestions,
        isLoading: loadingDeleted,
        error: errorDeleted,
    } = useDeletedQuestions(defaultQueryParams);
    if (errorAll || errorSingle || errorDeleted) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load one or more question lists. Please try again.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">

            {/* All Questions */}
            <Card>
                <CardHeader>
                    <CardTitle>All Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    {loadingAll ? (
                        <div>Loading…</div>
                    ) : allQuestions && allQuestions.length > 0 ? (
                        <ul className="space-y-3">
                            {allQuestions.map((question) => (
                                <li
                                    key={question.id}
                                    className="flex justify-between border p-3 rounded"
                                >
                                    <div>
                                        <p className="font-medium">
                                            ID: {question.id}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Text: {question.text}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Description: {question.description}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Type: {question.type}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Required: {question.required ? "Yes" : "No"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Order: {question.order}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Metadata: {JSON.stringify(question.metadata)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-muted-foreground text-center py-6">
                            No questions found.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Single Question by ID */}
            <Card>
                <CardHeader>
                    <CardTitle>Question Details (by ID)</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSearchId(inputId.trim());
                        }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Enter question ID"
                                value={inputId}
                                onChange={(e) => setInputId(e.target.value)}
                            />
                            <Button type="submit">Search</Button>
                        </div>
                    </form>
                    {searchId ? (
                        loadingSingle ? (
                            <div>Loading…</div>
                        ) : !questionById ? (
                            <div className="text-muted-foreground text-center py-4">
                                No question found with that ID.
                            </div>
                        ) : (
                            <div className="border p-4 rounded">
                                <p className="font-medium">
                                    ID: {questionById.id}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Text: {questionById.text}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Description: {questionById.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Type: {questionById.type}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Required: {questionById.required ? "Yes" : "No"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Order: {questionById.order}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Metadata: {JSON.stringify(questionById.metadata)}
                                </p>
                            </div>
                        )
                    ) :
                        (
                            <div className="text-muted-foreground text-center py-6">
                                Enter a question ID to view its details.
                            </div>
                        )
                    }
                </CardContent>
            </Card>

            {/* Deleted Questions */}
            <Card>
                <CardHeader>
                    <CardTitle>Deleted Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    {loadingDeleted ? (
                        <div>Loading…</div>
                    ) : deletedQuestions && deletedQuestions.length > 0 ? (
                        <ul className="space-y-3">
                            {deletedQuestions.map((question) => (
                                <li
                                    key={question.id}
                                    className="flex justify-between border p-3 rounded"
                                >
                                    <div>
                                        <p className="font-medium">
                                            ID: {question.id}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Text: {question.text}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Description: {question.description}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Type: {question.type}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Required: {question.required ? "Yes" : "No"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Order: {question.order}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Metadata: {JSON.stringify(question.metadata)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-muted-foreground text-center py-6">
                            No deleted questions.
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}