"use client";

import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useClassApplicationResponseQueries } from "../hooks/useClassApplicationResponseQueries";

const defaultQueryParams = {
    limit: 10,
    offset: 0,
};

export const ListClassApplicationResponse = () => {
    const [inputId, setInputId] = useState("");
    const [searchId, setSearchId] = useState("");

    const [inputApplicantId, setInputApplicantId] = useState("");
    const [searchApplicantId, setSearchApplicantId] = useState("");

    const [inputClassApplicationId, setInputClassApplicationId] = useState("");
    const [searchClassApplicationId, setSearchClassApplicationId] = useState("");

    const {
        useAllClassApplicationResponses,
        useClassApplicationResponseById,
        useClassApplicationResponseByApplicant,
        useClassApplicationResponsesByClassApplication
    } = useClassApplicationResponseQueries();

    const {
        data: allClassApplicationResponses,
        isLoading: loadingAll,
        error: errorAll,
    } = useAllClassApplicationResponses(defaultQueryParams);

    const {
        data: classApplicationResponseById,
        isLoading: loadingSingle,
        error: errorSingle,
    } = useClassApplicationResponseById({ id: searchId });

    const {
        data: classApplicationResponsesByApplicant,
        isLoading: loadingByApplicant,
        error: errorByApplicant,
    } = useClassApplicationResponseByApplicant({
        applicantId: searchApplicantId,
        ...defaultQueryParams,
    });

    const {
        data: classApplicationResponsesByClassApplication,
        isLoading: loadingByClassApplication,
        error: errorByClassApplication,
    } = useClassApplicationResponsesByClassApplication({
        classApplicationId: searchClassApplicationId,
        ...defaultQueryParams,
    });

    if (errorAll || errorSingle || errorByApplicant || errorByClassApplication) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load one or more class application response lists. Please try again.
                </AlertDescription>
            </Alert>
        );
    }


    return (
        <div className="space-y-6">
            {/* All Class Application Responses */}
            <Card>
                <CardHeader>
                    <CardTitle>All Class Application Responses</CardTitle>
                </CardHeader>
                <CardContent>
                    {loadingAll ? (
                        <div>Loading…</div>
                    ) : allClassApplicationResponses && allClassApplicationResponses.length > 0 ? (
                        <ul className="space-y-3">
                            {allClassApplicationResponses.map((response) => (
                                <li
                                    key={response.id}
                                    className="flex justify-between border p-3 rounded"
                                >
                                    <div>
                                        <p className="font-medium">
                                            Status: {response.status}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Submitted At: {response.submittedAt?.toISOString()}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Reviewed At: {response.reviewedAt?.toISOString()}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Feedback: {response.feedback}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Applicant ID: {response.applicantId}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Class Application ID: {response.classApplicationId}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Reviewed By ID: {response.reviewedById}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-muted-foreground text-center py-6">
                            No class application responses found.
                        </div>
                    )}
                </CardContent>
            </Card>


            {/* Single Class Application Response by ID */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Application Response Details (by ID)</CardTitle>
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
                                placeholder="Enter class application response ID"
                                value={inputId}
                                onChange={(e) => setInputId(e.target.value)}
                            />
                            <Button type="submit">Search</Button>
                        </div>
                    </form>
                    {searchId ? (
                        loadingSingle ? (
                            <div>Loading…</div>
                        ) : errorSingle ? (
                            <div className="text-red-500">
                                Failed to load class application response.
                            </div>
                        ) : !classApplicationResponseById ? (
                            <div className="text-muted-foreground text-center py-4">
                                No class application response found with that ID.
                            </div>
                        ) : (
                            <div className="border p-4 rounded">
                                <p className="font-medium">
                                    Status: {classApplicationResponseById.status}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Submitted At: {classApplicationResponseById.submittedAt?.toISOString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Reviewed At: {classApplicationResponseById.reviewedAt?.toISOString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Feedback: {classApplicationResponseById.feedback}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Applicant ID: {classApplicationResponseById.applicantId}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Class Application ID: {classApplicationResponseById.classApplicationId}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Reviewed By ID: {classApplicationResponseById.reviewedById}
                                </p>
                            </div>
                        )
                    ) : (
                        <div className="text-muted-foreground text-center py-6">
                            Enter a class application response ID to view its details.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Class Application Responses by Applicant ID */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Application Responses by Applicant ID</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSearchApplicantId(inputApplicantId.trim());
                        }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Enter applicant ID"
                                value={inputApplicantId}
                                onChange={(e) => setInputApplicantId(e.target.value)}
                            />
                            <Button type="submit">Search</Button>
                        </div>
                    </form>
                    {searchApplicantId ? (
                        loadingByApplicant ? (
                            <div>Loading…</div>
                        ) : errorByApplicant ? (
                            <div className="text-red-500">
                                Failed to load class application responses for this applicant.
                            </div>
                        ) : !classApplicationResponsesByApplicant ||
                            classApplicationResponsesByApplicant.length === 0 ? (
                            <div className="text-muted-foreground text-center py-4">
                                No class application responses found for this applicant.
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {classApplicationResponsesByApplicant.map((response) => (
                                    <li
                                        key={response.id}
                                        className="flex justify-between border p-3 rounded"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                Status: {response.status}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Submitted At: {response.submittedAt?.toISOString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Reviewed At: {response.reviewedAt?.toISOString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Feedback: {response.feedback}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Applicant ID: {response.applicantId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Class Application ID: {response.classApplicationId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Reviewed By ID: {response.reviewedById}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    ) : (
                        <div className="text-muted-foreground text-center py-6">
                            Enter an applicant ID to view its class application responses.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Class Application Responses by Class Application ID */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Application Responses by Class Application ID</CardTitle>
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
                                placeholder="Enter class application ID"
                                value={inputClassApplicationId}
                                onChange={(e) => setInputClassApplicationId(e.target.value)}
                            />
                            <Button type="submit">Search</Button>
                        </div>
                    </form>
                    {searchClassApplicationId ? (
                        loadingByClassApplication ? (
                            <div>Loading…</div>
                        ) : errorByClassApplication ? (
                            <div className="text-red-500">
                                Failed to load class application responses for this class application.
                            </div>
                        ) : !classApplicationResponsesByClassApplication ||
                            classApplicationResponsesByClassApplication.length === 0 ? (
                            <div className="text-muted-foreground text-center py-4">
                                No class application responses found for this class application.
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {classApplicationResponsesByClassApplication.map((response) => (
                                    <li
                                        key={response.id}
                                        className="flex justify-between border p-3 rounded"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                Status: {response.status}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Submitted At: {response.submittedAt?.toISOString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Reviewed At: {response.reviewedAt?.toISOString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Feedback: {response.feedback}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Applicant ID: {response.applicantId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Class Application ID: {response.classApplicationId}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Reviewed By ID: {response.reviewedById}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    ) : (
                        <div className="text-muted-foreground text-center py-6">
                            Enter a class application ID to view its class application responses.
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}
