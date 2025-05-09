"use client";

import { useState } from "react";
import { useJobApplicationQuestionQueries } from "./hooks/useJobApplicationQuestionQueries";
import { useJobApplicationQuestionMutations } from "./hooks/useJobApplicationQuestionMutations";

export default function JobApplicationQuestionTestPage() {
  const [jobApplicationId, setJobApplicationId] = useState<string>("");
  const [questionId, setQuestionId] = useState<string>("");

  // Query hooks
  const {
    useAllJobApplicationQuestions,
    useJobApplicationQuestionById,
    useDeletedJobApplicationQuestions,
  } = useJobApplicationQuestionQueries();

  // Mutation hooks
  const {
    useCreateJobApplicationQuestion,
    useUpdateJobApplicationQuestion,
    useDeleteJobApplicationQuestion,
    useRestoreJobApplicationQuestion,
  } = useJobApplicationQuestionMutations();

  // Fetching data with the query hook
  const { data, isLoading } = useAllJobApplicationQuestions({
    limit: 10,
    offset: 0,
  });

  // Mutation hooks initialization
  const { createJobApplicationQuestion } = useCreateJobApplicationQuestion();
  const { updateJobApplicationQuestion } = useUpdateJobApplicationQuestion();
  const { deleteJobApplicationQuestion } = useDeleteJobApplicationQuestion();
  const { restoreJobApplicationQuestion } = useRestoreJobApplicationQuestion();

  const handleCreate = () => {
    if (!jobApplicationId || !questionId) return;

    createJobApplicationQuestion({
      order: 1,
      required: true,
      points: 10,
      section: "General",
      jobApplicationId,
      questionId,
    });
  };

  const handleUpdate = (id: string) => {
    updateJobApplicationQuestion({
      id,
      order: 99,
      required: false,
      points: 50,
      section: "Updated Section",
    });
  };

  const handleDelete = (id: string) => {
    deleteJobApplicationQuestion({ id });
  };

  const handleRestore = (id: string) => {
    restoreJobApplicationQuestion({ id });
  };

  return (
    <main className="p-4 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">Test Job Application Questions</h1>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Job Application ID"
          value={jobApplicationId}
          onChange={(e) => setJobApplicationId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Question ID"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New
        </button>
      </div>

      <hr />

      <div>
        <h2 className="text-lg font-medium mb-2">Existing Questions</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : data?.length ? (
          data.map((q) => (
            <div
              key={q.id}
              className="p-3 border rounded mb-2 flex justify-between items-center bg-gray-50"
            >
              <div>
                <p className="font-semibold">{q.section ?? "No Section"}</p>
                <p className="text-sm text-gray-600">Points: {q.points}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleUpdate(q.id)}
                  className="text-yellow-600 hover:underline"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleRestore(q.id)}
                  className="text-green-600 hover:underline"
                >
                  Restore
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No questions found.</p>
        )}
      </div>
    </main>
  );
}
