"use client";

import { useState } from "react";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAnswerQueries } from "../hooks/useAnswerQueries";

const defaultQueryParams = {
    limit: 10,
    offset: 0,
};

export function ListAnswer() {
    const [inputId, setInputId] = useState("");
    const [searchId, setSearchId] = useState("");

    const {
        useAllAnswers,
        useAnswerById,
        useDeletedAnswers,
    } = useAnswerQueries();

    const {
        data: allAnswers,
        isLoading: loadingAll,
        error: errorAll,
    } = useAllAnswers(defaultQueryParams);

    const {
        data: answerById,
        isLoading: loadingSingle,
        error: errorSingle,
    } = useAnswerById({ id: searchId });

    const {
        data: deletedAnswers,
        isLoading: loadingDeleted,
        error: errorDeleted,
    } = useDeletedAnswers(defaultQueryParams);

    if (errorAll || errorSingle || errorDeleted) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load one or more answer lists. Please try again.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            {/* All Answers */}
            <Card>
                <CardHeader>
                    <CardTitle>All Answers</CardTitle>
                </CardHeader>
                <CardContent>
                    {loadingAll ? (
                        <div>Loading…</div>
                    ) : allAnswers && allAnswers.length > 0 ? (
                        <ul className="space-y-3">
                            {allAnswers.map((answer) => (
                                <li
                                    key={answer.id}
                                    className="flex justify-between border p-3 rounded"
                                >
                                    <div>
                                        <p className="font-medium">
                                            ID: {answer.id}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Value: {JSON.stringify(answer.value)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Question ID: {answer.questionId}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Answerer ID: {answer.answererId}
                                        </p>
                                        {answer.assignmentId && (
                                            <p className="text-xs text-muted-foreground">
                                                Assignment ID: {answer.assignmentId}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-muted-foreground text-center py-6">
                            No answers found.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Single Answer by ID */}
            <Card>
                <CardHeader>
                    <CardTitle>Answer Details (by ID)</CardTitle>
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
                                placeholder="Enter answer ID"
                                value={inputId}
                                onChange={(e) => setInputId(e.target.value)}
                            />
                            <Button type="submit">Search</Button>
                        </div>
                    </form>
                    {searchId ? (
                        loadingSingle ? (
                            <div>Loading…</div>
                        ) : !answerById ? (
                            <div className="text-muted-foreground text-center py-4">
                                No answer found with that ID.
                            </div>
                        ) : (
                            <div className="border p-4 rounded">
                                <p className="font-medium">
                                    ID: {answerById.id}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Value: {JSON.stringify(answerById.value)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Question ID: {answerById.questionId}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Answerer ID: {answerById.answererId}
                                </p>
                                {answerById.assignmentId && (
                                    <p className="text-xs text-muted-foreground">
                                        Assignment ID: {answerById.assignmentId}
                                    </p>
                                )}
                            </div>
                        )
                    ) : null}
                </CardContent>
            </Card>

            {/* All Deleted Answers */}
            <Card>
                <CardHeader>
                    <CardTitle>Deleted Answers</CardTitle>
                </CardHeader>
                <CardContent>
                    {loadingDeleted ? (
                        <div>Loading…</div>
                    ) : deletedAnswers && deletedAnswers.length > 0 ? (
                        <ul className="space-y-3">
                            {deletedAnswers.map((answer) => (
                                <li
                                    key={answer.id}
                                    className="flex justify-between border p-3 rounded"
                                >
                                    <div>
                                        <p className="font-medium">
                                            ID: {answer.id}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Value: {JSON.stringify(answer.value)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Question ID: {answer.questionId}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Answerer ID: {answer.answererId}
                                        </p>
                                        {answer.assignmentId && (
                                            <p className="text-xs text-muted-foreground">
                                                Assignment ID: {answer.assignmentId}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-muted-foreground text-center py-6">
                            No deleted answers.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
