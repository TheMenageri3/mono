"use client";

import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useClassApplicationAnswerQueries } from "../hooks/useClassApplicationAnswerQueries";

const defaultQueryParams = {
    limit: 10,
    offset: 0,
};

export const ListClassApplicationAnswer = () => {
    const [inputId, setInputId] = useState("");
    const [searchId, setSearchId] = useState("");

    const [inputQuestionId, setInputQuestionId] = useState("");
    const [searchQuestionId, setSearchQuestionId] = useState("");

    const [inputClassApplicationId, setInputClassApplicationId] = useState("");
    const [searchClassApplicationId, setSearchClassApplicationId] = useState("");

    const [inputClassApplicationResponseId, setInputClassApplicationResponseId] =
        useState("");
    const [searchClassApplicationResponseId, setSearchClassApplicationResponseId] =
        useState("");

    const {
        useAllClassApplicationAnswers,
        useClassApplicationAnswerById,
        useClassApplicationAnswerByQuestionId,
        useClassApplicationAnswersByClassApplicationQuestionId,
        useClassApplicationAnswersByClassApplicationResponseId,
        useDeletedClassApplicationAnswers,
    } = useClassApplicationAnswerQueries();

    const {
        data: allClassApplicationAnswers,
        isLoading: loadingAll,
        error: errorAll,
    } = useAllClassApplicationAnswers(defaultQueryParams);

    const {
        data: classApplicationAnswerById,
        isLoading: loadingSingle,
        error: errorSingle,
    } = useClassApplicationAnswerById({ id: searchId });

    const {
        data: classApplicationAnswersByQuestion,
        isLoading: loadingByQuestion,
        error: errorByQuestion,
    } = useClassApplicationAnswerByQuestionId({
        questionId: searchQuestionId,
        ...defaultQueryParams,
    });
    const {
        data: classApplicationAnswersByClassApplication,
        isLoading: loadingByClassApplication,
        error: errorByClassApplication,
    } = useClassApplicationAnswersByClassApplicationQuestionId({
        classApplicationQuestionId: searchClassApplicationId,
        ...defaultQueryParams,
    });
    const {
        data: classApplicationAnswersByClassApplicationResponse,
        isLoading: loadingByClassApplicationResponse,
        error: errorByClassApplicationResponse,
    } = useClassApplicationAnswersByClassApplicationResponseId({
        classApplicationResponseId: searchClassApplicationResponseId,
        ...defaultQueryParams,
    });

    const {
        data: deletedClassApplicationAnswers,
        isLoading: loadingDeleted,
        error: errorDeleted,
    } = useDeletedClassApplicationAnswers(defaultQueryParams);

    if (errorAll || errorSingle || errorByQuestion || errorByClassApplication || errorByClassApplicationResponse || errorDeleted) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load one or more class application answer lists. Please try again.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            {/* All Class Application Answers */}
            <Card>
                <CardHeader>
                    <CardTitle>All Class Application Answers</CardTitle>
                </CardHeader>
                <CardContent>
                    {loadingAll ? (
                        <div>Loading…</div>
                    ) : allClassApplicationAnswers && allClassApplicationAnswers.length > 0 ? (
                        <ul className="space-y-3">
                            {allClassApplicationAnswers.map((answer) => (
                                <li
                                    key={answer.id}
                                    className="flex justify-between border p-3 rounded"
                                >
                                    <div>
                                        <p className="font-medium">
                                            ID: {answer.id}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Question ID: {answer.questionId}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Answer ID: {answer.answerId}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Class Application Question ID: {answer.classApplicationQuestionId}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Class Application Response ID: {answer.classApplicationResponseId}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-muted-foreground text-center py-6">
                            No class application answers found.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Single Class Application Answer by ID */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Application Answer Details (by ID)</CardTitle>
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
                                placeholder="Enter class application answer ID"
                                value={inputId}
                                onChange={(e) => setInputId(e.target.value)}
                            />
                            <Button type="submit">Search</Button>
                        </div>
                    </form>
                    {searchId ? (
                        loadingSingle ? (
                            <div>Loading…</div>
                        ) : !classApplicationAnswerById ? (
                            <div className="text-muted-foreground text-center py-4">
                                No class application answer found with that ID.
                            </div>
                        ) : (
                            <div className="border p-4 rounded">
                                <p className="font-medium">
                                    ID: {classApplicationAnswerById.id}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Question ID: {classApplicationAnswerById.questionId}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Answer ID: {classApplicationAnswerById.answerId}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Class Application Question ID: {classApplicationAnswerById.classApplicationQuestionId}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Class Application Response ID: {classApplicationAnswerById.classApplicationResponseId}
                                </p>
                            </div>
                        )
                    ) : null}
                </CardContent>
            </Card>

            {/* Class Application Answers by Question ID */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Application Answers (by Question ID)</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSearchQuestionId(inputQuestionId.trim());
                        }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Enter question ID"
                                value={inputQuestionId}
                                onChange={(e) => setInputQuestionId(e.target.value)}
                            />
                            <Button type="submit">Search</Button>
                        </div>
                    </form>
                    {searchQuestionId ? (
                        loadingByQuestion ? (
                            <div>Loading…</div>
                        ) : !classApplicationAnswersByQuestion ||
                            classApplicationAnswersByQuestion.length === 0 ? (
                            <div className="text-muted-foreground text-center py-4">
                                No class application answers found for this question.
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {classApplicationAnswersByQuestion.map((answer) => (
                                    <li
                                        key={answer.id}
                                        className="flex justify-between border p-3 rounded"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                ID: {answer.id}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Question ID: {answer.questionId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Answer ID: {answer.answerId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Class Application Question ID: {answer.classApplicationQuestionId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Class Application Response ID: {answer.classApplicationResponseId}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    ) : null}
                </CardContent>
            </Card>

            {/* Class Application Answers by Class Application Question ID */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Application Answers (by Class Application Question ID)</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSearchClassApplicationId(inputClassApplicationId.trim());
                        }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Enter class application question ID"
                                value={inputClassApplicationId}
                                onChange={(e) => setInputClassApplicationId(e.target.value)}
                            />
                            <Button type="submit">Search</Button>
                        </div>
                    </form>
                    {searchClassApplicationId ? (
                        loadingByClassApplication ? (
                            <div>Loading…</div>
                        ) : !classApplicationAnswersByClassApplication ||
                            classApplicationAnswersByClassApplication.length === 0 ? (
                            <div className="text-muted-foreground text-center py-4">
                                No class application answers found for this class application question.
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {classApplicationAnswersByClassApplication.map((answer) => (
                                    <li
                                        key={answer.id}
                                        className="flex justify-between border p-3 rounded"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                ID: {answer.id}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Question ID: {answer.questionId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Answer ID: {answer.answerId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Class Application Question ID: {answer.classApplicationQuestionId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Class Application Response ID: {answer.classApplicationResponseId}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    ) : null}
                </CardContent>
            </Card>

            {/* Class Application Answers by Class Application Response ID */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Application Answers (by Class Application Response ID)</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSearchClassApplicationResponseId(inputClassApplicationResponseId.trim());
                        }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Enter class application response ID"
                                value={inputClassApplicationResponseId}
                                onChange={(e) => setInputClassApplicationResponseId(e.target.value)}
                            />
                            <Button type="submit">Search</Button>
                        </div>
                    </form>
                    {searchClassApplicationResponseId ? (
                        loadingByClassApplicationResponse ? (
                            <div>Loading…</div>
                        ) : !classApplicationAnswersByClassApplicationResponse ||
                            classApplicationAnswersByClassApplicationResponse.length === 0 ? (
                            <div className="text-muted-foreground text-center py-4">
                                No class application answers found for this class application response.
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {classApplicationAnswersByClassApplicationResponse.map((answer) => (
                                    <li
                                        key={answer.id}
                                        className="flex justify-between border p-3 rounded"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                ID: {answer.id}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Question ID: {answer.questionId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Answer ID: {answer.answerId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Class Application Question ID: {answer.classApplicationQuestionId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Class Application Response ID: {answer.classApplicationResponseId}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    ) : null}
                </CardContent>
            </Card>

            {/* Deleted Class Application Answers */}
            <Card>
                <CardHeader>
                    <CardTitle>Deleted Class Application Answers</CardTitle>
                </CardHeader>
                <CardContent>
                    {loadingDeleted ? (
                        <div>Loading…</div>
                    ) : deletedClassApplicationAnswers && deletedClassApplicationAnswers.length > 0 ? (
                        <ul className="space-y-3">
                            {deletedClassApplicationAnswers.map((answer) => (
                                <li
                                    key={answer.id}
                                    className="flex justify-between border p-3 rounded"
                                >
                                    <div>
                                        <p className="font-medium">
                                            ID: {answer.id}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Question ID: {answer.questionId}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Answer ID: {answer.answerId}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Class Application Question ID: {answer.classApplicationQuestionId}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Class Application Response ID: {answer.classApplicationResponseId}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-muted-foreground text-center py-6">
                            No deleted class application answers.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
