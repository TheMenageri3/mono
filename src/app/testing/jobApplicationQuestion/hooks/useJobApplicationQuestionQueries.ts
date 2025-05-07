import { api } from "@/trpc/react";

export const useJobApplicationQuestionQueries = () => {
  const read = api.jobApplicationQuestion.read.useQuery;
  const getById = api.jobApplicationQuestion.getById.useQuery;
  const readDeleted = api.jobApplicationQuestion.readDeleted.useQuery;

  return {
    read,
    getById,
    readDeleted,
  };
};
