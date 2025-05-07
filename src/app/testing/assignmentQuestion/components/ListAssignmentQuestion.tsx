"use client";

import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAssignmentQuestionQueries } from "../hooks/useAssignmentQuestionQueries";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export function ListAssignmentQuestions() {
  const [inputId, setInputId] = useState("");
  const [searchId, setSearchId] = useState("");

  const [inputAssignmentId, setInputAssignmentId] = useState("");
  const [searchAssignmentId, setSearchAssignmentId] = useState("");

  const [inputSection, setInputSection] = useState("");
  const [searchSection, setSearchSection] = useState("");

  const {
    useAllAssignmentQuestions,
    useAssignmentQuestionsByAssignmentIdInput,
    useAssignmentQuestionByIdInput,
    useAssignmentQuestionByFilterInput,
    useSectionsByAssignmentIdInput
  } = useAssignmentQuestionQueries();

  const {
    data: allQuestions,
    isLoading: loadingAll,
    isError: errorAll,
  } = useAllAssignmentQuestions(defaultQueryParams);

  const {
    data: singleQuestion,
    isLoading: loadingSingle,
    isError: errorSingle,
  } = useAssignmentQuestionByIdInput({ id: searchId });

  const {
    data: questionsByAssignment,
    isLoading: loadingByAssignment,
    isError: errorByAssignment,
  } = useAssignmentQuestionsByAssignmentIdInput({ assignmentId: searchAssignmentId });

  const {
    data: filteredQuestions,
    isLoading: loadingFiltered,
    isError: errorFiltered,
  } = useAssignmentQuestionByFilterInput({ section: searchSection });

  const {
    data: sections,
    isLoading: loadingSections,
    isError: errorSections,
  } = useSectionsByAssignmentIdInput({ assignmentId: searchAssignmentId });

  if (errorAll || errorSingle || errorByAssignment || errorFiltered || errorSections) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load one or more assignment question lists. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* All Assignment Questions */}
      <Card>
        <CardHeader>
          <CardTitle>All Assignment Questions</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingAll ? (
            <div>Loading…</div>
          ) : allQuestions && allQuestions.length > 0 ? (
            <ul className="space-y-3">
              {allQuestions.map((question: any) => (
                <li
                  key={question.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">Order: {question.order}</p>
                    <p className="text-xs text-muted-foreground">
                      Required: {question.required ? "Yes" : "No"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Points: {question.points}
                    </p>
                    {question.section && (
                      <p className="text-xs text-muted-foreground">
                        Section: {question.section}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No assignment questions found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assignment Questions by Assignment ID */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Questions by Assignment ID</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchAssignmentId(inputAssignmentId.trim());
            }}
            className="space-y-4 mb-4"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter assignment ID"
                value={inputAssignmentId}
                onChange={(e) => setInputAssignmentId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>
          </form>

          {searchAssignmentId ? (
            loadingByAssignment ? (
              <div>Loading…</div>
            ) : errorByAssignment ? (
              <div className="text-red-500">Failed to load questions for this assignment.</div>
            ) : !questionsByAssignment || questionsByAssignment.length === 0 ? (
              <div className="text-muted-foreground text-center py-4">
                No questions found for this assignment.
              </div>
            ) : (
              <ul className="space-y-3">
                {questionsByAssignment.map((question: any) => (
                  <li
                    key={question.id}
                    className="flex justify-between border p-3 rounded"
                  >
                    <div>
                      <p className="font-medium">Order: {question.order}</p>
                      <p className="text-xs text-muted-foreground">
                        Required: {question.required ? "Yes" : "No"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Points: {question.points}
                      </p>
                      {question.section && (
                        <p className="text-xs text-muted-foreground">
                          Section: {question.section}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="text-muted-foreground text-center py-6">
              Enter an assignment ID to view its questions.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Assignment Question by ID */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Question Details (by ID)</CardTitle>
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
                placeholder="Enter assignment question ID"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {searchId ? (
              loadingSingle ? (
                <div>Loading…</div>
              ) : errorSingle ? (
                <div className="text-red-500">Failed to load assignment question.</div>
              ) : !singleQuestion ? (
                <div className="text-muted-foreground text-center py-4">
                  No assignment question found with that ID.
                </div>
              ) : (
                <div className="border p-4 rounded">
                  <p className="font-medium">Order: {singleQuestion.order}</p>
                  <p className="text-xs text-muted-foreground">
                    Required: {singleQuestion.required ? "Yes" : "No"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Points: {singleQuestion.points}
                  </p>
                  {singleQuestion.section && (
                    <p className="text-xs text-muted-foreground">
                      Section: {singleQuestion.section}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Assignment ID: {singleQuestion.assignmentId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Question ID: {singleQuestion.questionId}
                  </p>
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>

      {/* Search Assignment Questions by Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search Assignment Questions by Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchSection(inputSection.trim());
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Enter section name"
              value={inputSection}
              onChange={(e) => setInputSection(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>

          {searchSection ? (
            loadingFiltered ? (
              <div className="mt-4">Loading…</div>
            ) : errorFiltered ? (
              <div className="mt-4 text-red-500">Failed to load assignment questions.</div>
            ) : !filteredQuestions || filteredQuestions.length === 0 ? (
              <div className="mt-4 text-muted-foreground text-center">
                No assignment questions found in that section.
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {filteredQuestions.map((question: any) => (
                  <li key={question.id} className="border p-3 rounded">
                    <p className="font-medium">Order: {question.order}</p>
                    <p className="text-xs text-muted-foreground">
                      Required: {question.required ? "Yes" : "No"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Points: {question.points}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Section: {question.section}
                    </p>
                  </li>
                ))}
              </ul>
            )
          ) : null}
        </CardContent>
      </Card>

      {/* Sections by Assignment ID */}
      <Card>
        <CardHeader>
          <CardTitle>Sections by Assignment ID</CardTitle>
        </CardHeader>
        <CardContent>
          {searchAssignmentId ? (
            loadingSections ? (
              <div>Loading…</div>
            ) : errorSections ? (
              <div className="text-red-500">Failed to load sections for this assignment.</div>
            ) : !sections || sections.length === 0 ? (
              <div className="text-muted-foreground text-center py-4">
                No sections found for this assignment.
              </div>
            ) : (
              <ul className="space-y-3">
                {sections.map((section: any, index: number) => (
                  <li key={index} className="border p-3 rounded">
                    <p className="font-medium">Section: {section}</p>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="text-muted-foreground text-center py-6">
              Enter an assignment ID above to view its sections.
            </div>
          )}
        </CardContent>
      </Card>
    </div >
  );
}